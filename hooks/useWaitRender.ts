import { useState, useEffect } from "react";

// 初回描画時に styled components に style が当たらない瞬間が存在するので render をブロックするために使う
export const useWaitRender = () => {
  const [isRendered, setIsRendered] = useState(false)
  useEffect(() => {
    setIsRendered(true);
  }, []);

  return isRendered;
}
