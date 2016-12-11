import React from 'react';


class RouteInputItem extends React.Component {
  render() {
    return (
      <ul>
        <li>Source: {this.props.route.source}</li>
        <li>Key: {this.props.route.key}</li>
        <li>Param: {this.props.route.param}</li>
      </ul>
    );
  }
}

export default RouteInputItem