---
title: AsyncIterableOption.ts
nav_order: 9
parent: Modules
---

## AsyncIterableOption overview

```ts
interface AsyncIterableOption<A> extends AsyncIterable<Option<A>> {}
```

Added in v0.1.0

---

<h2 class="text-delta">Table of contents</h2>

- [Apply](#apply)
  - [ap](#ap)
- [Compactable](#compactable)
  - [compact](#compact)
  - [separate](#separate)
- [Filterable](#filterable)
  - [filter](#filter)
  - [filterMap](#filtermap)
  - [partition](#partition)
  - [partitionMap](#partitionmap)
- [Functor](#functor)
  - [map](#map)
- [FunctorWithIndex](#functorwithindex)
  - [mapWithIndex](#mapwithindex)
- [Monad](#monad)
  - [chain](#chain)
- [Pointed](#pointed)
  - [of](#of)
- [Zero](#zero)
  - [zero](#zero)
- [combinators](#combinators)
  - [apFirst](#apfirst)
  - [apSecond](#apsecond)
  - [chainAsyncIterableK](#chainasynciterablek)
  - [chainEitherK](#chaineitherk)
  - [chainFirst](#chainfirst)
  - [chainFirstAsyncIterableK](#chainfirstasynciterablek)
  - [chainFirstEitherK](#chainfirsteitherk)
  - [chainFirstIOK](#chainfirstiok)
  - [chainIOK](#chainiok)
  - [chainOptionK](#chainoptionk)
  - [chainWithIndex](#chainwithindex)
  - [flap](#flap)
  - [flatten](#flatten)
  - [fromAsyncIterableK](#fromasynciterablek)
  - [fromEitherK](#fromeitherk)
  - [fromIOK](#fromiok)
  - [fromOptionK](#fromoptionk)
  - [getOnEmpty](#getonempty)
- [constructors](#constructors)
  - [fromPredicate](#frompredicate)
  - [guard](#guard)
  - [none](#none)
  - [some](#some)
- [destructors](#destructors)
  - [fold](#fold)
  - [foldW](#foldw)
  - [getOrElse](#getorelse)
  - [getOrElseW](#getorelsew)
  - [match](#match)
  - [matchE](#matche)
  - [matchEW](#matchew)
  - [matchW](#matchw)
- [instances](#instances)
  - [Applicative](#applicative)
  - [Apply](#apply-1)
  - [Compactable](#compactable-1)
  - [Filterable](#filterable-1)
  - [FromAsyncIterable](#fromasynciterable)
  - [FromEither](#fromeither)
  - [FromIO](#fromio)
  - [Functor](#functor-1)
  - [FunctorWithIndex](#functorwithindex-1)
  - [Pointed](#pointed-1)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
  - [Zero](#zero-1)
- [interop](#interop)
  - [chainNullableK](#chainnullablek)
  - [fromNullable](#fromnullable)
  - [fromNullableK](#fromnullablek)
  - [tryCatch](#trycatch)
  - [tryCatchK](#trycatchk)
- [model](#model)
  - [AsyncIterableOption (interface)](#asynciterableoption-interface)
- [natural transformations](#natural-transformations)
  - [fromAsyncIterable](#fromasynciterable)
  - [fromAsyncIterableEither](#fromasynciterableeither)
  - [fromEither](#fromeither)
  - [fromIO](#fromio)
  - [fromOption](#fromoption)
  - [fromTask](#fromtask)
  - [fromTaskEither](#fromtaskeither)
- [utils](#utils)
  - [ApT](#apt)
  - [Do](#do)
  - [apS](#aps)
  - [bind](#bind)
  - [bindTo](#bindto)
  - [getChain](#getchain)
  - [getChainWithIndex](#getchainwithindex)
  - [getMonad](#getmonad)
  - [getMonadAsyncIterable](#getmonadasynciterable)
  - [getMonadIO](#getmonadio)
  - [getMonadTask](#getmonadtask)

---

# Apply

## ap

**Signature**

```ts
export declare const ap: <A>(
  fa: AsyncIterableOption<A>
) => <B>(fab: AsyncIterableOption<(a: A) => B>) => AsyncIterableOption<B>
```

Added in v0.1.0

# Compactable

## compact

**Signature**

```ts
export declare const compact: <A>(fa: AsyncIterableOption<O.Option<A>>) => AsyncIterableOption<A>
```

Added in v0.1.0

## separate

**Signature**

```ts
export declare const separate: <A, B>(
  fa: AsyncIterableOption<Either<A, B>>
) => Separated<AsyncIterableOption<A>, AsyncIterableOption<B>>
```

Added in v0.1.0

# Filterable

## filter

**Signature**

```ts
export declare const filter: {
  <A, B extends A>(refinement: Refinement<A, B>): (fb: AsyncIterableOption<A>) => AsyncIterableOption<B>
  <A>(predicate: Predicate<A>): <B extends A>(fb: AsyncIterableOption<B>) => AsyncIterableOption<B>
  <A>(predicate: Predicate<A>): (fa: AsyncIterableOption<A>) => AsyncIterableOption<A>
}
```

Added in v0.1.0

## filterMap

**Signature**

```ts
export declare const filterMap: <A, B>(
  f: (a: A) => O.Option<B>
) => (fga: AsyncIterableOption<A>) => AsyncIterableOption<B>
```

Added in v0.1.0

## partition

**Signature**

```ts
export declare const partition: {
  <A, B extends A>(refinement: Refinement<A, B>): (
    fb: AsyncIterableOption<A>
  ) => Separated<AsyncIterableOption<A>, AsyncIterableOption<B>>
  <A>(predicate: Predicate<A>): <B extends A>(
    fb: AsyncIterableOption<B>
  ) => Separated<AsyncIterableOption<B>, AsyncIterableOption<B>>
  <A>(predicate: Predicate<A>): (
    fa: AsyncIterableOption<A>
  ) => Separated<AsyncIterableOption<A>, AsyncIterableOption<A>>
}
```

Added in v0.1.0

## partitionMap

**Signature**

```ts
export declare const partitionMap: <A, B, C>(
  f: (a: A) => Either<B, C>
) => (fa: AsyncIterableOption<A>) => Separated<AsyncIterableOption<B>, AsyncIterableOption<C>>
```

Added in v0.1.0

# Functor

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => (fa: AsyncIterableOption<A>) => AsyncIterableOption<B>
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
) => (fa: AsyncIterableOption<A>) => AsyncIterableOption<B>
```

Added in v0.1.0

# Monad

## chain

**Signature**

```ts
export declare const chain: (
  AIC: AIChain
) => <A, B>(f: (a: A) => AsyncIterableOption<B>) => (ma: AsyncIterableOption<A>) => AsyncIterableOption<B>
```

Added in v0.1.0

# Pointed

## of

**Signature**

```ts
export declare const of: <A>(a: A) => AsyncIterableOption<A>
```

Added in v0.1.0

# Zero

## zero

**Signature**

```ts
export declare const zero: <A>() => AsyncIterableOption<A>
```

Added in v0.1.0

# combinators

## apFirst

Combine two effectful actions, keeping only the result of the first.

Derivable from `Apply`.

**Signature**

```ts
export declare const apFirst: <B>(
  second: AsyncIterableOption<B>
) => <A>(first: AsyncIterableOption<A>) => AsyncIterableOption<A>
```

Added in v0.1.0

## apSecond

Combine two effectful actions, keeping only the result of the second.

Derivable from `Apply`.

**Signature**

```ts
export declare const apSecond: <B>(
  second: AsyncIterableOption<B>
) => <A>(first: AsyncIterableOption<A>) => AsyncIterableOption<B>
```

Added in v0.1.0

## chainAsyncIterableK

**Signature**

```ts
export declare const chainAsyncIterableK: (
  C: AIChain
) => <A, B>(f: (a: A) => AsyncIterable<B>) => (first: AsyncIterableOption<A>) => AsyncIterableOption<B>
```

Added in v0.1.0

## chainEitherK

**Signature**

```ts
export declare const chainEitherK: (
  C: AIChain
) => <E, A, B>(f: (a: A) => Either<E, B>) => (ma: AsyncIterableOption<A>) => AsyncIterableOption<B>
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
) => <A, B>(f: (a: A) => AsyncIterableOption<B>) => (first: AsyncIterableOption<A>) => AsyncIterableOption<A>
```

Added in v0.1.0

## chainFirstAsyncIterableK

**Signature**

```ts
export declare const chainFirstAsyncIterableK: (
  C: AIChain
) => <A, B>(f: (a: A) => AsyncIterable<B>) => (first: AsyncIterableOption<A>) => AsyncIterableOption<A>
```

Added in v0.1.0

## chainFirstEitherK

**Signature**

```ts
export declare const chainFirstEitherK: (
  C: AIChain
) => <E, A, B>(f: (a: A) => Either<E, B>) => (ma: AsyncIterableOption<A>) => AsyncIterableOption<A>
```

Added in v0.1.0

## chainFirstIOK

**Signature**

```ts
export declare const chainFirstIOK: (
  C: AIChain
) => <A, B>(f: (a: A) => IO<B>) => (first: AsyncIterableOption<A>) => AsyncIterableOption<A>
```

Added in v0.1.0

## chainIOK

**Signature**

```ts
export declare const chainIOK: (
  C: AIChain
) => <A, B>(f: (a: A) => IO<B>) => (first: AsyncIterableOption<A>) => AsyncIterableOption<B>
```

Added in v0.1.0

## chainOptionK

**Signature**

```ts
export declare const chainOptionK: (
  C: AIChain
) => <A, B>(f: (a: A) => O.Option<B>) => (ma: AsyncIterableOption<A>) => AsyncIterableOption<B>
```

Added in v0.1.0

## chainWithIndex

Composes computations in sequence, using the return value of one computation to determine the next computation.

**Signature**

```ts
export declare const chainWithIndex: (
  AIC: AIChainWithIndex
) => <A, B>(f: (i: number, a: A) => AsyncIterableOption<B>) => (ma: AsyncIterableOption<A>) => AsyncIterableOption<B>
```

Added in v0.1.0

## flap

Derivable from `Functor`.

**Signature**

```ts
export declare const flap: <A>(a: A) => <B>(fab: AsyncIterableOption<(a: A) => B>) => AsyncIterableOption<B>
```

Added in v0.1.0

## flatten

Derivable from `Chain`.

**Signature**

```ts
export declare const flatten: (
  C: AIChain
) => <A>(mma: AsyncIterableOption<AsyncIterableOption<A>>) => AsyncIterableOption<A>
```

Added in v0.1.0

## fromAsyncIterableK

**Signature**

```ts
export declare const fromAsyncIterableK: <A, B>(f: (...a: A) => AsyncIterable<B>) => (...a: A) => AsyncIterableOption<B>
```

Added in v0.1.0

## fromEitherK

**Signature**

```ts
export declare const fromEitherK: <E, A, B>(f: (...a: A) => Either<E, B>) => (...a: A) => AsyncIterableOption<B>
```

Added in v0.1.0

## fromIOK

**Signature**

```ts
export declare const fromIOK: <A, B>(f: (...a: A) => IO<B>) => (...a: A) => AsyncIterableOption<B>
```

Added in v0.1.0

## fromOptionK

**Signature**

```ts
export declare const fromOptionK: <A extends readonly unknown[], B>(
  f: (...a: A) => O.Option<B>
) => (...a: A) => AsyncIterableOption<B>
```

Added in v0.1.0

## getOnEmpty

Returns the provided AsyncIterableEither if empty.

**Signature**

```ts
export declare const getOnEmpty: <B>(
  onEmpty: Lazy<AsyncIterableOption<B>>
) => <A>(ma: AsyncIterableOption<A>) => AsyncIterableOption<B | A>
```

Added in v0.1.0

# constructors

## fromPredicate

**Signature**

```ts
export declare const fromPredicate: {
  <A, B extends A>(refinement: Refinement<A, B>): (a: A) => AsyncIterableOption<B>
  <A>(predicate: Predicate<A>): <B extends A>(b: B) => AsyncIterableOption<B>
  <A>(predicate: Predicate<A>): (a: A) => AsyncIterableOption<A>
}
```

Added in v0.1.0

## guard

**Signature**

```ts
export declare const guard: (b: boolean) => AsyncIterableOption<void>
```

Added in v0.1.0

## none

**Signature**

```ts
export declare const none: AsyncIterableOption<never>
```

Added in v0.1.0

## some

**Signature**

```ts
export declare const some: <A>(a: A) => AsyncIterableOption<A>
```

Added in v0.1.0

# destructors

## fold

Alias of [`matchE`](#matche).

**Signature**

```ts
export declare const fold: (
  C: AIChain
) => <B, A>(
  onNone: () => AsyncIterable<B>,
  onSome: (a: A) => AsyncIterable<B>
) => (ma: AsyncIterableOption<A>) => AsyncIterable<B>
```

Added in v0.1.0

## foldW

Alias of [`matchEW`](#matchew).

**Signature**

```ts
export declare const foldW: (
  C: AIChain
) => <B, C, A>(
  onNone: () => AsyncIterable<B>,
  onSome: (a: A) => AsyncIterable<C>
) => (ma: AsyncIterableOption<A>) => AsyncIterable<B | C>
```

Added in v0.1.0

## getOrElse

**Signature**

```ts
export declare const getOrElse: (
  C: AIChain
) => <A>(onNone: Lazy<AsyncIterable<A>>) => (fa: AsyncIterableOption<A>) => AsyncIterable<A>
```

Added in v0.1.0

## getOrElseW

Less strict version of [`getOrElse`](#getorelse).

**Signature**

```ts
export declare const getOrElseW: (
  M: AIChain
) => <B>(onNone: Lazy<AsyncIterable<B>>) => <A>(ma: AsyncIterableOption<A>) => AsyncIterable<B | A>
```

Added in v0.1.0

## match

**Signature**

```ts
export declare const match: <B, A>(
  onNone: () => B,
  onSome: (a: A) => B
) => (ma: AsyncIterableOption<A>) => AsyncIterable<B>
```

Added in v0.1.0

## matchE

**Signature**

```ts
export declare const matchE: (
  C: AIChain
) => <B, A>(
  onNone: () => AsyncIterable<B>,
  onSome: (a: A) => AsyncIterable<B>
) => (ma: AsyncIterableOption<A>) => AsyncIterable<B>
```

Added in v0.1.0

## matchEW

Less strict version of [`matchE`](#matche).

**Signature**

```ts
export declare const matchEW: (
  C: AIChain
) => <B, C, A>(
  onNone: () => AsyncIterable<B>,
  onSome: (a: A) => AsyncIterable<C>
) => (ma: AsyncIterableOption<A>) => AsyncIterable<B | C>
```

Added in v0.1.0

## matchW

Less strict version of [`match`](#match).

**Signature**

```ts
export declare const matchW: <B, A, C>(
  onNone: () => B,
  onSome: (a: A) => C
) => (ma: AsyncIterableOption<A>) => AsyncIterable<B | C>
```

Added in v0.1.0

# instances

## Applicative

**Signature**

```ts
export declare const Applicative: Applicative1<'AsyncIterableOption'>
```

Added in v0.1.0

## Apply

**Signature**

```ts
export declare const Apply: Apply1<'AsyncIterableOption'>
```

Added in v0.1.0

## Compactable

**Signature**

```ts
export declare const Compactable: Compactable1<'AsyncIterableOption'>
```

Added in v0.1.0

## Filterable

**Signature**

```ts
export declare const Filterable: Filterable1<'AsyncIterableOption'>
```

Added in v0.1.0

## FromAsyncIterable

**Signature**

```ts
export declare const FromAsyncIterable: FromAsyncIterable1<'AsyncIterableOption'>
```

Added in v0.1.0

## FromEither

**Signature**

```ts
export declare const FromEither: FromEither1<'AsyncIterableOption'>
```

Added in v0.1.0

## FromIO

**Signature**

```ts
export declare const FromIO: FromIO1<'AsyncIterableOption'>
```

Added in v0.1.0

## Functor

**Signature**

```ts
export declare const Functor: Functor1<'AsyncIterableOption'>
```

Added in v0.1.0

## FunctorWithIndex

**Signature**

```ts
export declare const FunctorWithIndex: FunctorWithIndex1<'AsyncIterableOption', number>
```

Added in v0.1.0

## Pointed

**Signature**

```ts
export declare const Pointed: Pointed1<'AsyncIterableOption'>
```

Added in v0.1.0

## URI

**Signature**

```ts
export declare const URI: 'AsyncIterableOption'
```

Added in v0.1.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v0.1.0

## Zero

**Signature**

```ts
export declare const Zero: Zero1<'AsyncIterableOption'>
```

Added in v0.1.0

# interop

## chainNullableK

**Signature**

```ts
export declare const chainNullableK: (
  C: AIChain
) => <A, B>(f: (a: A) => B | null | undefined) => (ma: AsyncIterableOption<A>) => AsyncIterableOption<NonNullable<B>>
```

Added in v0.1.0

## fromNullable

**Signature**

```ts
export declare const fromNullable: <A>(a: A) => AsyncIterableOption<NonNullable<A>>
```

Added in v0.1.0

## fromNullableK

**Signature**

```ts
export declare const fromNullableK: <A extends readonly unknown[], B>(
  f: (...a: A) => B | null | undefined
) => (...a: A) => AsyncIterableOption<NonNullable<B>>
```

Added in v0.1.0

## tryCatch

Transforms a `AsyncIterable` that may reject to a `AsyncIterable` that never rejects and returns an `Option` instead.

See also [`tryCatchK`](#trycatchk).

**Signature**

```ts
export declare const tryCatch: <A>(f: Lazy<AsyncIterable<A>>) => AsyncIterableOption<A>
```

Added in v0.1.0

## tryCatchK

Converts a function returning a `Promise` to one returning a `AsyncIterableOption`.

**Signature**

```ts
export declare const tryCatchK: <A extends readonly unknown[], B>(
  f: (...a: A) => AsyncIterable<B>
) => (...a: A) => AsyncIterableOption<B>
```

Added in v0.1.0

# model

## AsyncIterableOption (interface)

**Signature**

```ts
export interface AsyncIterableOption<A> extends AsyncIterable<Option<A>> {}
```

Added in v0.1.0

# natural transformations

## fromAsyncIterable

**Signature**

```ts
export declare const fromAsyncIterable: NaturalTransformation11<'AsyncIterable', 'AsyncIterableOption'>
```

Added in v0.1.0

## fromAsyncIterableEither

**Signature**

```ts
export declare const fromAsyncIterableEither: NaturalTransformation21<'AsyncIterableEither', 'AsyncIterableOption'>
```

Added in v0.1.0

## fromEither

**Signature**

```ts
export declare const fromEither: NaturalTransformation21<'Either', 'AsyncIterableOption'>
```

Added in v0.1.0

## fromIO

**Signature**

```ts
export declare const fromIO: NaturalTransformation11<'IO', 'AsyncIterableOption'>
```

Added in v0.1.0

## fromOption

**Signature**

```ts
export declare const fromOption: NaturalTransformation11<'Option', 'AsyncIterableOption'>
```

Added in v0.1.0

## fromTask

**Signature**

```ts
export declare const fromTask: NaturalTransformation11<'Task', 'AsyncIterableOption'>
```

Added in v0.1.0

## fromTaskEither

**Signature**

```ts
export declare const fromTaskEither: <E = never, A = never>(me: TE.TaskEither<E, A>) => AsyncIterableOption<A>
```

Added in v0.1.0

# utils

## ApT

**Signature**

```ts
export declare const ApT: AsyncIterableOption<readonly []>
```

Added in v0.1.0

## Do

**Signature**

```ts
export declare const Do: AsyncIterableOption<{}>
```

Added in v0.1.0

## apS

**Signature**

```ts
export declare const apS: <N, A, B>(
  name: Exclude<N, keyof A>,
  fb: AsyncIterableOption<B>
) => (fa: AsyncIterableOption<A>) => AsyncIterableOption<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v0.1.0

## bind

**Signature**

```ts
export declare const bind: (
  C: AIChain
) => <N, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => AsyncIterableOption<B>
) => (ma: AsyncIterableOption<A>) => AsyncIterableOption<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v0.1.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N>(
  name: N
) => <A>(fa: AsyncIterableOption<A>) => AsyncIterableOption<{ readonly [K in N]: A }>
```

Added in v0.1.0

## getChain

**Signature**

```ts
export declare const getChain: (AIC: AIChain) => Chain1<URI>
```

Added in v0.1.0

## getChainWithIndex

**Signature**

```ts
export declare const getChainWithIndex: (AIC: AIChainWithIndex) => ChainWithIndex1<URI, number>
```

Added in v0.1.0

## getMonad

**Signature**

```ts
export declare const getMonad: (AIC: AIChain) => Monad1<URI>
```

Added in v0.1.0

## getMonadAsyncIterable

**Signature**

```ts
export declare const getMonadAsyncIterable: (AIC: AIChainWithIndex) => MonadAsyncIterable1<URI>
```

Added in v0.1.0

## getMonadIO

**Signature**

```ts
export declare const getMonadIO: (AIC: AIChain) => MonadIO1<URI>
```

Added in v0.1.0

## getMonadTask

**Signature**

```ts
export declare const getMonadTask: (AIC: AIChain) => MonadTask1<URI>
```

Added in v0.1.0
