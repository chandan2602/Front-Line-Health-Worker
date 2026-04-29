import React from 'react';

const steps = [
  { label: 'Credentials' },
  { label: 'Verify OTP' },
  { label: 'Set PIN' },
];

function StepIndicator({ currentStep }) {
  return (
    <div className="step-indicator">
      {steps.map((step, index) => {
        const stepNum = index + 1;
        const isActive = stepNum === currentStep;
        const isDone = stepNum < currentStep;
        const isInactive = stepNum > currentStep;

        return (
          <div className="step-item" key={stepNum}>
            <div className={`step-circle ${isActive ? 'active' : isDone ? 'done' : 'inactive'}`}>
              {isDone ? '✓' : stepNum}
            </div>
            <span className={`step-label ${isActive ? 'active' : 'inactive'}`}>
              {step.label}
            </span>
            {index < steps.length - 1 && (
              <div className={`step-line ${isDone ? 'done' : ''}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default StepIndicator;
