import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import React from "react";

const ConfimationDialog = ({
  openConfirmationDialog,
  handleOpenConfirmationDialog,
  confirmationTitle,
  confirmationBody,
  handleConfirmAction,
  handleCloseDialog,
}) => {
  return (
    <Dialog
      open={openConfirmationDialog}
      handler={handleOpenConfirmationDialog}
    >
      <DialogHeader>{confirmationTitle}</DialogHeader>
      <DialogBody>{confirmationBody}</DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={handleCloseDialog}
          className="mr-1"
        >
          <span>Cancel</span>
        </Button>
        <Button variant="gradient" color="green" onClick={handleConfirmAction}>
          <span>Confirm</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ConfimationDialog;
