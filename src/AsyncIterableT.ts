/**
 * AsyncIterable transformations
 *
 * @since 0.1.0
 */
import type { Functor4, Functor3, Functor3C, Functor2, Functor2C, Functor1, Functor } from 'fp-ts/Functor'
import type { URIS4, Kind4, URIS3, Kind3, URIS2, Kind2, URIS, Kind, HKT } from 'fp-ts/HKT'
import * as IXO from '@reactivex/ix-es5-cjs/asynciterable/operators'

/**
 * @since 0.1.0
 */
export function mapWithIndex<F extends URIS4>(
  F: Functor4<F>
): <A, B>(
  f: (i: number, a: A) => B
) => <S, FR, FE>(fa: AsyncIterable<Kind4<F, S, FR, FE, A>>) => AsyncIterable<Kind4<F, S, FR, FE, B>>
export function mapWithIndex<F extends URIS3>(
  F: Functor3<F>
): <A, B>(
  f: (i: number, a: A) => B
) => <FR, FE>(fa: AsyncIterable<Kind3<F, FR, FE, A>>) => AsyncIterable<Kind3<F, FR, FE, B>>
export function mapWithIndex<F extends URIS3, FE>(
  F: Functor3C<F, FE>
): <A, B>(
  f: (i: number, a: A) => B
) => <FR>(fa: AsyncIterable<Kind3<F, FR, FE, A>>) => AsyncIterable<Kind3<F, FR, FE, B>>
export function mapWithIndex<F extends URIS2>(
  F: Functor2<F>
): <A, B>(f: (i: number, a: A) => B) => <FE>(fa: AsyncIterable<Kind2<F, FE, A>>) => AsyncIterable<Kind2<F, FE, B>>
export function mapWithIndex<F extends URIS2, FE>(
  F: Functor2C<F, FE>
): <A, B>(f: (i: number, a: A) => B) => (fa: AsyncIterable<Kind2<F, FE, A>>) => AsyncIterable<Kind2<F, FE, B>>
export function mapWithIndex<F extends URIS>(
  F: Functor1<F>
): <A, B>(f: (i: number, a: A) => B) => (fa: AsyncIterable<Kind<F, A>>) => AsyncIterable<Kind<F, B>>
export function mapWithIndex<F>(
  F: Functor<F>
): <A, B>(f: (i: number, a: A) => B) => (fa: AsyncIterable<HKT<F, A>>) => AsyncIterable<HKT<F, B>>
export function mapWithIndex<F>(
  F: Functor<F>
): <A, B>(f: (i: number, a: A) => B) => (fa: AsyncIterable<HKT<F, A>>) => AsyncIterable<HKT<F, B>> {
  return (f) => IXO.map((a, i) => F.map(a, (b) => f(i, b)))
}
