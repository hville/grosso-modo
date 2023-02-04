import cdf from 'norm-dist/cdf.js'

/**
 * Gumbel Distribution
 * https://en.wikipedia.org/wiki/Gumbel_distribution
 * @param {number} low - range lower bound
 * @param {number} high - range lower bound
 * @param {number} [prob] - confidence interval
 * @returns {number => number} - random number generator
 */
 export default function(low, high, prob=0.5) {
	if (high <= low) throw Error('high <= low')
	const p = (1 - prob)/2,
				lnln1p = Math.log(-Math.log(p)),
				lnln1q = Math.log(-Math.log(1-p)),
				s = ( high - low ) / (lnln1q - lnln1p),
				m = ( high*lnln1p - low*lnln1q ) / ( lnln1p - lnln1q )

	/**
 	 * @param {number} [zSeed]
	 * @returns {number}
	 */
	return function(zSeed) {
		const p = zSeed === undefined ? Math.random() : cdf(zSeed)
		return m + s * Math.log(-Math.log(p))
	}
}
