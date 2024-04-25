"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import BaseLayout from "@components/components/Layout/BaseLayout";
import { PostImpl } from "../../../models/Posts";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";

export default function SwipeableTemporaryDrawer() {
  const theme = useTheme();
  const Router = useRouter();

  const rows: GridRowsProp<PostImpl> = [
    {
      id: 1,
      image:
        "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
      title: "World",
      content: "Hello World",
      date: "2021-10-10",
    },
    {
      id: 2,
      image: "Hello",
      title: "World",
      content: "Hello World",
      date: "2021-10-10",
    },
  ];
  const columns: GridColDef[] = [
    {
      field: "image",
      headerName: "Image",
      width: 200,
      renderCell: (params) => (
        // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
        <img style={{ height: 50, objectFit: "contain" }} src={params.value} />
      ),
    },
    { field: "title", headerName: "Title", width: 200 },
    { field: "content", headerName: "Content", width: 400 },
    { field: "date", headerName: "Date", width: 400 },
  ];
  return (
    <div>
      <BaseLayout
        title="Posts"
        actionButtons={
          <>
            <Button key="create-post" variant="outlined">
              Create Post
            </Button>
          </>
        }
        api="https://jsonplaceholder.typicode.com/posts"
        mapper={(jsonData: any) => jsonData}
        data={null}
        body={(props: any) => (
          <DataGrid
            rows={rows}
            columns={columns}
            sx={{
              backgroundColor: theme.palette.background.default,
            }}
            onRowClick={(row) => {
              Router.push("/Posts/Post?id=" + row.id);
            }}
          />
        )}
      />
    </div>
  );
}
