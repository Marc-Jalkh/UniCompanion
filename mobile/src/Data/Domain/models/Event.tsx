class EventDomainModel {
  title: string;
  description: string;
  date: string;
  time: string;

  constructor(title: string, description: string, date: string, time: string) {
    this.title = title;
    this.description = description;
    this.date = date;
    this.time = time;
  }
}
