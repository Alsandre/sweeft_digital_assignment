import{r as t,E as h,s as A,j as d,a as p,I as R}from"./index-BTGIu1SB.js";const y=r=>{const[s,n]=t.useState([]),[S,i]=t.useState([]),[o,a]=t.useState(0),[u,f]=t.useState(!1),[g,T]=t.useState(!0),[m,l]=t.useState(null);return t.useEffect(()=>{const I=localStorage.getItem(h.SAVED_STORAGE)!==null?JSON.parse(localStorage.getItem(h.SAVED_STORAGE)):null,c=I?I[r]:null;if(c&&i(c),g&&c){console.log("isFirstRender && termDataFromStorage");const e=c.slice(0,20);n(e),a(1)}else g?(console.log("isFirstRender"),E(),a(1)):s.length<S.length&&o!==1?(console.log("scrollableData.length < cachedData.length"),n(S.slice(0,o*20))):o!==1&&(console.log("effect else block"),E());async function E(){f(!0);try{const e=await A(r,o);console.log("fetching"),console.log(e),e.status==="ok"?n(x=>{const O=[...x,...e.imageList],D=localStorage.getItem(h.SAVED_STORAGE),F=D?JSON.parse(D):{};return F[r]=O,localStorage.setItem(h.SAVED_STORAGE,JSON.stringify(F)),O}):(console.error(e.error),l(e.error))}catch(e){console.error(e.message),l(e.message)}finally{f(!1)}}return console.log("pI:",o),console.log("^^^^^========^^^^^"),T(!1),()=>console.log("effect CleanUp")},[o,r]),{scrollableData:s,error:m,isFetching:u,setPageIndex:a}},L=40,_=300,C=({term:r})=>{const s=t.useRef(null),[n,S]=t.useState(!1),{scrollableData:i,setPageIndex:o,isFetching:a,error:u}=y(r),[f,g]=t.useState(!1),T=l=>{if(S(l.currentTarget.scrollTop>_),!a&&g(!1),f)return;l.currentTarget.scrollHeight-L<l.currentTarget.scrollTop+l.currentTarget.clientHeight&&(console.log("scroll"),o(c=>c+1),g(!0))},m=()=>{s!=null&&s.current&&s.current.scrollTo({top:0,left:0,behavior:"smooth"})};return d.jsxs("div",{ref:s,onScroll:T,className:p.container,children:[u&&`<span>Error! message: ${u}!`,i.length>0&&d.jsxs("ul",{children:[i.length>0&&d.jsx(R,{imageList:i}),a&&"Loading..."]}),d.jsx("button",{onClick:m,className:`${p["back-to-top"]} ${n&&p["fade-in"]}`,children:"BACK TO TOP"})]})};export{C as default};
