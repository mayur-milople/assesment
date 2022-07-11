import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { api } from "../helper/instance";
import { SHOW_TOAST } from "../store/constants/constant";

const User = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const [user, setUser] = useState({});

  const getuserById = () => {
    api
      .get(`auth/admin/user/${params.id}`)
      .then((res) => {
        if (res.status === 200) {
          console.log("userId", res.data.data);
          const data = res.data.data;
          setUser(data);
        }
      })
      .catch((error) => {
        dispatch({ type: SHOW_TOAST, payload: error.message });
      });
  };

  useEffect(() => {
    if (params.id) {
      getuserById();
    }
  }, [params.id]);

  console.log("user details", user);

  return (
    <>
      <div className="container py-10  md:w-4/5 w-11/12 px-6">
        <div className="w-full">
          <div className="grid grid-cols-2 gap-3">
            <div className="py-4 md:py-7">
              {user?.image?.length > 0 ? (
                <div className="flex justify-center">
                  <img
                    src={user?.image[0]}
                    alt="profileimage"
                    className="rounded-full w-64 h-full"
                  />
                </div>
              ) : (
                ""
              )}
            </div>

            <div className="py-4 md:py-7">
              <div className="items-center justify-between">
                <div>
                  <h1 style={{ fontWeight: "700", fontSize: "17px" }}>
                    Email:
                  </h1>
                  <p style={{ fontSize: "17px" }}>{user.email}</p>
                </div>
                <div>
                  <h1 style={{ fontWeight: "700", fontSize: "17px" }}>
                    Username:
                  </h1>
                  <p style={{ fontSize: "17px" }}>{user.username}</p>
                </div>
                <div>
                  <h1 style={{ fontWeight: "700", fontSize: "17px" }}>
                    Phone:
                  </h1>
                  <p style={{ fontSize: "17px" }}>{user.phone}</p>
                </div>
                <div>
                  <h1 style={{ fontWeight: "700", fontSize: "17px" }}>
                    SignIn:
                  </h1>
                  <p style={{ fontSize: "17px" }}>{user.signed_in_method}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
