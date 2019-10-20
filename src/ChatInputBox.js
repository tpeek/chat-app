import React from 'react';

import { db } from './firebase';

function ChatInputBox() {
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        db.collection('/channels/general/messages').add({
          text: e.target.elements[0].value,
          createdAt: new Date(),
        });
        e.target.reset();
      }}
      className="ChatInputBox"
    >
      <input className="ChatInput" placeholder="Message #general" />
    </form>
  );
}

export default ChatInputBox;
