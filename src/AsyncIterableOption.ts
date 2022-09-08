/* eslint-disable @typescript-eslint/ban-types */
import type { Alt1 } from 'fp-ts/Alt'
import type { Alternative1 } from 'fp-ts/Alternative'
import type { Applicative1 } from 'fp-ts/Applicative'
import { apFirst as apFirst_, Apply1, apS as apS_, apSecond as apSecond_ } from 'fp-ts/Apply'
import { bind as bind_, chainFirst as chainFirst_, Chain1 } from 'fp-ts/Chain'
import { compact as compact_, Compactable1, separate as separate_ } from 'fp-ts/Compactable'
import type { Either } from 'fp-ts/Either'
import {
    filter as filter_,
    Filterable1,
    filterMap as filterMap_,
    partition as partition_,
    partitionMap as partitionMap_,
} from 'fp-ts/Filterable'
import {
    FromEither1,
    fromEitherK as fromEitherK_,
    chainEitherK as chainEitherK_,
    chainFirstEitherK as chainFirstEitherK_,
} from 'fp-ts/FromEither'
import { FromIO1, fromIOK as fromIOK_, chainFirstIOK as chainFirstIOK_, chainIOK as chainIOK_ } from 'fp-ts/FromIO'
import type { FromTask1 } from 'fp-ts/FromTask'
import { bindTo as bindTo_, flap as flap_, Functor1 } from 'fp-ts/Functor'
import type { FunctorWithIndex1 } from 'fp-ts/FunctorWithIndex'
import type { Monad1 } from 'fp-ts/Monad'
import type { MonadIO1 } from 'fp-ts/MonadIO'
import type { MonadTask1 } from 'fp-ts/MonadTask'
import type { NaturalTransformation11, NaturalTransformation21 } from 'fp-ts/NaturalTransformation'
import * as O from 'fp-ts/Option'
import * as OT from 'fp-ts/OptionT'
import type { Pointed1 } from 'fp-ts/Pointed'
import type { Predicate } from 'fp-ts/Predicate'
import type { Refinement } from 'fp-ts/Refinement'
import type { Separated } from 'fp-ts/Separated'
import { Zero1, guard as guard_ } from 'fp-ts/Zero'
import { identity, Lazy, pipe } from 'fp-ts/function'
import * as IX from 'ix/asynciterable'
import * as IXO from 'ix/asynciterable/operators'
import type { ChainWithIndex1 } from './ChainWithIndex'
import {
    chainFirstAsyncIterableK as chainFirstAsyncIterableK_,
    chainAsyncIterableK as chainAsyncIterableK_,
    FromAsyncIterable1, fromAsyncIterableK as fromAsyncIterableK_

} from './FromAsyncIterable'
import type { MonadAsyncIterable1 } from './MonadAsyncIterable'
import * as AI from './AsyncIterable'
import type { URI as AIEURI } from './AsyncIterableEither'
import * as AIT from './AsyncIterableT'
import Option = O.Option

type AIChain = Chain1<AI.URI>
type AIChainWithIndex = ChainWithIndex1<AI.URI, number>

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 2.10.0
 */
export interface AsyncIterableOption<A> extends AsyncIterable<Option<A>> {}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 2.10.0
 */
export const some: <A>(a: A) => AsyncIterableOption<A> =
    /*#__PURE__*/
    OT.some(AI.Pointed)

/**
 * @category constructors
 * @since 2.10.0
 */
export const fromPredicate: {
    <A, B extends A>(refinement: Refinement<A, B>): (a: A) => AsyncIterableOption<B>
    <A>(predicate: Predicate<A>): <B extends A>(b: B) => AsyncIterableOption<B>
    <A>(predicate: Predicate<A>): (a: A) => AsyncIterableOption<A>
} =
    /*#__PURE__*/
    OT.fromPredicate(AI.Pointed)

// -------------------------------------------------------------------------------------
// natural transformations
// -------------------------------------------------------------------------------------

/**
 * @category natural transformations
 * @since 2.10.0
 */
export const fromOption: NaturalTransformation11<O.URI, URI> = AI.of

