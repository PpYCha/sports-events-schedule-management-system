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
import axios from "axios";
import React, { useEffect, useState } from "react";
import { defaultUrl } from "../../utils/defaultUrl";
import refreshStore from "../../context/refreshStore";

const VenueDialog = ({ open, hanldeOpenDialog, dialogTitle, venueInfo }) => {
  const { refreshVenue } = refreshStore();
  const [payload, setPayload] = useState({
    venueName: "",
    venueLocation: "",
  });

  useEffect(() => {
    if (venueInfo) {
      setPayload({ ...payload, ...venueInfo });
    }
  }, [venueInfo]);

  const postData = async () => {
    const result = await axios.post(`${defaultUrl}venues`, payload);
    refreshVenue();
    hanldeOpenDialog();
  };

  const updateData = async () => {
    const result = await axios.put(
      `${defaultUrl}venues/${payload.venueId}`,
      payload,
    );
    refreshVenue();
    hanldeOpenDialog();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Venue Info:", venueInfo);

    if (venueInfo.venueId === undefined) {
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
      venueName: "",
      venueLocation: "",
    });
  };

  return (
    <Dialog open={open} handler={hanldeOpenDialog}>
      <DialogHeader>{dialogTitle}</DialogHeader>
      <DialogBody divider>
        <div className="flex flex-col gap-5">
          <Input
            label={"Venue"}
            value={payload.venueName}
            name="venueName"
            onChange={handleInputChange}
          />
          <Input
            label={"Location"}
            value={payload.venueLocation}
            name="venueLocation"
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

export default VenueDialog;
