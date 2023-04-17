import { useEffect, useMemo, useRef, useState } from "react";
import "./animate.less";

interface AnimationNumberProps {
  num: number;
  /**多少秒滚动一格 */
  second?: number;
  itemHeight?: number;
  /*内容区域显示几项*/
  showNum?: number;
}
function AnimationNumber(props: AnimationNumberProps) {
  const { num, second = 0.5, itemHeight = 30, showNum = 1 } = props;
  const list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const start = useRef<number>();
  const frameStartIdx = useRef<number>(0);

  const containRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [startIndex, setStartIndex] = useState<number>(0);
  const [top, setTop] = useState<number>(0);
  const endIndex = useMemo(() => {
    return (
      startIndex +
      Math.floor((containRef.current?.clientHeight || 0) / itemHeight) +
      2
    );
  }, [startIndex, containRef.current]);
  const showData = useMemo(() => {
    if (endIndex <= list.length - 1) {
      return list.slice(startIndex, endIndex);
    } else {
      return list
        .slice(startIndex)
        .concat(list.slice(0, endIndex - (list.length - 1)));
    }
  }, [startIndex, endIndex]);
  function step(timestamp: number) {
    if (start.current === undefined) {
      start.current = timestamp;
    }
    const elapsed = timestamp - start.current;
    // 1000  =>30
    // 1  =>0.03
    // elapsed为起始帧和当前帧差值，由于我们想的是每1s滚动过一条，因此每1ms运动的距离为0.03px
    /**
     * 算法：1000ms 走完30    1ms 走  30/1000=0.03
     *      500ms 走完30    1ms 走  30/500=0.06
     */
    const count = Math.min(
      (itemHeight * elapsed) / (1000 * second),
      itemHeight
    );
    setStartIndex(frameStartIdx.current);
    setTop(-count);
    if (count === itemHeight) {
      // 当运动了30px后，重置我们的showContain位置
      setTop(0);
      if (frameStartIdx.current === list.length - 1) {
        // 起始帧数大于原数据最大索引后重置
        frameStartIdx.current = 0;
        setStartIndex(frameStartIdx.current);
      } else {
        frameStartIdx.current += 1;
        setStartIndex(frameStartIdx.current);
      }
      start.current = undefined;
    }
    let val = num % 10;
    if (showNum === 3) {
      val = val - 1;
      if (val === -1) val = 9;
    }

    //放开这里就是循环无限滚动
    if (frameStartIdx.current === val) {
      start.current = undefined;
      return;
    }
    //放开这里就是循环无限滚动

    // 递归调用，实现无限滚动
    requestAnimationFrame(step);
  }
  useEffect(() => {
    requestAnimationFrame(step);
  }, [num]);

  return (
    <div>
      <div
        className="view-contain"
        ref={containRef}
        style={{ height: itemHeight * showNum, width: itemHeight }}
      >
        <div className="data-contain" ref={wrapRef} style={{ top }}>
          {showData.map((v) => (
            <div
              className="data-contain-item"
              key={v}
              style={{ height: itemHeight }}
            >
              {v}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AnimationNumber;
