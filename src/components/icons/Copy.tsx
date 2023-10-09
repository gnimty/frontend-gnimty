import type { IconProps } from './types';

export default function Copy(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <rect width="10" height="12" x="5.5" y="7.5" rx=".5" />
      <path stroke-linecap="round" d="M8 4h10a1 1 0 0 1 1 1v12" />
    </svg>
  );
}