/**
 * @category natural transformations
 * @since 2.10.0
 */
export const fromEither: FromEither1<URI>['fromEither'] =
    /*#__PURE__*/
    OT.fromEither(AI.Pointed)

/**
 * @category natural transformations
 * @since 2.10.0
 */
export const fromIO: FromIO1<URI>['fromIO'] = ma => fromAsyncIterable(AI.fromIO(ma))

/**
 * @category natural transformations
 * @since 2.10.0
 */
export const fromTask: FromTask1<URI>['fromTask'] = ma => fromAsyncIterable(AI.fromTask(ma))

/**
 * @category natural transformations
 * @since 2.10.0
 */
export const fromAsyncIterable: FromAsyncIterable1<URI>['fromAsyncIterable'] =
    /*#__PURE__*/
    OT.fromF(AI.Functor)

/**
 * @category natural transformations
 * @since 2.11.0
 */
export const fromAsyncIterableEither: NaturalTransformation21<AIEURI, URI> =
    /*#__PURE__*/
    AI.map(O.fromEither)

// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------

/**
 * @category destructors
 * @since 2.10.0
 */
export const match: <B, A>(onNone: () => B, onSome: (a: A) => B) => (ma: AsyncIterableOption<A>) => AsyncIterable<B> =
    /*#__PURE__*/
    OT.match(AI.Functor)

/**
 * Less strict version of [`match`](#match).
 *
 * @category destructors
 * @since 2.10.0
 */
export const matchW: <B, A, C>(
    onNone: () => B,
    onSome: (a: A) => C
) => (ma: AsyncIterableOption<A>) => AsyncIterable<B | C> = match as any

// -------------------------------------------------------------------------------------
// interop
// -------------------------------------------------------------------------------------

/**
 * @category interop
 * @since 2.10.0
 */
export const fromNullable: <A>(a: A) => AsyncIterableOption<NonNullable<A>> =
    /*#__PURE__*/
    OT.fromNullable(AI.Pointed)

/**
 * Transforms a `Promise` that may reject to a `Promise` that never rejects and returns an `Option` instead.
 *
 * See also [`tryCatchK`](#trycatchk).
 *
 * @category interop
 * @since 2.10.0
 */
export const tryCatch = <A>(f: Lazy<Promise<A>>): AsyncIterableOption<A> =>
    pipe(
        IX.defer(() => IX.from(f())),
        AI.map(O.some),
        IXO.catchError(() => AI.of(O.none))
    )

/**
 * Converts a function returning a `Promise` to one returning a `AsyncIterableOption`.
 *
 * @category interop
 * @since 2.10.0
 */
export const tryCatchK =
    <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Promise<B>): ((...a: A) => AsyncIterableOption<B>) =>
    (...a) =>
        tryCatch(() => f(...a))

/**
 * @category interop
 * @since 2.10.0
 */
export const fromNullableK: <A extends ReadonlyArray<unknown>, B>(
    f: (...a: A) => B | null | undefined
) => (...a: A) => AsyncIterableOption<NonNullable<B>> =
    /*#__PURE__*/
    OT.fromNullableK(AI.Pointed)

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 2.10.0
 */
export const fromOptionK: <A extends ReadonlyArray<unknown>, B>(
    f: (...a: A) => Option<B>
) => (...a: A) => AsyncIterableOption<B> =
    /*#__PURE__*/
    OT.fromOptionK(AI.Pointed)

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.10.0
 */
export const map: <A, B>(f: (a: A) => B) => (fa: AsyncIterableOption<A>) => AsyncIterableOption<B> =
    /*#__PURE__*/
    OT.map(AI.Functor)

/**
 * Same as [`map`](#map), but the iterating function takes both the index and the value
 * of the element.
 *
 * @category FunctorWithIndex
 */
export const mapWithIndex: <A, B>(f: (i: number, a: A) => B) => (fa: AsyncIterableOption<A>) => AsyncIterableOption<B> =
    AIT.mapWithIndex(O.Functor)

/**
 * @category Apply
 * @since 2.10.0
 */
