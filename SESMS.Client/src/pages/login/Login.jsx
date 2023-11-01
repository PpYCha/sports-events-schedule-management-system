import React, { useState } from "react";

import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Alert,
  Dialog,
  CardBody,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import logoImage from "../../assets/img/uepLogo.png";
import useAuthStore from "../../context/authStore";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleLogin = () => {
    login(username, password);
    if (username === "admin" && password === "admin")
      navigate("/dashboard", { replace: true });
    else if (username === "client" && password === "client")
      navigate("/purchasehistory", { replace: true });
    else setAlert(true);
  };

  return (
    <>
      <div className="flex h-screen items-center justify-center bg-[#f0f2f5] p-5">
        <Card className="p-5 ">
          <div
            className="flex  w-full items-center justify-center"
            onClick={(e) => navigate("/home")}
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
              <Input
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
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
