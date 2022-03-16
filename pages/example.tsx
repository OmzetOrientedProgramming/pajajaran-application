import React from 'react';
import 'twin.macro';
import Head from 'next/head';
import toast from 'react-hot-toast';
import { useGetExample, usePostExample } from '../requests/hooks/exampleHooks';
import Button from '../components/Utils/Button';
import Link from 'next/link';
import { Layout } from '../components/Utils/Layout';

const Example: React.FC = () => {
  // Init POST Request Example (using hook from /requests/)
  const { mutate: postRegistration, isLoading: isPostingRegistration } =
    usePostExample();

  // GET Request Example with dummy params (using hook from /requests/)
  const { data, status, error } = useGetExample(
    { id: '1', page: 2 }, // data can be from state or other variable
    {
      onSuccess: (res: any) => {
        // console.log('res:', res);
        toast.success('Get Success!');
      },
      onError: (err: any) => {
        // console.log('err', err);
        toast.error(err.response.data.message, { position: 'top-right' });
      },
    }
  );

  return (
    <Layout>
      <Head>
        <title>Example Page</title>
      </Head>
      <div tw="flex flex-col items-center w-full">
        <div tw="w-[200px]">
          <Link href="/">
            <a>
              <Button buttonType="primary">Back to Home</Button>
            </a>
          </Link>
        </div>

        {status === 'loading' && <p>Getting data . . .</p>}

        {status === 'error' && <p>Error: {error}</p>}
        <div tw="my-4 flex flex-col items-center justify-center">
          {status === 'success' &&
            data?.data.data.map((user: any, key: any) => (
              <div key={key} tw="text-center mb-2">
                <p>{user.name}</p>
                <p>{user.age}</p>
              </div>
            ))}
        </div>

        {isPostingRegistration && <p>Posting . . .</p>}

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
          dolore maxime inventore deserunt corporis provident rerum. Tempore
          alias impedit nisi quisquam quaerat natus, dignissimos necessitatibus
          accusamus nesciunt, perspiciatis explicabo eligendi!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
          dolore maxime inventore deserunt corporis provident rerum. Tempore
          alias impedit nisi quisquam quaerat natus, dignissimos necessitatibus
          accusamus nesciunt, perspiciatis explicabo eligendi!
        </p>

        {/* Trigger POST onClick button with dummy params */}
        <button
          tw="border p-4"
          onClick={() =>
            postRegistration(
              {
                name: 'budi', // data can be from state or form response
                job: 'softeng',
              },
              {
                onSuccess: (res: any) => {
                  // console.log('res', res);
                  toast.success('Post Success!');
                },
                onError: (err: any) => {
                  // console.log('err', err);
                  toast.error(err.response.data.message, {
                    position: 'top-right',
                  });
                },
              }
            )
          }
        >
          Click to Post
        </button>
      </div>
    </Layout>
  );
};

export default Example;
