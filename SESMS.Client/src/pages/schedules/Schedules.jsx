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
import { scheduleData } from "../../data/MOCK_DATA";
import VenueDialog from "./SchedulesDialog";

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("sportEventName", {
    cell: (info) => info.getValue(),
    header: () => <span>Sport Event Name</span>,
  }),

  columnHelper.accessor("venue", {
    cell: (info) => info.getValue(),
    header: () => <span>Venue</span>,
  }),
  columnHelper.accessor("startDate", {
    cell: (info) => info.getValue(),
    header: () => <span>Start Date</span>,
  }),
  // columnHelper.accessor("startTime", {
  //   cell: (info) => info.getValue(),
  //   header: () => <span>Start Time</span>,
  // }),
  columnHelper.accessor("endDate", {
    cell: (info) => info.getValue(),
    header: () => <span>End Date</span>,
  }),
  // columnHelper.accessor("endTime", {
  //   cell: (info) => info.getValue(),
  //   header: () => <span>End Time</span>,
  // }),
];

const Schedules = () => {
  const [data, setUserList] = useState(scheduleData);
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
            List of Schedules
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
              New Schedule
            </Button>
          </div>
        </div>
      </Card>

      <Table table={table} data={data} />

      <VenueDialog open={open} handleOpen={handleOpen} />
    </div>
  );
};

export default Schedules;
