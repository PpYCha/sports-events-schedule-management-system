import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Option,
  Select,
  Switch,
} from "@material-tailwind/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const UserDialog = ({ open, hanldeOpenDialog, userInfo, dialogTitle }) => {
  const [payload, setPayload] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    userRole: "",
    isActive: false,
  });

  // Populate payload with userInfo if it exists
  useEffect(() => {
    if (userInfo) {
      setPayload({ ...payload, ...userInfo });
    }
  }, [userInfo]);

  const queryClient = useQueryClient();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setPayload({
      ...payload,
      [name]: newValue,
    });
  };

  const createUserMutation = useMutation({
    mutationFn: async (payload) => {
      const response = await axios.post("http://localhost:3000/users", payload);
      return response.data;
    },
    onSuccess: (data) => {
      hanldeOpenDialog();
      queryClient.invalidateQueries({ queryKey: ["getUsers"] });
    },
    onError: (error) => {
      console.error("Error creating user:", error);
      // Display error message or handle errors
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: async (payload) => {
      const response = await axios.put(
        `http://localhost:3000/users/${payload._id}`,

        payload,
      );
      return response.data;
    },
    onSuccess: (data) => {
      hanldeOpenDialog();
      queryClient.invalidateQueries({ queryKey: ["getUsers"] });
    },
    onError: (error) => {
      console.error("Error updating user:", error);
      // Display error message or handle errors
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    userInfo._id === undefined
      ? createUserMutation.mutate(payload)
      : updateUserMutation.mutate(payload);

    handleResetPayload();
  };

  const handleResetPayload = () => {
    setPayload({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      userRole: "",
      isActive: false,
    });
  };

  return (
    <Dialog open={open} handler={hanldeOpenDialog}>
      <form onSubmit={handleSubmit}>
        <DialogHeader>{dialogTitle}</DialogHeader>
        <DialogBody divider>
          <div className="flex flex-col gap-5">
            <Input
              label="Firstname"
              value={payload.firstName}
              name="firstName"
              onChange={handleInputChange}
            />
            <Input
              label="Lastname"
              value={payload.lastName}
              name="lastName"
              onChange={handleInputChange}
            />
            <Input
              label="Email"
              value={payload.email}
              name="email"
              type="email"
              onChange={handleInputChange}
            />
            <Input
              label="Password"
              value={payload.password}
              name="password"
              type="password"
              onChange={handleInputChange}
            />

            <Select
              label="Select User Role"
              value={payload.userRole}
              name="userRole"
              onChange={(e) => setPayload({ ...payload, userRole: e })}
              // onChange={handleSelectChange}
            >
              <Option value="--" disabled>
                --
              </Option>
              <Option value="Admin">Admin</Option>
              <Option value="Encoder">Encoder</Option>
            </Select>

            <Switch
              name="isActive"
              label="Is Acitve?"
              color="blue"
              value={payload.isActive}
              onChange={handleInputChange}
            />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => {
              handleResetPayload();
              hanldeOpenDialog();
            }}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" type="submit">
            <span>Save</span>
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
};

export default UserDialog;
