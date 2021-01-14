/**
 * Throw a Set to it and a function which can generate promises
 * and it will call them sequentially, one after another
 */
module.exports = function (items, consumer) {
    const results = [];
    const iterator = items.values();
    const runner = function() {
        const item = iterator.next().value;
        if (item) {
        return consumer(item)
            .then(function(result) {
            results.push(result);
            })
            .then(runner);
        }
        return Promise.resolve(results);
    };
    return runner();
};
  