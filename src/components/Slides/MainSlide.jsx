import { useState } from 'react';
import Breadcrumb from '../Shared/Breadcrumbs/Breadcrumb';

import Modal from './ModalSlide';
import CardTable from './SlideCardTable';

const breadcrumbs = [
  {
    title: 'Slides management',
  },
];

export default function MainSlide({ data, setData, optionSearch, searchData, handlePost }) {
  const [showModal, setShowModal] = useState(false);
  const [itemSelected, setItemSelected] = useState();
  const [titleModal, setTitleModal] = useState();
  

  

  return (
    <>
      <Breadcrumb breadcrumbs={breadcrumbs} />
      <div>
        <CardTable color={'light'} titleTable={breadcrumbs[breadcrumbs.length - 1].title} data={data} setData={setData} optionSearch={optionSearch} searchData={searchData} setShowModal={setShowModal} itemSelected={itemSelected} setItemSelected={setItemSelected} setTitleModal={setTitleModal} handlePost={handlePost} />
        
        {showModal && <Modal titleModal={titleModal} showModal={showModal} setShowModal={setShowModal} itemSelected={itemSelected} handlePost={handlePost} data={data} setData={setData} />}
        
        
      </div>
    </>
  )
}