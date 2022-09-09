---
title: AsyncIterableEither/Switch.ts
nav_order: 8
parent: Modules
---

## Switch overview

AsyncIterableEither/Switch

Added in v0.1.0

---

<h2 class="text-delta">Table of contents</h2>

- [Monad](#monad)
  - [chain](#chain)
  - [chainW](#chainw)
- [combinators](#combinators)
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
  - [filterOrElse](#filterorelse)
  - [filterOrElseW](#filterorelsew)
  - [flatten](#flatten)
  - [flattenW](#flattenw)
  - [orElse](#orelse)
  - [orElseFirst](#orelsefirst)
  - [orElseFirstAsyncIterableK](#orelsefirstasynciterablek)
  - [orElseFirstIOK](#orelsefirstiok)
  - [orElseFirstW](#orelsefirstw)
  - [orElseW](#orelsew)
  - [orLeft](#orleft)
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
  - [MonadThrow](#monadthrow)
  - [getSemigroup](#getsemigroup)
- [interop](#interop)
  - [chainNullableK](#chainnullablek)
- [utils](#utils)
  - [bind](#bind)
  - [bindW](#bindw)
  - [getMonoid](#getmonoid)

---

# Monad

## chain

Composes computations in sequence, using the return value of one computation to determine the next computation.

**Signature**

```ts
export declare const chain: <E, A, B>(
  f: (a: A) => AIE.AsyncIterableEither<E, B>
) => (ma: AIE.AsyncIterableEither<E, A>) => AIE.AsyncIterableEither<E, B>
```

Added in v0.1.0

## chainW

Less strict version of [`chain`](#chain).

**Signature**

```ts
export declare const chainW: <E2, A, B>(
  f: (a: A) => AIE.AsyncIterableEither<E2, B>
) => <E1>(ma: AIE.AsyncIterableEither<E1, A>) => AIE.AsyncIterableEither<E2 | E1, B>
```

Added in v0.1.0

# combinators

## chainAsyncIterableK

**Signature**

```ts
export declare const chainAsyncIterableK: <A, B>(
  f: (a: A) => AsyncIterable<B>
) => <E>(first: AIE.AsyncIterableEither<E, A>) => AIE.AsyncIterableEither<E, B>
```

Added in v0.1.0

## chainAsyncIterableOptionK

**Signature**

```ts
export declare const chainAsyncIterableOptionK: <E>(
  onNone: Lazy<E>
) => <A, B>(f: (a: A) => AsyncIterableOption<B>) => (ma: AIE.AsyncIterableEither<E, A>) => AIE.AsyncIterableEither<E, B>
```

Added in v0.1.0

## chainAsyncIterableOptionKW

**Signature**

```ts
export declare const chainAsyncIterableOptionKW: <E2>(
  onNone: Lazy<E2>
) => <A, B>(
  f: (a: A) => AsyncIterableOption<B>
) => <E1>(ma: AIE.AsyncIterableEither<E1, A>) => AIE.AsyncIterableEither<E2 | E1, B>
```

Added in v0.1.0

## chainEitherK

**Signature**

```ts
export declare const chainEitherK: <E, A, B>(
  f: (a: A) => Either<E, B>
) => (ma: AIE.AsyncIterableEither<E, A>) => AIE.AsyncIterableEither<E, B>
```

Added in v0.1.0

## chainEitherKW

Less strict version of [`chainEitherK`](#chaineitherk).

**Signature**

```ts
export declare const chainEitherKW: <E2, A, B>(
  f: (a: A) => Either<E2, B>
) => <E1>(ma: AIE.AsyncIterableEither<E1, A>) => AIE.AsyncIterableEither<E2 | E1, B>
```

Added in v0.1.0

## chainFirst

Composes computations in sequence, using the return value of one computation to determine the next computation and
keeping only the result of the first.

Derivable from `Chain`.

**Signature**

```ts
export declare const chainFirst: <A, E, B>(
  f: (a: A) => AIE.AsyncIterableEither<E, B>
) => (first: AIE.AsyncIterableEither<E, A>) => AIE.AsyncIterableEither<E, A>
```

Added in v0.1.0

## chainFirstAsyncIterableK

**Signature**

```ts
export declare const chainFirstAsyncIterableK: <A, B>(
  f: (a: A) => AsyncIterable<B>
) => <E>(first: AIE.AsyncIterableEither<E, A>) => AIE.AsyncIterableEither<E, A>
```

Added in v0.1.0

## chainFirstEitherK

**Signature**

```ts
export declare const chainFirstEitherK: <A, E, B>(
  f: (a: A) => Either<E, B>
) => (ma: AIE.AsyncIterableEither<E, A>) => AIE.AsyncIterableEither<E, A>
```

Added in v0.1.0

## chainFirstEitherKW

Less strict version of [`chainFirstEitherK`](#chainfirsteitherk).

**Signature**

```ts
export declare const chainFirstEitherKW: <A, E2, B>(
  f: (a: A) => Either<E2, B>
) => <E1>(ma: AIE.AsyncIterableEither<E1, A>) => AIE.AsyncIterableEither<E2 | E1, A>
```

Added in v0.1.0

## chainFirstIOK

**Signature**

```ts
export declare const chainFirstIOK: <A, B>(
  f: (a: A) => IO<B>
) => <E>(first: AIE.AsyncIterableEither<E, A>) => AIE.AsyncIterableEither<E, A>
```

Added in v0.1.0

## chainFirstW

Less strict version of [`chainFirst`](#chainfirst).

Derivable from `Chain`.

**Signature**

```ts
export declare const chainFirstW: <E2, A, B>(
  f: (a: A) => AIE.AsyncIterableEither<E2, B>
) => <E1>(ma: AIE.AsyncIterableEither<E1, A>) => AIE.AsyncIterableEither<E2 | E1, A>
```

Added in v0.1.0

## chainIOEitherK

**Signature**

```ts
export declare const chainIOEitherK: <E, A, B>(
  f: (a: A) => IOEither<E, B>
) => (ma: AIE.AsyncIterableEither<E, A>) => AIE.AsyncIterableEither<E, B>
```

Added in v0.1.0

## chainIOEitherKW

Less strict version of [`chainIOEitherK`](#chainioeitherk).

**Signature**

```ts
export declare const chainIOEitherKW: <E2, A, B>(
  f: (a: A) => IOEither<E2, B>
) => <E1>(ma: AIE.AsyncIterableEither<E1, A>) => AIE.AsyncIterableEither<E2 | E1, B>
```

Added in v0.1.0

## chainIOK

**Signature**

```ts
export declare const chainIOK: <A, B>(
  f: (a: A) => IO<B>
) => <E>(first: AIE.AsyncIterableEither<E, A>) => AIE.AsyncIterableEither<E, B>
```

Added in v0.1.0

## chainOptionK

**Signature**

```ts
export declare const chainOptionK: <E>(
  onNone: Lazy<E>
) => <A, B>(f: (a: A) => Option<B>) => (ma: AIE.AsyncIterableEither<E, A>) => AIE.AsyncIterableEither<E, B>
```

Added in v0.1.0

## chainWithIndex

Composes computations in sequence, using the return value of one computation to determine the next computation.

**Signature**

```ts
export declare const chainWithIndex: <E, A, B>(
  f: (i: number, a: A) => AIE.AsyncIterableEither<E, B>
) => (ma: AIE.AsyncIterableEither<E, A>) => AIE.AsyncIterableEither<E, B>
```

Added in v0.1.0

## filterOrElse

**Signature**

```ts
export declare const filterOrElse: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (
    ma: AIE.AsyncIterableEither<E, A>
  ) => AIE.AsyncIterableEither<E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <B extends A>(
    mb: AIE.AsyncIterableEither<E, B>
  ) => AIE.AsyncIterableEither<E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (
    ma: AIE.AsyncIterableEither<E, A>
  ) => AIE.AsyncIterableEither<E, A>
}
```

Added in v0.1.0

## filterOrElseW

Less strict version of [`filterOrElse`](#filterorelse).

**Signature**

```ts
export declare const filterOrElseW: {
  <A, B extends A, E2>(refinement: Refinement<A, B>, onFalse: (a: A) => E2): <E1>(
    ma: AIE.AsyncIterableEither<E1, A>
  ) => AIE.AsyncIterableEither<E2 | E1, B>
  <A, E2>(predicate: Predicate<A>, onFalse: (a: A) => E2): <E1, B extends A>(
    mb: AIE.AsyncIterableEither<E1, B>
  ) => AIE.AsyncIterableEither<E2 | E1, B>
  <A, E2>(predicate: Predicate<A>, onFalse: (a: A) => E2): <E1>(
    ma: AIE.AsyncIterableEither<E1, A>
  ) => AIE.AsyncIterableEither<E2 | E1, A>
}
```

Added in v0.1.0

## flatten

Derivable from `Chain`.

**Signature**

```ts
export declare const flatten: <E, A>(
  mma: AIE.AsyncIterableEither<E, AIE.AsyncIterableEither<E, A>>
) => AIE.AsyncIterableEither<E, A>
```

Added in v0.1.0

## flattenW

Less strict version of [`flatten`](#flatten).

**Signature**

```ts
export declare const flattenW: <E1, E2, A>(
  mma: AIE.AsyncIterableEither<E1, AIE.AsyncIterableEither<E2, A>>
) => AIE.AsyncIterableEither<E1 | E2, A>
```

Added in v0.1.0

## orElse

Returns `ma` if is a `Right` or the value returned by `onLeft` otherwise.

See also [alt](#alt).

**Signature**

```ts
export declare const orElse: <E1, A, E2>(
  onLeft: (e: E1) => AIE.AsyncIterableEither<E2, A>
) => (ma: AIE.AsyncIterableEither<E1, A>) => AIE.AsyncIterableEither<E2, A>
```

Added in v0.1.0

## orElseFirst

**Signature**

```ts
export declare const orElseFirst: <E, B>(
  onLeft: (e: E) => AIE.AsyncIterableEither<E, B>
) => <A>(ma: AIE.AsyncIterableEither<E, A>) => AIE.AsyncIterableEither<E, A>
```

Added in v0.1.0

## orElseFirstAsyncIterableK

**Signature**

```ts
export declare const orElseFirstAsyncIterableK: <E, B>(
  onLeft: (e: E) => AsyncIterable<B>
) => <A>(ma: AIE.AsyncIterableEither<E, A>) => AIE.AsyncIterableEither<E, A>
```

Added in v0.1.0

## orElseFirstIOK

**Signature**

```ts
export declare const orElseFirstIOK: <E, B>(
  onLeft: (e: E) => IO<B>
) => <A>(ma: AIE.AsyncIterableEither<E, A>) => AIE.AsyncIterableEither<E, A>
```

Added in v0.1.0

## orElseFirstW

**Signature**

```ts
export declare const orElseFirstW: <E1, E2, B>(
  onLeft: (e: E1) => AIE.AsyncIterableEither<E2, B>
) => <A>(ma: AIE.AsyncIterableEither<E1, A>) => AIE.AsyncIterableEither<E1 | E2, A>
```

Added in v0.1.0

## orElseW

Less strict version of [`orElse`](#orelse).

**Signature**

```ts
export declare const orElseW: <E1, E2, B>(
  onLeft: (e: E1) => AIE.AsyncIterableEither<E2, B>
) => <A>(ma: AIE.AsyncIterableEither<E1, A>) => AIE.AsyncIterableEither<E2, B | A>
```

Added in v0.1.0

## orLeft

**Signature**

```ts
export declare const orLeft: <E1, E2>(
  onLeft: (e: E1) => AsyncIterable<E2>
) => <A>(fa: AIE.AsyncIterableEither<E1, A>) => AIE.AsyncIterableEither<E2, A>
```

Added in v0.1.0

# destructors

## fold

Alias of [`matchE`](#matche).

**Signature**

```ts
export declare const fold: <E, A, B>(
  onLeft: (e: E) => AsyncIterable<B>,
  onRight: (a: A) => AsyncIterable<B>
) => (ma: AIE.AsyncIterableEither<E, A>) => AsyncIterable<B>
```

Added in v0.1.0

## foldW

Alias of [`matchEW`](#matchew).

**Signature**

```ts
export declare const foldW: <E, B, A, C>(
  onLeft: (e: E) => AsyncIterable<B>,
  onRight: (a: A) => AsyncIterable<C>
) => (ma: AIE.AsyncIterableEither<E, A>) => AsyncIterable<B | C>
```

Added in v0.1.0

## getOrElse

**Signature**

```ts
export declare const getOrElse: <E, A>(
  onLeft: (e: E) => AsyncIterable<A>
) => (ma: AIE.AsyncIterableEither<E, A>) => AsyncIterable<A>
```

Added in v0.1.0

## getOrElseW

Less strict version of [`getOrElse`](#getorelse).

**Signature**

```ts
export declare const getOrElseW: <E, B>(
  onLeft: (e: E) => AsyncIterable<B>
) => <A>(ma: AIE.AsyncIterableEither<E, A>) => AsyncIterable<B | A>
```

Added in v0.1.0

## matchE

**Signature**

```ts
export declare const matchE: <E, A, B>(
  onLeft: (e: E) => AsyncIterable<B>,
  onRight: (a: A) => AsyncIterable<B>
) => (ma: AIE.AsyncIterableEither<E, A>) => AsyncIterable<B>
```

Added in v0.1.0

## matchEW

Less strict version of [`matchE`](#matche).

**Signature**

```ts
export declare const matchEW: <E, B, A, C>(
  onLeft: (e: E) => AsyncIterable<B>,
  onRight: (a: A) => AsyncIterable<C>
) => (ma: AIE.AsyncIterableEither<E, A>) => AsyncIterable<B | C>
```

Added in v0.1.0

# instances

## Chain

**Signature**

```ts
export declare const Chain: Chain2<'AsyncIterableEither'>
```

Added in v0.1.0

## ChainWithIndex

**Signature**

```ts
export declare const ChainWithIndex: ChainWithIndex2<'AsyncIterableEither', number>
```

Added in v0.1.0

## Monad

**Signature**

```ts
export declare const Monad: Monad2<'AsyncIterableEither'>
```

Added in v0.1.0

## MonadAsyncIterable

**Signature**

```ts
export declare const MonadAsyncIterable: MonadAsyncIterable2<'AsyncIterableEither'>
```

Added in v0.1.0

## MonadIO

**Signature**

```ts
export declare const MonadIO: MonadIO2<'AsyncIterableEither'>
```

Added in v0.1.0

## MonadTask

**Signature**

```ts
export declare const MonadTask: MonadTask2<'AsyncIterableEither'>
```

Added in v0.1.0

## MonadThrow

**Signature**

```ts
export declare const MonadThrow: MonadThrow2<'AsyncIterableEither'>
```

Added in v0.1.0

## getSemigroup

Get a `Semigroup` based on the concatenation of `AsyncIterable`s.
See also [`getMonoid`](#getMonoid).

**Signature**

```ts
export declare const getSemigroup: <E = never, A = never>() => Semigroup<AIE.AsyncIterableEither<E, A>>
```

Added in v0.1.0

# interop

## chainNullableK

**Signature**

```ts
export declare const chainNullableK: <E>(
  e: E
) => <A, B>(
  f: (a: A) => B | null | undefined
) => (ma: AIE.AsyncIterableEither<E, A>) => AIE.AsyncIterableEither<E, NonNullable<B>>
```

Added in v0.1.0

# utils

## bind

**Signature**

```ts
export declare const bind: <N, A, E, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => AIE.AsyncIterableEither<E, B>
) => (
  ma: AIE.AsyncIterableEither<E, A>
) => AIE.AsyncIterableEither<E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v0.1.0

## bindW

**Signature**

```ts
export declare const bindW: <N extends string, A, E2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => AIE.AsyncIterableEither<E2, B>
) => <E1>(
  fa: AIE.AsyncIterableEither<E1, A>
) => AIE.AsyncIterableEither<E2 | E1, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v0.1.0

## getMonoid

**Signature**

```ts
export declare const getMonoid: <E = never, A = never>() => Monoid<AIE.AsyncIterableEither<E, A>>
```

Added in v0.1.0
