import { NextPage } from "next";
import { useRouter } from "next/router";
import { useWaitRender } from "hooks/useWaitRender";
import { RouletteContainer } from "components/RouletteContainer";

const RoulettePage: NextPage = () => {
  const router = useRouter()
  const { name } = router.query
  let rouletteName = ''
  if (typeof name === 'string') {
    rouletteName = name;
  }

  // CSSが摘要されるのを待つ
  const isRendered = useWaitRender()

  return isRendered && rouletteName !== '' ? (
    <RouletteContainer rouletteName={rouletteName}/>
  ): (<></>);
}

export default RoulettePage
