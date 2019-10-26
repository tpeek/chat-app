import React, { useEffect, useRef } from 'react';

import useCollection from './useCollection';
import useDocWithCache from './useDocWithCache';

const MessageWithAvatar = ({ user, createdAt, text }) => {
  const author = useDocWithCache(`users/${user.id}`);

  return (
    <div className="Message with-avatar">
      <div className="Avatar" style={{ backgroundImage: `url(${author.photoURL})` }} />
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

const useScroller = ref => {
  useEffect(() => {
    ref.current.scrollTop = ref.current.scrollHeight;
  });
};

function Messages({ channelId }) {
  const messages = useCollection(`/channels/${channelId}/messages`, 'createdAt');
  const scrollerRef = useRef();
  useScroller(scrollerRef);

  return (
    <div ref={scrollerRef} className="Messages">
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
