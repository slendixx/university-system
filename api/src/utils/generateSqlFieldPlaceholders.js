const generateSQLFieldPlaceholders = (list) => {
    let result =
        '(' +
        list
            .map(() => {
                return '?,';
            })
            .join('') +
        ')';
    result = result.replace('?,)', '?)');
    return result;
};

module.exports = generateSQLFieldPlaceholders;
