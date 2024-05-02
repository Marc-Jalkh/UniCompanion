"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import BaseLayout from "@components/components/Layout/BaseLayout";
import { PostImpl } from "../../../models/Posts";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import { count } from "console";

class User{
  id: string;
  name: string;
  faculty: string;
  image: string;

  constructor(id: string, name: string, faculty: string, image: string){
    this.name = name;
    this.faculty = faculty;
    this.image = image;
    this.id = id
  }
}

export default function SwipeableTemporaryDrawer() {
  const theme = useTheme();
  const Router = useRouter();
  const [rows, setRows] = React.useState<GridRowsProp<User>>([]);
  const [counter, setcount] = React.useState(0)
  const columns: GridColDef[] = [
    {
      field: "image",
      headerName: "Image",
      width: 75,
      renderCell: (params) => (
        // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
        <img style={{ height: 50, objectFit: "contain", borderRadius: '100%' }} src={params.value} />
      ),
    },
    { field: "name", headerName: "Name", width: 200 },
    { field: "faculty", headerName: "Role", width: 400 },
  ];
  function setNewRows(data:GridRowsProp<User>){
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
      src="https://i.pinimg.com/originals/08/35/b3/0835b32ee60c8228711ea28f255b5f11.jpg" />

      <BaseLayout
        title="Users"
        actionButtons={
          <>
          </>
        }
        api="http://localhost:3000/users/all"
        mapper={(jsonData: any) => {
          console.log(jsonData);
          var rowstemp: User[] = [];
          jsonData.map((post: any) => {
            rowstemp.push(
              new User(
                post.id,
                post.name,
                post.faculty,
                post.image
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
          />
        )}
      />
    </div>
  );
}
