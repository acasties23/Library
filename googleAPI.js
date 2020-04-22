class App extends React.Component {
    constructor(props) {
        super(props);
        this.handler = this.handler.bind(this);
        this.state = {
            books: null
        };
    }

    async handler(author) {
        axios.get('https://www.googleapis.com/books/v1/volumes?q=inauthor:' + author)
        .then(res => {
            this.setState({books: res.data.items});
        });
    }

    render() {
        let books;
        let booksList = [];
        if (this.state.books !== null) {
            books = this.state.books.map(book => {
                books++;
                return (
                    <div key={btoa(book.volumeInfo.title)}>
                        <Book title={book.volumeInfo.title}
                              plot={book.volumeInfo.description}
                              cover={book.volumeInfo.imageLinks.smallThumbnail}
                              link={book.volumeInfo.previewLink}/>
                    </div>
                );
            });
            for (let i = 0; i < books.length; i++) {
                booksList.push(
                    <div id="book" key={i} children={books[i]}/>
                );
            }
        }
        return (
            <div >
                <Header handler={this.handler}/>
                <div id = "books">
                    {this.state.books !== null ? booksList : books}
                </div>
                <Footer/>
            </div>
        );
    }
}

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            value: ''
        };
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        this.props.handler(this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <div id='header'>
                <h1>Google API </h1>
                <form id='searchBar'
                      onSubmit={this.handleSubmit}>
                    <input onChange={this.handleChange}
                           type="text"
                           placeholder="Rechercher..."
                    />
                    <input type="submit"
                           value="Recherche"
                    />
                </form>
            </div>
        );
    }
}

class Book extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            plot: props.plot,
            cover: props.cover,
            link:props.link
        }
    }


    render() {
        return (
            <article>
                <img src={this.state.cover} alt={this.state.title} />
                <a href={this.state.link}>{this.state.title}</a>
                <p> {this.state.plot.substr(0, 100)}...</p>
            </article>
        );
    }
}


class Footer extends React.Component {
    render() {
        return (
            <div id='footer'>
            </div>
        );
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById("App")
);
