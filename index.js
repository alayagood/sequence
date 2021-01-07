/**
 * Throw a Set to it and a function which can generate promises
 * and it will call them sequentially, one after another
 */
export default (items, consumer) => {
    const results = [];
    const iterator = items.values();
    const runner = () => {
        const item = iterator.next().value;
        if (item) {
        return consumer(item)
            .then((result) => {
            results.push(result);
            })
            .then(runner);
        }
        return Promise.resolve(results);
    };
    return runner();
};
  