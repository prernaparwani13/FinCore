# TODO List

## Task: Move logo slightly left on calculator pages

### Steps:
- [ ] 1. Modify `src/component/Navbar.tsx` to add conditional margin-left for the logo
  - [ ] Add logic to check if current route is a calculator page (path starts with `/calculator` or `/category`)
  - [ ] Apply margin-left: -19px to the logo container when on calculator pages
  - [ ] Keep normal styling on home page (`/`)
