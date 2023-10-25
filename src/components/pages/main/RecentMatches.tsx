import Image from 'next/image';
import { useState } from 'react';

import Edit from '@/assets/icons/system/edit.svg';
import Like from '@/assets/icons/system/like.svg';
import Reset from '@/assets/icons/system/reset.svg';
import summonerDefaultProfile from '@/assets/images/summoner-default-profile.png';
import StatusIndicator from '@/components/common/StatusIndicator';
import TierImage from '@/components/common/TierImage';

import * as style from './RecentMatches.style';

export default function RecentMatches() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function linkRiotAccount() {
    setIsLoggedIn(true);
  }

  if (!isLoggedIn) {
    return (
      <article css={style.recentMatchesRoot}>
        <header css={style.recentMatchesHeader}>
          <h2 css={style.recentMatchesTitle}>소환사 최근 전적</h2>
        </header>
        <div css={style.recentMatchesContent({ isLoggedIn })}>
          <p css={style.riotLinkSuggestionText}>{'라이엇 계정 연동하고\n더 많은 정보를 누려보세요!'}</p>
          <button type="button" onClick={linkRiotAccount} css={style.riotLinkButton}>
            라이엇 계정 연동하기
          </button>
        </div>
      </article>
    );
  }

  return (
    <article css={style.recentMatchesRoot}>
      <header css={style.recentMatchesHeader}>
        <h2 css={style.recentMatchesTitle}>소환사 최근 전적</h2>
      </header>
      <div css={style.recentMatchesContent({ isLoggedIn })}>
        <div css={style.summonerAndInGameInfo}>
          <div css={style.profileImageWrapper}>
            <Image src={summonerDefaultProfile} fill alt="" />
            <div css={style.tag}>000</div>
          </div>
          <div css={style.summonerAndInGameRight}>
            <div css={style.summonerInfo}>
              <div css={style.summonerInfoLeft}>
                <strong css={style.summonerName}>T1 Gumayusi</strong>
                <StatusIndicator status="ONLINE" width={6} height={6} />
                <Edit width={24} height={24} css={style.editIcon} />
              </div>
              <div css={style.likeBadge}>
                <Like width={20} height={20} css={style.likeIcon} />
                <div css={style.likeCount}>1,234</div>
              </div>
            </div>
            <div css={style.inGameInfo}>
              <TierImage tier="grandmaster" width={28} height={28} />
              <div css={style.rank}>GM</div>
              <div css={style.leaguePoints}>0,000LP</div>
            </div>
          </div>
        </div>

        <div css={style.recentMatchesAndChampions}>
          <div css={style.recentMatchesColumn}>
            <div css={style.recentMatchesScore}>20전 14승 6패</div>
            <div css={style.recentMatchesAverage}>3.3 평점</div>
          </div>
          <div css={style.mostChampions}>
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} css={style.mostChampion}>
                <Image
                  src="https://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/Naafiri.png"
                  alt="나피리"
                  width={48}
                  height={48}
                  css={style.mostChampionImage}
                />
                <div css={style.mostChampionText}>
                  <div css={style.championWinPercentage}>100%</div>
                  <div css={style.championWinAverage}>8.00 평점</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div css={style.buttons}>
          <button type="button" css={style.refreshButton}>
            <Reset width={24} height={24} />
          </button>
          <button type="button" css={style.moreButton}>
            자세히 보기
          </button>
        </div>
      </div>
    </article>
  );
}
