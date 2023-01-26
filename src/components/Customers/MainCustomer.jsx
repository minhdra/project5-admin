import { useState } from 'react';
import Breadcrumb from '../Shared/Breadcrumbs/Breadcrumb';

import ModalRegister from './ModalRegister';
import Modal from './ModalCustomer';
import CardTable from './CustomerCardTable';

const breadcrumbs = [
  {
    title: 'Quản lý khách hàng',
  },
];

export default function Main({
  data,
  setData,
  optionSearch,
  searchData,
  handlePost,
}) {
  const [showModal, setShowModal] = useState(false);
  const [showModalRegister, setShowModalRegister] = useState(false);
  const [itemSelected, setItemSelected] = useState();
  const [titleModal, setTitleModal] = useState();

  return (
    <>
      <Breadcrumb breadcrumbs={breadcrumbs} />
      <div>
        <CardTable
          color={'light'}
          titleTable={breadcrumbs[breadcrumbs.length - 1].title}
          data={data}
          setData={setData}
          optionSearch={optionSearch}
          searchData={searchData}
          setShowModal={setShowModal}
          setShowModalRegister={setShowModalRegister}
          itemSelected={itemSelected}
          setItemSelected={setItemSelected}
          setTitleModal={setTitleModal}
          handlePost={handlePost}
        />

        {showModal && (
          <Modal
            titleModal={titleModal}
            showModal={showModal}
            setShowModal={setShowModal}
            itemSelected={itemSelected}
            handlePost={handlePost}
            data={data}
            setData={setData}
          />
        )}

        {showModalRegister && (
          <ModalRegister
            titleModal={titleModal}
            showModalRegister={showModalRegister}
            setShowModalRegister={setShowModalRegister}
            handlePost={handlePost}
            role={2}
          />
        )}
      </div>
    </>
  );
}
