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
import { userData } from "../../data/USER_MOCK_DATA";
import Table from "../../components/Table";
import TeamDialog from "./UserDialog";
import { teamsData } from "../../data/MOCK_DATA";

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("teamName", {
    cell: (info) => info.getValue(),
    header: () => <span>Team Name</span>,
  }),

  columnHelper.accessor("sportsEvent", {
    cell: (info) => info.getValue(),
    header: () => <span>Sports Event</span>,
  }),
  columnHelper.accessor("manager", {
    cell: (info) => info.getValue(),
    header: () => <span>Manager</span>,
  }),
  columnHelper.accessor("college", {
    cell: (info) => info.getValue(),
    header: () => <span>College</span>,
  }),
  columnHelper.accessor("teamColor", {
    cell: (info) => info.getValue(),
    header: () => <span>Team Color</span>,
  }),
];

const Users = () => {
  const [data, setUserList] = useState(teamsData);
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
            List of Teams
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
              New Team
            </Button>
          </div>
        </div>
      </Card>

      <Table table={table} data={data} />

      <TeamDialog open={open} handleOpen={handleOpen} />
    </div>
  );
};

export default Users;
