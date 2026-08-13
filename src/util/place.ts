import type { GenericPlace } from '@/types';
import { levenshteinDistance } from '@/util/levenshtein';

/**
 * Computes how closely a place matches a search query, as an edit distance.
 * Prefer the backend-computed edit distance for search matches, since it
 * already accounts for the matched (possibly alternative) name.
 */
export function distanceToSearch(place: GenericPlace, query: string): number {
  return Math.min(
    levenshteinDistance(place.name, query),
    ...place.alternativeNames.map((n) => levenshteinDistance(n, query)),
  );
}
