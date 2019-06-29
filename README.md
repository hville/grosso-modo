<!-- markdownlint-disable MD036 MD041 -->

# grosso-modo

*random number generator for specified confidence interval*

• [Example](#example) • [API](#api) • [License](#license)

## Example

```javascript
var dist = require('grosso-modo')

var norm = dist.norm(2, 4), //same as require('grosso-modo/norm')(2, 4)
    n = norm() // normal distribution with 50% of values between 2 and 4

var logn = dist.logn(2, 4, 0.9),
    l = logn() // lognormal distribution with 90% of values between 2 and 4

var step = dist.step(2, 4, 0.3),
    s = step() // either 2, 70% of the time or 4, 30% of the time

var walk = dist.walk(2, 4, 0.8),
    w = step(1) // random walk at time=1, between 2 and 4 80% of the time
```

## API

All distribution take `lower` and `upper` bounds along with a `probability` confidence interval that defaults to `50%`.

Method  | Arguments           | Returns                 | Notes
:------ | :--------           | :------                 | :----
`.norm` | `low, high [,prob]` | `rndNumberGenerator`    | Normal distribution `P(L < X < H)`
`.logn` | `low, high [,prob]` | `rndNumberGenerator`    | LogNormal distribution `P(L < X < H)`
`.step` | `fail,succ [,prob]` | `rndNumberGenerator`    | Bernouilli trial `P(X == succ)`
`.dice` | `min, max`          | `rndNumberGenerator`    | Uniform discrete distribution
`.walk` | `low, high [,prob]` | `rndTimeSerieGenerator` | Random Walk sum, `P(time==1; L<X<H)`
`.rate` | `low, high [,prob]` | `rndTimeSerieGenerator` | Random Walk product, `P(time==1; L<X<H)`


Returned Function       | Arguments       | Returns  | Notes
:-------                | :--------       | :------  | :----
`rndNumberGenerator`    | `[zSeed]`       | `Number` | Random number |
`rndTimeSerieGenerator` | `time [,zSeed]` | `Number` | Random number at specified time |

Where `zSeed` is an optional unit normal distribution number


# License

[MIT](http://www.opensource.org/licenses/MIT) © [Hugo Villeneuve](https://github.com/hville)
