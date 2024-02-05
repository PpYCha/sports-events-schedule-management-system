import React, { useEffect, useState } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  PowerIcon,
  UsersIcon,
  UserGroupIcon,
  BuildingOffice2Icon,
  CalendarIcon,
  Cog8ToothIcon,
  CubeTransparentIcon,
  FlagIcon,
} from "@heroicons/react/24/solid";
import avatarImage from "../assets/img/dp1.jpg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuthStore from "../context/authStore";
import { jwtDecode } from "jwt-decode";
import avatar_blank from "../assets/img/blank_avatar.png";

const Sidebar = () => {
  const navigate = useNavigate();
  const { logout, refresh, currentUser } = useAuthStore();
  // const [currentUser, setCurrentUser] = useState(null);

  const sideList = [
    {
      icon: PresentationChartBarIcon,
      text: "Dashboard",
      link: "dashboard",
    },
    {
      icon: UsersIcon,
      text: "Facilitators",
      link: "facilitators",
    },
    // {
    //   icon: UserGroupIcon,
    //   text: "Players",
    //   link: "players",
    // },
    // {
    //   icon: FlagIcon,
    //   text: "Teams",
    //   link: "teams",
    // },
    {
      icon: CubeTransparentIcon,
      text: "Sportevents",
      link: "sportevents",
    },
    {
      icon: BuildingOffice2Icon,
      text: "Venues",
      link: "venues",
    },
    {
      icon: CalendarIcon,
      text: "Schedules",
      link: "schedules",
    },
    {
      icon: UsersIcon,
      text: "Users",
      link: "users",
    },
    {
      icon: Cog8ToothIcon,
      text: "Settings",
      link: "settings",
    },
  ];

  useEffect(() => {
    refresh();
  }, []);
  return (
    <Card
      className="min-h-screen  w-full  max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5"
      style={{ height: "min-content" }}
    >
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          UEP Sports Events Schedule Management System
        </Typography>
      </div>
      <List>
        {sideList.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <Link to={item.link} key={index}>
              <ListItem>
                <ListItemPrefix>
                  <IconComponent className="h-5 w-5" />
                </ListItemPrefix>
                {item.text}
              </ListItem>
            </Link>
          );
        })}

        <ListItem
          className="text-red-500 hover:bg-[#feeceb] hover:text-red-500"
          onClick={(e) => {
            logout();
            navigate("/login");
          }}
        >
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
      <div className=" mt-auto flex items-center gap-4 rounded-lg bg-[#244860] p-4">
        <Avatar src={avatar_blank} alt="avatar" className="border-2 " />
        <div>
          <Typography variant="h6" className="text-[#f0f0f0]">
            {currentUser?.firstName + " " + currentUser?.lastName}
          </Typography>
          <Typography
            variant="small"
            color="gray"
            className="font-normal text-[#cccccc]"
          >
            {currentUser?.userRole}
          </Typography>
        </div>
      </div>
    </Card>
  );
};

export default Sidebar;
