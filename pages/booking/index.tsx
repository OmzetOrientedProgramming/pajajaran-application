import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import 'twin.macro';
import { useGetListBooking } from '../../apis/hooks/listBookingHooks';
import ButtonPage from '../../components/Booking/ButtonPage';
import ButtonState from '../../components/Booking/ButtonState';
import CardBooking from '../../components/Booking/CardBooking';
import { Layout } from '../../components/Utils/Layout';
import ButtonChangePage from '../../components/Booking/ButtonChangePage';
import withAuth from '../../components/Utils/HOC/WithAuth';

interface IBooking {
  id: number;
  name: string;
  capacity: number;
  date: string;
  startTime: string;
  endTime: string;
}

const ListBooking: React.FC = () => {
  const router = useRouter();
  if (!router.isReady) return <></>;

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
  const [booking, setBooking] = useState<Array<IBooking>>([]);
  const [totalPage, setTotalPage] = useState(0);
  const [state, setState] = useState(0);

  let limit = 5;
  let pageNumberLimit = 5;

  const { status, error, refetch }: any = useGetListBooking(
    {
      state: state,
      limit: limit,
      page: currentPage,
    },
    {
      onSuccess: (res: any) => {
        setBooking(res.data.data.bookings);
        setTotalPage(res.data.data.pagination.total_page);
      },
      onError: (err: any) => {
        toast.error(err.response.data.message, { position: 'top-right' });
      },
    }
  );

  useEffect(() => {
    refetch();
  }, [currentPage, state]);

  const [color, setColor] = useState({
    button1: ['#003366', '#FFFFFF'],
    button2: ['#E5E5E5', '#000000'],
    button3: ['#E5E5E5', '#000000'],
    button4: ['#E5E5E5', '#000000'],
    button5: ['#E5E5E5', '#000000'],
    button6: ['#E5E5E5', '#000000'],
  });

  const handleChangePage = (button: any) => {
    setCurrentPage(parseInt(button.target.id));
  };

  const handlePrevbtn = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }

    if ((currentPage - 1) % pageNumberLimit == 0 && currentPage != 1) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  const handleNextbtn = () => {
    if (currentPage < totalPage) {
      setCurrentPage((prevPage: number) => {
        return prevPage + 1;
      });
    }

    if (currentPage + 1 > maxPageNumberLimit && currentPage != totalPage) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const pages = [];
  for (let i = 1; i <= totalPage; i++) {
    pages.push(i);
  }

  return (
    <>
      <Layout>
        <Head>
          <title>Booking</title>
        </Head>

        <div>
          <h1 tw="m-9 text-4xl font-bold text-center">
            Daftar Booking Customer
          </h1>
        </div>

        {status === 'error' && <p>Error: {error.response.data.message}</p>}
        {status === 'success' && (
          <>
            <div tw="mx-4 my-6 grid gap-1 grid-cols-6">
              <ButtonState
                onClick={() => {
                  setColor({
                    button1: ['#003366', '#FFFFFF'],
                    button2: ['#E5E5E5', '#000000'],
                    button3: ['#E5E5E5', '#000000'],
                    button4: ['#E5E5E5', '#000000'],
                    button5: ['#E5E5E5', '#000000'],
                    button6: ['#E5E5E5', '#000000'],
                  });
                  setState(0);
                  setCurrentPage(1);
                }}
                background={color.button1[0]}
                color={color.button1[1]}
              >
                Menunggu Konfirmasi
              </ButtonState>
              <ButtonState
                onClick={() => {
                  setColor({
                    button1: ['#E5E5E5', '#000000'],
                    button2: ['#003366', '#FFFFFF'],
                    button3: ['#E5E5E5', '#000000'],
                    button4: ['#E5E5E5', '#000000'],
                    button5: ['#E5E5E5', '#000000'],
                    button6: ['#E5E5E5', '#000000'],
                  });
                  setState(1);
                  setCurrentPage(1);
                }}
                background={color.button2[0]}
                color={color.button2[1]}
              >
                Belum Membayar
              </ButtonState>
              <ButtonState
                onClick={() => {
                  setColor({
                    button1: ['#E5E5E5', '#000000'],
                    button2: ['#E5E5E5', '#000000'],
                    button3: ['#003366', '#FFFFFF'],
                    button4: ['#E5E5E5', '#000000'],
                    button5: ['#E5E5E5', '#000000'],
                    button6: ['#E5E5E5', '#000000'],
                  });
                  setState(2);
                  setCurrentPage(1);
                }}
                background={color.button3[0]}
                color={color.button3[1]}
              >
                Booking Berhasil
              </ButtonState>
              <ButtonState
                onClick={() => {
                  setColor({
                    button1: ['#E5E5E5', '#000000'],
                    button2: ['#E5E5E5', '#000000'],
                    button3: ['#E5E5E5', '#000000'],
                    button4: ['#003366', '#FFFFFF'],
                    button5: ['#E5E5E5', '#000000'],
                    button6: ['#E5E5E5', '#000000'],
                  });
                  setState(3);
                  setCurrentPage(1);
                }}
                background={color.button4[0]}
                color={color.button4[1]}
              >
                Booking Selesai
              </ButtonState>
              <ButtonState
                onClick={() => {
                  setColor({
                    button1: ['#E5E5E5', '#000000'],
                    button2: ['#E5E5E5', '#000000'],
                    button3: ['#E5E5E5', '#000000'],
                    button4: ['#E5E5E5', '#000000'],
                    button5: ['#003366', '#FFFFFF'],
                    button6: ['#E5E5E5', '#000000'],
                  });
                  setState(4);
                  setCurrentPage(1);
                }}
                background={color.button5[0]}
                color={color.button5[1]}
              >
                Booking Gagal
              </ButtonState>
              <ButtonState
                onClick={() => {
                  setColor({
                    button1: ['#E5E5E5', '#000000'],
                    button2: ['#E5E5E5', '#000000'],
                    button3: ['#E5E5E5', '#000000'],
                    button4: ['#E5E5E5', '#000000'],
                    button5: ['#E5E5E5', '#000000'],
                    button6: ['#003366', '#FFFFFF'],
                  });
                  setState(5);
                  setCurrentPage(1);
                }}
                background={color.button6[0]}
                color={color.button6[1]}
              >
                Booking Selesai & Reviewed
              </ButtonState>
            </div>

            <div tw="flex flex-col justify-center w-full p-5 ">
              {status === 'loading' && <p>Loading . . .</p>}
              {booking.length === 0 && (
                <p tw="font-bold text-gray-400 flex justify-center items-center m-2">
                  Tidak ada booking
                </p>
              )}
              {booking.map((detail: any) => (
                <div key={detail.id}>
                  <CardBooking
                    bookingID={detail.id}
                    name={detail.name}
                    capacity={detail.capacity}
                    date={detail.date}
                    start_time={detail.start_time}
                    end_time={detail.end_time}
                  />
                </div>
              ))}
            </div>

            <div tw="flex justify-center items-center m-5 gap-x-1">
              <ButtonChangePage
                onClick={handlePrevbtn}
                state="<"
                page={currentPage}
              />
              <ButtonPage
                pages={pages}
                onClick={handleChangePage}
                maxLimitPage={maxPageNumberLimit}
                minLimitPage={minPageNumberLimit}
              />
              <ButtonChangePage
                onClick={handleNextbtn}
                state=">"
                page={currentPage}
              />
            </div>
          </>
        )}
      </Layout>
    </>
  );
};

export default withAuth(ListBooking);
