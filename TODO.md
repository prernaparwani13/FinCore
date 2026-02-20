# TODO - Donut Chart Debounce Implementation

## Task
Debounce the Donut chart state updates to wait until the user stops moving the slider for a few milliseconds before updating the chart.

## Plan
- [x] Read and understand the current implementation in CalculatorDetail.tsx
- [ ] Add debounced state variables for slider values
- [ ] Create debounce effect using useEffect with setTimeout (300ms)
- [ ] Update calculations to use debounced values instead of direct values
- [ ] Test the implementation

## Implementation Details
1. Add debounced state: debouncedV1, debouncedV2, debouncedV3, debouncedV4, debouncedV5
2. Add useEffect that debounces value updates with 300ms delay
3. Use debounced values for ratio calculations
4. Keep direct values for slider display (for responsive UI)
