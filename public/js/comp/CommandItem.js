import React from 'react';
import ParamList from './ParamList'


class CommandItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.getInitialState();
  }
  getInitialState() {
    return {
      data: {
        command:     '',
        description: '',
        input:       {
          params: []
        },
        output:      {
          type: ''
        }
      }
    }
  }

  componentDidMount() {
    $.getJSON( '/command/' + this.props.params.command, data => this.setState( { data: data } ) );
  }

  render() {
    return (
      <div className="homePage">
        <h1>Command: {this.props.params.command}</h1>
        <h2>Description</h2>
        <p>{this.state.data.description ? this.state.data.description : 'Description not found.'}</p>
        <h2>Parameters</h2>
        <ParamList paramList={this.state.data.input.params}/>
        <h2>Output</h2>
        <p>{this.state.data.output.type}</p>
      </div>
    )
  }
}


export default CommandItem;