export const ap: <A>(
    fa: AsyncIterableOption<A>
) => <B>(fab: AsyncIterableOption<(a: A) => B>) => AsyncIterableOption<B> =
    /*#__PURE__*/
    OT.ap(AI.Apply)

/**
 * @category Pointed
 * @since 2.10.0
 */
export const of: Pointed1<URI>['of'] = some

/**
 * @category Zero
 * @since 2.10.0
 */
export const zero: Zero1<URI>['zero'] =
    /*#__PURE__*/
    OT.zero(AI.Pointed)

/**
 * @category constructors
 * @since 2.10.0
 */
export const none: AsyncIterableOption<never> =
    /*#__PURE__*/
    zero()

/**
 * @category Compactable
 * @since 2.10.0
 */
export const compact: Compactable1<URI>['compact'] =
    /*#__PURE__*/
    compact_(AI.Functor, O.Compactable)

/**
 * @category Compactable
 * @since 2.10.0
 */
export const separate: Compactable1<URI>['separate'] =
    /*#__PURE__*/
    separate_(AI.Functor, O.Compactable, O.Functor)

/**
 * @category Filterable
 * @since 2.10.0
 */
export const filter: {
    <A, B extends A>(refinement: Refinement<A, B>): (fb: AsyncIterableOption<A>) => AsyncIterableOption<B>
    <A>(predicate: Predicate<A>): <B extends A>(fb: AsyncIterableOption<B>) => AsyncIterableOption<B>
    <A>(predicate: Predicate<A>): (fa: AsyncIterableOption<A>) => AsyncIterableOption<A>
} =
    /*#__PURE__*/
    filter_(AI.Functor, O.Filterable)

/**
 * @category Filterable
 * @since 2.10.0
 */
export const filterMap: <A, B>(f: (a: A) => Option<B>) => (fga: AsyncIterableOption<A>) => AsyncIterableOption<B> =
    /*#__PURE__*/
    filterMap_(AI.Functor, O.Filterable)

/**
 * @category Filterable
 * @since 2.10.0
 */
export const partition: {
    <A, B extends A>(refinement: Refinement<A, B>): (
        fb: AsyncIterableOption<A>
    ) => Separated<AsyncIterableOption<A>, AsyncIterableOption<B>>
    <A>(predicate: Predicate<A>): <B extends A>(
        fb: AsyncIterableOption<B>
    ) => Separated<AsyncIterableOption<B>, AsyncIterableOption<B>>
    <A>(predicate: Predicate<A>): (
        fa: AsyncIterableOption<A>
    ) => Separated<AsyncIterableOption<A>, AsyncIterableOption<A>>
} =
    /*#__PURE__*/
    partition_(AI.Functor, O.Filterable)

/**
 * @category Filterable
 * @since 2.10.0
 */
export const partitionMap: <A, B, C>(
    f: (a: A) => Either<B, C>
) => (fa: AsyncIterableOption<A>) => Separated<AsyncIterableOption<B>, AsyncIterableOption<C>> =
    /*#__PURE__*/
    partitionMap_(AI.Functor, O.Filterable)

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

const _map: Functor1<URI>['map'] = (fa, f) => pipe(fa, map(f))
const _mapWithIndex: FunctorWithIndex1<URI, number>['mapWithIndex'] = (fa, f) => pipe(fa, mapWithIndex(f))
const _ap: Apply1<URI>['ap'] = (fab, fa) => pipe(fab, ap(fa))
/* istanbul ignore next */
const _filter: Filterable1<URI>['filter'] = <A>(fa: AsyncIterableOption<A>, predicate: Predicate<A>) =>
    pipe(fa, filter(predicate))
/* istanbul ignore next */
const _filterMap: Filterable1<URI>['filterMap'] = (fa, f) => pipe(fa, filterMap(f))
/* istanbul ignore next */
const _partition: Filterable1<URI>['partition'] = <A>(fa: AsyncIterableOption<A>, predicate: Predicate<A>) =>
    pipe(fa, partition(predicate))
/* istanbul ignore next */
const _partitionMap: Filterable1<URI>['partitionMap'] = (fa, f) => pipe(fa, partitionMap(f))

/**
 * @category instances
 * @since 2.10.0
 */
