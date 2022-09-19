---
title: AsyncIterableEither.ts
nav_order: 5
parent: Modules
---

## AsyncIterableEither overview

```ts
interface AsyncIterableEither<E, A> extends AsyncIterable<Either<E, A>> {}
```

Added in v0.1.0

---

<h2 class="text-delta">Table of contents</h2>

- [Apply](#apply)
  - [ap](#ap)
  - [apW](#apw)
- [Bifunctor](#bifunctor)
  - [bimap](#bimap)
  - [mapLeft](#mapleft)
- [Functor](#functor)
  - [map](#map)
- [FunctorWithIndex](#functorwithindex)
  - [mapWithIndex](#mapwithindex)
- [Monad](#monad)
  - [chain](#chain)
  - [chainW](#chainw)
- [MonadAsyncIterable](#monadasynciterable)
  - [throwError](#throwerror)
- [Pointed](#pointed)
  - [of](#of)
- [combinators](#combinators)
  - [apFirst](#apfirst)
  - [apFirstW](#apfirstw)
  - [apSecond](#apsecond)
  - [apSecondW](#apsecondw)
  - [chainAsyncIterableK](#chainasynciterablek)
  - [chainAsyncIterableOptionK](#chainasynciterableoptionk)
  - [chainAsyncIterableOptionKW](#chainasynciterableoptionkw)
  - [chainEitherK](#chaineitherk)
  - [chainEitherKW](#chaineitherkw)
  - [chainFirst](#chainfirst)
  - [chainFirstAsyncIterableK](#chainfirstasynciterablek)
  - [chainFirstEitherK](#chainfirsteitherk)
  - [chainFirstEitherKW](#chainfirsteitherkw)
  - [chainFirstIOK](#chainfirstiok)
  - [chainFirstW](#chainfirstw)
  - [chainIOEitherK](#chainioeitherk)
  - [chainIOEitherKW](#chainioeitherkw)
  - [chainIOK](#chainiok)
  - [chainOptionK](#chainoptionk)
  - [chainWithIndex](#chainwithindex)
  - [concat](#concat)
  - [concatW](#concatw)
  - [filterOrElse](#filterorelse)
  - [filterOrElseW](#filterorelsew)
  - [flap](#flap)
  - [flatten](#flatten)
  - [flattenW](#flattenw)
  - [fromAsyncIterableK](#fromasynciterablek)
  - [fromAsyncIterableOptionK](#fromasynciterableoptionk)
  - [fromEitherK](#fromeitherk)
  - [fromIOEitherK](#fromioeitherk)
  - [fromIOK](#fromiok)
  - [fromOptionK](#fromoptionk)
  - [getOnEmpty](#getonempty)
  - [getOnEmptyW](#getonemptyw)
  - [orElse](#orelse)
  - [orElseFirst](#orelsefirst)
  - [orElseFirstAsyncIterableK](#orelsefirstasynciterablek)
  - [orElseFirstIOK](#orelsefirstiok)
  - [orElseFirstW](#orelsefirstw)
  - [orElseW](#orelsew)
  - [orLeft](#orleft)
  - [swap](#swap)
- [constructors](#constructors)
  - [fromPredicate](#frompredicate)
  - [left](#left)
  - [leftAsyncIterable](#leftasynciterable)
  - [leftIO](#leftio)
  - [leftTask](#lefttask)
  - [right](#right)
  - [rightAsyncIterable](#rightasynciterable)
  - [rightIO](#rightio)
  - [rightTask](#righttask)
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
  - [Bifunctor](#bifunctor-1)
  - [FromAsyncIterable](#fromasynciterable)
  - [FromEither](#fromeither)
  - [FromIO](#fromio)
  - [Functor](#functor-1)
  - [FunctorWithIndex](#functorwithindex-1)
  - [Pointed](#pointed-1)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
  - [getApplicativeAsyncIterableValidation](#getapplicativeasynciterablevalidation)
  - [getCompactable](#getcompactable)
  - [getFilterable](#getfilterable)
  - [getMonadThrow](#getmonadthrow)
- [interop](#interop)
  - [chainNullableK](#chainnullablek)
  - [fromNullable](#fromnullable)
  - [fromNullableK](#fromnullablek)
  - [toUnion](#tounion)
  - [tryCatch](#trycatch)
  - [tryCatchK](#trycatchk)
- [model](#model)
  - [AsyncIterableEither (interface)](#asynciterableeither-interface)
- [natural transformations](#natural-transformations)
  - [fromAsyncIterable](#fromasynciterable)
  - [fromAsyncIterableOption](#fromasynciterableoption)
  - [fromEither](#fromeither)
  - [fromIO](#fromio)
  - [fromIOEither](#fromioeither)
  - [fromOption](#fromoption)
  - [fromTask](#fromtask)
  - [fromTaskEither](#fromtaskeither)
- [utils](#utils)
  - [ApT](#apt)
  - [Do](#do)
  - [apS](#aps)
  - [apSW](#apsw)
  - [bind](#bind)
  - [bindTo](#bindto)
  - [bindW](#bindw)
  - [getChain](#getchain)
  - [getChainWithIndex](#getchainwithindex)
  - [getMonad](#getmonad)
  - [getMonadAsyncIterable](#getmonadasynciterable)
  - [getMonadIO](#getmonadio)
  - [getMonadTask](#getmonadtask)
  - [getMonoid](#getmonoid)
  - [toTaskEither](#totaskeither)
  - [toTaskEitherW](#totaskeitherw)

---

# Apply

## ap

Apply a function to an argument under a type constructor.

**Signature**

```ts
export declare const ap: <E, A>(
  fa: AsyncIterableEither<E, A>
) => <B>(fab: AsyncIterableEither<E, (a: A) => B>) => AsyncIterableEither<E, B>
```

Added in v0.1.0

## apW

Less strict version of [`ap`](#ap).

**Signature**

```ts
export declare const apW: <E2, A>(
  fa: AsyncIterableEither<E2, A>
) => <E1, B>(fab: AsyncIterableEither<E1, (a: A) => B>) => AsyncIterableEither<E2 | E1, B>
```

Added in v0.1.0

# Bifunctor

## bimap

Map a pair of functions over the two type arguments of the bifunctor.

**Signature**

```ts
export declare const bimap: <E, G, A, B>(
  f: (e: E) => G,
  g: (a: A) => B
) => (fa: AsyncIterableEither<E, A>) => AsyncIterableEither<G, B>
```

Added in v0.1.0

## mapLeft

Map a function over the first type argument of a bifunctor.

**Signature**

```ts
export declare const mapLeft: <E, G>(f: (e: E) => G) => <A>(fa: AsyncIterableEither<E, A>) => AsyncIterableEither<G, A>
```

Added in v0.1.0

# Functor

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <E>(fa: AsyncIterableEither<E, A>) => AsyncIterableEither<E, B>
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
) => <E>(fa: AsyncIterableEither<E, A>) => AsyncIterableEither<E, B>
```

Added in v0.1.0

# Monad

## chain

Composes computations in sequence, using the return value of one computation to determine the next computation.

**Signature**

```ts
export declare const chain: (
  C: AIChain
) => <E, A, B>(f: (a: A) => AsyncIterableEither<E, B>) => (ma: AsyncIterableEither<E, A>) => AsyncIterableEither<E, B>
```

Added in v0.1.0

## chainW

Less strict version of [`chain`](#chain).

**Signature**

```ts
export declare const chainW: (
  C: AIChain
) => <E2, A, B>(
  f: (a: A) => AsyncIterableEither<E2, B>
) => <E1>(ma: AsyncIterableEither<E1, A>) => AsyncIterableEither<E2 | E1, B>
```

Added in v0.1.0

# MonadAsyncIterable

## throwError

**Signature**

```ts
export declare const throwError: <E, A>(e: E) => AsyncIterableEither<E, A>
```

Added in v0.1.0

# Pointed

## of

**Signature**

```ts
export declare const of: <E = never, A = never>(a: A) => AsyncIterableEither<E, A>
```

Added in v0.1.0

# combinators

## apFirst

Combine two effectful actions, keeping only the result of the first.

Derivable from `Apply`.

**Signature**

```ts
export declare const apFirst: <E, B>(
  second: AsyncIterableEither<E, B>
) => <A>(first: AsyncIterableEither<E, A>) => AsyncIterableEither<E, A>
```

Added in v0.1.0

## apFirstW

Less strict version of [`apFirst`](#apfirst).

**Signature**

```ts
export declare const apFirstW: <E2, B>(
  second: AsyncIterableEither<E2, B>
) => <E1, A>(first: AsyncIterableEither<E1, A>) => AsyncIterableEither<E2 | E1, A>
```

Added in v0.1.0

## apSecond

Combine two effectful actions, keeping only the result of the second.

Derivable from `Apply`.

**Signature**

```ts
export declare const apSecond: <E, B>(
  second: AsyncIterableEither<E, B>
) => <A>(first: AsyncIterableEither<E, A>) => AsyncIterableEither<E, B>
```

Added in v0.1.0

## apSecondW

Less strict version of [`apSecond`](#apsecond).

**Signature**

```ts
export declare const apSecondW: <E2, B>(
  second: AsyncIterableEither<E2, B>
) => <E1, A>(first: AsyncIterableEither<E1, A>) => AsyncIterableEither<E2 | E1, B>
```

Added in v0.1.0

## chainAsyncIterableK

**Signature**

```ts
export declare const chainAsyncIterableK: (
  AIC: AIChain
) => <A, B>(f: (a: A) => AsyncIterable<B>) => <E>(first: AsyncIterableEither<E, A>) => AsyncIterableEither<E, B>
```

Added in v0.1.0

## chainAsyncIterableOptionK

**Signature**

```ts
export declare const chainAsyncIterableOptionK: (
  AIC: AIChain
) => <E>(
  onNone: Lazy<E>
) => <A, B>(f: (a: A) => AsyncIterableOption<B>) => (ma: AsyncIterableEither<E, A>) => AsyncIterableEither<E, B>
```

Added in v0.1.0

## chainAsyncIterableOptionKW

**Signature**

```ts
export declare const chainAsyncIterableOptionKW: (
  AIC: AIChain
) => <E2>(
  onNone: Lazy<E2>
) => <A, B>(
  f: (a: A) => AsyncIterableOption<B>
) => <E1>(ma: AsyncIterableEither<E1, A>) => AsyncIterableEither<E2 | E1, B>
```

Added in v0.1.0

## chainEitherK

**Signature**

```ts
export declare const chainEitherK: (
  AIC: AIChain
) => <E, A, B>(f: (a: A) => E.Either<E, B>) => (ma: AsyncIterableEither<E, A>) => AsyncIterableEither<E, B>
```

Added in v0.1.0

## chainEitherKW

Less strict version of [`chainEitherK`](#chaineitherk).

**Signature**

```ts
export declare const chainEitherKW: (
  AIC: AIChain
) => <E2, A, B>(f: (a: A) => E.Either<E2, B>) => <E1>(ma: AsyncIterableEither<E1, A>) => AsyncIterableEither<E2 | E1, B>
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
  f: (a: A) => AsyncIterableEither<E, B>
) => (first: AsyncIterableEither<E, A>) => AsyncIterableEither<E, A>
```

Added in v0.1.0

## chainFirstAsyncIterableK

**Signature**

```ts
export declare const chainFirstAsyncIterableK: (
  AIC: AIChain
) => <A, B>(f: (a: A) => AsyncIterable<B>) => <E>(first: AsyncIterableEither<E, A>) => AsyncIterableEither<E, A>
```

Added in v0.1.0

## chainFirstEitherK

**Signature**

```ts
export declare const chainFirstEitherK: (
  AIC: AIChain
) => <A, E, B>(f: (a: A) => E.Either<E, B>) => (ma: AsyncIterableEither<E, A>) => AsyncIterableEither<E, A>
```

Added in v0.1.0

## chainFirstEitherKW

Less strict version of [`chainFirstEitherK`](#chainfirsteitherk).

**Signature**

```ts
export declare const chainFirstEitherKW: (
  AIC: AIChain
) => <A, E2, B>(f: (a: A) => E.Either<E2, B>) => <E1>(ma: AsyncIterableEither<E1, A>) => AsyncIterableEither<E2 | E1, A>
```

Added in v0.1.0

## chainFirstIOK

**Signature**

```ts
export declare const chainFirstIOK: (
  AIC: AIChain
) => <A, B>(f: (a: A) => IO<B>) => <E>(first: AsyncIterableEither<E, A>) => AsyncIterableEither<E, A>
```

Added in v0.1.0

## chainFirstW

Less strict version of [`chainFirst`](#chainfirst).

Derivable from `Chain`.

**Signature**

```ts
export declare const chainFirstW: (
  C: AIChain
) => <E2, A, B>(
  f: (a: A) => AsyncIterableEither<E2, B>
) => <E1>(ma: AsyncIterableEither<E1, A>) => AsyncIterableEither<E2 | E1, A>
```

Added in v0.1.0

## chainIOEitherK

**Signature**

```ts
export declare const chainIOEitherK: (
  AIC: AIChain
) => <E, A, B>(f: (a: A) => IOEither<E, B>) => (ma: AsyncIterableEither<E, A>) => AsyncIterableEither<E, B>
```

Added in v0.1.0

## chainIOEitherKW

Less strict version of [`chainIOEitherK`](#chainioeitherk).

**Signature**

```ts
export declare const chainIOEitherKW: (
  AIC: AIChain
) => <E2, A, B>(f: (a: A) => IOEither<E2, B>) => <E1>(ma: AsyncIterableEither<E1, A>) => AsyncIterableEither<E2 | E1, B>
```

Added in v0.1.0

## chainIOK

**Signature**

```ts
export declare const chainIOK: (
  AIC: AIChain
) => <A, B>(f: (a: A) => IO<B>) => <E>(first: AsyncIterableEither<E, A>) => AsyncIterableEither<E, B>
```

Added in v0.1.0

## chainOptionK

**Signature**

```ts
export declare const chainOptionK: (
  AIC: AIChain
) => <E>(
  onNone: Lazy<E>
) => <A, B>(f: (a: A) => O.Option<B>) => (ma: AsyncIterableEither<E, A>) => AsyncIterableEither<E, B>
```

Added in v0.1.0

## chainWithIndex

Composes computations in sequence, using the return value of one computation to determine the next computation.

**Signature**

```ts
export declare const chainWithIndex: (
  C: AIChainWithIndex
) => <E, A, B>(
  f: (i: number, a: A) => AsyncIterableEither<E, B>
) => (ma: AsyncIterableEither<E, A>) => AsyncIterableEither<E, B>
```

Added in v0.1.0

## concat

**Signature**

```ts
export declare const concat: <E, A>(
  second: AsyncIterableEither<E, A>
) => (first: AsyncIterableEither<E, A>) => AsyncIterableEither<E, A>
```

Added in v0.1.1

## concatW

**Signature**

```ts
export declare const concatW: <E2, B>(
  second: AsyncIterableEither<E2, B>
) => <E, A>(first: AsyncIterableEither<E, A>) => AsyncIterableEither<E2 | E, B | A>
```

Added in v0.1.1

## filterOrElse

**Signature**

```ts
export declare const filterOrElse: (AIC: AIChain) => {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (
    ma: AsyncIterableEither<E, A>
  ) => AsyncIterableEither<E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <B extends A>(
    mb: AsyncIterableEither<E, B>
  ) => AsyncIterableEither<E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (ma: AsyncIterableEither<E, A>) => AsyncIterableEither<E, A>
}
```

Added in v0.1.0

## filterOrElseW

Less strict version of [`filterOrElse`](#filterorelse).

**Signature**

```ts
export declare const filterOrElseW: (AIC: AIChain) => {
  <A, B extends A, E2>(refinement: Refinement<A, B>, onFalse: (a: A) => E2): <E1>(
    ma: AsyncIterableEither<E1, A>
  ) => AsyncIterableEither<E2 | E1, B>
  <A, E2>(predicate: Predicate<A>, onFalse: (a: A) => E2): <E1, B extends A>(
    mb: AsyncIterableEither<E1, B>
  ) => AsyncIterableEither<E2 | E1, B>
  <A, E2>(predicate: Predicate<A>, onFalse: (a: A) => E2): <E1>(
    ma: AsyncIterableEither<E1, A>
  ) => AsyncIterableEither<E2 | E1, A>
}
```

Added in v0.1.0

## flap

Derivable from `Functor`.

**Signature**

```ts
export declare const flap: <A>(a: A) => <E, B>(fab: AsyncIterableEither<E, (a: A) => B>) => AsyncIterableEither<E, B>
```

Added in v0.1.0

## flatten

Derivable from `Chain`.

**Signature**

```ts
export declare const flatten: (
  C: AIChain
) => <E, A>(mma: AsyncIterableEither<E, AsyncIterableEither<E, A>>) => AsyncIterableEither<E, A>
```

Added in v0.1.0

## flattenW

Less strict version of [`flatten`](#flatten).

**Signature**

```ts
export declare const flattenW: (
  C: AIChain
) => <E1, E2, A>(mma: AsyncIterableEither<E1, AsyncIterableEither<E2, A>>) => AsyncIterableEither<E1 | E2, A>
```

Added in v0.1.0

## fromAsyncIterableK

**Signature**

```ts
export declare const fromAsyncIterableK: <A, B>(
  f: (...a: A) => AsyncIterable<B>
) => <E>(...a: A) => AsyncIterableEither<E, B>
```

Added in v0.1.0

## fromAsyncIterableOptionK

**Signature**

```ts
export declare const fromAsyncIterableOptionK: <E>(
  onNone: Lazy<E>
) => <A extends readonly unknown[], B>(f: (...a: A) => AsyncIterableOption<B>) => (...a: A) => AsyncIterableEither<E, B>
```

Added in v0.1.0

## fromEitherK

**Signature**

```ts
export declare const fromEitherK: <E, A extends readonly unknown[], B>(
  f: (...a: A) => E.Either<E, B>
) => (...a: A) => AsyncIterableEither<E, B>
```

Added in v0.1.0

## fromIOEitherK

**Signature**

```ts
export declare const fromIOEitherK: <E, A extends readonly unknown[], B>(
  f: (...a: A) => IOEither<E, B>
) => (...a: A) => AsyncIterableEither<E, B>
```

Added in v0.1.0

## fromIOK

**Signature**

```ts
export declare const fromIOK: <A, B>(f: (...a: A) => IO<B>) => <E>(...a: A) => AsyncIterableEither<E, B>
```

Added in v0.1.0

## fromOptionK

**Signature**

```ts
export declare const fromOptionK: <E>(
  onNone: Lazy<E>
) => <A, B>(f: (...a: A) => O.Option<B>) => (...a: A) => AsyncIterableEither<E, B>
```

Added in v0.1.0

## getOnEmpty

Returns the provided AsyncIterableEither if empty.

**Signature**

```ts
export declare const getOnEmpty: <E, B>(
  onEmpty: Lazy<AsyncIterableEither<E, B>>
) => <A>(ma: AsyncIterableEither<E, A>) => AsyncIterableEither<E, B | A>
```

Added in v0.1.0

## getOnEmptyW

Less strict version of `getOnEmpty`.

**Signature**

```ts
export declare const getOnEmptyW: <E2, B>(
  onEmpty: Lazy<AsyncIterableEither<E2, B>>
) => <E, A>(ma: AsyncIterableEither<E, A>) => AsyncIterableEither<E2 | E, B | A>
```

Added in v0.1.0

## orElse

Returns `ma` if is a `Right` or the value returned by `onLeft` otherwise.

See also [alt](#alt).

**Signature**

```ts
export declare const orElse: (
  C: AIChain
) => <E1, A, E2>(
  onLeft: (e: E1) => AsyncIterableEither<E2, A>
) => (ma: AsyncIterableEither<E1, A>) => AsyncIterableEither<E2, A>
```

Added in v0.1.0

## orElseFirst

**Signature**

```ts
export declare const orElseFirst: (
  C: AIChain
) => <E, B>(
  onLeft: (e: E) => AsyncIterableEither<E, B>
) => <A>(ma: AsyncIterableEither<E, A>) => AsyncIterableEither<E, A>
```

Added in v0.1.0

## orElseFirstAsyncIterableK

**Signature**

```ts
export declare const orElseFirstAsyncIterableK: (
  C: AIChain
) => <E, B>(onLeft: (e: E) => AsyncIterable<B>) => <A>(ma: AsyncIterableEither<E, A>) => AsyncIterableEither<E, A>
```

Added in v0.1.0

## orElseFirstIOK

**Signature**

```ts
export declare const orElseFirstIOK: (
  C: AIChain
) => <E, B>(onLeft: (e: E) => IO<B>) => <A>(ma: AsyncIterableEither<E, A>) => AsyncIterableEither<E, A>
```

Added in v0.1.0

## orElseFirstW

**Signature**

```ts
export declare const orElseFirstW: (
  C: AIChain
) => <E1, E2, B>(
  onLeft: (e: E1) => AsyncIterableEither<E2, B>
) => <A>(ma: AsyncIterableEither<E1, A>) => AsyncIterableEither<E1 | E2, A>
```

Added in v0.1.0

## orElseW

Less strict version of [`orElse`](#orelse).

**Signature**

```ts
export declare const orElseW: (
  C: AIChain
) => <E1, E2, B>(
  onLeft: (e: E1) => AsyncIterableEither<E2, B>
) => <A>(ma: AsyncIterableEither<E1, A>) => AsyncIterableEither<E2, B | A>
```

Added in v0.1.0

## orLeft

**Signature**

```ts
export declare const orLeft: (
  C: AIChain
) => <E1, E2>(onLeft: (e: E1) => AsyncIterable<E2>) => <A>(fa: AsyncIterableEither<E1, A>) => AsyncIterableEither<E2, A>
```

Added in v0.1.0

## swap

**Signature**

```ts
export declare const swap: <E, A>(ma: AsyncIterableEither<E, A>) => AsyncIterableEither<A, E>
```

Added in v0.1.0

# constructors

## fromPredicate

**Signature**

```ts
export declare const fromPredicate: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (a: A) => AsyncIterableEither<E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <B>(b: B) => AsyncIterableEither<E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (a: A) => AsyncIterableEither<E, A>
}
```

Added in v0.1.0

## left

**Signature**

```ts
export declare const left: <E = never, A = never>(e: E) => AsyncIterableEither<E, A>
```

Added in v0.1.0

## leftAsyncIterable

**Signature**

```ts
export declare const leftAsyncIterable: <E = never, A = never>(me: AsyncIterable<E>) => AsyncIterableEither<E, A>
```

Added in v0.1.0

## leftIO

**Signature**

```ts
export declare const leftIO: <E = never, A = never>(me: IO<E>) => AsyncIterableEither<E, A>
```

Added in v0.1.0

## leftTask

**Signature**

```ts
export declare const leftTask: <E = never, A = never>(me: T.Task<E>) => AsyncIterableEither<E, A>
```

Added in v0.1.0

## right

**Signature**

```ts
export declare const right: <E = never, A = never>(a: A) => AsyncIterableEither<E, A>
```

Added in v0.1.0

## rightAsyncIterable

**Signature**

```ts
export declare const rightAsyncIterable: <E = never, A = never>(ma: AsyncIterable<A>) => AsyncIterableEither<E, A>
```

Added in v0.1.0

## rightIO

**Signature**

```ts
export declare const rightIO: <E = never, A = never>(ma: IO<A>) => AsyncIterableEither<E, A>
```

Added in v0.1.0

## rightTask

**Signature**

```ts
export declare const rightTask: <E = never, A = never>(ma: T.Task<A>) => AsyncIterableEither<E, A>
```

Added in v0.1.0

# destructors

## fold

Alias of [`matchE`](#matche).

**Signature**

```ts
export declare const fold: (
  C: AIChain
) => <E, A, B>(
  onLeft: (e: E) => AsyncIterable<B>,
  onRight: (a: A) => AsyncIterable<B>
) => (ma: AsyncIterableEither<E, A>) => AsyncIterable<B>
```

Added in v0.1.0

## foldW

Alias of [`matchEW`](#matchew).

**Signature**

```ts
export declare const foldW: (
  C: AIChain
) => <E, B, A, C>(
  onLeft: (e: E) => AsyncIterable<B>,
  onRight: (a: A) => AsyncIterable<C>
) => (ma: AsyncIterableEither<E, A>) => AsyncIterable<B | C>
```

Added in v0.1.0

## getOrElse

**Signature**

```ts
export declare const getOrElse: (
  C: AIChain
) => <E, A>(onLeft: (e: E) => AsyncIterable<A>) => (ma: AsyncIterableEither<E, A>) => AsyncIterable<A>
```

Added in v0.1.0

## getOrElseW

Less strict version of [`getOrElse`](#getorelse).

**Signature**

```ts
export declare const getOrElseW: (
  C: AIChain
) => <E, B>(onLeft: (e: E) => AsyncIterable<B>) => <A>(ma: AsyncIterableEither<E, A>) => AsyncIterable<B | A>
```

Added in v0.1.0

## match

**Signature**

```ts
export declare const match: <E, B, A>(
  onLeft: (e: E) => B,
  onRight: (a: A) => B
) => (ma: AsyncIterableEither<E, A>) => AsyncIterable<B>
```

Added in v0.1.0

## matchE

**Signature**

```ts
export declare const matchE: (
  C: AIChain
) => <E, A, B>(
  onLeft: (e: E) => AsyncIterable<B>,
  onRight: (a: A) => AsyncIterable<B>
) => (ma: AsyncIterableEither<E, A>) => AsyncIterable<B>
```

Added in v0.1.0

## matchEW

Less strict version of [`matchE`](#matche).

**Signature**

```ts
export declare const matchEW: (
  C: AIChain
) => <E, B, A, C>(
  onLeft: (e: E) => AsyncIterable<B>,
  onRight: (a: A) => AsyncIterable<C>
) => (ma: AsyncIterableEither<E, A>) => AsyncIterable<B | C>
```

Added in v0.1.0

## matchW

Less strict version of [`match`](#match).

**Signature**

```ts
export declare const matchW: <E, B, A, C>(
  onLeft: (e: E) => B,
  onRight: (a: A) => C
) => (ma: AsyncIterableEither<E, A>) => AsyncIterable<B | C>
```

Added in v0.1.0

# instances

## Applicative

**Signature**

```ts
export declare const Applicative: Applicative2<'AsyncIterableEither'>
```

Added in v0.1.0

## Apply

**Signature**

```ts
export declare const Apply: Apply2<'AsyncIterableEither'>
```

Added in v0.1.0

## Bifunctor

**Signature**

```ts
export declare const Bifunctor: Bifunctor2<'AsyncIterableEither'>
```

Added in v0.1.0

## FromAsyncIterable

**Signature**

```ts
export declare const FromAsyncIterable: FromAsyncIterable2<'AsyncIterableEither'>
```

Added in v0.1.0

## FromEither

**Signature**

```ts
export declare const FromEither: FromEither2<'AsyncIterableEither'>
```

Added in v0.1.0

## FromIO

**Signature**

```ts
export declare const FromIO: FromIO2<'AsyncIterableEither'>
```

Added in v0.1.0

## Functor

**Signature**

```ts
export declare const Functor: Functor2<'AsyncIterableEither'>
```

Added in v0.1.0

## FunctorWithIndex

**Signature**

```ts
export declare const FunctorWithIndex: FunctorWithIndex2<'AsyncIterableEither', number>
```

Added in v0.1.0

## Pointed

**Signature**

```ts
export declare const Pointed: Pointed2<'AsyncIterableEither'>
```

Added in v0.1.0

## URI

**Signature**

```ts
export declare const URI: 'AsyncIterableEither'
```

Added in v0.1.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v0.1.0

## getApplicativeAsyncIterableValidation

**Signature**

```ts
export declare function getApplicativeAsyncIterableValidation<E>(
  A: Apply1<AI.URI>,
  S: Semigroup<E>
): Applicative2C<URI, E>
```

Added in v0.1.0

## getCompactable

**Signature**

```ts
export declare const getCompactable: <E>(M: Monoid<E>) => Compactable2C<'AsyncIterableEither', E>
```

Added in v0.1.0

## getFilterable

**Signature**

```ts
export declare function getFilterable<E>(M: Monoid<E>): Filterable2C<URI, E>
```

Added in v0.1.0

## getMonadThrow

**Signature**

```ts
export declare const getMonadThrow: (AIC: AIChain) => MonadThrow2<URI>
```

Added in v0.1.0

# interop

## chainNullableK

**Signature**

```ts
export declare const chainNullableK: (
  C: AIChain
) => <E>(
  e: E
) => <A, B>(
  f: (a: A) => B | null | undefined
) => (ma: AsyncIterableEither<E, A>) => AsyncIterableEither<E, NonNullable<B>>
```

Added in v0.1.0

## fromNullable

**Signature**

```ts
export declare const fromNullable: <E>(e: E) => <A>(a: A) => AsyncIterableEither<E, NonNullable<A>>
```

Added in v0.1.0

## fromNullableK

**Signature**

```ts
export declare const fromNullableK: <E>(
  e: E
) => <A extends readonly unknown[], B>(
  f: (...a: A) => B | null | undefined
) => (...a: A) => AsyncIterableEither<E, NonNullable<B>>
```

Added in v0.1.0

## toUnion

**Signature**

```ts
export declare const toUnion: <E, A>(fa: AsyncIterableEither<E, A>) => AsyncIterable<E | A>
```

Added in v0.1.0

## tryCatch

Transforms a `AsyncIterable` that may reject to a `AsyncIterable` that never rejects and returns an `Either` instead.

See also [`tryCatchK`](#trycatchk).

**Signature**

```ts
export declare const tryCatch: <E, A>(
  f: Lazy<AsyncIterable<A>>,
  onRejected: (reason: unknown) => E
) => AsyncIterableEither<E, A>
```

Added in v0.1.0

## tryCatchK

Converts a function returning a `AsyncIterable` to one returning a `AsyncIterableEither`.

**Signature**

```ts
export declare const tryCatchK: <E, A extends readonly unknown[], B>(
  f: (...a: A) => AsyncIterable<B>,
  onRejected: (reason: unknown) => E
) => (...a: A) => AsyncIterableEither<E, B>
```

Added in v0.1.0

# model

## AsyncIterableEither (interface)

**Signature**

```ts
export interface AsyncIterableEither<E, A> extends AsyncIterable<Either<E, A>> {}
```

Added in v0.1.0

# natural transformations

## fromAsyncIterable

**Signature**

```ts
export declare const fromAsyncIterable: NaturalTransformation12<'AsyncIterable', 'AsyncIterableEither'>
```

Added in v0.1.0

## fromAsyncIterableOption

**Signature**

```ts
export declare const fromAsyncIterableOption: <E>(
  onNone: Lazy<E>
) => NaturalTransformation12C<'AsyncIterableOption', 'AsyncIterableEither', E>
```

Added in v0.1.0

## fromEither

**Signature**

```ts
export declare const fromEither: NaturalTransformation22<'Either', 'AsyncIterableEither'>
```

Added in v0.1.0

## fromIO

**Signature**

```ts
export declare const fromIO: NaturalTransformation12<'IO', 'AsyncIterableEither'>
```

Added in v0.1.0

## fromIOEither

**Signature**

```ts
export declare const fromIOEither: NaturalTransformation22<'IOEither', 'AsyncIterableEither'>
```

Added in v0.1.0

## fromOption

**Signature**

```ts
export declare const fromOption: <E>(onNone: Lazy<E>) => NaturalTransformation12C<'Option', 'AsyncIterableEither', E>
```

Added in v0.1.0

## fromTask

**Signature**

```ts
export declare const fromTask: NaturalTransformation12<'Task', 'AsyncIterableEither'>
```

Added in v0.1.0

## fromTaskEither

**Signature**

```ts
export declare const fromTaskEither: <E = never, A = never>(me: TE.TaskEither<E, A>) => AsyncIterableEither<E, A>
```

Added in v0.1.0

# utils

## ApT

**Signature**

```ts
export declare const ApT: AsyncIterableEither<never, readonly []>
```

Added in v0.1.0

## Do

**Signature**

```ts
export declare const Do: AsyncIterableEither<never, {}>
```

Added in v0.1.0

## apS

**Signature**

```ts
export declare const apS: <N, A, E, B>(
  name: Exclude<N, keyof A>,
  fb: AsyncIterableEither<E, B>
) => (
  fa: AsyncIterableEither<E, A>
) => AsyncIterableEither<E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v0.1.0

## apSW

**Signature**

```ts
export declare const apSW: <A, N extends string, E2, B>(
  name: Exclude<N, keyof A>,
  fb: AsyncIterableEither<E2, B>
) => <E1>(
  fa: AsyncIterableEither<E1, A>
) => AsyncIterableEither<E2 | E1, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v0.1.0

## bind

**Signature**

```ts
export declare const bind: (
  C: AIChain
) => <N, A, E, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => AsyncIterableEither<E, B>
) => (
  ma: AsyncIterableEither<E, A>
) => AsyncIterableEither<E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v0.1.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N>(
  name: N
) => <E, A>(fa: AsyncIterableEither<E, A>) => AsyncIterableEither<E, { readonly [K in N]: A }>
```

Added in v0.1.0

## bindW

**Signature**

```ts
export declare const bindW: (
  C: AIChain
) => <N extends string, A, E2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => AsyncIterableEither<E2, B>
) => <E1>(
  fa: AsyncIterableEither<E1, A>
) => AsyncIterableEither<E2 | E1, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v0.1.0

## getChain

**Signature**

```ts
export declare const getChain: (AIC: AIChain) => Chain2<URI>
```

Added in v0.1.0

## getChainWithIndex

**Signature**

```ts
export declare const getChainWithIndex: (AIC: AIChainWithIndex) => ChainWithIndex2<URI, number>
```

Added in v0.1.0

## getMonad

**Signature**

```ts
export declare const getMonad: (AIC: AIChain) => Monad2<URI>
```

Added in v0.1.0

## getMonadAsyncIterable

**Signature**

```ts
export declare const getMonadAsyncIterable: (AIC: AIChainWithIndex) => MonadAsyncIterable2<URI>
```

Added in v0.1.0

## getMonadIO

**Signature**

```ts
export declare const getMonadIO: (AIC: AIChain) => MonadIO2<URI>
```

Added in v0.1.0

## getMonadTask

**Signature**

```ts
export declare const getMonadTask: (AIC: AIChain) => MonadTask2<URI>
```

Added in v0.1.0

## getMonoid

**Signature**

```ts
export declare const getMonoid: <E = never, A = never>(
  S: Semigroup<AsyncIterableEither<E, A>>
) => Monoid<AsyncIterableEither<E, A>>
```

Added in v0.1.0

## toTaskEither

**Signature**

```ts
export declare const toTaskEither: <E, A>(
  onEmpty: Lazy<TE.TaskEither<E, A>>
) => (ma: AsyncIterableEither<E, A>) => TE.TaskEither<E, A>
```

Added in v0.1.1

## toTaskEitherW

**Signature**

```ts
export declare const toTaskEitherW: <E2, B>(
  onEmpty: Lazy<TE.TaskEither<E2, B>>
) => <E, A>(ma: AsyncIterableEither<E, A>) => TE.TaskEither<E2 | E, B | A>
```

Added in v0.1.1
