import { useState, useEffect } from 'react';

// FIXME: 初回描画時に styled components に style が当たらない瞬間が存在するので render をブロックしている
// 対処法が分からないのでやむなく実装している
export const useWaitRender = () => {
  const [isRendered, setIsRendered] = useState(false);
  useEffect(() => {
    setIsRendered(true);
  }, []);

  return isRendered;
};
