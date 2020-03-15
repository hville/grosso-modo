/* eslint-env node, es6*/
'use strict'
var t = require('cotest'),
		gm = require('./'),
		LS = require('lazy-stats')

gm.dice(1,6)()

t('single output', t => {
	var rndVar = gm.norm(2, 3, 0.999)
	t('>', rndVar(), 1)
	t('<', rndVar(), 4)
	rndVar = gm.logn(2, 3, 0.999)
	t('>', rndVar(), 1)
	t('<', rndVar(), 4)
	rndVar = gm.step(2, 3, 0.999)
	t('>=', rndVar(), 2)
	t('<=', rndVar(), 3)
	rndVar = gm.walk(2, 3, 0.999)
	t('>', rndVar(1), 1)
	t('<', rndVar(1), 4)
	rndVar = gm.rate(2, 3, 0.999)
	t('>', rndVar(1), 1)
	t('<', rndVar(1), 4)
})

t('aggregate output', t => {
	var norm = gm.norm(1, 2),
			logn = gm.logn(1, 2),
			step = gm.step(1, 2),
			weib = gm.weibull(1, 2),
			stat = new LS(6)
	for (var i=1; i<2000; ++i) {
		stat.push(
			norm(),
			logn(),
			step(),
			(gm.walk(1, 2)(i) - 1.5)/Math.sqrt(i),
			(Math.log(gm.rate(1, 2)(i)) - 1.5)/Math.sqrt(i),
			weib(),
		)
	}
	t('<', Math.abs(stat.ave(0) - 1.5), 0.1)
	t('<', Math.abs(stat.ave(1) - Math.log((Math.exp(2)+Math.exp(1))/2)), 0.1)
	t('<', Math.abs(stat.ave(2) - 1.5), 0.1)
	t('<', Math.abs(stat.ave(3) - 0), 0.1)
	t('<', Math.abs(stat.ave(4) - 0), 0.1)
	t('>', stat.ave(5), 1.5, 'skewed')
})
t('lower confidence => greater range', t => {
	t('>', gm.norm(1, 3, 0.89)(0.1), gm.norm(1, 3, 0.91)(0.1))
	t('<', gm.norm(1, 3, 0.89)(-0.1), gm.norm(1, 3, 0.91)(-0.1))
	t('>', gm.logn(1, 3, 0.89)(0.1), gm.logn(1, 3, 0.91)(0.1))

	t('<', gm.logn(1, 3, 0.89)(-0.1), gm.logn(1, 3, 0.91)(-0.1))
})
t('greater seed => greater value', t => {
	t('>', gm.norm(-1, 1, 0.8)(0.3), gm.norm(-1, 1, 0.8)(0.2))
	t('>', gm.norm(-1, 1, 0.8)(-0.2), gm.norm(-1, 1, 0.8)(-0.3))

	t('>', gm.logn(1, 2, 0.8)(0.3), gm.logn(1, 2, 0.8)(0.2))
	t('>', gm.logn(1, 2, 0.8)(-0.2), gm.logn(1, 2, 0.8)(-0.3))

	t('>', gm.step(1, 2)(0.9), gm.step(1, 2)(-0.9))

	t('>', gm.dice(1, 2)(0.9), gm.dice(1, 2)(-0.9))
	t('>', gm.dice(1, 6)(0.5), gm.dice(1, 6)(-0.5))
	t('==', gm.dice(1, 6)(-Infinity), 1)
	t('==', gm.dice(1, 6)(Infinity), 6)
	t('==', gm.dice(1, 6)(-Number.EPSILON), 3)
	t('==', gm.dice(1, 6)(Number.EPSILON), 4)
})
t('step', t => {
	t('<', gm.step(1, 2, 0.1)(0), gm.step(1, 2, 0.9)(0), 'low confidence, low success')
})
t('weibull', t => {
	var wb = gm.weibull(13, 38, 0.5)
	t('<', wb(-0.675), 13)
	t('>', wb(+0.675), 38)
	var wb = gm.weibull(10, 11)
	t('<', wb(0), 11)
	t('>', wb(0), 10)

})
