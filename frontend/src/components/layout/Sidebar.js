import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [show, setShow] = useState(false);
  // const [isUser, setIsUser] = useState(false);
  const [isTrainer, setIsTrainer] = useState(false);
  return (
    <>
      <div className="absolute lg:relative w-64 h-screen shadow bg-black hidden lg:block">
        <div className="h-16 w-full flex items-center px-8">
          <h1 className="tetx-2xl text-white">Admin Panel</h1>
        </div>
        <ul aria-orientation="vertical" className=" py-6">
          <li className="pl-6 cursor-pointer text-white text-sm leading-3 tracking-normal pb-4 pt-5 focus:outline-none">
            <div className="flex items-center">
              <div>
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
              <Link to="/dashboard">
                <span className="ml-2">Dashboard</span>
              </Link>
            </div>
          </li>

          <li
            className="pl-6 cursor-pointer text-white text-sm leading-3 tracking-normal mt-4 mb-4 py-2 hover:focus:outline-none"
            // onClick={() => setIsUser(!isUser)}
          >
            <div className="flex items-center">
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
              <Link to="/users">
                <span className="ml-2">Users</span>
              </Link>
            </div>
            {/* {isUser ? (
              <Link to={`/users/view/${params.id}`}>
                <ul className="p-6">
                  <li>User view</li>
                </ul>
              </Link>
            ) : (
              ""
            )} */}
          </li>
          <li
            className="pl-6 cursor-pointer text-white text-sm leading-3 tracking-normal mb-4 py-2 hover:focus:outline-none"
            onClick={() => setIsTrainer(!isTrainer)}
          >
            <div className="flex items-center">
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
              <span className="ml-2">Trainers </span>
            </div>
            {isTrainer ? (
              <ul className="p-6">
                <li>
                  <Link to="/profile">Trainer view</Link>
                </li>
              </ul>
            ) : (
              ""
            )}
          </li>
        </ul>
      </div>
      {/*Mobile responsive sidebar*/}
      <div
        className={
          show
            ? "w-full h-full absolute z-40  transform  translate-x-0 "
            : "   w-full h-full absolute z-40  transform -translate-x-full"
        }
        id="mobile-nav"
      >
        <div
          className="bg-black opacity-50 absolute h-full w-full lg:hidden"
          onClick={() => setShow(!show)}
        />
        <div className="absolute z-40 sm:relative w-64 md:w-96 shadow pb-4 bg-black lg:hidden transition duration-150 ease-in-out h-full">
          <div className="flex flex-col justify-between h-full w-full">
            <div>
              <div className="flex items-center justify-between px-8">
                <div className="h-16 w-full flex items-center">
                  <h1 className="text-2xl text-white">Admin Panel</h1>
                </div>
                <div
                  id="closeSideBar"
                  className="flex items-center justify-center h-10 w-10"
                  onClick={() => setShow(!show)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-x"
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
                    <line x1={18} y1={6} x2={6} y2={18} />
                    <line x1={6} y1={6} x2={18} y2={18} />
                  </svg>
                </div>
              </div>
              <ul aria-orientation="vertical" className=" py-6">
                <li className="pl-6 cursor-pointer text-white text-sm leading-3 tracking-normal pb-4 pt-5 focus:outline-none">
                  <div className="flex items-center">
                    <div className="w-6 h-6 md:w-8 md:h-8">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-grid"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <rect x={4} y={4} width={6} height={6} rx={1} />
                        <rect x={14} y={4} width={6} height={6} rx={1} />
                        <rect x={4} y={14} width={6} height={6} rx={1} />
                        <rect x={14} y={14} width={6} height={6} rx={1} />
                      </svg>
                    </div>
                    <span className="ml-2 xl:text-base md:text-2xl text-base">
                      Dashboard
                    </span>
                  </div>
                </li>
                <li
                  className="pl-6 cursor-pointer text-white text-sm leading-3 tracking-normal mt-4 mb-4 py-2 hover:focus:outline-none"
                  // onClick={() => setIsUser(!isUser)}
                >
                  <div className="flex items-center">
                    <div className="w-6 h-6 md:w-8 md:h-8">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-puzzle"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <path d="M4 7h3a1 1 0 0 0 1 -1v-1a2 2 0 0 1 4 0v1a1 1 0 0 0 1 1h3a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h1a2 2 0 0 1 0 4h-1a1 1 0 0 0 -1 1v3a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-1a2 2 0 0 0 -4 0v1a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h1a2 2 0 0 0 0 -4h-1a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1" />
                      </svg>
                    </div>
                    <span className="ml-2 xl:text-base md:text-2xl text-base">
                      Users
                    </span>
                  </div>
                  {/* {isUser ? (
                    <ul className="p-6">
                      <li>User view</li>
                    </ul>
                  ) : (
                    ""
                  )} */}
                </li>
                <li
                  className="pl-6 cursor-pointer text-white text-sm leading-3 tracking-normal mb-4 py-2 hover:focus:outline-none"
                  onClick={() => setIsTrainer(!isTrainer)}
                >
                  <div className="flex items-center">
                    <div className="w-6 h-6 md:w-8 md:h-8">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-compass"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <polyline points="8 16 10 10 16 8 14 14 8 16" />
                        <circle cx={12} cy={12} r={9} />
                      </svg>
                    </div>
                    <span className="ml-2 xl:text-base md:text-2xl text-base">
                      Trainers
                    </span>
                  </div>
                  {isTrainer ? (
                    <ul className="p-6">
                      <li>Trainer view</li>
                    </ul>
                  ) : (
                    ""
                  )}
                </li>
              </ul>
            </div>
            <div className="w-full">
              <div className="border-t border-gray-300">
                <div className="w-full flex items-center justify-between px-6 pt-1">
                  <div className="flex items-center">
                    <img
                      alt="profile-pic"
                      src="https://tuk-cdn.s3.amazonaws.com/assets/components/boxed_layout/bl_1.png"
                      className="w-8 h-8 rounded-md"
                    />
                  </div>
                  <ul className="flex">
                    <li className="cursor-pointer text-white pt-5 pb-3">
                      <a href="#">profile</a>
                    </li>
                    <li className="cursor-pointer text-white pt-5 pb-3 pl-3">
                      <a href="#">Logout</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
