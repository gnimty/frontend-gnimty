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

export interface SummonerDto {
  /** 소환사명 */
  summonerName: string;
  /** 소환사명의 모든 공백 제거 및 lowerCase로 적용한 문자열 */
  internalName: string;
  /** 소환사 태그라인 */
  tagLine: string;
  /** internalName + '#' + 태그라인 lowerCase로 적용한 문자열 */
  internalTagName: string;
  /** 소환사 puuid */
  puuid: string;
  /** 소환사 id */
  summonerId: string;
  /** 소환사 프로필 아이콘 id */
  profileIconId: number;
  /** 소환사 레벨 */
  summonerLevel: number;
  /** 솔로랭크 티어 정보 */
  soloTierInfo: SummonerTierDto;
  /** 자유랭크 티어 정보 */
  flexTierInfo: SummonerTierDto | null;
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

export interface RiotDependentInfo {
  isLinked: boolean;
  status: Status;
  introductions: IntroductionEntry[];
  schedules: ScheduleEntry[];
  preferGameModes: PreferGameModeEntry[];
  riotAccounts: RiotAccountEntry[];
}

interface IntroductionEntry {
  id: number;
  content: string;
  isMain: boolean;
}
interface ScheduleEntry {
  dayOfWeek: DayOfWeek;
  startTime: number;
  endTime: number;
}

type DayOfWeek = 'SUNDAY' | 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY';

interface PreferGameModeEntry {
  gameMode: GameMode;
}

interface RiotAccountEntry {
  id: number;
  name: string;
  tagLine: string;
  isMain: boolean;
  puuid: number;
  queue: Tier;
  lp: number;
  division: number;
  mmr: number;
  frequentLane1: Position;
  frequentLane2: Position;
  frequentChampionId1: number;
  frequentChampionId2: number;
  frequentChampionId3: number;
  queueFlex: Tier;
  lpFlex: number;
  divisionFlex: number;
  mmrFlex: number;
  frequentLane1Flex: Position;
  frequentLane2Flex: Position;
  frequentChampionId1Flex: number;
  frequentChampionId2Flex: number;
  frequentChampionId3Flex: number;
  iconId: number;
}

export interface OauthInfoEntry {
  email: string;
  provider: 'Google' | 'Kakao';
}

export interface ProfileEntry {
  id: number;
  email: string;
  nickname: string;
  favoriteChampionId?: number;
  upCount: number;
  riotDependentInfo: RiotDependentInfo;
  oauthInfos: OauthInfoEntry[];
}

export interface ChampionSummaryDto {
  plays: number;
  wins: number;
  defeats: number;
  winRate: number;
  avgKda: number;
  isPerfect: boolean;
}

export interface MatchSummaryDto {
  plays: number;
  wins: number;
  defeats: number;
  winRate: number;
  avgKda: number;
  isPerfect: boolean;
  championSummary: ChampionSummaryDto[];
}

export interface ApiStatus {
  message: string;
  code: number;
  field: string;
}
