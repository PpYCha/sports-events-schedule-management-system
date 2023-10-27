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
import PlayerDialog from "./PlayerDialog";

const columnHelper = createColumnHelper();

const columns = [
  // columnHelper.accessor((row) => row.lastName, {
  //   id: "lastName",
  //   cell: (info) => <i>{info.getValue()}</i>,
  //   header: () => <span>Last Name</span>,
  //   // footer: (info) => info.column.id,
  // }),

  columnHelper.accessor("last_name", {
    cell: (info) => info.getValue(),
    header: () => <span>Last Name</span>,
    // footer: (info) => info.column.id,
  }),

  columnHelper.accessor("first_name", {
    cell: (info) => info.getValue(),
    header: () => <span>First Name</span>,
  }),
  columnHelper.accessor("username", {
    cell: (info) => info.getValue(),
    header: () => <span>Username</span>,
  }),
];

const Players = () => {
  const [data, setUserList] = useState(userData);
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
            List of Players
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
              New Player
            </Button>
          </div>
        </div>
      </Card>

      <Table table={table} data={data} />

      <PlayerDialog open={open} handleOpen={handleOpen} />
    </div>
  );
};

export default Players;
