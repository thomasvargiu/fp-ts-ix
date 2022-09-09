/**
 * ```ts
 * interface ReaderAsyncIterableEither<R, E, A> extends ReaderAsyncIterable<R, Either<E, A>> {}
 * ```
 *
 * @since 0.1.0
 */
import type { Applicative3 } from 'fp-ts/Applicative'
import { apFirst as apFirst_, Apply3, apS as apS_, apSecond as apSecond_ } from 'fp-ts/Apply'
import type { Bifunctor3 } from 'fp-ts/Bifunctor'
import { bind as bind_, Chain1, Chain3, chainFirst as chainFirst_ } from 'fp-ts/Chain'
import { compact as compact_, Compactable3C, separate as separate_ } from 'fp-ts/Compactable'
import * as E from 'fp-ts/Either'
import * as ET from 'fp-ts/EitherT'
import {
  filter as filter_,
  Filterable3C,
  filterMap as filterMap_,
  partition as partition_,
  partitionMap as partitionMap_
} from 'fp-ts/Filterable'
import {
  chainEitherK as chainEitherK_,
  chainOptionK as chainOptionK_,
  filterOrElse as filterOrElse_,
  FromEither3,
  fromEitherK as fromEitherK_,
  fromOption as fromOption_,
  fromOptionK as fromOptionK_,
  fromPredicate as fromPredicate_,
  chainFirstEitherK as chainFirstEitherK_
} from 'fp-ts/FromEither'
import { chainFirstIOK as chainFirstIOK_, chainIOK as chainIOK_, FromIO3, fromIOK as fromIOK_ } from 'fp-ts/FromIO'
import {
  ask as ask_,
  asks as asks_,
  chainFirstReaderK as chainFirstReaderK_,
  chainReaderK as chainReaderK_,
  FromReader3,
  fromReaderK as fromReaderK_
} from 'fp-ts/FromReader'
import type { FromTask3 } from 'fp-ts/FromTask'
import { bindTo as bindTo_, flap as flap_, Functor3 } from 'fp-ts/Functor'
import type { FunctorWithIndex3 } from 'fp-ts/FunctorWithIndex'
import type { IO } from 'fp-ts/IO'
import type { IOEither, URI as IEURI } from 'fp-ts/IOEither'
import type { Monad3 } from 'fp-ts/Monad'
import type { MonadIO3 } from 'fp-ts/MonadIO'
import type { MonadTask3 } from 'fp-ts/MonadTask'
import type { MonadThrow3 } from 'fp-ts/MonadThrow'
import type { Monoid } from 'fp-ts/Monoid'
import type {
  NaturalTransformation13C,
  NaturalTransformation23,
  NaturalTransformation33
} from 'fp-ts/NaturalTransformation'
import type { URI as OURI } from 'fp-ts/Option'
import type { Pointed3 } from 'fp-ts/Pointed'
import type { Predicate } from 'fp-ts/Predicate'
import * as R from 'fp-ts/Reader'
import type { ReaderEither, URI as REURI } from 'fp-ts/ReaderEither'
import type { ReaderTaskEither, URI as RTEURI } from 'fp-ts/ReaderTaskEither'
import type { Refinement } from 'fp-ts/Refinement'
import type { Task } from 'fp-ts/Task'
import type { URI as TEURI, TaskEither } from 'fp-ts/TaskEither'
import { flow, identity, Lazy, pipe } from 'fp-ts/function'
import type { ChainWithIndex1, ChainWithIndex3 } from './ChainWithIndex'
import type { MonadAsyncIterable3 } from './MonadAsyncIterable'
import * as AI from './AsyncIterable'
import * as AIE from './AsyncIterableEither'
import type * as AIO from './AsyncIterableOption'
import {
  chainFirstAsyncIterableK as chainFirstAsyncIterableK_,
  chainAsyncIterableK as chainAsyncIterableK_,
  FromAsyncIterable3,
  fromAsyncIterableK as fromAsyncIterableK_
} from './FromAsyncIterable'
import * as RAI from './ReaderAsyncIterable'

import Either = E.Either
import AsyncIterableEither = AIE.AsyncIterableEither
import Reader = R.Reader
import ReaderAsyncIterable = RAI.ReaderAsyncIterable

type AIChain = Chain1<AI.URI>
type AIChainWithIndex = ChainWithIndex1<AI.URI, number>

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 0.1.0
 */
