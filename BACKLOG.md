#### infinity scroll

Here is a choice that needs to be made. The task is to implement infinite scroll for both pages but it is not said should we implement scroll for popular images as well?<br>
If I decide to implement it for both cases (popular and searched) it gets a bit more complicated building custom hook that would cover both cases in scalable manner with clean, sustained and maintainable code. <br>This seems like self-assignment that is achievable, but in this case I guess it's not necessary.<br>So I'll be implementing hook that will manage state of scrollable data queried by search term.

#### infinite scroll logic

- To implement infinite scroll I consider two API options: IntersectionObserver and Scroll. IntersectionObserver is modern technique, using which I can detect when a particular element comes into view<br>I would save reference for the last element rendered and check when it comes into view, this solution is more robust IMO.<br> On the other hand I can leverage Scroll API where I need to monitor scrollTop height and innerHeight and compare it to offsetHeight calculating when scrolling reached the end,<br> this implementation requires fixed height to have scroll and particular measurements of the properties.
  <br>
- I think IntersectionObserver will be more elegent and robust
  <br>
- **Note**: when I uptade scrollabledata setter to a function version, where I use previous state to set new state (that was to make sure that when new pages are fetched old ones wont be discarded) <br>
  when React strict mode is on it has a mechanism that would re-mount component for stress testing, this in current scenario turns into reFetching the data, and merging two versions of same data.<br>ofcourse with current setup it is guaranteed that second fetch wont happen unless page index is updated, but because of stress test we have got double key values<br>since we use id of the image which is guaranteed to be unique, but we got image repetition hence id is repeated. one way would be to implement different value for keys, but I would consider this as inappropriate handling of the situation<br>we dont wish for image duplications anyway, so I'll add logic that will prevent final array from having duplicates
- I have built infinite scroll with different approaches focusing on intersection observer, I have got working logic but with edge cases that needs to be fixed
- since there are other functionalities that yet needs to be implemented, i prefer to halt development of this functionality
- I have finished working version of infinite scroll using element height and scroll event
- In general itersection observer api provides more control and seems to be more scalable in regards of ui.
- current edge case seems solveable, it's just time factor. since a solution is better than no solution.
- since rtk provides caching built in and also requesting stats for image preview cant be so intense to stress network. there is no need for storing fetched data.
- search term is required for fetching and rendering images on home page and but is available from search bar component, aside from those two no other part of the application requires access to current term
- nevertheless saved term will be consumed by home page and history page and might be required in search bar component for validating data before caching
- so since search bar is present only at home page I'll be lifting state up in parent and sharing
- I was wondering how to manage history, there are quite a few pssible appraches
- first we need to distinguish where to it belongs, we need access to history when first time fetching or when scrolling down or when rendering list of searcher terms
- the term that is going to be stored in history needs to be validated
- that means that for us t decide whether terms belongs in history or not we need to have access to the response for that term
- so logically following, we can move that logic into api call
- the logic is simple to make call we need access to the term, and since we are making call response can be waited for.
- note: _when component mounts useQuery-s are fired resulting in unnecessary requests. this behaviour can be solved using {skip: boolean} optional argument to useQuery_
- history is all setup
- saving data in local storage seems reasonable decision, so that history page will not be depending on current state only, which wont persist on reload
- we need to define two points, one when to update local storage, and second, when to update from local storage
- first: it is logical that history state shares data with local storage, so setting localStorage while updating state seems reasonable
- second: global state is required as soon as application starts, so on App mount seems reasonable place to sync global state with local storage
- there is too much noise in response, parsing necessary data only seems reasonable
- the requested data is cleared using utility function
- useQuery does have selectFromResult this is where we parse data for component
- and in API where we update state we also parse data so we have same signature globally
- validation of response. if result does not have entries, we notify user, and does not save term into history.
- when new search term is generated we update state of home page which results in fetching data, we are to update search term only if there is no saved data for term
- currently rtk already provides caching mechanism 
- but it makes call to endpoint to get collection anyway and based on result it wont refetch images if already fetched
- I need to restrict request alltogether if term is saved already
- this means that search term that is read from seachBar is first checked against history, and if no entries found in history, then we make call to endpoint for new collection
- on the other hand if we have saved more then 1 page we need to render 1 page only and render rest of pages if scrolled down to bottom
- fixed for rtk cache, upon changing query, reset page to 1