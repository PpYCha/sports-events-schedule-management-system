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
import { userData } from "../data/USER_MOCK_DATA";

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

const Facilitators = () => {
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
            List of Facilitators
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
              New Facilatator
            </Button>
          </div>
        </div>
      </Card>
      <Card className="p-5">
        {/* <Input label="Search" icon={<MagnifyingGlassIcon />} /> */}

        <div className="relative flex w-full max-w-[24rem]">
          <Input
            type="text"
            label="Search"
            // value={email}
            // onChange={onChange}
            className="pr-20"
            containerProps={{
              className: "min-w-0",
            }}
          />

          <IconButton className="!absolute right-1 top-1 h-8 rounded">
            <MagnifyingGlassIcon className="h-5 w-5" />
          </IconButton>
        </div>
        <table className="mt-5 w-full min-w-max table-auto text-left">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => {
              // console.log(headerGroup);
              return (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    // console.log("header", header);
                    return (
                      <th
                        key={header.id}
                        className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </th>
                    );
                  })}
                </tr>
              );
            })}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, index) => {
              const isLast = index === data.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";
              // console.log(row);
              return (
                <tr key={row.id} className="">
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id} className={classes}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex items-center justify-center gap-2 p-5">
          <button
            className="rounded border p-1"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronDoubleLeftIcon width={24} />
          </button>
          <button
            className="rounded border p-1"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeftIcon width={24} />
          </button>
          <button
            className="rounded border p-1"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRightIcon width={24} />
          </button>
          <button
            className="rounded border p-1"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <ChevronDoubleRightIcon width={24} />
          </button>
          <span className="flex items-center gap-1">
            <div>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </strong>
          </span>

          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </Card>

      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>New Facilatator</DialogHeader>
        <DialogBody divider>
          <div className="flex flex-col gap-5">
            <Input label="Firstname" />
            <Input label="Lastname" />

            <Select label="Select Facilatator Role">
              <Option>--</Option>
              <Option>Referee</Option>
              <Option>Announcer</Option>
            </Select>

            <Select label="Sports Event">
              <Option>--</Option>
              <Option>Chess</Option>
              <Option>Basketball</Option>
              <Option>Table Tennis</Option>
              <Option>Badminton</Option>
              <Option>Running</Option>
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
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Save</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default Facilitators;