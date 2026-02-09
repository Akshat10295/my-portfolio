import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkDevice = () => {
      const isSmallScreen = window.innerWidth < MOBILE_BREAKPOINT;
      const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
      setIsMobile(isSmallScreen || isTouchDevice);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  return isMobile;
}
