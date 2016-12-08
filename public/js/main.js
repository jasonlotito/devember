let CommandItem = React.createClass({
    getInitialState: function () {
        return {
            data: {
                command: '',
                description: ''
            }
        }
    },
    componentDidMount: function() {
        console.log(this)
        $.getJSON('/command/' + this.props.params.command, (data) => {
            console.log(data);
            this.setState({data:data})
        });
    },
    render: function () {
        console.log(this.state);
        return (
        <div>
            <h1>Command: {this.props.params.command}</h1>
            <h2>Description</h2>
            <p>{this.state.data.description ? this.state.data.description : 'Description not found.'}</p>

        </div>)
    }
});

let RouteItem = React.createClass({
    getInitialState: function () {
        return {
            data: {}
        }
    },
    componentDidMount: function() {

    },
    render: function () {
        return (
        <div>
            <h1>Route</h1>
        </div>)
    }
});

let CommandList = React.createClass({
    getInitialState: function() {
        return {
            data: []
        }
    },
    componentDidMount: function () {
        $.getJSON('/commands', (data) => {
            this.setState({data})
        });
    },
    handleClick: function(e) {
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
            <div>
                <h1></h1>
                <h2>Commands</h2>
                <CommandList/>
                <h2>Routes</h2>
                <RouteList/>
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

var { Router,
    Route,
    IndexRoute,
    IndexLink,
    Link } = ReactRouter;

ReactDOM.render(
    <Router>
        <Route path="/" component={App}>
            <IndexRoute component={Page}/>
            <Route path="route/:route" component={RouteItem} />
            <Route path="command/:command" component={CommandItem} />
        </Route>
    </Router>,
    document.getElementById('content')
);