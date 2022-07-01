import React, { useEffect, useState } from "react";
import { getUser } from "../store/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";

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

  const [text, setText] = useState("");
  // const [userEmail, setUserEmail] = useState("");

  const [suggestions, setSuggestions] = useState([]);

  const searchTag = (username) => {
    let matches = [];
    if (username.length > 0) {
      matches = users.filter((user) => {
        // console.log("user", user);
        const regex = new RegExp(`${username}`, "gi");
        return user.username.match(regex);
      });
    }
    console.log("matches", matches);
    setSuggestions(matches);
    setText(username);
    // setUserEmail(username);
  };
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (text) {
      history.push(`/users/${text}`);
    }
    // if (userEmail) {
    //   history.push(`/users/${userEmail}`);
    // }
    else {
      history.push("/users");
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
                {text ? (
                  <>
                    {suggestions &&
                      suggestions.map((suggestion) => {
                        return (
                          <>
                            <tr
                              className="h-20 text-sm leading-none text-gray-700 border-b border-t border-gray-200 bg-white hover:bg-gray-100"
                              key={suggestion._id}
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
                                  {suggestion.username}
                                </div>
                              </td>
                              <td>
                                <p className="mr-16 pl-10">
                                  {suggestion.email}
                                </p>
                              </td>
                              <td>
                                <p className="mr-16 pl-10">
                                  {suggestion.phone}
                                </p>
                              </td>
                              <td>
                                <p className="mr-16 pl-10">
                                  {suggestion.signed_in_method}
                                </p>
                              </td>
                              <td>
                                <p className="mr-16">
                                  <Link
                                    to={
                                      "/users"
                                        ? `/users/view/${suggestion._id}`
                                        : `view/${suggestion._id}`
                                    }
                                  >
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
                                  <Link
                                    to={
                                      "/users"
                                        ? `/users/view/${item._id}`
                                        : `view/${item._id}`
                                    }
                                  >
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

export default Userlist;
