import React from 'react';
import {Link} from 'react-router'

class CommandList extends React.Component {
  constructor(props) {
    super(props);
    this.state = CommandList.initialState();
  }

  static initialState() {
    return {
      data: []
    }
  }

  componentDidMount() {
    $.getJSON('/commands', data => this.setState({data}));
  }

  render() {
    let items = this.state.data.map((item, key) =>
      <li key={key}><Link to={'/command/' + item}>{item}</Link></li>
    );

    return (
      <ul>
        {items}
      </ul>
    )
  }
}

export default CommandList