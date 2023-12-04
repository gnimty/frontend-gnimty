export default function championIconUrl(championEnName: string): string {
  // TODO: 13.18.1 버전을 환경변수 등으로 교체
  return `https://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/${championEnName}.png`;
}
