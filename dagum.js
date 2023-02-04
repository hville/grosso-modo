import cdf from 'norm-dist/cdf.js'

/**
 * Dagum Distribution shape k = 1
 * https://en.wikipedia.org/wiki/Dagum_distribution
 * @param {number} low - range lower bound
 * @param {number} high - range lower bound
 * @param {number} [prob] - confidence interval
 * @returns {number => number} - random number generator
 */
 export default function(low, high, prob=0.5) {
	if (high <= low) throw Error('high <= low')
	if (high*low <= 0) throw Error('range must not cross 0')
	const q_p = (1+prob)/(1-prob),
				H_L = low > 0 ? high/low : low/high, // <9:mean exist; <3 var exist
				_a = 0.5 * Math.log(H_L) / Math.log(q_p),
				b = (low > 0 ? low : high) * Math.pow(q_p,_a)
	/**
 	 * @param {number} [zSeed]
	 * @returns {number}
	 */
	return low > 0 ?
	function(zSeed) {
		const p = zSeed === undefined ? Math.random() : cdf(zSeed)
		return b*Math.pow(p/(1-p),_a)
	} :
	function(zSeed) {
		const p = zSeed === undefined ? Math.random() : cdf(-zSeed)
		return b*Math.pow(p/(1-p),_a)
	}
}

/*
F = 1/(1+(b/x)^a)
1/F - 1 = (1-F)/F = (b/x)^a
( 1/F - 1 )^( 1/a ) = b/x
x = b( F/(1-F) )^( 1/a )
*/
