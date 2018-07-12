import React, { Component } from 'react';
import EditContact from './editContact'

class Contact extends Component {

  constructor(props){
    super(props)

    this.state={
      _id:this.props.contact._id,
      editView:false,
      mainView:true
    }
  }



  onClickEdit = (e) => {
    this.setState({editView:true, mainView:false})
  }






  reRenderAgain=(e)=> {
console.log('tryingg')
   this.props.reRender()
  }


  changeView(){
    this.setState({
      editView:false,
      mainView:true


    })
  }


  onClickDelete = (e) => {

    var theID=this.state._id

    fetch('/contactremove', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id:theID

      })
    }).then((res)=> {
      if(res.status === 200) {


        this.props.reRender()
      } else {
        // error
      }
    }).catch((err) => {
      // network error
    })

  }
  render(){

    return(
<div>

  {this.state.mainView ? (<div   style={{'borderStyle': 'solid',  width: '200px', margin: 'auto',  border: '1px solid black', backgroundColor:'#E3E3E3' }}>
    <p align="left">  <strong>Name: </strong> {this.props.contact.name}</p>
    <p align="left">  <strong>Phone: </strong> {this.props.contact.phone}</p>
    <p align="left">  <strong>Birthday: </strong> {this.props.contact.birthday}</p>
    <button onClick={this.onClickEdit}>Edit</button>
    <button onClick={this.onClickDelete} >Delete</button>
  </div>) : null }



      {this.state.editView ? <EditContact id={this.props.contact._id} changeView={this.changeView.bind(this)} reRenderAgain={this.reRenderAgain}   /> : null }


  </div>
)
    }

  }

  export default Contact;
