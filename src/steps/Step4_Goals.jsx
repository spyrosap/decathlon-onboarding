import { motion, AnimatePresence } from 'framer-motion'
import StepWrapper from '../components/StepWrapper'
import { getAvailableGoals, GOALS } from '../data/goals'
import { SPORTS, CATEGORY_LABELS, getDominantCategory } from '../data/sports'
import { FITNESS_LEVELS } from '../data/fitness'

// Build a label map from the SPORTS data so it stays in sync
const SPORT_LABELS = Object.fromEntries(SPORTS.map(s => [s.id, s.label]))

// Build a level label map from FITNESS_LEVELS (default variant)
const LEVEL_LABELS = Object.fromEntries(FITNESS_LEVELS.map(l => [l.id, l.default.title]))

function Checkmark() {
  return (
    <div className="ml-auto w-6 h-6 rounded-full bg-decathlon-blue flex items-center justify-center flex-shrink-0">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

export default function Step4_Goals({ onBack, userData, onChange }) {
  const { sports, fitnessLevel, goal } = userData
  const allDone = goal !== null

  // Only show goals the user is eligible for given their fitness level and sport count
  const availableGoals = getAvailableGoals(fitnessLevel, sports.length)

  // Compute a human-readable profile tagline from the dominant sport category
  const dominantCategory = getDominantCategory(sports)
  const profileTagline   = dominantCategory ? CATEGORY_LABELS[dominantCategory] : null

  const handleFinish = () => {
    const profile = { sports, fitnessLevel, goal }
    console.log('Decathlon user profile:', JSON.stringify(profile, null, 2))
  }

  return (
    <StepWrapper>
      <div className="min-h-screen bg-white flex flex-col px-5 pt-16 pb-8">
        <div className="max-w-lg mx-auto w-full flex flex-col gap-6 flex-1">

          <button
            onClick={onBack}
            className="self-start text-sm text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-1 pt-4"
          >
            ← Back
          </button>

          {/* Header */}
          <div className="space-y-1">
            <h2 className="text-2xl font-extrabold text-gray-900">What's your main goal?</h2>
            <p className="text-gray-500 text-sm">We'll focus your experience around this</p>
          </div>

          {/* Goal cards — filtered by eligibility rules in data/goals.js */}
          <div className="flex flex-col gap-3">
            {availableGoals.map(g => (
              <button
                key={g.id}
                onClick={() => onChange(g.id)}
                className={`flex items-center gap-4 px-5 py-4 rounded-2xl border-2 text-left transition-all duration-200 active:scale-[0.99] w-full
                  ${goal === g.id
                    ? 'border-decathlon-blue bg-decathlon-blue-light'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                  }`}
              >
                <span className="text-2xl leading-none">{g.emoji}</span>
                <span className={`font-semibold text-base flex-1 ${goal === g.id ? 'text-decathlon-blue' : 'text-gray-800'}`}>
                  {g.label}
                </span>
                {goal === g.id && <Checkmark />}
              </button>
            ))}
          </div>

          {/* Animated profile summary — appears once goal is selected */}
          <AnimatePresence>
            {allDone && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="bg-decathlon-blue-light border border-decathlon-blue/20 rounded-2xl p-5 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <p className="text-decathlon-blue font-bold text-xs uppercase tracking-widest">
                    Your Decathlon Profile
                  </p>
                  {/* Tagline derived from the dominant sport category */}
                  {profileTagline && (
                    <span className="text-xs font-semibold text-decathlon-blue bg-white/60 px-2 py-0.5 rounded-full">
                      {profileTagline}
                    </span>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex gap-3 text-sm">
                    <span className="text-gray-400 font-medium w-14 flex-shrink-0 pt-0.5">Sports</span>
                    <span className="font-semibold text-gray-900 leading-snug">
                      {sports.map(s => SPORT_LABELS[s]).join(', ')}
                    </span>
                  </div>
                  <div className="flex gap-3 text-sm">
                    <span className="text-gray-400 font-medium w-14 flex-shrink-0">Level</span>
                    <span className="font-semibold text-gray-900">{LEVEL_LABELS[fitnessLevel]}</span>
                  </div>
                  <div className="flex gap-3 text-sm">
                    <span className="text-gray-400 font-medium w-14 flex-shrink-0">Goal</span>
                    <span className="font-semibold text-gray-900">{GOALS.find(g => g.id === goal)?.label}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* CTA */}
          <button
            onClick={handleFinish}
            disabled={!allDone}
            className={`w-full py-4 font-extrabold text-base rounded-2xl transition-all duration-200 active:scale-[0.98]
              ${allDone
                ? 'bg-decathlon-blue text-white hover:bg-decathlon-blue-dark shadow-lg'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
          >
            Start exploring →
          </button>
        </div>
      </div>
    </StepWrapper>
  )
}
