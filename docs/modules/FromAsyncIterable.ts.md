---
title: FromAsyncIterable.ts
nav_order: 15
parent: Modules
---

## FromAsyncIterable overview

Lift a computation from the `AsyncIterable` monad

Added in v0.1.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [chainAsyncIterableK](#chainasynciterablek)
  - [chainFirstAsyncIterableK](#chainfirstasynciterablek)
  - [fromAsyncIterableK](#fromasynciterablek)
- [type classes](#type-classes)
  - [FromAsyncIterable (interface)](#fromasynciterable-interface)
  - [FromAsyncIterable1 (interface)](#fromasynciterable1-interface)
  - [FromAsyncIterable2 (interface)](#fromasynciterable2-interface)
  - [FromAsyncIterable2C (interface)](#fromasynciterable2c-interface)
  - [FromAsyncIterable3 (interface)](#fromasynciterable3-interface)
  - [FromAsyncIterable3C (interface)](#fromasynciterable3c-interface)
  - [FromAsyncIterable4 (interface)](#fromasynciterable4-interface)

---

# combinators

## chainAsyncIterableK

**Signature**

```ts
export declare function chainAsyncIterableK<M extends URIS4>(
  F: FromAsyncIterable4<M>,
  M: Chain4<M>
): <A, B>(f: (a: A) => AsyncIterable<B>) => <S, R, E>(first: Kind4<M, S, R, E, A>) => Kind4<M, S, R, E, B>
export declare function chainAsyncIterableK<M extends URIS3>(
  F: FromAsyncIterable3<M>,
  M: Chain3<M>
): <A, B>(f: (a: A) => AsyncIterable<B>) => <R, E>(first: Kind3<M, R, E, A>) => Kind3<M, R, E, B>
export declare function chainAsyncIterableK<M extends URIS3, E>(
  F: FromAsyncIterable3C<M, E>,
  M: Chain3C<M, E>
): <A, B>(f: (a: A) => AsyncIterable<B>) => <R>(first: Kind3<M, R, E, A>) => Kind3<M, R, E, B>
export declare function chainAsyncIterableK<M extends URIS2>(
  F: FromAsyncIterable2<M>,
  M: Chain2<M>
): <A, B>(f: (a: A) => AsyncIterable<B>) => <E>(first: Kind2<M, E, A>) => Kind2<M, E, B>
export declare function chainAsyncIterableK<M extends URIS2, E>(
  F: FromAsyncIterable2C<M, E>,
  M: Chain2C<M, E>
): <A, B>(f: (a: A) => AsyncIterable<B>) => (first: Kind2<M, E, A>) => Kind2<M, E, B>
export declare function chainAsyncIterableK<M extends URIS>(
  F: FromAsyncIterable1<M>,
  M: Chain1<M>
): <A, B>(f: (a: A) => AsyncIterable<B>) => (first: Kind<M, A>) => Kind<M, B>
export declare function chainAsyncIterableK<M>(
  F: FromAsyncIterable<M>,
  M: Chain<M>
): <A, B>(f: (a: A) => AsyncIterable<B>) => (first: HKT<M, A>) => HKT<M, B>
```

Added in v0.1.0

## chainFirstAsyncIterableK

**Signature**

```ts
export declare function chainFirstAsyncIterableK<M extends URIS4>(
  F: FromAsyncIterable4<M>,
  M: Chain4<M>
): <A, B>(f: (a: A) => AsyncIterable<B>) => <S, R, E>(first: Kind4<M, S, R, E, A>) => Kind4<M, S, R, E, A>
export declare function chainFirstAsyncIterableK<M extends URIS3>(
  F: FromAsyncIterable3<M>,
  M: Chain3<M>
): <A, B>(f: (a: A) => AsyncIterable<B>) => <R, E>(first: Kind3<M, R, E, A>) => Kind3<M, R, E, A>
export declare function chainFirstAsyncIterableK<M extends URIS3, E>(
  F: FromAsyncIterable3C<M, E>,
  M: Chain3C<M, E>
): <A, B>(f: (a: A) => AsyncIterable<B>) => <R>(first: Kind3<M, R, E, A>) => Kind3<M, R, E, A>
export declare function chainFirstAsyncIterableK<M extends URIS2>(
  F: FromAsyncIterable2<M>,
  M: Chain2<M>
): <A, B>(f: (a: A) => AsyncIterable<B>) => <E>(first: Kind2<M, E, A>) => Kind2<M, E, A>
export declare function chainFirstAsyncIterableK<M extends URIS2, E>(
  F: FromAsyncIterable2C<M, E>,
  M: Chain2C<M, E>
): <A, B>(f: (a: A) => AsyncIterable<B>) => (first: Kind2<M, E, A>) => Kind2<M, E, A>
export declare function chainFirstAsyncIterableK<M extends URIS>(
  F: FromAsyncIterable1<M>,
  M: Chain1<M>
): <A, B>(f: (a: A) => AsyncIterable<B>) => (first: Kind<M, A>) => Kind<M, A>
export declare function chainFirstAsyncIterableK<M>(
  F: FromAsyncIterable<M>,
  M: Chain<M>
): <A, B>(f: (a: A) => AsyncIterable<B>) => (first: HKT<M, A>) => HKT<M, A>
```

Added in v0.1.0

## fromAsyncIterableK

**Signature**

```ts
export declare function fromAsyncIterableK<F extends URIS4>(
  F: FromAsyncIterable4<F>
): <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => AsyncIterable<B>) => <S, R, E>(...a: A) => Kind4<F, S, R, E, B>
export declare function fromAsyncIterableK<F extends URIS3>(
  F: FromAsyncIterable3<F>
): <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => AsyncIterable<B>) => <R, E>(...a: A) => Kind3<F, R, E, B>
export declare function fromAsyncIterableK<F extends URIS3, E>(
  F: FromAsyncIterable3C<F, E>
): <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => AsyncIterable<B>) => <R>(...a: A) => Kind3<F, R, E, B>
export declare function fromAsyncIterableK<F extends URIS2>(
  F: FromAsyncIterable2<F>
): <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => AsyncIterable<B>) => <E>(...a: A) => Kind2<F, E, B>
export declare function fromAsyncIterableK<F extends URIS2, E>(
  F: FromAsyncIterable2C<F, E>
): <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => AsyncIterable<B>) => (...a: A) => Kind2<F, E, B>
export declare function fromAsyncIterableK<F extends URIS>(
  F: FromAsyncIterable1<F>
): <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => AsyncIterable<B>) => (...a: A) => Kind<F, B>
export declare function fromAsyncIterableK<F>(
  F: FromAsyncIterable<F>
): <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => AsyncIterable<B>) => (...a: A) => HKT<F, B>
```

Added in v0.1.0

# type classes

## FromAsyncIterable (interface)

**Signature**

```ts
export interface FromAsyncIterable<F> extends FromTask<F> {
  readonly fromAsyncIterable: <A>(fa: AsyncIterable<A>) => HKT<F, A>
}
```

Added in v0.1.0

## FromAsyncIterable1 (interface)

**Signature**

```ts
export interface FromAsyncIterable1<F extends URIS> extends FromTask1<F> {
  readonly fromAsyncIterable: NaturalTransformation11<URI, F>
}
```

Added in v0.1.0

## FromAsyncIterable2 (interface)

**Signature**

```ts
export interface FromAsyncIterable2<F extends URIS2> extends FromTask2<F> {
  readonly fromAsyncIterable: NaturalTransformation12<URI, F>
}
```

Added in v0.1.0

## FromAsyncIterable2C (interface)

**Signature**

```ts
export interface FromAsyncIterable2C<F extends URIS2, E> extends FromTask2C<F, E> {
  readonly fromAsyncIterable: NaturalTransformation12C<URI, F, E>
}
```

Added in v0.1.0

## FromAsyncIterable3 (interface)

**Signature**

```ts
export interface FromAsyncIterable3<F extends URIS3> extends FromTask3<F> {
  readonly fromAsyncIterable: NaturalTransformation13<URI, F>
}
```

Added in v0.1.0

## FromAsyncIterable3C (interface)

**Signature**

```ts
export interface FromAsyncIterable3C<F extends URIS3, E> extends FromTask3C<F, E> {
  readonly fromAsyncIterable: NaturalTransformation13C<URI, F, E>
}
```

Added in v0.1.0

## FromAsyncIterable4 (interface)

**Signature**

```ts
export interface FromAsyncIterable4<F extends URIS4> extends FromTask4<F> {
  readonly fromAsyncIterable: NaturalTransformation14<URI, F>
}
```

Added in v0.1.0
