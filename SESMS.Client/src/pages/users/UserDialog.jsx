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

  const queryClient = useQueryClient();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setPayload({
      ...payload,
      [name]: newValue,
    });
  };

  const { mutate, isLoading, error } = useMutation({
    mutationFn: async (payload) => {
      const response = await axios.post("http://localhost:3000/users", payload);
      return response.data;
    },
    onSuccess: (data) => {
      // Handle successful mutation response
      console.log("Data submitted successfully:", data);
      // Close the dialog or perform other actions
      queryClient.invalidateQueries({ queryKey: ["getUsers"] });
      hanldeOpenDialog();
    },
    onError: (error) => {
      console.error("Error submitting data:", error);
      // Handle error states or display an error message
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    mutate(payload);
    // try {
    //   // Your Axios POST request
    //   await axios.post("http://localhost:3000/users", {
    //     ...payload,
    //   });

    //   // Close the dialog or perform any necessary actions after successful submission
    //   hanldeOpenDialog();
    // } catch (error) {
    //   console.error("Error submitting data:", error);
    //   // Handle error states or display an error message
    // }
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
