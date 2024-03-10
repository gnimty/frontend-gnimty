export type Status = 'ONLINE' | 'OFFLINE' | 'AWAY';

export type Tier =
  | 'unknown'
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

export type QueueType = 'ARAM' | 'ALL' | GameMode;

export interface SoloTierDto {
  tier: Tier;
  division: number;
  lp: number;
}

export type SortBy = 'RECOMMEND' | 'TIER' | 'ATOZ';

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
  /** 솔로랭크 순위정보로, 마스터 이상 유저에 한해서만 해당 필드가 노출됩니다. */
  rank?: number;
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
  championName: string;
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

export interface RiotAccountEntry {
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
  provider: 'GOOGLE' | 'KAKAO';
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
  championId: number;
  plays: number;
  wins: number;
  defeats: number;
  winRate: number;
  avgKda: number;
  isPerfect: boolean;
}

export type LaneSummaryDto = Record<Position, number>;

export interface MatchSummaryDto {
  plays: number;
  wins: number;
  defeats: number;
  winRate: number;
  avgKda: number;
  isPerfect: boolean;
  championSummary: ChampionSummaryDto[];
  laneSummary: LaneSummaryDto;
}

export interface SummonerPlayDto {
  totalPlays: number;
  avgCs: number;
  avgCsPerMinute: number;
  avgKda: number;
  avgKill: number;
  avgDeath: number;
  avgAssist: number;
  winRate: number;
  totalWin: number;
  totalDefeat: number;
  championId: number;
  championName: string;
  avgGold: number;
  avgDamage: number;
  maxKill: number;
  maxDeath: number;
  perfect: boolean;
}

export interface StatPerk {
  defense: number;
  offense: number;
  flex: number;
}

export interface Selection {
  perk: number;
  var1: number;
  var2: number;
  var3: number;
}

export interface PerkDetail {
  description: string;
  style: number;
  selections: Selection[];
}

export interface Perk {
  statPerks: StatPerk;
  styles: PerkDetail[];
}

/** 100이 블루팀 200이 레드팀 */
export type TEAM_ID = 100 | 200;

export interface CurrentGameParticipantDto {
  teamId: TEAM_ID;
  summoner: SummonerDto;
  championId: number;
  championName: string;
  summonerPlayDto: SummonerPlayDto;
  spellDId: number;
  spellFId: number;
  perks: Perk;
}

export interface QueueDto {
  /** 큐 ID */
  queueId: number;
  name: string;
  map: string;
}

export interface ApiStatus {
  message: string;
  code: number;
  field: string;
}

export interface DuoSummonersRequest {
  gameMode?: GameMode;
  status?: Status;
  preferChampionIds?: string[]; // max 3
  duoable?: boolean;
  tier?: Tier | 'unknown';
  lanes?: Position[];
  sortBy?: SortBy;
  timeMatch?: boolean;
  lastSummonerId: number | null;
  lastName: string | null;
  lastSummonerMmr: number | null;
  lastSummonerUpCount: number | null;
  pageSize: number;
}