export interface ReaderAsyncIterableEither<R, E, A> {
  (r: R): AsyncIterableEither<E, A>
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category natural transformations
 * @since 0.1.0
 */
export const fromAsyncIterableEither: NaturalTransformation23<AIE.URI, URI> =
  /*#__PURE__*/
  R.of

/**
 * @category constructors
 * @since 0.1.0
 */
export const left: <R, E = never, A = never>(e: E) => ReaderAsyncIterableEither<R, E, A> =
  /*#__PURE__*/
  ET.left(RAI.Pointed)

/**
 * @category constructors
 * @since 0.1.0
 */
export const right: <R, E = never, A = never>(a: A) => ReaderAsyncIterableEither<R, E, A> =
  /*#__PURE__*/
  ET.right(RAI.Pointed)

/**
 * @category constructors
 * @since 0.1.0
 */
export const rightAsyncIterable: <R, E = never, A = never>(ma: AsyncIterable<A>) => ReaderAsyncIterableEither<R, E, A> =
  /*#__PURE__*/
  flow(AIE.rightAsyncIterable, fromAsyncIterableEither)

/**
 * @category constructors
 * @since 0.1.0
 */
export const leftAsyncIterable: <R, E = never, A = never>(me: AsyncIterable<E>) => ReaderAsyncIterableEither<R, E, A> =
  /*#__PURE__*/
  flow(AIE.leftAsyncIterable, fromAsyncIterableEither)

/**
 * @category constructors
 * @since 0.1.0
 */
export const rightTask: <R, E = never, A = never>(ma: Task<A>) => ReaderAsyncIterableEither<R, E, A> =
  /*#__PURE__*/
  flow(AIE.rightTask, fromAsyncIterableEither)

/**
 * @category constructors
 * @since 0.1.0
 */
export const leftTask: <R, E = never, A = never>(me: Task<E>) => ReaderAsyncIterableEither<R, E, A> =
  /*#__PURE__*/
  flow(AIE.leftTask, fromAsyncIterableEither)

/**
 * @category constructors
 * @since 0.1.0
 */
export const rightReader: <R, E = never, A = never>(ma: Reader<R, A>) => ReaderAsyncIterableEither<R, E, A> = (ma) =>
  flow(ma, AIE.right)

/**
 * @category constructors
 * @since 0.1.0
 */
export const leftReader: <R, E = never, A = never>(me: Reader<R, E>) => ReaderAsyncIterableEither<R, E, A> = (me) =>
  flow(me, AIE.left)

/**
 * @category constructors
 * @since 0.1.0
 */
export const rightReaderAsyncIterable: <R, E = never, A = never>(
  ma: ReaderAsyncIterable<R, A>
) => ReaderAsyncIterableEither<R, E, A> =
  /*#__PURE__*/
  ET.rightF(RAI.Functor)

/**
 * @category constructors
 * @since 0.1.0
 */
export const leftReaderAsyncIterable: <R, E = never, A = never>(
  me: ReaderAsyncIterable<R, E>
) => ReaderAsyncIterableEither<R, E, A> =
  /*#__PURE__*/
  ET.leftF(RAI.Functor)

/**
 * @category constructors
 * @since 0.1.0
 */
export const rightIO: <R, E = never, A = never>(ma: IO<A>) => ReaderAsyncIterableEither<R, E, A> =
  /*#__PURE__*/
  flow(AIE.rightIO, fromAsyncIterableEither)

/**
 * @category constructors
 * @since 0.1.0
 */
export const leftIO: <R, E = never, A = never>(me: IO<E>) => ReaderAsyncIterableEither<R, E, A> =
  /*#__PURE__*/
  flow(AIE.leftIO, fromAsyncIterableEither)

// -------------------------------------------------------------------------------------
// natural transformations
// -------------------------------------------------------------------------------------

/**
 * @category natural transformations
 * @since 0.1.0
 */
export const fromEither: FromEither3<URI>['fromEither'] = RAI.of

/**
 * @category natural transformations
 * @since 0.1.0
 */
export const fromReader: FromReader3<URI>['fromReader'] = rightReader

/**
 * @category natural transformations
 * @since 0.1.0
 */
export const fromIO: FromIO3<URI>['fromIO'] = rightIO

/**
 * @category natural transformations
 * @since 0.1.0
 */
export const fromTask: FromTask3<URI>['fromTask'] = rightTask

/**
 * @category natural transformations
 * @since 0.1.0
 */
export const fromAsyncIterable: FromAsyncIterable3<URI>['fromAsyncIterable'] = rightAsyncIterable

/**
 * @category natural transformations
 * @since 0.1.0
 */
export const fromAsyncIterableOption: <E>(onNone: Lazy<E>) => NaturalTransformation13C<AIO.URI, URI, E> = (onNone) =>
  flow(AI.map(E.fromOption(onNone)), fromAsyncIterableEither)

/**
 * @category natural transformations
 * @since 0.1.0
 */
export const fromIOEither: NaturalTransformation23<IEURI, URI> =
  /*#__PURE__*/
  flow(AIE.fromIOEither, fromAsyncIterableEither)

/**
 * @category natural transformations
 * @since 0.1.0
 */
export const fromTaskEither: NaturalTransformation23<TEURI, URI> =
  /*#__PURE__*/
  flow(AIE.fromTaskEither, fromAsyncIterableEither)

/**
 * @category constructors
 * @since 0.1.0
 */
export const fromReaderEither: NaturalTransformation33<REURI, URI> = (ma) => flow(ma, AIE.fromEither)

/**
 * @category constructors
 * @since 0.1.0
 */
export const fromReaderTaskEither: NaturalTransformation33<RTEURI, URI> = (ma) => flow(ma, AIE.fromTaskEither)

// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------

/**
 * @category destructors
 * @since 0.1.0
 */
export const match: <E, B, A>(
  onLeft: (e: E) => B,
  onRight: (a: A) => B
) => <R>(ma: ReaderAsyncIterableEither<R, E, A>) => ReaderAsyncIterable<R, B> =
  /*#__PURE__*/
  ET.match(RAI.Functor)

/**
 * Less strict version of [`match`](#match).
 *
 * @category destructors
 * @since 0.1.0
 */
export const matchW: <E, B, A, C>(
  onLeft: (e: E) => B,
  onRight: (a: A) => C
) => <R>(ma: ReaderAsyncIterableEither<R, E, A>) => ReaderAsyncIterable<R, B | C> = match as any

/**
 * @category destructors
 * @since 0.1.0
 */
export const matchE: (
  C: AIChain
) => <R, E, A, B>(
  onLeft: (e: E) => ReaderAsyncIterable<R, B>,
  onRight: (a: A) => ReaderAsyncIterable<R, B>
) => (ma: ReaderAsyncIterableEither<R, E, A>) => ReaderAsyncIterable<R, B> = (C) => {
  const _RAIC = RAI.getChain(C)
  return ET.matchE(_RAIC)
}

/**
 * Alias of [`matchE`](#matche).
 *
 * @category destructors
 * @since 0.1.0
 */
export const fold = matchE

/**
 * Less strict version of [`matchE`](#matche).
 *
 * @category destructors
 * @since 0.1.0
 */
export const matchEW: (
  C: AIChain
) => <E, R2, B, A, R3, C>(
  onLeft: (e: E) => ReaderAsyncIterable<R2, B>,
  onRight: (a: A) => ReaderAsyncIterable<R3, C>
) => <R1>(ma: ReaderAsyncIterableEither<R1, E, A>) => ReaderAsyncIterable<R1 & R2 & R3, B | C> = matchE as any

/**
 * Alias of [`matchEW`](#matchew).
 *
 * @category destructors
 * @since 0.1.0
 */
export const foldW = matchEW

/**
 * @category destructors
 * @since 0.1.0
 */
export const getOrElse: (
  C: AIChain
) => <R, E, A>(
  onLeft: (e: E) => ReaderAsyncIterable<R, A>
) => (ma: ReaderAsyncIterableEither<R, E, A>) => ReaderAsyncIterable<R, A> = (C) => {
  const _RAIM = RAI.getMonad(C)
  return ET.getOrElse(_RAIM)
}

/**
 * Less strict version of [`getOrElse`](#getorelse).
 *
 * @category destructors
 * @since 0.1.0
 */
export const getOrElseW: (
  C: AIChain
) => <R2, E, B>(
  onLeft: (e: E) => ReaderAsyncIterable<R2, B>
) => <R1, A>(ma: ReaderAsyncIterableEither<R1, E, A>) => ReaderAsyncIterable<R1 & R2, A | B> = getOrElse as any

// -------------------------------------------------------------------------------------
// interop
// -------------------------------------------------------------------------------------

/**
 * @category interop
 * @since 0.1.0
 */
export const toUnion: <R, E, A>(fa: ReaderAsyncIterableEither<R, E, A>) => ReaderAsyncIterable<R, E | A> =
  /*#__PURE__*/
  ET.toUnion(RAI.Functor)

/**
 * @category interop
 * @since 0.1.0
 */
export const fromNullable: <E>(e: E) => <R, A>(a: A) => ReaderAsyncIterableEither<R, E, NonNullable<A>> =
  /*#__PURE__*/
  ET.fromNullable(RAI.Pointed)

/**
 * @category interop
 * @since 0.1.0
 */
export const fromNullableK: <E>(
  e: E
) => <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => B | null | undefined
) => <R>(...a: A) => ReaderAsyncIterableEither<R, E, NonNullable<B>> =
  /*#__PURE__*/
  ET.fromNullableK(RAI.Pointed)

