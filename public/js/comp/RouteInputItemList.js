import React from 'react';
import RouteInputItem from './RouteInputItem'
import {Link} from 'react-router'

class RouteInputItemList extends React.Component {
  render() {
    const routeInput = this.props.routeInput.map( ( routeInputs, k ) => {
      const commandName = this.props.commands[k];

      const inputLists  = routeInputs.map( ( route, keyId ) =>
        <ul key={keyId}>
          <li>
            Param {keyId}
            <RouteInputItem route={route}/>
          </li>
        </ul>
      );

      return (
        <ul key={k}>
          <li><Link to={'/command/' + commandName}>{commandName}</Link> {inputLists}</li>
        </ul>
      )
    } );

    console.log(routeInput);
    return (<div>{routeInput}</div>)
  }
}

export default RouteInputItemList