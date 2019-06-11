

export class BookIssued {
  public id: string;
  public name: string;
  public author: string;
  public category: string;
  public dateReceived: Date;
  public dateToReturn: Date;

  constructor(id: string, name: string, author: string, category, dateReceived: Date, dateToReturn: Date) {
      this.id = id;
      this.name = name;
      this.author = author;
      this.category = category;
      this.dateReceived = dateReceived;
      this.dateToReturn = dateToReturn;
  }

}
