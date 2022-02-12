import icdf from 'norm-dist/icdf-voutier.js'

/**
 * random dice
 * @param {number} min - lowest integer
 * @param {number} max - highest integer
 * @returns {number => number} - random number generator
 */
export default function(min, max) {
	if (max <= min) throw Error('max <= min')
	if (max%1 || min%1) throw Error('min and max must be integers')
	const size = max - min + 1, //eg. 6-1+1 = 6
				refs = []
	let i=1 //TODO while
	for (; i<size; ++i) refs[i-1] = icdf(i/size) //eg [Q(1/6), Q(2/6), Q(3/6), Q(4/6), Q(5/6)]
	refs[i-1] = Infinity

	/**
 	 * @param {number} [zSeed]
	 * @returns {number}
	 */
	return function(zSeed) {
		if (zSeed === undefined) return min + Math.floor(Math.random()*size)
		let k = 0
		while(zSeed > refs[k]) ++k
		return min + k
	}
}
