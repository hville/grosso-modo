import icdf from 'norm-dist/icdf.js'

/**
 * lognormal distribution
 * @param {number} low - range lower bound
 * @param {number} high - range lower bound
 * @param {number} [prob] - confidence interval
 * @returns {number => number} - random number generator
 */
export default function(low, high, prob=0.5) {
	if (high <= low) throw Error('high <= low')
	const hl = high*low
	if (hl <= 0) throw Error('range must not cross 0')
	const mu = Math.log(hl) / 2,
				si = Math.log(low > 0 ? high/low : low/high) / 2 / icdf( (prob + 1) / 2 )

	/**
 	 * @param {number} [zSeed]
	 * @returns {number}
	 */
	return low > 0 ?
	function(zSeed) {
		return Math.exp((zSeed === undefined ? icdf(Math.random()) : zSeed) * si + mu)
	}
	: function(zSeed) {
		return -Math.exp(-(zSeed === undefined ? icdf(Math.random()) : zSeed) * si + mu)
	}
}
