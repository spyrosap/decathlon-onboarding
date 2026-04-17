import { useState } from 'react'
import StepWrapper from '../components/StepWrapper'
import SportCard from '../components/SportCard'
import { SPORTS, MAX_SPORTS } from '../data/sports'

export default function Step2_Sports({ onNext, onBack, selected, onChange }) {
  const [limitReached, setLimitReached] = useState(false)

  const toggle = (id) => {
    if (selected.includes(id)) {
      // Deselect: always allowed
      setLimitReached(false)
      onChange(selected.filter(s => s !== id))
    } else if (selected.length >= MAX_SPORTS) {
      // At the cap — show the warning instead of adding
      setLimitReached(true)
    } else {
      onChange([...selected, id])
    }
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
            <h2 className="text-2xl font-extrabold text-gray-900">Which sports do you practice?</h2>
            <p className="text-gray-500 text-sm">Pick up to {MAX_SPORTS}</p>
          </div>

          {/* Limit warning banner */}
          {limitReached && (
            <div className="flex items-center justify-between bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
              <p className="text-amber-800 text-sm font-medium">
                You can pick up to {MAX_SPORTS} sports. Remove one to switch.
              </p>
              <button
                onClick={() => setLimitReached(false)}
                className="text-amber-500 hover:text-amber-700 ml-3 text-lg leading-none"
              >
                ×
              </button>
            </div>
          )}

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
