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
import { useNavigate, useParams } from "react-router-dom";
import refreshStore from "../../context/refreshStore";
import { defaultUrl } from "../../utils/defaultUrl";
import axios from "axios";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";
import Table from "../../components/Table";
import ConfimationDialog from "../../components/ConfimationDialog";

const columnHelper = createColumnHelper();

export const ParticipantsForm = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [payload, setPayload] = useState({
    sportEventId: eventId,
    team: "",
    seed: "",
  });
  const [teamList, setTeamList] = useState([]);

  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [dialogInfo, setDialogInfo] = useState({
    confirmationTitle: "",
    confirmationBody: "",
  });
  const [selectedId, setSelectedId] = useState([]);

  const { loadingTeam, refreshTeam } = refreshStore();

  useEffect(() => {
    fetchTeamList();
  }, []);

  useEffect(() => {
    if (loadingTeam) {
      fetchTeamList();
      refreshTeam();
    }
  }, [loadingTeam]);

  const fetchTeamList = async () => {
    setLoading(true);
    const res = await axios.get(`${defaultUrl}participants`);

    const filteredTeamList = res.data.data
      .filter((seId) => seId.sportEventId == eventId)
      .sort((a, b) => a.seed - b.seed);

    const indexedTeamList = filteredTeamList.map((item, index) => ({
      ...item,
      seed: index + 1, // Adding 1 to make the index 1-based
    }));

    const seedCount = indexedTeamList.length + 1;
    setPayload({ ...payload, seed: seedCount });
    setTeamList(filteredTeamList);

    setLoading(false);
  };

  const columns = [
    columnHelper.accessor("seed", {
      cell: (info) => info.getValue(),
      header: () => <span>Seed</span>,
    }),
    columnHelper.accessor("team", {
      cell: (info) => info.getValue(),
      header: () => <span>Team</span>,
    }),

    columnHelper.accessor("action", {
      cell: (info) => (
        <div className="flex gap-4">
          <Tooltip content="Delete">
            <IconButton
              className="flex items-center justify-center gap-5 "
              variant="text"
              onClick={(e) => {
                handleDelete(info.row.original.participantId);
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
    data: teamList,
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
        `${defaultUrl}participants/${selectedId.participantId}`,
      );

      const newArray = teamList.filter(
        (item) => item.participantId !== selectedId.participantId,
      );

      const indexedTeamList = newArray.map((item, index) => ({
        ...item,
        seed: index + 1, // Adding 1 to make the index 1-based
      }));

      await Promise.all(
        indexedTeamList.map(async (item, index) => {
          await axios.put(
            `${defaultUrl}participants/${item.participantId}`,
            item,
          );
        }),
      );
      fetchTeamList();
      setOpenConfirmationDialog(false); // Close dialog after action completion
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    try {
      // await Promise.all(
      //   teamList.map(async (item, index) => {
      //     await axios.put(
      //       `${defaultUrl}participants/${item.participantId}`,
      //       item,
      //     );
      //   }),
      // );
      await axios.post(`${defaultUrl}participants`, payload);

      fetchTeamList();
    } catch (error) {
      console.error(error);
    }
  };

  const handleShuffle = async () => {
    const shuffledSeeds = shuffleSeedValues();
    console.log(shuffledSeeds);
    await Promise.all(
      shuffledSeeds.map(async (item, index) => {
        await axios.put(
          `${defaultUrl}participants/${item.participantId}`,
          item,
        );
      }),
    );
    fetchTeamList();
  };

  const shuffleSeedValues = () => {
    const newArray = teamList;

    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i].seed, newArray[j].seed] = [
        newArray[j].seed,
        newArray[i].seed,
      ];
    }

    // Now newArray contains the shuffled seed values
    return newArray;
    // You can update your state or perform any other action with the shuffled array
  };

  return (
    <div>
      <Card className="mb-5 p-5">
        <div className="mb-5 flex items-center justify-between">
          <Typography variant="h4" className="">
            List of Participants
          </Typography>
        </div>
        <div className="grid grid-cols-4 gap-5">
          <div className="col-span-3">
            <Select
              label="Team"
              onChange={(e) => setPayload({ ...payload, team: e })}
            >
              <Option value="--">--</Option>
              <Option value="Team 1">Team 1</Option>
              <Option value="Team 2">Team 2</Option>
              <Option value="Team 3">Team 3</Option>
              <Option value="Team 4">Team 4</Option>
              <Option value="Team 5">Team 5</Option>
              <Option value="Team 6">Team 6</Option>
            </Select>
          </div>
          <div className="flex items-center justify-center gap-5">
            <Button
              className="flex items-center justify-center gap-5 bg-[#244860]"
              onClick={handleSubmit}
            >
              <PlusCircleIcon className="h-5 w-5" />
              Add
            </Button>
            <Button
              className="flex items-center justify-center gap-5 bg-[#244860]"
              onClick={handleShuffle}
            >
              <PlusCircleIcon className="h-5 w-5" />
              Shuffle Seeds
            </Button>
          </div>
        </div>
      </Card>

      {loading ? (
        <Spinner className="mx-auto my-auto h-16 w-16 text-gray-900/50" />
      ) : (
        <>{teamList && <Table table={table} data={teamList} />}</>
      )}

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
