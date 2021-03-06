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

const ChatScroller = props => {
  const ref = useRef();
  const shouldScroll = useRef(true);

  useEffect(() => {
    if (shouldScroll.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  });

  const handleScroll = () => {
    const node = ref.current;
    const { scrollTop, clientHeight, scrollHeight } = node;
    const atBottom = scrollHeight === clientHeight + scrollTop;
    shouldScroll.current = atBottom;
  };

  return <div ref={ref} {...props} onScroll={handleScroll} />;
};

function Messages({ channelId }) {
  const messages = useCollection(`/channels/${channelId}/messages`, 'createdAt');

  return (
    <ChatScroller className="Messages">
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
    </ChatScroller>
  );
}

export default Messages;
