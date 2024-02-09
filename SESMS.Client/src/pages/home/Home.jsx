import React, { useEffect, useState } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { bracketData } from "../../data/BRACKET_MOCK_DATA.jS";

export function Home() {
  const navigate = useNavigate();
  const [openNav, setOpenNav] = React.useState(false);
  const [bracketList, setBracketList] = useState(bracketData);

  function NavList() {
    return (
      <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-medium"
        >
          <a
            href="#"
            className="flex items-center transition-colors hover:text-blue-500"
          >
            Schedules
          </a>
        </Typography>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-medium"
        >
          <a
            href="#"
            className="flex items-center transition-colors hover:text-blue-500 "
          >
            Accouncements
          </a>
        </Typography>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="flex items-center p-1 font-medium transition-colors hover:text-blue-500"
          onClick={(e) => navigate("login")}
        >
          Login
        </Typography>
      </ul>
    );
  }

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  async function render() {
    // const data = await fetch(URL).then((res) => res.json());

    window.bracketsViewer.render({
      stages: bracketList.stage,
      matches: bracketList.match,
      matchGames: bracketList.match_game,
      participants: bracketList.participant,
    });
  }

  useEffect(() => {
    render();
  }, []);

  return (
    <>
      <Navbar className="mx-auto max-w-screen-xl px-6 py-3">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography
            as="a"
            href="/"
            variant="h6"
            className="mr-4 cursor-pointer py-1.5"
          >
            SPORTS EVENTS SCHEDULE MANAGEMENT SYSTEM
          </Typography>
          <div className="hidden lg:block">
            <NavList />
          </div>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <XMarkIcon className="h-6 w-6" strokeWidth={2} />
            ) : (
              <Bars3Icon className="h-6 w-6" strokeWidth={2} />
            )}
          </IconButton>
        </div>
        <Collapse open={openNav}>
          <NavList />
        </Collapse>
      </Navbar>
      <div className="mx-auto max-w-screen-xl px-6 py-3">
        <Typography variant="h2">Upcoming Events</Typography>
        <div className="brackets-viewer"></div>
      </div>
    </>
  );
}
