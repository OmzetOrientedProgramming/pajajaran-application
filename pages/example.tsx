import React from 'react';
import 'twin.macro';
import { useQuery, useQueryClient } from 'react-query';

import Button from '../components/Example/Button';
import { Layout } from '../components/Utils/Layout';
import Head from 'next/head';

// Fetch API function
const getData = async () => {
  const response = await fetch('https://catfact.ninja/facts');
  if (!response.ok) {
    console.log('Response error');
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const Example: React.FC = () => {
  const queryClient = useQueryClient();
  console.log(queryClient);

  // Query hook
  const { data, status, error } = useQuery('data', getData);
  console.log(data);

  return (
    <>
      <Head>
        <title>Example</title>
      </Head>
      <Layout>
        <div tw="pt-8 pb-16 flex flex-col items-center justify-center min-h-screen w-full">
          <Button>Back to Home</Button>
          {status === 'loading' && <p>Loading data . . .</p>}

          {status === 'error' && <p>Error: {error}</p>}
          <div tw="my-4 flex flex-col items-center justify-center">
            {status === 'success' &&
              data.data.map((fact: any, key: any) => (
                <div key={key} tw="text-center">
                  <p>{fact.fact}</p>
                  <p>{fact.length}</p>
                </div>
              ))}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Example;
