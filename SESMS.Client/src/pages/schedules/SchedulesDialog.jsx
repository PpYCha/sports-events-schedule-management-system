import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import React from "react";

const SchedulesDialog = ({ open, handleOpen }) => {
  return (
    <Dialog open={open} handler={handleOpen}>
      <DialogHeader>New Schedule</DialogHeader>
      <DialogBody divider>
        <div className="flex flex-col gap-5">
          <Input label="Sports Event Name" />
          <Input label="Venue" />
          <Typography variant="h6">Start of Event</Typography>
          <div className="grid grid-cols-2  gap-5 ">
            <Input label="Start Date" type="date" className="col-span-1" />
            <Input label="Start Time" type="time" className="col-span-1" />
          </div>
          <Typography variant="h6">End of Event</Typography>
          <div className="grid grid-cols-2  gap-5 ">
            <Input label="End Date" type="date" className="col-span-1" />
            <Input label="End Time" type="time" className="col-span-1" />
          </div>
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

export default SchedulesDialog;
