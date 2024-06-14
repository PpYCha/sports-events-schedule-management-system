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
    date: "",
    time: "",
    firstUnit: "",
    secondUnit: "",
    singleDouble: "",
    player1: "",
    player2: "",
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
          <div className="flex flex-row gap-5">
            <Input
              label={"Date"}
              value={payload.date}
              name="date"
              onChange={handleInputChange}
              type="date"
            />
            <Input
              label={"Time"}
              value={payload.time}
              name="time"
              onChange={handleInputChange}
              type="time"
            />
          </div>
          {/* <Input
            label={"Sport"}
            value={payload.sport}
            name="sport"
            onChange={handleInputChange}
          /> */}

          <Select
            label="Select Sport"
            value={payload.sport}
            name="sport"
            onChange={(e) => setPayload({ ...payload, sport: e })}
            // onChange={handleSelectChange}
          >
            <Option value="--" disabled>
              --
            </Option>
            <Option value="Badminton">Badminton</Option>
            <Option value="Baseball">Baseball</Option>
            <Option value="Basketball">Basketball</Option>
            <Option value="Chess">Chess</Option>
            <Option value="Volleyball">Volleyball</Option>
          </Select>

          <Select
            label="Select Single,Double or Group Sports"
            value={payload.singleDouble}
            name="singleDouble"
            onChange={(e) => setPayload({ ...payload, singleDouble: e })}
            // onChange={handleSelectChange}
          >
            <Option value="--" disabled>
              --
            </Option>
            <Option value="Single">Single</Option>
            <Option value="Double">Double</Option>
            <Option value="Group">Group</Option>
          </Select>

          <div className="flex flex-col gap-5">
            <Select
              label="Select Unit"
              value={payload.firstUnit}
              name="firstUnit"
              onChange={(e) => setPayload({ ...payload, firstUnit: e })}
              // onChange={handleSelectChange}
            >
              <Option value="--" disabled>
                --
              </Option>
              <Option value="Unit 1">Unit 1</Option>
              <Option value="Unit 2">Unit 2</Option>
              <Option value="Unit 3">Unit 3</Option>
              <Option value="Unit 4">Unit 4</Option>
              <Option value="Unit 5">Unit 5</Option>
            </Select>

            <Typography className="text-center">VS</Typography>

            <Select
              label="Select Unit"
              value={payload.secondUnit}
              name="secondUnit"
              onChange={(e) => setPayload({ ...payload, secondUnit: e })}
              // onChange={handleSelectChange}
            >
              <Option value="--" disabled>
                --
              </Option>
              <Option value="Unit 1">Unit 1</Option>
              <Option value="Unit 2">Unit 2</Option>
              <Option value="Unit 3">Unit 3</Option>
              <Option value="Unit 4">Unit 4</Option>
              <Option value="Unit 5">Unit 5</Option>
            </Select>
          </div>

          {payload.singleDouble !== "Group" ? (
            <div className="flex flex-col gap-5">
              <Select
                label="Select Player"
                value={payload.firstUnit}
                name="firstUnit"
                onChange={(e) => setPayload({ ...payload, firstUnit: e })}
                // onChange={handleSelectChange}
              >
                <Option value="--" disabled>
                  --
                </Option>
                <Option value="Player 1">Player 1</Option>
                <Option value="Player 2">Player 2</Option>
                <Option value="Player 3">Player 3</Option>
                <Option value="Player 4">Player 4</Option>
                <Option value="Player 5">Player 5</Option>
              </Select>

              <Typography className="text-center">VS</Typography>

              <Select
                label="Select Player"
                value={payload.secondUnit}
                name="secondUnit"
                onChange={(e) => setPayload({ ...payload, secondUnit: e })}
                // onChange={handleSelectChange}
              >
                <Option value="--" disabled>
                  --
                </Option>
                <Option value="Player 1">Player 1</Option>
                <Option value="Player 2">Player 2</Option>
                <Option value="Player 3">Player 3</Option>
                <Option value="Player 4">Player 4</Option>
                <Option value="Player 5">Player 5</Option>
              </Select>
            </div>
          ) : null}
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
