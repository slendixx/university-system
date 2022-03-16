module.exports = (arr, criteria) => {
    const newArr = arr.reduce(function (acc, currentValue) {
        if (!acc[currentValue[criteria]]) {
            acc[currentValue[criteria]] = [];
        }
        acc[currentValue[criteria]].push(currentValue);
        return acc;
    }, []);

    return newArr.filter((element) => element !== null);
};
