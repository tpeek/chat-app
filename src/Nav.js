import React from 'react';

import useCollection from './useCollection';

function Nav() {
  const channels = useCollection('channels', 'name');

  return (
    <div className="Nav">
      <div className="User">
        <img className="UserImage" alt="whatever" src="https://placekitten.com/64/64" />
        <div>
          <div>Ryan Florence</div>
          <div>
            <button className="text-button">log out</button>
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
