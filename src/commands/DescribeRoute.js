class DescribeRoute {
    execute(routePath) {
        return DescribeRoute.routesConfig.filter((route) => {
           return route.route == routePath;
        })[0] || {};
    }

    static describe() {
        return {
            description: 'Returns the description of commands',
            input: {
                params: {
                    routeName: {
                        type: 'string',
                        description: "This is the name of the command",
                        default: 'DescribeRoute'
                    }
                }
            },
            output: {
                type: 'object',
                describe: {
                    "route": "string",
                    "command": [
                        "*..."
                    ],
                    "routeInput": [
                        [
                            {
                                "source": "string",
                                "key": "string",
                                "param": "string"
                            },
                            "..."
                        ],
                        "...?"
                    ],
                    "output": [
                        "string..."
                    ]
                }
            },
            configuration: [
                {
                    type: 'project_env',
                    file: 'routes.json'
                }
            ]
        }
    }
}
module.exports = {
    configure: (routesConfig) => {
        DescribeRoute.routesConfig = routesConfig;
        return DescribeRoute;
    },
    configuration: DescribeRoute.describe().configuration
};