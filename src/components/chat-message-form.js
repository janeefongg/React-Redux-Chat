import React, { Component } from 'react';

export default class ChatMessageForm extends Component {
  constructor(props) {
    super(props)

    this.messageInput = this.messageInput.bind(this);
    this.submitMessage = this.submitMessage.bind(this);

    this.state = { messsage: '' };
    
  }
  
  componentDidMount() {
    console.log('props in chat message form: ', this.props)
  }

  messageInput (event) {
    this.state.message = event.target.value;
    console.log('this props text: ', this.state.message);
  }

  submitMessage(event) {
    event.preventDefault();
    var messageObj = {
      user: this.props.user,
      text: this.state.message
    };

    console.log('this is message obj: ', messageObj);

    this.props.handleMessageSubmit(messageObj);

  }

  render() {
    return (
      <form>
        <input type="text" onChange={this.messageInput} placeholder="Type message"/>
        <input type="submit" onClick={this.submitMessage}/>
      </form>
    )
  }
}