"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import styles from "../../styles/page.module.css";
import { useRouter } from "next/navigation";
import EditNoteIcon from "@mui/icons-material/EditNote";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";

export default function Heading() {
  const [state, setState] = React.useState(false);
  const Router = useRouter();
  const routes = React.useRef([
    { name: "Dashboard", route: "/Dashboard", icon: <HomeIcon /> },
    { name: "Posts", route: "/Posts", icon: <EditNoteIcon /> },
    { name: "Users", route: "/Users", icon: <AccountBoxIcon /> },
    { name: "Logout", route: "/logout", icon: <LogoutIcon /> },
  ]);
  const list = () => (
    <Box
      sx={{
        width: 250,
      }}
      role="presentation"
      onClick={() => setState(!state)}
      onKeyDown={() => setState(!state)}
    >
      <List>
        {routes.current.map((item) => (
          <ListItem
            onClick={() => {
              Router.push(item.route);
            }}
            key={item.name}
            disablePadding
          >
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );
  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }));
  return (
    <div style={{ position: "absolute" }}>
      <SwipeableDrawer
        anchor={"left"}
        open={state}
        onClose={() => setState(false)}
        onOpen={() => setState(true)}
      >
        <DrawerHeader>
          <IconButton onClick={() => setState(false)}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKgZOmUt2SDfje1IfJOgkpPPz078ASvhZy02XZGEu5HcMpuvVLWxjY9I0a0KBY3BM6coA&usqp=CAU"
              alt="logo"
              style={{ width: "100px", height: "100px" , marginRight: "50px"}}
            />
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        {list()}
      </SwipeableDrawer>
      <Button
        style={{
          backgroundColor: "white",
        }}
        className={styles.menuButton}
        onClick={() => setState(!state)}
      >
        <MenuIcon sx={{ fontSize: "35px" }} />
      </Button>
    </div>
  );
}
