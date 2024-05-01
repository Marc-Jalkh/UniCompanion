"use client";
import { useSearchParams } from "next/navigation";
import * as React from "react";
import Button from "@mui/material/Button";
import BaseLayout from "@components/components/Layout/BaseLayout";
import { useTheme } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import { CustomInput } from "../../../../styles/customMUI/Input";
import InputLabel from "@mui/material/InputLabel";

const PostPage = () => {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [image, setImage] = React.useState("");
  const theme = useTheme();
  
  return (
    <div>
      <BaseLayout
        title={"Create Post: "}
        actionButtons={
          <>
            <Button key="create-post" variant="outlined">
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
              <InputLabel
                  style={{ color: theme.palette.primary.main }}
                  shrink
                >
                  Image Url:
                </InputLabel>
                <CustomInput
                  placeholder="Content"
                  type="text"
                  value={image}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setImage(e.target.value)
                  }
                />
                </FormControl>
                  <img src={image} alt="image" width={200} height={200} />
            </div>
          );
        }}
      />
    </div>
  );
};

export default PostPage;

