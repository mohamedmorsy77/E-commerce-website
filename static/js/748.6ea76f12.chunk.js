/*! For license information please see 748.6ea76f12.chunk.js.LICENSE.txt */
"use strict";(self.webpackChunke_commerce_website=self.webpackChunke_commerce_website||[]).push([[748],{13:(e,t,s)=>{s.d(t,{W:()=>n});var i=s(5043),r=s(78);const a={some:0,all:1};function n(e){let{root:t,margin:s,amount:n,once:l=!1,initial:o=!1}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const[c,d]=(0,i.useState)(o);return(0,i.useEffect)((()=>{if(!e.current||l&&c)return;const i={root:t&&t.current||void 0,margin:s,amount:n};return function(e,t){let{root:s,margin:i,amount:n="some"}=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};const l=(0,r.KJ)(e),o=new WeakMap,c=new IntersectionObserver((e=>{e.forEach((e=>{const s=o.get(e.target);if(e.isIntersecting!==Boolean(s))if(e.isIntersecting){const s=t(e.target,e);"function"===typeof s?o.set(e.target,s):c.unobserve(e.target)}else"function"===typeof s&&(s(e),o.delete(e.target))}))}),{root:s,rootMargin:i,threshold:"number"===typeof n?n:a[n]});return l.forEach((e=>c.observe(e))),()=>c.disconnect()}(e.current,(()=>(d(!0),l?void 0:()=>d(!1))),i)}),[t,e,s,l,n]),c}},2748:(e,t,s)=>{s.r(t),s.d(t,{default:()=>d});s(5043);var i=s(1675),r=s(3003),a=s(3182),n=s(9508),l=s(7638),o=s(2115),c=s(579);const d=function(){const{id:e}=(0,i.g)(),t=(0,r.d4)((t=>n.$C.selectById(t,e))),s=(0,r.d4)(l.Dt.selectAll).filter((t=>t.brand._id===e));return(0,c.jsxs)("section",{className:"products specific-category py-5 px-3 mt-all",children:[(0,c.jsx)(o.N9,{}),(0,c.jsxs)("div",{className:"container",children:[(0,c.jsxs)("div",{className:"row",children:[(0,c.jsx)("div",{className:"col-12",children:(0,c.jsx)("div",{className:"brand-image shadow position-relative d-flex align-items-center justify-content-center",children:(0,c.jsx)("img",{src:t.image,className:"h-100 object-fit-contain",alt:t.name})})}),(0,c.jsx)("div",{className:"col-12 mt-4",children:(0,c.jsxs)("h1",{className:"fw-medium text-center",children:[(0,c.jsx)("span",{className:"text-success",children:"Brand Name:"})," ",(0,c.jsx)("span",{children:t.name})]})})]}),(0,c.jsx)("div",{className:"row",children:s.length>0?s.map((e=>(0,c.jsx)(a.A,{product:e,slider:!1},e._id))):(0,c.jsxs)("div",{className:"text-center mt-5 fw-bold fs-2",children:["Sorry , No products by this name for now"," ",(0,c.jsx)("i",{class:"ri-emotion-sad-fill text-warning fs-1"})]})})]})]})}},3182:(e,t,s)=>{s.d(t,{A:()=>x});var i=s(5043),r=s(13),a=s(8169),n=(s(6217),s(1675)),l=s(7439),o=s(6509),c=s(3003),d=s(7034),m=s(2115),u=s(2186),h=s(579);function f(e){var t;let{product:s,slider:f,index:x}=e;const v=(0,i.useRef)(null),p=(0,r.W)(v,{once:!0});console.log(p);const{addProductToCartloadingIds:g}=(0,c.d4)((e=>e.cart)),{wishlistLoadingIds:w}=(0,c.d4)((e=>e.wishlist)),j=(0,i.useMemo)((()=>w.includes(null===s||void 0===s?void 0:s._id)),[null===s||void 0===s?void 0:s._id,w]),N=(0,i.useMemo)((()=>g.includes(null===s||void 0===s?void 0:s._id)),[null===s||void 0===s?void 0:s._id,g]),y=(0,n.Zp)(),b=(0,c.wA)(),A=Math.floor(null===s||void 0===s?void 0:s.ratingsAverage),k=(null===s||void 0===s?void 0:s.ratingsAverage)%1>=.5,C=5-A-k,_=null!==s&&void 0!==s&&s.priceAfterDiscount?Math.floor((s.priceAfterDiscount-s.price)/s.price*100):null,$=async(e,t)=>{try{const i=await b(e(s._id)).unwrap();m.oR.success(i.message||t,{position:"top-center"})}catch(i){y("/login"),setTimeout((()=>{m.oR.error(i||"You are not logged in. Please login to get access",{position:"top-center"})}),500)}};return(0,h.jsx)(a.P.div,{ref:v,initial:{opacity:0,x:50},animate:p?{opacity:1,x:0}:{opacity:0,x:50},transition:{delay:.1*x,ease:"easeIn",duration:.5},className:"col-12 col-sm-6 col-md-4 col-xl-3 mt-5 "+(f?"w-100":""),children:(0,h.jsxs)("div",{className:"best-sellers product-item transition border-1  card rounded-2 position-relative",children:[_?(0,h.jsxs)("div",{className:"sale d-flex align-items-center justify-content-center bg-danger px-3 py-2 rounded-2 text-white fw-medium position-absolute",children:[_,"%"]}):null,(0,h.jsx)("div",{className:"product-action transition d-flex position-absolute flex-column gap-2",children:(0,h.jsx)("button",{onClick:()=>$(u.tm,"Added to wishlist successfully!"),title:"wishList",className:"btn transition",children:(0,h.jsx)("i",{className:"ri-heart-line  d-block "+(j?"active-heart":"")})})}),(0,h.jsx)("div",{className:"product-image  w-100",onClick:()=>y(`/productDetails/${s._id}`),children:(0,h.jsx)("img",{src:s.imageCover,className:"w-100 h-100 object-fit-contain",alt:s.title,loading:"lazy"})}),(0,h.jsxs)("div",{className:"card-body p-3",children:[(0,h.jsx)("h4",{className:"text-success",children:null===s||void 0===s||null===(t=s.category)||void 0===t?void 0:t.name}),(0,h.jsx)("span",{title:null===s||void 0===s?void 0:s.title,className:"fw-medium product-title text-black text-truncate d-block  ",children:null===s||void 0===s?void 0:s.title}),(0,h.jsx)(l.A,{product:s,fullStar:A,halfStar:k,emptystar:C}),(0,h.jsxs)("div",{className:"price mt-4 d-flex justify-content-between align-items-center",children:[null!==s&&void 0!==s&&s.priceAfterDiscount?(0,h.jsxs)("div",{className:"d-flex align-items-center",children:[(0,h.jsxs)("p",{className:"text-danger fw-bold  m-0",children:["$",s.priceAfterDiscount]}),(0,h.jsxs)("p",{className:"text-secondary text-decoration-line-through fw-small ms-1 m-0",children:["$",s.price]})]}):(0,h.jsxs)("span",{className:"text-danger fw-bold me-1",children:["$",null===s||void 0===s?void 0:s.price]}),(0,h.jsx)("span",{className:"stock fw-medium "+((null===s||void 0===s?void 0:s.quantity)>0?"text-success":"text-danger"),children:(null===s||void 0===s?void 0:s.quantity)>0?"IN STOCK":"Out Of Stock"})]}),(0,h.jsxs)(a.P.button,{whileHover:{scale:1.01},whileTap:{scale:.95},onClick:()=>$(o.Rv,"Added to cart successfully!"),className:"btn transition btn-success mt-4 fw-bold w-100 rounded-2 add-to-cart",children:["Add To Cart ",N&&(0,h.jsx)(d.A,{color:"#69ca46",size:10})]})]})]})})}const x=i.memo(f)},6136:(e,t,s)=>{s.d(t,{A:()=>l});var i=s(5043);const r=function(){for(var e=arguments.length,t=new Array(e),s=0;s<e;s++)t[s]=arguments[s];return t.filter(((e,t,s)=>Boolean(e)&&""!==e.trim()&&s.indexOf(e)===t)).join(" ").trim()};var a={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};const n=(0,i.forwardRef)(((e,t)=>{let{color:s="currentColor",size:n=24,strokeWidth:l=2,absoluteStrokeWidth:o,className:c="",children:d,iconNode:m,...u}=e;return(0,i.createElement)("svg",{ref:t,...a,width:n,height:n,stroke:s,strokeWidth:o?24*Number(l)/Number(n):l,className:r("lucide",c),...u},[...m.map((e=>{let[t,s]=e;return(0,i.createElement)(t,s)})),...Array.isArray(d)?d:[d]])})),l=((e,t)=>{const s=(0,i.forwardRef)(((s,a)=>{let{className:l,...o}=s;return(0,i.createElement)(n,{ref:a,iconNode:t,className:r(`lucide-${c=e,c.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,l),...o});var c}));return s.displayName=`${e}`,s})("Star",[["path",{d:"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",key:"r04s7s"}]])},6217:()=>{},7439:(e,t,s)=>{s.d(t,{A:()=>a});var i=s(6136),r=(s(5043),s(579));const a=function(e){let{product:t,fullStar:s,halfStar:a,emptystar:n}=e;return(0,r.jsxs)("div",{className:"reviews d-flex align-items-center  mt-3",children:[(0,r.jsxs)("div",{className:"rate d-flex align-items-center",children:[Array.from({length:s}).map(((e,t)=>(0,r.jsx)(i.A,{className:"w-5 h-5 fill-current text-warning",fill:"currentColor"},`full-${t}`))),a&&(0,r.jsxs)("div",{className:"position-relative m-0 overflow-hidden",children:[(0,r.jsx)(i.A,{className:"w-5 h-5 fill-current text-secondary overflow-hidden"}),(0,r.jsx)("div",{className:"half-star text-warning",children:(0,r.jsx)(i.A,{className:"w-5 h-5",fill:"currentColor"})})]}),Array.from({length:n}).map(((e,t)=>(0,r.jsx)(i.A,{className:"w-5 h-5 text-secondary"},`empty-${t}`))),(0,r.jsx)("span",{className:"ms-2 text-secondary",children:t.ratingsAverage})]}),(0,r.jsxs)("span",{className:"reviewer fw-medium  text-secondary text-success",children:["(",t.ratingsQuantity,")"]})]})}}}]);
//# sourceMappingURL=748.6ea76f12.chunk.js.map