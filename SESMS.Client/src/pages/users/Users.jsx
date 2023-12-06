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
  Spinner,
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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ConfimationDialog from "../../components/ConfimationDialog";

const columnHelper = createColumnHelper();

const Users = () => {
  const [data, setUserList] = useState([]);
  const [selectedId, setSelectedId] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogInfo, setDialogInfo] = useState({
    confirmationTitle: "",
    confirmationBody: "",
  });

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
              setUserInfo(info.row.original);
              setDialogTitle("Upate User");
              hanldeOpenDialog();
            }}
          >
            <PencilSquareIcon className="h-5 w-5" />
          </IconButton>
          <IconButton
            className="flex items-center justify-center gap-5 bg-red-500"
            onClick={(e) => {
              handleDelete(info.row.original._id);
              setSelectedId(info.row.original);
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

  const { status, error, isFetching } = useQuery({
    queryKey: ["getUsers"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:3000/users");

      setUserList(data);
      return data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () =>
      axios.delete(`http://localhost:3000/users/${selectedId._id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["getUsers"] }),
  });

  const hanldeOpenDialog = () => {
    setOpenDialog(!openDialog);
  };

  const handleDelete = async (id) => {
    setOpenConfirmationDialog(true);
    setDialogInfo({
      confirmationTitle: "Delete",
      confirmationBody: `Do you want to delete ${id} ?`,
    });
    // Other necessary operations when opening the dialog
  };

  const handleConfirmAction = async () => {
    try {
      // await axios.delete(`http://localhost:3000/users/${selectedId._id}`);
      deleteMutation.mutate();
      setOpenConfirmationDialog(false); // Close dialog after action completion
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseDialog = () => {
    setOpenConfirmationDialog(false); // Close dialog without taking any action
  };

  if (status === "pending") return <h1>Loading...</h1>;
  if (status === "error") return <span>Error: {error.message}</span>;

  return (
    <div>
      <Card className="mb-5  p-5">
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
              onClick={() => {
                setUserInfo([]);
                hanldeOpenDialog();
                setDialogTitle("New user");
              }}
            >
              <PlusCircleIcon className="h-5 w-5" />
              New User
            </Button>
          </div>
        </div>
      </Card>

      {isFetching ? (
        <Spinner className="mx-auto my-auto h-16 w-16 text-gray-900/50" />
      ) : (
        <Table table={table} data={data} />
      )}

      <UserDialog
        open={openDialog}
        hanldeOpenDialog={hanldeOpenDialog}
        dialogTitle={dialogTitle}
        userInfo={userInfo}
      />
      <ConfimationDialog
        openConfirmationDialog={openConfirmationDialog}
        handleOpenConfirmationDialog={setOpenConfirmationDialog}
        confirmationTitle={dialogInfo.confirmationTitle}
        confirmationBody={dialogInfo.confirmationBody}
        handleConfirmAction={handleConfirmAction}
        handleCloseDialog={handleCloseDialog}
      />
    </div>
  );
};

export default Users;
