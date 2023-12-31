export type Status = 'ONLINE' | 'OFFLINE' | 'AWAY';

export type Tier =
  | 'UNRANKED'
  | 'iron'
  | 'bronze'
  | 'silver'
  | 'gold'
  | 'platinum'
  | 'emerald'
  | 'diamond'
  | 'master'
  | 'grandmaster'
  | 'challenger';

export type Position = 'TOP' | 'JUNGLE' | 'MIDDLE' | 'BOTTOM' | 'UTILITY';

export type PositionFilter = Position | 'ALL';

export type GameMode = 'RANK_SOLO' | 'RANK_FLEX' | 'BLIND';

export interface SoloTierDto {
  tier: Tier;
  division: number;
  lp: number;
}

export interface RecommendedSummonersEntry {
  /** 소환사 id */
  id: number;
  /** 소환사 이름 */
  name: string;
  /** 소환사 태그 */
  tagLine: string;
  /** 소환사 상태 */
  status: Status;
  /** 대표 소환사 여부(true) */
  isMain: boolean;
  /** puuid */
  puuid: string;
  /** 티어 */
  queue: Tier;
  /** lp */
  lp: number;
  /** 세부 티어 */
  division: number;
  /** mmr */
  mmr: number;
  /** 자주 가는 라인 1 */
  frequentLane1: Position;
  /** 자주 가는 라인 2 */
  frequentLane2: Position;
  /** 선호 챔피언 1 */
  frequentChampionId1: number;
  /** 선호 챔피언 2 */
  frequentChampionId2: number;
  /** 선호 챔피언 2 */
  frequentChampionId3: number;
  /** 대표 소개글 */
  introduction: string;
  /** up 수 */
  upCount: number;
  /** icon id */
  iconId: number;
}

export interface SummonerTierDto {
  /** 속해있는 티어 정보 */
  tier: Tier;
  /** 티어 소분류로 1~4의 값을 가짐 */
  division: number;
  /** 리그 포인트 (랭크 점수) */
  lp: number;
  /** 티어 환산 수치 */
  mmr: number;
  /** 총 플레이 수 */
  plays: number;
  /** 총 승리 수 */
  wins: number;
  /** 총 패배 수 */
  defeats: number;
  /** 승률 */
  winRate: number;
  /** 최근 20게임 자주 플레이한 챔피언 */
  mostChampionIds: number[];
  /** 최근 20게임 자주 가는 포지션 */
  mostLanes: Position[];
}

export interface SummonerRankDto {
  /** 소환사 puuid */
  puuid: string;
  /** 소환사 이름 */
  summonerName: string;
  /** 소환사 태그라인 */
  tagLine: string;
  /** 축약형 소환사 태그네임 */
  internalTagName: string;
  /** 프로필 아이콘 id */
  profileIconId: number;
  /** 소환사 레벨 */
  summonerLevel: number;
  /** 요청한 큐 타입의 티어 정보 */
  tierInfo: SummonerTierDto;
  /** 소환사 순위 */
  rank: number;
}

export type ChampionTier = 'OP' | '1' | '2' | '3' | '4' | '5';

export interface ChampionDto {
  championId: number;
  krName: string;
  enName: string;
}

export interface ChampionTierDto {
  championId: number;
  winRate: number;
  pickRate: number;
  banRate: number;
  plays: number;
  tier: ChampionTier;
}

export interface SkinSaleRes {
  skinName: string;
  originRp: number;
  discountedRp: number;
  skinImgUrl: string;
  discountedRate: number;
}

export interface PatchVersion {
  version: string;
  releaseNoteUrl: string;
  releaseNoteImgUrl: string;
}

export interface ChampionSaleRes {
  championId: number;
  enName: string;
  krName: string;
  originRp: number;
  discountedRp: number;
  discountedRate: number;
  originIp: number;
}
