import React from 'react';

class ParamList extends React.Component {
  render() {
    const paramList = this.props.paramList;
    const paramListItems = Object.keys(paramList).map(paramName => {
      const param = paramList[paramName];
      return (
        <ul key={paramName}>
          <li>Param Name: {paramName}
            <ul>
              <li>Type: {param.type}</li>
              <li>Description: {param.description}</li>
              <li>Default Value: {param.default}</li>
            </ul>
          </li>
        </ul>)
    });

    return (<span>{paramListItems}</span>);
  }
}

export default ParamList;