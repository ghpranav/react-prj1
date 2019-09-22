import React from 'react';
import './App.css';
import axios from 'axios';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      books: []
    }
  }

  deleteBook = index => {
    var array = [...this.state.books];
    array.splice(index, 1);
    this.setState({ books: array });
  }

  componentDidMount() {
    axios.get('https://dscjssstu.herokuapp.com/getbooks')
      .then(res => res.data).then((data) => {
        this.setState({ books: data });
      })
  }

  render() {
    return (
      <div className="App">
        <div class="container">
          <div class="jumbotron">
            <div class="text-center">
              <h1>Books</h1>
            </div>

            {this.state.books.map((book, index) => (
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{book.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {book.description}
                  </h6>
                  <button onClick={() => this.deleteBook(index)} class="btn btn-primary stretched-link">Delete</button>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    );
  }
}

export default App;