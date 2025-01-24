import { type FunctionComponent, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export type StepComponent = FunctionComponent<{
	prev: () => void;
	next: () => void;
	submit: () => void;
	cancel: () => void;
}>;

export const MultiStepForm: FunctionComponent<{
	steps: StepComponent[];
	onCancel?: () => void;
	onSubmit?: () => void;
}> = ({ steps, onCancel, onSubmit }) => {
	const [currentStep, setCurrentStep] = useState(0);
	const [previousStep, setPreviousStep] = useState(0);

	const delta = currentStep - previousStep;

	const onPrev = () => {
		setCurrentStep((currentStep) => {
			const prevStep = currentStep - 1;
			if (prevStep >= 0) {
				setPreviousStep(currentStep);
				return prevStep;
			}

			onCancel && onCancel();
			return currentStep;
		});
	};

	const onNext = () => {
		setCurrentStep((currentStep) => {
			const nextStep = currentStep + 1;
			if (nextStep < steps.length) {
				setPreviousStep(currentStep);
				return nextStep;
			}

			onSubmit && onSubmit();
			return currentStep;
		});
	};

	return steps.map(
		(Step, index) =>
			currentStep === index && (
				<motion.div
					key={index}
					initial={{
						x: delta >= 0 ? "50%" : "-50%",
						opacity: 0,
					}}
					animate={{
						x: 0,
						opacity: 1,
					}}
					transition={{
						duration: 0.3,
						ease: "easeInOut",
					}}
				>
					<Step
						key={index}
						prev={onPrev}
						next={onNext}
						submit={() => onSubmit && onSubmit()}
						cancel={() => onCancel && onCancel()}
					/>
				</motion.div>
			),
	);
};
