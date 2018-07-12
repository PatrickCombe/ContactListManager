import React, { Component } from 'react';

class CreateContact extends Component {

  state = {
    name:'',
    phone:'',
    birthday:''
  }
  onClickReturn=()=> {
    this.props.onClickReturn();
  }

  onClick = (e) => {
    const {name, phone, birthday} = this.state

    if(this.state.name==='' || this.state.phone==='' || this.state.birthday==='' ){

    } else {

    fetch('/contact/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        phone,
        birthday
      })
    }).then((res)=> {
      if(res.status === 200) {
        //console.log(res)
      } else {

      }
    }).catch((err) => {

    })
    this.props.onClickReturn();
  }

}

  onChangeN=(e)=> {
    this.setState({
      name:e.target.value
    })
  }
  onChangeP=(e)=> {
    this.setState({
      phone:e.target.value
    })
  }
  onChangeB=(e)=> {
    this.setState({
      birthday:e.target.value
    })
  }

  render() {
    return (
      <div >
        <h1>Create Contact</h1>
        <input onChange={this.onChangeN} className="field" placeholder="name"></input>
        <input onChange={this.onChangeP} className="field" placeholder="phone"></input>
        <input type='date' onChange={this.onChangeB} className="field" placeholder="birthday"></input>
        <button onClick={this.onClick}   className="btn">Create</button>
        <button onClick={this.onClickReturn} className="btn" >Cancel</button>
      </div>
    );
  }
}

export default CreateContact;
