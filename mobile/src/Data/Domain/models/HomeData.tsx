export class HomeData {
  welcomeMessage: string;
  user: string;
  posts: Post[];
  semester: string;
  gpa: string;
  grade: string;

  constructor(
    welcomeMessage: string,
    user: string,
    posts: Post[],
    semester: string,
    gpa: string,
    grade: string,
  ) {
    this.welcomeMessage = welcomeMessage;
    this.user = user;
    this.posts = posts;
    this.semester = semester;
    this.gpa = gpa;
    this.grade = grade;
  }
}
