var rndZ = require('random-z'),
		N = require('norm-dist'),
		WalkZ = require('walk-z')

//P(low <= X < high)
module.exports = {
	norm: norm,
	logn: logn,
	step: step,
	walk: walk,
	rate: rate,
}

function norm(low, high, prob) {
	var mu = (high + low) / 2,
			si = (high - low) / (-2 * N.icdf( (1 - (prob || 0.5)) / 2 ))

	return function(zSeed) {
		return mu + seed(zSeed) * si
	}
}

function logn(low, high, prob) {
	var mu = Math.log(high*low) / 2,
			si = Math.log(high/low) / (-2 * N.icdf( (1 - (prob || 0.5)) / 2 ))

	return function(zSeed) {
		return Math.exp(mu + seed(zSeed) * si)
	}
}

function step(low, high, prob) {
	var edge = N.icdf(prob || 0.5)

	return function(zSeed) {
		return (seed(zSeed) > edge) ? high : low
	}
}

function walk(low, high, prob) {
	var wk = WalkZ(),
			mu = (high + low) / 2,
			si = (high - low) / (-2 * N.icdf( (1 - (prob || 0.5)) / 2 ))

	return function(time, zSeed) {
		return mu + wk(time, seed(zSeed)) * si
	}
}

function rate(low, high, prob) {
	var wk = WalkZ(),
			mu = Math.log(high*low) / 2,
			si = Math.log(high/low) / (-2 * N.icdf( (1 - (prob || 0.5)) / 2 ))

	return function(time, zSeed) {
		return Math.exp(mu + wk(time, seed(zSeed)) * si)
	}
}

function seed(zSeed) {
	return zSeed === undefined ? rndZ() : zSeed
}
