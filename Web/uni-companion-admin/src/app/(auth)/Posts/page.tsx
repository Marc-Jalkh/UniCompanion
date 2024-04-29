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
  const [rows, setRows] = React.useState<GridRowsProp<PostImpl>>([]);

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
        api="http://localhost:3000/posts/getAll"
        mapper={(jsonData: any) =>{
          console.log(jsonData);
          var rowstemp: PostImpl[] = []
           jsonData.map((post: any) => {
            rowstemp.push(
             new PostImpl(
              post.post_id,
              post.title,
              post.content,
              post.date,
              post.picture
            )
          );
          });
          setRows(rowstemp);
          return;
          }}
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
