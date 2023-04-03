import { Link } from 'react-router-dom';

function Breadcrumb({ breadcrumbs }) {
  return (
    <nav
      className='inline-flex bg-white text-gray-700 border border-gray-200 py-3 px-5 rounded-md mb-2'
      aria-label='Breadcrumb'
    >
      <ol className='inline-flex items-center space-x-1 md:space-x-3'>
        <li className='inline-flex items-center'>
          <Link
            to='/'
            className='text-sm text-gray-600 hover:text-gray-900 inline-flex items-center font-medium'
          >
            <svg
              className='w-4 h-4 mr-2'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z'></path>
            </svg>
            Trang chủ
          </Link>
        </li>
        {breadcrumbs && breadcrumbs.length > 0 ? (
          breadcrumbs.map((breadcrumb, index) => {
            return index !== breadcrumbs.length - 1 ? (
              <li key={index}>
                <div className='flex items-center'>
                  <svg
                    className='w-6 h-6 text-gray-400'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                      clipRule='evenodd'
                    ></path>
                  </svg>
                  <Link
                    to={breadcrumb?.link}
                    className='text-gray-700 hover:text-gray-900 ml-1 md:ml-2 text-sm font-medium dark:text-gray-400 dark:hover:text-white'
                  >
                    {breadcrumb?.title}
                  </Link>
                </div>
              </li>
            ) : (
              <li key={index} aria-current='page'>
                <div className='flex items-center'>
                  <svg
                    className='w-6 h-6 text-gray-400'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                      clipRule='evenodd'
                    ></path>
                  </svg>
                  <span className='text-gray-400 ml-1 md:ml-2 text-sm font-medium dark:text-gray-500'>
                    {breadcrumb?.title}
                  </span>
                </div>
              </li>
            );
          })
        ) : (
          <></>
        )}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
