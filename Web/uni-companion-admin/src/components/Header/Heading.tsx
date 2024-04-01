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
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";

type Anchor = "top" | "left" | "bottom" | "right";

export default function Heading() {
  const [state, setState] = React.useState(false);

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
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
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
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        {list()}
      </SwipeableDrawer>
      <Button
        style={{
          backgroundColor: "white",
          zIndex: 1000,
          borderRadius: '100%',
          height: '60px',
          margin: 20
        }}
        onClick={() => setState(!state)}
      >
        <MenuIcon sx={{fontSize: '35px'}} />
      </Button>
    </div>
  );
}
