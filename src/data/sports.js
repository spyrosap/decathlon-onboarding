// Maximum number of sports a user can select
export const MAX_SPORTS = 3

export const SPORTS = [
  { id: 'running',    emoji: '🏃',  label: 'Running',         category: 'endurance', intensity: 2, requiresGear: false },
  { id: 'cycling',    emoji: '🚴',  label: 'Cycling',         category: 'endurance', intensity: 2, requiresGear: true  },
  { id: 'football',   emoji: '⚽',  label: 'Football',        category: 'team',      intensity: 2, requiresGear: false },
  { id: 'fitness',    emoji: '💪',  label: 'Fitness',         category: 'endurance', intensity: 2, requiresGear: false },
  { id: 'hiking',     emoji: '🥾',  label: 'Hiking',          category: 'outdoor',   intensity: 1, requiresGear: true  },
  { id: 'swimming',   emoji: '🏊',  label: 'Swimming',        category: 'endurance', intensity: 2, requiresGear: true  },
  { id: 'tennis',     emoji: '🎾',  label: 'Tennis / Padel',  category: 'racket',    intensity: 2, requiresGear: true  },
  { id: 'basketball', emoji: '🏀',  label: 'Basketball',      category: 'team',      intensity: 2, requiresGear: false },
  { id: 'yoga',       emoji: '🧘',  label: 'Yoga',            category: 'wellness',  intensity: 1, requiresGear: false },
  { id: 'winter',     emoji: '⛷️', label: 'Winter Sports',   category: 'outdoor',   intensity: 2, requiresGear: true  },
  { id: 'mtb',        emoji: '🚵',  label: 'Mountain Biking', category: 'outdoor',   intensity: 3, requiresGear: true  },
  { id: 'outdoor',    emoji: '⛺',  label: 'Outdoor',         category: 'outdoor',   intensity: 1, requiresGear: true  },
]

// Human-readable taglines for each sport category, used in the profile summary
export const CATEGORY_LABELS = {
  endurance: 'Endurance athlete',
  team:      'Team player',
  outdoor:   'Outdoor explorer',
  racket:    'Racket sports fan',
  wellness:  'Wellness seeker',
}

// The equipment step is shown only when at least one selected sport requires gear
export function needsEquipmentStep(selectedIds) {
  return selectedIds.some(id => SPORTS.find(s => s.id === id)?.requiresGear)
}

// Returns the dominant sport category for the selected sports.
// Ties are broken by the highest cumulative intensity score.
export function getDominantCategory(selectedIds) {
  if (selectedIds.length === 0) return null

  const scores = {}
  selectedIds.forEach(id => {
    const sport = SPORTS.find(s => s.id === id)
    if (!sport) return
    if (!scores[sport.category]) scores[sport.category] = { count: 0, intensity: 0 }
    scores[sport.category].count     += 1
    scores[sport.category].intensity += sport.intensity
  })

  return Object.entries(scores).sort((a, b) =>
    b[1].count !== a[1].count
      ? b[1].count - a[1].count
      : b[1].intensity - a[1].intensity
  )[0][0]
}
