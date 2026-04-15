export default function SportCard({ emoji, label, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`relative flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer w-full
        ${selected
          ? 'border-decathlon-blue bg-decathlon-blue-light'
          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
        }`}
    >
      {selected && (
        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-decathlon-blue flex items-center justify-center">
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
            <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}
      <span className="text-3xl leading-none">{emoji}</span>
      <span className={`text-xs font-semibold text-center leading-tight ${selected ? 'text-decathlon-blue' : 'text-gray-700'}`}>
        {label}
      </span>
    </button>
  )
}
