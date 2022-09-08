/* eslint-disable @typescript-eslint/ban-types */
import type { Applicative2 } from 'fp-ts/Applicative'
import { apFirst as apFirst_, Apply2, apS as apS_, apSecond as apSecond_ } from 'fp-ts/Apply'
import { bind as bind_, Chain1, Chain2, chainFirst as chainFirst_ } from 'fp-ts/Chain'
import { chainFirstIOK as chainFirstIOK_, chainIOK as chainIOK_, FromIO2, fromIOK as fromIOK_ } from 'fp-ts/FromIO'
import {
    ask as ask_,
    asks as asks_,
    chainFirstReaderK as chainFirstReaderK_,
    chainReaderK as chainReaderK_,
    FromReader2,
    fromReaderK as fromReaderK_,
} from 'fp-ts/FromReader'
import {
    chainFirstTaskK as chainFirstTaskK_,
    chainTaskK as chainTaskK_,
    FromTask2,
    fromTaskK as fromTaskK_,
} from 'fp-ts/FromTask'
import { bindTo as bindTo_, flap as flap_, Functor2 } from 'fp-ts/Functor'
import type { FunctorWithIndex2 } from 'fp-ts/FunctorWithIndex'
import type { Monad2 } from 'fp-ts/Monad'
import type { MonadIO2 } from 'fp-ts/MonadIO'
import type { MonadTask2 } from 'fp-ts/MonadTask'
import type { Pointed2 } from 'fp-ts/Pointed'
import * as R from 'fp-ts/Reader'
import * as RT from 'fp-ts/ReaderT'
import { flow, identity, pipe } from 'fp-ts/function'
import type { ChainWithIndex1, ChainWithIndex2 } from './ChainWithIndex'
import type { MonadAsyncIterable2 } from './MonadAsyncIterable'
import * as AI from './AsyncIterable'
import {
    chainFirstAsyncIterableK as chainFirstAsyncIterableK_,
    chainAsyncIterableK as chainAsyncIterableK_,
    FromAsyncIterable2,
    fromAsyncIterableK as fromAsyncIterableK_,
} from './FromAsyncIterable'

type AIChain = Chain1<AI.URI>
type AIChainWithIndex = ChainWithIndex1<AI.URI, number>

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 */
export interface ReaderAsyncIterable<R, A> {
    (r: R): AsyncIterable<A>
}

// -------------------------------------------------------------------------------------
// natural transformations
// -------------------------------------------------------------------------------------

/**
 * @category natural transformations
 */
export const fromReader: FromReader2<URI>['fromReader'] =
    /*#__PURE__*/
    RT.fromReader(AI.Pointed)

/**
 * @category natural transformations
 */
export const fromAsyncIterable: FromAsyncIterable2<URI>['fromAsyncIterable'] =
    /*#__PURE__*/
    R.of

/**
 * @category natural transformations
 */
export const fromIO: FromIO2<URI>['fromIO'] =
    /*#__PURE__*/
    flow(AI.fromIO, fromAsyncIterable)

/**
 * @category natural transformations
 */
export const fromTask: FromTask2<URI>['fromTask'] =
    /*#__PURE__*/
    flow(AI.fromTask, fromAsyncIterable)

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * Changes the value of the local context during the execution of the action `ma` (similar to `Contravariant`'s
 * `contramap`).
 *
 * @category combinators
 */
export const local: <R2, R1>(f: (r2: R2) => R1) => <A>(ma: ReaderAsyncIterable<R1, A>) => ReaderAsyncIterable<R2, A> =
    R.local

/**
 * Less strict version of [`asksReaderAsyncIterable`](#asksreadertask).
 *
 * @category combinators
 */
export const asksReaderAsyncIterableW: <R1, R2, A>(
    f: (r1: R1) => ReaderAsyncIterable<R2, A>
) => ReaderAsyncIterable<R1 & R2, A> = R.asksReaderW

/**
 * Effectfully accesses the environment.
 *
 * @category combinators
 */
export const asksReaderAsyncIterable: <R, A>(f: (r: R) => ReaderAsyncIterable<R, A>) => ReaderAsyncIterable<R, A> =
    asksReaderAsyncIterableW

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------

