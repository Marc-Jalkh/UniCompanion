import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface Post {
    id: number;
    title: string;
    content: string;
    date: string;
    image: string;
}

export class PostImpl implements Post {
    id: number;
    title: string;
    content: string;
    date: string;
    image: string;

    constructor(id: number ,title: string, content: string, date: string, image: string) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.date = date;
        this.image = image;
    }
}
