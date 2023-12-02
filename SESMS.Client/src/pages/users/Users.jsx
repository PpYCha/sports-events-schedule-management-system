import axios from "axios";
import {
  PencilSquareIcon,
  PlusCircleIcon,
  PrinterIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import {
  Button,
  Card,
  Chip,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";

import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";
import Table from "../../components/Table";
import UserDialog from "./UserDialog";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const columnHelper = createColumnHelper();

const Users = () => {
  const [data, setUserList] = useState([]);
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const columns = [
    columnHelper.accessor("firstName", {
      cell: (info) => info.getValue(),
      header: () => <span>First Name</span>,
    }),
    columnHelper.accessor("lastName", {
      cell: (info) => info.getValue(),
      header: () => <span>Last Name</span>,
    }),
    columnHelper.accessor("email", {
      cell: (info) => info.getValue(),
      header: () => <span>Email</span>,
    }),
    columnHelper.accessor("userRole", {
      cell: (info) => info.getValue(),
      header: () => <span>Role</span>,
    }),
    columnHelper.accessor("isActive", {
      cell: (info) => {
        const status = info.getValue();
        return (
          <div className=" w-[100px]">
            {status ? (
              <Chip size="sm" value="Active" color="green" />
            ) : (
              <Chip size="sm" value="Not Active" color="red" />
            )}
          </div>
        );
      },
      header: () => <span>Active</span>,
    }),
    columnHelper.accessor("action", {
      cell: (info) => (
        <div className="flex gap-4">
          <IconButton
            className="flex items-center justify-center gap-5 bg-[#313131]"
            onClick={(e) => {
              // setEditFacilitator(info.row.original);
              // setDialogTitle("Update Team");
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

  const usersFetch = useQuery({
    queryKey: ["getUsers"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:3000/users");

      console.log("fetching");
      setUserList(data);
      return data;
    },
  });

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/users/${id}`);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // usersFetch();
  }, []);

  return (
    <div>
      <Card className="mb-5 p-5">
        <div className="flex items-center justify-between ">
          <Typography variant="h4" className="">
            List of Users
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
              New User
            </Button>
          </div>
        </div>
      </Card>

      <Table table={table} data={data} />

      <UserDialog open={open} handleOpen={handleOpen} />
    </div>
  );
};

export default Users;
