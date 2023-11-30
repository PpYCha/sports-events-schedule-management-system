import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Option,
  Select,
} from "@material-tailwind/react";
import React from "react";

const UserDialog = ({ open, handleOpen }) => {
  return (
    <Dialog open={open} handler={handleOpen}>
      <DialogHeader>New Team</DialogHeader>
      <DialogBody divider>
        <div className="flex flex-col gap-5">
          <Input label="Team Name" />
          <Input label="Sports Event" />
          <Input label="Manager" />

          <Select label="Select College">
            <Option>College of Science</Option>
            <Option>College of Nursing</Option>
            <Option>College of Education</Option>
            <Option>College of Agriculture</Option>
          </Select>

          <Input label="Team Color" />
        </div>
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={handleOpen}
          className="mr-1"
        >
          <span>Cancel</span>
        </Button>
        <Button variant="gradient" color="green" onClick={handleOpen}>
          <span>Save</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default UserDialog;