const _map: Functor2<URI>['map'] = (fa, f) => pipe(fa, map(f))
const _mapWithIndex: FunctorWithIndex2<URI, number>['mapWithIndex'] = (fa, f) => pipe(fa, mapWithIndex(f))
const _apPar: Apply2<URI>['ap'] = (fab, fa) => pipe(fab, ap(fa))

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 */
export const map: <A, B>(f: (a: A) => B) => <R>(fa: ReaderAsyncIterable<R, A>) => ReaderAsyncIterable<R, B> =
    /*#__PURE__*/
    RT.map(AI.Functor)

/**
 * Same as [`map`](#map), but the iterating function takes both the index and the value
 * of the element.
 *
 * @category FunctorWithIndex
 */
export const mapWithIndex: <A, B>(
    f: (i: number, a: A) => B
) => <R>(fa: ReaderAsyncIterable<R, A>) => ReaderAsyncIterable<R, B> = f => R.map(AI.mapWithIndex(f))

/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 */
export const ap: <R, A>(
    fa: ReaderAsyncIterable<R, A>
) => <B>(fab: ReaderAsyncIterable<R, (a: A) => B>) => ReaderAsyncIterable<R, B> =
    /*#__PURE__*/
    RT.ap(AI.Apply)

/**
 * Less strict version of [`ap`](#ap).
 *
 * @category Apply
 */
export const apW: <R2, A>(
    fa: ReaderAsyncIterable<R2, A>
) => <R1, B>(fab: ReaderAsyncIterable<R1, (a: A) => B>) => ReaderAsyncIterable<R1 & R2, B> = ap as any

/**
 * @category Pointed
 */
export const of: Pointed2<URI>['of'] =
    /*#__PURE__*/
    RT.of(AI.Pointed)

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 */
export const chain: (
    C: AIChain
) => <A, R, B>(f: (a: A) => ReaderAsyncIterable<R, B>) => (ma: ReaderAsyncIterable<R, A>) => ReaderAsyncIterable<R, B> =
    RT.chain

/**
 * Less strict version of  [`chain`](#chain).
 *
 * @category Monad
 */
export const chainW: (
    C: AIChain
) => <R2, A, B>(
    f: (a: A) => ReaderAsyncIterable<R2, B>
) => <R1>(ma: ReaderAsyncIterable<R1, A>) => ReaderAsyncIterable<R1 & R2, B> = chain as any

/**
 * Less strict version of  [`chainWithIndex`](#chainWithIndex).
 *
 * @category combinators
 */
export const chainWithIndexW: (
    C: AIChainWithIndex
) => <R, A, B>(
    f: (i: number, a: A) => ReaderAsyncIterable<R, B>
) => (ma: ReaderAsyncIterable<R, A>) => ReaderAsyncIterable<R, B> = AIC => {
    const c = getChainWithIndex(AIC)

    return f => fa => c.chainWithIndex(fa, f)
}

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category combinators
 */
export const chainWithIndex: (
    C: AIChainWithIndex
) => <R, A>(
    f: (i: number, a: A) => ReaderAsyncIterable<R, A>
) => (ma: ReaderAsyncIterable<R, A>) => ReaderAsyncIterable<R, A> = chainWithIndexW

/**
 * Less strict version of [`flatten`](#flatten).
 *
 * @category combinators
 */
export const flattenW: (
    C: AIChain
) => <R1, R2, A>(mma: ReaderAsyncIterable<R1, ReaderAsyncIterable<R2, A>>) => ReaderAsyncIterable<R1 & R2, A> = C => {
    const _chainW = chainW(C)

    return _chainW(identity)
}

/**
 * Derivable from `Chain`.
 *
 * @category combinators
 */
export const flatten: (
    C: AIChain
) => <R, A>(mma: ReaderAsyncIterable<R, ReaderAsyncIterable<R, A>>) => ReaderAsyncIterable<R, A> = flattenW

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 */
export const URI = 'ReaderAsyncIterable'

/**
 * @category instances
 */
export type URI = typeof URI

declare module 'fp-ts/lib/HKT' {
    interface URItoKind2<E, A> {
        readonly [URI]: ReaderAsyncIterable<E, A>
    }
}

/**
 * @category instances
 */
export const Functor: Functor2<URI> = {
    URI,
    map: _map,
}

/**
 * Derivable from `Functor`.
 *
 * @category combinators
 */
