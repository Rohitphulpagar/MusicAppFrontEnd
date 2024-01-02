import React, { useEffect, useState } from "react";

import Mobile from "../src/Mobileview/Mobile/Mobile";
import Desktop from "./DesktopView/Desktop";
function App() {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 500);
  useEffect(() => {
    const controlResize = () => {
      setIsDesktop(window.innerWidth > 500);
    };
    window.addEventListener("resize", controlResize);
    return () => {
      window.removeEventListener("resize", controlResize);
    };
  }, []);
  return <div className="App">{isDesktop ? <Desktop /> : <Mobile />}</div>;
}

export default App;
