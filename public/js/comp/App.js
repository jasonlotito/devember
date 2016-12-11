import React from 'react';
import {Link} from 'react-router';

class App extends React.Component {
  render() {
    return (
      <div>
        <ul className="mainNav">
          <li><Link className="homePageLink" to={'/'}>Devember</Link></li>
          <li><Link to={'/builder'}>Router Builder</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
}

export default App;