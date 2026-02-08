# TODO: Implement Calculator Card Visibility on Back Navigation

## Steps to Complete:
- [x] Edit `src/pages/Calculators.tsx` to save `lastSelectedCalc` to localStorage on click, load it on mount, and check for 'currentPage' === 'detail' to set `cameFromDetail`.
- [x] Edit `src/pages/CalculatorDetailPage.tsx` to set 'currentPage' to 'detail' in localStorage on mount.
- [x] Test navigation using both back button and browser back to ensure the card is visible.
- [x] Undo changes as requested by user.
