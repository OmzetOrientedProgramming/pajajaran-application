import Head from 'next/head';
import 'twin.macro';
import { Layout } from '../components/Utils/Layout';
import withAuth from '../components/Utils/HOC/WithAuth';
import tw, { css } from 'twin.macro';

const Home: React.FC = () => {
  return (
    <Layout>
      <Head>
        <title>Home</title>
      </Head>

      <div
        css={[
          css`
            position: absolute;
            top: 50%;
            left: 50%;
            margin-right: -50%;
            transform: translate(-50%, -50%);
          `,
          tw`flex flex-col items-center justify-center min-h-screen w-full`,
        ]}
      >
        <h1 tw="font-bold text-2xl mb-8">Selamat Datang ke Dashboard Admin</h1>
        <p tw="text-xl">Silahkan eksplorasi melalui tombol navigasi di atas!</p>
      </div>
    </Layout>
  );
};

export default withAuth(Home);
