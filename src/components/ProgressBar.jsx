export default function ProgressBar({ current, total }) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="h-1 bg-gray-100">
        <div
          className="h-full bg-decathlon-blue transition-all duration-500 ease-out"
          style={{ width: `${(current / total) * 100}%` }}
        />
      </div>
    </div>
  )
}
