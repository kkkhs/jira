// 排除value为0
import { useEffect, useState } from "react";

export const isFalsy = (value: unknown): boolean =>
  value === 0 ? false : !value;

export const cleanObject = (object: object) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    // @ts-ignore
    const value = result[key];
    if (isFalsy(value)) {
      // @ts-ignore
      delete result[key];
    }
  });
  return result;
};

// 初始化调用hook (use开头)
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

// 泛型规范类型
export const useDebounce = <V>(value: V, delay?: number) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    // 每次value变化后，设置一个定时器
    const timeout = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    // 每次在上一个useEffect处理完以后再运行
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debounceValue;
};

export const useArray = <T>(initialArray: T[]) => {
  const [value, setValue] = useState(initialArray);

  return {
    value,
    setValue,
    clear: () => {
      setValue([]);
    },
    removeIndex: (index: number) => {
      const copy = [...value];
      copy.splice(index, 1);
      setValue(copy);
    },
    add: (item: T) => {
      setValue([...value, item]);
    },
  };
};
