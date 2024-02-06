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

const SportsEventDialog = ({ open, handleOpen }) => {
  return (
    <Dialog open={open} handler={handleOpen}>
      <DialogHeader>New Sport Event</DialogHeader>
      <DialogBody divider>
        <div className="flex flex-col gap-5">
          <Input label="Sport Event" />
          <Input label="Description" />
          <Input label="Game" />
          {/* <Input label="Start time" /> */}
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

export default SportsEventDialog;
