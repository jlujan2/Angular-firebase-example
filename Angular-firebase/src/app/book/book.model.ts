

export class Book {
    public id: string;
    public name: string;
    public author: string;
    public category: string;
    public description: string;
    public availability: boolean;
    public imagePath: string;
    public rating: number;
    public copies: number;
    public isbn: string;
    public reviews: string[];
    public ratingCount: number;

    constructor(id: string, name: string, author: string, category: string, description: string,
      availability: boolean, imagePath: string, rating: number, copies: number, isbn: string) {
        this.id = id;
        this.name = name;
        this.author = author;
        this.category = category;
        this.description = description;
        this.availability = availability;
        this.imagePath = imagePath;
        this.rating = rating;
        this.copies = copies;
        this.isbn = isbn;
        this.ratingCount = 0;
        this.reviews = [];
    }


    addBookToUser() {
        this.copies = this.copies - 1;
    }
}
