import {
  ChartBarIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CodeBracketIcon,
  CodeBracketSquareIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  PlusCircleIcon,
  PrinterIcon,
  StarIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import {
  Button,
  Card,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import React, { useState } from "react";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";

import Table from "../../components/Table";
import { sportsEventData } from "../../data/MOCK_DATA";
import SportsEventDialog from "./SportsEventDialog";
import { useNavigate } from "react-router-dom";

const columnHelper = createColumnHelper();


const SportsEvents = () => {
  const [data, setUserList] = useState(sportsEventData);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()

  const columns = [
    columnHelper.accessor("sportEventName", {
      cell: (info) => info.getValue(),
      header: () => <span>Sport Event</span>,
    }),
  
    columnHelper.accessor("facilatator", {
      cell: (info) => info.getValue(),
      header: () => <span>Descripition</span>,
    }),
    columnHelper.accessor("venue", {
      cell: (info) => info.getValue(),
      header: () => <span>Game</span>,
    }),
    columnHelper.accessor("action", {
      cell: (info) => (
        <div className="flex gap-4">
          <IconButton
            className="flex items-center justify-center gap-5 "
            variant="text"
            // onClick={(e) => {
            //   setUserInfo(info.row.original);
            //   setDialogTitle("Upate User");
            //   hanldeOpenDialog();
            // }}
          >
            <CodeBracketIcon className="h-5 w-5" />
          </IconButton>
          <IconButton
            className="flex items-center justify-center gap-5 "
            variant="text"
            // onClick={(e) => {
            //   setUserInfo(info.row.original);
            //   setDialogTitle("Upate User");
            //   hanldeOpenDialog();
            // }}
          >
            <ChartBarIcon className="h-5 w-5" />
          </IconButton>
          <IconButton
            className="flex items-center justify-center gap-5 "
            variant="text"
            onClick={(e) => {
              navigate("/sportevents/1/participants")
            }}
          >
            <UserGroupIcon className="h-5 w-5" />
          </IconButton>
          <IconButton
            className="flex items-center justify-center gap-5 "
            variant="text"
            // onClick={(e) => {
            //   setUserInfo(info.row.original);
            //   setDialogTitle("Upate User");
            //   hanldeOpenDialog();
            // }}
          >
            <StarIcon className="h-5 w-5" />
          </IconButton>
        </div>
      ),
      header: () => <span>Actions</span>,
    }),
  ];
  

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
  });

  const handleOpen = () => setOpen(!open);

  return (
    <div>
      <Card className="mb-5 p-5">
        <div className="flex items-center justify-between ">
          <Typography variant="h4" className="">
            List of Sports Event
          </Typography>
          <div className="flex items-center justify-center gap-5">
            <Button className="flex items-center justify-center gap-5 bg-[#244860]">
              <PrinterIcon className="h-5 w-5" />
              Print List
            </Button>
            <Button
              className="flex items-center justify-center gap-5 bg-[#244860]"
              onClick={handleOpen}
            >
              <PlusCircleIcon className="h-5 w-5" />
              New Event
            </Button>
          </div>
        </div>
      </Card>

      <Table table={table} data={data} />

      <SportsEventDialog open={open} handleOpen={handleOpen} />
    </div>
  );
};

export default SportsEvents;
