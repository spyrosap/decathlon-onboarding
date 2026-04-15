import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import ProgressBar from './components/ProgressBar'
import Step1_Welcome from './steps/Step1_Welcome'
import Step2_Sports from './steps/Step2_Sports'
import Step3_Fitness from './steps/Step3_Fitness'
import Step4_Goals from './steps/Step4_Goals'

export default function App() {
  const [step, setStep] = useState(1)
  const [userData, setUserData] = useState({
    sports: [],
    fitnessLevel: null,
    goal: null,
  })

  const updateData = (key, value) => {
    setUserData(prev => ({ ...prev, [key]: value }))
  }

  const nextStep = () => setStep(s => s + 1)

  return (
    <div className="min-h-screen bg-white font-sans">
      {step > 1 && (
        <ProgressBar current={step - 1} total={3} />
      )}
      <AnimatePresence mode="wait">
        {step === 1 && (
          <Step1_Welcome key="step-1" onNext={nextStep} />
        )}
        {step === 2 && (
          <Step2_Sports
            key="step-2"
            onNext={nextStep}
            selected={userData.sports}
            onChange={v => updateData('sports', v)}
          />
        )}
        {step === 3 && (
          <Step3_Fitness
            key="step-3"
            onNext={nextStep}
            selected={userData.fitnessLevel}
            onChange={v => updateData('fitnessLevel', v)}
          />
        )}
        {step === 4 && (
          <Step4_Goals
            key="step-4"
            userData={userData}
            onChange={v => updateData('goal', v)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
