import type { PositionIconProps } from './types';

export default function Bottom(props: PositionIconProps) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        fill="#a2a2a2"
        d="M4.361 4.355c4.715 0 9.43-.001 14.144.002-.988.98-1.978 1.96-2.969 2.94H7.302v8.235L4.362 18.5c-.002-4.715 0-9.43 0-14.145Z"
      />
      <path
        fill="#4e4e4e"
        d="m7.33 18.479 1.166-1.167h8.81V8.48l1.002-.997c.552-.548 1.077-1.067 1.167-1.154l.164-.156v13.473H6.164L7.33 18.48Z"
      />
      <path fill="#a2a2a2" d="M10.258 12.294V10.24h4.083v4.107H10.26v-2.054Z" />
    </svg>
  );
}
