import { Button, HStack, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { type ReactNode } from 'react';

import championIdEnNameMap from '@/apis/constants/championIdEnNameMap';
import championIdKrNameMap from '@/apis/constants/championIdKrNameMap';
import summonerMatchesInfoQuery from '@/apis/queries/summonerMatchesInfoQuery';
import type { ProfileEntry, QueueType, RiotAccountEntry, SummonerTierDto } from '@/apis/types';
import useAuth from '@/apis/useAuth';
import useRenewSummoner from '@/apis/useRenewSummoner';
import championIconUrl from '@/apis/utils/championIconUrl';
import shortTierName from '@/apis/utils/shortTierName';
import Edit from '@/assets/icons/system/edit.svg';
import Like from '@/assets/icons/system/like.svg';
import Reset from '@/assets/icons/system/reset.svg';
import ProfileImage from '@/components/common/ProfileImage';
import StatusIndicator from '@/components/common/StatusIndicator';
import TierImage from '@/components/common/TierImage';

import { useAccountModalStore } from '../account/accountModalStore';

import * as style from './RecentMatches.style';

export default function RecentMatches() {
  const { data, isAuthenticated, status } = useAuth();
  // summonerMatchesInfoQuery를 위한 임시 변수 후에 undefined를 타입에서 제거하기 위해
  // 변수 재선언 해서 사용
  const mainRiotAccount = data?.data.riotDependentInfo.riotAccounts.find((account) => account.isMain);

  const openAccountModal = useAccountModalStore((s) => s.open);

  const router = useRouter();

  // TODO: use `isAuthenticated` only
  if (!isAuthenticated || status !== 'success') {
    return (
      <RecentMatchesException
        infoText={'그님티에 회원가입 후 라이엇 계정을 연동하여\n내 소환사 정보를 확인하세요!'}
        button={
          <Button
            onClick={openAccountModal}
            size="md"
            bg="gray800"
            p="10px 12px"
            textStyle="t2"
            fontWeight="regular"
            color="white"
          >
            회원가입하기
          </Button>
        }
      />
    );
  }

  if (mainRiotAccount === undefined) {
    return (
      <RecentMatchesException
        infoText={'라이엇 계정 연동하고\n더 많은 정보를 누려보세요!'}
        button={
          <button
            type="button"
            onClick={() => {
              router.replace(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/community/oauth/riot/redirect?redirect_uri=${encodeURIComponent(process.env.NEXT_PUBLIC_FRONT_ORIGIN + router.asPath)}`,
              );
            }}
            css={style.riotLinkButton}
          >
            라이엇 계정 연동하기
          </button>
        }
      />
    );
  }

  return (
    <Tabs>
      <article css={style.recentMatchesRoot}>
        <header css={style.recentMatchesHeader}>
          <h2 css={style.recentMatchesTitle}>소환사 최근 전적</h2>
          <TabList position="absolute" top={0} right="20px" height="53px">
            <HStack gap="16px">
              <Tab>솔로 랭크</Tab>
              <Tab>자유 랭크</Tab>
            </HStack>
          </TabList>
        </header>

        <TabPanels>
          <TabPanel>
            <RecentMatchesTab queueType="RANK_SOLO" myProfile={data.data} riotAccount={mainRiotAccount} />
          </TabPanel>
          <TabPanel>
            <RecentMatchesTab queueType="RANK_FLEX" myProfile={data.data} riotAccount={mainRiotAccount} />
          </TabPanel>
        </TabPanels>
      </article>
    </Tabs>
  );
}

interface RecentMatchesExceptionProps {
  infoText: string;
  button: ReactNode;
}

function RecentMatchesException(props: RecentMatchesExceptionProps) {
  const { infoText, button } = props;

  return (
    <article css={style.recentMatchesRoot}>
      <header css={style.recentMatchesHeader}>
        <h2 css={style.recentMatchesTitle}>소환사 최근 전적</h2>
      </header>
      <div css={style.recentMatchesContent({ isAuthenticated: false })}>
        <p css={style.riotLinkSuggestionText}>{infoText}</p>
        {button}
      </div>
    </article>
  );
}

interface RecentMatchesTabProps {
  myProfile: ProfileEntry;
  riotAccount: RiotAccountEntry;
  queueType: QueueType;
}

function RecentMatchesTab(props: RecentMatchesTabProps) {
  const { myProfile, riotAccount, queueType } = props;

  const { data: matchesInfoData, status: matchesInfoStatus } = useQuery(
    summonerMatchesInfoQuery({
      summonerTagName: `${riotAccount.name}-${riotAccount.tagLine}`,
      queueType,
    }),
  );

  const { renewSummoner } = useRenewSummoner();
  const router = useRouter();

  if (matchesInfoStatus !== 'success') {
    return;
  }

  const mainRankInfo: SummonerTierDto | null =
    matchesInfoData.data.summoner[queueType === 'RANK_SOLO' ? 'soloTierInfo' : 'flexTierInfo'];

  return (
    <div css={style.recentMatchesContent({ isAuthenticated: true })}>
      <div css={style.summonerAndInGameInfo}>
        <div css={style.profileImageWrapper}>
          <ProfileImage iconId={riotAccount.iconId} fill />
          <div css={style.level}>{riotAccount.level}</div>
        </div>
        <div css={style.summonerAndInGameRight}>
          <div css={style.summonerInfo}>
            <div css={style.summonerInfoLeft}>
              <p css={style.summonerNameAndTag}>
                <span css={style.summonerName}>{riotAccount.name}</span>
                <span css={style.summonerTag}>#{riotAccount.tagLine}</span>
              </p>
              <StatusIndicator status={myProfile.riotDependentInfo.status} width={6} height={6} />
              <Link href="/mypage/change-state">
                <Edit width={24} height={24} css={style.editIcon} />
              </Link>
            </div>
            <div css={style.likeBadge}>
              <Like width={20} height={20} css={style.likeIcon} />
              <div css={style.upCount}>{Intl.NumberFormat(undefined).format(myProfile.upCount)}</div>
            </div>
          </div>
          <div css={style.inGameInfo}>
            {mainRankInfo === null ? (
              <>
                <TierImage tier="unknown" width={28} height={28} />
                <p css={style.rank}>Unranked</p>
              </>
            ) : (
              <>
                <TierImage tier={mainRankInfo.tier} width={28} height={28} />
                <div css={style.rank}>{shortTierName(mainRankInfo.tier, mainRankInfo.division)}</div>
                <div css={style.leaguePoints}>{Intl.NumberFormat(undefined).format(mainRankInfo.lp)}LP</div>
              </>
            )}
          </div>
        </div>
      </div>

      {matchesInfoData.data.matchSummary.avgKda === null ? (
        <div css={style.recentMatchesAndChampions}>
          <p css={style.recentMatchesScore}>-전 -승 -패</p>
          <p css={style.noRecentMatchesText}>게임 기록이 없습니다</p>
        </div>
      ) : (
        <div css={style.recentMatchesAndChampions}>
          <div css={style.recentMatchesColumn}>
            <div css={style.recentMatchesScore}>
              {matchesInfoData.data.matchSummary.plays}전 {matchesInfoData.data.matchSummary.wins}승{' '}
              {matchesInfoData.data.matchSummary.defeats}패
            </div>
            <div css={style.recentMatchesAverage}>{matchesInfoData.data.matchSummary.avgKda.toFixed(1)} 평점</div>
          </div>
          <div css={style.mostChampions}>
            {matchesInfoData.data.matchSummary.championSummary.map((championSummary) => (
              <div key={championSummary.championId} css={style.mostChampion}>
                <Image
                  src={championIconUrl(championIdEnNameMap[championSummary.championId])}
                  alt={championIdKrNameMap[championSummary.championId]}
                  width={48}
                  height={48}
                  css={style.mostChampionImage}
                />
                <div css={style.mostChampionText}>
                  <div css={style.championWinPercentage}>{(championSummary.winRate * 100).toFixed(0)}%</div>
                  <div css={style.championWinAverage}>{championSummary.avgKda.toFixed(2)} 평점</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div css={style.buttons}>
        <button
          type="button"
          onClick={() => {
            renewSummoner(
              { puuid: riotAccount.puuid },
              {
                onSuccess() {
                  alert('성공적으로 소환사 정보가 갱신됐습니다!');
                  // TODO: 페이지 새로고침 대신 `invalidateQueries()`를 사용해 데이터 갱신
                  router.reload();
                },
                onError(error) {
                  // 소환사에 대한 요청이 너무 많습니다. n초 후에 다시 시도해주세요. 에러
                  if (error.response?.data.status.code === 429) {
                    alert(error.response.data.status.message);
                  }
                },
              },
            );
          }}
          css={style.refreshButton}
        >
          <Reset width={24} height={24} />
        </button>
        <Link href={`/summoners/${riotAccount.name}#${riotAccount.tagLine}`} css={style.moreButton}>
          자세히 보기
        </Link>
      </div>
    </div>
  );
}
