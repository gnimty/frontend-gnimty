import type { ComponentPropsWithoutRef } from 'react';

interface LogoProps extends ComponentPropsWithoutRef<'svg'> {}

export default function Logo(props: LogoProps) {
  return (
    <svg viewBox="0 0 426 200" fill="currentColor" {...props}>
      <path d="M203.665 97.453h-46.78v5.861h46.78v-5.861Z" />
      <path d="M0 0v145.435h340.596L358.903 200 426 0H0Zm203.392 23.718h25.565v48.243h-25.565V23.718Zm-72.072 0h25.43v26.501l34.813-4.158v18.403l-60.24 7.497V23.718h-.003Zm-9.75 98.012H23.66v-20.447h97.91v20.447Zm-8.535-36.807H88.967l4.494-40.758h-69.8V23.718h97.909l-8.535 61.205Zm116.194 36.794H131.32V79.05h97.909v42.667Zm72.574 0-62.823.013V23.718h61.464v20.585h-35.9v18.262h35.9v20.447h-35.9v18.268l37.259-.013v20.45Zm35.086 0h-25.565V23.718h25.565v97.999Zm23.244 0h-13.154V101.27h20.015l-6.861 20.447Zm12.343-36.794h-25.564l13.628-40.62h-13.628V23.718h46.1l-20.536 61.205Z" />
    </svg>
  );
}