import { describe, it, expect } from 'vitest';
import { distanceToSearch } from './place';
import type { PlaceWithCountry } from '@/types';

function makePlace(overrides: Partial<PlaceWithCountry> = {}): PlaceWithCountry {
  return {
    id: 1,
    name: 'Istanbul',
    countryCode: 'TR',
    stateName: 'Istanbul',
    alternativeNames: [],
    latitude: 41.0082,
    longitude: 28.9784,
    country: 'Turkey',
    ...overrides,
  };
}

describe('distanceToSearch', () => {
  it('computes the levenshtein distance against the name for plain places', () => {
    const place = makePlace({ name: 'Istanbul', alternativeNames: [] });
    expect(distanceToSearch(place, 'istanbul')).toEqual(0);
    expect(distanceToSearch(place, 'istambul')).toEqual(1);
  });

  it('computes the levenshtein distance against Keçiören', () => {
    const place = makePlace({
      country: 'Türkiye',
      id: 311046,
      name: 'Keçiören',
      countryCode: 'tr',
      stateName: 'Ankara',
      latitude: 40.02106,
      longitude: 32.83102,
      alternativeNames: [
        '케치외렌',
        'Keçiörən',
        'Кечиорен',
        'Кечиоьрен',
        'کچی‌اورن',
        'کیچیورین',
        '凱其歐倫市',
      ],
      isMatchingAlternativeName: false,
      prefixMatchCount: 4,
      matchingString: 'Keçiören',
    });
    expect(distanceToSearch(place, 'Alanya')).toEqual(6);
  });

  it('picks the minimum distance across name and alternative names', () => {
    const place = makePlace({
      name: 'Istanbul',
      alternativeNames: ['Constantinople', 'Konstantiniyye'],
    });
    expect(distanceToSearch(place, 'constantinople')).toEqual(0);
    expect(distanceToSearch(place, 'istanbul')).toEqual(0);
  });

  it('ignores alternative names that are worse matches than the name', () => {
    const place = makePlace({
      name: 'Istanbul',
      alternativeNames: ['xyz'],
    });
    expect(distanceToSearch(place, 'istanbul')).toEqual(0);
  });
});
