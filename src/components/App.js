import React, { Component } from 'react';
import Web3 from 'web3';
import logo from '../logo.png';
import Chat from '../abis/Chat.json'
import Main from './Main.js'
import Navbar from './Navbar.js'
import './App.css';

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }
   
 
    async loadWeb3() {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum)
    await window.ethereum.enable()
  }
  else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider)
  }
  else {
    window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
  }
}  

  async loadBlockchainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = Chat.networks[networkId]
    if(networkData) {
      const chat = web3.eth.Contract(Chat.abi, networkData.address)
      const prodCnt = await chat.methods.cnt().call()
      this.setState({prodCnt})
      this.setState({loading: false})
      this.setState({chat})

      for(var i = 1; i <=prodCnt; i++){
        const messages = await chat.methods.message(i).call()
         
        this.setState({
          message: [...this.state.message, messages]
        })
        console.log(prodCnt)
      }

    }
    else{
      window.alert('Chat contract not deployed to network')
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      cnt: 0,
      message: [],
      loading: true
    }
    this.sendMessage = this.sendMessage.bind(this)
  }
  
  sendMessage(message){
    this.setState({loading: true})
    this.state.chat.methods.sendMessage(message).send({from:this.state.account}).once('reciept', (reciept)=>{ this.setState.loading({loading: false})
    })
    
  }
  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
         <div className="row">
           <main role="main"  className="col-lg-12 d-flex">
            { this.state.loading ? <div id ="loader" className="text-center"><p className="text-center"></p></div> : < Main mssgs = {this.state.message} sendMessage = {this.sendMessage} />}
           </main>
         </div>
         </div>
      </div>
        );
  }
}

export default App;
