import Image from 'next/image';

import type { SummonerEntry } from '@/api/types';
import summonerDefaultProfile from '@/assets/images/summoner-default-profile.png';
import PositionImage from '@/components/common/position-image/PositionImage';
import StatusIndicator from '@/components/common/StatusIndicator';
import TierImage from '@/components/common/TierImage';
import Chat from '@/components/icons/Chat';
import Copy from '@/components/icons/Copy';

import * as style from './UserCardLandscape.style';

interface UserCardLandscapeProps {
  summoner: SummonerEntry;
}

export default function UserCardLandscape(props: UserCardLandscapeProps) {
  const { summoner } = props;

  async function handleNameCopyButtonClick() {
    await navigator.clipboard.writeText(summoner.name);
  }

  function handleChatButtonClick() {}

  return (
    <div css={style.userCardLandscape}>
      <div css={style.summonerInfo}>
        <Image src={summoner.profileImage ?? summonerDefaultProfile} alt="" width={40} height={40} />
        <div css={style.summonerNameWrapper}>
          <p css={style.summonerName}>{summoner.name}</p>
          <button type="button" css={style.copyNameButton} aria-label="닉네임 복사">
            <Copy width={16} height={16} aria-hidden onClick={handleNameCopyButtonClick} />
          </button>
        </div>
        <div css={style.statusWrapper}>
          <StatusIndicator status={summoner.status} />
        </div>
      </div>
      <div css={style.tierInfo}>
        <TierImage tier={summoner.tier} width={24} height={24} />
        {/* TODO: 서버쪽에서 어떻게 정확한 티어를 받아오는지 확인하고 수정  */}
        <p css={style.tier}>G1</p>
        <p css={style.leaguePoints}>{Intl.NumberFormat().format(summoner.leaguePoints)}LP</p>
      </div>
      <div css={style.positionInfo}>
        {summoner.positions.map((position) => (
          <PositionImage key={position} position={position} width={24} height={24} />
        ))}
      </div>
      {/* TODO: 나중에 이미지 어떻게 받아올지 이런 거 다 협의해서 수정  */}
      <div css={style.champions}>
        {summoner.champions.map((champion) => (
          <Image
            key={champion}
            src={`https://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/${champion}.png`}
            alt={champion}
            width={32}
            height={32}
            css={style.championImage}
          />
        ))}
      </div>
      <p css={style.introduction}>{summoner.introduction}</p>
      <button type="button" aria-label="채팅하기" onClick={handleChatButtonClick} css={style.chatButton}>
        <Chat width={24} height={24} aria-hidden css={{ display: 'block', lineHeight: 0 }} />
      </button>
    </div>
  );
}
