import { useCallback, useEffect, useState } from 'react';

/**
 * 스톱워치 기능을 제공하는 훅입니다. 경과된 시간(초)과 스톱워치의 실행 상태를 관리합니다.
 *
 * @returns 경과된 시간(초)과 스톱워치의 실행 상태를 관리하는 함수들을 포함하는 객체입니다.
 */
export default function useStopWatch() {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const intervalId = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning]);

  const start = useCallback(() => {
    setIsRunning(true);
  }, []);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  return { elapsedSeconds, isRunning, start, pause };
}
