<!-- markdownlint-disable MD036 MD041 -->

# grosso-modo

*random number generator for specified confidence interval*
**note that this uses a gaussian Z as seed and not the usual uniform U to facilitate the generation of correlated variables**

• [Example](#example) • [API](#api) • [License](#license)

## Example

```javascript
import {norm, logn} from 'grosso-modo'

const n = norm(2, 4)(),      // normal distribution with 50% of values between 2 and 4
      l = logn(2, 4, 0.9)(), // lognormal distribution with 90% of values between 2 and 4
```

## API

All distribution take `lower` and `upper` bounds along with a `probability` confidence interval that defaults to `50%`.

Method     | Arguments           | Returns                 | Notes
:-----     | :--------           | :------                 | :----
`.norm`    | `low, high [,prob]` | `rndNumberGenerator`    | Normal distribution
`.logn`    | `low, high [,prob]` | `rndNumberGenerator`    | Lognormal distribution
`.uniform` | `low, high [,prob]` | `rndNumberGenerator`    | Uniform distribution
`.weibull` | `low, high [,prob]` | `rndNumberGenerator`    | Weibull distribution
`.step`    | `fail,succ [,prob]` | `rndNumberGenerator`    | Bernouilli trial `P(X == succ)`
`.dice`    | `min, max`          | `rndNumberGenerator`    | Uniform discrete distribution
`.dagum`   | `low, high [,prob]` | `rndNumberGenerator`    | Dagum distribution of shape p=1
`.gumbel`  | `low, high [,prob]` | `rndNumberGenerator`    | Gumbel distribution

Returned Function       | Arguments       | Returns  | Notes
:----------------       | :--------       | :------  | :----
`rndNumberGenerator`    | `[zSeed]`       | `Number` | Random number

Where `zSeed` is an optional unit normal distribution number

# License

[MIT](http://www.opensource.org/licenses/MIT) © [Hugo Villeneuve](https://github.com/hville)
