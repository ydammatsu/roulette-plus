import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { RouletteContainer } from 'components/RouletteContainer';
import Head from 'next/head';

const RoulettePage: NextPage = () => {
  const router = useRouter();
  const { name } = router.query;
  let rouletteName = '';
  if (typeof name === 'string') {
    rouletteName = name;
  }

  return rouletteName !== '' ? (
    <>
      <Head>
        <title>{rouletteName}</title>
      </Head>
      <RouletteContainer rouletteName={rouletteName} />
    </>
  ) : (
    <Head>
      <title>{rouletteName}</title>
    </Head>
  );
};

export default RoulettePage;
