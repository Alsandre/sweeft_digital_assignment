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
