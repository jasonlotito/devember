import React from 'react';
import {Link} from 'react-router'

class CommandListItem extends React.Component {
  render() {
    console.log( 'CommandList', this.props.commandList );
    const commandList = this.props.commandList.map( commandName =>
      <li key={commandName}><Link to={'/command/' + commandName}>{commandName}</Link></li>
    );

    return (
      <ul className="route-command-list">{commandList}</ul>
    )
  }
}

export default CommandListItem