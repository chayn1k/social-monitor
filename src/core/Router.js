import invariant from 'invariant';
import React, { PropTypes } from 'react';
import { Router as ParentRouter } from 'react-router';
import RoutingContext from './RoutingContext';


class Router extends ParentRouter {

    static displayName = 'overrideRouter';

    render() {
        const { location, routes, params, components } = this.state;
        const { RoutingContext, createElement, context, ...props } = this.props;

        if (location === null) {
            return null; // Async match
        }

        // Only forward non-Router-specific props to routing context, as those are
        // the only ones that might be custom routing context props.
        Object.keys(Router.propTypes).forEach(propType => delete props[propType]);

        return React.createElement(RoutingContext, {
            ...props,
            history: this.history,
            createElement,
            location,
            routes,
            params,
            components,
            context
        });
    }

}

Router.defaultProps = {
    RoutingContext
};

Router.propTypes.context = PropTypes.object;

export default Router;
