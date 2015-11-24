
const Logger = () => {

    const prefix = date => {
        let _prefix = ['['];

        _prefix.push(('0' + date.getHours()).slice(-2));
        _prefix.push(':');
        _prefix.push(('0' + date.getMinutes()).slice(-2));
        _prefix.push(':');
        _prefix.push(('0' + date.getSeconds()).slice(-2));
        _prefix.push('.');
        _prefix.push(date.getMilliseconds());
        _prefix.push('] ');

        return _prefix.join('');
    };

    return {
        log: (...args) => console.log(prefix(new Date()), ...args),
        warn: (...args) => console.warn(prefix(new Date()), ...args),
        error: (...args) => console.error(prefix(new Date()), ...args),
        info: (...args) => console.info(prefix(new Date()), ...args)
    };
};

const logger = new Logger();
export default logger;
