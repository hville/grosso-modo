import icdf from 'norm-dist/icdf.js'
import t from 'assert-op'
import a from 'assert-op/assert.js'
import {norm, logn, step, dice, weibull, uniform} from './index.js'
import LS from 'lazy-stats'

function test(fn,rp,rq, ci) {
	const rg = fn(rp,rq, ci),
				xp = rg(icdf( (1-ci)/2 )),
				xq = rg(icdf( (1+ci)/2 ))
	//console.log(rg(-Infinity), xp, rg(0), xq, rg(Infinity))
	a('<=', rg(-Infinity), xp, 'monotonic')
	a('<', xp, rg(0), 'monotonic')
	a('<', rg(0), xq, 'monotonic')
	a('<=', xq, rg(Infinity), 'monotonic')
	a('<', Math.abs(xp-rp), 1e-6, 'correct lower range')
	a('<', Math.abs(xq-rq), 1e-6, 'correct upper range')
}
t('norm', a => {
	test(norm, -1,1,0.5)
	test(norm, -1,1,0.8)
	test(norm, -2,-1,0.5)
	test(norm, 1,2,0.5)
	a('throws', ()=>norm(1,-1))
})
t('uniform', a => {
	test(uniform, -1,1,0.5)
	test(uniform, -2,-1,0.5)
	test(uniform, 1,2,0.5)
	test(uniform, 1,2,0.8)
	a('throws', ()=>uniform(1,-1))
})
t('logn', a => {
	test(logn, 1,2,0.5)
	test(logn, 1,2,0.8)
	test(logn, -2,-1,0.5)
	a('throws', ()=>logn(2,1))
	a('throws', ()=>logn(-1,2))
})
t('weibull', a => {
	test(weibull, 1,2,0.5)
	test(weibull, 1,2,0.8)
	test(weibull, -2,-1,0.5)
	a('throws', ()=>weibull(2,1))
	a('throws', ()=>weibull(-1,2))
})
t('dice', a => {
	test(dice, -1,8,.9)
	test(dice, -4,-1,.9)
	test(dice, 1,4,.9)
	a('throws', ()=>dice(1,-1))
})

t('step', a => {
	a('<', step(1, 2, 0.1)(0), step(1, 2, 0.9)(0), 'low confidence, low success')
})
