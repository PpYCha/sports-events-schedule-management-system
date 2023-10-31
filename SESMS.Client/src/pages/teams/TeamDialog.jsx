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

const TeamDialog = ({ open, handleOpen }) => {
  return (
    <Dialog open={open} handler={handleOpen}>
      <DialogHeader>New Player</DialogHeader>
      <DialogBody divider>
        <div className="flex flex-col gap-5">
          <Input label="Firstname" />
          <Input label="Lastname" />
          <Input type="date" label="Birthdate" />

          <Select label="Select Gender">
            <Option>Male</Option>
            <Option>Female</Option>
          </Select>
          <Select label="Select College">
            <Option>College of Science</Option>
            <Option>College of Nursing</Option>
            <Option>College of Education</Option>
            <Option>College of Agriculture</Option>
          </Select>
          <Select label="Select Course">
            <Option>BSIT</Option>
            <Option>Electrical Engineering</Option>
            <Option></Option>
            <Option>College of Agriculture</Option>
          </Select>

          <Input label="Contact Number" />
          <Input label="Emergency Number" />
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

export default TeamDialog;