/**
 * @category interop
 * @since 0.1.0
 */
export const chainNullableK: (
  C: AIChain
) => <E>(
  e: E
) => <A, B>(
  f: (a: A) => B | null | undefined
) => <R>(ma: ReaderAsyncIterableEither<R, E, A>) => ReaderAsyncIterableEither<R, E, NonNullable<B>> = (C) => {
  const _RAIM = RAI.getMonad(C)
  return ET.chainNullableK(_RAIM)
}

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * Changes the value of the local context during the execution of the action `ma` (similar to `Contravariant`'s
 * `contramap`).
 *
 * @category combinators
 * @since 0.1.0
 */
export const local: <R2, R1>(
  f: (r2: R2) => R1
) => <E, A>(ma: ReaderAsyncIterableEither<R1, E, A>) => ReaderAsyncIterableEither<R2, E, A> = R.local

/**
 * Less strict version of [`asksReaderAsyncIterableEither`](#asksreadertaskeither).
 *
 * @category combinators
 * @since 0.1.0
 */
export const asksReaderAsyncIterableEitherW: <R1, R2, E, A>(
  f: (r1: R1) => ReaderAsyncIterableEither<R2, E, A>
) => ReaderAsyncIterableEither<R1 & R2, E, A> = R.asksReaderW

/**
 * Effectfully accesses the environment.
 *
 * @category combinators
 * @since 0.1.0
 */
export const asksReaderAsyncIterableEither: <R, E, A>(
  f: (r: R) => ReaderAsyncIterableEither<R, E, A>
) => ReaderAsyncIterableEither<R, E, A> = asksReaderAsyncIterableEitherW

/**
 * @category combinators
 * @since 0.1.0
 */
export const orElse: (
  C: AIChain
) => <R, E1, A, E2>(
  onLeft: (e: E1) => ReaderAsyncIterableEither<R, E2, A>
) => (ma: ReaderAsyncIterableEither<R, E1, A>) => ReaderAsyncIterableEither<R, E2, A> = (C) => {
  const _RAIM = RAI.getMonad(C)
  return ET.orElse(_RAIM)
}

/**
 * Less strict version of [`orElse`](#orelse).
 *
 * @category combinators
 * @since 0.1.0
 */
export const orElseW: (
  C: AIChain
) => <E1, R1, E2, B>(
  onLeft: (e: E1) => ReaderAsyncIterableEither<R1, E2, B>
) => <R2, A>(ma: ReaderAsyncIterableEither<R2, E1, A>) => ReaderAsyncIterableEither<R1 & R2, E2, A | B> = orElse as any

/**
 * @category combinators
 * @since 0.1.0
 */
export const orElseFirst: (
  C: AIChain
) => <E, R, B>(
  onLeft: (e: E) => ReaderAsyncIterableEither<R, E, B>
) => <A>(ma: ReaderAsyncIterableEither<R, E, A>) => ReaderAsyncIterableEither<R, E, A> = (C) => {
  const _RAIM = RAI.getMonad(C)
  return ET.orElseFirst(_RAIM)
}

/**
 * @category combinators
 * @since 0.1.0
 */
export const orElseFirstW: (
  C: AIChain
) => <E1, R2, E2, B>(
  onLeft: (e: E1) => ReaderAsyncIterableEither<R2, E2, B>
) => <R1, A>(ma: ReaderAsyncIterableEither<R1, E1, A>) => ReaderAsyncIterableEither<R1 & R2, E1 | E2, A> =
  orElseFirst as any

/**
 * @category combinators
 * @since 0.1.0
 */
export const orLeft: (
  C: AIChain
) => <E1, R, E2>(
  onLeft: (e: E1) => ReaderAsyncIterable<R, E2>
) => <A>(fa: ReaderAsyncIterableEither<R, E1, A>) => ReaderAsyncIterableEither<R, E2, A> = (C) => {
  const _RAIM = RAI.getMonad(C)
  return ET.orLeft(_RAIM)
}

/**
 * @category combinators
 * @since 0.1.0
 */
export const swap: <R, E, A>(ma: ReaderAsyncIterableEither<R, E, A>) => ReaderAsyncIterableEither<R, A, E> =
  /*#__PURE__*/
  ET.swap(RAI.Functor)

/**
 * @category combinators
 * @since 0.1.0
 */
export const fromIOEitherK = <E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => IOEither<E, B>
): (<R>(...a: A) => ReaderAsyncIterableEither<R, E, B>) => flow(f, fromIOEither)

/**
 * Less strict version of [`chainIOEitherK`](#chainioeitherk).
 *
 * @category combinators
 * @since 0.1.0
 */
export const chainIOEitherKW: (
  C: AIChain
) => <E2, A, B>(
  f: (a: A) => IOEither<E2, B>
) => <R, E1>(ma: ReaderAsyncIterableEither<R, E1, A>) => ReaderAsyncIterableEither<R, E1 | E2, B> = (C) => {
  const _chainW = chainW(C)
  return (f) => _chainW(fromIOEitherK(f))
}

/**
 * @category combinators
 * @since 0.1.0
 */
export const chainIOEitherK: (
  C: AIChain
) => <E, A, B>(
  f: (a: A) => IOEither<E, B>
) => <R>(ma: ReaderAsyncIterableEither<R, E, A>) => ReaderAsyncIterableEither<R, E, B> = chainIOEitherKW

/**
 * @category combinators
 * @since 0.1.0
 */
export const fromAsyncIterableEitherK = <E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => AsyncIterableEither<E, B>
): (<R>(...a: A) => ReaderAsyncIterableEither<R, E, B>) => flow(f, fromAsyncIterableEither)

/**
 * Less strict version of [`chainAsyncIterableEitherK`](#chaintaskeitherk).
 *
 * @category combinators
 * @since 0.1.0
 */
export const chainAsyncIterableEitherKW: (
  C: AIChain
) => <E2, A, B>(
  f: (a: A) => AsyncIterableEither<E2, B>
) => <R, E1>(ma: ReaderAsyncIterableEither<R, E1, A>) => ReaderAsyncIterableEither<R, E1 | E2, B> = (C) => {
  const _chainW = chainW(C)
  return (f) => _chainW(fromAsyncIterableEitherK(f))
}

/**
 * @category combinators
 * @since 0.1.0
 */
export const chainAsyncIterableEitherK: (
  C: AIChain
) => <E, A, B>(
  f: (a: A) => AsyncIterableEither<E, B>
) => <R>(ma: ReaderAsyncIterableEither<R, E, A>) => ReaderAsyncIterableEither<R, E, B> = chainAsyncIterableEitherKW

/**
 * Less strict version of [`chainFirstAsyncIterableEitherK`](#chainfirsttaskeitherk).
 *
 * @category combinators
 * @since 0.1.0
 */
