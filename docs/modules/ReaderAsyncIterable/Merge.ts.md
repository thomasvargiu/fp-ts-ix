---
title: ReaderAsyncIterable/Merge.ts
nav_order: 20
parent: Modules
---

## Merge overview

ReaderAsyncIterable/Merge

Added in v0.1.0

---

<h2 class="text-delta">Table of contents</h2>

- [Monad](#monad)
  - [chain](#chain)
- [combinators](#combinators)
  - [chainAsyncIterableK](#chainasynciterablek)
  - [chainFirst](#chainfirst)
  - [chainFirstAsyncIterableK](#chainfirstasynciterablek)
  - [chainFirstIOK](#chainfirstiok)
  - [chainFirstReaderK](#chainfirstreaderk)
  - [chainFirstReaderKW](#chainfirstreaderkw)
  - [chainFirstTaskK](#chainfirsttaskk)
  - [chainFirstW](#chainfirstw)
  - [chainIOK](#chainiok)
  - [chainReaderK](#chainreaderk)
  - [chainReaderKW](#chainreaderkw)
  - [chainTaskK](#chaintaskk)
  - [chainWithIndex](#chainwithindex)
  - [chainWithIndexW](#chainwithindexw)
  - [flatten](#flatten)
  - [flattenW](#flattenw)
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
  - [bindW](#bindw)
  - [getMonoid](#getmonoid)

---

# Monad

## chain

**Signature**

```ts
export declare const chain: <A, R, B>(
  f: (a: A) => RAI.ReaderAsyncIterable<R, B>
) => (ma: RAI.ReaderAsyncIterable<R, A>) => RAI.ReaderAsyncIterable<R, B>
```

Added in v0.1.0

# combinators

## chainAsyncIterableK

**Signature**

```ts
export declare const chainAsyncIterableK: <A, B>(
  f: (a: A) => AsyncIterable<B>
) => <E>(first: RAI.ReaderAsyncIterable<E, A>) => RAI.ReaderAsyncIterable<E, B>
```

Added in v0.1.0

## chainFirst

Composes computations in sequence, using the return value of one computation to determine the next computation and
keeping only the result of the first.

Derivable from `Chain`.

**Signature**

```ts
export declare const chainFirst: <A, E, B>(
  f: (a: A) => RAI.ReaderAsyncIterable<E, B>
) => (first: RAI.ReaderAsyncIterable<E, A>) => RAI.ReaderAsyncIterable<E, A>
```

Added in v0.1.0

## chainFirstAsyncIterableK

**Signature**

```ts
export declare const chainFirstAsyncIterableK: <A, B>(
  f: (a: A) => AsyncIterable<B>
) => <E>(first: RAI.ReaderAsyncIterable<E, A>) => RAI.ReaderAsyncIterable<E, A>
```

Added in v0.1.0

## chainFirstIOK

**Signature**

```ts
export declare const chainFirstIOK: <A, B>(
  f: (a: A) => IO<B>
) => <E>(first: RAI.ReaderAsyncIterable<E, A>) => RAI.ReaderAsyncIterable<E, A>
```

Added in v0.1.0

## chainFirstReaderK

**Signature**

```ts
export declare const chainFirstReaderK: <A, R, B>(
  f: (a: A) => Reader<R, B>
) => (ma: RAI.ReaderAsyncIterable<R, A>) => RAI.ReaderAsyncIterable<R, A>
```

Added in v0.1.0

## chainFirstReaderKW

Less strict version of [`chainFirstReaderK`](#chainfirstreaderk).

**Signature**

```ts
export declare const chainFirstReaderKW: <A, R1, B>(
  f: (a: A) => Reader<R1, B>
) => <R2>(ma: RAI.ReaderAsyncIterable<R2, A>) => RAI.ReaderAsyncIterable<R1 & R2, A>
```

Added in v0.1.0

## chainFirstTaskK

**Signature**

```ts
export declare const chainFirstTaskK: <A, B>(
  f: (a: A) => Task<B>
) => <E>(first: RAI.ReaderAsyncIterable<E, A>) => RAI.ReaderAsyncIterable<E, A>
```

Added in v0.1.0

## chainFirstW

Less strict version of [`chainFirst`](#chainfirst).

Derivable from `Chain`.

**Signature**

```ts
export declare const chainFirstW: <R2, A, B>(
  f: (a: A) => RAI.ReaderAsyncIterable<R2, B>
) => <R1>(ma: RAI.ReaderAsyncIterable<R1, A>) => RAI.ReaderAsyncIterable<R1 & R2, A>
```

Added in v0.1.0

## chainIOK

**Signature**

```ts
export declare const chainIOK: <A, B>(
  f: (a: A) => IO<B>
) => <E>(first: RAI.ReaderAsyncIterable<E, A>) => RAI.ReaderAsyncIterable<E, B>
```

Added in v0.1.0

## chainReaderK

**Signature**

```ts
export declare const chainReaderK: <A, R, B>(
  f: (a: A) => Reader<R, B>
) => (ma: RAI.ReaderAsyncIterable<R, A>) => RAI.ReaderAsyncIterable<R, B>
```

Added in v0.1.0

## chainReaderKW

Less strict version of [`chainReaderK`](#chainreaderk).

**Signature**

```ts
export declare const chainReaderKW: <A, R1, B>(
  f: (a: A) => Reader<R1, B>
) => <R2>(ma: RAI.ReaderAsyncIterable<R2, A>) => RAI.ReaderAsyncIterable<R1 & R2, B>
```

Added in v0.1.0

## chainTaskK

**Signature**

```ts
export declare const chainTaskK: <A, B>(
  f: (a: A) => Task<B>
) => <E>(first: RAI.ReaderAsyncIterable<E, A>) => RAI.ReaderAsyncIterable<E, B>
```

Added in v0.1.0

## chainWithIndex

Composes computations in sequence, using the return value of one computation to determine the next computation.

**Signature**

```ts
export declare const chainWithIndex: <R, A, B>(
  f: (i: number, a: A) => RAI.ReaderAsyncIterable<R, B>
) => (ma: RAI.ReaderAsyncIterable<R, A>) => RAI.ReaderAsyncIterable<R, B>
```

Added in v0.1.0

## chainWithIndexW

Less strict version of [`chainWithIndex`](#chainWithIndex).

**Signature**

```ts
export declare const chainWithIndexW: <R2, A, B>(
  f: (i: number, a: A) => RAI.ReaderAsyncIterable<R2, B>
) => <R1>(ma: RAI.ReaderAsyncIterable<R1, A>) => RAI.ReaderAsyncIterable<R1 & R2, B>
```

Added in v0.1.0

## flatten

Derivable from `Chain`.

**Signature**

```ts
export declare const flatten: <R, A>(
  mma: RAI.ReaderAsyncIterable<R, RAI.ReaderAsyncIterable<R, A>>
) => RAI.ReaderAsyncIterable<R, A>
```

Added in v0.1.0

## flattenW

Less strict version of [`flatten`](#flatten).

**Signature**

```ts
export declare const flattenW: <R1, R2, A>(
  mma: RAI.ReaderAsyncIterable<R1, RAI.ReaderAsyncIterable<R2, A>>
) => RAI.ReaderAsyncIterable<R1 & R2, A>
```

Added in v0.1.0

# instances

## Chain

**Signature**

```ts
export declare const Chain: Chain2<'ReaderAsyncIterable'>
```

Added in v0.1.0

## ChainWithIndex

**Signature**

```ts
export declare const ChainWithIndex: ChainWithIndex2<'ReaderAsyncIterable', number>
```

Added in v0.1.0

## Monad

**Signature**

```ts
export declare const Monad: Monad2<'ReaderAsyncIterable'>
```

Added in v0.1.0

## MonadAsyncIterable

**Signature**

```ts
export declare const MonadAsyncIterable: MonadAsyncIterable2<'ReaderAsyncIterable'>
```

Added in v0.1.0

## MonadIO

**Signature**

```ts
export declare const MonadIO: MonadIO2<'ReaderAsyncIterable'>
```

Added in v0.1.0

## MonadTask

**Signature**

```ts
export declare const MonadTask: MonadTask2<'ReaderAsyncIterable'>
```

Added in v0.1.0

## getSemigroup

Get a `Semigroup` based on the concatenation of `AsyncIterable`s.
See also [`getMonoid`](#getMonoid).

**Signature**

```ts
export declare const getSemigroup: <R = unknown, A = never>() => Semigroup<RAI.ReaderAsyncIterable<R, A>>
```

Added in v0.1.0

# utils

## bind

**Signature**

```ts
export declare const bind: <N, A, E, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => RAI.ReaderAsyncIterable<E, B>
) => (
  ma: RAI.ReaderAsyncIterable<E, A>
) => RAI.ReaderAsyncIterable<E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v0.1.0

## bindW

**Signature**

```ts
export declare const bindW: <N extends string, A, R2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => RAI.ReaderAsyncIterable<R2, B>
) => <R1>(
  fa: RAI.ReaderAsyncIterable<R1, A>
) => RAI.ReaderAsyncIterable<R1 & R2, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v0.1.0

## getMonoid

**Signature**

```ts
export declare const getMonoid: <R = unknown, A = never>() => Monoid<RAI.ReaderAsyncIterable<R, A>>
```

Added in v0.1.0
