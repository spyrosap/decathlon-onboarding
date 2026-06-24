// Coach Plan recommendation engine.
//
// Given a completed userData profile, computes a single "Coach Plan".
// The output is driven by a hidden readiness score, two cross-field
// modifiers, and an ordered, first-match-wins rules table. No single
// input determines the result on its own.

import { SPORTS } from './sports'
import { isWellnessProfile, COMPETITIVE_SPORTS } from './fitness'

const LEVEL_WEIGHT = { beginner: 1, regular: 3, athlete: 5 }
const GOAL_WEIGHT  = { compete: 3, progress: 2, fit: 1, gear: 0, discover: -1 }
const EQUIP_WEIGHT = { ready: 2, some: 1, none: -1 }

export const COACH_PLANS = {
  mindful: {
    id: 'mindful',
    title: 'Mindful Mover',
    tagline: 'Gentle, body-first guidance built around how you feel.',
    perks: ['Mobility & breathing sessions', 'Recovery tracking', 'No-pressure weekly check-ins'],
  },
  elite: {
    id: 'elite',
    title: 'Elite Performance',
    tagline: "You're all in — so is this plan.",
    perks: ['Periodised training blocks', 'Performance gear shortlist', '1:1 coach reviews'],
  },
  progression: {
    id: 'progression',
    title: 'Progression',
    tagline: 'Structured steps to take your game up a level.',
    perks: ['Adaptive weekly targets', 'Cross-training mix', 'Progress milestones'],
  },
  explorer: {
    id: 'explorer',
    title: 'Explorer',
    tagline: 'Try more, commit later — variety is the point.',
    perks: ['Taster sessions across sports', 'Beginner-friendly gear picks', 'Community meetups'],
  },
  gearup: {
    id: 'gearup',
    title: 'Gear-Up Starter',
    tagline: 'Get equipped right before you get going.',
    perks: ['Curated starter kit', 'Fit & sizing guide', 'Budget-aware bundles'],
  },
  foundation: {
    id: 'foundation',
    title: 'Foundation',
    tagline: 'Start simple, build the habit.',
    perks: ['Easy weekly routine', 'Essentials checklist', 'Habit streaks'],
  },
}

// Evaluated top to bottom; the first predicate that passes wins.
const PLAN_RULES = [
  { plan: 'mindful',     when: c => c.wellness && c.goal !== 'compete' },
  { plan: 'elite',       when: c => c.readiness >= 16 && c.fitnessLevel === 'athlete' && c.hasCompetitive && c.equipment !== 'none' },
  { plan: 'progression', when: c => c.readiness >= 11 && c.categoryCount >= 2 && ['progress', 'compete', 'fit'].includes(c.goal) },
  { plan: 'explorer',    when: c => c.goal === 'discover' && c.versatility >= 5 },
  { plan: 'gearup',      when: c => c.goal === 'gear' && c.equipment !== 'ready' },
  { plan: 'foundation',  when: () => true },
]

function buildContext(userData) {
  const { sports, equipment, fitnessLevel, goal } = userData
  const objs = sports.map(id => SPORTS.find(s => s.id === id)).filter(Boolean)

  const intensitySum  = objs.reduce((sum, s) => sum + s.intensity, 0)
  const categoryCount = new Set(objs.map(s => s.category)).size
  const hasCompetitive = sports.some(id => COMPETITIVE_SPORTS.includes(id))

  const commitment = (LEVEL_WEIGHT[fitnessLevel] ?? 0) + intensitySum + (GOAL_WEIGHT[goal] ?? 0)
  const versatility = categoryCount * 2 + sports.length

  let readiness = Math.round(commitment * 1.5 + versatility * 0.8 + (EQUIP_WEIGHT[equipment] ?? 0))

  // Cross-field modifiers: the same level+goal can shift tiers based on
  // equipment status and sport mix.
  if (fitnessLevel === 'athlete' && (!hasCompetitive || equipment === 'none')) readiness -= 4
  if (fitnessLevel === 'beginner' && intensitySum >= 6 && categoryCount >= 2) readiness += 3

  return {
    sports, equipment, fitnessLevel, goal,
    wellness: isWellnessProfile(sports),
    hasCompetitive, intensitySum, categoryCount, versatility, readiness,
  }
}

export function computeRecommendation(userData) {
  if (!userData.goal || userData.sports.length === 0) return null
  const ctx = buildContext(userData)
  const match = PLAN_RULES.find(r => r.when(ctx))
  return COACH_PLANS[match.plan]
}
