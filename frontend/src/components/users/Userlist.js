import React, { useEffect } from "react";
import { getUser } from "../store/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import Search from "./Search";

const Userlist = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();

  const { users } = useSelector((state) => state.users);

  const username = params.username;
  // const email = params.email;
  // const phone = params.phone;

  useEffect(() => {
    dispatch(getUser(username));
  }, [dispatch, username]);

  console.log("userlist", users);

  return (
    <>
      <div className="container py-10  md:w-4/5 w-11/12 px-6">
        <div className="w-full">
          {/* search */}
          <Search history={history} />
          <div className="bg-white overflow-x-auto border border-gray-400 rounded">
            <table className="w-full whitespace-nowrap">
              <thead>
                <tr className="h-20 w-full text-sm leading-none text-gray-600">
                  <th className="font-normal text-left pl-4 ">
                    <p className="border-r border-gray-400">Profile Photo</p>
                  </th>
                  <th className="font-normal text-left pl-11">
                    <p className="border-r border-gray-400 w-1/2">Name</p>
                  </th>
                  <th className="font-normal text-left pl-10">
                    <p className="border-r border-gray-400 w-1/2">Email</p>
                  </th>
                  <th className="font-normal text-left pl-10">
                    <p className="border-r border-gray-400 w-1/2">Phone</p>
                  </th>
                  <th className="font-normal text-left pl-10">
                    <p className="border-r border-gray-400 w-1/2">SignIn</p>
                  </th>
                  <th className="font-normal text-left w-32">
                    <p className="w-1/2">Actions</p>
                  </th>
                </tr>
              </thead>
              <tbody className="w-full">
                {users?.length > 0 &&
                  users?.map((item) => {
                    return (
                      <>
                        <tr
                          className="h-20 text-sm leading-none text-gray-700 border-b border-t border-gray-200 bg-white hover:bg-gray-100"
                          key={item._id}
                        >
                          <td className="pl-4">
                            <img
                              className="shadow-md rounded-full w-10 h-10 mr-3"
                              src="https://cdn.tuk.dev/assets/templates/olympus/invoice.png"
                              alt=""
                            />
                          </td>
                          <td className="pl-11">
                            <div className="flex items-center">
                              {item.username}
                            </div>
                          </td>
                          <td>
                            <p className="mr-16 pl-10">{item.email}</p>
                          </td>
                          <td>
                            <p className="mr-16 pl-10">{item.phone}</p>
                          </td>
                          <td>
                            <p className="mr-16 pl-10">
                              {item.signed_in_method}
                            </p>
                          </td>
                          <td>
                            <p className="mr-16">
                              <Link to={`users/view/${item._id}`}>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="15"
                                  height="15"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" />
                                </svg>
                              </Link>
                            </p>
                          </td>
                        </tr>
                      </>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Userlist;
