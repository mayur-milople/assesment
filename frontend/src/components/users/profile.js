import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { api } from "../helper/instance";
import { SHOW_TOAST } from "../store/constants/constant";

const Profile = () => {
  const dispatch = useDispatch();

  const [user, setUser] = useState({});

  const getprofile = () => {
    api
      .get(`auth/admin/user`)
      .then((res) => {
        console.log("profile", res);
        if (res?.status === 200) {
          const data = res?.data?.data;
          setUser(data);
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: SHOW_TOAST, payload: error.message });
      });
  };

  useEffect(() => {
    getprofile();
  }, []);

  return (
    <>
      <div className="container py-10  md:w-4/5 w-11/12 px-6">
        <div className="w-full">
          <div className="py-4 md:py-7">
            <div className="lg:flex items-center justify-between">
              <div>
                <h1 style={{ fontWeight: "700" }}>Email:</h1>
                <p>{user.email}</p>
              </div>
              <div>
                <h1 style={{ fontWeight: "700" }}>Username:</h1>
                <p>{user.username}</p>
              </div>
              <div>
                <h1 style={{ fontWeight: "700" }}>Phone:</h1>
                <p>{user.phone}</p>
              </div>
              <div>
                <h1 style={{ fontWeight: "700" }}>SignIn:</h1>
                <p>{user.signed_in_method}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
