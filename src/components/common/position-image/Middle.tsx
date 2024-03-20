import type { PositionIconProps } from './types';

export default function Middle(props: PositionIconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-label="미드" {...props}>
      <path
        fill={props.fill ?? '#a2a2a2'}
        d="M4.37 9.331V4.357h9.964L13.16 5.523l-1.173 1.165-2.643.001-2.643.001L6.7 9.345 6.696 12l-1.163 1.153-1.164 1.152V9.331Zm6.476 9.145 1.166-1.166h5.286v-5.302l.476-.492c.262-.27.787-.795 1.166-1.166l.69-.675v9.968H9.68l1.166-1.167Z"
      />
      <path
        fill={props.fill ?? '#4e4e4e'}
        d="M4.37 18.179v-1.465l6.178-6.178 6.179-6.179h2.904v2.929l-6.18 6.178-6.178 6.179H4.37v-1.464Z"
      />
    </svg>
  );
}
