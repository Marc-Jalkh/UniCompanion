class User {
  id: number;
  name: string;
  usekId: string;
  faculty: string;
  image: string;

  constructor(
    id: number,
    name: string,
    usekId: string,
    faculty: string,
    image: string,
  ) {
    this.id = id;
    this.name = name;
    this.usekId = usekId;
    this.faculty = faculty;
    this.image = image;
  }
}
