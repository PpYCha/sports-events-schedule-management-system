import React, { useCallback, useEffect, useRef, useState } from "react";
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
import { useDropzone } from "react-dropzone";
import blank_avatar from "../../assets/img/blank_avatar.png";
import { defaultUrl } from "../../utils/defaultUrl";

const UserDialog = ({ open, hanldeOpenDialog, userInfo, dialogTitle }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [payload, setPayload] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    userRole: "",
    isActive: false,
    // avatar: "",
  });

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    if (acceptedFiles.length > 0) {
      console.log(acceptedFiles);
      setPayload({ ...payload, avatar: acceptedFiles });
      setSelectedImage(URL.createObjectURL(acceptedFiles[0]));
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  // Populate payload with userInfo if it exists
  useEffect(() => {
    if (userInfo) {
      setPayload({ ...payload, ...userInfo, password: "" });
    }
  }, [userInfo]);

  const queryClient = useQueryClient();

  const createUserMutation = useMutation({
    mutationFn: async (payload) => {
      const response = await axios.post(`${defaultUrl}users`, payload);
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
        `${defaultUrl}users/${payload.userId}`,

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

    userInfo.userId === undefined
      ? createUserMutation.mutate(payload)
      : updateUserMutation.mutate(payload);

    handleResetPayload();
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    console.log(newValue);
    setPayload({
      ...payload,
      [name]: newValue,
    });
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
    <Dialog open={open} handler={hanldeOpenDialog} size={"md"}>
      <form onSubmit={handleSubmit}>
        <DialogHeader>{dialogTitle}</DialogHeader>
        <DialogBody divider>
          <div className="flex flex-col gap-2">
            {/* <div className="felx mx-auto flex-col gap-5 hover:cursor-pointer">
              <div {...getRootProps()}>
                <img
                  src={selectedImage ? selectedImage : blank_avatar}
                  alt="nature image"
                  className="mx-auto h-52 w-52 rounded-full border"
                />

                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Drop the image here ...</p>
                ) : (
                  <p>Drag 'n' drop image here, or click to select image</p>
                )}
              </div>
            </div> */}
            <Input
              label={"Firstname"}
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
              label="Email Address"
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
