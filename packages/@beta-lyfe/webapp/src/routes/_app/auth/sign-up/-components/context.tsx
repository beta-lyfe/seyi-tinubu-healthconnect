import {
  createContext,
  type FunctionComponent,
  type ReactNode,
  useContext,
  useState
} from 'react'
import type {
  Step1Schema,
  Step2Schema,
  Step3Schema,
  Step4Schema,
  Step5Schema
} from './schema'

export type Step5FullSchema = {
  step: 'step5'
  data: Step1Schema & Step2Schema & Step3Schema & Step4Schema & Step5Schema
}

type ContextStepStatesType =
  | {
      step: 'step0'
      data: {}
    }
  | {
      step: 'step1'
      data: Step1Schema
    }
  | {
      step: 'step2'
      data: Step1Schema & Step2Schema
    }
  | {
      step: 'step3'
      data: Step1Schema & Step2Schema & Step3Schema
    }
  | {
      step: 'step4'
      data: Step1Schema & Step2Schema & Step3Schema & Step4Schema
    }
  | Step5FullSchema

type ContextType = {
  update: (data: ContextStepStatesType) => void
} & ContextStepStatesType

const Context = createContext<ContextType>({} as ContextType)

export const SignUpFormProvider: FunctionComponent<{ children: ReactNode }> = ({
  children
}) => {
  const [state, setState] = useState<ContextStepStatesType>({
    step: 'step0',
    data: {}
  })
  return (
    <Context.Provider value={{ ...state, update: setState }}>
      {children}
    </Context.Provider>
  )
}

export const useSignUpForm = () => useContext(Context)
