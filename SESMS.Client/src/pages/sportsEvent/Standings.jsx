import {
  ChartBarIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CodeBracketIcon,
  CodeBracketSquareIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  PlusCircleIcon,
  PrinterIcon,
  StarIcon,
  TrashIcon,
  UserGroupIcon,
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
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";

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
import { useNavigate } from "react-router-dom";
import ConfimationDialog from "../../components/ConfimationDialog";
import axios from "axios";
import { defaultUrl } from "../../utils/defaultUrl";
import refreshStore from "../../context/refreshStore";

const columnHelper = createColumnHelper();

const Standings = () => {
  const navigate = useNavigate();
  const [sportEventList, setSportEventList] = useState([]);
  const [sportEventInfo, setsportEventInfo] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [dialogInfo, setDialogInfo] = useState({
    confirmationTitle: "",
    confirmationBody: "",
  });
  const [selectedId, setSelectedId] = useState([]);

  const { loadingSportEvent, refreshSportEvents } = refreshStore();

  useEffect(() => {
    fetchSportEventList();
  }, []);

  useEffect(() => {
    if (loadingSportEvent) {
      fetchSportEventList();
      refreshSportEvents();
    }
  }, [loadingSportEvent]);

  const fetchSportEventList = async () => {
    setLoading(true);
    const res = await axios.get(`${defaultUrl}sport-events`);
    console.log(res);
    setSportEventList(res.data.data);

    setLoading(false);
  };

  const columns = [
    columnHelper.accessor("sportEvent", {
      cell: (info) => info.getValue(),
      header: () => <span>Rank</span>,
    }),

    columnHelper.accessor("description", {
      cell: (info) => info.getValue(),
      header: () => <span>Participant Name</span>,
    }),
    columnHelper.accessor("sport", {
      cell: (info) => info.getValue(),
      header: () => <span>Match History</span>,
    }),
  ];

  const table = useReactTable({
    data: sportEventList,
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
      await axios.delete(
        `${defaultUrl}sport-events/${selectedId.sportEventId}`,
      );
      fetchSportEventList();
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
            Standings
          </Typography>
        </div>
      </Card>

      {loading ? (
        <Spinner className="mx-auto my-auto h-16 w-16 text-gray-900/50" />
      ) : (
        <>{sportEventList && <Table table={table} data={sportEventList} />}</>
      )}

      <SportsEventDialog
        open={openDialog}
        hanldeOpenDialog={hanldeOpenDialog}
        dialogTitle={dialogTitle}
        sportEventInfo={sportEventInfo}
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

export default Standings;
