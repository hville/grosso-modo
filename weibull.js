var cdf = require('norm-dist/cdf')

/**
 * LogNormal Distribution
 * @param {number} low - range lower bound
 * @param {number} high - range lower bound
 * @param {number} [prob] - confidence interval
 * @returns {Function} - random number generator
 */
module.exports = function(low, high, prob) {
	if (low <= 0 || high <= low) throw Error('Weibull values must be 0 < L < H')
	var p = prob ? 0.5 - prob/2 : 0.25,
			lnp = Math.log(p),
			lnq = Math.log(1-p),
			κ = Math.log(high/low) / Math.log(lnp/lnq), //κ==1/k
			λ = low/Math.pow(-lnq,κ)
	/**
 	 * @param {number} [zSeed]
	 * @returns {number}
	 */
	return function(zSeed) {
		var rnd = zSeed === undefined ? Math.random() : cdf(zSeed)
		return λ*Math.pow(-Math.log(1-rnd),κ)
	}
}
