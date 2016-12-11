import React from 'react';
import CommandListItem from './CommandListItem'
import RouteInputItemList from './RouteInputItemList'

class RouteItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = RouteItem.initialState();
  }

  static initialState() {
    return {
      data: {
        route: '',
        command: [],
        commandString: '',
        routeInput: []
      }
    }
  }

  componentDidMount() {
    const encodedRoute = encodeURIComponent(this.props.params.route);
    $.getJSON('/route/' + encodedRoute, data => this.setState({data: data}));
  }

  render() {
    return (
      <div className="homePage">
        <h1>Route: {this.state.data.route}</h1>
        <p>Commands: <CommandListItem commandList={this.state.data.command}/></p>
        <RouteInputItemList routeInput={this.state.data.routeInput || []}
                            commands={this.state.data.command}/>
      </div>
    )
  }
}

export default RouteItem