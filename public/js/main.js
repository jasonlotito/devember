function ParamList(props) {
    const paramList = props.paramList;
    const paramListItems = Object.keys(paramList).map(paramName => {
        const param = paramList[paramName];
        return (
            <ul>
                <li>Param Name: {paramName}</li>
                <li>Type: {param.type}</li>
                <li>Description: {param.description}</li>
                <li>Default Value: {param.default}</li>
            </ul>)
    });

    return (<span>{paramListItems}</span>);
}

let CommandItem = React.createClass({
    getInitialState: function () {
        return {
            data: {
                command: '',
                description: '',
                input: {
                    params: []
                },
                output: {
                    type: ''
                }
            }
        }
    },
    componentDidMount: function () {
        console.log(this)
        $.getJSON('/command/' + this.props.params.command, (data) => {
            console.log(data);
            this.setState({data: data})
        });
    },
    render: function () {
        return (
            <div>
                <h1>Command: {this.props.params.command}</h1>
                <h2>Description</h2>
                <p>{this.state.data.description ? this.state.data.description : 'Description not found.'}</p>
                <h2>Parameters</h2>
                <ParamList paramList={this.state.data.input.params}/>
                <h2>Output</h2>
                <p>{this.state.data.output.type}</p>
            </div>)
    }
});

function RouteInputItem(data) {
    const route = data.route;
    return (
        <ul>
            <li>Source: {route.source}</li>
            <li>Key: {route.key}</li>
            <li>Param: {route.param}</li>
        </ul>
    );
}

function RouteInputItemList(props) {
    console.log(props);
    const routeInput = props.routeInput.map((routeInputs, k) => {
        const commandName = props.commands[k];

        const inputLists = routeInputs.map((route, keyId) => {
            console.log(route);
            return (
                <ul>
                    <li>
                        Param {keyId}
                        <RouteInputItem route={route}/>
                    </li>
                </ul>
            )
        });

        const href = `/command/${commandName}`;
        return (<ul key={k}>
            <li><Link to={href}>{commandName}</Link> {inputLists}</li>
        </ul>)
    });

    return (<div>{routeInput}</div>)
}

function CommandListItem(data) {
    console.log(data);
    const commandList = data.commandList.map( command => {
        const href = `/command/${command}`;
        return (<li><Link to={href}>{command}</Link></li>);
    });

    return (
        <ul className="route-command-list">{commandList}</ul>
    )
}

let RouteItem = React.createClass({
    getInitialState: function () {
        return {
            data: {
                route: '',
                command: [],
                commandString: '',
                routeInput: []
            }
        }
    },
    componentDidMount: function () {
        $.getJSON('/route/' + encodeURIComponent(this.props.params.route), data => {
            this.setState({data: data});
        });
    },
    render: function () {
        return (
            <div>
                <h1>Route: {this.state.data.route}</h1>
                <p>Commands: <CommandListItem commandList={this.state.data.command}/></p>
                <RouteInputItemList routeInput={this.state.data.routeInput} commands={this.state.data.command}/>
            </div>
        )
    }
});

let CommandList = React.createClass({
    getInitialState: function () {
        return {
            data: []
        }
    },
    componentDidMount: function () {
        $.getJSON('/commands', (data) => {
            this.setState({data})
        });
    },
    handleClick: function (e) {
        // e.preventDefault();
    },
    render: function () {
        let items = this.state.data.map((item, key) => {
            const href = '/command/' + encodeURIComponent(item);
            return (
                <li key={key}><Link to={href}>{item}</Link></li>
            )
        });

        return (
            <ul>
                {items}
            </ul>
        )
    }
});

let RouteList = React.createClass({
    getInitialState() {
        return {
            data: []
        }
    },
    componentDidMount: function () {
        $.getJSON('/routes', (data) => {
            this.setState({data})
        });
    },
    render: function () {
        let items = this.state.data.map((item, key) => {
            const href = '/route/' + encodeURIComponent(item);
            return (
                <li key={key}><Link to={href}>{item}</Link></li>
            )
        });

        return (
            <ul>
                {items}
            </ul>
        )
    }
});

let Page = React.createClass({
    render: function () {
        return (
            <div className="homePage">
                <h1>Home</h1>
                <nav>
                <h2>Commands</h2>
                <CommandList/>
                <h2>Routes</h2>
                <RouteList/>
                </nav>
            </div>
        )
    }
});
let App = React.createClass({
    render: function () {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
});

var {
    browserHistory,
    Router,
    Route,
    IndexRoute,
    IndexLink,
    Link
} = ReactRouter;

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Page}/>
            <Route path="Route/:route" component={RouteItem}/>
            <Route path="Command/:command" component={CommandItem}/>
        </Route>
    </Router>,
    document.getElementById('content')
);