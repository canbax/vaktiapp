import { describe, it, expect } from 'vitest';
import { levenshteinDistance } from './levenshtein';

describe('levenshteinDistance', () => {
  it('is 0 for identical strings', () => {
    expect(levenshteinDistance('istanbul', 'istanbul')).toEqual(0);
  });

  it('is 0 for strings differing only by case', () => {
    expect(levenshteinDistance('Istanbul', 'istanbul')).toEqual(0);
  });

  it('equals the length of the non-empty string when the other is empty', () => {
    expect(levenshteinDistance('', 'istanbul')).toEqual(8);
    expect(levenshteinDistance('istanbul', '')).toEqual(8);
    expect(levenshteinDistance('', '')).toEqual(0);
  });

  it('counts a single substitution', () => {
    expect(levenshteinDistance('cat', 'bat')).toEqual(1);
  });

  it('counts a single insertion', () => {
    expect(levenshteinDistance('cat', 'cats')).toEqual(1);
  });

  it('counts a single deletion', () => {
    expect(levenshteinDistance('cats', 'cat')).toEqual(1);
  });

  it('is symmetric', () => {
    expect(levenshteinDistance('kitten', 'sitting')).toEqual(
      levenshteinDistance('sitting', 'kitten'),
    );
  });

  it('computes a known multi-edit distance', () => {
    expect(levenshteinDistance('kitten', 'sitting')).toEqual(3);
  });

  it('handles completely different strings', () => {
    expect(levenshteinDistance('abc', 'xyz')).toEqual(3);
  });
});
