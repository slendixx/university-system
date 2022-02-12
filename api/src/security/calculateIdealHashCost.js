const bcrypt = require('bcrypt');
/**
 *  This function runs a micro-benchmark to figure out how fast the CPU is.
 *  The target is for a bcrypt hash to take at least 250 ms.
 */
const TARGET_HASH_DURATION_MS = 250;

module.exports = async () => {
    let cost = 8;
    const startTime = Date.now();
    await bcrypt.hash('microbenchmark', cost);
    const endTime = Date.now();
    let hashDuration = endTime - startTime;
    //Increasing cost by 1 would double the run time.
    //Keep increasing cost until the estimated duration is over 250 ms
    while (hashDuration <= TARGET_HASH_DURATION_MS) {
        cost += 1;
        hashDuration *= 2;
    }

    return cost;
};
