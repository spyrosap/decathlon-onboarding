// Eligibility rules per goal:
//   eligibleLevels — the fitness levels for which this goal is shown
//   maxSports      — (optional) hide this goal if the user selected more sports than this threshold
export const GOALS = [
  {
    id: 'fit',
    emoji: '💪',
    label: 'Get fit & feel good',
    eligibleLevels: ['beginner', 'regular', 'athlete'],
  },
  {
    id: 'progress',
    emoji: '📈',
    label: 'Progress & improve',
    eligibleLevels: ['regular', 'athlete'],
  },
  {
    id: 'compete',
    emoji: '🏆',
    label: 'Compete & perform',
    eligibleLevels: ['athlete'], // Only shown to users who identified as athletes
  },
  {
    id: 'gear',
    emoji: '🛍️',
    label: 'Find the right gear',
    eligibleLevels: ['beginner', 'regular', 'athlete'],
  },
  {
    id: 'discover',
    emoji: '🌍',
    label: 'Discover new activities',
    eligibleLevels: ['beginner', 'regular'], // Not shown to athletes — they're already committed
    maxSports: 2, // Hidden when user already selected 3 sports (they clearly know what they want)
  },
]

// Returns the subset of goals available given the user's current fitness level and sport count.
export function getAvailableGoals(fitnessLevel, sportCount) {
  return GOALS.filter(goal => {
    if (!goal.eligibleLevels.includes(fitnessLevel)) return false
    if (goal.maxSports !== undefined && sportCount > goal.maxSports) return false
    return true
  })
}
