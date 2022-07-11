import React, { useEffect, useRef, useState } from "react";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import FaceIcon from "@mui/icons-material/Face";
import PhoneIcon from "@mui/icons-material/Phone";
import "./Login.css";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuth } from "./components/store/actions/auth";
import Cookies from "universal-cookie";
import { api } from "./components/helper/instance";
import { SHOW_TOAST } from "./components/store/constants/constant";
import FacebookLogin from "react-facebook-login";
import { FacebookLoginButton } from "react-social-login-buttons";
import { GoogleLogin } from "react-google-login";
import RendorCropImage from "./components/crop/RendorCropImage";

const LoginSignup = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const cookies = new Cookies();
  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    image: [],
  });
  const [imgArray, setImgArray] = useState([]);

  const signupData = (e) => {
    const { value, name } = e.target;

    setUser((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    imgArray?.map((x, y) => {
      console.log(x);
      let reader = new FileReader();
      reader.readAsDataURL(x.originFileObj);
      reader.onload = () => {
        user.image[y] = reader.result;
        // console.log(reader.result);
        setUser({ ...user, image: user.image });
      };
    });
  }, [imgArray]);

  const switchTabs = (tab, e) => {
    if (tab) {
      if (e === "login") {
        switcherTab.current.classList.add("shiftToNeutral");
        switcherTab.current.classList.remove("shiftToRight");

        registerTab.current.classList.remove("shiftToNeutralForm");
        loginTab.current.classList.remove("shiftToLeft");
      }
      if (e === "register") {
        switcherTab.current.classList.add("shiftToRight");
        switcherTab.current.classList.remove("shiftToNeutral");

        registerTab.current.classList.add("shiftToNeutralForm");
        loginTab.current.classList.add("shiftToLeft");
      }
    }
  };

  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/users");
    } else {
      history.push("/");
    }
  }, [isAuthenticated, history]);

  const loginData = (e) => {
    e.preventDefault();
    api
      .post("auth/admin/login", {
        username: loginUsername,
        password: loginPassword,
      })
      .then((res) => {
        console.log(res);
        if (res?.status === 200) {
          cookies.set("access_token", res?.data.token);
          dispatch(setIsAuth(true));
          history.push("/users");
          // window.location.reload();
        }
      })
      .catch((error) => {
        dispatch({ type: SHOW_TOAST, payload: error.message });
      });
  };

  const signupbody = {
    ...user,
    signed_in_method: "simple",
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    api
      .post(`auth/admin/create`, signupbody)
      .then((res) => {
        console.log("register user", res);
        setUser({
          username: "",
          email: "",
          phone: "",
          password: "",
        });
        switchTabs(e, "login");
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: SHOW_TOAST, payload: error.message });
      });
  };

  const responseSuccessGoogle = (response) => {
    // console.log("username", response.googleId);
    // console.log("email", response.profileObj.email);
    api
      .post("auth/admin/googlefblogin", {
        username: response.googleId,
        email: response.profileObj.email,
        image: response.profileObj.imageUrl,
        type: "google",
      })
      .then((res) => {
        console.log(res);
        if (res?.status === 200) {
          cookies.set("access_token", res?.data.token);
          dispatch(setIsAuth(true));
          history.push("/users");
          // window.location.reload();
        }
      })
      .catch((error) => {
        dispatch({ type: SHOW_TOAST, payload: error.message });
      });
  };

  const responseErrorGoogle = (response) => {
    console.log(response);
  };

  const responseFacebook = (response) => {
    // console.log('username',response);
    api
      .post("auth/admin/googlefblogin", {
        username: response.userID,
        email: response.email,
        image: response.picture.data.url,
        type: "facebook",
      })
      .then((res) => {
        console.log(res);
        if (res?.status === 200) {
          console.log("res fb login", res.data.token);
          cookies.set("access_token", res?.data?.token);
          dispatch(setIsAuth(true));
          history.push("/users");
          // window.location.reload();
        }
      })
      .catch((error) => {
        dispatch({ type: SHOW_TOAST, payload: error.message });
      });
  };

  return (
    <>
      <div className="LoginSignUpContainer">
        <div className="LoginSignUpBox">
          <div>
            <div className="login_signUp_toggle">
              <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
              <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
            </div>
            <button ref={switcherTab}></button>
          </div>
          <form className="loginForm" ref={loginTab}>
            <div className="loginusername mb-3">
              <FaceIcon />
              <input
                type="text"
                placeholder="Username"
                name="username"
                required
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
              />
            </div>
            <div className="loginPassword mb-3">
              <LockOpenIcon />
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            <input
              type="submit"
              value="Login"
              className="loginBtn mb-3"
              onClick={loginData}
            />
            <div>
              <div className="options mb-3">
                <h3>Or</h3>
              </div>
            </div>
            <div>
              <GoogleLogin
                clientId="861504115516-iifr2rthspg5oisgr14p76i0uq1up9cc.apps.googleusercontent.com"
                buttonText="Login with google"
                onSuccess={responseSuccessGoogle}
                onFailure={responseErrorGoogle}
              />

              <FacebookLogin
                appId="766674481349475"
                fields="email,picture"
                // onClick={componentClicked}
                callback={responseFacebook}
                cssClass="my-facebook-button-class"
                icon={<FacebookLoginButton />}
              />
            </div>
          </form>
          <form
            className="signUpForm"
            ref={registerTab}
            onSubmit={registerSubmit}
          >
            <div className="mt-12 mb-3">
              <RendorCropImage getImageArray={setImgArray} imgArray={[]} />
            </div>
            <div className="signUpName mb-3">
              <FaceIcon />
              <input
                type="text"
                placeholder="Username"
                required
                name="username"
                value={user.username}
                onChange={signupData}
              />
            </div>
            <div className="signUpEmail mb-3">
              <MailOutlineIcon />
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                value={user.email}
                onChange={signupData}
              />
            </div>
            <div className="signUpName mb-3">
              <PhoneIcon />
              <input
                type="text"
                placeholder="Phone"
                required
                name="phone"
                minLength={10}
                value={user.phone}
                onChange={signupData}
              />
            </div>
            <div className="signUpPassword mb-3">
              <LockOpenIcon />
              <input
                type="password"
                placeholder="Password"
                required
                name="password"
                value={user.password}
                onChange={signupData}
              />
            </div>
            <input type="submit" value="Register" className="signUpBtn mb-3" />
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginSignup;
