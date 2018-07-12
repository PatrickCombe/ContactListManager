import React, { Component } from 'react';
import Contact from './contact.jsx'

class ListContacts extends Component {

  constructor(props){
    super(props);

    this.state={
      contactList:[],
      id: []

    }
  }

  reRender=(e)=> {

 this.fetchData()
  }

fetchData(){
  fetch('/contact/', {
    method: 'GET',
  }).then(res => res.json())
  .then(json => {

    var contacts=json.slice();
    var newArray=[]
    var idArr=[]
    for(var i=0;i<contacts.length;i++){
      newArray.push(contacts[i])
      idArr.push(contacts[i]._id)
    }


    this.setState({contactList:newArray, id:idArr})






  })
  .catch((err) => {
    console.log(err)
  })
}
  componentDidMount(){

  this.fetchData()

  }



  onClick=(e)=> {
    this.props.changeView();
  }


  render(){
    return(
      <div>

        <h1>Contacts</h1>
        <ul>
          {this.state.contactList.map((contact, index)=> <Contact contact={contact} reRender={this.reRender} /> )}
        </ul>
        <button onClick={this.onClick} className="btn">Create New</button>

      </div>


    )
  }

}


export default ListContacts;
