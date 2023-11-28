import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  PlusCircleIcon,
  PrinterIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import {
  Button,
  Card,
  IconButton,
  Input,
  Typography,
} from "@material-tailwind/react";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { userData } from "../../data/USER_MOCK_DATA";
import FacilitatorsDialog from "./FacilitatorsDialog";

const columnHelper = createColumnHelper();

const Facilitators = () => {
  const [data, setUserList] = useState([]);
  const [open, setOpen] = useState(false);
  const [editFacilitator, setEditFacilitator] = useState();

  const columns = [
    // columnHelper.accessor((row) => row.lastName, {
    //   id: "lastName",
    //   cell: (info) => <i>{info.getValue()}</i>,
    //   header: () => <span>Last Name</span>,
    //   // footer: (info) => info.column.id,
    // }),

    columnHelper.accessor("firstName", {
      cell: (info) => info.getValue(),
      header: () => <span>First Name</span>,
    }),

    columnHelper.accessor("lastName", {
      cell: (info) => info.getValue(),
      header: () => <span>Last Name</span>,
      // footer: (info) => info.column.id,
    }),

    columnHelper.accessor("facilitatorRole", {
      cell: (info) => info.getValue(),
      header: () => <span>Facilatator Role</span>,
    }),
    columnHelper.accessor("sportsEvent", {
      cell: (info) => info.getValue(),
      header: () => <span>Sports Event</span>,
    }),
    columnHelper.accessor("action", {
      cell: (info) => (
        <div className="flex gap-4">
          <IconButton
            className="flex items-center justify-center gap-5 bg-[#313131]"
            onClick={(e) => {
              setEditFacilitator(info.row.original);
              handleOpen();
            }}
          >
            <PencilSquareIcon className="h-5 w-5" />
          </IconButton>
          <IconButton
            className="flex items-center justify-center gap-5 bg-red-500"
            onClick={(e) => {
              handleDelete(info.row.original._id);
            }}
          >
            <TrashIcon className="h-5 w-5" />
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
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/facilatators/${id}`);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/facilatators");

      setUserList(res.data); // Assuming setUserList updates the state correctly
    } catch (error) {
      console.error("Error fetching data:", error); // Log any errors
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
      <FacilitatorsDialog
        open={open}
        handleOpen={handleOpen}
        editFacilitator={editFacilitator}
      />
    </div>
  );
};

export default Facilitators;
