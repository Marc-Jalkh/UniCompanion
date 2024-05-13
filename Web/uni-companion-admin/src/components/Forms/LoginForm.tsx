import * as React from "react";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import { CustomButton } from "../../styles/customMUI/Button";
import { CustomInput } from "../../styles/customMUI/Input";
import InputLabel from "@mui/material/InputLabel";
import { useRouter } from "next/navigation";
import cookies from "js-cookie";
import { useTheme } from "@mui/material/styles";

const LoginForm = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const Router = useRouter();
  const theme = useTheme();
  const handleSubmit = async () => {
    // Here you can perform login logic, like sending the data to a backend API
    // For simplicity, let's just do basic validation
    if (!email || !password) {
      setError("Please fill in all fields");
    } else {
      // Perform login
      const token = await fetch("http://localhost:3000/login/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: email, password }),
      });

      if (token.ok) {
        const json = await token.json();
        cookies.set("sessionToken", json.token, { expires: 1 });
        Router.push("/Dashboard");
        console.log("Logged in with:", { email, password });
      }

    }
  };

  return (
    <Container
      sx={{
        display: "grid",
        gridTemplateColumns: { sm: "1fr" },
        gap: 2,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.palette.background.paper,
        padding: 10,
        borderRadius: 5
      }}
      maxWidth="sm"
    >
      <h1>Login</h1>
      <FormControl variant="standard">
        <InputLabel style={{ color: theme.palette.primary.main }} shrink>Email:</InputLabel>
        <CustomInput
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
      </FormControl>
      <FormControl variant="standard">
        <InputLabel style={{ color: theme.palette.primary.main }} shrink>
          Password:
        </InputLabel>
        <CustomInput
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
      </FormControl>
      <FormControl variant="standard">
        <CustomButton
          variant="contained"
          size="large"
          onClick={() => handleSubmit()}
        >
          Login
        </CustomButton>
      </FormControl>
    </Container>
  );
};

export default LoginForm;
