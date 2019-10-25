import React from 'react';
import { useParams } from 'react-router-dom';

import Members from './Members';
import ChannelInfo from './ChannelInfo';
import Messages from './Messages';
import ChatInputBox from './ChatInputBox';

function Channel({ user }) {
  const { channelId } = useParams();

  return (
    <div className="Channel">
      <div className="ChannelMain">
        <ChannelInfo />
        <Messages channelId={channelId} />
        <ChatInputBox user={user} channelId={channelId} />
      </div>
      <Members />
    </div>
  );
}

export default Channel;
