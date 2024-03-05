# ~~Sweeft Digital Stage II - Assignment~~

# Infinite Scroll for Image API

### Short summary

~~photo gallery with two pages main and history, caching for search terms, photo preview, implementing unsplash API, rendering photos with infinite scroll functionality~~
Although this project was part of the Sweeft digital assignment, I could not take it to my desired output in given time. So on this branch I'll try to apply finishing touches.

## ~~The assignment requirements~~

1. [x] The application should have two pages `Main` and `History`
2. [x] The `Main` page renders 20 most popular images
3. [x] At `Main` page should be available input of type text, with name "search", without `search` button. Upon typing text, re-render images list based on search term.
4. [x] Implement caching.
5. [x] At `History` page render list of search queries, for which user requested images. Upon clicking on list entry, render list of related images
6. [x] Render list of images using "infinite scroll", both at home and history pages.
7. [x] When clicked on image, open modal overlay and display full image as well as downloads, views and likes amounts
8. [x] use unsplashAPI

- [x] _**note1**: Do not use component libraries_
- [x] _**note2**: Write infinite scroll from scratch_
- [x] _**note3**: Use Typescript_

## Requirements

1. `InfiniteScroll` component accepting `term` as property, renders results from unsplashAPI for given term
2. The component has caching mechanism, utilising local storage and in-memory storage for optimisation purposes.
3. Each image rendered by component opens preview modal upon clicking, where preview of image is rendered with unsplash statistics for given image.

### Technologies and Project structure

#### Technologies:

- `Vite` - Build tool
- `React` - UI library
- `Typescript` - Programming language
- ~~`Redux` - State management tool~~
- ~~`RTK` - Tools kit for working with Redux~~

#### Directory structure:

```
.
├── components/
│   ├── popularImages/
│       ├─ PopularImages.tsx      # fetches &  renderes 20 most popular image
│   ├── searchBar/
│       ├─ searchBar.tsx
│   ├── InfiniteScroll/
│       ├─ InfiniteScroll.tsx     # scroll layout
│       ├─ ImagePreview.tsx
│       ├─ ImageList.tsx
│       ├─ ImageCard.tsx
├── hoooks/
│   ├─ useInfiniteScroll.tsx      # infinite scroll business logic
├── layout/
│   ├─ Layout.tsx               
├── pages/
│   ├── history/
│       ├─ HistoryPage.tsx
│   ├── home/
│       ├─ HomePage.tsx
├── services                      # queries
│   ├─ unsplashPupularImages.ts   
│   ├─ unsplashSearch.ts
│   ├─ unsplashStats.ts
├─ main.tsx
├─ App.tsx
├─ Routes.tsx
├─ types.ts
```

### Instructions

```bash
  git clone https://github.com/Alsandre/sweeft_digital_assignment.git sweeft_digital_assignment
  cd sweeft_digital_assignment
  npm install
  npm run dev
```

- This will clone repository into `sweeft_digital_assignment` directory
- Install all necessary dependencies
- run development server, default port: `5173`
- access `localhost:5173` in web browser, to view the project
