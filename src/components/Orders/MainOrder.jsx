import { useState } from 'react';
import Breadcrumb from '../Shared/Breadcrumbs/Breadcrumb';
import DetailOrder from './DetailOrder';

import Modal from './ModalOrder';
import CardTable from './OrderCardTable';

const breadcrumbs = [
  {
    title: 'Quản lý đơn hàng',
  },
];

export default function MainOrder({ data, setData, optionSearch, searchData, handlePost }) {
  const [showModal, setShowModal] = useState(false);
  const [itemSelected, setItemSelected] = useState();
  const [titleModal, setTitleModal] = useState();
  
  return (
    <>
      <Breadcrumb breadcrumbs={breadcrumbs} />
      <div>
        <CardTable color={'light'} titleTable={breadcrumbs[breadcrumbs.length - 1].title} data={data} setData={setData} optionSearch={optionSearch} searchData={searchData} setShowModal={setShowModal} itemSelected={itemSelected} setItemSelected={setItemSelected} setTitleModal={setTitleModal} handlePost={handlePost} />
        
        {/* {showModal && <Modal titleModal={titleModal} showModal={showModal} setShowModal={setShowModal} itemSelected={itemSelected} handlePost={handlePost} data={data} setData={setData} />} */}
        
        {showModal && <DetailOrder titleModal={titleModal} setShowModal={setShowModal} showModal={showModal} itemSelected={itemSelected} />}
      </div>
    </>
  )
}