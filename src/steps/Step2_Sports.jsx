import StepWrapper from '../components/StepWrapper'
import SportCard from '../components/SportCard'

const SPORTS = [
  { id: 'running', emoji: '🏃', label: 'Running' },
  { id: 'cycling', emoji: '🚴', label: 'Cycling' },
  { id: 'football', emoji: '⚽', label: 'Football' },
  { id: 'fitness', emoji: '💪', label: 'Fitness' },
  { id: 'hiking', emoji: '🥾', label: 'Hiking' },
  { id: 'swimming', emoji: '🏊', label: 'Swimming' },
  { id: 'tennis', emoji: '🎾', label: 'Tennis / Padel' },
  { id: 'basketball', emoji: '🏀', label: 'Basketball' },
  { id: 'yoga', emoji: '🧘', label: 'Yoga' },
  { id: 'winter', emoji: '⛷️', label: 'Winter Sports' },
  { id: 'mtb', emoji: '🚵', label: 'Mountain Biking' },
  { id: 'outdoor', emoji: '⛺', label: 'Outdoor' },
]

export default function Step2_Sports({ onNext, selected, onChange }) {
  const toggle = (id) => {
    const updated = selected.includes(id)
      ? selected.filter(s => s !== id)
      : [...selected, id]
    onChange(updated)
  }

  return (
    <StepWrapper>
      <div className="min-h-screen bg-white flex flex-col px-5 pt-16 pb-8">
        <div className="max-w-lg mx-auto w-full flex flex-col gap-6 flex-1">
          {/* Header */}
          <div className="space-y-1 pt-4">
            <h2 className="text-2xl font-extrabold text-gray-900">Which sports do you practice?</h2>
            <p className="text-gray-500 text-sm">Pick as many as you like</p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-3 gap-3 flex-1">
            {SPORTS.map(sport => (
              <SportCard
                key={sport.id}
                emoji={sport.emoji}
                label={sport.label}
                selected={selected.includes(sport.id)}
                onClick={() => toggle(sport.id)}
              />
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={onNext}
            disabled={selected.length === 0}
            className={`w-full py-4 font-extrabold text-base rounded-2xl transition-all duration-200 active:scale-[0.98]
              ${selected.length > 0
                ? 'bg-decathlon-blue text-white hover:bg-decathlon-blue-dark shadow-lg'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
          >
            {selected.length > 0 ? `Continue (${selected.length} selected)` : 'Select at least one sport'}
          </button>
        </div>
      </div>
    </StepWrapper>
  )
}
