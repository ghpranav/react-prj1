import React from 'react';
import './App.css';
import axios from 'axios';
import Flippy, { FrontSide, BackSide } from 'react-flippy';

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

  componentDidUpdate(_prevProps, prevState) {
    if (this.state.books !== prevState.books)
      this.componentDidMount()
  }


  render() {

    let displayBook = (
      this.state.books.map((book) => (
        <div>
          <Flippy
            flipOnHover={false}
            flipOnClick={true}
            flipDirection="vertical"
            ref={(r) => this.flippy = r}
          >
            <FrontSide
              style={{
                backgroundColor: '#ffffff',
              }}>
              <h5 className="card-title">{book.title}</h5>
            </FrontSide>
            <BackSide>
              <h5 className="card-title">{book.title} - ${book.price}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                {book.description}
              </h6>
            </BackSide>
          </Flippy>
          <br />
        </div>
      ))
    )

    return (
      <div className="App">
        <div class="container">
          <div class="jumbotron">
            <div class="text-center">
              <h1>Books</h1>
            </div>
            {displayBook}
          </div>
        </div>
      </div>
    );
  }
}

export default App;