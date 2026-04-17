import StepWrapper from '../components/StepWrapper'
import { FITNESS_LEVELS, isWellnessProfile, shouldShowAthleteNudge } from '../data/fitness'

function Checkmark() {
  return (
    <div className="ml-auto w-6 h-6 rounded-full bg-decathlon-blue flex items-center justify-center flex-shrink-0">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

export default function Step3_Fitness({ onNext, onBack, selected, selectedSports, onChange }) {
  // When the user has selected only wellness sports (yoga, outdoor),
  // show softer copy that matches a non-competitive context.
  const variant = isWellnessProfile(selectedSports) ? 'wellness' : 'default'

  const showAthleteNudge = shouldShowAthleteNudge(selected, selectedSports)

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
            <h2 className="text-2xl font-extrabold text-gray-900">How would you describe your level?</h2>
            <p className="text-gray-500 text-sm">We'll tailor our recommendations to match</p>
          </div>

          {/* Athlete nudge — shown when level=athlete but no competitive sports selected */}
          {showAthleteNudge && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
              <p className="text-amber-800 text-sm font-medium">
                Heads up — your sports are mostly recreational. That's totally fine, but you might identify more with <strong>Regular practitioner</strong>.
              </p>
            </div>
          )}

          {/* Level cards */}
          <div className="flex flex-col gap-4 flex-1">
            {FITNESS_LEVELS.map(level => {
              const copy = level[variant]
              return (
                <button
                  key={level.id}
                  onClick={() => onChange(level.id)}
                  className={`flex items-center gap-4 p-5 rounded-2xl border-2 text-left transition-all duration-200 active:scale-[0.99] w-full
                    ${selected === level.id
                      ? 'border-decathlon-blue bg-decathlon-blue-light'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                    }`}
                >
                  <span className="text-4xl leading-none">{level.emoji}</span>
                  <div className="flex-1">
                    <p className={`font-bold text-lg ${selected === level.id ? 'text-decathlon-blue' : 'text-gray-900'}`}>
                      {copy.title}
                    </p>
                    <p className="text-sm text-gray-500 mt-0.5">{copy.description}</p>
                  </div>
                  {selected === level.id && <Checkmark />}
                </button>
              )
            })}
          </div>

          {/* CTA */}
          <button
            onClick={onNext}
            disabled={!selected}
            className={`w-full py-4 font-extrabold text-base rounded-2xl transition-all duration-200 active:scale-[0.98]
              ${selected
                ? 'bg-decathlon-blue text-white hover:bg-decathlon-blue-dark shadow-lg'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
          >
            Continue
          </button>
        </div>
      </div>
    </StepWrapper>
  )
}
