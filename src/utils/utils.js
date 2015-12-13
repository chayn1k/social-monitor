import _ from 'lodash';

/**
 * @param {Array} percents
 * @param {Number} target
 * @returns {Array}
 */
export function smartRoundPercentages(percents, target) {
    const off = target - _.reduce(percents, (acc, val) => acc + Math.round(val), 0);
    return _.chain(percents)
        .map((val, index) => Math.round(val) + (off > index) - (index >= (percents.length + off)))
        .value();
}


export default {
    smartRoundPercentages
};
