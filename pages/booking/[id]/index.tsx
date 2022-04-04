import React, { useState } from 'react';
import 'twin.macro';
import Head from 'next/head';
import { Layout } from '../../../components/Utils/Layout';
import DetailRingkasan from '../../../components/Detail/DetailRingkasan';
import tw, { css } from 'twin.macro';
import DetailTable from '../../../components/Detail/DetailTable';
import {
  useConfirmBooking,
  useGetDetailBooking,
} from '../../../apis/hooks/detailBookingHooks';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import ConfirmModal from '../../../components/Detail/ConfirmModal';
import moment from 'moment';
import 'moment/locale/id';

const DetailBooking: React.FC = () => {
  const router = useRouter();
  if (!router.isReady) return <></>;
  const { id } = router.query;
  const stringId: string = (id as string) || '';

  const [isOpen, setIsOpen] = useState(false);
  const [confirmType, setConfirmType] = useState('');
  const [bookingStatus, setBookingStatus] = useState(0);

  const { mutate: confirmBooking } = useConfirmBooking();

  const { data, status, error, refetch } = useGetDetailBooking(
    { id: stringId },
    {
      onSuccess: (res: any) => {
        console.log(res);
        setBookingStatus(res.data.data.status);
      },
      onError: (err: any) => {
        console.log('err', err);
        toast.error(err.response.data.message, { position: 'top-right' });
      },
    }
  );

  const detail = data?.data.data;
  console.log(detail?.start_time);

  const handleConfirm = (state: boolean) => {
    confirmBooking(
      {
        id: detail.id,
        booking_status: state ? 1 : 4,
      },
      {
        onSuccess: (res: any) => {
          state ? setBookingStatus(1) : setBookingStatus(4);
          setIsOpen(false);
          toast.success(
            state ? 'Booking konfirmasi diterima' : 'Booking konfirmasi ditolak'
          );
        },
        onError: (err: any) => {
          // console.log('err', err);
          toast.error(err.response.data.message, {
            position: 'top-right',
          });
        },
      }
    );
    refetch();
  };

  return (
    <Layout>
      <Head>
        <title>Detail Booking</title>
      </Head>

      <ConfirmModal
        type={confirmType}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleConfirm={handleConfirm}
      />

      <div
        css={[
          css`
            width: 100vw;
          `,
          tw`max-w-screen-xl`,
        ]}
      >
        {status === 'loading' && (
          <p tw="flex justify-center items-center">Getting data . . .</p>
        )}

        {status === 'error' && <p>Error: {error}</p>}

        {status === 'success' && (
          <>
            <div tw="flex flex-row justify-between items-center mb-7">
              <h1 tw="font-bold text-4xl color[#003366]">Detail Booking</h1>
              <div tw="flex flex-col justify-center text-right">
                <h3 tw="font-bold text-xl color[#003366]">
                  Id Booking #{detail.id}
                </h3>
                <p tw="color[#829CB6]">
                  Dibuat pada {moment(detail.created_at).format('DD/MM/YYYY')}
                </p>
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
                {bookingStatus === 0 && (
                  <div tw="flex flex-col items-center justify-center">
                    <button
                      onClick={() => {
                        setConfirmType('terima');
                        setIsOpen(true);
                      }}
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
                      onClick={() => {
                        setConfirmType('batal');
                        setIsOpen(true);
                      }}
                      data-testid={'tolak'}
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
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default DetailBooking;
