module.exports.generateDatetime = (date) => {
    return date.toISOString().slice(0, 19).replace('T', ' ');
};

module.exports.generateDate = (date) => {
    return date.toISOString().split('T')[0];
};
