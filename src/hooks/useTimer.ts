import { useCallback, useEffect, useState } from 'react';

const interval =
  (delay = 0) =>
  (callback: () => void) =>
    useEffect(() => {
      const id = setInterval(callback, delay);

      return () => clearInterval(id);
    }, [callback]);

const useSecondsInterval = interval(1000);

interface useTimerProps {
  initialSeconds: number;
  initiallyRunning?: boolean;
  callback?: () => void;
}

export const secondsFormatter = (seconds: number) =>
  `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;

export const useTimer = ({ initialSeconds = 0, initiallyRunning = false, callback = () => {} }: useTimerProps) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [running, setRunning] = useState(initiallyRunning);

  const tick = useCallback(() => {
    if (running) {
      if (seconds <= 0) {
        pause();
        callback();
      }
      setSeconds((seconds) => (seconds > 0 ? seconds - 1 : seconds));
    }
  }, [callback, running, seconds]);

  const start = () => setRunning(true);
  const pause = () => setRunning(false);
  const reset = () => setSeconds(initialSeconds);
  const stop = () => {
    pause();
    reset();
  };

  useSecondsInterval(tick);

  return { pause, reset, running, seconds, start, stop };
};
