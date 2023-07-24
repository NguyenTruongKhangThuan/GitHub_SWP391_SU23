import React, { useState } from "react";
import { loginAPI, authenticationAPI, signUpAPI } from "../api/userAPI";
import { Navigate, useNavigate } from "react-router-dom";
import {IoMdInformationCircleOutline} from 'react-icons/io'
import useSessionStorageState from "use-session-storage-state";
import PasswordStrengthBar from 'react-password-strength-bar';
import moment from "moment";

function Authentication() {
  const [handleToggle, setHandleToggle] = useState(false);
  const [token, setToken] = useState(null);
  const [usernameSession, setUsernameSession] = useState(null);
  const navigate = useNavigate();
  const toggleForms = () => {
    setHandleToggle(!handleToggle);
  };
  const [accountToken, setAccountToken] =
    useSessionStorageState("accountToken");
  const [account, setAccount] = useSessionStorageState("account");

  const loginRedirect = (username, password) => {
    loginAPI(username, password)
        .then((res) => {
          setToken(res);
          setUsernameSession(username);
        })
        .catch((error) => {
            window.alert(error.response.data);
        });
    };
    if (token !== null) {
      sessionStorage.setItem("accountToken", token);
      authenticationAPI(token)
        .then((res) => {
          if (res === "ADMIN") {
            navigate("/admin");
            sessionStorage.setItem("account", usernameSession);
          }
          if (res === "CUSTOMER") {
            navigate("/shop");
            sessionStorage.setItem("account", usernameSession);
          }
          if (res === "OWNER") {
            navigate("/shop/publisher");
            sessionStorage.setItem("account", usernameSession);
          }
        })
        .catch((error) => {
          if (error.response.status === 400) {
            window.alert(error.response.data);
          }
        });
  }

  //Login Form Here
  const LoginForm = () => {
    const [errorMessage, setErrorMessage] = useState('');

    const authenLogin = (e) => {
      e.preventDefault();
      let username =
        document.getElementById("lg-username").value === ""
          ? "empty"
          : document.getElementById("lg-username").value;
      let password =
        document.getElementById("lg-password").value === ""
          ? "empty"
          : document.getElementById("lg-password").value;

      loginAPI(username, password)
        .then((res) => {
          setToken(res);
          setUsernameSession(username);
        })
        .catch((error) => {
            setErrorMessage(error.response.data);
        });
    };

    const clearErrorMessage = () => {
      setErrorMessage(''); // Clear the error message when the user clicks on the input fields again
    };

    if (token !== null) {
      sessionStorage.setItem("accountToken", token);
      authenticationAPI(token)
        .then((res) => {
          if (res === "ADMIN") {
            navigate("/admin");
            sessionStorage.setItem("account", usernameSession);
          }
          if (res === "CUSTOMER") {
            navigate("/shop");
            sessionStorage.setItem("account", usernameSession);
          }
          if (res === "OWNER") {
            navigate("/shop/publisher");
            sessionStorage.setItem("account", usernameSession);
          }
        })
        .catch((error) => {
          if (error.response.status === 400) {
            window.alert(error.response.data);
          }
        });
    }
    return (
      <div className="bg-gradient-to-tr from-[#62B6B7] to-[#CBEDD5]  w-full h-screen flex justify-center items-center">
        <div className={`w-[460px] p-8 h-fit  ${errorMessage !== ''? 'border-red-500 border-[1px]': ''} bg-[#ffffffc2] rounded-lg`}>
          <form className={`h-fit flex flex-col px-[20px] gap-[10px]`}>
          
            <header className="w-full text-center py-[20px] font-bold">
              <h2 className="text-[36px] mb-3">Login</h2>
              <h4 className="text-[16px] font-medium">
                Welcome to the shop, please login to continue
              </h4>
            </header>
            {errorMessage && (
              <div className="text-red-500 text-center mt-2">{errorMessage}</div>
            )}
            <div className="flex flex-col">
              <label className="font-bold mb-1">Username</label>
              <input
                type="text"
                id="lg-username"
                placeholder="Enter your username"
                className="border-b-solid border-b-[1px] bg-[#ffffff] p-1"
                onClick={clearErrorMessage}
              />
            </div>
            <div className="flex flex-col">
              <label className="font-bold mb-1">Password</label>
              <input
                type="password"
                id="lg-password"
                placeholder="Enter your Password"
                className="border-b-solid bg-[#ffffffc2] p-1 border-b-[1px]"
                onClick={clearErrorMessage}
              />
            </div>
            {/* <div className="justify-between flex py-[10px]">
                            <div>
                            <p className="flex items-center">
                                <input className="mr-2 text-9xl" type="checkbox" />
                                Remember Me
                            </p>
                            </div>
                            <a href="#" className=" text-[#4651D3] hover:text-[#5462FF]">
                            Forgot Password?
                            </a>
                        </div> */}
            <div className="flex flex-col items-center my-5 justify-center ">
              <button
                className=" border w-1/3 rounded-full font-bold mx-8 my-5 py-2 bg-[#0e6486] hover:bg-[#28c4dc] text-white"
                onClick={authenLogin}
              >
                Log in
              </button>
              <div className="text-center mb-7 flex items-center justify-center gap-x-1">
                <p>Are you new here?</p>
                <button className="text-blue-600" onClick={toggleForms}>
                  Sign Up Now
                </button>
              </div>
            </div>
          </form>
        
        </div>
      </div>
    );
  };

  //Signup Form Here
  const SignupForm = () => {
    const [errorMessage, setErrorMessage] = useState('');
    
    const clearErrorMessage = () => {
          setErrorMessage(''); // Clear the error message when the user clicks on the input fields again
        };

    const [openEmailHint, setOpenEmailHint] = useState(false);

    const toggleEmailHint = () => {
      setOpenEmailHint(!openEmailHint);
    }

    const [openPasswordHint, setOpenPasswordHint] = useState(false);

    const togglePasswordHint = () => {
      setOpenPasswordHint(!openPasswordHint);
    }

    const [password, setPassword] = useState('')

    const authenSignUp = (e) => {

      e.preventDefault();
      let username = document.getElementById("sp-username").value;
      let email = document.getElementById("sp-email").value;
      let password = document.getElementById("sp-password").value;
      let confirmPassword = document.getElementById("sp-confirmPassword").value;

      var formData = new FormData();
      formData.append("userId", "Utemp");
      formData.append("roleId", "RO02");
      formData.append("username", username);
      formData.append("password", password);
      formData.append("email", email);
      formData.append("fullName", username);
      formData.append("birthday", moment(new Date()).format("L"));
      formData.append("gender", "");
      formData.append("address", "");
      formData.append("phoneNumber", "");
      formData.append("signUpDate", moment(new Date()).format("L"));
      formData.append("role.roleId", "temp");

      signUpAPI(formData, confirmPassword)
        .then((res) => {
          window.alert(res);
          loginRedirect(username, password);
        })
        .catch(() => {
          setErrorMessage("Error! One or more fields are not met the conditions, please check again!");
        });
    };
    return (
      <div className="bg-gradient-to-tr from-[#B799FF] to-[#AEE2FF]">
        <div className="w-[80%] h-screen flex items-center mx-auto justify-center ">
          <div className="h-fit flex flex-col justify-center items-center">
            <form className={`w-[1000px] bg-[#ffffffc2] ${errorMessage !== ''? 'border-red-500 border-[1px]': ''} p-4 login rounded-lg shadow-md `}>
              <header className="w-full text-center py-[20px] font-bold">
                <h2 className="text-[36px] mb-3">Sign Up</h2>
                <h4 className="text-[16px] font-medium">
                  First time around? Come here and sign up!
                </h4>
              </header>
              {errorMessage && (
                <div className="text-red-500 text-center mt-2">{errorMessage}</div>
              )}
              <div className="grid grid-cols-2">
                <div className="flex flex-col py-2 mx-8">
                  <label className="font-bold ml-1 mb-1">Username</label>
                  <input
                    type="text"
                    id="sp-username"
                    placeholder="Enter your Username"
                    required
                    className="border-b-2 border-solid p-2 "
                    onClick={clearErrorMessage}
                  ></input>
                </div>
                <div className="flex flex-col py-2 mx-8">
                  <div className="flex justify-between">
                    <label className="font-bold ml-1 mb-1">Email</label>         
                  </div>
                  <input
                    type="email"
                    id="sp-email"
                    placeholder="Enter your Email"
                    required
                    className="border-b-2 border-solid p-2 "
                    onClick={clearErrorMessage}
                  ></input>
                  <label 
                      className="font-medium ml-1 mb-1 mt-2 text-[12px] flex items-end cursor-pointer"
                      onClick={toggleEmailHint}
                      >
                        {openEmailHint ? (
                          <>
                            <div className="flex justify-between">
                              <IoMdInformationCircleOutline size={20}/>
                              <p>Your personal email</p>
                            </div>
                          </>
                        ) : (
                          <IoMdInformationCircleOutline size={20} title="Hint"/>
                        )}
                    </label>
                  
                </div>
                <div className="flex flex-col py-2 mx-8">
                  <div className="flex justify-between">
                    <label className="font-bold ml-1 mb-1">Password</label>
                    
                  </div>
                  <input
                    type="password"
                    id="sp-password"
                    placeholder="At least 6 letters, 1 special character and 1 number"
                    required
                    className="border-b-2 border-solid p-2 "
                    onChange={(e) => setPassword(e.target.value)}
                    onClick={clearErrorMessage}
                  ></input>
                  {/* <label 
                      className="font-medium ml-1 mb-1 mt-2 text-[12px] flex items-end cursor-pointer"
                      onClick={togglePasswordHint}
                    >
                      {openPasswordHint ? (
                        <>
                          <div className="flex justify-between gap-x-2">
                            <IoMdInformationCircleOutline size={20}/>
                            <p>Password must contain more than 6 letters, at least 1 number and 1 special character</p>
                          </div>
                        </>
                      ): (
                        <IoMdInformationCircleOutline size={20} title="Hint"/>
                      )}
                    </label> */}
                    <div className="w-full">
                      <PasswordStrengthBar password={password} minLength={6}/>
                    </div>
                </div>
                <div className="flex flex-col py-2 mx-8">
                  <label className="font-bold ml-1 mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="sp-confirmPassword"
                    placeholder="Enter your Password"
                    required
                    className="border-b-2 border-solid p-2 "
                    onClick={clearErrorMessage}
                  ></input>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <button
                  className=" border w-1/3 rounded-full font-bold mx-8 my-5 text-white py-2 bg-[#0A4D68] hover:bg-[#05BFDB]"
                  onClick={(e) => authenSignUp(e)}
                >
                  Sign Up
                </button>
              </div>
              <div className="text-center mb-7 flex items-center justify-center gap-x-1">
                <p>Already have an account?</p>
                <button className="text-blue-600" onClick={toggleForms}>
                  Login Now
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };
  return <div>{!handleToggle ? <LoginForm /> : <SignupForm />}</div>;
}

export default Authentication;
