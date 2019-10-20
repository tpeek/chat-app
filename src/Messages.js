import React from 'react';

import useCollection from './useCollection';

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
          message.user !== messages[index - 1].user ||
          message.createdAt.diff(messages[index - 1].createdAt, 'minutes') > 6 ? (
            <div className="Message with-avatar">
              <div className="Avatar" />
              <div className="Author">
                <div>
                  <span className="UserName">Ryan Forence </span>
                  <span className="TimeStamp">{message.createdAt.format('h:mm A')}</span>
                </div>
                <div className="MessageContent">{message.text}</div>
              </div>
            </div>
          ) : (
            <div>
              <div className="Message no-avatar">
                <div className="MessageContent">{message.text}</div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Messages;
