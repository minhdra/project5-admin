import React, { useEffect } from 'react';

// components

// import CardLineChart from '../../components/Cards/CardLineChart';
// import CardBarChart from '../../components/Cards/CardBarChart';
// import CardPageVisits from '../../components/Cards/CardPageVisits';
// import CardSocialTraffic from '../../components/Cards/CardSocialTraffic';
import HeaderStats from '../../components/Shared/Headers/HeaderStats';
import { useState } from 'react';
import {
  calculateTotalOfMonth,
  statisticOrdersDeliveredOfMonth,
  statisticProducts,
  statisticUserOfMonth,
} from '../../services/statistic';
// import { useNavigate } from 'react-router';

export default function Dashboard({ setTitle }) {
  useEffect(() => {
    setTitle('Draco - Dashboard');
  }, [setTitle]);

  const [totalUsers, setTotalUsers] = useState();
  const [totalOfMonth, setTotalOfMonth] = useState();
  const [ordersDeliveredOfMonth, setOrdersDeliveredOfMonth] = useState('0');
  const [totalOfProducts, setTotalOfProducts] = useState();

  useEffect(() => {
    if (!window.sessionStorage.getItem('USER_TOKEN'))
      window.location.reload();
    const date = new Date(Date.now());
    const optionDateNow = {
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    };

    statisticUserOfMonth(optionDateNow).then((res) => {
      setTotalUsers(res);
    });

    calculateTotalOfMonth(optionDateNow).then((res) => setTotalOfMonth(res));

    statisticOrdersDeliveredOfMonth(optionDateNow).then((res) =>
      setOrdersDeliveredOfMonth(res)
    );

    statisticProducts().then(res => setTotalOfProducts(res));
  }, []);

  return (
    <div className='w-full mx-auto min-h-[80vh]'>
      <HeaderStats
        totalUsers={totalUsers}
        totalOfMonth={totalOfMonth}
        ordersDeliveredOfMonth={ordersDeliveredOfMonth}
        totalOfProducts={totalOfProducts}
      />
      {/* <div className='flex flex-wrap'>
        <div className='w-full xl:w-8/12 mb-12 xl:mb-0 px-4'>
          <CardLineChart />
        </div>
        <div className='w-full xl:w-4/12 px-4'>
          <CardBarChart />
        </div>
      </div>
      <div className='flex flex-wrap mt-4'>
        <div className='w-full xl:w-8/12 mb-12 xl:mb-0 px-4'>
          <CardPageVisits />
        </div>
        <div className='w-full xl:w-4/12 px-4'>
          <CardSocialTraffic />
        </div>
      </div> */}
    </div>
  );
}