export const URI = 'AsyncIterableOption'

/**
 * @category instances
 * @since 2.10.0
 */
export type URI = typeof URI

declare module 'fp-ts/lib/HKT' {
    interface URItoKind<A> {
        readonly [URI]: AsyncIterableOption<A>
    }
}

/**
 * @category instances
 * @since 2.10.0
 */
export const Functor: Functor1<URI> = {
    URI,
    map: _map,
}

/**
 * @category instances
 * @since 2.10.0
 */
export const FunctorWithIndex: FunctorWithIndex1<URI, number> = {
    URI,
    map: _map,
    mapWithIndex: _mapWithIndex,
}

/**
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 2.10.0
 */
export const flap =
    /*#__PURE__*/
    flap_(Functor)

/**
 * @category instances
 * @since 2.10.0
 */
export const Pointed: Pointed1<URI> = {
    URI,
    of,
}

/**
 * @category instances
 * @since 2.10.0
 */
export const Apply: Apply1<URI> = {
    URI,
    map: _map,
    ap: _ap,
}

/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.10.0
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
 * @since 2.10.0
 */
export const apSecond =
    /*#__PURE__*/
    apSecond_(Apply)

/**
 * @category instances
 * @since 2.10.0
 */
export const Applicative: Applicative1<URI> = {
    URI,
    map: _map,
    ap: _ap,
    of,
}

export const getChain = (AIC: AIChain): Chain1<URI> => ({
    URI: URI,
    map: _map,
    ap: _ap,
    chain: (fa, f) =>
        AIC.chain(
            fa,
            O.match(() => AI.zero(), f)
        ),
})

export const getChainWithIndex = (AIC: AIChainWithIndex): ChainWithIndex1<URI, number> => ({
    URI: URI,
    map: _map,
    mapWithIndex: _mapWithIndex,
    ap: _ap,
    chain: getChain(AIC).chain,
    chainWithIndex: (fa, f) =>
        AIC.chainWithIndex(fa, (i, oa) =>
            pipe(
                oa,
                O.match(
                    () => AI.zero(),
                    a => f(i, a)
                )
            )
        ),
})

export const getMonad: (AIC: AIChain) => Monad1<URI> = AIC => ({
    URI,
    map: _map,
    of,
    ap: _ap,
    chain: getChain(AIC).chain,
})

export const getMonadIO: (AIC: AIChain) => MonadIO1<URI> = AIC => ({
    URI,
    map: _map,
    of,
    ap: _ap,
    chain: getChain(AIC).chain,
    fromIO,
})

export const getMonadTask: (AIC: AIChain) => MonadTask1<URI> = AIC => ({
    URI,
    map: _map,
    ap: _ap,
    of,
    chain: getChain(AIC).chain,
    fromIO,
    fromTask,
})

export const getMonadAsyncIterable: (AIC: AIChainWithIndex) => MonadAsyncIterable1<URI> = AIC => {
    const chain_ = getChainWithIndex(AIC)

    return {
        URI,
        map: _map,
        mapWithIndex: _mapWithIndex,
        ap: _ap,
        of,
        chain: chain_.chain,
        chainWithIndex: chain_.chainWithIndex,
        fromIO,
        fromTask,
        fromAsyncIterable,
    }
}

/**
 * @category instances
 * @since 2.10.0
 */
export const getAlt: (C: AIChain) => Alt1<URI> = C => {
    const alt_ = alt(C)
    return {
        URI,
        map: _map,
        alt: (fa, that) => pipe(fa, alt_(that)),
    }
}

/**
 * @category instances
 * @since 2.10.0
 */
export const getAlternative: (C: AIChain) => Alternative1<URI> = C => ({
    URI,
    map: _map,
    ap: _ap,
    of,
    alt: getAlt(C).alt,
    zero,
})

/**
 * @category instances
 * @since 2.11.0
 */
export const Zero: Zero1<URI> = {
    URI,
    zero,
}

/**
 * @category constructors
 * @since 2.11.0
 */
export const guard =
    /*#__PURE__*/
    guard_(Zero, Pointed)

