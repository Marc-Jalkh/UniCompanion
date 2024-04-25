"use client";
import { useSearchParams } from "next/navigation";
import * as React from "react";
import Button from "@mui/material/Button";
import BaseLayout from "@components/components/Layout/BaseLayout";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";

const PostPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

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
        mapper={(jsonData: any) => jsonData}
        data={null}
        body={(props: any) => (
          <div>
          
          
          </div>
        )}
      />
    </div>
  );
};

export default PostPage;
