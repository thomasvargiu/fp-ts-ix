---
title: AsyncIterableOption/Concat.ts
nav_order: 10
parent: Modules
---

## Concat overview

AsyncIterableOption/Concat

Added in v0.1.0

---

<h2 class="text-delta">Table of contents</h2>

- [Monad](#monad)
  - [chain](#chain)
- [combinators](#combinators)
  - [chainAsyncIterableK](#chainasynciterablek)
  - [chainEitherK](#chaineitherk)
  - [chainFirst](#chainfirst)
  - [chainFirstAsyncIterableK](#chainfirstasynciterablek)
  - [chainFirstEitherK](#chainfirsteitherk)
  - [chainFirstIOK](#chainfirstiok)
  - [chainIOK](#chainiok)
  - [chainOptionK](#chainoptionk)
  - [chainWithIndex](#chainwithindex)
  - [flatten](#flatten)
- [destructors](#destructors)
  - [fold](#fold)
  - [foldW](#foldw)
  - [getOrElse](#getorelse)
  - [getOrElseW](#getorelsew)
  - [matchE](#matche)
  - [matchEW](#matchew)
- [instances](#instances)
  - [Chain](#chain)
  - [ChainWithIndex](#chainwithindex)
  - [Monad](#monad-1)
  - [MonadAsyncIterable](#monadasynciterable)
  - [MonadIO](#monadio)
  - [MonadTask](#monadtask)
  - [getSemigroup](#getsemigroup)
- [interop](#interop)
  - [chainNullableK](#chainnullablek)
- [utils](#utils)
  - [bind](#bind)
  - [getMonoid](#getmonoid)

---

# Monad

## chain

**Signature**

```ts
export declare const chain: <A, B>(
  f: (a: A) => AIO.AsyncIterableOption<B>
) => (ma: AIO.AsyncIterableOption<A>) => AIO.AsyncIterableOption<B>
```

Added in v0.1.0

# combinators

## chainAsyncIterableK

**Signature**

```ts
export declare const chainAsyncIterableK: <A, B>(
  f: (a: A) => AsyncIterable<B>
) => (first: AIO.AsyncIterableOption<A>) => AIO.AsyncIterableOption<B>
```

Added in v0.1.0

## chainEitherK

**Signature**

```ts
export declare const chainEitherK: <E, A, B>(
  f: (a: A) => Either<E, B>
) => (ma: AIO.AsyncIterableOption<A>) => AIO.AsyncIterableOption<B>
```

Added in v0.1.0

## chainFirst

Composes computations in sequence, using the return value of one computation to determine the next computation and
keeping only the result of the first.

Derivable from `Chain`.

**Signature**

```ts
export declare const chainFirst: <A, B>(
  f: (a: A) => AIO.AsyncIterableOption<B>
) => (first: AIO.AsyncIterableOption<A>) => AIO.AsyncIterableOption<A>
```

Added in v0.1.0

## chainFirstAsyncIterableK

**Signature**

```ts
export declare const chainFirstAsyncIterableK: <A, B>(
  f: (a: A) => AsyncIterable<B>
) => (first: AIO.AsyncIterableOption<A>) => AIO.AsyncIterableOption<A>
```

Added in v0.1.0

## chainFirstEitherK

**Signature**

```ts
export declare const chainFirstEitherK: <E, A, B>(
  f: (a: A) => Either<E, B>
) => (ma: AIO.AsyncIterableOption<A>) => AIO.AsyncIterableOption<A>
```

Added in v0.1.0

## chainFirstIOK

**Signature**

```ts
export declare const chainFirstIOK: <A, B>(
  f: (a: A) => IO<B>
) => (first: AIO.AsyncIterableOption<A>) => AIO.AsyncIterableOption<A>
```

Added in v0.1.0

## chainIOK

**Signature**

```ts
export declare const chainIOK: <A, B>(
  f: (a: A) => IO<B>
) => (first: AIO.AsyncIterableOption<A>) => AIO.AsyncIterableOption<B>
```

Added in v0.1.0

## chainOptionK

**Signature**

```ts
export declare const chainOptionK: <A, B>(
  f: (a: A) => Option<B>
) => (ma: AIO.AsyncIterableOption<A>) => AIO.AsyncIterableOption<B>
```

Added in v0.1.0

## chainWithIndex

Composes computations in sequence, using the return value of one computation to determine the next computation.

**Signature**

```ts
export declare const chainWithIndex: <A, B>(
  f: (i: number, a: A) => AIO.AsyncIterableOption<B>
) => (ma: AIO.AsyncIterableOption<A>) => AIO.AsyncIterableOption<B>
```

Added in v0.1.0

## flatten

Derivable from `Chain`.

**Signature**

```ts
export declare const flatten: <A>(
  mma: AIO.AsyncIterableOption<AIO.AsyncIterableOption<A>>
) => AIO.AsyncIterableOption<A>
```

Added in v0.1.0

# destructors

## fold

Alias of [`matchE`](#matche).

**Signature**

```ts
export declare const fold: <B, A>(
  onNone: () => AsyncIterable<B>,
  onSome: (a: A) => AsyncIterable<B>
) => (ma: AIO.AsyncIterableOption<A>) => AsyncIterable<B>
```

Added in v0.1.0

## foldW

Alias of [`matchEW`](#matchew).

**Signature**

```ts
export declare const foldW: <B, C, A>(
  onNone: () => AsyncIterable<B>,
  onSome: (a: A) => AsyncIterable<C>
) => (ma: AIO.AsyncIterableOption<A>) => AsyncIterable<B | C>
```

Added in v0.1.0

## getOrElse

**Signature**

```ts
export declare const getOrElse: <A>(
  onNone: Lazy<AsyncIterable<A>>
) => (fa: AIO.AsyncIterableOption<A>) => AsyncIterable<A>
```

Added in v0.1.0

## getOrElseW

Less strict version of [`getOrElse`](#getorelse).

**Signature**

```ts
export declare const getOrElseW: <B>(
  onNone: Lazy<AsyncIterable<B>>
) => <A>(ma: AIO.AsyncIterableOption<A>) => AsyncIterable<B | A>
```

Added in v0.1.0

## matchE

**Signature**

```ts
export declare const matchE: <B, A>(
  onNone: () => AsyncIterable<B>,
  onSome: (a: A) => AsyncIterable<B>
) => (ma: AIO.AsyncIterableOption<A>) => AsyncIterable<B>
```

Added in v0.1.0

## matchEW

Less strict version of [`matchE`](#matche).

**Signature**

```ts
export declare const matchEW: <B, C, A>(
  onNone: () => AsyncIterable<B>,
  onSome: (a: A) => AsyncIterable<C>
) => (ma: AIO.AsyncIterableOption<A>) => AsyncIterable<B | C>
```

Added in v0.1.0

# instances

## Chain

**Signature**

```ts
export declare const Chain: Chain1<'AsyncIterableOption'>
```

Added in v0.1.0

## ChainWithIndex

**Signature**

```ts
export declare const ChainWithIndex: ChainWithIndex1<'AsyncIterableOption', number>
```

Added in v0.1.0

## Monad

**Signature**

```ts
export declare const Monad: Monad1<'AsyncIterableOption'>
```

Added in v0.1.0

## MonadAsyncIterable

**Signature**

```ts
export declare const MonadAsyncIterable: MonadAsyncIterable1<'AsyncIterableOption'>
```

Added in v0.1.0

## MonadIO

**Signature**

```ts
export declare const MonadIO: MonadIO1<'AsyncIterableOption'>
```

Added in v0.1.0

## MonadTask

**Signature**

```ts
export declare const MonadTask: MonadTask1<'AsyncIterableOption'>
```

Added in v0.1.0

## getSemigroup

Get a `Semigroup` based on the concatenation of `AsyncIterable`s.
See also [`getMonoid`](#getMonoid).

**Signature**

```ts
export declare const getSemigroup: <A = never>() => Semigroup<AIO.AsyncIterableOption<A>>
```

Added in v0.1.0

# interop

## chainNullableK

**Signature**

```ts
export declare const chainNullableK: <A, B>(
  f: (a: A) => B | null | undefined
) => (ma: AIO.AsyncIterableOption<A>) => AIO.AsyncIterableOption<NonNullable<B>>
```

Added in v0.1.0

# utils

## bind

**Signature**

```ts
export declare const bind: <N, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => AIO.AsyncIterableOption<B>
) => (
  ma: AIO.AsyncIterableOption<A>
) => AIO.AsyncIterableOption<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v0.1.0

## getMonoid

**Signature**

```ts
export declare const getMonoid: <A = never>() => Monoid<AIO.AsyncIterableOption<A>>
```

Added in v0.1.0
