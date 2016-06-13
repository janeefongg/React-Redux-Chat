import React from 'react';

import ChatMessageList from './chat-messages-list'

const ChatMessages = (messages) => {
  console.log('this is messages:', messages);
  var messageList = messages.messages.map((message, index) =>
    <ChatMessageList key={index} message={message} />
  );

  console.log('messageList:', messageList)

  return (
    <div className="chat-container">
      {messageList}
    </div>
  )

};

export default ChatMessages;

// export default class ChatMessages extends Component {
//   constructor(props) {
//     super(props);
//
//   }
//
//
//   chatMessages() {
//     var messages = this.props.messages
//     var messageList = messages.map((message, index) => {
//       return <ChatMessagesList key={index} message={message} />
//     });
//
//     console.log(messageList);
//     return messageList;
//   }
//
//   render () {
//     return (
//       <div className="chat-container">
//
//       </div>
//     )
//   }
// }