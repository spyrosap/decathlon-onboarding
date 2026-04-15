import StepWrapper from '../components/StepWrapper'

export default function Step1_Welcome({ onNext }) {
  return (
    <StepWrapper>
      <div className="min-h-screen bg-decathlon-blue flex flex-col items-center justify-center px-6 text-white">
        <div className="max-w-sm w-full text-center space-y-10">
          {/* Brand */}
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-blue-200">
              Sport is for everyone
            </p>
            <h1 className="text-5xl font-black tracking-tight">DECATHLON</h1>
          </div>

          {/* Illustration */}
          <div className="text-7xl">🏅</div>

          {/* Headline */}
          <div className="space-y-4">
            <h2 className="text-3xl font-extrabold leading-tight">
              Let's build your<br />Decathlon experience
            </h2>
            <p className="text-blue-100 text-base leading-relaxed">
              Answer 3 quick questions and we'll personalise your journey — from gear to goals.
            </p>
          </div>

          {/* CTA */}
          <div className="space-y-3">
            <button
              onClick={onNext}
              className="w-full py-4 bg-white text-decathlon-blue font-extrabold text-lg rounded-2xl hover:bg-blue-50 active:scale-[0.98] transition-all duration-150 shadow-xl"
            >
              Get started →
            </button>
            <p className="text-blue-300 text-sm">Takes less than a minute</p>
          </div>
        </div>
      </div>
    </StepWrapper>
  )
}
