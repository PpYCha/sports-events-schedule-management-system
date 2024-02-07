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
import useForm from "../../hooks/useForm";

const SportsEventDialog = ({ open, handleOpen }) => {
  const initialFormValues = {
    sportEvent: "",
    description: "",
    game: "",
  };

  const { values, handleChange, handleSubmit, resetForm } = useForm(
    initialFormValues,
    onSubmit,
  );

  function onSubmit(formData) {
    console.log("Form data submitted:", formData);
    // You can handle form submission logic here
    // e.g., make an API call or update state in the parent component
    // After successful submission, you may want to close the dialog
    resetForm();
    handleOpen();
    // Optionally, reset the form
  }

  return (
    <Dialog open={open} handler={handleOpen}>
      <DialogHeader>New Sport Event</DialogHeader>
      <DialogBody divider>
        <div className="flex flex-col gap-5">
          {/* 5. Connect Input components to the useForm state */}
          <Input
            label="Sport Event"
            name="sportEvent"
            value={values.sportEvent}
            onChange={handleChange}
          />
          <Input
            label="Description"
            name="description"
            value={values.description}
            onChange={handleChange}
          />
          <Input
            label="Game"
            name="game"
            value={values.game}
            onChange={handleChange}
          />
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
        <Button variant="gradient" color="green" onClick={handleSubmit}>
          <span>Save</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default SportsEventDialog;
