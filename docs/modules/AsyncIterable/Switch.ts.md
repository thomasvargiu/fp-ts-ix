---
title: AsyncIterable/Switch.ts
nav_order: 4
parent: Modules
---

## Switch overview

AsyncIterable/Switch

Added in v0.1.0

---

<h2 class="text-delta">Table of contents</h2>

- [Monad](#monad)
  - [chain](#chain)
- [combinators](#combinators)
  - [chainFirst](#chainfirst)
  - [chainWithIndex](#chainwithindex)
  - [flatten](#flatten)
- [instances](#instances)
  - [Chain](#chain)
  - [ChainWithIndex](#chainwithindex)
  - [Monad](#monad-1)
  - [MonadAsyncIterable](#monadasynciterable)
  - [MonadIO](#monadio)
  - [MonadTask](#monadtask)
  - [getSemigroup](#getsemigroup)
- [utils](#utils)
  - [bind](#bind)
  - [getMonoid](#getmonoid)

---

# Monad

## chain

Composes computations in sequence, using the return value of one computation to determine the next computation.

**Signature**

```ts
export declare const chain: <A, B>(f: (a: A) => AsyncIterable<B>) => (ma: AsyncIterable<A>) => AsyncIterable<B>
```

Added in v0.1.0

# combinators

## chainFirst

Composes computations in sequence, using the return value of one computation to determine the next computation and
keeping only the result of the first.

Derivable from `Chain`.

**Signature**

```ts
export declare const chainFirst: <A, B>(f: (a: A) => AsyncIterable<B>) => (first: AsyncIterable<A>) => AsyncIterable<A>
```

Added in v0.1.0

## chainWithIndex

Composes computations in sequence, using the return value of one computation to determine the next computation.

**Signature**

```ts
export declare const chainWithIndex: <A, B>(
  f: (i: number, a: A) => AsyncIterable<B>
) => (ma: AsyncIterable<A>) => AsyncIterable<B>
```

Added in v0.1.0

## flatten

Derivable from `Monad`.

**Signature**

```ts
export declare const flatten: <A>(mma: AsyncIterable<AsyncIterable<A>>) => AsyncIterable<A>
```

Added in v0.1.0

# instances

## Chain

**Signature**

```ts
export declare const Chain: Chain1<'AsyncIterable'>
```

Added in v0.1.0

## ChainWithIndex

**Signature**

```ts
export declare const ChainWithIndex: ChainWithIndex1<'AsyncIterable', number>
```

Added in v0.1.0

## Monad

**Signature**

```ts
export declare const Monad: Monad1<'AsyncIterable'>
```

Added in v0.1.0

## MonadAsyncIterable

**Signature**

```ts
export declare const MonadAsyncIterable: MonadAsyncIterable1<'AsyncIterable'>
```

Added in v0.1.0

## MonadIO

**Signature**

```ts
export declare const MonadIO: MonadIO1<'AsyncIterable'>
```

Added in v0.1.0

## MonadTask

**Signature**

```ts
export declare const MonadTask: MonadTask1<'AsyncIterable'>
```

Added in v0.1.0

## getSemigroup

Get a `Semigroup` based on the concatenation of `AsyncIterable`s.
See also [`getMonoid`](#getMonoid).

**Signature**

```ts
export declare const getSemigroup: <A = never>() => Semigroup<AsyncIterable<A>>
```

Added in v0.1.0

# utils

## bind

**Signature**

```ts
export declare const bind: <N, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => AsyncIterable<B>
) => (ma: AsyncIterable<A>) => AsyncIterable<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v0.1.0

## getMonoid

**Signature**

```ts
export declare const getMonoid: <A = never>() => Monoid<AsyncIterable<A>>
```

Added in v0.1.0
