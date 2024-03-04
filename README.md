# Sweeft Digital Stage II - Assignment

### Short summary

photo gallery with two pages main and history, caching for search terms, photo preview, implementing unsplash API, rendering photos with infinite scroll functionality

## The assignment requirements

1. [x] The application should have two pages `Main` and `History`
2. [x] The `Main` page renders 20 most popular images
3. [x] At `Main` page should be available input of type text, with name "search", without `search` button. Upon typing text, re-render images list based on search term.
4. [x] Implement caching.
5. [x] At `History` page render list of search queries, for which user requested images. Upon clicking on list entry, render list of related images
6. [ ] Render list of images using "infinite scroll", both at home and history pages.
7. [x] When clicked on image, open modal overlay and display full image as well as downloads, views and likes amounts
8. [x] use unsplashAPI

- [x] _**note1**: Do not use component libraries_
- [x] _**note2**: Write infinite scroll from scratch_
- [x] _**note3**: Use Typescript_

### Technologies and Project structure

#### Technologies:

- `Vite` - Build tool
- `React` - UI library
- `Typescript` - Programming language
- `Redux` - State management tool
- `RTK` - Tools kit for working with Redux

#### Directory structure:

- components/
  - imageList/
  - imagePreview/
  - popularImages/
  - searchBar/
- layout/
  - Layout
- pages/
  - history/
  - home/
- store/
  - store
  - historySlice
  - unsplashApi
- utils/
  - parseData
- main
- App
- Routes
- types

### Instructions

```bash
  git clone https://github.com/Alsandre/sweeft_digital_assignment.git sweeft_digital_assignment
  cd sweeft_digital_assignment
  npm install
  npm run dev
```

- This will clone repository into `sweeft_digital_assignment` directory
- Install all necessary dependencies
- add .env file into root of the project with `VITE_REACT_APP_CLIENT_ID=[your-unsplash-API-key]`
- run development server, default port: `5173`
- access `localhost:5173` in web browser, to view the project
  
_if you dont have API key, register [here](https://unsplash.com/join) and follow instructions to create project and get the key_
