import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkDevice = () => {
      const isSmallScreen = window.innerWidth < MOBILE_BREAKPOINT;
      const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
      const hasMouse = window.matchMedia("(pointer: fine)").matches;

      // ✅ Mobile = small screen AND no fine pointer (mouse)
      setIsMobile(isSmallScreen && isCoarsePointer && !hasMouse);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  return isMobile;
}
