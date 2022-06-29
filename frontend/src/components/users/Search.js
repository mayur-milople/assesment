import React, { useState } from "react";

const Search = ({ history }) => {
  const [username, setUsername] = useState("");
  //   const [email, setEmail] = useState("");
  //   const [phone, setPhone] = useState("");

  const searchTag = (e) => {
    // setEmail(e.target.value);
    // setPhone(e.target.value);
    setUsername(e.target.value);
  };
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (username) {
      history.push(`/users/${username}`);
    }
    // if (email) {
    //   history.push(`/users/${email}`);
    // }
    else {
      history.push("/users");
    }
  };
  return (
    <>
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
                    onChange={searchTag}
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
