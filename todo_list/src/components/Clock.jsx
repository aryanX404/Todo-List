import React, {useState, useEffect} from 'react'
import './Clock.css';

export default function Clock() {
    const [time, setTime] = useState(()=>{
        const today = new Date();
        return today.toLocaleTimeString([], { 
          hour: '2-digit', 
          minute: '2-digit', 
          second: '2-digit',
          hour12:true
        });
      });
      useEffect(() => {
          const interval = setInterval(()=>{
            const today = new Date();
            setTime(today.toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit', 
              second: '2-digit',
              hour12:true
            }));
          },1000);
          return () => clearInterval(interval);
        },[]);
  return <p>{time}</p>; 
}