export const chainFirstAsyncIterableEitherKW: (
  C: AIChain
) => <E2, A, B>(
  f: (a: A) => AsyncIterableEither<E2, B>
) => <R, E1>(ma: ReaderAsyncIterableEither<R, E1, A>) => ReaderAsyncIterableEither<R, E1 | E2, A> = (C) => {
  const _chainFirstW = chainFirstW(C)
  return (f) => _chainFirstW(fromAsyncIterableEitherK(f))
}

/**
 * @category combinators
 * @since 0.1.0
 */
export const chainFirstAsyncIterableEitherK: (
  C: AIChain
) => <E, A, B>(
  f: (a: A) => AsyncIterableEither<E, B>
) => <R>(ma: ReaderAsyncIterableEither<R, E, A>) => ReaderAsyncIterableEither<R, E, A> = chainFirstAsyncIterableEitherKW

/**
 * @category combinators
 * @since 0.1.0
 */
export const fromReaderEitherK = <R, E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => ReaderEither<R, E, B>
): ((...a: A) => ReaderAsyncIterableEither<R, E, B>) => flow(f, fromReaderEither)

/**
 * Less strict version of [`chainReaderEitherK`](#chainreadereitherk).
 *
 * @category combinators
 * @since 0.1.0
 */
export const chainReaderEitherKW: (
  C: AIChain
) => <R2, E2, A, B>(
  f: (a: A) => ReaderEither<R2, E2, B>
) => <R1, E1>(ma: ReaderAsyncIterableEither<R1, E1, A>) => ReaderAsyncIterableEither<R1 & R2, E1 | E2, B> = (C) => {
  const _chainW = chainW(C)
  return (f) => _chainW(fromReaderEitherK(f))
}

/**
 * @category combinators
 * @since 0.1.0
 */
export const chainReaderEitherK: (
  C: AIChain
) => <R, E, A, B>(
  f: (a: A) => ReaderEither<R, E, B>
) => (ma: ReaderAsyncIterableEither<R, E, A>) => ReaderAsyncIterableEither<R, E, B> = chainReaderEitherKW

/**
 * Less strict version of [`chainFirstReaderEitherK`](#chainfirstreadereitherk).
 *
 * @category combinators
 * @since 0.1.0
 */
export const chainFirstReaderEitherKW: (
  C: AIChain
) => <R2, E2, A, B>(
  f: (a: A) => ReaderEither<R2, E2, B>
) => <R1, E1>(ma: ReaderAsyncIterableEither<R1, E1, A>) => ReaderAsyncIterableEither<R1 & R2, E1 | E2, A> = (C) => {
  const _chainFirstW = chainFirstW(C)
  return (f) => _chainFirstW(fromReaderEitherK(f))
}

/**
 * @category combinators
 * @since 0.1.0
 */
export const chainFirstReaderEitherK: (
  C: AIChain
) => <R, E, A, B>(
  f: (a: A) => ReaderEither<R, E, B>
) => (ma: ReaderAsyncIterableEither<R, E, A>) => ReaderAsyncIterableEither<R, E, A> = chainFirstReaderEitherKW

/**
 * @category combinators
 * @since 0.1.0
 */
export const fromReaderTaskEitherK = <R, E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => ReaderTaskEither<R, E, B>
): ((...a: A) => ReaderAsyncIterableEither<R, E, B>) => flow(f, fromReaderTaskEither)

/**
 * Less strict version of [`chainReaderEitherK`](#chainreadereitherk).
 *
 * @category combinators
 * @since 0.1.0
 */
export const chainReaderTaskEitherKW: (
  C: AIChain
) => <R2, E2, A, B>(
  f: (a: A) => ReaderTaskEither<R2, E2, B>
) => <R1, E1>(ma: ReaderAsyncIterableEither<R1, E1, A>) => ReaderAsyncIterableEither<R1 & R2, E1 | E2, B> = (C) => {
  const _chainW = chainW(C)
  return (f) => _chainW(fromReaderTaskEitherK(f))
}

/**
 * @category combinators
 * @since 0.1.0
 */
export const chainReaderTaskEitherK: (
  C: AIChain
) => <R, E, A, B>(
  f: (a: A) => ReaderTaskEither<R, E, B>
) => (ma: ReaderAsyncIterableEither<R, E, A>) => ReaderAsyncIterableEither<R, E, B> = chainReaderTaskEitherKW

/**
 * Less strict version of [`chainFirstReaderEitherK`](#chainfirstreadereitherk).
 *
 * @category combinators
 * @since 0.1.0
 */
export const chainFirstReaderTaskEitherKW: (
  C: AIChain
) => <R2, E2, A, B>(
  f: (a: A) => ReaderTaskEither<R2, E2, B>
) => <R1, E1>(ma: ReaderAsyncIterableEither<R1, E1, A>) => ReaderAsyncIterableEither<R1 & R2, E1 | E2, A> = (C) => {
  const _chainFirstW = chainFirstW(C)
  return (f) => _chainFirstW(fromReaderTaskEitherK(f))
}

/**
 * @category combinators
 * @since 0.1.0
 */
export const chainFirstReaderTaskEitherK: (
  C: AIChain
) => <R, E, A, B>(
  f: (a: A) => ReaderTaskEither<R, E, B>
) => (ma: ReaderAsyncIterableEither<R, E, A>) => ReaderAsyncIterableEither<R, E, A> = chainFirstReaderTaskEitherKW

// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------

const _map: Functor3<URI>['map'] = (fa, f) => pipe(fa, map(f))
const _mapWithIndex: FunctorWithIndex3<URI, number>['mapWithIndex'] = (fa, f) => pipe(fa, mapWithIndex(f))
const _ap: Apply3<URI>['ap'] = (fab, fa) => pipe(fab, ap(fa))
/* istanbul ignore next */
const _bimap: Bifunctor3<URI>['bimap'] = (fa, f, g) => pipe(fa, bimap(f, g))
/* istanbul ignore next */
const _mapLeft: Bifunctor3<URI>['mapLeft'] = (fa, f) => pipe(fa, mapLeft(f))

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 0.1.0
 */
export const map: <A, B>(
  f: (a: A) => B
) => <R, E>(fa: ReaderAsyncIterableEither<R, E, A>) => ReaderAsyncIterableEither<R, E, B> =
  /*#__PURE__*/
  ET.map(RAI.Functor)

/**
 * Same as [`map`](#map), but the iterating function takes both the index and the value
 * of the element.
 *
 * @category FunctorWithIndex
 * @since 0.1.0
 */
export const mapWithIndex: <A, B>(
  f: (i: number, a: A) => B
) => <R, E>(fa: ReaderAsyncIterableEither<R, E, A>) => ReaderAsyncIterableEither<R, E, B> = (f) =>
  RAI.mapWithIndex((i, ea) =>
    pipe(
      ea,
      E.map((a) => f(i, a))
    )
  )

