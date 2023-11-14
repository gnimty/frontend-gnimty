import Image from 'next/image';

import championIdEnNameMap from '@/apis/constants/championIdEnNameMap';
import championIdKrNameMap from '@/apis/constants/championIdKrNameMap';
import type { RecommendedSummonersEntry } from '@/apis/types';
import championIconUrl from '@/apis/utils/championIconUrl';
import profileIconUrl from '@/apis/utils/profileIconUrl';
import shortTierName from '@/apis/utils/shortTierName';
import Chat from '@/assets/icons/system/chat.svg';
import Copy from '@/assets/icons/system/copy.svg';
import PositionImage from '@/components/common/position-image/PositionImage';
import StatusIndicator from '@/components/common/StatusIndicator';
import TierImage from '@/components/common/TierImage';

import * as style from './UserCardLandscape.style';

interface UserCardLandscapeProps {
  summoner: RecommendedSummonersEntry;
}

export default function UserCardLandscape(props: UserCardLandscapeProps) {
  const { summoner } = props;

  async function handleNameCopyButtonClick() {
    await navigator.clipboard.writeText(summoner.summonerName);
  }

  function handleChatButtonClick() {}

  return (
    <article css={style.userCardLandscape}>
      <div css={style.summonerInfo}>
        <Image src={profileIconUrl(summoner.iconId)} width={40} height={40} alt="" />
        <div css={style.summonerNameWrapper}>
          <p css={style.summonerName}>{summoner.summonerName}</p>
          <button type="button" css={style.copyNameButton} aria-label="닉네임 복사">
            <Copy width={16} height={16} aria-hidden onClick={handleNameCopyButtonClick} />
          </button>
        </div>
        <div css={style.statusWrapper}>
          <StatusIndicator status={summoner.status} />
        </div>
      </div>
      <div css={style.tierInfo}>
        <TierImage tier={summoner.queue} width={24} height={24} />
        <p css={style.tier}>{shortTierName({ division: summoner.division, tier: summoner.queue })}</p>
        <p css={style.leaguePoints}>{Intl.NumberFormat().format(summoner.lp)}LP</p>
      </div>
      <ol css={style.positionInfo}>
        <li css={style.positionItem}>
          <PositionImage position={summoner.frequentLane1} width={24} height={24} />
        </li>
        <li css={style.positionItem}>
          <PositionImage position={summoner.frequentLane2} width={24} height={24} />
        </li>
      </ol>
      <ol css={style.champions}>
        <li css={style.championItem}>
          <Image
            src={championIconUrl(championIdEnNameMap[summoner.frequentChampionId1])}
            alt={championIdKrNameMap[summoner.frequentChampionId1]}
            width={32}
            height={32}
            css={style.championImage}
          />
        </li>
        <li css={style.championItem}>
          <Image
            src={championIconUrl(championIdEnNameMap[summoner.frequentChampionId2])}
            alt={championIdKrNameMap[summoner.frequentChampionId2]}
            width={32}
            height={32}
            css={style.championImage}
          />
        </li>
        <li css={style.championItem}>
          <Image
            src={championIconUrl(championIdEnNameMap[summoner.frequentChampionId3])}
            alt={championIdKrNameMap[summoner.frequentChampionId3]}
            width={32}
            height={32}
            css={style.championImage}
          />
        </li>
      </ol>
      <p css={style.introduction}>{summoner.introduction}</p>
      <button type="button" aria-label="채팅하기" onClick={handleChatButtonClick} css={style.chatButton}>
        <Chat width={24} height={24} aria-hidden css={{ display: 'block', lineHeight: 0 }} />
      </button>
    </article>
  );
}
