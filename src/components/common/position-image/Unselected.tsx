import type { PositionIconProps } from './types';

export default function Unselected(props: PositionIconProps) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        fill="#4e4e4e"
        d="m12 9.17 2.828 2.828L12 14.827l-2.828-2.829zM5 10l-2 2 2 2v-4Zm14 4 2-2-2-2v4Zm-9 5 2 2 2-2h-4Zm4-14-2-2-2 2h4Z"
      />
    </svg>
  );
}
