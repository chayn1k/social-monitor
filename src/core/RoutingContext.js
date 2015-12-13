import invariant from 'invariant';
import React, { PropTypes } from 'react';
import { RoutingContext as ParentRoutingContext } from 'react-router';
import { isReactChildren } from '../../node_modules/react-router/lib/RouteUtils';
import getRouteParams from '../../node_modules/react-router/lib/getRouteParams';


class RoutingContext extends ParentRoutingContext {

    render() {
        const { history, location, routes, params, components, context } = this.props;
        let element = null;

        if (components) {
            /* eslint-disable no-shadow */
            element = components.reduceRight((element, components, index) => {
                if (components === null) {
                    return element; // Don't create new children; use the grandchildren.
                }

                const route = routes[index];
                const routeParams = getRouteParams(route, params);
                const props = {
                    history,
                    location,
                    params,
                    route,
                    routeParams,
                    routes,
                    context
                };

                if (isReactChildren(element)) {
                    props.children = element;
                } else if (element) {
                    for (const prop in element) if (element.hasOwnProperty(prop)) {
                        props[prop] = element[prop];
                    }
                }

                if (typeof components === 'object') {
                    const elements = {};

                    for (const key in components) {
                        if (components.hasOwnProperty(key)) {
                            // Pass through the key as a prop to createElement to allow
                            // custom createElement functions to know which named component
                            // they're rendering, for e.g. matching up to fetched data.
                            elements[key] = this.createElement(components[key], {
                                key, ...props
                            });
                        }
                    }

                    return elements;
                }

                return this.createElement(components, props);
            }, element);
        }

        invariant(
            element === null || element === false || React.isValidElement(element),
            'The root route must render a single element'
        );

        return element;
    }

}

RoutingContext.propTypes.context = PropTypes.object.isRequired;

export default RoutingContext;
