import React from 'react';

class Builder extends React.Component {
  render() {
    return (
      <div className="homePage">
        <h1>Router Builder</h1>
        <form>
          <label>Router URL: <input type="text" defaultValue="/adder/:num1/:num2"/></label>
          <br/>
          <label>Method: <select>
            <option>GET</option>
            <option>POST</option>
          </select></label>
          <fieldset>
            <legend>:num1</legend>
            <label>Description: <input type="text"/></label>
            <br />
            <label>Data Type: <select>
              <option>String</option>
              <option>Number</option>
              <option>Time?</option>
            </select>
            </label>
          </fieldset>
          <fieldset>
            <legend>:num2</legend>
            <label>Description: <input type="text"/></label>
            <br />
            <label>Data Type: <select>
              <option>String</option>
              <option>Number</option>
              <option>Time?</option>
            </select>
            </label>
          </fieldset>

          <button>Create Route</button>
        </form>
      </div>
    )
  }
}

export default Builder