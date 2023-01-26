import React, { useEffect, useState } from "react";
import { createPopper } from "@popperjs/core";
import { useNavigate } from 'react-router';
import { getByUserId } from '../../services/staff';
import { Link } from 'react-router-dom';
const UserDropdown = () => {
  const token = window.sessionStorage.getItem('USER_TOKEN');
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-end",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  const [userId, setUserId] = useState(() =>
    window.sessionStorage.getItem('uuid')
  );
  const [user, setUser] = useState();
  const navigate = useNavigate();

  const handleLogOut = (e) => {
    const ask = window.confirm("Bạn có muốn đăng xuất không?");
    if (ask)
    {
      setUserId();
      setUser();
      window.sessionStorage.removeItem('uuid');
      navigate("../login");
    }
  }

  useEffect(() => {
    if (userId && window.sessionStorage.getItem('uuid'))
    {
      let _id = userId;
      getByUserId(_id, token).then((res) => setUser(res)).catch((err) => console.log(err));
    }
    else
    {
      navigate("../login");
    }
  }, [userId, navigate, token]);

  return (
    <>
      <a
        className="text-slate-400 block"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className="items-center flex">
          <span className="w-12 h-12 text-sm text-white bg-slate-100 inline-flex items-center justify-center rounded-full">
            <img
              alt="..."
              className="w-full rounded-full align-middle border-none shadow-lg"
              src={user?.avatar ? user.avatar : require("../../assets/img/team-1-800x800.jpg")}
            />
          </span>
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <div
          className={
            "text-sm py-2 px-4 flex-inline justify-between items-end w-full whitespace-nowrap bg-transparent text-slate-800 font-bold"
          }
          onClick={(e) => e.preventDefault()}
        >
          <span>Xin chào: <span className='text-red-500'>{user?.last_name ? user?.last_name : user?.username} 🦄</span></span>
        <span className='ml-4 text-slate-500'>ID: {user?.id}</span>
        </div>
        <Link
          to="/settings"
          className={
            "text-md py-2 px-4 font-normal flex gap-2 items-center w-full whitespace-nowrap leading-none bg-transparent text-slate-500 hover:text-red-600"
          }
        >
          <i className="fa-regular fa-gear text-red-600"></i> Thông tin
        </Link>
        <div className="h-0 my-2 border border-solid border-slate-100" />
        <button
          className={
            "text-md py-2 px-4 font-normal flex gap-2 items-center w-full whitespace-nowrap leading-none bg-transparent text-slate-500 hover:text-red-600"
          }
          onClick={handleLogOut}
        >
          <i className="fa-regular fa-power-off text-red-600"></i> Đăng xuất
        </button>
      </div>
    </>
  );
};

export default UserDropdown;
