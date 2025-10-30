// src/hooks/useMessageLimit.ts
import { useEffect, useState } from "react";
import { FREE_MESSAGE_LIMIT } from "@/utils/constants";

export function useMessageLimit(isPro = false) {
  const [count, setCount] = useState(0);
  const [today, setToday] = useState(new Date().toDateString());

  useEffect(() => {
    if (isPro) return;
    
    const stored = JSON.parse(localStorage.getItem("lol_message_limit") || "{}");
    if (stored.date === new Date().toDateString()) {
      setCount(stored.count || 0);
    } else {
      localStorage.setItem("lol_message_limit", JSON.stringify({ 
        date: new Date().toDateString(), 
        count: 0 
      }));
      setCount(0);
    }
  }, [isPro]);

  function increment() {
    if (isPro) return;
    const newCount = count + 1;
    setCount(newCount);
    localStorage.setItem("lol_message_limit", JSON.stringify({ 
      date: new Date().toDateString(), 
      count: newCount 
    }));
  }

  function reset() {
    setCount(0);
    localStorage.setItem("lol_message_limit", JSON.stringify({ 
      date: new Date().toDateString(), 
      count: 0 
    }));
  }

  return { 
    canSend: isPro || count < FREE_MESSAGE_LIMIT, 
    count, 
    increment,
    reset,
    limit: FREE_MESSAGE_LIMIT
  };
}