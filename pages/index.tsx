import Head from 'next/head';
import Link from 'next/link';
import tw, { css, styled } from 'twin.macro';
import { Layout } from '../components/Utils/Layout';

// Example creating styled component
const Title = styled.h1`
  font-size: 4rem;
`;

const Home: React.FC = () => {
  return (
    <Layout>
      <Head>
        <title>Home</title>
      </Head>

      {/* Example styling with tailwind classes */}
      <div tw="pt-8 pb-16 flex flex-col items-center justify-center min-h-screen w-full">
        {/* Example styling with inline css/tailwind */}
        <h1
          css={[
            css`
              font-color: #f0f0f0;
            `,
            tw`text-xl font-bold`,
          ]}
        >
          Next JS
        </h1>

        {/* Using previously made styled component*/}
        <Title>Airlangga Web</Title>

        <div tw="w-32 flex justify-between items-center">
          <Link href="/example">
            <button>Example</button>
          </Link>
          <Link href="/empty">
            <button>Null</button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
