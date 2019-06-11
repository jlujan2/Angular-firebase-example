
export class User {
    public name: string;
    public lname: string;
    public email: string;
    public id: string;
    public role: string;
    public books: any[];
    public genres: string[];

    public constructor(name: string, lname: string, email: string, role: string) {
        this.name = name;
        this.lname = lname;
        this.email = email;
        this.role = role;
        this.genres = [];
        this.books = [];
    }

    addBook(book) {
        this.books.push(book);
    }

    addGenre(genre: string) {
        this.genres.push(genre);
    }

    getData(): object {
        const result = {};
        Object.keys(this).map(key => result[key] = this[key]);
        return result;
    }

    setId(id) {
        this.id = id;
    }
}
