---
title: ChainWithIndex.ts
nav_order: 14
parent: Modules
---

## ChainWithIndex overview

`ChainWithIndex`

Added in v0.1.0

---

<h2 class="text-delta">Table of contents</h2>

- [type classes](#type-classes)
  - [ChainWithIndex (interface)](#chainwithindex-interface)
  - [ChainWithIndex1 (interface)](#chainwithindex1-interface)
  - [ChainWithIndex2 (interface)](#chainwithindex2-interface)
  - [ChainWithIndex2C (interface)](#chainwithindex2c-interface)
  - [ChainWithIndex3 (interface)](#chainwithindex3-interface)
  - [ChainWithIndex3C (interface)](#chainwithindex3c-interface)
  - [ChainWithIndex4 (interface)](#chainwithindex4-interface)

---

# type classes

## ChainWithIndex (interface)

**Signature**

```ts
export interface ChainWithIndex<F, I> extends Chain<F>, FunctorWithIndex<F, I> {
  readonly chainWithIndex: <A, B>(fa: HKT<F, A>, f: (i: I, a: A) => HKT<F, B>) => HKT<F, B>
}
```

Added in v0.1.0

## ChainWithIndex1 (interface)

**Signature**

```ts
export interface ChainWithIndex1<F extends URIS, I> extends Chain1<F>, FunctorWithIndex1<F, I> {
  readonly chainWithIndex: <A, B>(fa: Kind<F, A>, f: (i: I, a: A) => Kind<F, B>) => Kind<F, B>
}
```

Added in v0.1.0

## ChainWithIndex2 (interface)

**Signature**

```ts
export interface ChainWithIndex2<F extends URIS2, I> extends Chain2<F>, FunctorWithIndex2<F, I> {
  readonly chainWithIndex: <E, A, B>(fa: Kind2<F, E, A>, f: (i: I, a: A) => Kind2<F, E, B>) => Kind2<F, E, B>
}
```

Added in v0.1.0

## ChainWithIndex2C (interface)

**Signature**

```ts
export interface ChainWithIndex2C<F extends URIS2, I, E> extends Chain2C<F, E>, FunctorWithIndex2C<F, I, E> {
  readonly chainWithIndex: <A, B>(fa: Kind2<F, E, A>, f: (i: I, a: A) => Kind2<F, E, B>) => Kind2<F, E, B>
}
```

Added in v0.1.0

## ChainWithIndex3 (interface)

**Signature**

```ts
export interface ChainWithIndex3<F extends URIS3, I> extends Chain3<F>, FunctorWithIndex3<F, I> {
  readonly chainWithIndex: <R, E, A, B>(
    fa: Kind3<F, R, E, A>,
    f: (i: I, a: A) => Kind3<F, R, E, B>
  ) => Kind3<F, R, E, B>
}
```

Added in v0.1.0

## ChainWithIndex3C (interface)

**Signature**

```ts
export interface ChainWithIndex3C<F extends URIS3, I, E> extends Chain3C<F, E>, FunctorWithIndex3C<F, I, E> {
  readonly chainWithIndex: <R, A, B>(fa: Kind3<F, R, E, A>, f: (i: I, a: A) => Kind3<F, R, E, B>) => Kind3<F, R, E, B>
}
```

Added in v0.1.0

## ChainWithIndex4 (interface)

**Signature**

```ts
export interface ChainWithIndex4<F extends URIS4, I> extends Chain4<F>, FunctorWithIndex4<F, I> {
  readonly chainWithIndex: <S, R, E, A, B>(
    fa: Kind4<F, S, R, E, A>,
    f: (i: I, a: A) => Kind4<F, S, R, E, B>
  ) => Kind4<F, S, R, E, B>
}
```

Added in v0.1.0
