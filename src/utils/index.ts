// 排除value为0
import { useEffect, useRef, useState } from "react";

export const isFalsy = (value: unknown): boolean =>
  value === 0 ? false : !value;

export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";

// [key: string]: unknown 表示 {name: "jack"} 键值对
export const cleanObject = (object: { [key: string]: unknown }) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

// 初始化调用hook (use开头)
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // 依赖项加callback()会造成无限循环
    // eslint-disable-next-line
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

export const useDocumentTitle = (title: string, keepOnUnmount = true) => {
  // 如果直接const oldTitle = document.title -》 oldTitle的值会随页面的加载而变化:
  // 使用useRef使得某个值在生命周期内不发生变化
  const oldTitle = useRef(document.title).current;

  useEffect(() => {
    document.title = title;
  }, [title]);

  // 退出页面时是否恢复默认
  useEffect(() => {
    return () => {
      if (keepOnUnmount) {
        // 如果不指定依赖，读到的就是旧title
        document.title = oldTitle;
      }
    };
  }, [keepOnUnmount, oldTitle]);
};

export const resetRoute = () => (window.location.href = window.location.origin);
