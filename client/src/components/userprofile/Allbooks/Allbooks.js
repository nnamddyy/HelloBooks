import React from 'react';
import { Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as bookActions from '../../../Actions/booksAction';

/**
 * @class Books
 * @classdesc returns the Books component
 */

//  books, path, getBookId
class Allbooks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      book_id: 0,
      books: [],
      loadingBooks: false,
    }

    // Bind getBookId to this
    this.getBookId = this.getBookId.bind(this);
  }


  getBookId(event) {
    // this.state.book_id = event.target.value
    // console.log(this.state.book_id);
    this.props.getCurrentBookId(event.target.value);
  }

  componentWillMount() {
    // Fetch all books
    this.props.loadAllbooks();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.retrievedBooks) {
      this.setState({loadingBooks: false, books: nextProps.retrievedBooks});
    }
  }

  render() {
    return(
      
      <div>
        {/* Row for header  */}
        <div className="row">
          <div className="col s12 books-holder-title center">
            <h1>All Books</h1>
          </div>
        </div>
      
        {/* Row for books  */}
        <div className="row">
          <div className="col s12 m12 l11 offset-l1">
            <div className="books-holder center">
              {this.state.books.map((book, id) => 
                <div className="book-holder-prot" key= {book.id}>
                  {/* Book title  */}
                  <div className="item book-title center">
                    <h6><strong>{book.title}</strong></h6>
                  </div>

                  {/* Book image  */}
                  <div className="item img-holder center">
                    <img src= {book.image} alt=""/>
                    <div className="img-overlay">
                      <p>{book.title} by <strong>{book.author}</strong></p>
                    </div>
                  </div>

                  {/* Book details  */}
                  <div className="dets">
                    <Link to={`/user/bookdetails`}>
                      <button 
                        type="button"
                        value={book.id}
                        className="btn waves-effect waves-teal"
                        onClick={this.getBookId}>Details
                      </button>
                    </Link>
                    <p>qty: {book.quantity}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    url: ownProps,
    retrievedBooks: state.books.books,
    currentBookId: state.books.currentBookId
    
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadAllbooks: () => dispatch(bookActions.loadAllbooks()),
    getCurrentBookId: (id) => dispatch(bookActions.getBookId(id))
  }
}

  export default connect(mapStateToProps, mapDispatchToProps)(Allbooks);