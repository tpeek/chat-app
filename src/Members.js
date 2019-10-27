import React from 'react';

import useCollection from './useCollection';

const sortByDisplayName = (a, b) =>
  a.displayName > b.displayName ? 1 : a.displayName < b.displayName ? -1 : 0;

function Members({ channelId }) {
  const subbedUsers = useCollection('users', undefined, [`channels.${channelId}`, '==', true]);

  return (
    <div className="Members">
      <div>
        {subbedUsers.sort(sortByDisplayName).map(({ displayName, status: { state } = {}, id }) => (
          <div key={id} className="Member">
            <div className={`MemberStatus ${state}`} />
            {displayName}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Members;
