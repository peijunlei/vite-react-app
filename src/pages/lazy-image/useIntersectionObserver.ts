import { useEffect, useRef } from "react";

const useIntersectionObserver = (domList: HTMLImageElement[], deps = [0]) => {
  // 接收两个参数，dom元素的class和指定交叉比例(threshold)的依赖项

  const observerRef = useRef(
    new IntersectionObserver(
      (entries) => {
        entries.forEach((item) => {
          // entries 是被监听的dom集合，是一个数组
          if (item.intersectionRatio <= 0) return; // intersectionRatio 是可见度 如果当前元素不可见就结束该函数。
          const target = item.target as HTMLImageElement;
          target.src = target.dataset["src"] || ""; // 将 h5 自定义属性赋值给 src (进入可见区则加载图片)
          target.onload = () => {
            observerRef.current.unobserve(target);
          };
        });
      },
      {
        threshold: 0, // 用来指定交叉比例，决定什么时候触发回调函数，为1 表示完全展示出来
        // rootMargin:'200px'
      }
    )
  );

  useEffect(() => {
    domList.forEach((item) => observerRef.current.observe(item)); // observe 开始观察，接受一个DOM节点对象
    return () => {
      observerRef.current.disconnect();
    }; // 组件卸载时关闭观察器
  }, [domList]);
};

export default useIntersectionObserver;