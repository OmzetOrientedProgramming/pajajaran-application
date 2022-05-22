import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';
import 'twin.macro';
import {
  useDeleteItem,
  useGetListItems,
  useUpdateItem,
  useCreateItem,
} from '../../apis/hooks/itemsHooks';
import ButtonChangePage from '../../components/Booking/ButtonChangePage';
import ButtonPage from '../../components/Booking/ButtonPage';
import CardItem from '../../components/Item/CardItem';
import DeleteItemModal from '../../components/Item/DeleteItemModal';
import CreateUpdateItemModal from '../../components/Item/CreateUpdateItemModal';
import { Layout } from '../../components/Utils/Layout';
import withAuth from '../../components/Utils/HOC/WithAuth';

const Item: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(3);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
  const [pages, setPages] = useState<Array<number>>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [itemId, setItemId] = useState('');
  const [item, setItem] = useState({});
  const [isUpdate, setIsUpdate] = useState(false);
  const [isOpenCreateUpdate, setIsOpenCreateUpdate] = useState(false);
  const queryClient = useQueryClient();

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

  const { mutate: deleteItem } = useDeleteItem();
  const { mutate: updateItem } = useUpdateItem();
  const { mutate: createItem } = useCreateItem();

  useEffect(() => {
    refetch();
  }, [currentPage]);

  const handleConfirm = () => {
    deleteItem(
      {
        item_id: itemId,
      },
      {
        onSuccess: (res: any) => {
          setIsOpen(false);
          toast.success('Item berhasil dihapus');
          queryClient.invalidateQueries('get_list_items');
        },
        onError: (err: any) => {
          // console.log('err', err);
          toast.error(err.response.data.message, {
            position: 'top-right',
          });
        },
      }
    );
  };

  const handleConfirmCreateUpdate = (item: any, isUpdate: boolean) => {
    if (isUpdate) {
      updateItem(
        {
          item_id: itemId,
          ...item,
        },
        {
          onSuccess: (res: any) => {
            setIsOpenCreateUpdate(false);
            toast.success('Item berhasil diupdate');
            queryClient.invalidateQueries('get_list_items');
          },
          onError: (err: any) => {
            toast.error(err.response.data.message, {
              position: 'top-right',
            });
          },
        }
      );
    } else {
      createItem(
        {
          ...item,
        },
        {
          onSuccess: (res: any) => {
            setIsOpenCreateUpdate(false);
            toast.success('Item berhasil dibuat');
            queryClient.invalidateQueries('get_list_items');
          },
          onError: (err: any) => {
            toast.error(err.response.data.message, {
              position: 'top-right',
            });
          },
        }
      );
    }
  };

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

      <DeleteItemModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleConfirm={handleConfirm}
      />

      <CreateUpdateItemModal
        isOpen={isOpenCreateUpdate}
        setIsOpen={setIsOpenCreateUpdate}
        handleConfirm={handleConfirmCreateUpdate}
        item={item}
        setItem={setItem}
        isUpdate={isUpdate}
      />

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
                  setIsOpen={setIsOpen}
                  setItemId={setItemId}
                  setIsOpenUpdate={setIsOpenCreateUpdate}
                  setItem={setItem}
                  setIsUpdate={setIsUpdate}
                />
              ))}
            </div>
            <div tw="flex justify-end items-end my-16">
              <img
                src="/images/Item/PlusIcon.svg"
                alt="PlusIcon"
                onClick={() => {
                  setIsOpenCreateUpdate(true);
                  setItem({
                    name: '',
                    image: null,
                    description: '',
                    price: null,
                  });
                  setIsUpdate(false);
                }}
              />
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

export default withAuth(Item);
