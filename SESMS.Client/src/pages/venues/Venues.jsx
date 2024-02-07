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
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Input,
  Option,
  Select,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useMemo, useState } from "react";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";

import Table from "../../components/Table";
import { venuesData } from "../../data/MOCK_DATA";
import VenueDialog from "./VenueDialog";
import axios from "axios";
import { defaultUrl } from "../../utils/defaultUrl";
import ConfimationDialog from "../../components/ConfimationDialog";

const columnHelper = createColumnHelper();

const Venues = () => {
  const [venueList, setVenueList] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [venueInfo, setVenueInfo] = useState([]);
  const [dialogTitle, setDialogTitle] = useState("");
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [dialogInfo, setDialogInfo] = useState({
    confirmationTitle: "",
    confirmationBody: "",
  });
  const [selectedId, setSelectedId] = useState([]);

  useEffect(() => {
    fetchVenueList();
  }, []);

  const fetchVenueList = async () => {
    setLoading(true);
    const res = await axios.get(`${defaultUrl}venues`);
    setVenueList(res.data.data);

    setLoading(false);
  };

  // Rest of your component...

  const columns = [
    columnHelper.accessor("venueName", {
      cell: (info) => info.getValue(),
      header: () => <span>Venue</span>,
    }),

    columnHelper.accessor("venueLocation", {
      cell: (info) => info.getValue(),
      header: () => <span>Location</span>,
    }),
    columnHelper.accessor("action", {
      cell: (info) => (
        <div className="flex gap-4">
          <IconButton
            className="flex items-center justify-center gap-5 bg-[#313131]"
            onClick={(e) => {
              setVenueInfo(info.row.original);

              setDialogTitle("Upate Venue");
              hanldeOpenDialog();
            }}
          >
            <PencilSquareIcon className="h-5 w-5" />
          </IconButton>
          <IconButton
            className="flex items-center justify-center gap-5 bg-red-500"
            onClick={(e) => {
              handleDelete(info.row.original.venueId);
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
    data: venueList,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
  });

  const hanldeOpenDialog = () => {
    setOpenDialog(!openDialog);
  };

  const handleCloseDialog = () => {
    setOpenConfirmationDialog(false); // Close dialog without taking any action
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
      await axios.delete(`${defaultUrl}venues/${selectedId.venueId}`);
      fetchVenueList();
      setOpenConfirmationDialog(false); // Close dialog after action completion
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Card className="mb-5 p-5">
        <div className="flex items-center justify-between ">
          <Typography variant="h4" className="">
            List of Venues
          </Typography>
          <div className="flex items-center justify-center gap-5">
            <Button className="flex items-center justify-center gap-5 bg-[#244860]">
              <PrinterIcon className="h-5 w-5" />
              Print List
            </Button>
            <Button
              className="flex items-center justify-center gap-5 bg-[#244860]"
              onClick={() => {
                hanldeOpenDialog();
                setDialogTitle("New Venue");
              }}
            >
              <PlusCircleIcon className="h-5 w-5" />
              New Venue
            </Button>
          </div>
        </div>
      </Card>
      {Loading ? (
        <Spinner className="mx-auto my-auto h-16 w-16 text-gray-900/50" />
      ) : (
        <>{venueList && <Table table={table} data={venueList} />}</>
      )}

      <VenueDialog
        open={openDialog}
        hanldeOpenDialog={hanldeOpenDialog}
        dialogTitle={dialogTitle}
        venueInfo={venueInfo}
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

export default Venues;
