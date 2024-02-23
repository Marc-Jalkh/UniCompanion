class Beer {
  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
  id: number;
  name: string;
}

export default Beer;
export function beerJsonMapper(jsonData: any): [Beer] {
  return jsonData.map((beer: any) => new Beer(beer.id, beer.name));
}