/**
 * @category instances
 * @since 2.10.0
 */
export const Compactable: Compactable1<URI> = {
    URI,
    compact,
    separate,
}

/**
 * @category instances
 * @since 2.10.0
 */
export const Filterable: Filterable1<URI> = {
    URI,
    map: _map,
    compact,
    separate,
    filter: _filter,
    filterMap: _filterMap,
    partition: _partition,
    partitionMap: _partitionMap,
}

/**
 * @category instances
 * @since 2.10.0
 */
export const FromIO: FromIO1<URI> = {
    URI,
    fromIO,
}

/**
 * @category combinators
 * @since 2.10.0
 */
export const fromIOK =
    /*#__PURE__*/
    fromIOK_(FromIO)

/**
 * @category instances
 * @since 2.11.0
 */
export const FromEither: FromEither1<URI> = {
    URI,
    fromEither,
}

/**
 * @category combinators
 * @since 2.12.0
 */
export const fromEitherK =
    /*#__PURE__*/
    fromEitherK_(FromEither)

/**
 * @category instances
 * @since 2.10.0
 */
export const FromAsyncIterable: FromAsyncIterable1<URI> = {
    URI,
    fromIO,
    fromTask,
    fromAsyncIterable,
}

/**
 * @category combinators
 * @since 2.10.0
 */
export const fromAsyncIterableK =
    /*#__PURE__*/
    fromAsyncIterableK_(FromAsyncIterable)

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @since 2.10.0
 */
export const Do: AsyncIterableOption<{}> =
    /*#__PURE__*/
    of({})

/**
 * @since 2.10.0
 */
export const bindTo =
    /*#__PURE__*/
    bindTo_(Functor)

// -------------------------------------------------------------------------------------
// sequence S
// -------------------------------------------------------------------------------------

/**
 * @since 2.10.0
 */
export const apS =
    /*#__PURE__*/
    apS_(Apply)

// -------------------------------------------------------------------------------------
// sequence T
// -------------------------------------------------------------------------------------

/**
 * @since 2.11.0
 */
export const ApT: AsyncIterableOption<readonly []> =
    /*#__PURE__*/
    of([])

/**
 * Returns the provided AsyncIterableEither if empty.
 *
 * @category combinators
 */
export const getOnEmpty: <B>(
    onEmpty: Lazy<AsyncIterableOption<B>>
) => <A>(ma: AsyncIterableOption<A>) => AsyncIterableOption<A | B> = AI.getOnEmpty

// -------------------------------------------------------------------------------------
// Chain
// -------------------------------------------------------------------------------------

/**
 * @category Monad
 * @since 2.10.0
 */
export const chain: (
    AIC: AIChain
) => <A, B>(f: (a: A) => AsyncIterableOption<B>) => (ma: AsyncIterableOption<A>) => AsyncIterableOption<B> = AIC => {
    const C = getChain(AIC)

    return f => ma => C.chain(ma, f)
}

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category combinators
 */
