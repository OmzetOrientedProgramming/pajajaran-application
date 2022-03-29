import React from 'react';
import 'twin.macro';
import Head from 'next/head';
import { Layout } from '../../../components/Utils/Layout';
import DetailRingkasan from '../../../components/Detail/DetailRingkasan';
import tw, { css } from 'twin.macro';
import DetailTable from '../../../components/Detail/DetailTable';
import { useGetDetailBooking } from '../../../apis/hooks/detailBookingHooks';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

const DetailBooking: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const stringId = id as string;

  const { data, status, error } = useGetDetailBooking(
    { id: stringId },
    {
      onSuccess: (res: any) => {
        // console.log('res:', res);
      },
      onError: (err: any) => {
        // console.log('err', err);
        toast.error(err.response.data.message, { position: 'top-right' });
      },
    }
  );

  const detail = data?.data.data;

  return (
    <Layout>
      <Head>
        <title>Detail Booking</title>
      </Head>
      <div
        css={[
          css`
            width: 100vw;
          `,
          tw`max-w-screen-xl`,
        ]}
      >
        {status === 'loading' && <p>Getting data . . .</p>}

        {status === 'error' && <p>Error: {error}</p>}

        {status === 'success' && (
          <>
            <div tw="flex flex-row justify-between items-center mb-7">
              <h1 tw="font-bold text-4xl color[#003366]">Detail Booking</h1>
              <div tw="flex flex-col justify-center text-right">
                <h3 tw="font-bold text-xl color[#003366]">
                  Id Booking #{detail.id}
                </h3>
                <p tw="color[#829CB6]">Dibuat pada {detail.created_at}</p>
              </div>
            </div>
            <div tw="flex flex-row flex-wrap justify-center items-stretch gap-x-12">
              <div id="info" tw="flex flex-col justify-center items-center">
                <div tw="mb-5">
                  <DetailTable>
                    <DetailTable.Title>Informasi Booking</DetailTable.Title>
                    <DetailTable.InfoContent
                      customer={'Budi'}
                      date={detail.date}
                      start_time={detail.start_time}
                      end_time={detail.end_time}
                      capacity={detail.capacity}
                      status={detail.status}
                    />
                  </DetailTable>
                </div>
                <div tw="">
                  <DetailTable>
                    <DetailTable.Title>Pesanan Tambahan</DetailTable.Title>
                    <DetailTable.ItemContent items={detail.items} />
                  </DetailTable>
                </div>
              </div>
              <div tw="flex flex-col justify-start">
                <DetailRingkasan
                  title="Ringkasan"
                  status={detail.status}
                  customer={'Budi'}
                  capacity={detail.capacity}
                  date={detail.date}
                  start_time={detail.start_time}
                  end_time={detail.end_time}
                  total_price={detail.total_price}
                  total_price_booking={detail.total_price_ticket}
                  total_price_item={detail.total_price_item}
                />
                <div tw="flex flex-col items-center justify-center">
                  <button
                    onClick={() => {}}
                    css={[
                      css`
                        box-shadow: 0px 3px 0px 0px #888888;
                        border-color: #03bd36;
                        border-radius: 10px;
                        padding-top: 9.5px;
                        padding-bottom: 9.5px;
                      `,
                      tw`font-bold mt-12 mb-5 text-2xl w-full border-2 background[#03BD36] color[#FFFFFF] duration-150 hover:(brightness-110)`,
                    ]}
                  >
                    Terima
                  </button>
                  <button
                    onClick={() => {}}
                    css={[
                      css`
                        box-shadow: 0px 3px 0px 0px #888888;
                        border-color: #fe3131;
                        border-radius: 10px;
                        padding-top: 9.5px;
                        padding-bottom: 9.5px;
                      `,
                      tw`font-bold text-2xl w-full border-2 background[#FFFFFF] color[#FE3131] duration-150 hover:(background[#FE3131] color[#FFFFFF])`,
                    ]}
                  >
                    Tolak
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default DetailBooking;
