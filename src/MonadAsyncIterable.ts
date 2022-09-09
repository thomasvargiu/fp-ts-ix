/**
 * `AsyncIterable` monad
 *
 * @since 0.1.0
 */
import type {
  MonadTask,
  MonadTask1,
  MonadTask2,
  MonadTask2C,
  MonadTask3,
  MonadTask3C,
  MonadTask4
} from 'fp-ts/MonadTask'

import type {
  FunctorWithIndex,
  FunctorWithIndex1,
  FunctorWithIndex2,
  FunctorWithIndex2C,
  FunctorWithIndex3,
  FunctorWithIndex3C,
  FunctorWithIndex4
} from 'fp-ts/lib/FunctorWithIndex'
import type { URIS, URIS2, URIS3, URIS4 } from 'fp-ts/lib/HKT'

import type {
  ChainWithIndex,
  ChainWithIndex1,
  ChainWithIndex2,
  ChainWithIndex2C,
  ChainWithIndex3,
  ChainWithIndex3C,
  ChainWithIndex4
} from './ChainWithIndex'
import type {
  FromAsyncIterable,
  FromAsyncIterable1,
  FromAsyncIterable2,
  FromAsyncIterable2C,
  FromAsyncIterable3,
  FromAsyncIterable3C,
  FromAsyncIterable4
} from './FromAsyncIterable'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 0.1.0
 */
export interface MonadAsyncIterable<M>
  extends MonadTask<M>,
    FromAsyncIterable<M>,
    FunctorWithIndex<M, number>,
    ChainWithIndex<M, number> {}

/**
 * @category type classes
 * @since 0.1.0
 */
export interface MonadAsyncIterable1<M extends URIS>
  extends MonadTask1<M>,
    FromAsyncIterable1<M>,
    FunctorWithIndex1<M, number>,
    ChainWithIndex1<M, number> {}

/**
 * @category type classes
 * @since 0.1.0
 */
export interface MonadAsyncIterable2<M extends URIS2>
  extends MonadTask2<M>,
    FromAsyncIterable2<M>,
    FunctorWithIndex2<M, number>,
    ChainWithIndex2<M, number> {}

/**
 * @category type classes
 * @since 0.1.0
 */
export interface MonadAsyncIterable2C<M extends URIS2, E>
  extends MonadTask2C<M, E>,
    FromAsyncIterable2C<M, E>,
    FunctorWithIndex2C<M, number, E>,
    ChainWithIndex2C<M, number, E> {}

/**
 * @category type classes
 * @since 0.1.0
 */
export interface MonadAsyncIterable3<M extends URIS3>
  extends MonadTask3<M>,
    FromAsyncIterable3<M>,
    FunctorWithIndex3<M, number>,
    ChainWithIndex3<M, number> {}

/**
 * @category type classes
 * @since 0.1.0
 */
export interface MonadAsyncIterable3C<M extends URIS3, E>
  extends MonadTask3C<M, E>,
    FromAsyncIterable3C<M, E>,
    FunctorWithIndex3C<M, number, E>,
    ChainWithIndex3C<M, number, E> {}

/**
 * @category type classes
 * @since 0.1.0
 */
export interface MonadAsyncIterable4<M extends URIS4>
  extends MonadTask4<M>,
    FromAsyncIterable4<M>,
    FunctorWithIndex4<M, number>,
    ChainWithIndex4<M, number> {}
