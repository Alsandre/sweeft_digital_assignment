# Sweeft Digital Stage II Assignment

### Short summary

photo gallery with two pages main and history, caching for search terms, photo preview, implementing unsplash API, rendering photos with infinite scroll functionality

### Notice

- Do not use third party libraries like: mui, bootstrap ...
- Use Typescript
- Write infinite scroll from scratch

### Self-notes V_01

- pages:
  - main
  - history
- components:
  - input _for searching_
  - modal preview _for displaying image, with statistics_
  - history list _to render saved search terms_
  - image list _to render list of images_
- hooks:
  - fetching _to extract business logic from components_
- utils:
  - query builder _as I have checked, unsplash provides different endpoints for tasks at hand, so we need to update URL logically_
  - storage manager _we will utilize local storage for long term caching, and having functionality to clear history would be nice, so extracting storage management logics seems reasonable_
- state:
  - local state _at first glancce having local states should be sufficient, since there is not a complext hierarchy and no deep nesting_
  - global state \_using global state (redux i.e), is an option, it would make code more clean at glance. but logic could get complicated. I will decide on it later.
- layout:
  - single layout element for both pages
