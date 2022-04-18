import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import 'twin.macro';
import { useGetListItems } from '../../apis/hooks/itemsHooks';
import ButtonChangePage from '../../components/Booking/ButtonChangePage';
import ButtonPage from '../../components/Booking/ButtonPage';
import CardItem from '../../components/Item/CardItem';
import { Layout } from '../../components/Utils/Layout';

const Item: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(3);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
  const [pages, setPages] = useState<Array<number>>([]);

  const limit = 8;
  const pageNumberLimit = 3;

  const { data, status, refetch }: any = useGetListItems(
    {
      limit: limit,
      page: currentPage,
    },
    {
      onSuccess: (res: any) => {
        // console.log(res.data.data.items);
        if (pages.length === 0) {
          const temp: number[] = [];
          for (let i = 1; i <= res.data.data.pagination.total_page; i++) {
            temp.push(i);
          }
          setPages(temp);
        }
      },
      onError: (err: any) => {
        toast.error(err.response.data.message, { position: 'top-right' });
      },
    }
  );

  useEffect(() => {
    refetch();
  }, [currentPage]);

  const handleChangePage = (button: any) => {
    setCurrentPage(button.target.id);
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
    if (currentPage < pages[pages.length - 1]) {
      setCurrentPage((prevPage) => prevPage + 1);
    }

    if (
      currentPage + 1 > maxPageNumberLimit &&
      currentPage != pages[pages.length - 1]
    ) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  return (
    <Layout>
      <Head>
        <title>Daftar Item - Admin</title>
      </Head>
      <div tw="mt-6">
        <h1 tw="mb-12 text-4xl font-bold text-center">Daftar Item</h1>
        {status === 'loading' && (
          <p tw="flex justify-center items-center">Loading . . .</p>
        )}
        {status === 'success' && (
          <>
            <div tw="grid grid gap-x-16 gap-y-16 grid-cols-4 auto-rows-auto mb-8">
              {data?.data.data.items.map((item: any, key: any) => (
                <CardItem
                  key={key}
                  id={item.id}
                  name={item.name}
                  image={item.image}
                  price={item.price}
                  description={item.description}
                />
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
      </div>
    </Layout>
  );
};

export default Item;
