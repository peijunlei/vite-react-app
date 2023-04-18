

import { Space, Button } from 'antd';
import { useEffect, useRef, useState } from 'react';
import AnimationNumber from './animation-number/animationNumber';


function Home() {
  const [counter, setCounter] = useState<number>(123);
  const [currentHour, setCurrentHour] = useState<number>(0);
  const [currentMinute, setCurrentMinute] = useState<number>(0);
  const [currentSecond, setCurrentSecond] = useState<number>(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      setCurrentHour(now.getHours());
      setCurrentMinute(now.getMinutes());
      setCurrentSecond(now.getSeconds()+1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const numbers = (currentHour.toString().padStart(2, "0") + currentMinute.toString().padStart(2, "0") + currentSecond.toString().padStart(2, "0")).split("")
  return (
    <Space>
      <h3>Current time is:</h3>
      {numbers
        .map((v, i) => (
          <AnimationNumber num={Number(v)} key={i} showNum={1}  />
        ))}
    </Space>
  );
}
export default Home;
