"use client";
import { useSearchParams } from "next/navigation";
import * as React from "react";
import Button from "@mui/material/Button";
import BaseLayout from "@components/components/Layout/BaseLayout";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import { PostImpl, Post } from "../../../../models/Posts";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import { CustomButton } from "../../../../styles/customMUI/Button";
import { CustomInput } from "../../../../styles/customMUI/Input";
import InputLabel from "@mui/material/InputLabel";
import cookies from "js-cookie";
import Switch from "@mui/material/Switch";
import FormControlLabel from '@mui/material/FormControlLabel';

const PostPage = () => {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [image, setImage] = React.useState("");
  const theme = useTheme();
  const [isHighlited, setIsHighlited] = React.useState(true);
  const sessionToken = cookies.get("sessionToken"); // Get sessionToken from cookie
  const Router = useRouter();

  var updatePost = () => {
    try {
      fetch("http://localhost:3000/posts/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: sessionToken?.toString() ?? "",
        },
        body: JSON.stringify({
          title: title,
          content: content,
          image: image,
          date: new Date().toISOString(),
          isHighlited: isHighlited,
        }),
      }).then((response) => {
        console.log(response);
        if (response.ok) {
          alert("Post created successfully");
          Router.push("/Posts");
        } else {
          alert("Error");
        }
      });
    } catch {
      alert("Error");
    }
  };
  return (
    <div>
      <BaseLayout
        title={"Create Post: "}
        actionButtons={
          <>
            <Button key="create-post" variant="outlined" onClick={updatePost}>
              Create
            </Button>
          </>
        }
        api="https://jsonplaceholder.typicode.com/posts"
        mapper={(jsonData: any) => {}}
        data={null}
        body={(props) => {
          return (
            <div>
<FormControl variant="standard">
              <img src={image} alt="image" width={300} height={200} />

                <CustomInput
                  placeholder="Content"
                  type="text"
                  value={image}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setImage(e.target.value)
                  }
                />
              </FormControl>

              <br />
              <br />
              <FormControl variant="standard" style={{width: '100%'}}>
                <InputLabel
                  style={{ color: theme.palette.primary.main }}
                  shrink
                >
                  Title:
                </InputLabel>
                <CustomInput
                  placeholder="Title"
                  type="text"
                  value={title}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setTitle(e.target.value)
                  }
                />
              </FormControl>
              <br />
              <FormControl variant="standard" style={{width: '100%'}}>
                <InputLabel
                  style={{ color: theme.palette.primary.main }}
                  shrink
                >
                  Content:
                </InputLabel>
                <CustomInput
                  placeholder="Content"
                  type="text"
                  value={content}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setContent(e.target.value)
                  }
                  multiline
                  rows={4}
                />
              </FormControl>
              <br />
              <FormControl variant="standard">
                <FormControlLabel
                  value="is shown on Home Page"
                  control={
                    <Switch
                      checked={isHighlited}
                      onChange={() => setIsHighlited(!isHighlited)}
                      color="warning"
                    />
                  }
                  label="is shown on Home Page"

                />
              </FormControl>
            </div>
          );
        }}
      />
    </div>
  );
};

export default PostPage;
