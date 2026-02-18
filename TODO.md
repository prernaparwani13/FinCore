# TODO: Convert all suffixes to prefixes in CalculatorDetail.tsx

## Task
All Input field prefixes/suffixes should be aligned on the LEFT side (prefixes). Currently some inputs have suffixes like "%", "YRS", "Yr" which need to be converted to prefixes.

## Changes Needed

### 1. Second Input Section (label2)
- Current: suffix "%" or "YRS" or "Yr"
- Change to: prefix "%" or "YRS" or "Yr"

### 2. Third Input Section (label3)
- Current: suffix "Yrs", "%" 
- Change to: prefix "YRS", "%"

### 3. Fourth Input Section (label4)
- Current: suffix "%" for EPF, "Yrs" for SWP
- Change to: prefix "%", "YRS"

### 4. Fifth Input Section (label5)
- Already has prefix, should be fine

## Files to Edit
- src/component/CalculatorDetail.tsx - Convert suffixes to prefixes in multiple input sections

## Follow-up Steps
- Test the changes in browser to verify all prefixes appear on the left
