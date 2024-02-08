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
  Tooltip,
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
import { defaultUrl } from "../../utils/defaultUrl";

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
  const [globalFilter, setGlobalFilter] = useState("");

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
          <div className=" w-[100px] text-center">
            {status === "1" ? (
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
          <Tooltip content="Edit">
            <IconButton
              className="flex items-center justify-center gap-5 "
              variant="text"
              color="gray"
              onClick={(e) => {
                setUserInfo(info.row.original);
                setDialogTitle("Upate User");
                hanldeOpenDialog();
              }}
            >
              <PencilSquareIcon className="h-5 w-5" />
            </IconButton>
          </Tooltip>
          <Tooltip content="Delete">
            <IconButton
              className="flex items-center justify-center gap-5 "
              variant="text"
              onClick={(e) => {
                handleDelete(info.row.original.userId);
                setSelectedId(info.row.original);
              }}
            >
              <TrashIcon className="h-5 w-5" color="red" />
            </IconButton>
          </Tooltip>
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
    // debugTable: true,
  });

  const { status, error, isFetching } = useQuery({
    queryKey: ["getUsers"],
    queryFn: async () => {
      const { data } = await axios.get(`${defaultUrl}users`);

      setUserList(data.data);
      return data.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => axios.delete(`${defaultUrl}users/${selectedId.userId}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["getUsers"] }),
  });

  useEffect(() => {
    const filteredUsers = data.filter((user) => {
      const filter = globalFilter.toLowerCase();
      const firstNameMatch = user.firstName.toLowerCase().includes(filter);
      const lastNameMatch = user.lastName.toLowerCase().includes(filter);
      const emailMatch = user.email.toLowerCase().includes(filter);
      const isActiveMatch = user.isActive
        ? String(user.isActive).toLowerCase().includes(filter)
        : false;

      return firstNameMatch || lastNameMatch || isActiveMatch || emailMatch;
    });

    setUserList(filteredUsers);
  }, [globalFilter]);

  const hanldeOpenDialog = () => {
    setOpenDialog(!openDialog);
  };

  const handleDelete = async (id) => {
    setOpenConfirmationDialog(true);
    setDialogInfo({
      confirmationTitle: "Delete",
      confirmationBody: `Do you want to delete ${id} ?`,
    });
  };

  const handleConfirmAction = async () => {
    try {
      // await axios.delete(`http://localhost:3000/users/${selectedId.userId}`);
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
        <Table
          table={table}
          data={data}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
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
