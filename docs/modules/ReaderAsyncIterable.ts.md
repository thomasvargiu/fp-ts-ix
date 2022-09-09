---
title: ReaderAsyncIterable.ts
nav_order: 18
parent: Modules
---

## ReaderAsyncIterable overview

```ts
interface ReaderAsyncIterable<R, A> extends Reader<R, AsyncIterable<A>> {}
```

Added in v0.1.0

---

<h2 class="text-delta">Table of contents</h2>

- [Apply](#apply)
  - [ap](#ap)
  - [apW](#apw)
- [Functor](#functor)
  - [map](#map)
- [FunctorWithIndex](#functorwithindex)
  - [mapWithIndex](#mapwithindex)
- [Monad](#monad)
  - [chain](#chain)
  - [chainW](#chainw)
- [Pointed](#pointed)
  - [of](#of)
- [combinators](#combinators)
  - [apFirst](#apfirst)
  - [apSecond](#apsecond)
  - [asksReaderAsyncIterable](#asksreaderasynciterable)
  - [asksReaderAsyncIterableW](#asksreaderasynciterablew)
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
  - [flap](#flap)
  - [flatten](#flatten)
  - [flattenW](#flattenw)
  - [fromAsyncIterableK](#fromasynciterablek)
  - [fromIOK](#fromiok)
  - [fromReaderK](#fromreaderk)
  - [fromTaskK](#fromtaskk)
  - [local](#local)
- [constructors](#constructors)
  - [ask](#ask)
  - [asks](#asks)
- [instances](#instances)
  - [Applicative](#applicative)
  - [Apply](#apply-1)
  - [FromAsyncIterable](#fromasynciterable)
  - [FromIO](#fromio)
  - [FromReader](#fromreader)
  - [FromTask](#fromtask)
  - [Functor](#functor-1)
  - [Pointed](#pointed-1)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
  - [getChain](#getchain)
  - [getChainWithIndex](#getchainwithindex)
  - [getMonad](#getmonad)
  - [getMonadAsyncIterable](#getmonadasynciterable)
  - [getMonadIO](#getmonadio)
  - [getMonadTask](#getmonadtask)
- [model](#model)
  - [ReaderAsyncIterable (interface)](#readerasynciterable-interface)
- [natural transformations](#natural-transformations)
  - [fromAsyncIterable](#fromasynciterable)
  - [fromIO](#fromio)
  - [fromReader](#fromreader)
  - [fromTask](#fromtask)
- [utils](#utils)
  - [ApT](#apt)
  - [Do](#do)
  - [apS](#aps)
  - [apSW](#apsw)
  - [bind](#bind)
  - [bindTo](#bindto)
  - [bindW](#bindw)

---

# Apply

## ap

Apply a function to an argument under a type constructor.

**Signature**

```ts
export declare const ap: <R, A>(
  fa: ReaderAsyncIterable<R, A>
) => <B>(fab: ReaderAsyncIterable<R, (a: A) => B>) => ReaderAsyncIterable<R, B>
```

Added in v0.1.0

## apW

Less strict version of [`ap`](#ap).

**Signature**

```ts
export declare const apW: <R2, A>(
  fa: ReaderAsyncIterable<R2, A>
) => <R1, B>(fab: ReaderAsyncIterable<R1, (a: A) => B>) => ReaderAsyncIterable<R1 & R2, B>
```

Added in v0.1.0

# Functor

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <R>(fa: ReaderAsyncIterable<R, A>) => ReaderAsyncIterable<R, B>
```

Added in v0.1.0

# FunctorWithIndex

## mapWithIndex

Same as [`map`](#map), but the iterating function takes both the index and the value
of the element.

**Signature**

```ts
export declare const mapWithIndex: <A, B>(
  f: (i: number, a: A) => B
) => <R>(fa: ReaderAsyncIterable<R, A>) => ReaderAsyncIterable<R, B>
```

Added in v0.1.0

# Monad

## chain

Composes computations in sequence, using the return value of one computation to determine the next computation.

**Signature**

```ts
export declare const chain: (
  C: AIChain
) => <A, R, B>(f: (a: A) => ReaderAsyncIterable<R, B>) => (ma: ReaderAsyncIterable<R, A>) => ReaderAsyncIterable<R, B>
```

Added in v0.1.0

## chainW

Less strict version of [`chain`](#chain).

**Signature**

```ts
export declare const chainW: (
  C: AIChain
) => <R2, A, B>(
  f: (a: A) => ReaderAsyncIterable<R2, B>
) => <R1>(ma: ReaderAsyncIterable<R1, A>) => ReaderAsyncIterable<R1 & R2, B>
```

Added in v0.1.0

# Pointed

## of

**Signature**

```ts
export declare const of: <E, A>(a: A) => ReaderAsyncIterable<E, A>
```

Added in v0.1.0

# combinators

## apFirst

Combine two effectful actions, keeping only the result of the first.

Derivable from `Apply`.

**Signature**

```ts
export declare const apFirst: <E, B>(
  second: ReaderAsyncIterable<E, B>
) => <A>(first: ReaderAsyncIterable<E, A>) => ReaderAsyncIterable<E, A>
```

Added in v0.1.0

## apSecond

Combine two effectful actions, keeping only the result of the second.

Derivable from `Apply`.

**Signature**

```ts
export declare const apSecond: <E, B>(
  second: ReaderAsyncIterable<E, B>
) => <A>(first: ReaderAsyncIterable<E, A>) => ReaderAsyncIterable<E, B>
```

Added in v0.1.0

## asksReaderAsyncIterable

Effectfully accesses the environment.

**Signature**

```ts
export declare const asksReaderAsyncIterable: <R, A>(
  f: (r: R) => ReaderAsyncIterable<R, A>
) => ReaderAsyncIterable<R, A>
```

Added in v0.1.0

## asksReaderAsyncIterableW

Less strict version of [`asksReaderAsyncIterable`](#asksreadertask).

**Signature**

```ts
export declare const asksReaderAsyncIterableW: <R1, R2, A>(
  f: (r1: R1) => ReaderAsyncIterable<R2, A>
) => ReaderAsyncIterable<R1 & R2, A>
```

Added in v0.1.0

## chainAsyncIterableK

**Signature**

```ts
export declare const chainAsyncIterableK: (
  C: AIChain
) => <A, B>(f: (a: A) => AsyncIterable<B>) => <E>(first: ReaderAsyncIterable<E, A>) => ReaderAsyncIterable<E, B>
```

Added in v0.1.0

## chainFirst

Composes computations in sequence, using the return value of one computation to determine the next computation and
keeping only the result of the first.

Derivable from `Chain`.

**Signature**

```ts
export declare const chainFirst: (
  C: AIChain
) => <A, E, B>(
  f: (a: A) => ReaderAsyncIterable<E, B>
) => (first: ReaderAsyncIterable<E, A>) => ReaderAsyncIterable<E, A>
```

Added in v0.1.0

## chainFirstAsyncIterableK

**Signature**

```ts
export declare const chainFirstAsyncIterableK: (
  C: AIChain
) => <A, B>(f: (a: A) => AsyncIterable<B>) => <E>(first: ReaderAsyncIterable<E, A>) => ReaderAsyncIterable<E, A>
```

Added in v0.1.0

## chainFirstIOK

**Signature**

```ts
export declare const chainFirstIOK: (
  C: AIChain
) => <A, B>(f: (a: A) => IO<B>) => <E>(first: ReaderAsyncIterable<E, A>) => ReaderAsyncIterable<E, A>
```

Added in v0.1.0

## chainFirstReaderK

**Signature**

```ts
export declare const chainFirstReaderK: (
  C: AIChain
) => <A, R, B>(f: (a: A) => R.Reader<R, B>) => (ma: ReaderAsyncIterable<R, A>) => ReaderAsyncIterable<R, A>
```

Added in v0.1.0

## chainFirstReaderKW

Less strict version of [`chainFirstReaderK`](#chainfirstreaderk).

**Signature**

```ts
export declare const chainFirstReaderKW: (
  C: AIChain
) => <A, R1, B>(f: (a: A) => R.Reader<R1, B>) => <R2>(ma: ReaderAsyncIterable<R2, A>) => ReaderAsyncIterable<R1 & R2, A>
```

Added in v0.1.0

## chainFirstTaskK

**Signature**

```ts
export declare const chainFirstTaskK: (
  C: AIChain
) => <A, B>(f: (a: A) => Task<B>) => <E>(first: ReaderAsyncIterable<E, A>) => ReaderAsyncIterable<E, A>
```

Added in v0.1.0

## chainFirstW

Less strict version of [`chainFirst`](#chainfirst).

Derivable from `Chain`.

**Signature**

```ts
export declare const chainFirstW: (
  C: AIChain
) => <R2, A, B>(
  f: (a: A) => ReaderAsyncIterable<R2, B>
) => <R1>(ma: ReaderAsyncIterable<R1, A>) => ReaderAsyncIterable<R1 & R2, A>
```

Added in v0.1.0

## chainIOK

**Signature**

```ts
export declare const chainIOK: (
  C: AIChain
) => <A, B>(f: (a: A) => IO<B>) => <E>(first: ReaderAsyncIterable<E, A>) => ReaderAsyncIterable<E, B>
```

Added in v0.1.0

## chainReaderK

**Signature**

```ts
export declare const chainReaderK: (
  C: AIChain
) => <A, R, B>(f: (a: A) => R.Reader<R, B>) => (ma: ReaderAsyncIterable<R, A>) => ReaderAsyncIterable<R, B>
```

Added in v0.1.0

## chainReaderKW

Less strict version of [`chainReaderK`](#chainreaderk).

**Signature**

```ts
export declare const chainReaderKW: (
  C: AIChain
) => <A, R1, B>(f: (a: A) => R.Reader<R1, B>) => <R2>(ma: ReaderAsyncIterable<R2, A>) => ReaderAsyncIterable<R1 & R2, B>
```

Added in v0.1.0

## chainTaskK

**Signature**

```ts
export declare const chainTaskK: (
  C: AIChain
) => <A, B>(f: (a: A) => Task<B>) => <E>(first: ReaderAsyncIterable<E, A>) => ReaderAsyncIterable<E, B>
```

Added in v0.1.0

## chainWithIndex

Composes computations in sequence, using the return value of one computation to determine the next computation.

**Signature**

```ts
export declare const chainWithIndex: (
  C: AIChainWithIndex
) => <R, A, B>(
  f: (i: number, a: A) => ReaderAsyncIterable<R, B>
) => (ma: ReaderAsyncIterable<R, A>) => ReaderAsyncIterable<R, B>
```

Added in v0.1.0

## chainWithIndexW

Less strict version of [`chainWithIndex`](#chainWithIndex).

**Signature**

```ts
export declare const chainWithIndexW: (
  C: AIChainWithIndex
) => <R2, A, B>(
  f: (i: number, a: A) => ReaderAsyncIterable<R2, B>
) => <R1>(ma: ReaderAsyncIterable<R1, A>) => ReaderAsyncIterable<R1 & R2, B>
```

Added in v0.1.0

## flap

Derivable from `Functor`.

**Signature**

```ts
export declare const flap: <A>(a: A) => <E, B>(fab: ReaderAsyncIterable<E, (a: A) => B>) => ReaderAsyncIterable<E, B>
```

Added in v0.1.0

## flatten

Derivable from `Chain`.

**Signature**

```ts
export declare const flatten: (
  C: AIChain
) => <R, A>(mma: ReaderAsyncIterable<R, ReaderAsyncIterable<R, A>>) => ReaderAsyncIterable<R, A>
```

Added in v0.1.0

## flattenW

Less strict version of [`flatten`](#flatten).

**Signature**

```ts
export declare const flattenW: (
  C: AIChain
) => <R1, R2, A>(mma: ReaderAsyncIterable<R1, ReaderAsyncIterable<R2, A>>) => ReaderAsyncIterable<R1 & R2, A>
```

Added in v0.1.0

## fromAsyncIterableK

**Signature**

```ts
export declare const fromAsyncIterableK: <A, B>(
  f: (...a: A) => AsyncIterable<B>
) => <E>(...a: A) => ReaderAsyncIterable<E, B>
```

Added in v0.1.0

## fromIOK

**Signature**

```ts
export declare const fromIOK: <A, B>(f: (...a: A) => IO<B>) => <E>(...a: A) => ReaderAsyncIterable<E, B>
```

Added in v0.1.0

## fromReaderK

**Signature**

```ts
export declare const fromReaderK: <A, R, B>(f: (...a: A) => R.Reader<R, B>) => (...a: A) => ReaderAsyncIterable<R, B>
```

Added in v0.1.0

## fromTaskK

**Signature**

```ts
export declare const fromTaskK: <A, B>(f: (...a: A) => Task<B>) => <E>(...a: A) => ReaderAsyncIterable<E, B>
```

Added in v0.1.0

## local

Changes the value of the local context during the execution of the action `ma` (similar to `Contravariant`'s
`contramap`).

**Signature**

```ts
export declare const local: <R2, R1>(
  f: (r2: R2) => R1
) => <A>(ma: ReaderAsyncIterable<R1, A>) => ReaderAsyncIterable<R2, A>
```

Added in v0.1.0

# constructors

## ask

Reads the current context.

**Signature**

```ts
export declare const ask: <R>() => ReaderAsyncIterable<R, R>
```

Added in v0.1.0

## asks

Projects a value from the global context in a `ReaderAsyncIterable`.

**Signature**

```ts
export declare const asks: <R, A>(f: (r: R) => A) => ReaderAsyncIterable<R, A>
```

Added in v0.1.0

# instances

## Applicative

**Signature**

```ts
export declare const Applicative: Applicative2<'ReaderAsyncIterable'>
```

Added in v0.1.0

## Apply

**Signature**

```ts
export declare const Apply: Apply2<'ReaderAsyncIterable'>
```

Added in v0.1.0

## FromAsyncIterable

**Signature**

```ts
export declare const FromAsyncIterable: FromAsyncIterable2<'ReaderAsyncIterable'>
```

Added in v0.1.0

## FromIO

**Signature**

```ts
export declare const FromIO: FromIO2<'ReaderAsyncIterable'>
```

Added in v0.1.0

## FromReader

**Signature**

```ts
export declare const FromReader: FromReader2<'ReaderAsyncIterable'>
```

Added in v0.1.0

## FromTask

**Signature**

```ts
export declare const FromTask: FromTask2<'ReaderAsyncIterable'>
```

Added in v0.1.0

## Functor

**Signature**

```ts
export declare const Functor: Functor2<'ReaderAsyncIterable'>
```

Added in v0.1.0

## Pointed

**Signature**

```ts
export declare const Pointed: Pointed2<'ReaderAsyncIterable'>
```

Added in v0.1.0

## URI

**Signature**

```ts
export declare const URI: 'ReaderAsyncIterable'
```

Added in v0.1.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v0.1.0

## getChain

**Signature**

```ts
export declare const getChain: (C: AIChain) => Chain2<URI>
```

Added in v0.1.0

## getChainWithIndex

**Signature**

```ts
export declare const getChainWithIndex: (C: AIChainWithIndex) => ChainWithIndex2<URI, number>
```

Added in v0.1.0

## getMonad

**Signature**

```ts
export declare const getMonad: (C: AIChain) => Monad2<URI>
```

Added in v0.1.0

## getMonadAsyncIterable

**Signature**

```ts
export declare const getMonadAsyncIterable: (C: AIChainWithIndex) => MonadAsyncIterable2<URI>
```

Added in v0.1.0

## getMonadIO

**Signature**

```ts
export declare const getMonadIO: (C: AIChain) => MonadIO2<URI>
```

Added in v0.1.0

## getMonadTask

**Signature**

```ts
export declare const getMonadTask: (C: AIChain) => MonadTask2<URI>
```

Added in v0.1.0

# model

## ReaderAsyncIterable (interface)

**Signature**

```ts
export interface ReaderAsyncIterable<R, A> {
  (r: R): AsyncIterable<A>
}
```

Added in v0.1.0

# natural transformations

## fromAsyncIterable

**Signature**

```ts
export declare const fromAsyncIterable: NaturalTransformation12<'AsyncIterable', 'ReaderAsyncIterable'>
```

Added in v0.1.0

## fromIO

**Signature**

```ts
export declare const fromIO: NaturalTransformation12<'IO', 'ReaderAsyncIterable'>
```

Added in v0.1.0

## fromReader

**Signature**

```ts
export declare const fromReader: NaturalTransformation22<'Reader', 'ReaderAsyncIterable'>
```

Added in v0.1.0

## fromTask

**Signature**

```ts
export declare const fromTask: NaturalTransformation12<'Task', 'ReaderAsyncIterable'>
```

Added in v0.1.0

# utils

## ApT

**Signature**

```ts
export declare const ApT: ReaderAsyncIterable<unknown, readonly []>
```

Added in v0.1.0

## Do

**Signature**

```ts
export declare const Do: ReaderAsyncIterable<unknown, {}>
```

Added in v0.1.0

## apS

**Signature**

```ts
export declare const apS: <N, A, E, B>(
  name: Exclude<N, keyof A>,
  fb: ReaderAsyncIterable<E, B>
) => (
  fa: ReaderAsyncIterable<E, A>
) => ReaderAsyncIterable<E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v0.1.0

## apSW

**Signature**

```ts
export declare const apSW: <A, N extends string, R2, B>(
  name: Exclude<N, keyof A>,
  fb: ReaderAsyncIterable<R2, B>
) => <R1>(
  fa: ReaderAsyncIterable<R1, A>
) => ReaderAsyncIterable<R1 & R2, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v0.1.0

## bind

**Signature**

```ts
export declare const bind: (
  C: AIChain
) => <N, A, E, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => ReaderAsyncIterable<E, B>
) => (
  ma: ReaderAsyncIterable<E, A>
) => ReaderAsyncIterable<E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v0.1.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N>(
  name: N
) => <E, A>(fa: ReaderAsyncIterable<E, A>) => ReaderAsyncIterable<E, { readonly [K in N]: A }>
```

Added in v0.1.0

## bindW

**Signature**

```ts
export declare const bindW: (
  C: AIChain
) => <N extends string, A, R2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => ReaderAsyncIterable<R2, B>
) => <R1>(
  fa: ReaderAsyncIterable<R1, A>
) => ReaderAsyncIterable<R1 & R2, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v0.1.0
