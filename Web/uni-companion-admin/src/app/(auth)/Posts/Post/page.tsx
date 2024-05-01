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
import Image from "next/image"; // Add this import

const PostPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [image, setImage] = React.useState("");
  const theme = useTheme();
  const [counter, setcount] = React.useState(0)

  function setData(
    titles: string,
    body: string,
    images: string,
  ){
    if(counter > 0) return;
    setTitle(titles);
    setContent(body);
    setImage(images)
    setcount(1)
  }

  var deletePost = () =>{
    try {
      fetch("http://localhost:3000/posts/delete/" + id, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "token": "fdfasfds"
        },
      }).then((response) => {
        if (!response.ok) {
          console.log(response);
          //navigate back
        }
      });

    }
    catch{

    }
  }


  //function post update 
  //same as create 
  return (
    <div>
      <BaseLayout
        title={"Post ID: " + id}
        actionButtons={
          <>
            <Button key="create-post" variant="outlined">
              Save
            </Button>
            <Button key="create-post" variant="outlined" onClick={deletePost}>
              Delete
            </Button>
          </>
        }
        api={"http://localhost:3000/posts/get/"+ id}
        mapper={(jsonData: any) => {
          const data: PostImpl = new PostImpl(
            jsonData[0].id,
            jsonData[0].title,
            jsonData[0].content,
            jsonData[0].date,
            jsonData[0].picture
          );
          setData(
            jsonData[0].title,
            jsonData[0].content,
            jsonData[0].picture
          )
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

