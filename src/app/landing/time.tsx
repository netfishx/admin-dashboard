"use client";
import { TZDateMini } from "@date-fns/tz";
import NumberFlow, { NumberFlowGroup } from "@number-flow/react";
import { useEffect, useState } from "react";

export function Time() {
  const [time, setTime] = useState(new Date());
  const date = new TZDateMini(time).withTimeZone("Asia/Shanghai");
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <NumberFlowGroup>
      <NumberFlow
        format={{ notation: "compact", minimumIntegerDigits: 2 }}
        value={year}
      />
      -
      <NumberFlow format={{ minimumIntegerDigits: 2 }} value={month} />-
      <NumberFlow format={{ minimumIntegerDigits: 2 }} value={day} />
      &nbsp;
      <NumberFlow format={{ minimumIntegerDigits: 2 }} value={hour} />:
      <NumberFlow format={{ minimumIntegerDigits: 2 }} value={minute} />:
      <NumberFlow format={{ minimumIntegerDigits: 2 }} value={second} />
    </NumberFlowGroup>
  );
}
