import StepWrapper from '../components/StepWrapper'

const OPTIONS = [
  {
    id: 'none',
    emoji: '🛒',
    label: 'Starting from scratch',
    description: "I don't have any gear yet",
  },
  {
    id: 'some',
    emoji: '🎒',
    label: 'I have some gear',
    description: 'I own a few basics already',
  },
  {
    id: 'ready',
    emoji: '✅',
    label: "I'm fully equipped",
    description: 'I have everything I need',
  },
]

export default function Step3_Equipment({ onNext, onBack, selected, onChange }) {
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

          <div className="space-y-1">
            <h2 className="text-2xl font-extrabold text-gray-900">What's your gear situation?</h2>
            <p className="text-gray-500 text-sm">This helps us tailor our product recommendations</p>
          </div>

          <div className="flex flex-col gap-4 flex-1">
            {OPTIONS.map(opt => (
              <button
                key={opt.id}
                onClick={() => onChange(opt.id)}
                className={`flex items-center gap-4 p-5 rounded-2xl border-2 text-left transition-all duration-200 active:scale-[0.99] w-full
                  ${selected === opt.id
                    ? 'border-decathlon-blue bg-decathlon-blue-light'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                  }`}
              >
                <span className="text-3xl leading-none">{opt.emoji}</span>
                <div className="flex-1">
                  <p className={`font-bold text-base ${selected === opt.id ? 'text-decathlon-blue' : 'text-gray-900'}`}>
                    {opt.label}
                  </p>
                  <p className="text-sm text-gray-500 mt-0.5">{opt.description}</p>
                </div>
              </button>
            ))}
          </div>

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
