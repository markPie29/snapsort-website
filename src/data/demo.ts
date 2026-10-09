export interface DemoClip {
  id: string
  code: string
  peopleCount: number
  duration: string
  label: string
  previewId: string
  tags: string[]
  matchInDefault: boolean
}

export interface DemoScenario {
  id: string
  title: string
  query: string
  detect: string
  filterRule: string
  summaryText: string
  chips: string[]
  quickAction: string
  toolbarTag: string
  matchedIds: string[]
  suggestions: string[]
}

export const DEMO_CLIPS: DemoClip[] = [
  {
    id: 'c14',
    code: 'CLIP_0014',
    peopleCount: 2,
    duration: '0:29',
    label: 'Media #14 10s',
    previewId: '14',
    tags: ['groom', 'bride', 'ceremony', 'people', 'video'],
    matchInDefault: true,
  },
  {
    id: 'c20',
    code: 'CLIP_0020',
    peopleCount: 2,
    duration: '0:35',
    label: 'Media #20 10s',
    previewId: '20',
    tags: ['groom', 'bride', 'vows', 'people', 'video'],
    matchInDefault: true,
  },
  {
    id: 'c21',
    code: 'CLIP_0021',
    peopleCount: 2,
    duration: '0:36',
    label: 'Media #21 10s',
    previewId: '21',
    tags: ['groom', 'bride', 'portrait', 'dance', 'video'],
    matchInDefault: true,
  },
  {
    id: 'c28',
    code: 'CLIP_0028',
    peopleCount: 2,
    duration: '0:43',
    label: 'Media #28 10s',
    previewId: '28',
    tags: ['groom', 'bride', 'outdoor', 'dance', 'video'],
    matchInDefault: true,
  },
  {
    id: 'c35',
    code: 'CLIP_0035',
    peopleCount: 2,
    duration: '0:50',
    label: 'Media #35 10s',
    previewId: '35',
    tags: ['groom', 'bride', 'cake', 'reception', 'video'],
    matchInDefault: true,
  },
  {
    id: 'c40',
    code: 'CLIP_0040',
    peopleCount: 2,
    duration: '0:55',
    label: 'Media #40 10s',
    previewId: '40',
    tags: ['groom', 'bride', 'cake', 'toast', 'video'],
    matchInDefault: true,
  },
  {
    id: 'c42',
    code: 'CLIP_0042',
    peopleCount: 3,
    duration: '0:57',
    label: 'Media #42 10s',
    previewId: '42',
    tags: ['groom', 'bride', 'cake', 'officiant', 'video'],
    matchInDefault: true,
  },
  {
    id: 'c49',
    code: 'CLIP_0049',
    peopleCount: 2,
    duration: '1:04',
    label: 'Media #49 10s',
    previewId: '49',
    tags: ['groom', 'bride', 'sunset', 'dance', 'video'],
    matchInDefault: true,
  },
  {
    id: 'c56',
    code: 'CLIP_0056',
    peopleCount: 2,
    duration: '1:11',
    label: 'Media #56 10s',
    previewId: '56',
    tags: ['groom', 'bride', 'exit', 'dance', 'video'],
    matchInDefault: true,
  },
  {
    id: 'c60',
    code: 'CLIP_0060',
    peopleCount: 3,
    duration: '1:15',
    label: 'Media #60 10s',
    previewId: '60',
    tags: ['groom', 'bride', 'family', 'toast', 'video'],
    matchInDefault: true,
  },
  {
    id: 'c63',
    code: 'CLIP_0063',
    peopleCount: 2,
    duration: '1:18',
    label: 'Media #63 10s',
    previewId: '63',
    tags: ['groom', 'bride', 'close_up', 'vows', 'video'],
    matchInDefault: true,
  },
  {
    id: 'c70',
    code: 'CLIP_0070',
    peopleCount: 2,
    duration: '1:25',
    label: 'Media #70 10s',
    previewId: '70',
    tags: ['groom', 'bride', 'golden_hour', 'portrait', 'video'],
    matchInDefault: true,
  },
]

