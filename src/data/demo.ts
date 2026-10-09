export interface DemoPhoto {
  id: string
  seed: string
  title: string
  tags: string[]
  w: number
  h: number
}

/**
 * 12 pre-tagged sample photos served from picsum.photos (stable per seed).
 * Matching is a deterministic client-side illusion: queries are tokenized and
 * matched against each photo's tags/title.
 */
export const DEMO_PHOTOS: DemoPhoto[] = [
  { id: 'p01', seed: 'shore-gold', title: 'Golden hour at the shore', tags: ['beach', 'ocean', 'sunset', 'nature', 'travel'], w: 480, h: 300 },
  { id: 'p02', seed: 'city-glint', title: 'Rainy city crosswalk', tags: ['city', 'urban', 'rain', 'night'], w: 480, h: 300 },
  { id: 'p03', seed: 'alpine-wake', title: 'Alpine ridge after snow', tags: ['mountain', 'snow', 'winter', 'nature', 'hike'], w: 480, h: 300 },
  { id: 'p04', seed: 'rowan-birthday', title: "Rowan's birthday", tags: ['people', 'friends', 'party', 'indoor'], w: 480, h: 300 },
  { id: 'p05', seed: 'redline', title: 'Red coupe, parked', tags: ['car', 'red', 'vehicle', 'street'], w: 480, h: 300 },
  { id: 'p06', seed: 'moss-walk', title: 'Mossy trail in the woods', tags: ['nature', 'forest', 'green', 'hike', 'trees'], w: 480, h: 300 },
  { id: 'p07', seed: 'brunch-plate', title: 'Sunday brunch', tags: ['food', 'coffee', 'indoor', 'friends'], w: 480, h: 300 },
  { id: 'p08', seed: 'milo', title: 'Milo on the couch', tags: ['pet', 'dog', 'animal', 'indoor'], w: 480, h: 300 },
  { id: 'p09', seed: 'cabin-snow', title: 'Cabin under packed snow', tags: ['winter', 'snow', 'night', 'cabin', 'travel'], w: 480, h: 300 },
  { id: 'p10', seed: 'dune-sweep', title: 'Dune lines at noon', tags: ['desert', 'travel', 'warm', 'nature'], w: 480, h: 300 },
  { id: 'p11', seed: 'courier-bike', title: 'Courier on a fixed gear', tags: ['bike', 'people', 'city', 'sport'], w: 480, h: 300 },
  { id: 'p12', seed: 'vespa-alley', title: 'Vespa in a side alley', tags: ['travel', 'street', 'vintage', 'europe', 'city'], w: 480, h: 300 },
]

export const PRESETS = ['golden hour', 'friends', 'winter', 'red cars']

/** Pill categories with live counts, derived from the sample gallery. */
export const CATEGORIES = ['nature', 'city', 'people', 'winter', 'beach'] as const

export function photoUrl(p: DemoPhoto): string {
  return `https://picsum.photos/seed/${p.seed}/${p.w}/${p.h}`
}

export function countForTag(tag: string): number {
  return DEMO_PHOTOS.filter((p) => p.tags.includes(tag)).length
}

export function matchesQuery(query: string, photo: DemoPhoto): boolean {
  const raw = query.toLowerCase().trim()
  if (!raw) return false
  const tokens = raw.split(/\s+/).filter(Boolean)
  const haystack = [...photo.tags, photo.title.toLowerCase()].join(' ')
  return tokens.every((tok) => haystack.includes(tok))
}

export function matchedPhotos(query: string): DemoPhoto[] {
  return DEMO_PHOTOS.filter((p) => matchesQuery(query, p))
}