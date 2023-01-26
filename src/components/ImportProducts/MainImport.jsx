import { useEffect, useState } from 'react';
import Breadcrumb from '../Shared/Breadcrumbs/Breadcrumb';

import Modal from './ModalImport';
import CardTable from './ImportCardTable';
import ModalInvoice from './ModalInvoice';

export default function MainProduct({ data, searchData, handlePost }) {
  const [showModal, setShowModal] = useState(false);
  const [showModalInvoice, setShowModalInvoice] = useState(false);
  const [itemSelected, setItemSelected] = useState();
  const [indexSelected, setIndexSelected] = useState();
  const [titleModal, setTitleModal] = useState();
  

  const [breadcrumbs, setBreadcrumbs] = useState([]);

  useEffect(() => {
    if (data)
    {
      setBreadcrumbs([
        {
          title: 'Nhập sản phẩm',
          link: '/products'
        },
        {
          title: data.product_name,
        }
      ])
    }
  }, [data]);

  

  return (
    <>
      <Breadcrumb breadcrumbs={breadcrumbs} />
      <div>
        <CardTable color={'light'} titleTable={breadcrumbs[breadcrumbs.length - 1]?.title} data={data} searchData={searchData} setShowModal={setShowModal} setShowModalInvoice={setShowModalInvoice} itemSelected={itemSelected} setItemSelected={setItemSelected} setTitleModal={setTitleModal} handlePost={handlePost} setIndexSelected={setIndexSelected} indexSelected={indexSelected} />
        
        {showModal && <Modal titleModal={titleModal} showModal={showModal} setShowModal={setShowModal} itemSelected={itemSelected} handlePost={handlePost} data={data} indexSelected={indexSelected} />}

        {showModalInvoice && <ModalInvoice titleModal={titleModal} showModal={showModalInvoice} setShowModal={setShowModalInvoice} handlePost={handlePost} data={data} />}
        
        
      </div>
    </>
  )
}