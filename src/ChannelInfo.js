import React from 'react';

import useDoc from './useDoc';

function ChannelInfo({ channelId }) {
  const { topic } = useDoc(`/channels/${channelId}`);

  return (
    <div className="ChannelInfo">
      <div className="Topic">
        Topic: <input className="TopicInput" defaultValue={topic} />
      </div>
      <div className="ChannelName">#{channelId}</div>
    </div>
  );
}

export default ChannelInfo;
