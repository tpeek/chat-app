import React from 'react';

import useCollection from './useCollection';

function Members({ channelId }) {
  const subbedUsers = useCollection('users', 'displayName', [`channels.${channelId}`, '==', true]);

  return (
    <div className="Members">
      <div>
        {subbedUsers.map(({ displayName, isOnline }, i) => (
          <div key={i} className="Member">
            <div className={`MemberStatus ${isOnline ? 'online' : 'offline'}`} />
            {displayName}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Members;
