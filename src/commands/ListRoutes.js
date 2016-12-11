const commands = new Map();

// const routeList = require('../../etc/routes.json');

class ListRoutes {
    execute(v) {
        const routeList = [];
        ListRoutes.routesConfig.forEach((routeConfig) => {
            routeList.push(routeConfig.route);
        });

        return routeList;
    }

    static describe() {
        return {
            description: "Returns a list of the available commands",
            input: {
                params: {}
            },
            output: {
                type: 'map'
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

module.exports = (routesConfig) => {
    ListRoutes.routesConfig = routesConfig;
    return ListRoutes;
};