export const SCENARIOS: Record<string, DemoScenario> = {
  groom_bride: {
    id: 'groom_bride',
    title: 'Groom and Bride Search',
    query: 'Group all images where the groom and bride are visible, no other audience',
    detect: 'DETECT: faces: [groom, bride], maxFaces: 2',
    filterRule: 'FILTER: person: [1, 2], match: all',
    summaryText: 'Done. I found 36 matches and applied these filters:',
    chips: ['Includes: groom, bride', 'Max people: 2'],
    quickAction: 'Groom + Bride',
    toolbarTag: 'People: Groom +1',
    matchedIds: DEMO_CLIPS.map((c) => c.id),
    suggestions: ['Only video', 'Add cake cutting'],
  },
  cake_cutting: {
    id: 'cake_cutting',
    title: 'Cake Cutting Moments',
    query: 'Add cake cutting',
    detect: 'DETECT: scene: [cake_cutting], objects: [cake, knife]',
    filterRule: 'FILTER: scene: cake_cutting, action: slice',
    summaryText: 'Done. I found 8 matches and applied these filters:',
    chips: ['Includes: cake cutting', 'Scene: reception'],
    quickAction: 'Cake Cutting',
    toolbarTag: 'Scene: Cake Cutting',
    matchedIds: ['c35', 'c40', 'c42'],
    suggestions: ['Groom + Bride', 'Only video'],
  },
  only_video: {
    id: 'only_video',
    title: 'High-Bitrate Video Clips',
    query: 'Only video',
    detect: 'DETECT: media_type: [video], stream: ProRes_422',
    filterRule: 'FILTER: media: video, exclude: photos',
    summaryText: 'Done. Filtered library to 66 video clips:',
    chips: ['Format: ProRes / H.265', 'Type: Video'],
    quickAction: 'All Video Clips',
    toolbarTag: 'Type: Video Only',
    matchedIds: DEMO_CLIPS.map((c) => c.id),
    suggestions: ['Groom + Bride', 'Add cake cutting'],
  },
  first_dance: {
    id: 'first_dance',
    title: 'First Dance Footage',
    query: 'Show first dance clips with warm lighting',
    detect: 'DETECT: action: [ballroom_dance], lighting: warm',
    filterRule: 'FILTER: motion: dance, scene: evening',
    summaryText: 'Done. I found 14 matches and applied these filters:',
    chips: ['Action: first dance', 'Tone: warm amber'],
    quickAction: 'First Dance',
    toolbarTag: 'Action: Dance',
    matchedIds: ['c21', 'c28', 'c49', 'c56'],
    suggestions: ['Add cake cutting', 'Only video'],
  },
}

export const PRESET_KEYS = ['groom_bride', 'cake_cutting', 'only_video', 'first_dance'] as const

export function resolveScenario(query: string): DemoScenario {
  const q = query.toLowerCase().trim()
  if (q.includes('cake')) return SCENARIOS.cake_cutting
  if (q.includes('video') || q.includes('clips') || q.includes('only video')) return SCENARIOS.only_video
  if (q.includes('dance')) return SCENARIOS.first_dance
  if (q.includes('groom') || q.includes('bride') || q.includes('wedding')) return SCENARIOS.groom_bride

  const tokens = q.split(/\s+/).filter(Boolean)
  const matched = DEMO_CLIPS.filter((clip) =>
    tokens.some((tok) => clip.tags.some((t) => t.includes(tok)) || clip.code.toLowerCase().includes(tok))
  )
  const matchedIds = matched.length > 0 ? matched.map((m) => m.id) : [DEMO_CLIPS[0].id, DEMO_CLIPS[1].id, DEMO_CLIPS[2].id]

  return {
    id: 'custom_' + Date.now(),
    title: `${query.slice(0, 20)}${query.length > 20 ? '…' : ''} Search`,
    query,
    detect: `DETECT: prompt_tokens: [${tokens.slice(0, 3).join(', ')}]`,
    filterRule: `FILTER: match: local_neural_engine, score >= 0.85`,
    summaryText: `Done. I found ${matchedIds.length} matches and applied these filters:`,
    chips: tokens.slice(0, 2).map((t) => `Term: ${t}`),
    quickAction: query.length > 16 ? query.slice(0, 14) + '…' : query,
    toolbarTag: `Tag: ${tokens[0] || 'custom'}`,
    matchedIds,
    suggestions: ['Groom + Bride', 'Add cake cutting', 'Only video'],
  }
}