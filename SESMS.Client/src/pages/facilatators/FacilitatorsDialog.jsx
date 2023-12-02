import React, { useState } from "react";
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
} from "@material-tailwind/react";

const FacilitatorsDialog = ({
  open,
  handleOpen,
  editFacilitator,
  dialogTitle,
}) => {
  const [payload, setPayload] = useState({
    firstName: "",
    lastName: "",
    facilitatorRole: "",
    sportsEvent: "",
  });
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [facilitatorRole, setFacilitatorRole] = useState("");
  const [sportsEvent, setSportsEvent] = useState("");
  console.log(editFacilitator);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Your Axios POST request
      await axios.post("http://localhost:3000/facilatators", {
        ...payload,
      });

      // Close the dialog or perform any necessary actions after successful submission
      handleOpen();
    } catch (error) {
      console.error("Error submitting data:", error);
      // Handle error states or display an error message
    }
  };

  return (
    <Dialog open={open} handler={handleOpen}>
      <form onSubmit={handleSubmit}>
        <DialogHeader>{dialogTitle}</DialogHeader>
        <DialogBody divider>
          <div className="flex flex-col gap-5">
            <Input
              label="Firstname"
              value={payload.firstName}
              id="firstName"
              onChange={(e) =>
                setPayload({ ...payload, [e.target.id]: e.target.value })
              }
            />
            <Input
              label="Lastname"
              value={payload.lastName}
              id="lastName"
              onChange={(e) =>
                setPayload({ ...payload, [e.target.id]: e.target.value })
              }
            />

            <Select
              label="Select Facilitator Role"
              value={payload.facilitatorRole} // Ensure this value is correctly bound
              id="facilitatorRole"
              onChange={(e) => setPayload({ ...payload, facilitatorRole: e })}
            >
              <Option disabled>--</Option>
              <Option value="Referee">Referee</Option>
              <Option value="Announcer">Announcer</Option>
            </Select>

            <Select
              label="Sports Event"
              value={payload.sportsEvent} // Ensure this value is correctly bound
              id="sportsEvent"
              onChange={(e) => setPayload({ ...payload, sportsEvent: e })}
            >
              <Option disabled>--</Option>
              <Option value="Chess">Chess</Option>
              <Option value="Basketball">Basketball</Option>
              <Option value="Table Tennis">Table Tennis</Option>
              <Option value="Badminton">Badminton</Option>
              <Option value="Running">Running</Option>
            </Select>
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
          <Button variant="gradient" color="green" type="submit">
            <span>Save</span>
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
};

export default FacilitatorsDialog;
