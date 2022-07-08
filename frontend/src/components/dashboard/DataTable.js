import React, { useEffect, useState } from "react";
import { getUser } from "../store/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../helper/instance";
import moment from "moment";

const DataTable = () => {
  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const [text, setText] = useState("");

  const [suggestions, setSuggestions] = useState([]);

  const searchTag = (username) => {
    setText(username);
    api
      .get(`auth/admin/search/${username}`)
      .then((res) => {
        console.log("res", res.data.data);
        const data = res.data.data;
        console.log(data);
        if (res.status === 200) {
          setSuggestions(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const searchSubmitHandler = (e) => {
    e.preventDefault();

    if (text) {
      console.log("text", text);
      api
        .get(`auth/admin/search/${text}`)
        .then((res) => {
          console.log("res", res.data.data);
          const data = res.data.data;
          console.log(data);
          if (res.status === 200) {
            setSuggestions(data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <div className="container py-10  md:w-4/5 w-11/12 px-6">
        <div className="w-full">
          {/* search */}
          <div className="py-4 md:py-7">
            <div className="lg:flex items-center justify-between">
              <div className="md:flex items-center mt-6 lg:mt-0 w-full border border-gray-400 rounded">
                <div className="flex items-center w-full">
                  <div className="flex items-center pl-3 bg-white border w-full rounded border-gray-200">
                    <svg
                      className="text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      width={20}
                      height={20}
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M8.33333 13.1667C11.555 13.1667 14.1667 10.555 14.1667 7.33333C14.1667 4.11167 11.555 1.5 8.33333 1.5C5.11167 1.5 2.5 4.11167 2.5 7.33333C2.5 10.555 5.11167 13.1667 8.33333 13.1667Z"
                        stroke="currentColor"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M17.5 17.5L12.5 12.5"
                        stroke="currentColor"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <form onSubmit={searchSubmitHandler}>
                      <input
                        type="search"
                        className="py-2.5 pl-1 w-full focus:outline-none text-sm rounded text-gray-600 placeholder-gray-500"
                        placeholder="Filter users by name, email, phone...."
                        onChange={(e) => searchTag(e.target.value)}
                        value={text}
                      />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* table */}
          <div className="bg-white overflow-x-auto border border-gray-400 rounded">
            <table className="w-full whitespace-nowrap">
              <thead>
                <tr className="h-20 w-full text-sm leading-none text-gray-600">
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
                  <th className="font-normal text-left pl-10">
                    <p className="border-r border-gray-400 w-1/2">LoginAt</p>
                  </th>
                </tr>
              </thead>
              <tbody className="w-full">
                {text ? (
                  <>
                    {suggestions?.length > 0 &&
                      suggestions?.map((item) => {
                        return (
                          <>
                            <tr
                              className="h-20 text-sm leading-none text-gray-700 border-b border-t border-gray-200 bg-white hover:bg-gray-100"
                              key={item._id}
                            >
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
                                <p className="mr-16 pl-10">
                                  {moment(item.login_at).format("YYYY-MM-DD")}
                                </p>
                              </td>
                            </tr>
                          </>
                        );
                      })}
                  </>
                ) : (
                  <>
                    {users?.length > 0 &&
                      users?.map((item) => {
                        return (
                          <>
                            <tr
                              className="h-20 text-sm leading-none text-gray-700 border-b border-t border-gray-200 bg-white hover:bg-gray-100"
                              key={item._id}
                            >
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
                                <p className="mr-16 pl-10">
                                  {moment(item.login_at).format("YYYY-MM-DD")}
                                </p>
                              </td>
                            </tr>
                          </>
                        );
                      })}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default DataTable;
