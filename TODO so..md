# Calculator Input Fix - TODO List

## Task: Fix extra spacing when input field with % suffix is empty

### Steps:
- [x] 1. Search and identify the problematic input field in CalculatorDetail.tsx
- [ ] 2. Fix the second input (v2) section - Update the input field layout to use flex instead of negative margins
- [ ] 3. Test the changes to verify proper alignment

### Problem Identified:
- Input field className: `bg-transparent w-12 min-w-[48px] outline-none border-none p-0 focus:ring-0 text-right appearance-none -ml-[25px]`
- The negative margin (-ml-[25px]) causes layout issues when input is empty
- The % suffix positioning is not consistent

### Solution:
- Use a more robust flex layout that positions the input and % suffix properly
- Remove negative margins that cause layout shifts
- Ensure consistent width and alignment
