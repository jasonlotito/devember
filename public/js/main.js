let CommandList = React.createClass({
    getInitialState() {
        return {
            data: []
        }
    },
    componentDidMount: function () {
        $.getJSON('/commands', (data) => {
            this.setState({data})
        });
    },
    render: function () {
        let items = this.state.data.map((item, key) => {
            const href = '/command?command=' + encodeURIComponent(item);
            return (
                <li key={key}><a href={href}>{item}</a></li>
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
            const href = '/route?route=' + encodeURIComponent(item);
            return (
                <li key={key}><a href={href}>{item}</a></li>
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
            <span>
            <h2>Commands</h2>
            <CommandList/>
            <h2>Routes</h2>
            <RouteList/>
            </span>
        )
    }
});

ReactDOM.render(
    <div>
        <Page/>
    </div>,
    document.getElementById('content')
);