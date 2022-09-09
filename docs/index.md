---
title: Home
nav_order: 1
---

[fp-ts](https://github.com/gcanti/fp-ts) bindings for [IxJS](https://github.com/ReactiveX/IxJS) asynciterable

# Implemented instances

- `Monad`
- `FunctorWithIndex`
- `Filterable`

# Example

```ts
import { from } from 'ix/asynciterable'
import { map } from 'fp-ts-ix/AsyncIterable'
import { pipe } from 'fp-ts/function'

const fa = pipe(
  from([1, 2, 3]),
  map(a => a * 2*),
)
// will emit 2, 4, 6
```

# Chain

Different `Chain` instances are provided in order to support `flatMap` (merge), `concatMap` and ` switchMap`:

```ts
import { from } from 'ix/asynciterable'
import { map, chain } from 'fp-ts-ix/AsyncIterable'
import { pipe } from 'fp-ts/function'
import * as AIc from 'fp-ts-ix/AsyncIterable/Concat'
import * as AIm from 'fp-ts-ix/AsyncIterable/Merge'
import * as AIs from 'fp-ts-ix/AsyncIterable/Switch'

const fa = pipe(
  from([1, 2]),
  chain(AIc.Chain)((a) => from([3, 4]))
)
// will emit 1, 2, 3, 4

const fb = pipe(
  from([1, 2]),
  chain(AIm.Chain)((a) => from([3, 4]))
)
// will emit 1, 3, 4, 4 (parallel processing)

const fc = pipe(
  from([1, 2]),
  chain(AIs.Chain)((a) => from([3, 4]))
)
// will emit 3, 4 (switchMap)

//
// Or you can use already provided pipable functions from Chain modules
//
const fa2 = pipe(
  from([1, 2]),
  AIc.chain((a) => from([3, 4]))
)
// will emit 1, 2, 3, 4

const fb2 = pipe(
  from([1, 2]),
  AIm.chain((a) => from([3, 4]))
)
// will emit 1, 3, 4, 4 (parallel processing)

const fb2 = pipe(
  from([1, 2]),
  AIs.chain((a) => from([3, 4]))
)
// will emit 3, 4 (switchMap)
```

# TypeScript compatibility

The stable version is tested against TypeScript 4.8

# ixjs compatibility

| ixjs version | fp-ts-rxjs version |
| ------------ | ------------------ |
| `ix@5`       | `fp-ts-ix@0.1.x`   |

# Documentation

- [API Reference](https://thomasvargiu.github.io/fp-ts-ix)
