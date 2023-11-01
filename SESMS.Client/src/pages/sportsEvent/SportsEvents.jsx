import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
  PrinterIcon,
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

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("sportEventName", {
    cell: (info) => info.getValue(),
    header: () => <span>Sport Event Name</span>,
  }),

  columnHelper.accessor("facilatator", {
    cell: (info) => info.getValue(),
    header: () => <span>Facilatator</span>,
  }),
  columnHelper.accessor("venue", {
    cell: (info) => info.getValue(),
    header: () => <span>Venue</span>,
  }),
  columnHelper.accessor("numberOfParticipants", {
    cell: (info) => info.getValue(),
    header: () => <span>Number Of Participants</span>,
  }),
];

const SportsEvents = () => {
  const [data, setUserList] = useState(sportsEventData);
  const [open, setOpen] = useState(false);

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
              New Venue
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
