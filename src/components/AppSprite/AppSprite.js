/* Converted https://theadd.github.io/svg2react/ */
import React, { Component } from 'react';

class AppSprite extends Component {

    linkAs = (key, attrs) => (
        (this.__cb4r3fs || (this.__cb4r3fs = new Map())).get(key) || this.__cb4r3fs.set(key, node => (
            this.refs[key] !== node && (this.refs = Object.assign({}, this.refs, {[key]: node})),
            node && Object.keys(attrs).forEach(attr => node.setAttributeNS(null, attr, attrs[attr]))
        )).get(key)
    );

    render() {
        console.log('render@AppSprite:14', this.linkAs('path0', { 'clip-rule': 'evenodd', 'fill-rule': 'evenodd' }));
        return (
            <svg ref={ this.linkAs('ei-sprite', {}) } id="ei-sprite" style={{ display: 'none' }} >
                <symbol ref={ this.linkAs('twitter-icon', {}) } viewBox="0 0 50 50" id="twitter-icon" >
                    <path d="M47.992 11.154c-1.73.787-3.463 1.26-5.51 1.574 1.89-1.26 3.464-2.99 4.25-5.195a21.544 21.544 0 0 1-5.98 2.362c-1.733-1.89-4.252-2.99-6.928-2.99-5.196 0-9.604 4.25-9.604 9.602 0 .787.158 1.417.315 2.204-7.87-.313-14.956-4.25-19.68-9.916-.785 1.1-1.257 2.676-1.257 4.406 0 3.307 1.732 6.298 4.25 7.872-1.574 0-2.99-.472-4.25-1.26v.158c0 4.566 3.306 8.502 7.714 9.29-.786.156-1.573.314-2.518.314-.63 0-1.26 0-1.732-.158 1.26 3.778 4.723 6.612 8.974 6.612-3.306 2.52-7.4 4.093-11.807 4.093-.79 0-1.576 0-2.205-.155C5.8 42.955 10.84 44.53 16.19 44.53c17.476 0 27.08-14.484 27.08-27.08v-1.258c1.89-1.417 3.463-2.99 4.722-5.038z" />
                </symbol>
                <symbol ref={ this.linkAs('instagram-icon', {}) } viewBox="0 0 50 50" id="instagram-icon" >
                    <path ref={ this.linkAs('path0', { 'clip-rule': 'evenodd', 'fill-rule': 'evenodd' }) } d="M7.313 2.013c-3.006 0-5.304 2.298-5.304 5.304v35.37c0 3.006 2.296 5.304 5.302 5.304h35.37c3.006 0 5.304-2.296 5.304-5.302V7.318c0-3.007-2.298-5.305-5.304-5.305H7.312zm28.295 5.304h5.307c1.06 0 1.768.707 1.768 1.768v5.307c0 1.06-.707 1.768-1.768 1.768h-5.307c-1.06 0-1.768-.707-1.768-1.768V9.085c0-1.06.707-1.768 1.768-1.768zm-10.61 8.843c4.953 0 8.842 3.89 8.842 8.84 0 4.952-3.89 8.844-8.84 8.844-4.952 0-8.844-3.892-8.844-8.843 0-4.95 3.892-8.84 8.843-8.84zM7.314 21.465h4.068c-.353 1.06-.528 2.298-.528 3.536 0 7.783 6.366 14.15 14.147 14.15 7.78 0 14.147-6.367 14.147-14.148 0-1.237-.178-2.474-.53-3.535h4.067v19.45c0 1.062-.707 1.772-1.768 1.772H9.086c-1.063 0-1.773-.71-1.773-1.77V21.463z" />
                </symbol>
            </svg>
        );
    }
}

export default AppSprite;
