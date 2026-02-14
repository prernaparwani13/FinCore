# TODO List for Loan Term Slider Fix

## Task
Fix the Loan Term slider behavior - when the YRS input field is empty or null, the slider should automatically reset to its initial/default value.

## Steps:
- [x] Analyze the codebase and understand the issue
- [x] Implement the fix in CalculatorDetail.tsx
- [ ] Test the fix

## Details:
- File: src/component/CalculatorDetail.tsx
- Fix: Modify the onChange handler for the third input (v3) to reset the slider to its default value when the input is empty
- Applicable calculators: Mortgage Payment, Loan Amortization, Auto Loan (all calculators with Loan Term slider)
