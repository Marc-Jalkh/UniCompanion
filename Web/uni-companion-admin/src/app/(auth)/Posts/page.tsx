"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import BaseLayout from "@components/components/Layout/BaseLayout";
import { PostImpl } from "../../../models/Posts";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import { count } from "console";

export default function SwipeableTemporaryDrawer() {
  const theme = useTheme();
  const Router = useRouter();
  const [rows, setRows] = React.useState<GridRowsProp<PostImpl>>([]);
  const [counter, setcount] = React.useState(0)
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
  function setNewRows(data:GridRowsProp<PostImpl>){
    if(counter > 0) return;
    setRows(data)
    setcount(1)
  }
  return (
    <div>
            <img 
      style={{
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '100%',
        filter: 'brightness(0.6)',
      }}
      src="https://hsuf.org/wp-content/uploads/2019/05/Campus-1.jpg" />

      <BaseLayout
        title="Posts"
        actionButtons={
          <>
            <Button key="create-post" variant="outlined" onClick={() => Router.push("/Posts/create")}>
              Create Post
            </Button>
          </>
        }
        api="http://localhost:3000/posts/getAll"
        mapper={(jsonData: any) => {
          console.log(jsonData);
          var rowstemp: PostImpl[] = [];
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
          setNewRows(rowstemp)
          return rowstemp;
        }}
        data={null}
        body={(props: GridRowsProp<PostImpl>) => (
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
