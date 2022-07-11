import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { api } from "../helper/instance";
import { setIsAuth } from "../store/actions/auth";
import { useDispatch } from "react-redux";
import Cookies from "universal-cookie";
import { SHOW_TOAST } from "../store/constants/constant";

const Navigation = () => {
  const [show, setShow] = useState(false);
  const [profile, setProfile] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const cookies = new Cookies();

  const logout = () => {
    api
      .get("auth/admin/logout")
      .then((res) => {
        console.log("logout", res);
        if (res?.status === 201) {
          cookies.remove("access_token");
          dispatch(setIsAuth(false));
          history.push("/");
        }
      })
      .catch((error) => {
        dispatch({ type: SHOW_TOAST, payload: error.message });
      });
  };
  return (
    <>
      <nav className="h-16 flex items-center lg:items-stretch justify-end lg:justify-between bg-black shadow relative z-10">
        <div className="hidden lg:flex w-full pr-6 justify-end">
          <div className="w-1/2 hidden lg:flex ">
            <div className="w-full flex items-center pl-8 justify-end">
              <div
                className="flex items-center relative cursor-pointer"
                onClick={() => setProfile(!profile)}
              >
                <div className="rounded-full">
                  {profile ? (
                    <ul className="p-2 w-full border-r bg-black absolute rounded left-0 shadow mt-12 sm:mt-16 ">
                      <li className="flex w-full justify-between text-white hover:text-indigo-700 cursor-pointer items-center">
                        <Link
                          to="/profile"
                          style={{ color: "white", textDecoration: "none" }}
                        >
                          <div className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="icon icon-tabler icon-tabler-user"
                              width={18}
                              height={18}
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path stroke="none" d="M0 0h24v24H0z" />
                              <circle cx={12} cy={7} r={4} />
                              <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                            </svg>
                            <span className="text-sm ml-2">My Profile</span>
                          </div>
                        </Link>
                      </li>
                      <li className="flex w-full justify-between text-white hover:text-indigo-700 cursor-pointer items-center mt-2">
                        <div className="flex items-center" onClick={logout}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-logout"
                            width={20}
                            height={20}
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                            <path d="M7 12h14l-3 -3m0 6l3 -3" />
                          </svg>
                          <span className="text-sm ml-2">Sign out</span>
                        </div>
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                  <div className="relative">
                    <img
                      className="rounded-full h-10 w-10 object-cover"
                      src="https://tuk-cdn.s3.amazonaws.com/assets/components/sidebar_layout/sl_1.png"
                      alt="avatar"
                    />
                    <div className="w-2 h-2 rounded-full bg-green-400 border border-white absolute inset-0 mb-0 mr-0 m-auto" />
                  </div>
                </div>
                <p className="text-white text-sm mx-3 mb-0">Jane Doe</p>
                <div className="cursor-pointer text-white">
                  <svg
                    aria-haspopup="true"
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-chevron-down"
                    width={20}
                    height={20}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="text-white mr-8 visible lg:hidden relative"
          onClick={() => setShow(!show)}
        >
          {show ? (
            " "
          ) : (
            <svg
              aria-label="Main Menu"
              aria-haspopup="true"
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-menu cursor-pointer"
              width={30}
              height={30}
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <line x1={4} y1={8} x2={20} y2={8} />
              <line x1={4} y1={16} x2={20} y2={16} />
            </svg>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navigation;
