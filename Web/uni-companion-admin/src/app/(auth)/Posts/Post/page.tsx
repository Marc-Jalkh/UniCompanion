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

const PostPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [image, setImage] = React.useState("");
  const theme = useTheme();
  
  return (
    <div>
      <BaseLayout
        title={"Post ID: " + id}
        actionButtons={
          <>
            <Button key="create-post" variant="outlined">
              Save
            </Button>
            <Button key="create-post" variant="outlined">
              Delete
            </Button>
          </>
        }
        api="https://jsonplaceholder.typicode.com/posts"
        mapper={(jsonData: any) => {
          setTitle(jsonData[0].title);
          const data: PostImpl = new PostImpl(
            jsonData[0].id,
            jsonData[0].title,
            jsonData[0].body,
            jsonData[0].date,
            jsonData[0].image
          );
          return data;
        }}
        data={null}
        body={(props) => {
          console.log(props);

          return (
            <div>
              <FormControl variant="standard">
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
              <FormControl variant="standard">
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
                />
              </FormControl>
              <FormControl variant="standard">
        <CustomButton
          variant="contained"
          size="large"
          onClick={() => handleSubmit()}
        >
            </div>
          );
        }}
      />
    </div>
  );
};

export default PostPage;
