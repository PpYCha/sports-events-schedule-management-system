import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  List,
  ListItem,
} from "@material-tailwind/react";
import {
  UsersIcon,
  UserGroupIcon,
  BuildingOffice2Icon,
  FlagIcon,
} from "@heroicons/react/24/solid";
import { eventData } from "../data/EVENT_MOCK_DATA";
import { teamData } from "../data/TEAM_MOCK_DATA";

const cardList = [
  {
    count: 358,
    title: "Players",
    icon: UserGroupIcon,
  },
  {
    count: 12,
    title: "Teams",
    icon: FlagIcon,
  },
  {
    count: 50,
    title: "Events",
    icon: BuildingOffice2Icon,
  },
  {
    count: 68,
    title: "Facilatator",
    icon: UsersIcon,
  },
];

const TABLE_HEAD = ["Event", "Date", "Time", "Venue"];

const TABLE_ROWS = [
  {
    name: "John Michael",
    job: "Manager",
    date: "23/04/18",
  },
  {
    name: "Alexa Liras",
    job: "Developer",
    date: "23/04/18",
  },
  {
    name: "Laurent Perrier",
    job: "Executive",
    date: "19/09/17",
  },
  {
    name: "Michael Levi",
    job: "Developer",
    date: "24/12/08",
  },
  {
    name: "Richard Gran",
    job: "Manager",
    date: "04/10/21",
  },
];

const Dashboard = () => {
  const [eventList, setEventList] = useState(eventData);
  const [teamList, setTeamList] = useState(teamData);
  return (
    <div>
      <div className="mb-5 flex items-center justify-center gap-5">
        {cardList.map((item, index) => {
          const Icon = item.icon;
          return (
            <Card key={index} className="flex-1 bg-[#294350] text-[#f3fbff]">
              <CardBody className="flex flex-col items-center justify-center gap-5">
                <Typography variant="h2" className="">
                  {item.count}
                </Typography>
                <Typography variant="h4">{item.title}</Typography>

                <Icon className="h-10 w-10 rounded-full border-2 border-white" />
              </CardBody>
            </Card>
          );
        })}
      </div>
      <div className="grid grid-cols-5 gap-5">
        <div className="col-span-3">
          <Card className="">
            <CardBody>
              <Typography variant="h4" className="mb-5">
                Upcoming Events
              </Typography>
              <div className="max-h-[500px] w-full overflow-scroll rounded-xl">
                <table className="w-full min-w-max table-auto text-left">
                  <thead>
                    <tr>
                      {TABLE_HEAD.map((head) => (
                        <th
                          key={head}
                          className="sticky top-0 z-[1] border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                        >
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal leading-none opacity-70"
                          >
                            {head}
                          </Typography>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {eventList.map((item) => (
                      <tr
                        key={item.eventId}
                        className="even:bg-blue-gray-50/50"
                      >
                        <td className=" p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className=" w-[300px] font-normal"
                          >
                            {item.event_name}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {item.event_date}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {item.time}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {item.venueId}
                          </Typography>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>
        </div>

        <div className="col-span-2">
          <Card className="">
            <CardBody>
              <Typography variant="h4" className="mb-5">
                Participating Teams
              </Typography>
              <List className="max-h-[500px] overflow-scroll">
                {teamList.map((item, index) => {
                  return (
                    <ListItem key={index}>
                      {index + 1}.{item.team_name}
                    </ListItem>
                  );
                })}
              </List>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
