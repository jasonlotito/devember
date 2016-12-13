"use strict";
var React = require("react");
var ReactDOM = require("react-dom");
var react_router_1 = require("react-router");
var CommandItem = require("./comp/CommandItem");
var RouteItem = require("./comp/RouteItem");
var Page = require("./comp/Page");
var App = require("./comp/App");
var Builder = require("./comp/Builder");
ReactDOM.render(React.createElement(react_router_1.Router, { history: react_router_1.browserHistory },
    React.createElement(react_router_1.Route, { path: "/", component: App },
        React.createElement(react_router_1.IndexRoute, { component: Page }),
        React.createElement(react_router_1.Route, { path: "route/:route", component: RouteItem }),
        React.createElement(react_router_1.Route, { path: "command/:command", component: CommandItem }),
        React.createElement(react_router_1.Route, { path: "builder", component: Builder }))), document.getElementById('content'));
//# sourceMappingURL=main.js.map