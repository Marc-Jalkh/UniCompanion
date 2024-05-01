import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

export const CustomButton = styled(Button)(({ theme }) => ({
  "&.MuiButtonBase-root": {
    boxShadow: "none",
    textTransform: "none",
    fontSize: 16,
    padding: "6px 12px",
    border: "1px solid",
    lineHeight: 1.5,
    backgroundColor: theme.palette.primary,
    borderColor: theme.palette.primary,
    color: theme.palette.primary.contrastText,
  },
  "&:hover": {
    backgroundColor: theme.palette.secondary.main,
    borderColor: theme.palette.secondary.main,
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
  },
  "&:focus": {
    boxShadow: "0 0 0 0.2rem 'rgb(51, 71, 176)",
  },
}));
