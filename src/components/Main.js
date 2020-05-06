import React, { Component } from 'react';

class Main extends Component {

  render() {
    return (
      <div id="content">
        <h1>Chat</h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          const mssg = this.message.value
          this.props.sendMessage(mssg)
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="message"
              type="text"
              ref={(input) => { this.message = input }}
              className="form-control"
              placeholder="Message"
              required />
          </div>
          <button type="submit" className="btn btn-primary">Send</button>
        </form>
        <p></p>
        <h2>Messages</h2>
                <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Message</th>
              <th scope="col">Owner</th>
            </tr>
          </thead>
          <tbody id="productList">
            {this.props.mssgs.map((message,key)=>{
              return(
                <tr key={key}>
                <th scope="row">{message.id.toString()}</th>
                <td>{message.msg}</td>
                <td>{message.sndr}</td>
                </tr>
                )
            })

            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default Main;