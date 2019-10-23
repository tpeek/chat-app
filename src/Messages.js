import React, { useState, useEffect } from 'react';

import useCollection from './useCollection';
import { db } from './firebase';

const useDoc = path => {
  const [doc, setDoc] = useState(null);

  useEffect(() => {
    return db.doc(path).onSnapshot(doc => {
      setDoc({
        ...doc.data(),
        id: doc.id,
      });
    });
  }, [path]);

  return doc || { displayName: 'Username' };
};

const MessageWithAvatar = ({ user, createdAt, text }) => {
  const author = useDoc(`users/${user.id}`);

  return (
    <div className="Message with-avatar">
      <div className="Avatar" style={{ backgroundImage: `url(${author.photoURL})`}} />
      <div className="Author">
        <div>
          <span className="UserName">{author.displayName} </span>
          <span className="TimeStamp">{createdAt.format('h:mm A')}</span>
        </div>
        <div className="MessageContent">{text}</div>
      </div>
    </div>
  );
};

const Message = ({ text }) => {
  return (
    <div>
      <div className="Message no-avatar">
        <div className="MessageContent">{text}</div>
      </div>
    </div>
  );
};

function Messages() {
  const messages = useCollection('/channels/general/messages', 'createdAt');
  return (
    <div className="Messages">
      <div className="EndOfMessages">That is every message!</div>
      {messages.map((message, index) => (
        <div key={message.id}>
          {(index === 0 || message.createdAt.isAfter(messages[index - 1].createdAt, 'day')) && (
            <div className="Day">
              <div className="DayLine" />
              <div className="DayText">{message.createdAt.format('MM/DD/YYYY')}</div>
              <div className="DayLine" />
            </div>
          )}
          {index === 0 ||
          message.user.id !== messages[index - 1].user.id ||
          message.createdAt.diff(messages[index - 1].createdAt, 'minutes') > 6 ? (
            <MessageWithAvatar {...message} />
          ) : (
            <Message {...message} />
          )}
        </div>
      ))}
    </div>
  );
}

export default Messages;
