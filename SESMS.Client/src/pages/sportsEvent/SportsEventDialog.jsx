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
import React, { useEffect, useState } from "react";
import useForm from "../../hooks/useForm";
import axios from "axios";
import { defaultUrl } from "../../utils/defaultUrl";
import refreshStore from "../../context/refreshStore";

const SportsEventDialog = ({
  open,
  hanldeOpenDialog,
  dialogTitle,
  sportEventInfo,
}) => {
  const { loadingSportEvent, refreshSportEvents } = refreshStore();
  const [payload, setPayload] = useState({
    sportEvent: "",
    description: "",
    sport: "",
  });

  useEffect(() => {
    if (sportEventInfo) {
      setPayload({ ...payload, ...sportEventInfo });
    }
  }, [sportEventInfo]);

  const postData = async () => {
    const result = await axios.post(`${defaultUrl}sport-events`, payload);
    refreshSportEvents();
    hanldeOpenDialog();
  };

  const updateData = async () => {
    const result = await axios.put(
      `${defaultUrl}sport-events/${payload.sportEventId}`,
      payload,
    );
    refreshSportEvents();
    hanldeOpenDialog();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (sportEventInfo.sportEventId === undefined) {
      console.log("Calling postData()");
      postData();
    } else {
      console.log("Calling updateData()");
      updateData();
    }

    handleResetPayload();
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setPayload({
      ...payload,
      [name]: newValue,
    });
  };

  const handleResetPayload = () => {
    setPayload({
      sportEvent: "",
      description: "",
      sport: "",
    });
  };

  return (
    <Dialog open={open} handler={hanldeOpenDialog}>
      <DialogHeader>New Sport Event</DialogHeader>
      <DialogBody divider>
        <div className="flex flex-col gap-5">
          <Input
            label={"Sport Event"}
            value={payload.sportEvent}
            name="sportEvent"
            onChange={handleInputChange}
          />
          <Input
            label={"Description"}
            value={payload.description}
            name="description"
            onChange={handleInputChange}
          />
          <Input
            label={"Sport"}
            value={payload.sport}
            name="sport"
            onChange={handleInputChange}
          />
        </div>
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={hanldeOpenDialog}
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
