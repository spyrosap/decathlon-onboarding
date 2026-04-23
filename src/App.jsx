import { useState, useMemo } from 'react'
import { AnimatePresence } from 'framer-motion'
import ProgressBar from './components/ProgressBar'
import Step1_Welcome from './steps/Step1_Welcome'
import Step2_Sports from './steps/Step2_Sports'
import Step3_Equipment from './steps/Step3_Equipment'
import Step3_Fitness from './steps/Step3_Fitness'
import Step4_Goals from './steps/Step4_Goals'
import { needsEquipmentStep } from './data/sports'

export default function App() {
  const [currentStep, setCurrentStep] = useState('welcome')
  const [userData, setUserData] = useState({
    sports: [],
    equipment: null,  // only populated when needsEquipmentStep() is true
    fitnessLevel: null,
    goal: null,
  })

  // The step sequence is dynamic: the 'equipment' step is only inserted
  // when at least one selected sport requires gear.
  const stepSequence = useMemo(() => {
    const seq = ['welcome', 'sports']
    if (needsEquipmentStep(userData.sports)) seq.push('equipment')
    seq.push('fitness')
    seq.push('goals')
    return seq
  }, [userData.sports])

  const currentIndex = stepSequence.indexOf(currentStep)

  const nextStep = () => {
    const next = stepSequence[currentIndex + 1]
    if (next) setCurrentStep(next)
  }

  const prevStep = () => {
    const prev = stepSequence[currentIndex - 1]
    if (prev) setCurrentStep(prev)
  }

  const updateData = (key, value) => {
    setUserData(prev => {
      const next = { ...prev, [key]: value }
      // Cascade resets: changing an earlier answer invalidates all later answers
      // so the user doesn't carry forward stale selections.
      if (key === 'sports') {
        next.equipment   = null
        next.fitnessLevel = null
        next.goal         = null
      }
      if (key === 'fitnessLevel') {
        next.goal = null
      }
      return next
    })
  }

  // Progress bar excludes the welcome screen (it's a splash, not a "step")
  const progressSteps   = stepSequence.filter(s => s !== 'welcome')
  const progressCurrent = progressSteps.indexOf(currentStep) + 1

  return (
    <div className="min-h-screen bg-white font-sans">
      {currentStep !== 'welcome' && (
        <ProgressBar current={progressCurrent} total={progressSteps.length} />
      )}
      <AnimatePresence mode="wait">
        {currentStep === 'welcome' && (
          <Step1_Welcome key="welcome" onNext={nextStep} />
        )}
        {currentStep === 'sports' && (
          <Step2_Sports
            key="sports"
            onNext={nextStep}
            onBack={prevStep}
            selected={userData.sports}
            onChange={v => updateData('sports', v)}
          />
        )}
        {currentStep === 'equipment' && (
          <Step3_Equipment
            key="equipment"
            onNext={nextStep}
            onBack={prevStep}
            selected={userData.equipment}
            onChange={v => updateData('equipment', v)}
          />
        )}
        {currentStep === 'fitness' && (
          <Step3_Fitness
            key="fitness"
            onNext={nextStep}
            onBack={prevStep}
            selected={userData.fitness}
            selectedSports={userData.sports}
            onChange={v => updateData('fitnessLevel', v)}
          />
        )}
        {currentStep === 'goals' && (
          <Step4_Goals
            key="goals"
            onBack={prevStep}
            userData={userData}
            onChange={v => updateData('goal', v)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
