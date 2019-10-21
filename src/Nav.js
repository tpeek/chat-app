import React from 'react';

import useCollection from './useCollection';
import { firebase } from './firebase';

function Nav({ user }) {
  const channels = useCollection('channels');

  return (
    <div className="Nav">
      <div className="User">
        <img className="UserImage" alt="whatever" src={user.photoURL} />
        <div>
          <div>{user.displayName}</div>
          <div>
            <button
              onClick={() => {
                firebase.auth().signOut();
              }}
              className="text-button"
            >
              log out
            </button>
          </div>
        </div>
      </div>
      <nav className="ChannelNav">
        {channels.map(({ id }) => (
          <a key={id} href={`/channel/${id}`}>
            # {id}
          </a>
        ))}
      </nav>
    </div>
  );
}

export default Nav;
