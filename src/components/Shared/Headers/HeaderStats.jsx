import React from 'react';

// components

import CardStats from '../../Cards/CardStats.jsx';

export default function HeaderStats({
  totalUsers,
  totalOfMonth,
  ordersDeliveredOfMonth,
  totalOfProducts,
}) {
  return (
    <>
      {/* Header */}
      <div className='relative bg-red-500 py-4 mb-4'>
        <div className='px-4 md:px-10 mx-auto w-full'>
          <div>
            {/* Card stats */}
            <div className='flex flex-wrap'>
              <div className='w-full lg:w-6/12 xl:w-3/12 px-4'>
                <CardStats
                  statSubtitle='NGƯỜI DÙNG MỚI TRONG THÁNG'
                  statTitle={(totalUsers?.data || '0') + ' người dùng'}
                  statArrow={totalUsers?.status}
                  statPercent={totalUsers?.percent || '0'}
                  statPercentColor='text-red-500'
                  statDescription='Từ tháng trước'
                  statIconName='fas fa-users'
                  statIconColor='bg-red-500'
                />
              </div>
              <div className='w-full lg:w-6/12 xl:w-3/12 px-4'>
                <CardStats
                  statSubtitle='TỔNG DOANH THU TRONG THÁNG'
                  statTitle={
                    '₫' +
                    (totalOfMonth?.data
                      ? totalOfMonth?.data?.toLocaleString('en')
                      : '0')
                  }
                  statArrow={totalOfMonth?.status}
                  statPercent={totalOfMonth?.percent || '0'}
                  statPercentColor='text-red-500'
                  statDescription='Từ tháng trước'
                  statIconName='fas fa-chart-pie'
                  statIconColor='bg-orange-500'
                />
              </div>
              <div className='w-full lg:w-6/12 xl:w-3/12 px-4'>
                <CardStats
                  statSubtitle='Số đơn hàng đã giao trong tháng'
                  statTitle={
                    (ordersDeliveredOfMonth?.data || '0') + ' đơn hàng'
                  }
                  statArrow={ordersDeliveredOfMonth?.status || ''}
                  statPercent={ordersDeliveredOfMonth?.percent || '0'}
                  statPercentColor='text-orange-500'
                  statDescription='Từ tháng trước'
                  statIconName='far fa-chart-bar'
                  statIconColor='bg-pink-500'
                />
              </div>
              <div className='w-full lg:w-6/12 xl:w-3/12 px-4'>
                <CardStats
                  statSubtitle='tổng số sản phẩm của cửa hàng'
                  statTitle={(totalOfProducts?.data || '0') + ' sản phẩm'}
                  statArrow='up'
                  statPercent=''
                  statPercentColor='text-white'
                  statDescription=''
                  statIconName='fas fa-percent'
                  statIconColor='bg-sky-500'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
