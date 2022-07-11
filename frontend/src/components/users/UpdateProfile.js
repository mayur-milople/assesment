import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import RendorCropImage from "../crop/RendorCropImage";
import { api } from "../helper/instance";
import { SHOW_TOAST } from "../store/constants/constant";
import "./form.css";

const UpdateProfile = () => {
  const [imgArray, setImgArray] = useState([]);
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    image: [],
  });

  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();

  const inputUser = (e) => {
    const { value, name } = e.target;

    setUser((oldData) => {
      return {
        ...oldData,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    var imgD = [];
    imgArray?.map((x, y) => {
      if (x.originFileObj) {
        let reader = new FileReader();
        reader.readAsDataURL(x.originFileObj);
        reader.onload = () => {
          imgD[y] = reader.result;
          // console.log(reader.result);
          setUser({ ...user, image: imgD });
        };
      } else {
        console.log(x);
        imgD[y] = x.url;
        // console.log(reader.result);
        setUser({ ...user, image: imgD });
      }
    });
  }, [imgArray]);
  const setToImgArray = () => {
    var flist = [];
    user.image?.map((x, y) => {
      flist.push({
        uid: y,
        name: "image.png",
        status: "done",
        url: x,
      });
    });

    return flist;
  };

  const getuserById = () => {
    api
      .get(`auth/admin/user/${params.id}`)
      .then((res) => {
        if (res.status === 200) {
          console.log("userId", res.data.data);
          const data = res.data.data;
          setUser({
            username: data.username,
            email: data.email,
            phone: data.phone,
            image: data.image,
          });
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
  }, []);

  const body = {
    ...user,
  };

  const updateUser = (e) => {
    e.preventDefault();

    api
      .put(`auth/admin/user/update/${params.id}`, body)
      .then((res) => {
        if (res?.status === 200) {
          console.log("upate", res);
          history.push("/profile");
        }
      })
      .catch((error) => {
        dispatch({ type: SHOW_TOAST, payload: error.message });
      });
  };

  return (
    <>
      <div className="pt-5">
        <div className="container py-5 flex justify-center">
          <form>
            <div className="row mb-4 flex justify-center">
              <div>
                {setToImgArray().length > 0 ? (
                  <RendorCropImage
                    getImageArray={setImgArray}
                    imgArray={setToImgArray()}
                  />
                ) : null}
              </div>
            </div>
            <div className="row justify-center">
              <div className="mb-3">
                <label htmlFor="exampleInputName" className="form-label">
                  Username
                </label>
                <br />
                <input
                  type="text"
                  className="username"
                  id="exampleInputName"
                  value={user.username}
                  name="username"
                  onChange={inputUser}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputName" className="form-label">
                  Email
                </label>
                <br />
                <input
                  type="email"
                  className="email"
                  id="exampleInputName"
                  value={user.email}
                  name="email"
                  onChange={inputUser}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputName" className="form-label">
                  Phone
                </label>
                <br />
                <input
                  type="text"
                  className="phone"
                  id="exampleInputName"
                  value={user.phone}
                  name="phone"
                  minLength={10}
                  onChange={inputUser}
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
              onClick={updateUser}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;
