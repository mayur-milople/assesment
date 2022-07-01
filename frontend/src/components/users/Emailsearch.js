import React, { useEffect, useState } from "react";
import { getUser } from "../store/actions/userAction";
import { useDispatch, useSelector } from "react-redux";

const Emailsearch = ({ history }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [email, setEmail] = useState("");
  //   const [phone, setPhone] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const { users } = useSelector((state) => state.users);

  // console.log("username", users);

  const searchTag = (email) => {
    let matches = [];
    if (email.length > 0) {
      matches = users.filter((user) => {
        // console.log("user", user);
        const regex = new RegExp(`${email}`, "gi");
        return user.email.match(regex);
      });
    }
    // setEmail(e.target.value);
    // setPhone(e.target.value);
    // console.log("matches", matches);
    setSuggestions(matches);
    setEmail(email);
  };
  const searchSubmitHandler = (e) => {
    e.preventDefault();

    if (email) {
      history.push(`/users/${email}`);
    } else {
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
                    onChange={(e) => searchTag(e.target.value)}
                    value={email}
                  />
                  {suggestions.length > 0 &&
                    suggestions.map((suggestion, i) => (
                      <div key={i}>{suggestion.email}</div>
                    ))}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Emailsearch;
