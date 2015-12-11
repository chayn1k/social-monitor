import React, { Component, PropTypes } from 'react';
import AppSprite from '../AppSprite';


class Html extends Component {

    static propTypes = {
        title: PropTypes.string,
        description: PropTypes.string,
        css: PropTypes.string,
        body: PropTypes.string.isRequired
    };

    static defaultProps = {
        title: '',
        description: ''
    };

    render() {
        return (
            <html className="no-js" lang="">
            <head>
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <title>{this.props.title}</title>
                <meta name="description" content={this.props.description} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="apple-touch-icon" href="apple-touch-icon.png" />
                <style id="css" dangerouslySetInnerHTML={{__html: this.props.css}} />
            </head>
            <body>
                <AppSprite id="app-svg-icons" />
                <div id="app" dangerouslySetInnerHTML={{__html: this.props.body}}></div>
                <script src="/app.js"></script>
            </body>
            </html>
        );
    }

}

export default Html;
