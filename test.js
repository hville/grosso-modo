/*eslint-env node, es6*/
'use strict'
var t = require('cotest'),
		gm = require('./grosso-modo'),
		ls = require('lazy-stats'),
		rz = require('random-z')

t('single output', () => {
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

t('aggregate output', () => {
	var norm = gm.norm(1, 2),
			logn = gm.logn(1, 2),
			step = gm.step(1, 2),
			rate = gm.rate(1, 2),
			stat = ls(5)
	for (var i=1; i<1000; ++i) {
		stat.push(
			norm(),
			logn(),
			step(),
			(gm.walk(1, 2)(i) - 1.5)/Math.sqrt(i),
			(Math.log(gm.rate(1, 2)(i)) - 1.5)/Math.sqrt(i)
		)
	}
	t('<', Math.abs(stat.ave(0) - 1.5), 0.1)
	t('<', Math.abs(stat.ave(1) - Math.log((Math.exp(2)+Math.exp(1))/2)), 0.1)
	t('<', Math.abs(stat.ave(2) - 1.5), 0.1)
	t('<', Math.abs(stat.ave(3) - 0), 0.1)
	t('<', Math.abs(stat.ave(4) - 0), 0.1)

	t('<', Math.abs(stat.cor(0,1)), 0.1)
	t('<', Math.abs(stat.cor(0,2)), 0.1)
	t('<', Math.abs(stat.cor(0,3)), 0.1)
	t('<', Math.abs(stat.cor(0,4)), 0.1)
	t('<', Math.abs(stat.cor(1,2)), 0.1)
	t('<', Math.abs(stat.cor(1,2)), 0.1)
	t('<', Math.abs(stat.cor(1,3)), 0.1)
	t('<', Math.abs(stat.cor(1,4)), 0.1)
	t('<', Math.abs(stat.cor(2,3)), 0.1)
	t('<', Math.abs(stat.cor(2,4)), 0.1)
	t('<', Math.abs(stat.cor(3,4)), 0.1)
})
