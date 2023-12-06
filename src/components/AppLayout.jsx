import React from 'react'
import MobileLayout from './MobileLayout'
import DesktopLayout from './DesktopLayout'
import { useEffect, useState } from 'react';



export default function AppLayout() {
  const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const setResponsiveness = () => {
    return window.innerWidth < 950
      ? setIsMobile(true)
      : setIsMobile(false);
  };

  setResponsiveness();
  window.addEventListener("resize", () => setResponsiveness()); 
}, []);

return isMobile ? <MobileLayout /> : <DesktopLayout />;
}
