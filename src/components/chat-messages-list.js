import React from 'react';

const ChatMessageList = ({message}) => {

  console.log('this is messages inside messagelist:', message);
  return (
    <div>
      <strong>{message.user}:</strong> {message.text}
    </div>
  )
}

export default ChatMessageList;