import cdf from 'norm-dist/cdf.js'

/**
 * Weibull Distribution
 * @param {number} low - range lower bound
 * @param {number} high - range lower bound
 * @param {number} [prob] - confidence interval
 * @returns {number => number} - random number generator
 */
 export default function(low, high, prob=0.5) {
	if (high <= low) throw Error('high <= low')
	if (high*low <= 0) throw Error('range must not cross 0')
	const p = (1 - prob)/2,
				lnp = Math.log(p),
				lnq = Math.log(1-p),
				κ = Math.log(low > 0 ? high/low : low/high) / Math.log(lnp/lnq), //κ==1/k
				λ = (low > 0 ? low : high)/Math.pow(-lnq,κ)

	/**
 	 * @param {number} [zSeed]
	 * @returns {number}
	 */
	return low > 0 ?
	function(zSeed) {
		const p = zSeed === undefined ? Math.random() : cdf(zSeed)
		return λ*Math.pow(-Math.log(1-p),κ)
	}
	: function(zSeed) {
		const p = zSeed === undefined ? Math.random() : cdf(-zSeed)
		return λ*Math.pow(-Math.log(1-p),κ)
	}
}