export const flap =
    /*#__PURE__*/
    flap_(Functor)

/**
 * @category instances
 */
export const Pointed: Pointed2<URI> = {
    URI,
    of,
}

/**
 * @category instances
 */
export const Apply: Apply2<URI> = {
    URI,
    map: _map,
    ap: _apPar,
}

/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 */
export const apFirst =
    /*#__PURE__*/
    apFirst_(Apply)

/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 */
export const apSecond =
    /*#__PURE__*/
    apSecond_(Apply)

/**
 * @category instances
 */
export const Applicative: Applicative2<URI> = {
    URI,
    map: _map,
    ap: _apPar,
    of,
}

/**
 * @category instances
 */
export const getChain: (C: AIChain) => Chain2<URI> = C => {
    const chain_ = RT.chain(C)

    return {
        URI,
        map: _map,
        ap: _apPar,
        chain: (fa, f) => pipe(fa, chain_(f)),
    }
}

/**
 * @category instances
 */
export const getChainWithIndex: (C: AIChainWithIndex) => ChainWithIndex2<URI, number> = C => {
    const _Chain = getChain(C)
    const chainWithIndex_ = AI.chainWithIndex(C)

    return {
        URI,
        map: _map,
        mapWithIndex: _mapWithIndex,
        ap: _apPar,
        chain: _Chain.chain,
        chainWithIndex: (fa, f) => r =>
            pipe(
                fa(r),
                chainWithIndex_((i, a) => f(i, a)(r))
            ),
    }
}

/**
 * @category instances
 */
export const getMonad: (C: AIChain) => Monad2<URI> = C => {
    const _Chain = getChain(C)

    return {
        URI,
        map: _map,
        of,
        ap: _apPar,
        chain: _Chain.chain,
    }
}

/**
 * @category instances
 */
export const getMonadIO: (C: AIChain) => MonadIO2<URI> = C => {
    const _Chain = getChain(C)

    return {
        URI,
        map: _map,
        of,
        ap: _apPar,
        chain: _Chain.chain,
        fromIO,
    }
}

/**
 * @category instances
 */
export const getMonadTask: (C: AIChain) => MonadTask2<URI> = C => {
    const _Chain = getChain(C)

    return {
        URI,
        map: _map,
        of,
        ap: _apPar,
        chain: _Chain.chain,
        fromIO,
        fromTask,
    }
}

/**
 * @category instances
 */