/**
 * Map a pair of functions over the two last type arguments of the bifunctor.
 *
 * @category Bifunctor
 * @since 0.1.0
 */
export const bimap: <E, G, A, B>(
  f: (e: E) => G,
  g: (a: A) => B
) => <R>(fa: ReaderAsyncIterableEither<R, E, A>) => ReaderAsyncIterableEither<R, G, B> =
  /*#__PURE__*/
  ET.bimap(RAI.Functor)

/**
 * Map a function over the second type argument of a bifunctor.
 *
 * @category Bifunctor
 * @since 0.1.0
 */
export const mapLeft: <E, G>(
  f: (e: E) => G
) => <R, A>(fa: ReaderAsyncIterableEither<R, E, A>) => ReaderAsyncIterableEither<R, G, A> =
  /*#__PURE__*/
  ET.mapLeft(RAI.Functor)

/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 0.1.0
 */
export const ap: <R, E, A>(
  fa: ReaderAsyncIterableEither<R, E, A>
) => <B>(fab: ReaderAsyncIterableEither<R, E, (a: A) => B>) => ReaderAsyncIterableEither<R, E, B> =
  /*#__PURE__*/
  ET.ap(RAI.Apply)

/**
 * Less strict version of [`ap`](#ap).
 *
 * @category Apply
 * @since 0.1.0
 */
export const apW: <R2, E2, A>(
  fa: ReaderAsyncIterableEither<R2, E2, A>
) => <R1, E1, B>(
  fab: ReaderAsyncIterableEither<R1, E1, (a: A) => B>
) => ReaderAsyncIterableEither<R1 & R2, E1 | E2, B> = ap as any

/**
 * @category Pointed
 * @since 0.1.0
 */
export const of: <R, E = never, A = never>(a: A) => ReaderAsyncIterableEither<R, E, A> = right

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 0.1.0
 */
export const chain: (
  C: AIChain
) => <R, E, A, B>(
  f: (a: A) => ReaderAsyncIterableEither<R, E, B>
) => (ma: ReaderAsyncIterableEither<R, E, A>) => ReaderAsyncIterableEither<R, E, B> = (C) => {
  const _RAIM = RAI.getMonad(C)
  return ET.chain(_RAIM)
}

/**
 * Less strict version of [`chain`](#chain).
 *
 * @category Monad
 * @since 0.1.0
 */
export const chainW: (
  C: AIChain
) => <R2, E2, A, B>(
  f: (a: A) => ReaderAsyncIterableEither<R2, E2, B>
) => <R1, E1>(ma: ReaderAsyncIterableEither<R1, E1, A>) => ReaderAsyncIterableEither<R1 & R2, E1 | E2, B> = chain as any

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category combinators
 * @since 0.1.0
 */
export const chainWithIndex: (
  C: AIChainWithIndex
) => <R, E, A, B>(
  f: (i: number, a: A) => ReaderAsyncIterableEither<R, E, B>
) => (ma: ReaderAsyncIterableEither<R, E, A>) => ReaderAsyncIterableEither<R, E, B> = (AIC) => {
  const c = getChainWithIndex(AIC)

  return (f) => (fa) => c.chainWithIndex(fa, f)
}

/**
 * Less strict version of [`flatten`](#flatten).
 *
 * @category combinators
 * @since 0.1.0
 */
export const flattenW: (
  C: AIChain
) => <R1, E1, R2, E2, A>(
  mma: ReaderAsyncIterableEither<R1, E1, ReaderAsyncIterableEither<R2, E2, A>>
) => ReaderAsyncIterableEither<R1 & R2, E1 | E2, A> = (C) => {
  const _chainW = chainW(C)

  return _chainW(identity)
}

/**
 * Derivable from `Chain`.
 *
 * @category combinators
 * @since 0.1.0
 */
export const flatten: (
  C: AIChain
) => <R, E, A>(
  mma: ReaderAsyncIterableEither<R, E, ReaderAsyncIterableEither<R, E, A>>
) => ReaderAsyncIterableEither<R, E, A> = flattenW

/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * @category Alt
 * @since 0.1.0
 */
export const alt: (
  C: AIChain
) => <R, E, A>(
  that: () => ReaderAsyncIterableEither<R, E, A>
) => (fa: ReaderAsyncIterableEither<R, E, A>) => ReaderAsyncIterableEither<R, E, A> = (C) => {
  const _RAIM = RAI.getMonad(C)
  return ET.alt(_RAIM)
}

/**
 * Less strict version of [`alt`](#alt).
 *
 * @category Alt
 * @since 0.1.0
 */
export const altW: (
  C: AIChain
) => <R2, E2, B>(
  that: () => ReaderAsyncIterableEither<R2, E2, B>
) => <R1, E1, A>(fa: ReaderAsyncIterableEither<R1, E1, A>) => ReaderAsyncIterableEither<R1 & R2, E2, A | B> = alt as any

/**
 * @category MonadThrow
 * @since 0.1.0
 */
export const throwError: MonadThrow3<URI>['throwError'] = left

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 0.1.0
 */
export const URI = 'ReaderAsyncIterableEither'

/**
 * @category instances
 * @since 0.1.0
 */
export type URI = typeof URI

declare module 'fp-ts/lib/HKT' {
  interface URItoKind3<R, E, A> {
    readonly [URI]: ReaderAsyncIterableEither<R, E, A>
  }
}

/**
 * @category instances
 * @since 0.1.0
 */
export const getCompactable = <E>(M: Monoid<E>): Compactable3C<URI, E> => {
  const C = E.getCompactable(M)
  return {
    URI,
    _E: undefined as any,
    compact: compact_(RAI.Functor, C),
    separate: separate_(RAI.Functor, C, E.Functor)
  }
}

/**
 * @category instances
 * @since 0.1.0
 */
export function getFilterable<E>(M: Monoid<E>): Filterable3C<URI, E> {
  const F = E.getFilterable(M)
  const C = getCompactable(M)

  const filter = filter_(RAI.Functor, F)
  const filterMap = filterMap_(RAI.Functor, F)
  const partition = partition_(RAI.Functor, F)
  const partitionMap = partitionMap_(RAI.Functor, F)
  return {
    URI,
    _E: undefined as any,
    map: _map,
    compact: C.compact,
    separate: C.separate,
    filter: <R, A>(fa: ReaderAsyncIterableEither<R, E, A>, predicate: Predicate<A>) => pipe(fa, filter(predicate)),
    filterMap: (fa, f) => pipe(fa, filterMap(f)),
    partition: <R, A>(fa: ReaderAsyncIterableEither<R, E, A>, predicate: Predicate<A>) =>
      pipe(fa, partition(predicate)),
    partitionMap: (fa, f) => pipe(fa, partitionMap(f))
  }
}

/**
 * @category instances
 * @since 0.1.0
 */
