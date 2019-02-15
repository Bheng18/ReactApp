import React, { Component } from 'react';
import { 
    Form,
    FormGroup,
    Label,
    Input,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button, 
    Table 
  } from 'reactstrap';
import axios from 'axios';
//import logo from './logo.svg';
//import './App.css';

class App extends Component {

  state = {
    books: [],
    newBookData: {
      title: '',
      rating: ''
    },
    newBookModal: false
  }

  componentWillMount(){
    axios.get('https://jsonplaceholder.typicode.com/posts')
         .then((res) => {
           console.log("Your data: " + res)
            this.setState({
               books: res.data.slice(0,10)               
            })
         })
  }

  toggleNewBookModal(){
    this.setState(prevState => ({
       newBookModal: !prevState.newBookModal
    }))
  }

  handleChange = (e) => {
      this.setState({ 
        [e.target.id]: e.target.value 
      }); //best used
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
        name: this.state.name,
        contact: this.state.contact
    }
  //add item via add item
  //  this.props.addItem(newItem);

  //close modal
  this.toggleNewBookModal();

 }


  render() {

    const { books } = this.state;

  let bookList = books.length ? (
      books.map((book) =>{
        return(
          <tr key={book.id}>
            <td>{book.id}</td>
            <td>{book.title}</td>
            <td>{book.body}</td>
            <td>
                <Button color="primary" size="sm" className="mr-2">Edit</Button>
                <Button color="danger" size="sm">Delete</Button>
            </td>
          </tr>
        )
      })
  ) : (
     <div className="center">Empty post</div>
  ) 
  

    return (
      <div className="App container">
          <Button color="success" onClick={this.toggleNewBookModal.bind(this)}>Add Book</Button>
            <Modal isOpen={this.state.newBookModal} toggle={this.toggleNewBookModal.bind(this)} className={this.props.className}>
              <ModalHeader toggle={this.toggleNewBookModal.bind(this)}>Add New book</ModalHeader>
              <ModalBody>
                  <Form> onSubmit={this.handleSubmit}
                      <FormGroup>
                        <Label for="title">Title</Label>
                        <Input type="text" name="title" id="title" placeholder="Enter Title" onChange={this.handleChange}/>
                      </FormGroup>
                      <FormGroup>
                        <Label for="rating">Rating</Label>
                        <Input type="text" name="rating" id="rating" placeholder="Enter rating" onChange={this.handleChange}/>
                      </FormGroup> 
                  </Form>             
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.toggleNewBookModal.bind(this)}>Save</Button>{' '}
                <Button color="danger" onClick={this.toggleNewBookModal.bind(this)}>Cancel</Button>
              </ModalFooter>
            </Modal>

          <Table>
                <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Rating</th>
                    <th>Action</th>
                </tr>
                   {bookList}
               
          </Table>
      </div>
    );
  }
}

export default App;
