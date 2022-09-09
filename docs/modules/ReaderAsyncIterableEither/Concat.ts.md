---
title: ReaderAsyncIterableEither/Concat.ts
nav_order: 23
parent: Modules
---

## Concat overview

ReaderAsyncIterableEither/Concat

Added in v0.1.0

---

<h2 class="text-delta">Table of contents</h2>

- [Alt](#alt)
  - [alt](#alt)
  - [altW](#altw)
- [Monad](#monad)
  - [chain](#chain)
  - [chainW](#chainw)
- [combinators](#combinators)
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
  - [flatten](#flatten)
  - [flattenW](#flattenw)
  - [orElse](#orelse)
  - [orElseFirst](#orelsefirst)
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

# Alt

## alt

Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
types of kind `* -> *`.

**Signature**

```ts
export declare const alt: <R, E, A>(
  that: () => RAIE.ReaderAsyncIterableEither<R, E, A>
) => (fa: RAIE.ReaderAsyncIterableEither<R, E, A>) => RAIE.ReaderAsyncIterableEither<R, E, A>
```

Added in v0.1.0

## altW

Less strict version of [`alt`](#alt).

**Signature**

```ts
export declare const altW: <R2, E2, B>(
  that: () => RAIE.ReaderAsyncIterableEither<R2, E2, B>
) => <R1, E1, A>(fa: RAIE.ReaderAsyncIterableEither<R1, E1, A>) => RAIE.ReaderAsyncIterableEither<R1 & R2, E2, B | A>
```

Added in v0.1.0

# Monad

## chain

Composes computations in sequence, using the return value of one computation to determine the next computation.

**Signature**

```ts
export declare const chain: <R, E, A, B>(
  f: (a: A) => RAIE.ReaderAsyncIterableEither<R, E, B>
) => (ma: RAIE.ReaderAsyncIterableEither<R, E, A>) => RAIE.ReaderAsyncIterableEither<R, E, B>
```

Added in v0.1.0

## chainW

Less strict version of [`chain`](#chain).

**Signature**

```ts
export declare const chainW: <R2, E2, A, B>(
  f: (a: A) => RAIE.ReaderAsyncIterableEither<R2, E2, B>
) => <R1, E1>(ma: RAIE.ReaderAsyncIterableEither<R1, E1, A>) => RAIE.ReaderAsyncIterableEither<R1 & R2, E2 | E1, B>
```

Added in v0.1.0

# combinators

## chainAsyncIterableEitherK

**Signature**

```ts
export declare const chainAsyncIterableEitherK: <E, A, B>(
  f: (a: A) => AsyncIterableEither<E, B>
) => <R>(ma: RAIE.ReaderAsyncIterableEither<R, E, A>) => RAIE.ReaderAsyncIterableEither<R, E, B>
```

Added in v0.1.0

## chainAsyncIterableEitherKW

**Signature**

```ts
export declare const chainAsyncIterableEitherKW: <E2, A, B>(
  f: (a: A) => AsyncIterableEither<E2, B>
) => <R, E1>(ma: RAIE.ReaderAsyncIterableEither<R, E1, A>) => RAIE.ReaderAsyncIterableEither<R, E2 | E1, B>
```

Added in v0.1.0

## chainAsyncIterableK

**Signature**

```ts
export declare const chainAsyncIterableK: <A, B>(
  f: (a: A) => AsyncIterable<B>
) => <R, E>(first: RAIE.ReaderAsyncIterableEither<R, E, A>) => RAIE.ReaderAsyncIterableEither<R, E, B>
```

Added in v0.1.0

## chainEitherK

**Signature**

```ts
export declare const chainEitherK: <E, A, B>(
  f: (a: A) => Either<E, B>
) => <R>(ma: RAIE.ReaderAsyncIterableEither<R, E, A>) => RAIE.ReaderAsyncIterableEither<R, E, B>
```

Added in v0.1.0

## chainEitherKW

Less strict version of [`chainEitherK`](#chaineitherk).

**Signature**

```ts
export declare const chainEitherKW: <E2, A, B>(
  f: (a: A) => Either<E2, B>
) => <R, E1>(ma: RAIE.ReaderAsyncIterableEither<R, E1, A>) => RAIE.ReaderAsyncIterableEither<R, E2 | E1, B>
```

Added in v0.1.0

## chainFirst

Composes computations in sequence, using the return value of one computation to determine the next computation and
keeping only the result of the first.

Derivable from `Chain`.

**Signature**

```ts
export declare const chainFirst: <R, E, A, B>(
  f: (a: A) => RAIE.ReaderAsyncIterableEither<R, E, B>
) => (ma: RAIE.ReaderAsyncIterableEither<R, E, A>) => RAIE.ReaderAsyncIterableEither<R, E, A>
```

Added in v0.1.0

## chainFirstAsyncIterableEitherK

**Signature**

```ts
export declare const chainFirstAsyncIterableEitherK: <E, A, B>(
  f: (a: A) => AsyncIterableEither<E, B>
) => <R>(ma: RAIE.ReaderAsyncIterableEither<R, E, A>) => RAIE.ReaderAsyncIterableEither<R, E, A>
```

Added in v0.1.0

## chainFirstAsyncIterableEitherKW

**Signature**

```ts
export declare const chainFirstAsyncIterableEitherKW: <E2, A, B>(
  f: (a: A) => AsyncIterableEither<E2, B>
) => <R, E1>(ma: RAIE.ReaderAsyncIterableEither<R, E1, A>) => RAIE.ReaderAsyncIterableEither<R, E2 | E1, A>
```

Added in v0.1.0

## chainFirstAsyncIterableK

**Signature**

```ts
export declare const chainFirstAsyncIterableK: <A, B>(
  f: (a: A) => AsyncIterable<B>
) => <R, E>(first: RAIE.ReaderAsyncIterableEither<R, E, A>) => RAIE.ReaderAsyncIterableEither<R, E, A>
```

Added in v0.1.0

## chainFirstEitherK

**Signature**

```ts
export declare const chainFirstEitherK: <A, E, B>(
  f: (a: A) => Either<E, B>
) => <R>(ma: RAIE.ReaderAsyncIterableEither<R, E, A>) => RAIE.ReaderAsyncIterableEither<R, E, A>
```

Added in v0.1.0

## chainFirstEitherKW

Less strict version of [`chainFirstEitherK`](#chainfirsteitherk).

**Signature**

```ts
export declare const chainFirstEitherKW: <A, E2, B>(
  f: (a: A) => Either<E2, B>
) => <R, E1>(ma: RAIE.ReaderAsyncIterableEither<R, E1, A>) => RAIE.ReaderAsyncIterableEither<R, E2 | E1, A>
```

Added in v0.1.0

## chainFirstIOK

**Signature**

```ts
export declare const chainFirstIOK: <A, B>(
  f: (a: A) => IO<B>
) => <R, E>(first: RAIE.ReaderAsyncIterableEither<R, E, A>) => RAIE.ReaderAsyncIterableEither<R, E, A>
```

Added in v0.1.0

## chainFirstReaderAsyncIterableK

**Signature**

```ts
export declare const chainFirstReaderAsyncIterableK: <A, R, B>(
  f: (a: A) => ReaderAsyncIterable<R, B>
) => <E = never>(ma: RAIE.ReaderAsyncIterableEither<R, E, A>) => RAIE.ReaderAsyncIterableEither<R, E, A>
```

Added in v0.1.0

## chainFirstReaderAsyncIterableKW

Less strict version of [`chainFirstReaderAsyncIterableK`](#chainfirstreadertaskk).

**Signature**

```ts
export declare const chainFirstReaderAsyncIterableKW: <A, R2, B>(
  f: (a: A) => ReaderAsyncIterable<R2, B>
) => <R1, E = never>(ma: RAIE.ReaderAsyncIterableEither<R1, E, A>) => RAIE.ReaderAsyncIterableEither<R1 & R2, E, A>
```

Added in v0.1.0

## chainFirstReaderEitherK

**Signature**

```ts
export declare const chainFirstReaderEitherK: <R, E, A, B>(
  f: (a: A) => ReaderEither<R, E, B>
) => (ma: RAIE.ReaderAsyncIterableEither<R, E, A>) => RAIE.ReaderAsyncIterableEither<R, E, A>
```

Added in v0.1.0

## chainFirstReaderEitherKW

Less strict version of [`chainFirstReaderEitherK`](#chainfirstreadereitherk).

**Signature**

```ts
export declare const chainFirstReaderEitherKW: <R2, E2, A, B>(
  f: (a: A) => ReaderEither<R2, E2, B>
) => <R1, E1>(ma: RAIE.ReaderAsyncIterableEither<R1, E1, A>) => RAIE.ReaderAsyncIterableEither<R1 & R2, E2 | E1, A>
```

Added in v0.1.0

## chainFirstReaderK

**Signature**

```ts
export declare const chainFirstReaderK: <A, R, B>(
  f: (a: A) => Reader<R, B>
) => <E = never>(ma: RAIE.ReaderAsyncIterableEither<R, E, A>) => RAIE.ReaderAsyncIterableEither<R, E, A>
```

Added in v0.1.0

## chainFirstReaderKW

Less strict version of [`chainFirstReaderK`](#chainfirstreaderk).

**Signature**

```ts
export declare const chainFirstReaderKW: <A, R1, B>(
  f: (a: A) => Reader<R1, B>
) => <R2, E = never>(ma: RAIE.ReaderAsyncIterableEither<R2, E, A>) => RAIE.ReaderAsyncIterableEither<R1 & R2, E, A>
```

Added in v0.1.0

## chainFirstReaderTaskEitherK

**Signature**

```ts
export declare const chainFirstReaderTaskEitherK: <R, E, A, B>(
  f: (a: A) => ReaderTaskEither<R, E, B>
) => (ma: RAIE.ReaderAsyncIterableEither<R, E, A>) => RAIE.ReaderAsyncIterableEither<R, E, A>
```

Added in v0.1.0

## chainFirstReaderTaskEitherKW

Less strict version of [`chainFirstReaderEitherK`](#chainfirstreadereitherk).

**Signature**

```ts
export declare const chainFirstReaderTaskEitherKW: <R2, E2, A, B>(
  f: (a: A) => ReaderTaskEither<R2, E2, B>
) => <R1, E1>(ma: RAIE.ReaderAsyncIterableEither<R1, E1, A>) => RAIE.ReaderAsyncIterableEither<R1 & R2, E2 | E1, A>
```

Added in v0.1.0

## chainFirstTaskEitherK

**Signature**

```ts
export declare const chainFirstTaskEitherK: <A, E, B>(
  f: (a: A) => TaskEither<E, B>
) => <R>(ma: RAIE.ReaderAsyncIterableEither<R, E, A>) => RAIE.ReaderAsyncIterableEither<R, E, A>
```

Added in v0.1.0

## chainFirstTaskEitherKW

Less strict version of [`chainFirstEitherK`](#chainfirsteitherk).

**Signature**

```ts
export declare const chainFirstTaskEitherKW: <A, E2, B>(
  f: (a: A) => TaskEither<E2, B>
) => <R, E1>(ma: RAIE.ReaderAsyncIterableEither<R, E1, A>) => RAIE.ReaderAsyncIterableEither<R, E2 | E1, A>
```

Added in v0.1.0

## chainFirstW

Less strict version of [`chainFirst`](#chainfirst).

Derivable from `Chain`.

**Signature**

```ts
export declare const chainFirstW: <R2, E2, A, B>(
  f: (a: A) => RAIE.ReaderAsyncIterableEither<R2, E2, B>
) => <R1, E1>(ma: RAIE.ReaderAsyncIterableEither<R1, E1, A>) => RAIE.ReaderAsyncIterableEither<R1 & R2, E2 | E1, A>
```

Added in v0.1.0

## chainIOEitherK

**Signature**

```ts
export declare const chainIOEitherK: <E, A, B>(
  f: (a: A) => IOEither<E, B>
) => <R>(ma: RAIE.ReaderAsyncIterableEither<R, E, A>) => RAIE.ReaderAsyncIterableEither<R, E, B>
```

Added in v0.1.0

## chainIOEitherKW

Less strict version of [`chainIOEitherK`](#chainioeitherk).

**Signature**

```ts
export declare const chainIOEitherKW: <E2, A, B>(
  f: (a: A) => IOEither<E2, B>
) => <R, E1>(ma: RAIE.ReaderAsyncIterableEither<R, E1, A>) => RAIE.ReaderAsyncIterableEither<R, E2 | E1, B>
```

Added in v0.1.0

## chainIOK

**Signature**

```ts
export declare const chainIOK: <A, B>(
  f: (a: A) => IO<B>
) => <R, E>(first: RAIE.ReaderAsyncIterableEither<R, E, A>) => RAIE.ReaderAsyncIterableEither<R, E, B>
```

Added in v0.1.0

## chainOptionK

**Signature**

```ts
export declare const chainOptionK: <E>(
  onNone: Lazy<E>
) => <A, B>(
  f: (a: A) => Option<B>
) => <R>(ma: RAIE.ReaderAsyncIterableEither<R, E, A>) => RAIE.ReaderAsyncIterableEither<R, E, B>
```

Added in v0.1.0

## chainReaderAsyncIterableK

**Signature**

```ts
export declare const chainReaderAsyncIterableK: <A, R, B>(
  f: (a: A) => ReaderAsyncIterable<R, B>
) => <E = never>(ma: RAIE.ReaderAsyncIterableEither<R, E, A>) => RAIE.ReaderAsyncIterableEither<R, E, B>
```

Added in v0.1.0

## chainReaderAsyncIterableKW

Less strict version of [`chainReaderAsyncIterableK`](#chainreadertaskk).

**Signature**

```ts
export declare const chainReaderAsyncIterableKW: <A, R2, B>(
  f: (a: A) => ReaderAsyncIterable<R2, B>
) => <R1, E = never>(ma: RAIE.ReaderAsyncIterableEither<R1, E, A>) => RAIE.ReaderAsyncIterableEither<R1 & R2, E, B>
```

Added in v0.1.0

## chainReaderEitherK

**Signature**

```ts
export declare const chainReaderEitherK: <R, E, A, B>(
  f: (a: A) => ReaderEither<R, E, B>
) => (ma: RAIE.ReaderAsyncIterableEither<R, E, A>) => RAIE.ReaderAsyncIterableEither<R, E, B>
```

Added in v0.1.0

## chainReaderEitherKW

Less strict version of [`chainReaderEitherK`](#chainreadereitherk).

**Signature**

```ts
export declare const chainReaderEitherKW: <R2, E2, A, B>(
  f: (a: A) => ReaderEither<R2, E2, B>
) => <R1, E1>(ma: RAIE.ReaderAsyncIterableEither<R1, E1, A>) => RAIE.ReaderAsyncIterableEither<R1 & R2, E2 | E1, B>
```

Added in v0.1.0

## chainReaderK

**Signature**

```ts
export declare const chainReaderK: <A, R, B>(
  f: (a: A) => Reader<R, B>
) => <E = never>(ma: RAIE.ReaderAsyncIterableEither<R, E, A>) => RAIE.ReaderAsyncIterableEither<R, E, B>
```

Added in v0.1.0

## chainReaderKW

Less strict version of [`chainReaderK`](#chainreaderk).

**Signature**

```ts
export declare const chainReaderKW: <A, R1, B>(
  f: (a: A) => Reader<R1, B>
) => <R2, E = never>(ma: RAIE.ReaderAsyncIterableEither<R2, E, A>) => RAIE.ReaderAsyncIterableEither<R1 & R2, E, B>
```

Added in v0.1.0

## chainReaderTaskEitherK

**Signature**

```ts
export declare const chainReaderTaskEitherK: <R, E, A, B>(
  f: (a: A) => ReaderTaskEither<R, E, B>
) => (ma: RAIE.ReaderAsyncIterableEither<R, E, A>) => RAIE.ReaderAsyncIterableEither<R, E, B>
```

Added in v0.1.0

## chainReaderTaskEitherKW

Less strict version of [`chainReaderEitherK`](#chainreadereitherk).

**Signature**

```ts
export declare const chainReaderTaskEitherKW: <R2, E2, A, B>(
  f: (a: A) => ReaderTaskEither<R2, E2, B>
) => <R1, E1>(ma: RAIE.ReaderAsyncIterableEither<R1, E1, A>) => RAIE.ReaderAsyncIterableEither<R1 & R2, E2 | E1, B>
```

Added in v0.1.0

## chainTaskEitherK

**Signature**

```ts
export declare const chainTaskEitherK: <E, A, B>(
  f: (a: A) => TaskEither<E, B>
) => <R>(ma: RAIE.ReaderAsyncIterableEither<R, E, A>) => RAIE.ReaderAsyncIterableEither<R, E, B>
```

Added in v0.1.0

## chainTaskEitherKW

Less strict version of [`chainEitherK`](#chaineitherk).

**Signature**

```ts
export declare const chainTaskEitherKW: <E2, A, B>(
  f: (a: A) => TaskEither<E2, B>
) => <R, E1>(ma: RAIE.ReaderAsyncIterableEither<R, E1, A>) => RAIE.ReaderAsyncIterableEither<R, E2 | E1, B>
```

Added in v0.1.0

## chainWithIndex

Composes computations in sequence, using the return value of one computation to determine the next computation.

**Signature**

```ts
export declare const chainWithIndex: <R, E, A, B>(
  f: (i: number, a: A) => RAIE.ReaderAsyncIterableEither<R, E, B>
) => (ma: RAIE.ReaderAsyncIterableEither<R, E, A>) => RAIE.ReaderAsyncIterableEither<R, E, B>
```

Added in v0.1.0

## filterOrElse

**Signature**

```ts
export declare const filterOrElse: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <R>(
    ma: RAIE.ReaderAsyncIterableEither<R, E, A>
  ) => RAIE.ReaderAsyncIterableEither<R, E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R, B extends A>(
    mb: RAIE.ReaderAsyncIterableEither<R, E, B>
  ) => RAIE.ReaderAsyncIterableEither<R, E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R>(
    ma: RAIE.ReaderAsyncIterableEither<R, E, A>
  ) => RAIE.ReaderAsyncIterableEither<R, E, A>
}
```

Added in v0.1.0

## filterOrElseW

Less strict version of [`filterOrElse`](#filterorelse).

**Signature**

```ts
export declare const filterOrElseW: {
  <A, B extends A, E2>(refinement: Refinement<A, B>, onFalse: (a: A) => E2): <R, E1>(
    ma: RAIE.ReaderAsyncIterableEither<R, E1, A>
  ) => RAIE.ReaderAsyncIterableEither<R, E2 | E1, B>
  <A, E2>(predicate: Predicate<A>, onFalse: (a: A) => E2): <R, E1, B extends A>(
    mb: RAIE.ReaderAsyncIterableEither<R, E1, B>
  ) => RAIE.ReaderAsyncIterableEither<R, E2 | E1, B>
  <A, E2>(predicate: Predicate<A>, onFalse: (a: A) => E2): <R, E1>(
    ma: RAIE.ReaderAsyncIterableEither<R, E1, A>
  ) => RAIE.ReaderAsyncIterableEither<R, E2 | E1, A>
}
```

Added in v0.1.0

## flatten

Derivable from `Chain`.

**Signature**

```ts
export declare const flatten: <R, E, A>(
  mma: RAIE.ReaderAsyncIterableEither<R, E, RAIE.ReaderAsyncIterableEither<R, E, A>>
) => RAIE.ReaderAsyncIterableEither<R, E, A>
```

Added in v0.1.0

## flattenW

Less strict version of [`flatten`](#flatten).

**Signature**

```ts
export declare const flattenW: <R1, E1, R2, E2, A>(
  mma: RAIE.ReaderAsyncIterableEither<R1, E1, RAIE.ReaderAsyncIterableEither<R2, E2, A>>
) => RAIE.ReaderAsyncIterableEither<R1 & R2, E1 | E2, A>
```

Added in v0.1.0

## orElse

Returns `ma` if is a `Right` or the value returned by `onLeft` otherwise.

See also [alt](#alt).

**Signature**

```ts
export declare const orElse: <R, E1, A, E2>(
  onLeft: (e: E1) => RAIE.ReaderAsyncIterableEither<R, E2, A>
) => (ma: RAIE.ReaderAsyncIterableEither<R, E1, A>) => RAIE.ReaderAsyncIterableEither<R, E2, A>
```

Added in v0.1.0

## orElseFirst

**Signature**

```ts
export declare const orElseFirst: <E, R, B>(
  onLeft: (e: E) => RAIE.ReaderAsyncIterableEither<R, E, B>
) => <A>(ma: RAIE.ReaderAsyncIterableEither<R, E, A>) => RAIE.ReaderAsyncIterableEither<R, E, A>
```

Added in v0.1.0

## orElseFirstW

**Signature**

```ts
export declare const orElseFirstW: <E1, R2, E2, B>(
  onLeft: (e: E1) => RAIE.ReaderAsyncIterableEither<R2, E2, B>
) => <R1, A>(ma: RAIE.ReaderAsyncIterableEither<R1, E1, A>) => RAIE.ReaderAsyncIterableEither<R1 & R2, E1 | E2, A>
```

Added in v0.1.0

## orElseW

Less strict version of [`orElse`](#orelse).

**Signature**

```ts
export declare const orElseW: <E1, R1, E2, B>(
  onLeft: (e: E1) => RAIE.ReaderAsyncIterableEither<R1, E2, B>
) => <R2, A>(ma: RAIE.ReaderAsyncIterableEither<R2, E1, A>) => RAIE.ReaderAsyncIterableEither<R1 & R2, E2, B | A>
```

Added in v0.1.0

## orLeft

**Signature**

```ts
export declare const orLeft: <E1, R, E2>(
  onLeft: (e: E1) => ReaderAsyncIterable<R, E2>
) => <A>(fa: RAIE.ReaderAsyncIterableEither<R, E1, A>) => RAIE.ReaderAsyncIterableEither<R, E2, A>
```

Added in v0.1.0

# destructors

## fold

Alias of [`matchE`](#matche).

**Signature**

```ts
export declare const fold: <R, E, A, B>(
  onLeft: (e: E) => ReaderAsyncIterable<R, B>,
  onRight: (a: A) => ReaderAsyncIterable<R, B>
) => (ma: RAIE.ReaderAsyncIterableEither<R, E, A>) => ReaderAsyncIterable<R, B>
```

Added in v0.1.0

## foldW

Alias of [`matchEW`](#matchew).

**Signature**

```ts
export declare const foldW: <E, R2, B, A, R3, C>(
  onLeft: (e: E) => ReaderAsyncIterable<R2, B>,
  onRight: (a: A) => ReaderAsyncIterable<R3, C>
) => <R1>(ma: RAIE.ReaderAsyncIterableEither<R1, E, A>) => ReaderAsyncIterable<R1 & R2 & R3, B | C>
```

Added in v0.1.0

## getOrElse

**Signature**

```ts
export declare const getOrElse: <R, E, A>(
  onLeft: (e: E) => ReaderAsyncIterable<R, A>
) => (ma: RAIE.ReaderAsyncIterableEither<R, E, A>) => ReaderAsyncIterable<R, A>
```

Added in v0.1.0

## getOrElseW

Less strict version of [`getOrElse`](#getorelse).

**Signature**

```ts
export declare const getOrElseW: <R2, E, B>(
  onLeft: (e: E) => ReaderAsyncIterable<R2, B>
) => <R1, A>(ma: RAIE.ReaderAsyncIterableEither<R1, E, A>) => ReaderAsyncIterable<R1 & R2, B | A>
```

Added in v0.1.0

## matchE

**Signature**

```ts
export declare const matchE: <R, E, A, B>(
  onLeft: (e: E) => ReaderAsyncIterable<R, B>,
  onRight: (a: A) => ReaderAsyncIterable<R, B>
) => (ma: RAIE.ReaderAsyncIterableEither<R, E, A>) => ReaderAsyncIterable<R, B>
```

Added in v0.1.0

## matchEW

Less strict version of [`matchE`](#matche).

**Signature**

```ts
export declare const matchEW: <E, R2, B, A, R3, C>(
  onLeft: (e: E) => ReaderAsyncIterable<R2, B>,
  onRight: (a: A) => ReaderAsyncIterable<R3, C>
) => <R1>(ma: RAIE.ReaderAsyncIterableEither<R1, E, A>) => ReaderAsyncIterable<R1 & R2 & R3, B | C>
```

Added in v0.1.0

# instances

## Chain

**Signature**

```ts
export declare const Chain: Chain3<'ReaderAsyncIterableEither'>
```

Added in v0.1.0

## ChainWithIndex

**Signature**

```ts
export declare const ChainWithIndex: ChainWithIndex3<'ReaderAsyncIterableEither', number>
```

Added in v0.1.0

## Monad

**Signature**

```ts
export declare const Monad: Monad3<'ReaderAsyncIterableEither'>
```

Added in v0.1.0

## MonadAsyncIterable

**Signature**

```ts
export declare const MonadAsyncIterable: MonadAsyncIterable3<'ReaderAsyncIterableEither'>
```

Added in v0.1.0

## MonadIO

**Signature**

```ts
export declare const MonadIO: MonadIO3<'ReaderAsyncIterableEither'>
```

Added in v0.1.0

## MonadTask

**Signature**

```ts
export declare const MonadTask: MonadTask3<'ReaderAsyncIterableEither'>
```

Added in v0.1.0

## MonadThrow

**Signature**

```ts
export declare const MonadThrow: MonadThrow3<'ReaderAsyncIterableEither'>
```

Added in v0.1.0

## getSemigroup

Get a `Semigroup` based on the concatenation of `AsyncIterable`s.
See also [`getMonoid`](#getMonoid).

**Signature**

```ts
export declare const getSemigroup: <R = unknown, E = never, A = never>() => Semigroup<
  RAIE.ReaderAsyncIterableEither<R, E, A>
>
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
) => <R>(ma: RAIE.ReaderAsyncIterableEither<R, E, A>) => RAIE.ReaderAsyncIterableEither<R, E, NonNullable<B>>
```

Added in v0.1.0

# utils

## bind

**Signature**

```ts
export declare const bind: <N, A, R, E, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => RAIE.ReaderAsyncIterableEither<R, E, B>
) => (
  ma: RAIE.ReaderAsyncIterableEither<R, E, A>
) => RAIE.ReaderAsyncIterableEither<R, E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v0.1.0

## bindW

**Signature**

```ts
export declare const bindW: <N extends string, A, R2, E2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => RAIE.ReaderAsyncIterableEither<R2, E2, B>
) => <R1, E1>(
  fa: RAIE.ReaderAsyncIterableEither<R1, E1, A>
) => RAIE.ReaderAsyncIterableEither<R1 & R2, E2 | E1, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v0.1.0

## getMonoid

**Signature**

```ts
export declare const getMonoid: <R = unknown, E = never, A = never>() => Monoid<RAIE.ReaderAsyncIterableEither<R, E, A>>
```

Added in v0.1.0
