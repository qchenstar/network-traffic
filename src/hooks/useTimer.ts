import { useState, useEffect } from 'react';

/**
 * 自定义Hook，用于管理定时器和实时数据更新
 * @param interval 定时器间隔（毫秒）
 * @param initialData 初始数据
 * @param updateFn 数据更新函数
 * @returns 当前数据
 */
export function useTimer<T>(
  interval: number,
  initialData: T,
  updateFn: (prev: T) => T
): T {
  const [data, setData] = useState<T>(initialData);

  useEffect(() => {
    const timer = setInterval(() => {
      setData(prev => updateFn(prev));
    }, interval);

    return () => clearInterval(timer);
  }, [interval, updateFn]);

  return data;
}

/**
 * 自定义Hook，用于获取当前时间
 * @param interval 时间更新间隔（毫秒）
 * @returns 当前时间
 */
export function useCurrentTime(interval: number = 1000): Date {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, interval);

    return () => clearInterval(timer);
  }, [interval]);

  return currentTime;
}
