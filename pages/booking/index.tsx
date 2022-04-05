import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import toast from 'react-hot-toast';
import 'twin.macro';
import { useGetListBooking } from '../../apis/hooks/listBookingHooks';
import ButtonPage from '../../components/Booking/ButtonPage';
import ButtonState from '../../components/Booking/ButtonState';
import CardBooking from '../../components/Booking/CardBooking';
import { Layout } from '../../components/Utils/Layout';
import ButtonChangePage from '../../components/Booking/ButtonChangePage';
import { getListBooking } from '../../apis/services/listBookingService';

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

  const [currentPage, setCurrentPage] = useState(1);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
  const [booking, setBooking] = useState<Array<IBooking>>([]);
  const [totalPage, setTotalPage] = useState(0);
  const [state, setState] = useState(0);

  let limit = 5;
  let pageNumberLimit = 5;

  const [color, setColor] = useState({
    button1: ['#003366', '#FFFFFF'],
    button2: ['#E5E5E5', '#000000'],
    button3: ['#E5E5E5', '#000000'],
    button4: ['#E5E5E5', '#000000'],
    button5: ['#E5E5E5', '#000000'],
    button6: ['#E5E5E5', '#000000'],
  });

  function handlePagination(page: any, state: any) {
    const response = getListBooking({
      state: state,
      limit: limit,
      page: page,
    });

    const result = response.then((result) => {
      return result;
    });

    const getData = () => {
      result.then((data: any) => {
        setBooking(data.data.data.bookings);
        setCurrentPage(page);
        setState(state);
        setTotalPage(data.data.data.pagination.total_page);
      });
    };
    getData();
  }

  const handleClick = (data: any) => {
    let page = data.target.id;
    handlePagination(page, state);
  };

  const handlePrevbtn = () => {
    if (currentPage > 1) {
      let page = currentPage - 1;
      handlePagination(page, state);
    }

    if ((currentPage - 1) % pageNumberLimit == 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  const handleNextbtn = () => {
    if (currentPage < totalPage) {
      let page = currentPage + 1;
      handlePagination(page, state);
    }

    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const { status, error } = useGetListBooking(
    {
      state: state,
      limit: limit,
      page: currentPage,
    },
    {
      onSuccess: (res: any) => {
        setBooking(res.data.data.bookings);
        if (totalPage == 0) {
          setTotalPage(res.data.data.pagination.total_page);
        }
      },
      onError: (err: any) => {
        toast.error(err.response.data.message, { position: 'top-right' });
      },
    }
  );

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
          <h1 tw="m-9 text-xl font-bold text-center">
            Daftar Customer Booking
          </h1>
        </div>

        <div tw="m-4 grid gap-1 grid-cols-6">
          {status === 'error' && <p>Error: {error}</p>}
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
              handlePagination(1, 0);
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
              handlePagination(1, 1);
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
              handlePagination(1, 2);
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
              handlePagination(1, 3);
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
              handlePagination(1, 4);
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
              handlePagination(1, 5);
            }}
            background={color.button6[0]}
            color={color.button6[1]}
          >
            Booking Selesai & Reviewed
          </ButtonState>
        </div>

        <div tw="flex flex-col justify-center w-full m-5">
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

        <div tw="flex justify-center items-center m-5">
          <ButtonChangePage
            onClick={handlePrevbtn}
            state="previous"
            page={currentPage}
          />
          <ButtonPage
            pages={pages}
            onClick={handleClick}
            maxLimitPage={maxPageNumberLimit}
            minLimitPage={minPageNumberLimit}
          />
          <ButtonChangePage
            onClick={handleNextbtn}
            state="next"
            page={currentPage}
          />
        </div>
      </Layout>
    </>
  );
};

export default ListBooking;