export const getMonadAsyncIterable: (C: AIChainWithIndex) => MonadAsyncIterable2<URI> = C => {
    const _Chain = getChainWithIndex(C)

    return {
        URI,
        map: _map,
        mapWithIndex: _mapWithIndex,
        chainWithIndex: _Chain.chainWithIndex,
        of,
        ap: _apPar,
        chain: _Chain.chain,
        fromIO,
        fromTask,
        fromAsyncIterable,
    }
}

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Chain`.
 *
 * @category combinators
 */
export const chainFirst = (C: AIChain) => {
    const _Chain = getChain(C)

    return chainFirst_(_Chain)
}

/**
 * Less strict version of [`chainFirst`](#chainfirst).
 *
 * Derivable from `Chain`.
 *
 * @category combinators
 */
export const chainFirstW: (
    C: AIChain
) => <R2, A, B>(
    f: (a: A) => ReaderAsyncIterable<R2, B>
) => <R1>(ma: ReaderAsyncIterable<R1, A>) => ReaderAsyncIterable<R1 & R2, A> = chainFirst as any

/**
 * @category instances
 */
export const FromIO: FromIO2<URI> = {
    URI,
    fromIO,
}

/**
 * @category combinators
 */
export const fromIOK =
    /*#__PURE__*/
    fromIOK_(FromIO)

/**
 * @category combinators
 */
export const chainIOK = (C: AIChain) => {
    const _Chain = getChain(C)

    return chainIOK_(FromIO, _Chain)
}

/**
 * @category combinators
 */
export const chainFirstIOK = (C: AIChain) => {
    const _Chain = getChain(C)

    return chainFirstIOK_(FromIO, _Chain)
}

/**
 * @category instances
 */
export const FromTask: FromTask2<URI> = {
    URI,
    fromIO,
    fromTask,
}

/**
 * @category combinators
 */
export const fromTaskK =
    /*#__PURE__*/
    fromTaskK_(FromTask)

/**
 * @category combinators
 */
export const chainTaskK = (C: AIChain) => {
    const _Chain = getChain(C)

    return chainTaskK_(FromTask, _Chain)
}

/**
 * @category combinators
 */
export const chainFirstTaskK = (C: AIChain) => {
    const _Chain = getChain(C)

    return chainFirstTaskK_(FromTask, _Chain)
}

/**
 * @category instances
 */
export const FromReader: FromReader2<URI> = {
    URI,
    fromReader,
}

/**
 * Reads the current context.
 *
 * @category constructors
 */
export const ask =
    /*#__PURE__*/
    ask_(FromReader)

/**
 * Projects a value from the global context in a `ReaderAsyncIterable`.
 *
 * @category constructors
 */
export const asks =
    /*#__PURE__*/
    asks_(FromReader)

/**
 * @category combinators
 */
export const fromReaderK =
    /*#__PURE__*/
    fromReaderK_(FromReader)

/**
 * @category combinators
 */
export const chainReaderK = (C: AIChain) => {
    const _Chain = getChain(C)

    return chainReaderK_(FromReader, _Chain)
}

/**
 * Less strict version of [`chainReaderK`](#chainreaderk).
 *
 * @category combinators
 */
export const chainReaderKW: (
    C: AIChain
) => <A, R1, B>(
    f: (a: A) => R.Reader<R1, B>
) => <R2>(ma: ReaderAsyncIterable<R2, A>) => ReaderAsyncIterable<R1 & R2, B> = chainReaderK as any

/**
 * @category combinators
 */
export const chainFirstReaderK = (C: AIChain) => {
    const _Chain = getChain(C)

    return chainFirstReaderK_(FromReader, _Chain)
}

/**
 * Less strict version of [`chainFirstReaderK`](#chainfirstreaderk).
 *
 * @category combinators
 */
export const chainFirstReaderKW: (
    C: AIChain
) => <A, R1, B>(
    f: (a: A) => R.Reader<R1, B>
) => <R2>(ma: ReaderAsyncIterable<R2, A>) => ReaderAsyncIterable<R1 & R2, A> = chainFirstReaderK as any

/**
 * @category instances
 */
export const FromAsyncIterable: FromAsyncIterable2<URI> = {
    URI,
    fromIO,
    fromTask,
    fromAsyncIterable,
}

/**
 * @category combinators
 */
export const fromAsyncIterableK =
    /*#__PURE__*/
    fromAsyncIterableK_(FromAsyncIterable)

/**
 * @category combinators
 */
export const chainAsyncIterableK = (C: AIChain) => {
    const _Chain = getChain(C)

    return chainAsyncIterableK_(FromAsyncIterable, _Chain)
}

/**
 * @category combinators
 */
export const chainFirstAsyncIterableK = (C: AIChain) => {
    const _Chain = getChain(C)

    return chainFirstAsyncIterableK_(FromAsyncIterable, _Chain)
}

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

export const Do: ReaderAsyncIterable<unknown, {}> =
    /*#__PURE__*/
    of({})

export const bindTo =
    /*#__PURE__*/
    bindTo_(Functor)

export const bind = (C: AIChain) => {
    const _Chain = getChain(C)

    return bind_(_Chain)
}

export const bindW: (
    C: AIChain
) => <N extends string, A, R2, B>(
    name: Exclude<N, keyof A>,
    f: (a: A) => ReaderAsyncIterable<R2, B>
) => <R1>(
    fa: ReaderAsyncIterable<R1, A>
) => ReaderAsyncIterable<R1 & R2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> = bind as any

// -------------------------------------------------------------------------------------
// pipeable sequence S
// -------------------------------------------------------------------------------------

export const apS =
    /*#__PURE__*/
    apS_(Apply)

export const apSW: <A, N extends string, R2, B>(
    name: Exclude<N, keyof A>,
    fb: ReaderAsyncIterable<R2, B>
) => <R1>(
    fa: ReaderAsyncIterable<R1, A>
) => ReaderAsyncIterable<R1 & R2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> = apS as any

// -------------------------------------------------------------------------------------
// sequence T
// -------------------------------------------------------------------------------------

export const ApT: ReaderAsyncIterable<unknown, readonly []> =
    /*#__PURE__*/
    of([])

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------
