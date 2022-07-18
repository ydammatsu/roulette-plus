import { useState, useEffect } from "react";

export const useWaitRender = () => {
  const [isRendered, setIsRendered] = useState(false)
  useEffect(() => {
    setIsRendered(true);
  }, []);

  return isRendered;
}