export const Functor: Functor3<URI> = {
  URI,
  map: _map
}

/**
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 0.1.0
 */
export const flap =
  /*#__PURE__*/
  flap_(Functor)

/**
 * @category instances
 * @since 0.1.0
 */
export const Pointed: Pointed3<URI> = {
  URI,
  of
}

/**
 * @category instances
 * @since 0.1.0
 */
export const Apply: Apply3<URI> = {
  URI,
  map: _map,
  ap: _ap
}

/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 0.1.0
 */
export const apFirst =
  /*#__PURE__*/
  apFirst_(Apply)

/**
 * Less strict version of [`apFirst`](#apfirst).
 *
 * @category combinators
 * @since 0.1.0
 */
export const apFirstW: <R2, E2, B>(
  second: ReaderAsyncIterableEither<R2, E2, B>
) => <R1, E1, A>(first: ReaderAsyncIterableEither<R1, E1, A>) => ReaderAsyncIterableEither<R1 & R2, E1 | E2, A> =
  apFirst as any

/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 0.1.0
 */
export const apSecond =
  /*#__PURE__*/
  apSecond_(Apply)

/**
 * Less strict version of [`apSecond`](#apsecond).
 *
 * @category combinators
 * @since 0.1.0
 */
export const apSecondW: <R2, E2, B>(
  second: ReaderAsyncIterableEither<R2, E2, B>
) => <R1, E1, A>(first: ReaderAsyncIterableEither<R1, E1, A>) => ReaderAsyncIterableEither<R1 & R2, E1 | E2, B> =
  apSecond as any

/**
 * @category instances
 * @since 0.1.0
 */
export const Applicative: Applicative3<URI> = {
  URI,
  map: _map,
  ap: _ap,
  of
}

/**
 * @category instances
 * @since 0.1.0
 */
export const getChain = (C: AIChain): Chain3<URI> => {
  const RAIC_ = RAI.getChain(C)
  return {
    URI,
    map: _map,
    ap: _ap,
    chain: (fa, f) => RAIC_.chain(fa, (e) => (E.isLeft(e) ? RAI.of(e) : f(e.right)))
  }
}

/**
 * @category instances
 * @since 0.1.0
 */
export const getChainWithIndex = (C: AIChainWithIndex): ChainWithIndex3<URI, number> => {
  const _Chain = getChain(C)
  const _RAICWI = RAI.getChainWithIndex(C)
  return {
    URI,
    map: _map,
    mapWithIndex: _mapWithIndex,
    ap: _ap,
    chain: _Chain.chain,
    chainWithIndex: (fa, f) => _RAICWI.chainWithIndex(fa, (i, e) => (E.isLeft(e) ? RAI.of(e) : f(i, e.right)))
  }
}

/**
 * @category instances
 * @since 0.1.0
 */
export const getMonad = (C: AIChain): Monad3<URI> => {
  const _Chain = getChain(C)
  return {
    URI,
    map: _map,
    ap: _ap,
    chain: _Chain.chain,
    of
  }
}

/**
 * @category instances
 * @since 0.1.0
 */
export const getMonadIO = (C: AIChain): MonadIO3<URI> => {
  const _Chain = getChain(C)
  return {
    URI,
    map: _map,
    ap: _ap,
    chain: _Chain.chain,
    of,
    fromIO
  }
}

/**
 * @category instances
 * @since 0.1.0
 */
export const getMonadTask = (C: AIChain): MonadTask3<URI> => {
  const _Chain = getChain(C)
  return {
    URI,
    map: _map,
    ap: _ap,
    chain: _Chain.chain,
    of,
    fromIO,
    fromTask
  }
}

/**
 * @category instances
 * @since 0.1.0
 */
export const getMonadAsyncIterable = (C: AIChainWithIndex): MonadAsyncIterable3<URI> => {
  const _Chain = getChainWithIndex(C)
  return {
    URI,
    map: _map,
    mapWithIndex: _mapWithIndex,
    ap: _ap,
    chain: _Chain.chain,
    chainWithIndex: _Chain.chainWithIndex,
    of,
    fromIO,
    fromTask,
    fromAsyncIterable
  }
}

/**
 * @category instances
 * @since 0.1.0
 */
