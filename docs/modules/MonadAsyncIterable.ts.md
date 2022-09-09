---
title: MonadAsyncIterable.ts
nav_order: 17
parent: Modules
---

## MonadAsyncIterable overview

`AsyncIterable` monad

Added in v0.1.0

---

<h2 class="text-delta">Table of contents</h2>

- [type classes](#type-classes)
  - [MonadAsyncIterable (interface)](#monadasynciterable-interface)
  - [MonadAsyncIterable1 (interface)](#monadasynciterable1-interface)
  - [MonadAsyncIterable2 (interface)](#monadasynciterable2-interface)
  - [MonadAsyncIterable2C (interface)](#monadasynciterable2c-interface)
  - [MonadAsyncIterable3 (interface)](#monadasynciterable3-interface)
  - [MonadAsyncIterable3C (interface)](#monadasynciterable3c-interface)
  - [MonadAsyncIterable4 (interface)](#monadasynciterable4-interface)

---

# type classes

## MonadAsyncIterable (interface)

**Signature**

```ts
export interface MonadAsyncIterable<M>
  extends MonadTask<M>,
    FromAsyncIterable<M>,
    FunctorWithIndex<M, number>,
    ChainWithIndex<M, number> {}
```

Added in v0.1.0

## MonadAsyncIterable1 (interface)

**Signature**

```ts
export interface MonadAsyncIterable1<M extends URIS>
  extends MonadTask1<M>,
    FromAsyncIterable1<M>,
    FunctorWithIndex1<M, number>,
    ChainWithIndex1<M, number> {}
```

Added in v0.1.0

## MonadAsyncIterable2 (interface)

**Signature**

```ts
export interface MonadAsyncIterable2<M extends URIS2>
  extends MonadTask2<M>,
    FromAsyncIterable2<M>,
    FunctorWithIndex2<M, number>,
    ChainWithIndex2<M, number> {}
```

Added in v0.1.0

## MonadAsyncIterable2C (interface)

**Signature**

```ts
export interface MonadAsyncIterable2C<M extends URIS2, E>
  extends MonadTask2C<M, E>,
    FromAsyncIterable2C<M, E>,
    FunctorWithIndex2C<M, number, E>,
    ChainWithIndex2C<M, number, E> {}
```

Added in v0.1.0

## MonadAsyncIterable3 (interface)

**Signature**

```ts
export interface MonadAsyncIterable3<M extends URIS3>
  extends MonadTask3<M>,
    FromAsyncIterable3<M>,
    FunctorWithIndex3<M, number>,
    ChainWithIndex3<M, number> {}
```

Added in v0.1.0

## MonadAsyncIterable3C (interface)

**Signature**

```ts
export interface MonadAsyncIterable3C<M extends URIS3, E>
  extends MonadTask3C<M, E>,
    FromAsyncIterable3C<M, E>,
    FunctorWithIndex3C<M, number, E>,
    ChainWithIndex3C<M, number, E> {}
```

Added in v0.1.0

## MonadAsyncIterable4 (interface)

**Signature**

```ts
export interface MonadAsyncIterable4<M extends URIS4>
  extends MonadTask4<M>,
    FromAsyncIterable4<M>,
    FunctorWithIndex4<M, number>,
    ChainWithIndex4<M, number> {}
```

Added in v0.1.0
