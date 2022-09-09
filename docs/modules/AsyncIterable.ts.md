---
title: AsyncIterable.ts
nav_order: 1
parent: Modules
---

## AsyncIterable overview

```ts
interface AsyncIterable<A>
```

Added in v0.1.0

---

<h2 class="text-delta">Table of contents</h2>

- [Alternative](#alternative)
  - [zero](#zero)
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
- [FilterableWithIndex](#filterablewithindex)
  - [filterMapWithIndex](#filtermapwithindex)
  - [filterWithIndex](#filterwithindex)
  - [partitionMapWithIndex](#partitionmapwithindex)
  - [partitionWithIndex](#partitionwithindex)
- [Functor](#functor)
  - [map](#map)
- [FunctorWithIndex](#functorwithindex)
  - [mapWithIndex](#mapwithindex)
- [Monad](#monad)
  - [chain](#chain)
- [combinators](#combinators)
  - [chainFirst](#chainfirst)
  - [chainWithIndex](#chainwithindex)
  - [chunksOf](#chunksof)
  - [concat](#concat)
  - [concatW](#concatw)
  - [difference](#difference)
  - [dropLeft](#dropleft)
  - [dropLeftWhile](#dropleftwhile)
  - [dropRight](#dropright)
  - [flatten](#flatten)
  - [getOnEmpty](#getonempty)
  - [intersection](#intersection)
  - [intersperse](#intersperse)
  - [lefts](#lefts)
  - [prependAll](#prependall)
  - [reverse](#reverse)
  - [rights](#rights)
  - [scanLeft](#scanleft)
  - [scanRight](#scanright)
  - [takeLeft](#takeleft)
  - [takeLeftWhile](#takeleftwhile)
  - [takeRight](#takeright)
  - [union](#union)
  - [uniq](#uniq)
  - [uniqConsecutive](#uniqconsecutive)
  - [zip](#zip)
  - [zipWith](#zipwith)
- [constructors](#constructors)
  - [append](#append)
  - [appendW](#appendw)
  - [empty](#empty)
  - [fromPredicate](#frompredicate)
  - [makeBy](#makeby)
  - [prepend](#prepend)
  - [prependW](#prependw)
  - [replicate](#replicate)
- [instances](#instances)
  - [Applicative](#applicative)
  - [Apply](#apply-1)
  - [Pointed](#pointed)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
- [natural transformations](#natural-transformations)
  - [fromArray](#fromarray)
  - [fromEither](#fromeither)
  - [fromIO](#fromio)
  - [fromIOEither](#fromioeither)
  - [fromOption](#fromoption)
  - [fromTask](#fromtask)
  - [fromTaskEither](#fromtaskeither)
- [utils](#utils)
  - [Compactable](#compactable-1)
  - [Filterable](#filterable-1)
  - [FilterableWithIndex](#filterablewithindex-1)
  - [Functor](#functor-1)
  - [FunctorWithIndex](#functorwithindex-1)
  - [bind](#bind)
  - [elem](#elem)
  - [findFirst](#findfirst)
  - [findFirstMap](#findfirstmap)
  - [findLast](#findlast)
  - [findLastMap](#findlastmap)
  - [getMonad](#getmonad)
  - [getMonadAsyncIterable](#getmonadasynciterable)
  - [getMonadIO](#getmonadio)
  - [getMonadTask](#getmonadtask)
  - [getMonoid](#getmonoid)
  - [of](#of)

---

# Alternative

## zero

**Signature**

```ts
export declare const zero: <A>() => AsyncIterable<A>
```

Added in v0.1.0

# Apply

## ap

Apply a function to an argument under a type constructor.

**Signature**

```ts
export declare const ap: <A>(fa: AsyncIterable<A>) => <B>(fab: AsyncIterable<(a: A) => B>) => AsyncIterable<B>
```

Added in v0.1.0

# Compactable

## compact

**Signature**

```ts
export declare const compact: <A>(fa: AsyncIterable<O.Option<A>>) => AsyncIterable<A>
```

Added in v0.1.0

## separate

**Signature**

```ts
export declare const separate: <A, B>(
  fa: AsyncIterable<E.Either<A, B>>
) => Separated<AsyncIterable<A>, AsyncIterable<B>>
```

Added in v0.1.0

# Filterable

## filter

**Signature**

```ts
export declare const filter: {
  <A, B extends A>(refinement: Refinement<A, B>): (as: AsyncIterable<A>) => AsyncIterable<B>
  <A>(predicate: Predicate<A>): <B extends A>(bs: AsyncIterable<B>) => AsyncIterable<B>
  <A>(predicate: Predicate<A>): (as: AsyncIterable<A>) => AsyncIterable<A>
}
```

Added in v0.1.0

## filterMap

**Signature**

```ts
export declare const filterMap: <A, B>(f: (a: A) => O.Option<B>) => (fa: AsyncIterable<A>) => AsyncIterable<B>
```

Added in v0.1.0

## partition

**Signature**

```ts
export declare const partition: {
  <A, B extends A>(refinement: Refinement<A, B>): (
    as: AsyncIterable<A>
  ) => Separated<AsyncIterable<A>, AsyncIterable<B>>
  <A>(predicate: Predicate<A>): <B extends A>(bs: AsyncIterable<B>) => Separated<AsyncIterable<B>, AsyncIterable<B>>
  <A>(predicate: Predicate<A>): (as: AsyncIterable<A>) => Separated<AsyncIterable<A>, AsyncIterable<A>>
}
```

Added in v0.1.0

## partitionMap

**Signature**

```ts
export declare const partitionMap: <A, B, C>(
  f: (a: A) => E.Either<B, C>
) => (fa: AsyncIterable<A>) => Separated<AsyncIterable<B>, AsyncIterable<C>>
```

Added in v0.1.0

# FilterableWithIndex

## filterMapWithIndex

**Signature**

```ts
export declare const filterMapWithIndex: <A, B>(
  f: (i: number, a: A) => O.Option<B>
) => (fa: AsyncIterable<A>) => AsyncIterable<B>
```

Added in v0.1.0

## filterWithIndex

Same as [`filter`](#filter), but passing also the index to the iterating function.

**Signature**

```ts
export declare const filterWithIndex: {
  <A, B extends A>(refinementWithIndex: RefinementWithIndex<number, A, B>): (as: AsyncIterable<A>) => AsyncIterable<B>
  <A>(predicateWithIndex: PredicateWithIndex<number, A>): <B extends A>(bs: AsyncIterable<B>) => AsyncIterable<B>
  <A>(predicateWithIndex: PredicateWithIndex<number, A>): (as: AsyncIterable<A>) => AsyncIterable<A>
}
```

Added in v0.1.0

## partitionMapWithIndex

**Signature**

```ts
export declare const partitionMapWithIndex: <A, B, C>(
  f: (i: number, a: A) => E.Either<B, C>
) => (fa: AsyncIterable<A>) => Separated<AsyncIterable<B>, AsyncIterable<C>>
```

Added in v0.1.0

## partitionWithIndex

Same as [`partition`](#partition), but passing also the index to the iterating function.

**Signature**

```ts
export declare const partitionWithIndex: {
  <A, B extends A>(refinementWithIndex: RefinementWithIndex<number, A, B>): (
    as: AsyncIterable<A>
  ) => Separated<AsyncIterable<A>, AsyncIterable<B>>
  <A>(predicateWithIndex: PredicateWithIndex<number, A>): <B extends A>(
    bs: AsyncIterable<B>
  ) => Separated<AsyncIterable<B>, AsyncIterable<B>>
  <A>(predicateWithIndex: PredicateWithIndex<number, A>): (
    as: AsyncIterable<A>
  ) => Separated<AsyncIterable<A>, AsyncIterable<A>>
}
```

Added in v0.1.0

# Functor

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => (fa: AsyncIterable<A>) => AsyncIterable<B>
```

Added in v0.1.0

# FunctorWithIndex

## mapWithIndex

Same as [`map`](#map), but the iterating function takes both the index and the value
of the element.

**Signature**

```ts
export declare const mapWithIndex: <A, B>(f: (i: number, a: A) => B) => (fa: AsyncIterable<A>) => AsyncIterable<B>
```

Added in v0.1.0

# Monad

## chain

Composes computations in sequence, using the return value of one computation to determine the next computation.

**Signature**

```ts
export declare const chain: (
  C: Chain1<URI>
) => <A, B>(f: (a: A) => AsyncIterable<B>) => (ma: AsyncIterable<A>) => AsyncIterable<B>
```

Added in v0.1.0

# combinators

## chainFirst

Composes computations in sequence, using the return value of one computation to determine the next computation and
keeping only the result of the first.

Derivable from `Chain`.

**Signature**

```ts
export declare const chainFirst: (
  C: Chain1<URI>
) => <A, B>(f: (a: A) => AsyncIterable<B>) => (first: AsyncIterable<A>) => AsyncIterable<A>
```

Added in v0.1.0

## chainWithIndex

Composes computations in sequence, using the return value of one computation to determine the next computation.

**Signature**

```ts
export declare const chainWithIndex: (
  C: ChainWithIndex1<URI, number>
) => <A, B>(f: (i: number, a: A) => AsyncIterable<B>) => (ma: AsyncIterable<A>) => AsyncIterable<B>
```

Added in v0.1.0

## chunksOf

Collect a `AsyncIterable` elements into length-`n` pieces.

**Signature**

```ts
export declare const chunksOf: (n: number) => <A>(as: AsyncIterable<A>) => AsyncIterable<ReadonlyNonEmptyArray<A>>
```

Added in v0.1.0

## concat

**Signature**

```ts
export declare const concat: <A>(second: AsyncIterable<A>) => (first: AsyncIterable<A>) => AsyncIterable<A>
```

Added in v0.1.0

## concatW

**Signature**

```ts
export declare const concatW: <B>(second: AsyncIterable<B>) => <A>(first: AsyncIterable<A>) => AsyncIterable<B | A>
```

Added in v0.1.0

## difference

Produces the set difference of two sequences by using a `Eq` for equality comparisons.

**Signature**

```ts
export declare const difference: <A>(Eq: Eq<A>) => (xs: AsyncIterable<A>) => (ys: AsyncIterable<A>) => AsyncIterable<A>
```

Added in v0.1.0

## dropLeft

Creates a new `AsyncIterable` dropping a max number of elements from the start.

**Note**. `n` is normalized to a non negative integer.

**Signature**

```ts
export declare const dropLeft: (n: number) => <A>(as: AsyncIterable<A>) => AsyncIterable<A>
```

Added in v0.1.0

## dropLeftWhile

Bypasses elements in an async-iterale sequence as long as a specified condition is true
and then returns the remaining elements.

**Signature**

```ts
export declare function dropLeftWhile<A, B extends A>(
  refinement: Refinement<A, B>
): (as: AsyncIterable<A>) => AsyncIterable<B>
export declare function dropLeftWhile<A>(
  predicate: Predicate<A>
): <B extends A>(bs: AsyncIterable<B>) => AsyncIterable<B>
export declare function dropLeftWhile<A>(predicate: Predicate<A>): (as: AsyncIterable<A>) => AsyncIterable<A>
```

Added in v0.1.0

## dropRight

Creates a new `AsyncIterable` dropping a max number of elements from the end.

**Note**. `n` is normalized to a non negative integer.

**Signature**

```ts
export declare const dropRight: (n: number) => <A>(as: AsyncIterable<A>) => AsyncIterable<A>
```

Added in v0.1.0

## flatten

Derivable from `Monad`.

**Signature**

```ts
export declare const flatten: (C: Chain1<URI>) => <A>(mma: AsyncIterable<AsyncIterable<A>>) => AsyncIterable<A>
```

Added in v0.1.0

## getOnEmpty

Returns the provided AsyncIterable if empty.

**Signature**

```ts
export declare const getOnEmpty: <B>(
  onEmpty: Lazy<AsyncIterable<B>>
) => <A>(ma: AsyncIterable<A>) => AsyncIterable<B | A>
```

Added in v0.1.0

## intersection

Produces the set intersection of two sequences by using a `Eq` for equality comparisons.

**Signature**

```ts
export declare const intersection: <A>(
  Eq: Eq<A>
) => (xs: AsyncIterable<A>) => (ys: AsyncIterable<A>) => AsyncIterable<A>
```

Added in v0.1.0

## intersperse

Places an element in between elements

**Signature**

```ts
export declare const intersperse: <A>(middle: A) => (as: AsyncIterable<A>) => AsyncIterable<A>
```

Added in v0.1.0

## lefts

Takes an `AsyncIterable` of `Either` and produces an `AsyncIterable` containing
the values of all the `Left` elements in the same order.

**Signature**

```ts
export declare const lefts: <E, A>(as: AsyncIterable<E.Either<E, A>>) => AsyncIterable<E>
```

Added in v0.1.0

## prependAll

Prepend an element to every element.

**Signature**

```ts
export declare const prependAll: <A>(middle: A) => (as: AsyncIterable<A>) => AsyncIterable<A>
```

Added in v0.1.0

## reverse

Reverse an AsyncIterable

**Signature**

```ts
export declare const reverse: <A>(as: AsyncIterable<A>) => AsyncIterable<A>
```

Added in v0.1.0

## rights

Takes an `AsyncIterable` of `Either` and produces an `AsyncIterable` containing
the values of all the `Right` elements in the same order.

**Signature**

```ts
export declare const rights: <E, A>(as: AsyncIterable<E.Either<E, A>>) => AsyncIterable<A>
```

Added in v0.1.0

## scanLeft

Same as `reduce` but it carries over the intermediate steps

**Signature**

```ts
export declare const scanLeft: <A, B>(b: B, f: (b: B, a: A) => B) => (as: AsyncIterable<A>) => AsyncIterable<B>
```

Added in v0.1.0

## scanRight

Same as `reduce` but it carries over the intermediate steps

**Signature**

```ts
export declare const scanRight: <A, B>(b: B, f: (b: B, a: A) => B) => (as: AsyncIterable<A>) => AsyncIterable<B>
```

Added in v0.1.0

## takeLeft

**Signature**

```ts
export declare const takeLeft: (n: number) => <A>(as: AsyncIterable<A>) => AsyncIterable<A>
```

Added in v0.1.0

## takeLeftWhile

Returns elements from an async-iterable sequence as long as a specified condition is true.

**Signature**

```ts
export declare function takeLeftWhile<A, B extends A>(
  refinement: Refinement<A, B>
): (as: AsyncIterable<A>) => AsyncIterable<B>
export declare function takeLeftWhile<A>(
  predicate: Predicate<A>
): <B extends A>(bs: AsyncIterable<B>) => AsyncIterable<B>
export declare function takeLeftWhile<A>(predicate: Predicate<A>): (as: AsyncIterable<A>) => AsyncIterable<A>
```

Added in v0.1.0

## takeRight

**Signature**

```ts
export declare const takeRight: (n: number) => <A>(as: AsyncIterable<A>) => AsyncIterable<A>
```

Added in v0.1.0

## union

Produces the set union of two sequences by using a `Eq` for equality comparisons.

**Signature**

```ts
export declare const union: <A>(Eq: Eq<A>) => (xs: AsyncIterable<A>) => (ys: AsyncIterable<A>) => AsyncIterable<A>
```

Added in v0.1.0

## uniq

Remove duplicates from an AsyncIterable, keeping the first occurrence of an element.

**Signature**

```ts
export declare const uniq: <A>(Eq: Eq<A>) => (as: AsyncIterable<A>) => AsyncIterable<A>
```

Added in v0.1.0

## uniqConsecutive

Returns an async-iterable sequence that contains only distinct contiguous elements according to the optional keySelector and comparer.

**Signature**

```ts
export declare const uniqConsecutive: <A>(Eq: Eq<A>) => (as: AsyncIterable<A>) => AsyncIterable<A>
```

Added in v0.1.0

## zip

Takes two AsyncIterable and returns an AsyncIterable of corresponding pairs.

**Signature**

```ts
export declare const zip: <B>(bs: AsyncIterable<B>) => <A>(as: AsyncIterable<A>) => AsyncIterable<readonly [A, B]>
```

Added in v0.1.0

## zipWith

Use `zip` and apply a function to every pairs of elements.

**Signature**

```ts
export declare const zipWith: <A, B, C>(
  fb: AsyncIterable<B>,
  f: (a: A, b: B) => C
) => (fa: AsyncIterable<A>) => AsyncIterable<C>
```

Added in v0.1.0

# constructors

## append

Append an element.

**Signature**

```ts
export declare const append: <A>(end: A) => (init: AsyncIterable<A>) => AsyncIterable<A>
```

Added in v0.1.0

## appendW

Less strict version of [`append`](#append).

**Signature**

```ts
export declare const appendW: <A, B>(end: B) => (init: AsyncIterable<A>) => AsyncIterable<A | B>
```

Added in v0.1.0

## empty

An empty `AsyncIterable`.

**Signature**

```ts
export declare const empty: AsyncIterable<never>
```

Added in v0.1.0

## fromPredicate

Create an AsyncIterable with one element, if the element satisfies the predicate, otherwise
it returns an empty AsyncIterable.

**Signature**

```ts
export declare function fromPredicate<A, B extends A>(refinement: Refinement<A, B>): (a: A) => AsyncIterable<B>
export declare function fromPredicate<A>(predicate: Predicate<A>): <B extends A>(b: B) => AsyncIterable<B>
export declare function fromPredicate<A>(predicate: Predicate<A>): (a: A) => AsyncIterable<A>
```

Added in v0.1.0

## makeBy

Return an `AsyncIterable` emitting `n` elements with element `i` initialized with `f(i)`.

**Signature**

```ts
export declare const makeBy: <A>(n: number, f: (i: number) => A) => AsyncIterable<A>
```

Added in v0.1.0

## prepend

Prepend an element.

**Signature**

```ts
export declare const prepend: <A>(head: A) => (tail: AsyncIterable<A>) => AsyncIterable<A>
```

Added in v0.1.0

## prependW

Less strict version of [`prepend`](#prepend).

**Signature**

```ts
export declare const prependW: <A, B>(head: B) => (tail: AsyncIterable<A>) => AsyncIterable<A | B>
```

Added in v0.1.0

## replicate

Create an `AsyncIterable` emitting a value repeated the specified number of times.

**Signature**

```ts
export declare const replicate: <A>(n: number, a: A) => AsyncIterable<A>
```

Added in v0.1.0

# instances

## Applicative

**Signature**

```ts
export declare const Applicative: Applicative1<'AsyncIterable'>
```

Added in v0.1.0

## Apply

**Signature**

```ts
export declare const Apply: Apply1<'AsyncIterable'>
```

Added in v0.1.0

## Pointed

**Signature**

```ts
export declare const Pointed: Pointed1<'AsyncIterable'>
```

Added in v0.1.0

## URI

**Signature**

```ts
export declare const URI: 'AsyncIterable'
```

Added in v0.1.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v0.1.0

# natural transformations

## fromArray

Create from array.

**Signature**

```ts
export declare const fromArray: <A>(ma: readonly A[]) => AsyncIterable<A>
```

Added in v0.1.0

## fromEither

**Signature**

```ts
export declare const fromEither: NaturalTransformation21<'Either', 'AsyncIterable'>
```

Added in v0.1.0

## fromIO

**Signature**

```ts
export declare const fromIO: NaturalTransformation11<'IO', 'AsyncIterable'>
```

Added in v0.1.0

## fromIOEither

**Signature**

```ts
export declare const fromIOEither: NaturalTransformation21<'IOEither', 'AsyncIterable'>
```

Added in v0.1.0

## fromOption

**Signature**

```ts
export declare const fromOption: NaturalTransformation11<'Option', 'AsyncIterable'>
```

Added in v0.1.0

## fromTask

**Signature**

```ts
export declare const fromTask: NaturalTransformation11<'Task', 'AsyncIterable'>
```

Added in v0.1.0

## fromTaskEither

**Signature**

```ts
export declare const fromTaskEither: NaturalTransformation21<'TaskEither', 'AsyncIterable'>
```

Added in v0.1.0

# utils

## Compactable

**Signature**

```ts
export declare const Compactable: Compactable1<'AsyncIterable'>
```

Added in v0.1.0

## Filterable

**Signature**

```ts
export declare const Filterable: Filterable1<'AsyncIterable'>
```

Added in v0.1.0

## FilterableWithIndex

**Signature**

```ts
export declare const FilterableWithIndex: FilterableWithIndex1<'AsyncIterable', number>
```

Added in v0.1.0

## Functor

**Signature**

```ts
export declare const Functor: Functor1<'AsyncIterable'>
```

Added in v0.1.0

## FunctorWithIndex

**Signature**

```ts
export declare const FunctorWithIndex: FunctorWithIndex1<'AsyncIterable', number>
```

Added in v0.1.0

## bind

**Signature**

```ts
export declare const bind: (
  C: Chain1<URI>
) => <N, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => AsyncIterable<B>
) => (ma: AsyncIterable<A>) => AsyncIterable<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v0.1.0

## elem

Test if a value is emitted. Takes a `Eq<A>` as a single
argument which returns the function to use to search for a value of type `A` in
an `AsyncIterable<A>`.

**Signature**

```ts
export declare const elem: <A>(Eq: Eq<A>) => (a: A) => (as: AsyncIterable<A>) => AsyncIterable<boolean>
```

Added in v0.1.0

## findFirst

Find the first element which satisfies a predicate (or a refinement) function

**Signature**

```ts
export declare function findFirst<A, B extends A>(
  refinement: Refinement<A, B>
): (as: AsyncIterable<A>) => AsyncIterable<O.Option<B>>
export declare function findFirst<A>(
  predicate: Predicate<A>
): <B extends A>(bs: AsyncIterable<B>) => AsyncIterable<O.Option<B>>
export declare function findFirst<A>(predicate: Predicate<A>): (as: AsyncIterable<A>) => AsyncIterable<O.Option<A>>
```

Added in v0.1.0

## findFirstMap

Given a selector function which takes an element and returns an option,
this function applies the selector to each element and
returns the first `Some` result. Otherwise it returns `None`.

**Signature**

```ts
export declare const findFirstMap: <A, B>(
  f: (a: A) => O.Option<B>
) => (as: AsyncIterable<A>) => AsyncIterable<O.Option<B>>
```

Added in v0.1.0

## findLast

Find the last element which satisfies a predicate function

**Signature**

```ts
export declare function findLast<A, B extends A>(
  refinement: Refinement<A, B>
): (as: AsyncIterable<A>) => AsyncIterable<O.Option<B>>
export declare function findLast<A>(
  predicate: Predicate<A>
): <B extends A>(bs: AsyncIterable<B>) => AsyncIterable<O.Option<B>>
export declare function findLast<A>(predicate: Predicate<A>): (as: AsyncIterable<A>) => AsyncIterable<O.Option<A>>
```

Added in v0.1.0

## findLastMap

Find the last element returned by an option based selector function

**Signature**

```ts
export declare const findLastMap: <A, B>(
  f: (a: A) => O.Option<B>
) => (as: AsyncIterable<A>) => AsyncIterable<O.Option<B>>
```

Added in v0.1.0

## getMonad

**Signature**

```ts
export declare const getMonad: <C extends Chain1<'AsyncIterable'>>(C: C) => Monad1<URI>
```

Added in v0.1.0

## getMonadAsyncIterable

**Signature**

```ts
export declare const getMonadAsyncIterable: <C extends ChainWithIndex1<'AsyncIterable', number>>(
  C: C
) => MonadAsyncIterable1<URI>
```

Added in v0.1.0

## getMonadIO

**Signature**

```ts
export declare const getMonadIO: <C extends Chain1<'AsyncIterable'>>(C: C) => MonadIO1<URI>
```

Added in v0.1.0

## getMonadTask

**Signature**

```ts
export declare const getMonadTask: <C extends Chain1<'AsyncIterable'>>(C: C) => MonadTask1<URI>
```

Added in v0.1.0

## getMonoid

**Signature**

```ts
export declare const getMonoid: <A = never>(S: Semigroup<AsyncIterable<A>>) => Monoid<AsyncIterable<A>>
```

Added in v0.1.0

## of

**Signature**

```ts
export declare const of: <A>(a: A) => AsyncIterable<A>
```

Added in v0.1.0
