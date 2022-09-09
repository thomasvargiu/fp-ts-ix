---
title: AsyncIterableT.ts
nav_order: 13
parent: Modules
---

## AsyncIterableT overview

AsyncIterable transformations

Added in v0.1.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [mapWithIndex](#mapwithindex)

---

# utils

## mapWithIndex

**Signature**

```ts
export declare function mapWithIndex<F extends URIS4>(
  F: Functor4<F>
): <A, B>(
  f: (i: number, a: A) => B
) => <S, FR, FE>(fa: AsyncIterable<Kind4<F, S, FR, FE, A>>) => AsyncIterable<Kind4<F, S, FR, FE, B>>
export declare function mapWithIndex<F extends URIS3>(
  F: Functor3<F>
): <A, B>(
  f: (i: number, a: A) => B
) => <FR, FE>(fa: AsyncIterable<Kind3<F, FR, FE, A>>) => AsyncIterable<Kind3<F, FR, FE, B>>
export declare function mapWithIndex<F extends URIS3, FE>(
  F: Functor3C<F, FE>
): <A, B>(
  f: (i: number, a: A) => B
) => <FR>(fa: AsyncIterable<Kind3<F, FR, FE, A>>) => AsyncIterable<Kind3<F, FR, FE, B>>
export declare function mapWithIndex<F extends URIS2>(
  F: Functor2<F>
): <A, B>(f: (i: number, a: A) => B) => <FE>(fa: AsyncIterable<Kind2<F, FE, A>>) => AsyncIterable<Kind2<F, FE, B>>
export declare function mapWithIndex<F extends URIS2, FE>(
  F: Functor2C<F, FE>
): <A, B>(f: (i: number, a: A) => B) => (fa: AsyncIterable<Kind2<F, FE, A>>) => AsyncIterable<Kind2<F, FE, B>>
export declare function mapWithIndex<F extends URIS>(
  F: Functor1<F>
): <A, B>(f: (i: number, a: A) => B) => (fa: AsyncIterable<Kind<F, A>>) => AsyncIterable<Kind<F, B>>
export declare function mapWithIndex<F>(
  F: Functor<F>
): <A, B>(f: (i: number, a: A) => B) => (fa: AsyncIterable<HKT<F, A>>) => AsyncIterable<HKT<F, B>>
```

Added in v0.1.0
