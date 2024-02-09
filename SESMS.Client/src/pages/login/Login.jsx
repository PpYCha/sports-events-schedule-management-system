import React, { useEffect, useState } from "react";

import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Alert,
  Dialog,
  CardBody,
  IconButton,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import logoImage from "../../assets/img/uepLogo.png";
import useAuthStore from "../../context/authStore";
import axios from "axios";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { defaultUrl } from "../../utils/defaultUrl";

const Login = () => {
  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [errors, setErrors] = useState({});

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleLogin = async () => {
    const validationErrors = validate(); // Perform initial validation
    setErrors(validationErrors);

    if (!validationErrors.email && !validationErrors.password) {
      try {
        const res = await axios.post(`${defaultUrl}login`, {
          ...payload,
        });
        if (res.data.email || res.data.password) {
          setErrors(res.data);
        } else {
          login(res.data.token);
          navigate("/dashboard", { replace: true });
        }
        setErrors(res.data);
      } catch (error) {}
    }
  };

  const validate = () => {
    const error = {};
    if (!payload.email) {
      error.email = "Enter an email";
    }
    if (!payload.password) {
      error.password = "Enter a password";
    }
    return error;
  };

  return (
    <>
      <div className="flex h-screen items-center justify-center bg-[#f0f2f5] p-5">
        <Card className="p-5 ">
          <div
            className="flex  w-full items-center justify-center"
            onClick={(e) => navigate("/")}
          >
            <img src={logoImage} className="h-auto max-h-[200px] " />
          </div>
          <Typography
            color="gray"
            variant="h1"
            className="mt-1  text-center font-bold"
          >
            UEP
          </Typography>
          <Typography
            color="gray"
            variant="h3"
            className="mb-5 mt-1  text-center font-normal"
          >
            SPORTS EVENTS SCHEDULE
            <p>MANAGEMENT SYSTEM</p>
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Nice to meet you! Enter your details to login.
          </Typography>
          <form className="mx-auto mb-2 mt-8 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-1 flex flex-col gap-6">
              <div>
                <Input
                  label="Email"
                  value={payload.email}
                  id="email"
                  onChange={(e) =>
                    setPayload((prevPayload) => ({
                      ...prevPayload,
                      email: e.target.value,
                    }))
                  }
                  error={errors.email === undefined && " " ? false : true}
                />
                {errors.email === undefined && " " ? null : (
                  <Typography
                    variant="small"
                    color="gray"
                    className="mt-2 flex items-center gap-1 font-normal text-red-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="-mt-px h-4 w-4 "
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.email}
                  </Typography>
                )}
              </div>
              <div>
                <div className="relative flex w-full">
                  <Input
                    label="Password"
                    id="password"
                    value={payload.password}
                    onChange={(e) =>
                      setPayload((prevPayload) => ({
                        ...prevPayload,
                        password: e.target.value,
                      }))
                    }
                    type={showPassword ? "text" : "password"}
                    error={errors.password === undefined && " " ? false : true}
                  />
                  <IconButton
                    className="!absolute right-1 top-1 rounded-full"
                    ripple={true}
                    variant="text"
                    size="sm"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </IconButton>
                </div>
                {errors.password === undefined && " " ? null : (
                  <Typography
                    variant="small"
                    color="gray"
                    className="mt-2 flex items-center gap-1 font-normal text-red-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="-mt-px h-4 w-4 "
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.password}
                  </Typography>
                )}
              </div>
            </div>
            <Button
              className="mt-6"
              fullWidth
              onClick={() => {
                handleLogin();
              }}
            >
              Login
            </Button>

            <Typography color="gray" className="mt-4 text-center font-normal">
              Forgot password?{" "}
            </Typography>
          </form>
        </Card>
      </div>
      <Dialog
        open={alert}
        handler={setAlert}
        className="flex items-center justify-center text-center"
      >
        <Alert onClose={() => setAlert(false)}>
          Incorrect Username or Password
        </Alert>
      </Dialog>
    </>
  );
};

export default Login;
