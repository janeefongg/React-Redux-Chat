import React,  { Component }  from 'react';

import ChatMessages from './chat-messages';
import ChatUsername from './chat-username';
import ChatMessageForm from './chat-message-form';
import io from 'socket.io-client';

const socket = io.connect();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {users: [], messages: [], text: ''};

    this.initializeData = this.initializeData.bind(this);
    this.changeName = this.changeName.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.userJoined = this.userJoined.bind(this);
    this.userLeft = this.userLeft.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
  }
  
  componentDidMount() {
    socket.on('init', this.initializeData);
    socket.on('send:message', this.sendMessage);
    socket.on('user:join', this.userJoined);
    socket.on('user:left', this.userLeft);
    socket.on('change:name', this.changeName);
  }

  initializeData (data) {
    console.log('this is data on initiliaze data:', data);
    this.setState({users: data.users, user: data.name});
    console.log('name: ', this.state.user);
  }

  sendMessage (data) {
    console.log('data after socket broadcast: ', data);
    var messages = this.state.messages;

    messages.push(data);
    this.setState({messages: messages});
    console.log('messages: ', this.state.messages);
  }

  userJoined (data) {
    var users = this.state.users;
    var messages = this.state.messages;
    var name = data.name;

    users.push(name);
    messages.push({
      user: 'APPLICATION_BOT',
      text: name + 'joined'
    });

    this.setState({ users: users, messages: messages});
  }
  
  changeName (data) {
    var oldName = data.oldName;
    var newName = data.newName;
    var users = this.state.users;
    var messages = this.state.messages;
    
    var index = users.indexOf(oldName);
    users.splice(index, 1, newName);
    messages.push({
      user: 'APPLICATION BOT',
      text: 'Change name: ' + oldName + ' to ' + newName
    });
    
    this.setState({ users: users, messages: messages});
    // console.log('data in change name: ', data);
    // this.setState({user: data.name});
  }

  userLeft (data) {
    var users = this.state.users;
    var messages = this.state.messages;
    var name = data.name;

    var index = users.indexOf(name);
    users.splice(index, 1);
    messages.push({
      user: 'APPLICATION BOT',
      text: name + ' left.'
    });

    this.setState({ users: users, messages: messages});
  }

  handleMessageSubmit (message) {
    var messages = this.state.messages;

    messages.push(message);
    this.setState({messages: messages});
    socket.emit('send:message', message);
  }

  handleChangeName(newName) {
    console.log('inside handle name change: ', newName);
    var that = this;

    var oldName = this.state.user;
    socket.emit('change:name', {name : newName}, function (result) {
      if (!result) {
        return alert('error changing name');
      }

      var users = that.state.users;

      var index = users.indexOf(oldName);
      users.splice(index, 1);

      that.setState({ users: users, user: newName});

    });
  }

  render () {
    return (
      <div>
        <ChatUsername username={this.state.user} handleChangeName={this.handleChangeName} />
        <ChatMessages messages={this.state.messages} />
        <ChatMessageForm user={this.state.user} text={this.state.text} handleMessageSubmit={this.handleMessageSubmit}/>
      </div>
    );
  }
};