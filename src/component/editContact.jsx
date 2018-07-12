import React, { Component } from 'react';

class EditContact extends Component {

  state = {
    name:'',
    phone:'',
    birthday:'',
    _id:''
  }

  componentDidMount(){
    //console.log(this.props.id)


    var id=this.props.id

    fetch('/contact/'+id, {
  method: 'GET',
}).then(res => res.json())
.then(json => {

this.setState({
  name:json.name,
  phone:json.phone,
  birthday:json.birthday
})

console.log(json)


}


  )
.catch((err) => {
  console.log(err)
})
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

  onClickSave = (e) => {



    fetch('/contactupdate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id:this.props.id,
        name:this.state.name
      })
    }).then((res)=> {
      if(res.status === 200) {

this.props.reRenderAgain()
this.props.changeView();
        //this.props.reRender()
      } else {
        // error
      }
    }).catch((err) => {
      // network error
    })



  }





  render() {
    return (

      <div   style={{'borderStyle': 'solid',  width: '200px', margin: 'auto',  border: '1px solid black', backgroundColor:'#E3E3E3' }}>

        <input  onChange={this.onChangeN} className="field" value={this.state.name} ></input>
        <input  onChange={this.onChangeP} className="field" value={this.state.phone} ></input>
        <input onChange={this.onChangeB} type='date'  className="field" value={this.state.birthday} ></input>
        <button  onClick={this.onClickSave}  className="btn">Save</button>
        <button onClick={this.onClickCancel}  className="btn" >Cancel</button>
      </div>

    );
  }
}

export default EditContact;
