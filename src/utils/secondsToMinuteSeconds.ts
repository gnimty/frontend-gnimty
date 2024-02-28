export default function secondsToMinuteSeconds(totalSeconds: number): [number, number] {
  const minutes = totalSeconds / Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return [minutes, seconds];
}
