import React from 'react';
import {Link} from 'react-router'

class RouteList extends React.Component {
  constructor(props) {
    super(props);
    this.state = RouteList.initialState();
  }

  static initialState() {
    return {
      data: []
    }
  }

  componentDidMount() {
    $.getJSON('/routes', (data) => {
      this.setState({data})
    });
  }

  render() {
    let items = this.state.data.map((item, key) =>
      <li key={key}><Link to={'/route/' + encodeURIComponent(item)}>{item}</Link></li>
    );

    return (
      <ul>
        {items}
      </ul>
    )
  }
}

export default RouteList