export const getMonadThrow = (C: AIChainWithIndex): MonadThrow3<URI> => {
  const _Chain = getChain(C)
  return {
    URI,
    map: _map,
    ap: _ap,
    chain: _Chain.chain,
    of,
    throwError
  }
}

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Chain`.
 *
 * @category combinators
 * @since 0.1.0
 */
export const chainFirst: (
  C: AIChain
) => <R, E, A, B>(
  f: (a: A) => ReaderAsyncIterableEither<R, E, B>
) => (ma: ReaderAsyncIterableEither<R, E, A>) => ReaderAsyncIterableEither<R, E, A> = (C) => {
  const C_ = getChain(C)

  return chainFirst_(C_)
}

/**
 * Less strict version of [`chainFirst`](#chainfirst).
 *
 * Derivable from `Chain`.
 *
 * @category combinators
 * @since 0.1.0
 */
export const chainFirstW: (
  C: AIChain
) => <R2, E2, A, B>(
  f: (a: A) => ReaderAsyncIterableEither<R2, E2, B>
) => <R1, E1>(ma: ReaderAsyncIterableEither<R1, E1, A>) => ReaderAsyncIterableEither<R1 & R2, E1 | E2, A> =
  chainFirst as any

/**
 * @category instances
 * @since 0.1.0
 */
export const Bifunctor: Bifunctor3<URI> = {
  URI,
  bimap: _bimap,
  mapLeft: _mapLeft
}

/**
 * @category instances
 * @since 0.1.0
 */
export const FromReader: FromReader3<URI> = {
  URI,
  fromReader
}

/**
 * Reads the current context.
 *
 * @category constructors
 * @since 0.1.0
 */
export const ask: <R, E = never>() => ReaderAsyncIterableEither<R, E, R> =
  /*#__PURE__*/
  ask_(FromReader)

/**
 * Projects a value from the global context in a `ReaderEither`.
 *
 * @category constructors
 * @since 0.1.0
 */
export const asks: <R, A, E = never>(f: (r: R) => A) => ReaderAsyncIterableEither<R, E, A> =
  /*#__PURE__*/
  asks_(FromReader)

/**
 * @category combinators
 * @since 0.1.0
 */
export const fromReaderK: <A extends ReadonlyArray<unknown>, R, B>(
  f: (...a: A) => Reader<R, B>
) => <E = never>(...a: A) => ReaderAsyncIterableEither<R, E, B> =
  /*#__PURE__*/
  fromReaderK_(FromReader)

/**
 * @category combinators
 * @since 0.1.0
 */
export const chainReaderK: (
  C: AIChain
) => <A, R, B>(
  f: (a: A) => Reader<R, B>
) => <E = never>(ma: ReaderAsyncIterableEither<R, E, A>) => ReaderAsyncIterableEither<R, E, B> = (C) => {
  const _C = getChain(C)

  return chainReaderK_(FromReader, _C)
}

/**
 * Less strict version of [`chainReaderK`](#chainreaderk).
 *
 * @category combinators
 * @since 0.1.0
 */
export const chainReaderKW: (
  C: AIChain
) => <A, R1, B>(
  f: (a: A) => R.Reader<R1, B>
) => <R2, E = never>(ma: ReaderAsyncIterableEither<R2, E, A>) => ReaderAsyncIterableEither<R1 & R2, E, B> =
  chainReaderK as any

/**
 * @category combinators
 * @since 0.1.0
 */
export const chainFirstReaderK: (
  C: AIChain
) => <A, R, B>(
  f: (a: A) => R.Reader<R, B>
) => <E = never>(ma: ReaderAsyncIterableEither<R, E, A>) => ReaderAsyncIterableEither<R, E, A> = (C) => {
  const _C = getChain(C)

  return chainFirstReaderK_(FromReader, _C)
}

/**
 * Less strict version of [`chainFirstReaderK`](#chainfirstreaderk).
 *
 * @category combinators
 * @since 0.1.0
 */
export const chainFirstReaderKW: (
  C: AIChain
) => <A, R1, B>(
  f: (a: A) => R.Reader<R1, B>
) => <R2, E = never>(ma: ReaderAsyncIterableEither<R2, E, A>) => ReaderAsyncIterableEither<R1 & R2, E, A> =
  chainFirstReaderK as any

/**
 * @category combinators
 * @since 0.1.0
 */
export const fromReaderAsyncIterableK =
  <A extends ReadonlyArray<unknown>, R, B>(
    f: (...a: A) => ReaderAsyncIterable<R, B>
  ): (<E = never>(...a: A) => ReaderAsyncIterableEither<R, E, B>) =>
  (...a) =>
    rightReaderAsyncIterable(f(...a))

/**
 * Less strict version of [`chainReaderAsyncIterableK`](#chainreadertaskk).
 *
 * @category combinators
 * @since 0.1.0
 */
export const chainReaderAsyncIterableKW: (
  C: AIChain
) => <A, R2, B>(
  f: (a: A) => RAI.ReaderAsyncIterable<R2, B>
) => <R1, E = never>(ma: ReaderAsyncIterableEither<R1, E, A>) => ReaderAsyncIterableEither<R1 & R2, E, B> = (C) => {
  const _chainW = chainW(C)
  return (f) => _chainW(fromReaderAsyncIterableK(f))
}

/**
 * @category combinators
 * @since 0.1.0
 */
export const chainReaderAsyncIterableK: (
  C: AIChain
) => <A, R, B>(
  f: (a: A) => RAI.ReaderAsyncIterable<R, B>
) => <E = never>(ma: ReaderAsyncIterableEither<R, E, A>) => ReaderAsyncIterableEither<R, E, B> =
  chainReaderAsyncIterableKW

/**
 * Less strict version of [`chainFirstReaderAsyncIterableK`](#chainfirstreadertaskk).
 *
 * @category combinators
 * @since 0.1.0
 */
export const chainFirstReaderAsyncIterableKW: (
  C: AIChain
) => <A, R2, B>(
  f: (a: A) => RAI.ReaderAsyncIterable<R2, B>
) => <R1, E = never>(ma: ReaderAsyncIterableEither<R1, E, A>) => ReaderAsyncIterableEither<R1 & R2, E, A> = (C) => {
  const _chainFirstW = chainFirstW(C)
  return (f) => _chainFirstW(fromReaderAsyncIterableK(f))
}

/**
 * @category combinators
 * @since 0.1.0
 */
export const chainFirstReaderAsyncIterableK: (
  C: AIChain
) => <A, R, B>(
  f: (a: A) => RAI.ReaderAsyncIterable<R, B>
) => <E = never>(ma: ReaderAsyncIterableEither<R, E, A>) => ReaderAsyncIterableEither<R, E, A> =
  chainFirstReaderAsyncIterableKW

/**
 * @category instances
 * @since 0.1.0
 */
export const FromEither: FromEither3<URI> = {
  URI,
  fromEither
}

/**
 * @category natural transformations
 * @since 0.1.0
 */
export const fromOption: <E>(onNone: Lazy<E>) => NaturalTransformation13C<OURI, URI, E> =
  /*#__PURE__*/
  fromOption_(FromEither)

/**
 * @category combinators
 * @since 0.1.0
 */
export const fromOptionK =
  /*#__PURE__*/
  fromOptionK_(FromEither)

/**
 * @category combinators
 * @since 0.1.0
 */
export const chainOptionK = (C: AIChain) => {
  const _C = getChain(C)
  return chainOptionK_(FromEither, _C)
}

/**
 * @category combinators
 * @since 0.1.0
 */
export const chainEitherK: (
  C: AIChain
) => <E, A, B>(
  f: (a: A) => E.Either<E, B>
) => <R>(ma: ReaderAsyncIterableEither<R, E, A>) => ReaderAsyncIterableEither<R, E, B> = (C) => {
  const _C = getChain(C)
  return chainEitherK_(FromEither, _C)
}

/**
 * Less strict version of [`chainEitherK`](#chaineitherk).
 *
 * @category combinators
 * @since 0.1.0
 */
export const chainEitherKW: (
  C: AIChain
) => <E2, A, B>(
  f: (a: A) => Either<E2, B>
) => <R, E1>(ma: ReaderAsyncIterableEither<R, E1, A>) => ReaderAsyncIterableEither<R, E1 | E2, B> = chainEitherK as any

/**
 * @category combinators
 * @since 0.1.0
 */
export const chainFirstEitherK = (C: AIChain) => {
  const _C = getChain(C)
  return chainFirstEitherK_(FromEither, _C)
}

/**
 * Less strict version of [`chainFirstEitherK`](#chainfirsteitherk).
 *
 * @category combinators
 * @since 0.1.0
 */
export const chainFirstEitherKW: (
  C: AIChain
) => <A, E2, B>(
  f: (a: A) => Either<E2, B>
) => <R, E1>(ma: ReaderAsyncIterableEither<R, E1, A>) => ReaderAsyncIterableEither<R, E1 | E2, A> =
  chainFirstEitherK as any

/**
 * @category combinators
 * @since 0.1.0
 */
export const fromTaskEitherK = <R, E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => TaskEither<E, B>
): ((...a: A) => ReaderAsyncIterableEither<R, E, B>) => flow(f, fromTaskEither)

/**
 * Less strict version of [`chainEitherK`](#chaineitherk).
 *
 * @category combinators
 * @since 0.1.0
 */
export const chainTaskEitherKW: (
  C: AIChain
) => <E2, A, B>(
  f: (a: A) => TaskEither<E2, B>
) => <R, E1>(ma: ReaderAsyncIterableEither<R, E1, A>) => ReaderAsyncIterableEither<R, E1 | E2, B> = (C) => {
  const _chainW = chainW(C)
  return (f) => _chainW(fromTaskEitherK(f))
}

/**
 * @category combinators
 * @since 0.1.0
 */
export const chainTaskEitherK: (
  C: AIChain
) => <E, A, B>(
  f: (a: A) => TaskEither<E, B>
) => <R>(ma: ReaderAsyncIterableEither<R, E, A>) => ReaderAsyncIterableEither<R, E, B> = chainTaskEitherKW

/**
 * Less strict version of [`chainFirstEitherK`](#chainfirsteitherk).
 *
 * @category combinators
 * @since 0.1.0
 */
export const chainFirstTaskEitherKW: (
  C: AIChain
) => <A, E2, B>(
  f: (a: A) => TaskEither<E2, B>
) => <R, E1>(ma: ReaderAsyncIterableEither<R, E1, A>) => ReaderAsyncIterableEither<R, E1 | E2, A> = (C) => {
  const _chainFirstW = chainFirstW(C)
  return (f) => _chainFirstW(fromTaskEitherK(f))
}

/**
 * @category combinators
 * @since 0.1.0
 */
export const chainFirstTaskEitherK: (
  C: AIChain
) => <A, E, B>(
  f: (a: A) => TaskEither<E, B>
) => <R>(ma: ReaderAsyncIterableEither<R, E, A>) => ReaderAsyncIterableEither<R, E, A> = chainFirstTaskEitherKW

/**
 * @category constructors
 * @since 0.1.0
 */
export const fromPredicate: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <R>(
    a: A
  ) => ReaderAsyncIterableEither<R, E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R, B extends A>(b: B) => ReaderAsyncIterableEither<R, E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R>(a: A) => ReaderAsyncIterableEither<R, E, A>
} =
  /*#__PURE__*/
  fromPredicate_(FromEither)

/**
 * @category combinators
 * @since 0.1.0
 */
export const filterOrElse: (C: AIChain) => {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <R>(
    ma: ReaderAsyncIterableEither<R, E, A>
  ) => ReaderAsyncIterableEither<R, E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R, B extends A>(
    mb: ReaderAsyncIterableEither<R, E, B>
  ) => ReaderAsyncIterableEither<R, E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R>(
    ma: ReaderAsyncIterableEither<R, E, A>
  ) => ReaderAsyncIterableEither<R, E, A>
} = (C) => {
  const _C = getChain(C)
  return filterOrElse_(FromEither, _C)
}

/**
 * Less strict version of [`filterOrElse`](#filterorelse).
 *
 * @category combinators
 * @since 0.1.0
 */
export const filterOrElseW: (C: AIChain) => {
  <A, B extends A, E2>(refinement: Refinement<A, B>, onFalse: (a: A) => E2): <R, E1>(
    ma: ReaderAsyncIterableEither<R, E1, A>
  ) => ReaderAsyncIterableEither<R, E1 | E2, B>
  <A, E2>(predicate: Predicate<A>, onFalse: (a: A) => E2): <R, E1, B extends A>(
    mb: ReaderAsyncIterableEither<R, E1, B>
  ) => ReaderAsyncIterableEither<R, E1 | E2, B>
  <A, E2>(predicate: Predicate<A>, onFalse: (a: A) => E2): <R, E1>(
    ma: ReaderAsyncIterableEither<R, E1, A>
  ) => ReaderAsyncIterableEither<R, E1 | E2, A>
} = filterOrElse

/**
 * @category combinators
 * @since 0.1.0
 */
export const fromEitherK: <E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => E.Either<E, B>
) => <R>(...a: A) => ReaderAsyncIterableEither<R, E, B> =
  /*#__PURE__*/
  fromEitherK_(FromEither)

/**
 * @category instances
 * @since 0.1.0
 */
export const FromIO: FromIO3<URI> = {
  URI,
  fromIO
}

/**
 * @category combinators
 * @since 0.1.0
 */
export const fromIOK =
  /*#__PURE__*/
  fromIOK_(FromIO)

/**
 * @category combinators
 * @since 0.1.0
 */
export const chainIOK = (C: AIChain) => chainIOK_(FromIO, getChain(C))

/**
 * @category combinators
 * @since 0.1.0
 */
export const chainFirstIOK = (C: AIChain) => chainFirstIOK_(FromIO, getChain(C))

/**
 * @category instances
 * @since 0.1.0
 */
export const FromAsyncIterable: FromAsyncIterable3<URI> = {
  URI,
  fromIO,
  fromTask,
  fromAsyncIterable
}

/**
 * @category combinators
 * @since 0.1.0
 */
export const fromAsyncIterableK =
  /*#__PURE__*/
  fromAsyncIterableK_(FromAsyncIterable)

/**
 * @category combinators
 * @since 0.1.0
 */
export const chainAsyncIterableK = (C: AIChain) =>
  /*#__PURE__*/
  chainAsyncIterableK_(FromAsyncIterable, getChain(C))

/**
 * @category combinators
 * @since 0.1.0
 */
export const chainFirstAsyncIterableK = (C: AIChain) =>
  /*#__PURE__*/
  chainFirstAsyncIterableK_(FromAsyncIterable, getChain(C))

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @since 0.1.0
 */
export const Do: ReaderAsyncIterableEither<unknown, never, {}> =
  /*#__PURE__*/
  of({})

/**
 * @since 0.1.0
 */
export const bindTo =
  /*#__PURE__*/
  bindTo_(Functor)

/**
 * @since 0.1.0
 */
export const bind = (C: AIChain) => bind_(getChain(C))

/**
 * @since 0.1.0
 */
export const bindW: (
  C: AIChain
) => <N extends string, A, R2, E2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => ReaderAsyncIterableEither<R2, E2, B>
) => <R1, E1>(
  fa: ReaderAsyncIterableEither<R1, E1, A>
) => ReaderAsyncIterableEither<R1 & R2, E1 | E2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> =
  bind as any

// -------------------------------------------------------------------------------------
// pipeable sequence S
// -------------------------------------------------------------------------------------

/**
 * @since 0.1.0
 */
export const apS =
  /*#__PURE__*/
  apS_(Apply)

/**
 * @since 0.1.0
 */
export const apSW: <A, N extends string, R2, E2, B>(
  name: Exclude<N, keyof A>,
  fb: ReaderAsyncIterableEither<R2, E2, B>
) => <R1, E1>(
  fa: ReaderAsyncIterableEither<R1, E1, A>
) => ReaderAsyncIterableEither<R1 & R2, E1 | E2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> =
  apS as any

// -------------------------------------------------------------------------------------
// sequence T
// -------------------------------------------------------------------------------------

/**
 * @since 0.1.0
 */
export const ApT: ReaderAsyncIterableEither<unknown, never, readonly []> =
  /*#__PURE__*/
  of([])
