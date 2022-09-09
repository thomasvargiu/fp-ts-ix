---
title: ReaderAsyncIterableEither.ts
nav_order: 22
parent: Modules
---

## ReaderAsyncIterableEither overview

```ts
interface ReaderAsyncIterableEither<R, E, A> extends ReaderAsyncIterable<R, Either<E, A>> {}
```

Added in v0.1.0

---

<h2 class="text-delta">Table of contents</h2>

- [Alt](#alt)
  - [alt](#alt)
  - [altW](#altw)
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
- [MonadThrow](#monadthrow)
  - [throwError](#throwerror)
- [Pointed](#pointed)
  - [of](#of)
- [combinators](#combinators)
  - [apFirst](#apfirst)
  - [apFirstW](#apfirstw)
  - [apSecond](#apsecond)
  - [apSecondW](#apsecondw)
  - [asksReaderAsyncIterableEither](#asksreaderasynciterableeither)
  - [asksReaderAsyncIterableEitherW](#asksreaderasynciterableeitherw)
  - [chainAsyncIterableEitherK](#chainasynciterableeitherk)
  - [chainAsyncIterableEitherKW](#chainasynciterableeitherkw)
  - [chainAsyncIterableK](#chainasynciterablek)
  - [chainEitherK](#chaineitherk)
  - [chainEitherKW](#chaineitherkw)
  - [chainFirst](#chainfirst)
  - [chainFirstAsyncIterableEitherK](#chainfirstasynciterableeitherk)
  - [chainFirstAsyncIterableEitherKW](#chainfirstasynciterableeitherkw)
  - [chainFirstAsyncIterableK](#chainfirstasynciterablek)
  - [chainFirstEitherK](#chainfirsteitherk)
  - [chainFirstEitherKW](#chainfirsteitherkw)
  - [chainFirstIOK](#chainfirstiok)
  - [chainFirstReaderAsyncIterableK](#chainfirstreaderasynciterablek)
  - [chainFirstReaderAsyncIterableKW](#chainfirstreaderasynciterablekw)
  - [chainFirstReaderEitherK](#chainfirstreadereitherk)
  - [chainFirstReaderEitherKW](#chainfirstreadereitherkw)
  - [chainFirstReaderK](#chainfirstreaderk)
  - [chainFirstReaderKW](#chainfirstreaderkw)
  - [chainFirstReaderTaskEitherK](#chainfirstreadertaskeitherk)
  - [chainFirstReaderTaskEitherKW](#chainfirstreadertaskeitherkw)
  - [chainFirstTaskEitherK](#chainfirsttaskeitherk)
  - [chainFirstTaskEitherKW](#chainfirsttaskeitherkw)
  - [chainFirstW](#chainfirstw)
  - [chainIOEitherK](#chainioeitherk)
  - [chainIOEitherKW](#chainioeitherkw)
  - [chainIOK](#chainiok)
  - [chainOptionK](#chainoptionk)
  - [chainReaderAsyncIterableK](#chainreaderasynciterablek)
  - [chainReaderAsyncIterableKW](#chainreaderasynciterablekw)
  - [chainReaderEitherK](#chainreadereitherk)
  - [chainReaderEitherKW](#chainreadereitherkw)
  - [chainReaderK](#chainreaderk)
  - [chainReaderKW](#chainreaderkw)
  - [chainReaderTaskEitherK](#chainreadertaskeitherk)
  - [chainReaderTaskEitherKW](#chainreadertaskeitherkw)
  - [chainTaskEitherK](#chaintaskeitherk)
  - [chainTaskEitherKW](#chaintaskeitherkw)
  - [chainWithIndex](#chainwithindex)
  - [filterOrElse](#filterorelse)
  - [filterOrElseW](#filterorelsew)
  - [flap](#flap)
  - [flatten](#flatten)
  - [flattenW](#flattenw)
  - [fromAsyncIterableEitherK](#fromasynciterableeitherk)
  - [fromAsyncIterableK](#fromasynciterablek)
  - [fromEitherK](#fromeitherk)
  - [fromIOEitherK](#fromioeitherk)
  - [fromIOK](#fromiok)
  - [fromOptionK](#fromoptionk)
  - [fromReaderAsyncIterableK](#fromreaderasynciterablek)
  - [fromReaderEitherK](#fromreadereitherk)
  - [fromReaderK](#fromreaderk)
  - [fromReaderTaskEitherK](#fromreadertaskeitherk)
  - [fromTaskEitherK](#fromtaskeitherk)
  - [local](#local)
  - [orElse](#orelse)
  - [orElseFirst](#orelsefirst)
  - [orElseFirstW](#orelsefirstw)
  - [orElseW](#orelsew)
  - [orLeft](#orleft)
  - [swap](#swap)
- [constructors](#constructors)
  - [ask](#ask)
  - [asks](#asks)
  - [fromPredicate](#frompredicate)
  - [fromReaderEither](#fromreadereither)
  - [fromReaderTaskEither](#fromreadertaskeither)
  - [left](#left)
  - [leftAsyncIterable](#leftasynciterable)
  - [leftIO](#leftio)
  - [leftReader](#leftreader)
  - [leftReaderAsyncIterable](#leftreaderasynciterable)
  - [leftTask](#lefttask)
  - [right](#right)
  - [rightAsyncIterable](#rightasynciterable)
  - [rightIO](#rightio)
  - [rightReader](#rightreader)
  - [rightReaderAsyncIterable](#rightreaderasynciterable)
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
  - [FromReader](#fromreader)
  - [Functor](#functor-1)
  - [Pointed](#pointed-1)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
  - [getChain](#getchain)
  - [getChainWithIndex](#getchainwithindex)
  - [getCompactable](#getcompactable)
  - [getFilterable](#getfilterable)
  - [getMonad](#getmonad)
  - [getMonadAsyncIterable](#getmonadasynciterable)
  - [getMonadIO](#getmonadio)
  - [getMonadTask](#getmonadtask)
  - [getMonadThrow](#getmonadthrow)
- [interop](#interop)
  - [chainNullableK](#chainnullablek)
  - [fromNullable](#fromnullable)
  - [fromNullableK](#fromnullablek)
  - [toUnion](#tounion)
- [model](#model)
  - [ReaderAsyncIterableEither (interface)](#readerasynciterableeither-interface)
- [natural transformations](#natural-transformations)
  - [fromAsyncIterable](#fromasynciterable)
  - [fromAsyncIterableEither](#fromasynciterableeither)
  - [fromAsyncIterableOption](#fromasynciterableoption)
  - [fromEither](#fromeither)
  - [fromIO](#fromio)
  - [fromIOEither](#fromioeither)
  - [fromOption](#fromoption)
  - [fromReader](#fromreader)
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

---

# Alt

## alt

Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
types of kind `* -> *`.

**Signature**

```ts
export declare const alt: (
  C: AIChain
) => <R, E, A>(
  that: () => ReaderAsyncIterableEither<R, E, A>
) => (fa: ReaderAsyncIterableEither<R, E, A>) => ReaderAsyncIterableEither<R, E, A>
```

Added in v0.1.0

## altW

Less strict version of [`alt`](#alt).

**Signature**

```ts
export declare const altW: (
  C: AIChain
) => <R2, E2, B>(
  that: () => ReaderAsyncIterableEither<R2, E2, B>
) => <R1, E1, A>(fa: ReaderAsyncIterableEither<R1, E1, A>) => ReaderAsyncIterableEither<R1 & R2, E2, B | A>
```

Added in v0.1.0

# Apply

## ap

Apply a function to an argument under a type constructor.

**Signature**

```ts
export declare const ap: <R, E, A>(
  fa: ReaderAsyncIterableEither<R, E, A>
) => <B>(fab: ReaderAsyncIterableEither<R, E, (a: A) => B>) => ReaderAsyncIterableEither<R, E, B>
```

Added in v0.1.0

## apW

Less strict version of [`ap`](#ap).

**Signature**

```ts
export declare const apW: <R2, E2, A>(
  fa: ReaderAsyncIterableEither<R2, E2, A>
) => <R1, E1, B>(fab: ReaderAsyncIterableEither<R1, E1, (a: A) => B>) => ReaderAsyncIterableEither<R1 & R2, E2 | E1, B>
```

Added in v0.1.0

# Bifunctor

## bimap

Map a pair of functions over the two last type arguments of the bifunctor.

**Signature**

```ts
export declare const bimap: <E, G, A, B>(
  f: (e: E) => G,
  g: (a: A) => B
) => <R>(fa: ReaderAsyncIterableEither<R, E, A>) => ReaderAsyncIterableEither<R, G, B>
```

Added in v0.1.0

## mapLeft

Map a function over the second type argument of a bifunctor.

**Signature**

```ts
export declare const mapLeft: <E, G>(
  f: (e: E) => G
) => <R, A>(fa: ReaderAsyncIterableEither<R, E, A>) => ReaderAsyncIterableEither<R, G, A>
```

Added in v0.1.0

# Functor

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare const map: <A, B>(
  f: (a: A) => B
) => <R, E>(fa: ReaderAsyncIterableEither<R, E, A>) => ReaderAsyncIterableEither<R, E, B>
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
) => <R, E>(fa: ReaderAsyncIterableEither<R, E, A>) => ReaderAsyncIterableEither<R, E, B>
```

Added in v0.1.0

# Monad

## chain

Composes computations in sequence, using the return value of one computation to determine the next computation.

**Signature**

```ts
export declare const chain: (
  C: AIChain
) => <R, E, A, B>(
  f: (a: A) => ReaderAsyncIterableEither<R, E, B>
) => (ma: ReaderAsyncIterableEither<R, E, A>) => ReaderAsyncIterableEither<R, E, B>
```

Added in v0.1.0

## chainW

Less strict version of [`chain`](#chain).

**Signature**

```ts
export declare const chainW: (
  C: AIChain
) => <R2, E2, A, B>(
  f: (a: A) => ReaderAsyncIterableEither<R2, E2, B>
) => <R1, E1>(ma: ReaderAsyncIterableEither<R1, E1, A>) => ReaderAsyncIterableEither<R1 & R2, E2 | E1, B>
```

Added in v0.1.0

# MonadThrow

## throwError

**Signature**

```ts
export declare const throwError: <R, E, A>(e: E) => ReaderAsyncIterableEither<R, E, A>
```

Added in v0.1.0

# Pointed

## of

**Signature**

```ts
export declare const of: <R, E = never, A = never>(a: A) => ReaderAsyncIterableEither<R, E, A>
```

Added in v0.1.0

# combinators

## apFirst

Combine two effectful actions, keeping only the result of the first.

Derivable from `Apply`.

**Signature**

```ts
export declare const apFirst: <R, E, B>(
  second: ReaderAsyncIterableEither<R, E, B>
) => <A>(first: ReaderAsyncIterableEither<R, E, A>) => ReaderAsyncIterableEither<R, E, A>
```

Added in v0.1.0

## apFirstW

Less strict version of [`apFirst`](#apfirst).

**Signature**

```ts
export declare const apFirstW: <R2, E2, B>(
  second: ReaderAsyncIterableEither<R2, E2, B>
) => <R1, E1, A>(first: ReaderAsyncIterableEither<R1, E1, A>) => ReaderAsyncIterableEither<R1 & R2, E2 | E1, A>
```

Added in v0.1.0

## apSecond

Combine two effectful actions, keeping only the result of the second.

Derivable from `Apply`.

**Signature**

```ts
export declare const apSecond: <R, E, B>(
  second: ReaderAsyncIterableEither<R, E, B>
) => <A>(first: ReaderAsyncIterableEither<R, E, A>) => ReaderAsyncIterableEither<R, E, B>
```

Added in v0.1.0

## apSecondW

Less strict version of [`apSecond`](#apsecond).

**Signature**

```ts
export declare const apSecondW: <R2, E2, B>(
  second: ReaderAsyncIterableEither<R2, E2, B>
) => <R1, E1, A>(first: ReaderAsyncIterableEither<R1, E1, A>) => ReaderAsyncIterableEither<R1 & R2, E2 | E1, B>
```

Added in v0.1.0

## asksReaderAsyncIterableEither

Effectfully accesses the environment.

**Signature**

```ts
export declare const asksReaderAsyncIterableEither: <R, E, A>(
  f: (r: R) => ReaderAsyncIterableEither<R, E, A>
) => ReaderAsyncIterableEither<R, E, A>
```

Added in v0.1.0

## asksReaderAsyncIterableEitherW

Less strict version of [`asksReaderAsyncIterableEither`](#asksreadertaskeither).

**Signature**

```ts
export declare const asksReaderAsyncIterableEitherW: <R1, R2, E, A>(
  f: (r1: R1) => ReaderAsyncIterableEither<R2, E, A>
) => ReaderAsyncIterableEither<R1 & R2, E, A>
```

Added in v0.1.0

## chainAsyncIterableEitherK

**Signature**

```ts
export declare const chainAsyncIterableEitherK: (
  C: AIChain
) => <E, A, B>(
  f: (a: A) => AIE.AsyncIterableEither<E, B>
) => <R>(ma: ReaderAsyncIterableEither<R, E, A>) => ReaderAsyncIterableEither<R, E, B>
```

Added in v0.1.0

## chainAsyncIterableEitherKW

Less strict version of [`chainAsyncIterableEitherK`](#chaintaskeitherk).

**Signature**

```ts
export declare const chainAsyncIterableEitherKW: (
  C: AIChain
) => <E2, A, B>(
  f: (a: A) => AIE.AsyncIterableEither<E2, B>
) => <R, E1>(ma: ReaderAsyncIterableEither<R, E1, A>) => ReaderAsyncIterableEither<R, E2 | E1, B>
```

Added in v0.1.0

## chainAsyncIterableK

**Signature**

```ts
export declare const chainAsyncIterableK: (
  C: AIChain
) => <A, B>(
  f: (a: A) => AsyncIterable<B>
) => <R, E>(first: ReaderAsyncIterableEither<R, E, A>) => ReaderAsyncIterableEither<R, E, B>
```

Added in v0.1.0

## chainEitherK

**Signature**

```ts
export declare const chainEitherK: (
  C: AIChain
) => <E, A, B>(
  f: (a: A) => E.Either<E, B>
) => <R>(ma: ReaderAsyncIterableEither<R, E, A>) => ReaderAsyncIterableEither<R, E, B>
```

Added in v0.1.0

## chainEitherKW

Less strict version of [`chainEitherK`](#chaineitherk).

**Signature**

```ts
export declare const chainEitherKW: (
  C: AIChain
) => <E2, A, B>(
  f: (a: A) => E.Either<E2, B>
) => <R, E1>(ma: ReaderAsyncIterableEither<R, E1, A>) => ReaderAsyncIterableEither<R, E2 | E1, B>
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
) => <R, E, A, B>(
  f: (a: A) => ReaderAsyncIterableEither<R, E, B>
) => (ma: ReaderAsyncIterableEither<R, E, A>) => ReaderAsyncIterableEither<R, E, A>
```

Added in v0.1.0

## chainFirstAsyncIterableEitherK

**Signature**

```ts
export declare const chainFirstAsyncIterableEitherK: (
  C: AIChain
) => <E, A, B>(
  f: (a: A) => AIE.AsyncIterableEither<E, B>
) => <R>(ma: ReaderAsyncIterableEither<R, E, A>) => ReaderAsyncIterableEither<R, E, A>
```

Added in v0.1.0

## chainFirstAsyncIterableEitherKW

Less strict version of [`chainFirstAsyncIterableEitherK`](#chainfirsttaskeitherk).

**Signature**

```ts
export declare const chainFirstAsyncIterableEitherKW: (
  C: AIChain
) => <E2, A, B>(
  f: (a: A) => AIE.AsyncIterableEither<E2, B>
) => <R, E1>(ma: ReaderAsyncIterableEither<R, E1, A>) => ReaderAsyncIterableEither<R, E2 | E1, A>
```

Added in v0.1.0

## chainFirstAsyncIterableK

**Signature**

```ts
export declare const chainFirstAsyncIterableK: (
  C: AIChain
) => <A, B>(
  f: (a: A) => AsyncIterable<B>
) => <R, E>(first: ReaderAsyncIterableEither<R, E, A>) => ReaderAsyncIterableEither<R, E, A>
```

Added in v0.1.0

## chainFirstEitherK

**Signature**

```ts
export declare const chainFirstEitherK: (
  C: AIChain
) => <A, E, B>(
  f: (a: A) => E.Either<E, B>
) => <R>(ma: ReaderAsyncIterableEither<R, E, A>) => ReaderAsyncIterableEither<R, E, A>
```

Added in v0.1.0

## chainFirstEitherKW

Less strict version of [`chainFirstEitherK`](#chainfirsteitherk).

**Signature**

```ts
export declare const chainFirstEitherKW: (
  C: AIChain
) => <A, E2, B>(
  f: (a: A) => E.Either<E2, B>
) => <R, E1>(ma: ReaderAsyncIterableEither<R, E1, A>) => ReaderAsyncIterableEither<R, E2 | E1, A>
```

Added in v0.1.0

## chainFirstIOK

**Signature**

```ts
export declare const chainFirstIOK: (
  C: AIChain
) => <A, B>(
  f: (a: A) => IO<B>
) => <R, E>(first: ReaderAsyncIterableEither<R, E, A>) => ReaderAsyncIterableEither<R, E, A>
```

Added in v0.1.0

## chainFirstReaderAsyncIterableK

**Signature**

```ts
export declare const chainFirstReaderAsyncIterableK: (
  C: AIChain
) => <A, R, B>(
  f: (a: A) => RAI.ReaderAsyncIterable<R, B>
) => <E = never>(ma: ReaderAsyncIterableEither<R, E, A>) => ReaderAsyncIterableEither<R, E, A>
```

Added in v0.1.0

## chainFirstReaderAsyncIterableKW

Less strict version of [`chainFirstReaderAsyncIterableK`](#chainfirstreadertaskk).

**Signature**

```ts
export declare const chainFirstReaderAsyncIterableKW: (
  C: AIChain
) => <A, R2, B>(
  f: (a: A) => RAI.ReaderAsyncIterable<R2, B>
) => <R1, E = never>(ma: ReaderAsyncIterableEither<R1, E, A>) => ReaderAsyncIterableEither<R1 & R2, E, A>
```

Added in v0.1.0

## chainFirstReaderEitherK

**Signature**

```ts
export declare const chainFirstReaderEitherK: (
  C: AIChain
) => <R, E, A, B>(
  f: (a: A) => ReaderEither<R, E, B>
) => (ma: ReaderAsyncIterableEither<R, E, A>) => ReaderAsyncIterableEither<R, E, A>
```

Added in v0.1.0

## chainFirstReaderEitherKW

Less strict version of [`chainFirstReaderEitherK`](#chainfirstreadereitherk).

**Signature**

```ts
export declare const chainFirstReaderEitherKW: (
  C: AIChain
) => <R2, E2, A, B>(
  f: (a: A) => ReaderEither<R2, E2, B>
) => <R1, E1>(ma: ReaderAsyncIterableEither<R1, E1, A>) => ReaderAsyncIterableEither<R1 & R2, E2 | E1, A>
```

Added in v0.1.0

## chainFirstReaderK

**Signature**

```ts
export declare const chainFirstReaderK: (
  C: AIChain
) => <A, R, B>(
  f: (a: A) => R.Reader<R, B>
) => <E = never>(ma: ReaderAsyncIterableEither<R, E, A>) => ReaderAsyncIterableEither<R, E, A>
```

Added in v0.1.0

## chainFirstReaderKW

Less strict version of [`chainFirstReaderK`](#chainfirstreaderk).

**Signature**

```ts
export declare const chainFirstReaderKW: (
  C: AIChain
) => <A, R1, B>(
  f: (a: A) => R.Reader<R1, B>
) => <R2, E = never>(ma: ReaderAsyncIterableEither<R2, E, A>) => ReaderAsyncIterableEither<R1 & R2, E, A>
```

Added in v0.1.0

## chainFirstReaderTaskEitherK

**Signature**

```ts
export declare const chainFirstReaderTaskEitherK: (
  C: AIChain
) => <R, E, A, B>(
  f: (a: A) => ReaderTaskEither<R, E, B>
) => (ma: ReaderAsyncIterableEither<R, E, A>) => ReaderAsyncIterableEither<R, E, A>
```

Added in v0.1.0

## chainFirstReaderTaskEitherKW

Less strict version of [`chainFirstReaderEitherK`](#chainfirstreadereitherk).

**Signature**

```ts
export declare const chainFirstReaderTaskEitherKW: (
  C: AIChain
) => <R2, E2, A, B>(
  f: (a: A) => ReaderTaskEither<R2, E2, B>
) => <R1, E1>(ma: ReaderAsyncIterableEither<R1, E1, A>) => ReaderAsyncIterableEither<R1 & R2, E2 | E1, A>
```

Added in v0.1.0

## chainFirstTaskEitherK

**Signature**

```ts
export declare const chainFirstTaskEitherK: (
  C: AIChain
) => <A, E, B>(
  f: (a: A) => TaskEither<E, B>
) => <R>(ma: ReaderAsyncIterableEither<R, E, A>) => ReaderAsyncIterableEither<R, E, A>
```

Added in v0.1.0

## chainFirstTaskEitherKW

Less strict version of [`chainFirstEitherK`](#chainfirsteitherk).

**Signature**

```ts
export declare const chainFirstTaskEitherKW: (
  C: AIChain
) => <A, E2, B>(
  f: (a: A) => TaskEither<E2, B>
) => <R, E1>(ma: ReaderAsyncIterableEither<R, E1, A>) => ReaderAsyncIterableEither<R, E2 | E1, A>
```

Added in v0.1.0

## chainFirstW

Less strict version of [`chainFirst`](#chainfirst).

Derivable from `Chain`.

**Signature**

```ts
export declare const chainFirstW: (
  C: AIChain
) => <R2, E2, A, B>(
  f: (a: A) => ReaderAsyncIterableEither<R2, E2, B>
) => <R1, E1>(ma: ReaderAsyncIterableEither<R1, E1, A>) => ReaderAsyncIterableEither<R1 & R2, E2 | E1, A>
```

Added in v0.1.0

## chainIOEitherK

**Signature**

```ts
export declare const chainIOEitherK: (
  C: AIChain
) => <E, A, B>(
  f: (a: A) => IOEither<E, B>
) => <R>(ma: ReaderAsyncIterableEither<R, E, A>) => ReaderAsyncIterableEither<R, E, B>
```

Added in v0.1.0

## chainIOEitherKW

Less strict version of [`chainIOEitherK`](#chainioeitherk).

**Signature**

```ts
export declare const chainIOEitherKW: (
  C: AIChain
) => <E2, A, B>(
  f: (a: A) => IOEither<E2, B>
) => <R, E1>(ma: ReaderAsyncIterableEither<R, E1, A>) => ReaderAsyncIterableEither<R, E2 | E1, B>
```

Added in v0.1.0

## chainIOK

**Signature**

```ts
export declare const chainIOK: (
  C: AIChain
) => <A, B>(
  f: (a: A) => IO<B>
) => <R, E>(first: ReaderAsyncIterableEither<R, E, A>) => ReaderAsyncIterableEither<R, E, B>
```

Added in v0.1.0

## chainOptionK

**Signature**

```ts
export declare const chainOptionK: (
  C: AIChain
) => <E>(
  onNone: Lazy<E>
) => <A, B>(f: (a: A) => Option<B>) => <R>(ma: ReaderAsyncIterableEither<R, E, A>) => ReaderAsyncIterableEither<R, E, B>
```

Added in v0.1.0

## chainReaderAsyncIterableK

**Signature**

```ts
export declare const chainReaderAsyncIterableK: (
  C: AIChain
) => <A, R, B>(
  f: (a: A) => RAI.ReaderAsyncIterable<R, B>
) => <E = never>(ma: ReaderAsyncIterableEither<R, E, A>) => ReaderAsyncIterableEither<R, E, B>
```

Added in v0.1.0

## chainReaderAsyncIterableKW

Less strict version of [`chainReaderAsyncIterableK`](#chainreadertaskk).

**Signature**

```ts
export declare const chainReaderAsyncIterableKW: (
  C: AIChain
) => <A, R2, B>(
  f: (a: A) => RAI.ReaderAsyncIterable<R2, B>
) => <R1, E = never>(ma: ReaderAsyncIterableEither<R1, E, A>) => ReaderAsyncIterableEither<R1 & R2, E, B>
```

Added in v0.1.0

## chainReaderEitherK

**Signature**

```ts
export declare const chainReaderEitherK: (
  C: AIChain
) => <R, E, A, B>(
  f: (a: A) => ReaderEither<R, E, B>
) => (ma: ReaderAsyncIterableEither<R, E, A>) => ReaderAsyncIterableEither<R, E, B>
```

Added in v0.1.0

## chainReaderEitherKW

Less strict version of [`chainReaderEitherK`](#chainreadereitherk).

**Signature**

```ts
export declare const chainReaderEitherKW: (
  C: AIChain
) => <R2, E2, A, B>(
  f: (a: A) => ReaderEither<R2, E2, B>
) => <R1, E1>(ma: ReaderAsyncIterableEither<R1, E1, A>) => ReaderAsyncIterableEither<R1 & R2, E2 | E1, B>
```

Added in v0.1.0

## chainReaderK

**Signature**

```ts
export declare const chainReaderK: (
  C: AIChain
) => <A, R, B>(
  f: (a: A) => R.Reader<R, B>
) => <E = never>(ma: ReaderAsyncIterableEither<R, E, A>) => ReaderAsyncIterableEither<R, E, B>
```

Added in v0.1.0

## chainReaderKW

Less strict version of [`chainReaderK`](#chainreaderk).

**Signature**

```ts
export declare const chainReaderKW: (
  C: AIChain
) => <A, R1, B>(
  f: (a: A) => R.Reader<R1, B>
) => <R2, E = never>(ma: ReaderAsyncIterableEither<R2, E, A>) => ReaderAsyncIterableEither<R1 & R2, E, B>
```

Added in v0.1.0

## chainReaderTaskEitherK

**Signature**

```ts
export declare const chainReaderTaskEitherK: (
  C: AIChain
) => <R, E, A, B>(
  f: (a: A) => ReaderTaskEither<R, E, B>
) => (ma: ReaderAsyncIterableEither<R, E, A>) => ReaderAsyncIterableEither<R, E, B>
```

Added in v0.1.0

## chainReaderTaskEitherKW

Less strict version of [`chainReaderEitherK`](#chainreadereitherk).

**Signature**

```ts
export declare const chainReaderTaskEitherKW: (
  C: AIChain
) => <R2, E2, A, B>(
  f: (a: A) => ReaderTaskEither<R2, E2, B>
) => <R1, E1>(ma: ReaderAsyncIterableEither<R1, E1, A>) => ReaderAsyncIterableEither<R1 & R2, E2 | E1, B>
```

Added in v0.1.0

## chainTaskEitherK

**Signature**

```ts
export declare const chainTaskEitherK: (
  C: AIChain
) => <E, A, B>(
  f: (a: A) => TaskEither<E, B>
) => <R>(ma: ReaderAsyncIterableEither<R, E, A>) => ReaderAsyncIterableEither<R, E, B>
```

Added in v0.1.0

## chainTaskEitherKW

Less strict version of [`chainEitherK`](#chaineitherk).

**Signature**

```ts
export declare const chainTaskEitherKW: (
  C: AIChain
) => <E2, A, B>(
  f: (a: A) => TaskEither<E2, B>
) => <R, E1>(ma: ReaderAsyncIterableEither<R, E1, A>) => ReaderAsyncIterableEither<R, E2 | E1, B>
```

Added in v0.1.0

## chainWithIndex

Composes computations in sequence, using the return value of one computation to determine the next computation.

**Signature**

```ts
export declare const chainWithIndex: (
  C: AIChainWithIndex
) => <R, E, A, B>(
  f: (i: number, a: A) => ReaderAsyncIterableEither<R, E, B>
) => (ma: ReaderAsyncIterableEither<R, E, A>) => ReaderAsyncIterableEither<R, E, B>
```

Added in v0.1.0

## filterOrElse

**Signature**

```ts
export declare const filterOrElse: (C: AIChain) => {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <R>(
    ma: ReaderAsyncIterableEither<R, E, A>
  ) => ReaderAsyncIterableEither<R, E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R, B extends A>(
    mb: ReaderAsyncIterableEither<R, E, B>
  ) => ReaderAsyncIterableEither<R, E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R>(
    ma: ReaderAsyncIterableEither<R, E, A>
  ) => ReaderAsyncIterableEither<R, E, A>
}
```

Added in v0.1.0

## filterOrElseW

Less strict version of [`filterOrElse`](#filterorelse).

**Signature**

```ts
export declare const filterOrElseW: (C: AIChain) => {
  <A, B extends A, E2>(refinement: Refinement<A, B>, onFalse: (a: A) => E2): <R, E1>(
    ma: ReaderAsyncIterableEither<R, E1, A>
  ) => ReaderAsyncIterableEither<R, E2 | E1, B>
  <A, E2>(predicate: Predicate<A>, onFalse: (a: A) => E2): <R, E1, B extends A>(
    mb: ReaderAsyncIterableEither<R, E1, B>
  ) => ReaderAsyncIterableEither<R, E2 | E1, B>
  <A, E2>(predicate: Predicate<A>, onFalse: (a: A) => E2): <R, E1>(
    ma: ReaderAsyncIterableEither<R, E1, A>
  ) => ReaderAsyncIterableEither<R, E2 | E1, A>
}
```

Added in v0.1.0

## flap

Derivable from `Functor`.

**Signature**

```ts
export declare const flap: <A>(
  a: A
) => <R, E, B>(fab: ReaderAsyncIterableEither<R, E, (a: A) => B>) => ReaderAsyncIterableEither<R, E, B>
```

Added in v0.1.0

## flatten

Derivable from `Chain`.

**Signature**

```ts
export declare const flatten: (
  C: AIChain
) => <R, E, A>(
  mma: ReaderAsyncIterableEither<R, E, ReaderAsyncIterableEither<R, E, A>>
) => ReaderAsyncIterableEither<R, E, A>
```

Added in v0.1.0

## flattenW

Less strict version of [`flatten`](#flatten).

**Signature**

```ts
export declare const flattenW: (
  C: AIChain
) => <R1, E1, R2, E2, A>(
  mma: ReaderAsyncIterableEither<R1, E1, ReaderAsyncIterableEither<R2, E2, A>>
) => ReaderAsyncIterableEither<R1 & R2, E1 | E2, A>
```

Added in v0.1.0

## fromAsyncIterableEitherK

**Signature**

```ts
export declare const fromAsyncIterableEitherK: <E, A extends readonly unknown[], B>(
  f: (...a: A) => AIE.AsyncIterableEither<E, B>
) => <R>(...a: A) => ReaderAsyncIterableEither<R, E, B>
```

Added in v0.1.0

## fromAsyncIterableK

**Signature**

```ts
export declare const fromAsyncIterableK: <A, B>(
  f: (...a: A) => AsyncIterable<B>
) => <R, E>(...a: A) => ReaderAsyncIterableEither<R, E, B>
```

Added in v0.1.0

## fromEitherK

**Signature**

```ts
export declare const fromEitherK: <E, A extends readonly unknown[], B>(
  f: (...a: A) => E.Either<E, B>
) => <R>(...a: A) => ReaderAsyncIterableEither<R, E, B>
```

Added in v0.1.0

## fromIOEitherK

**Signature**

```ts
export declare const fromIOEitherK: <E, A extends readonly unknown[], B>(
  f: (...a: A) => IOEither<E, B>
) => <R>(...a: A) => ReaderAsyncIterableEither<R, E, B>
```

Added in v0.1.0

## fromIOK

**Signature**

```ts
export declare const fromIOK: <A, B>(f: (...a: A) => IO<B>) => <R, E>(...a: A) => ReaderAsyncIterableEither<R, E, B>
```

Added in v0.1.0

## fromOptionK

**Signature**

```ts
export declare const fromOptionK: <E>(
  onNone: Lazy<E>
) => <A, B>(f: (...a: A) => Option<B>) => <R>(...a: A) => ReaderAsyncIterableEither<R, E, B>
```

Added in v0.1.0

## fromReaderAsyncIterableK

**Signature**

```ts
export declare const fromReaderAsyncIterableK: <A extends readonly unknown[], R, B>(
  f: (...a: A) => RAI.ReaderAsyncIterable<R, B>
) => <E = never>(...a: A) => ReaderAsyncIterableEither<R, E, B>
```

Added in v0.1.0

## fromReaderEitherK

**Signature**

```ts
export declare const fromReaderEitherK: <R, E, A extends readonly unknown[], B>(
  f: (...a: A) => ReaderEither<R, E, B>
) => (...a: A) => ReaderAsyncIterableEither<R, E, B>
```

Added in v0.1.0

## fromReaderK

**Signature**

```ts
export declare const fromReaderK: <A extends readonly unknown[], R, B>(
  f: (...a: A) => R.Reader<R, B>
) => <E = never>(...a: A) => ReaderAsyncIterableEither<R, E, B>
```

Added in v0.1.0

## fromReaderTaskEitherK

**Signature**

```ts
export declare const fromReaderTaskEitherK: <R, E, A extends readonly unknown[], B>(
  f: (...a: A) => ReaderTaskEither<R, E, B>
) => (...a: A) => ReaderAsyncIterableEither<R, E, B>
```

Added in v0.1.0

## fromTaskEitherK

**Signature**

```ts
export declare const fromTaskEitherK: <R, E, A extends readonly unknown[], B>(
  f: (...a: A) => TaskEither<E, B>
) => (...a: A) => ReaderAsyncIterableEither<R, E, B>
```

Added in v0.1.0

## local

Changes the value of the local context during the execution of the action `ma` (similar to `Contravariant`'s
`contramap`).

**Signature**

```ts
export declare const local: <R2, R1>(
  f: (r2: R2) => R1
) => <E, A>(ma: ReaderAsyncIterableEither<R1, E, A>) => ReaderAsyncIterableEither<R2, E, A>
```

Added in v0.1.0

## orElse

**Signature**

```ts
export declare const orElse: (
  C: AIChain
) => <R, E1, A, E2>(
  onLeft: (e: E1) => ReaderAsyncIterableEither<R, E2, A>
) => (ma: ReaderAsyncIterableEither<R, E1, A>) => ReaderAsyncIterableEither<R, E2, A>
```

Added in v0.1.0

## orElseFirst

**Signature**

```ts
export declare const orElseFirst: (
  C: AIChain
) => <E, R, B>(
  onLeft: (e: E) => ReaderAsyncIterableEither<R, E, B>
) => <A>(ma: ReaderAsyncIterableEither<R, E, A>) => ReaderAsyncIterableEither<R, E, A>
```

Added in v0.1.0

## orElseFirstW

**Signature**

```ts
export declare const orElseFirstW: (
  C: AIChain
) => <E1, R2, E2, B>(
  onLeft: (e: E1) => ReaderAsyncIterableEither<R2, E2, B>
) => <R1, A>(ma: ReaderAsyncIterableEither<R1, E1, A>) => ReaderAsyncIterableEither<R1 & R2, E1 | E2, A>
```

Added in v0.1.0

## orElseW

Less strict version of [`orElse`](#orelse).

**Signature**

```ts
export declare const orElseW: (
  C: AIChain
) => <E1, R1, E2, B>(
  onLeft: (e: E1) => ReaderAsyncIterableEither<R1, E2, B>
) => <R2, A>(ma: ReaderAsyncIterableEither<R2, E1, A>) => ReaderAsyncIterableEither<R1 & R2, E2, B | A>
```

Added in v0.1.0

## orLeft

**Signature**

```ts
export declare const orLeft: (
  C: AIChain
) => <E1, R, E2>(
  onLeft: (e: E1) => RAI.ReaderAsyncIterable<R, E2>
) => <A>(fa: ReaderAsyncIterableEither<R, E1, A>) => ReaderAsyncIterableEither<R, E2, A>
```

Added in v0.1.0

## swap

**Signature**

```ts
export declare const swap: <R, E, A>(ma: ReaderAsyncIterableEither<R, E, A>) => ReaderAsyncIterableEither<R, A, E>
```

Added in v0.1.0

# constructors

## ask

Reads the current context.

**Signature**

```ts
export declare const ask: <R, E = never>() => ReaderAsyncIterableEither<R, E, R>
```

Added in v0.1.0

## asks

Projects a value from the global context in a `ReaderEither`.

**Signature**

```ts
export declare const asks: <R, A, E = never>(f: (r: R) => A) => ReaderAsyncIterableEither<R, E, A>
```

Added in v0.1.0

## fromPredicate

**Signature**

```ts
export declare const fromPredicate: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <R>(
    a: A
  ) => ReaderAsyncIterableEither<R, E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R, B extends A>(b: B) => ReaderAsyncIterableEither<R, E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R>(a: A) => ReaderAsyncIterableEither<R, E, A>
}
```

Added in v0.1.0

## fromReaderEither

**Signature**

```ts
export declare const fromReaderEither: NaturalTransformation33<'ReaderEither', 'ReaderAsyncIterableEither'>
```

Added in v0.1.0

## fromReaderTaskEither

**Signature**

```ts
export declare const fromReaderTaskEither: NaturalTransformation33<'ReaderTaskEither', 'ReaderAsyncIterableEither'>
```

Added in v0.1.0

## left

**Signature**

```ts
export declare const left: <R, E = never, A = never>(e: E) => ReaderAsyncIterableEither<R, E, A>
```

Added in v0.1.0

## leftAsyncIterable

**Signature**

```ts
export declare const leftAsyncIterable: <R, E = never, A = never>(
  me: AsyncIterable<E>
) => ReaderAsyncIterableEither<R, E, A>
```

Added in v0.1.0

## leftIO

**Signature**

```ts
export declare const leftIO: <R, E = never, A = never>(me: IO<E>) => ReaderAsyncIterableEither<R, E, A>
```

Added in v0.1.0

## leftReader

**Signature**

```ts
export declare const leftReader: <R, E = never, A = never>(me: R.Reader<R, E>) => ReaderAsyncIterableEither<R, E, A>
```

Added in v0.1.0

## leftReaderAsyncIterable

**Signature**

```ts
export declare const leftReaderAsyncIterable: <R, E = never, A = never>(
  me: RAI.ReaderAsyncIterable<R, E>
) => ReaderAsyncIterableEither<R, E, A>
```

Added in v0.1.0

## leftTask

**Signature**

```ts
export declare const leftTask: <R, E = never, A = never>(me: Task<E>) => ReaderAsyncIterableEither<R, E, A>
```

Added in v0.1.0

## right

**Signature**

```ts
export declare const right: <R, E = never, A = never>(a: A) => ReaderAsyncIterableEither<R, E, A>
```

Added in v0.1.0

## rightAsyncIterable

**Signature**

```ts
export declare const rightAsyncIterable: <R, E = never, A = never>(
  ma: AsyncIterable<A>
) => ReaderAsyncIterableEither<R, E, A>
```

Added in v0.1.0

## rightIO

**Signature**

```ts
export declare const rightIO: <R, E = never, A = never>(ma: IO<A>) => ReaderAsyncIterableEither<R, E, A>
```

Added in v0.1.0

## rightReader

**Signature**

```ts
export declare const rightReader: <R, E = never, A = never>(ma: R.Reader<R, A>) => ReaderAsyncIterableEither<R, E, A>
```

Added in v0.1.0

## rightReaderAsyncIterable

**Signature**

```ts
export declare const rightReaderAsyncIterable: <R, E = never, A = never>(
  ma: RAI.ReaderAsyncIterable<R, A>
) => ReaderAsyncIterableEither<R, E, A>
```

Added in v0.1.0

## rightTask

**Signature**

```ts
export declare const rightTask: <R, E = never, A = never>(ma: Task<A>) => ReaderAsyncIterableEither<R, E, A>
```

Added in v0.1.0

# destructors

## fold

Alias of [`matchE`](#matche).

**Signature**

```ts
export declare const fold: (
  C: AIChain
) => <R, E, A, B>(
  onLeft: (e: E) => RAI.ReaderAsyncIterable<R, B>,
  onRight: (a: A) => RAI.ReaderAsyncIterable<R, B>
) => (ma: ReaderAsyncIterableEither<R, E, A>) => RAI.ReaderAsyncIterable<R, B>
```

Added in v0.1.0

## foldW

Alias of [`matchEW`](#matchew).

**Signature**

```ts
export declare const foldW: (
  C: AIChain
) => <E, R2, B, A, R3, C>(
  onLeft: (e: E) => RAI.ReaderAsyncIterable<R2, B>,
  onRight: (a: A) => RAI.ReaderAsyncIterable<R3, C>
) => <R1>(ma: ReaderAsyncIterableEither<R1, E, A>) => RAI.ReaderAsyncIterable<R1 & R2 & R3, B | C>
```

Added in v0.1.0

## getOrElse

**Signature**

```ts
export declare const getOrElse: (
  C: AIChain
) => <R, E, A>(
  onLeft: (e: E) => RAI.ReaderAsyncIterable<R, A>
) => (ma: ReaderAsyncIterableEither<R, E, A>) => RAI.ReaderAsyncIterable<R, A>
```

Added in v0.1.0

## getOrElseW

Less strict version of [`getOrElse`](#getorelse).

**Signature**

```ts
export declare const getOrElseW: (
  C: AIChain
) => <R2, E, B>(
  onLeft: (e: E) => RAI.ReaderAsyncIterable<R2, B>
) => <R1, A>(ma: ReaderAsyncIterableEither<R1, E, A>) => RAI.ReaderAsyncIterable<R1 & R2, B | A>
```

Added in v0.1.0

## match

**Signature**

```ts
export declare const match: <E, B, A>(
  onLeft: (e: E) => B,
  onRight: (a: A) => B
) => <R>(ma: ReaderAsyncIterableEither<R, E, A>) => RAI.ReaderAsyncIterable<R, B>
```

Added in v0.1.0

## matchE

**Signature**

```ts
export declare const matchE: (
  C: AIChain
) => <R, E, A, B>(
  onLeft: (e: E) => RAI.ReaderAsyncIterable<R, B>,
  onRight: (a: A) => RAI.ReaderAsyncIterable<R, B>
) => (ma: ReaderAsyncIterableEither<R, E, A>) => RAI.ReaderAsyncIterable<R, B>
```

Added in v0.1.0

## matchEW

Less strict version of [`matchE`](#matche).

**Signature**

```ts
export declare const matchEW: (
  C: AIChain
) => <E, R2, B, A, R3, C>(
  onLeft: (e: E) => RAI.ReaderAsyncIterable<R2, B>,
  onRight: (a: A) => RAI.ReaderAsyncIterable<R3, C>
) => <R1>(ma: ReaderAsyncIterableEither<R1, E, A>) => RAI.ReaderAsyncIterable<R1 & R2 & R3, B | C>
```

Added in v0.1.0

## matchW

Less strict version of [`match`](#match).

**Signature**

```ts
export declare const matchW: <E, B, A, C>(
  onLeft: (e: E) => B,
  onRight: (a: A) => C
) => <R>(ma: ReaderAsyncIterableEither<R, E, A>) => RAI.ReaderAsyncIterable<R, B | C>
```

Added in v0.1.0

# instances

## Applicative

**Signature**

```ts
export declare const Applicative: Applicative3<'ReaderAsyncIterableEither'>
```

Added in v0.1.0

## Apply

**Signature**

```ts
export declare const Apply: Apply3<'ReaderAsyncIterableEither'>
```

Added in v0.1.0

## Bifunctor

**Signature**

```ts
export declare const Bifunctor: Bifunctor3<'ReaderAsyncIterableEither'>
```

Added in v0.1.0

## FromAsyncIterable

**Signature**

```ts
export declare const FromAsyncIterable: FromAsyncIterable3<'ReaderAsyncIterableEither'>
```

Added in v0.1.0

## FromEither

**Signature**

```ts
export declare const FromEither: FromEither3<'ReaderAsyncIterableEither'>
```

Added in v0.1.0

## FromIO

**Signature**

```ts
export declare const FromIO: FromIO3<'ReaderAsyncIterableEither'>
```

Added in v0.1.0

## FromReader

**Signature**

```ts
export declare const FromReader: FromReader3<'ReaderAsyncIterableEither'>
```

Added in v0.1.0

## Functor

**Signature**

```ts
export declare const Functor: Functor3<'ReaderAsyncIterableEither'>
```

Added in v0.1.0

## Pointed

**Signature**

```ts
export declare const Pointed: Pointed3<'ReaderAsyncIterableEither'>
```

Added in v0.1.0

## URI

**Signature**

```ts
export declare const URI: 'ReaderAsyncIterableEither'
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
export declare const getChain: (C: AIChain) => Chain3<URI>
```

Added in v0.1.0

## getChainWithIndex

**Signature**

```ts
export declare const getChainWithIndex: (C: AIChainWithIndex) => ChainWithIndex3<URI, number>
```

Added in v0.1.0

## getCompactable

**Signature**

```ts
export declare const getCompactable: <E>(M: Monoid<E>) => Compactable3C<'ReaderAsyncIterableEither', E>
```

Added in v0.1.0

## getFilterable

**Signature**

```ts
export declare function getFilterable<E>(M: Monoid<E>): Filterable3C<URI, E>
```

Added in v0.1.0

## getMonad

**Signature**

```ts
export declare const getMonad: (C: AIChain) => Monad3<URI>
```

Added in v0.1.0

## getMonadAsyncIterable

**Signature**

```ts
export declare const getMonadAsyncIterable: (C: AIChainWithIndex) => MonadAsyncIterable3<URI>
```

Added in v0.1.0

## getMonadIO

**Signature**

```ts
export declare const getMonadIO: (C: AIChain) => MonadIO3<URI>
```

Added in v0.1.0

## getMonadTask

**Signature**

```ts
export declare const getMonadTask: (C: AIChain) => MonadTask3<URI>
```

Added in v0.1.0

## getMonadThrow

**Signature**

```ts
export declare const getMonadThrow: (C: AIChainWithIndex) => MonadThrow3<URI>
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
) => <R>(ma: ReaderAsyncIterableEither<R, E, A>) => ReaderAsyncIterableEither<R, E, NonNullable<B>>
```

Added in v0.1.0

## fromNullable

**Signature**

```ts
export declare const fromNullable: <E>(e: E) => <R, A>(a: A) => ReaderAsyncIterableEither<R, E, NonNullable<A>>
```

Added in v0.1.0

## fromNullableK

**Signature**

```ts
export declare const fromNullableK: <E>(
  e: E
) => <A extends readonly unknown[], B>(
  f: (...a: A) => B | null | undefined
) => <R>(...a: A) => ReaderAsyncIterableEither<R, E, NonNullable<B>>
```

Added in v0.1.0

## toUnion

**Signature**

```ts
export declare const toUnion: <R, E, A>(fa: ReaderAsyncIterableEither<R, E, A>) => RAI.ReaderAsyncIterable<R, E | A>
```

Added in v0.1.0

# model

## ReaderAsyncIterableEither (interface)

**Signature**

```ts
export interface ReaderAsyncIterableEither<R, E, A> {
  (r: R): AsyncIterableEither<E, A>
}
```

Added in v0.1.0

# natural transformations

## fromAsyncIterable

**Signature**

```ts
export declare const fromAsyncIterable: NaturalTransformation13<'AsyncIterable', 'ReaderAsyncIterableEither'>
```

Added in v0.1.0

## fromAsyncIterableEither

**Signature**

```ts
export declare const fromAsyncIterableEither: NaturalTransformation23<
  'AsyncIterableEither',
  'ReaderAsyncIterableEither'
>
```

Added in v0.1.0

## fromAsyncIterableOption

**Signature**

```ts
export declare const fromAsyncIterableOption: <E>(
  onNone: Lazy<E>
) => NaturalTransformation13C<'AsyncIterableOption', 'ReaderAsyncIterableEither', E>
```

Added in v0.1.0

## fromEither

**Signature**

```ts
export declare const fromEither: NaturalTransformation23<'Either', 'ReaderAsyncIterableEither'>
```

Added in v0.1.0

## fromIO

**Signature**

```ts
export declare const fromIO: NaturalTransformation13<'IO', 'ReaderAsyncIterableEither'>
```

Added in v0.1.0

## fromIOEither

**Signature**

```ts
export declare const fromIOEither: NaturalTransformation23<'IOEither', 'ReaderAsyncIterableEither'>
```

Added in v0.1.0

## fromOption

**Signature**

```ts
export declare const fromOption: <E>(
  onNone: Lazy<E>
) => NaturalTransformation13C<'Option', 'ReaderAsyncIterableEither', E>
```

Added in v0.1.0

## fromReader

**Signature**

```ts
export declare const fromReader: NaturalTransformation23R<'Reader', 'ReaderAsyncIterableEither'>
```

Added in v0.1.0

## fromTask

**Signature**

```ts
export declare const fromTask: NaturalTransformation13<'Task', 'ReaderAsyncIterableEither'>
```

Added in v0.1.0

## fromTaskEither

**Signature**

```ts
export declare const fromTaskEither: NaturalTransformation23<'TaskEither', 'ReaderAsyncIterableEither'>
```

Added in v0.1.0

# utils

## ApT

**Signature**

```ts
export declare const ApT: ReaderAsyncIterableEither<unknown, never, readonly []>
```

Added in v0.1.0

## Do

**Signature**

```ts
export declare const Do: ReaderAsyncIterableEither<unknown, never, {}>
```

Added in v0.1.0

## apS

**Signature**

```ts
export declare const apS: <N, A, R, E, B>(
  name: Exclude<N, keyof A>,
  fb: ReaderAsyncIterableEither<R, E, B>
) => (
  fa: ReaderAsyncIterableEither<R, E, A>
) => ReaderAsyncIterableEither<R, E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v0.1.0

## apSW

**Signature**

```ts
export declare const apSW: <A, N extends string, R2, E2, B>(
  name: Exclude<N, keyof A>,
  fb: ReaderAsyncIterableEither<R2, E2, B>
) => <R1, E1>(
  fa: ReaderAsyncIterableEither<R1, E1, A>
) => ReaderAsyncIterableEither<R1 & R2, E2 | E1, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v0.1.0

## bind

**Signature**

```ts
export declare const bind: (
  C: AIChain
) => <N, A, R, E, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => ReaderAsyncIterableEither<R, E, B>
) => (
  ma: ReaderAsyncIterableEither<R, E, A>
) => ReaderAsyncIterableEither<R, E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v0.1.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N>(
  name: N
) => <R, E, A>(fa: ReaderAsyncIterableEither<R, E, A>) => ReaderAsyncIterableEither<R, E, { readonly [K in N]: A }>
```

Added in v0.1.0

## bindW

**Signature**

```ts
export declare const bindW: (
  C: AIChain
) => <N extends string, A, R2, E2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => ReaderAsyncIterableEither<R2, E2, B>
) => <R1, E1>(
  fa: ReaderAsyncIterableEither<R1, E1, A>
) => ReaderAsyncIterableEither<R1 & R2, E2 | E1, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v0.1.0
