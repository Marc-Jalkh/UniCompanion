class Chat {
  id: string;
  name: string;
  lastMessage: string;
  lastMessageDate: string;
  unreadMessages: number;
  image: string;
  constructor(
    id: string,
    name: string,
    lastMessage: string,
    lastMessageDate: string,
    unreadMessages: number,
    image: string,
  ) {
    this.id = id;
    this.name = name;
    this.lastMessage = lastMessage;
    this.lastMessageDate = lastMessageDate;
    this.unreadMessages = unreadMessages;
    this.image = image;
  }
}

class SingleChat {
  id: string;
  name: string;
  messages: Message[];
  image: string;
  status: string;
  constructor(
    id: string,
    name: string,
    messages: Message[],
    image: string,
    status: string,
  ) {
    this.id = id;
    this.name = name;
    this.messages = messages;
    this.image = image;
    this.status = status;
  }
}

class Message {
  message: string;
  date: Date;
  isMine: boolean;
  constructor(message: string, date: Date, isMine: boolean) {
    this.message = message;
    this.date = date;
    this.isMine = isMine;
  }
}
