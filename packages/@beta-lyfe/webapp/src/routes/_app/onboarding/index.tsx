import { createFileRoute } from '@tanstack/react-router'

import { OnboardingScreen } from "./-components/onboarding-screen"

export const Route = createFileRoute('/_app/onboarding/')({
  component: OnboardingPage,
})

export default function OnboardingPage() {
  return <OnboardingScreen />
}


