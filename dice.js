var icdf = require('norm-dist/icdf')

/**
 * Dice
 * @param {number} min - range lower bound
 * @param {number} max - range lower bound
 * @returns {Function} - random number generator
 */
module.exports = function(min, max) {
	var size = max - min + 1, //eg. 6-1+1 = 6
			refs = []
	for (var i=1; i<size; ++i) refs[i-1] = icdf(i/size) //eg [Q(1/6), Q(2/6), Q(3/6), Q(4/6), Q(5/6)]
	refs[i-1] = Infinity
	/**
 	 * @param {number} [zSeed]
	 * @returns {number}
	 */
	return function(zSeed) {
		if (zSeed === undefined) return min + Math.floor(Math.random()*size)
		var k = 0
		while(zSeed > refs[k]) ++k
		return min + k
	}
}