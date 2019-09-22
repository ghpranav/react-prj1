import React from 'react';
import './App.css';
import update from 'immutability-helper';

class Item extends React.Component {
  render() {
    return (
      <div className="Item">
        {this.props.item.title}
      </div>
    );
  }
}

class App extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     items: []
  //   };
  // }
  state = {
    items: []
  }

  componentDidMount() {
    fetch('https://dscjssstu.herokuapp.com/getbooks')
      .then(res => res.json())
      .then((data) => {
        this.setState({ items: data })
        console.log(this.state.items)
      })
      .catch(console.log)
  }

  deleteBook = (index) => {
    this.setState(state => {
      const list = [update(this.state.items[index], { isVisible: { $set: '0' } })]
      return list
    })
    // this.setState({
    //   items: update(this.state.items[index], { isVisible: { $set: '0' } })
    // })
    // this.setState({ item.isVisible: false });
  }
  render() {
    return (
      <div className="App">
        <div class="container">
          <div class="jumbotron">
            <div class="text-center text-capitalize">
              <h1>Books</h1>
            </div>

            {/* <div>
              {this.state.items.map((item, index) => (
                (item.isVisible === 1) ? (
                  <div>
                    <Item key={index} item={item} />
                    <button
                      type="button"
                      onClick={() => this.deleteBook(index)}
                    >Delete</button>
                  </div>) : null)
              )}
            </div> */}

            {this.state.items.map((item) => (
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {item.completed &&
                      <span>
                        Completed
                </span>
                    }
                    {!item.completed &&
                      <span>
                        Pending
                </span>
                    }
                  </h6>
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
