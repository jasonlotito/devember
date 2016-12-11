import React from 'react';
import CommandList from './CommandList';
import RouteList from './RouteList';

class Page extends React.Component {
  render() {
    return (
      <div className="homePage">
        <nav>
          <h2>Commands</h2>
          <CommandList/>
          <h2>Routes</h2>
          <RouteList/>
        </nav>
      </div>
    )
  }
}

export default Page;