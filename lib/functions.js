function uniq(arr) {
    var seen = {};
    return arr.filter(item => seen.hasOwnProperty(item) ? false : (seen[item] = true))
}

module.exports = {uniq}