export const chainWithIndex: (
    AIC: AIChainWithIndex
) => <A, B>(
    f: (i: number, a: A) => AsyncIterableOption<B>
) => (ma: AsyncIterableOption<A>) => AsyncIterableOption<B> = AIC => {
    const C = getChainWithIndex(AIC)

    return f => ma => C.chainWithIndex(ma, f)
}

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Chain`.
 *
 * @category combinators
 * @since 2.10.0
 */
export const chainFirst = (C: AIChain) =>
    /*#__PURE__*/
    chainFirst_(getChain(C))

/**
 * @category interop
 * @since 2.10.0
 */
export const chainNullableK: (
    C: AIChain
) => <A, B>(
    f: (a: A) => B | null | undefined
) => (ma: AsyncIterableOption<A>) => AsyncIterableOption<NonNullable<B>> = C => OT.chainNullableK(AI.getMonad(C))

/**
 * @category combinators
 * @since 2.10.0
 */
export const chainOptionK: (
    C: AIChain
) => <A, B>(f: (a: A) => O.Option<B>) => (ma: AsyncIterableOption<A>) => AsyncIterableOption<B> = C =>
    OT.chainOptionK(AI.getMonad(C))

/**
 * @category combinators
 * @since 2.10.0
 */
export const chainIOK = (C: AIChain) =>
    /*#__PURE__*/
    chainIOK_(FromIO, getChain(C))

/**
 * @category combinators
 * @since 2.10.0
 */
export const chainFirstIOK = (C: AIChain) =>
    /*#__PURE__*/
    chainFirstIOK_(FromIO, getChain(C))

/**
 * @category combinators
 * @since 2.12.0
 */
export const chainEitherK: (
    C: AIChain
) => <E, A, B>(f: (a: A) => Either<E, B>) => (ma: AsyncIterableOption<A>) => AsyncIterableOption<B> = C =>
    chainEitherK_(FromEither, getChain(C))

/**
 * @category combinators
 * @since 2.12.0
 */
export const chainFirstEitherK = (C: AIChain) => chainFirstEitherK_(FromEither, getChain(C))

/**
 * @category combinators
 * @since 2.10.0
 */
export const chainAsyncIterableK = (C: AIChain) => chainAsyncIterableK_(FromAsyncIterable, getChain(C))

/**
 * @category combinators
 * @since 2.10.0
 */
export const chainFirstAsyncIterableK = (C: AIChain) =>
    /*#__PURE__*/
    chainFirstAsyncIterableK_(FromAsyncIterable, getChain(C))

/**
 * @since 2.10.0
 */
export const bind = (C: AIChain) => {
    const C_ = getChain(C)
    return bind_(C_)
}

/**
 * Derivable from `Chain`.
 *
 * @category combinators
 * @since 2.10.0
 */
export const flatten: (
    C: AIChain
) => <A>(mma: AsyncIterableOption<AsyncIterableOption<A>>) => AsyncIterableOption<A> = C => chain(C)(identity)

/**
 * @category Alt
 * @since 2.10.0
 */
export const alt: (
    C: AIChain
) => <A>(second: Lazy<AsyncIterableOption<A>>) => (first: AsyncIterableOption<A>) => AsyncIterableOption<A> = C =>
    OT.alt(AI.getMonad(C))

/**
 * Less strict version of [`alt`](#alt).
 *
 * @category Alt
 * @since 2.10.0
 */
export const altW: (
    C: AIChain
) => <B>(second: Lazy<AsyncIterableOption<B>>) => <A>(first: AsyncIterableOption<A>) => AsyncIterableOption<A | B> =
    alt as any

/**
 * @category destructors
 * @since 2.10.0
 */
export const matchE: (
    C: AIChain
) => <B, A>(
    onNone: () => AsyncIterable<B>,
    onSome: (a: A) => AsyncIterable<B>
) => (ma: AsyncIterableOption<A>) => AsyncIterable<B> = C => OT.matchE(C)

/**
 * Alias of [`matchE`](#matche).
 *
 * @category destructors
 * @since 2.10.0
 */
export const fold = matchE

/**
 * Less strict version of [`matchE`](#matche).
 *
 * @category destructors
 * @since 2.10.0
 */
export const matchEW: (
    C: AIChain
) => <B, C, A>(
    onNone: () => AsyncIterable<B>,
    onSome: (a: A) => AsyncIterable<C>
) => (ma: AsyncIterableOption<A>) => AsyncIterable<B | C> = matchE as any

/**
 * Alias of [`matchEW`](#matchew).
 *
 * @category destructors
 * @since 2.10.0
 */
export const foldW = matchEW

/**
 * @category destructors
 * @since 2.10.0
 */
export const getOrElse: (
    C: AIChain
) => <A>(onNone: Lazy<AsyncIterable<A>>) => (fa: AsyncIterableOption<A>) => AsyncIterable<A> = C =>
    OT.getOrElse(AI.getMonad(C))

/**
 * Less strict version of [`getOrElse`](#getorelse).
 *
 * @category destructors
 * @since 2.10.0
 */
export const getOrElseW: (
    M: AIChain
) => <B>(onNone: Lazy<AsyncIterable<B>>) => <A>(ma: AsyncIterableOption<A>) => AsyncIterable<A | B> = getOrElse as any
