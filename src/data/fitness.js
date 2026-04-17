// Sports that are exclusively wellness/low-intensity.
// When ALL selected sports fall into this list, softer label copy is shown on the fitness step.
export const WELLNESS_ONLY_SPORTS = ['yoga', 'outdoor']

export function isWellnessProfile(selectedIds) {
  return selectedIds.length > 0 && selectedIds.every(id => WELLNESS_ONLY_SPORTS.includes(id))
}

// Each fitness level ships two variants of copy:
//   default  — shown for most sport profiles
//   wellness — shown when isWellnessProfile() is true
export const FITNESS_LEVELS = [
  {
    id: 'beginner',
    emoji: '🌱',
    default:  { title: 'Just starting out',        description: "I'm discovering the sport" },
    wellness: { title: 'Just getting active',       description: 'Movement is new for me' },
  },
  {
    id: 'regular',
    emoji: '🔥',
    default:  { title: 'Regular practitioner',      description: 'I train a few times a week' },
    wellness: { title: 'Regular mover',             description: 'I move my body a few times a week' },
  },
  {
    id: 'athlete',
    emoji: '🏆',
    default:  { title: 'Athlete',                   description: 'Sport is a serious part of my life' },
    wellness: { title: 'Dedicated practitioner',    description: 'Wellness is central to my life' },
  },
]

// Sports that make sense at an "athlete" intensity level.
// If the user selects "athlete" but none of their sports are in this list,
// a nudge is shown suggesting they might mean "regular practitioner" instead.
const COMPETITIVE_SPORTS = [
  'running', 'cycling', 'football', 'swimming',
  'tennis', 'basketball', 'mtb', 'winter', 'fitness',
]

export function shouldShowAthleteNudge(fitnessLevel, selectedSports) {
  if (fitnessLevel !== 'athlete') return false
  return !selectedSports.some(id => COMPETITIVE_SPORTS.includes(id))
}
