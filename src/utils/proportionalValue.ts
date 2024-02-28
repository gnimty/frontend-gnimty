/**
 * a : b = c : x 형태의 비율에서 x를 찾습니다.
 */
export default function proportionalValue(a: number, b: number, c: number) {
  const x = (b * c) / a;
  return x;
}
