import React, { Component } from 'react';
import './App.css';
import CreateContact from './component/createContact'
import ListContacts from './component/listContacts'
import EditContact from './component/editContact'



class App extends Component {

  constructor(props){
    super(props);
    this.state={
      listView: true,
      mainView: false,

    }
  }

changeView(){
  this.setState({
    listView: false,
    mainView:true,


  })
}


  onClick=()=> {
    this.setState({
      listView: true,
      mainView:false,


    })
  }
  render() {
    return (
      <div className="App">


        {this.state.mainView ? <CreateContact onClickReturn={this.onClick.bind(this)} /> : null }

        {this.state.listView ? <ListContacts changeView={this.changeView.bind(this)} /> : null }

      </div>
    );
  }
}

export default App;
