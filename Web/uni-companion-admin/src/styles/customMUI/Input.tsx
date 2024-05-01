
import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";

export const CustomInput = styled(InputBase)(({ theme }) => ({
    "label + &": {
      marginTop: theme.spacing(3),
      color: theme.palette.primary,
    },
    "& .MuiInputBase-input": {
      borderRadius: 4,
      position: "relative",
      backgroundColor:  theme.palette.background.default,
      color: theme.palette.primary,
      fontSize: 16,
      width: "100%",
      padding: "10px 12px",
      transition: theme.transitions.create([
        "border-color",
        "background-color",
        "box-shadow",
      ]),
      "& input": {
        color: theme.palette.primary,
      },
      "&:focus": {
        border: "1px solid",
        borderColor: theme.palette.primary.main,
      },
    },
  }));