import React from 'react';

import { db } from './firebase';

function ChatInputBox({ user }) {
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        db.collection('/channels/general/messages').add({
          user: db.collection('users').doc(user.uid),
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
