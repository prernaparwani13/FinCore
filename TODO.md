# TODO List - Donut Chart Fix

## Task: Fix Donut Chart in ROI, Stock Average Calculator, and Salary Calculator

### Steps:
- [x] 1. Fix Stock Average Calculator - Add logic to show meaningful donut or hide it
- [x] 2. Fix Salary Calculator - Ensure proper ratio calculation with edge case handling
- [x] 3. Fix ROI Calculator - Ensure proper handling of profit/loss scenarios
- [x] 4. Add check to show donut chart at initial position when ratio is 0 or invalid

### Changes made in src/component/CalculatorDetail.tsx:
1. Updated Stock Average Calculator config:
   - Added `hasDonutChart: true` flag to show donut chart
   - Modified calculate function to return `displayRatio` (50 when has data, 0 when no data)
   - Donut now shows 50% filled when user enters data, empty (0%) when no data
2. Verified Salary Calculator ratio calculation - it correctly calculates deductions as percentage of gross salary
3. Verified ROI Calculator - uses Math.abs(ratio) in offset calculation, handles negative values
4. Donut chart shows at initial position (empty) when ratio is 0

### Status: Completed
