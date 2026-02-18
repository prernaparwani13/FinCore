# TODO - Input Field Width Fix

## Task
Make all input fields have the same fixed width across every calculator with a clean conditional on calculator type.

## Steps:
1. [ ] Update AutoResizeInput.tsx to accept a calculatorType prop and apply consistent width
2. [ ] Update CalculatorDetail.tsx to pass calculator type and use consistent minWidth for all inputs

## Implementation Approach:
- Add a helper function that returns consistent minWidth based on calculator type
- Apply the same width to all input fields across all calculators
