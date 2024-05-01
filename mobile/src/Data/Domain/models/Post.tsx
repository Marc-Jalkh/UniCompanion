class Post {
  id: string;
  title: string;
  content: string;
  date: string;
  image: string;

  constructor(
    id: string,
    title: string,
    content: string,
    date: string,
    image: string,
  ) {
    this.title = title;
    this.id = id;
    this.content = content;
    this.date = date;
    this.image = image;
  }
}
