/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import NotificationDropdown from '../../Dropdowns/NotificationDropdown.jsx';
import UserDropdown from '../../Dropdowns/UserDropdown';

const listSidebar = {
  manager: [
    {
      title: 'Bảng điều khiển',
      link: '/dashboard',
      icon: 'fa-regular fa-gauge',
    },
    {
      title: 'Danh mục lớn',
      link: '/categories',
      icon: 'fa-duotone fa-bookmark',
    },
    {
      title: 'Danh mục nhỏ',
      link: '/category-subs',
      icon: 'fa-light fa-bookmark',
    },
    {
      title: 'Bộ sưu tập',
      link: '/collections',
      icon: 'fa-regular fa-square-kanban',
    },
    {
      title: 'Sản phẩm',
      link: '/products',
      icon: 'fa-brands fa-product-hunt',
    },
    {
      title: 'Giảm giá',
      link: '/discounts',
      icon: 'fa-regular fa-badge-percent',
    },
    {
      title: 'Đơn hàng',
      link: '/orders',
      icon: 'fa-regular fa-cart-shopping',
    },
    {
      title: 'Hóa đơn nhập',
      link: '/invoices',
      icon: 'fa-light fa-file-invoice',
    },
    {
      title: 'Nhà cung cấp',
      link: '/suppliers',
      icon: 'fa-duotone fa-warehouse-full',
    },
    {
      title: 'Thương hiệu',
      link: '/brands',
      icon: 'fa-solid fa-circle-star',
    },
    {
      title: 'Khách hàng',
      link: '/customers',
      icon: 'fa-regular fa-users',
    },
    {
      title: 'Nhân viên',
      link: '/staffs',
      icon: 'fa-regular fa-users-gear',
    },
    {
      title: 'Tài khoản',
      link: '/accounts',
      icon: 'fa-regular fa-user-lock',
    },
  ],
  auth: [
    {
      title: 'Thông tin của bạn',
      link: '/settings',
      icon: 'fa-regular fa-gear',
    },
  ],
  website: [
    // {
    //   title: 'Slides',
    //   link: '/slides',
    //   icon: 'fa-regular fa-images',
    // },
    {
      title: 'Pages',
      link: '/pages',
      icon: 'fa-regular fa-images',
    },
  ],
};

export default function Sidebar() {
  const [collapseShow, setCollapseShow] = React.useState('hidden');

  const location = useLocation();

  const [url, setUrl] = useState();

  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);

  return (
    <>
      <nav className='md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6'>
        <div className='md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto'>
          {/* Toggler */}
          <button
            className='cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent'
            type='button'
            onClick={() => setCollapseShow('bg-white m-2 py-3 px-6')}
          >
            <i className='fas fa-bars'></i>
          </button>
          {/* Brand */}
          <Link
            className='md:block text-left md:pb-2 text-slate-500 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold py-2 px-0'
            to='/'
          >
            <img
              className='h-[50px] w-[150px] object-cover'
              src={require('../../../assets/img/logo/logo-color.png')}
              alt=''
            />
          </Link>
          {/* User */}
          <ul className='md:hidden items-center flex flex-wrap list-none'>
            <li className='inline-block relative'>
              <NotificationDropdown />
            </li>
            <li className='inline-block relative'>
              <UserDropdown />
            </li>
          </ul>
          {/* Collapse */}
          <div
            className={
              'md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded ' +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className='md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-slate-100'>
              <div className='flex flex-wrap'>
                <div className='w-6/12'>
                  <Link
                    className='md:block text-left md:pb-2 text-slate-500 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0'
                    to='/'
                  >
                    <img
                      className='h-[50px] w-[150px] object-cover'
                      src={require('../../../assets/img/logo/logo-color.png')}
                      alt=''
                    />
                  </Link>
                </div>
                <div className='w-6/12 flex justify-end'>
                  <button
                    type='button'
                    className='cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent'
                    onClick={() => setCollapseShow('hidden')}
                  >
                    <i className='fas fa-times'></i>
                  </button>
                </div>
              </div>
            </div>
            {/* Form */}
            <form className='mt-6 mb-4 md:hidden'>
              <div className='mb-3 pt-0'>
                <input
                  type='text'
                  placeholder='Search'
                  className='px-3 py-2 h-12 border border-solid  border-slate-400 placeholder-slate-200 text-slate-500 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal'
                />
              </div>
            </form>

            {/* Divider */}
            <hr className='my-4 md:min-w-full' />
            {/* Heading */}
            <h6 className='md:min-w-full text-slate-400 text-xs uppercase font-bold block pt-1 pb-4 no-underline'>
              Quản lý cửa hàng
            </h6>
            {/* Navigation */}

            <ul className='md:flex-col md:min-w-full flex flex-col list-none'>
              {listSidebar.manager.map((item, index) => (
                <li key={index} className='items-center'>
                  <Link
                    className={
                      'text-xs uppercase py-3 font-bold flex items-center gap-4 transition-all ' +
                      (url === item.link
                        ? 'text-red-500 hover:text-red-600 bg-slate-100 pl-4 rounded-md'
                        : 'text-slate-500 hover:text-slate-400')
                    }
                    to={item.link}
                  >
                    <i
                      className={
                        `${item.icon} text-lg block ` +
                        (url === item.link ? 'opacity-75' : 'text-slate-400')
                      }
                    ></i>
                    <span>{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Divider */}
            <hr className='my-4 md:min-w-full' />
            {/* Heading */}
            <h6 className='md:min-w-full text-slate-400 text-xs uppercase font-bold block pt-1 pb-4 no-underline'>
              Quản trị viên
            </h6>
            {/* Navigation */}

            <ul className='md:flex-col md:min-w-full flex flex-col list-none md:mb-4'>
              {listSidebar.auth.map((item, index) => (
                <li key={index} className='items-center'>
                  <Link
                    className={
                      'text-xs uppercase py-3 font-bold flex items-center gap-4 transition-all ' +
                      (url === item.link
                        ? 'text-red-500 hover:text-red-600 bg-slate-100 pl-4 rounded-md'
                        : 'text-slate-500 hover:text-slate-400')
                    }
                    to={item.link}
                  >
                    <i
                      className={
                        `${item.icon} text-lg block ` +
                        (url === item.link ? 'opacity-75' : 'text-slate-400')
                      }
                    ></i>
                    <span>{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Divider */}
            <hr className='my-4 md:min-w-full' />

            {/* Heading */}
            <h6 className='md:min-w-full text-slate-400 text-xs uppercase font-bold block pt-1 pb-4 no-underline'>
              Quản lý website
            </h6>
            {/* Navigation */}

            <ul className='md:flex-col md:min-w-full flex flex-col list-none md:mb-4'>
              {listSidebar.website.map((item, index) => (
                <li key={index} className='items-center'>
                  <Link
                    className={
                      'text-xs uppercase py-3 font-bold flex items-center gap-4 transition ' +
                      (url === item.link
                        ? 'text-red-500 hover:text-red-600 bg-slate-100 pl-4 rounded-md'
                        : 'text-slate-500 hover:text-slate-400')
                    }
                    to={item.link}
                  >
                    <i
                      className={
                        `${item.icon} text-lg block ` +
                        (url === item.link ? 'opacity-75' : 'text-slate-400')
                      }
                    ></i>
                    <span>{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Divider */}
            <hr className='my-4 md:min-w-full' />
          </div>
        </div>
      </nav>
    </>
  );
}
