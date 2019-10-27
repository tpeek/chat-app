import React from 'react';
import { Link } from 'react-router-dom';

import useCollection from './useCollection';
import useDoc from './useDoc';
import { firebase } from './firebase';

function Nav({ user }) {
  const channels = useCollection('channels');
  const userChannelsInfo = useDoc(`users/${user.uid}`).channels;
  const userChannels = [];
  const otherChannels = [];
  channels.forEach(channel => {
    if (userChannelsInfo && userChannelsInfo[channel.id]) {
      userChannels.push(channel.id);
    } else {
      otherChannels.push(channel.id);
    }
  });

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
        <span style={{ marginLeft: 8 }}>Your channels:</span>
        {userChannels.map(id => (
          <Link key={id} to={`/channel/${id}`}>
            # {id}
          </Link>
        ))}
        <div style={{ height: 60 }} />
        <span style={{ marginLeft: 8 }}>Other channels:</span>
        {otherChannels.map(id => (
          <Link key={id} to={`/channel/${id}`}>
            # {id}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default Nav;
