/*! For license information please see 635.576d123e.chunk.js.LICENSE.txt */
"use strict";(self.webpackChunke_commerce_website=self.webpackChunke_commerce_website||[]).push([[635],{635:(e,s,t)=>{t.r(s),t.d(s,{default:()=>d});var l=t(5043),a=t(3003),i=t(7638),r=t(3182),c=t(2115),n=t(2266),o=t(579);const d=function(){const e=localStorage.getItem("currentPage"),s=localStorage.getItem("searchQuery"),[t,d]=(0,l.useState)(e?parseInt(e):1),[m,u]=(0,l.useState)(s||""),h=(0,a.d4)(i.Dt.selectAll),{loading:x}=(0,a.d4)((e=>e.products)),v=(0,a.wA)();(0,l.useEffect)((()=>{localStorage.setItem("currentPage",t),localStorage.setItem("searchQuery",m),v((0,i.j0)(t))}),[t,v,m]);const p=e=>{e>0&&d(e)},g=(0,l.useMemo)((()=>m?[...h].filter((e=>e.category.name.toLowerCase().includes(m.toLowerCase())||e.title.toLowerCase().includes(m.toLowerCase()))):1===t?h.slice(0,40):h.slice(40)),[h,m,t]);return(0,o.jsxs)("section",{className:"allProducts products mt-all py-5",children:[(0,o.jsx)(c.N9,{}),(0,o.jsxs)("div",{className:"container",children:[(0,o.jsx)("div",{className:"row mt-4",children:(0,o.jsxs)("div",{className:"col-12 d-flex gap-5 align-items-center",children:[(0,o.jsx)("h2",{className:"text-success",children:"All Products"}),(0,o.jsx)("div",{className:" flex-grow-1",children:(0,o.jsx)("input",{type:"text",className:"form-control",id:"exampleFormControlInput1",placeholder:"Search by category...",onChange:e=>u(e.target.value),value:m})})]})}),(0,o.jsx)("div",{className:"row mt-5 d-flex justify-content-center",children:(0,o.jsx)("div",{className:"col-12 ",children:(0,o.jsx)("nav",{"aria-label":"Page navigation example",children:(0,o.jsxs)("ul",{className:"pagination m-0",children:[(0,o.jsx)("li",{className:"page-item "+(1===t?"disabled":""),children:(0,o.jsx)("button",{className:"page-link","aria-label":"Previous",onClick:()=>p(t-1),children:(0,o.jsx)("span",{"aria-hidden":"true",children:"Previous"})})}),[1,2].map((e=>(0,o.jsx)("li",{className:"page-item "+(t===e?"active":""),children:(0,o.jsx)("button",{className:"page-link",onClick:()=>p(e),children:e})},e))),(0,o.jsx)("li",{className:"page-item "+(t>=2?"disabled":""),children:(0,o.jsx)("button",{className:"page-link",onClick:()=>p(t+1),"aria-label":"Next",children:(0,o.jsx)("span",{"aria-hidden":"true",children:"Next"})})})]})})})}),(0,o.jsx)("div",{className:"row mt-3",children:x?Array.from({length:8}).map(((e,s)=>(0,o.jsx)(n.A,{},s+1))):g.length>0?g.map((e=>(0,o.jsx)(r.A,{product:e},null===e||void 0===e?void 0:e._id))):(0,o.jsx)("h3",{className:"text-center p-3",children:"No products found."})})]})]})}},2266:(e,s,t)=>{t.d(s,{A:()=>a});t(5043);var l=t(579);const a=function(){return(0,l.jsx)("div",{className:"skeleton-item col-12 col-sm-6 col-md-4 col-xl-3 mt-5",children:(0,l.jsxs)("div",{className:"card p-3 rounded-2",children:[(0,l.jsx)("div",{className:"skeleton h-200 w-100 mb-3 rounded-2 bg-light"}),(0,l.jsx)("div",{className:"skeleton h-20 w-75 mb-2 rounded-2 bg-light"}),(0,l.jsx)("div",{className:"skeleton h-20 w-50 mb-2 rounded-2 bg-light"}),(0,l.jsx)("div",{className:"skeleton h-20 w-100 mb-2 rounded-2 bg-light"})]})})}},3182:(e,s,t)=>{t.d(s,{A:()=>h});var l=t(5043),a=(t(6217),t(1675)),i=t(7439),r=t(6509),c=t(3003),n=t(7034),o=t(2115),d=t(2186),m=t(579);function u(e){var s;let{product:t,slider:u}=e;const{addProductToCartloadingIds:h}=(0,c.d4)((e=>e.cart)),{wishlistLoadingIds:x}=(0,c.d4)((e=>e.wishlist)),v=(0,l.useMemo)((()=>x.includes(null===t||void 0===t?void 0:t._id)),[null===t||void 0===t?void 0:t._id,x]),p=(0,l.useMemo)((()=>h.includes(null===t||void 0===t?void 0:t._id)),[null===t||void 0===t?void 0:t._id,h]),g=(0,a.Zp)(),f=(0,c.wA)(),j=Math.floor(null===t||void 0===t?void 0:t.ratingsAverage),N=(null===t||void 0===t?void 0:t.ratingsAverage)%1>=.5,w=5-j-N,b=null!==t&&void 0!==t&&t.priceAfterDiscount?Math.floor((t.priceAfterDiscount-t.price)/t.price*100):null,y=async(e,s)=>{try{const l=await f(e(t._id)).unwrap();o.oR.success(l.message||s,{position:"top-center"})}catch(l){g("/login"),setTimeout((()=>{o.oR.error(l||"You are not logged in. Please login to get access",{position:"top-center"})}),500)}};return(0,m.jsx)("div",{className:"col-12 col-sm-6 col-md-4 col-xl-3 mt-5 "+(u?"w-100":""),children:(0,m.jsxs)("div",{className:"best-sellers product-item transition border-1  card rounded-2 position-relative",children:[b?(0,m.jsxs)("div",{className:"sale d-flex align-items-center justify-content-center bg-danger px-3 py-2 rounded-2 text-white fw-medium position-absolute",children:[b,"%"]}):null,(0,m.jsxs)("div",{className:"product-action transition d-flex position-absolute flex-column gap-2",children:[(0,m.jsx)("button",{title:"Quick View",className:"btn transition shadow-sm",children:(0,m.jsx)("i",{className:"ri-eye-line"})}),(0,m.jsx)("button",{onClick:()=>y(d.tm,"Added to wishlist successfully!"),title:"wishList",className:"btn transition",children:(0,m.jsx)("i",{className:"ri-heart-line  d-block "+(v?"active-heart":"")})})]}),(0,m.jsx)("div",{className:"product-image  w-100",onClick:()=>g(`/productDetails/${t._id}`),children:(0,m.jsx)("img",{src:t.imageCover,className:"w-100 h-100 object-fit-contain",alt:t.title,loading:"lazy"})}),(0,m.jsxs)("div",{className:"card-body p-3",children:[(0,m.jsx)("h4",{className:"text-success",children:null===t||void 0===t||null===(s=t.category)||void 0===s?void 0:s.name}),(0,m.jsx)("span",{title:null===t||void 0===t?void 0:t.title,className:"fw-medium product-title text-black text-truncate d-block  ",children:null===t||void 0===t?void 0:t.title}),(0,m.jsx)(i.A,{product:t,fullStar:j,halfStar:N,emptystar:w}),(0,m.jsxs)("div",{className:"price mt-4 d-flex justify-content-between align-items-center",children:[null!==t&&void 0!==t&&t.priceAfterDiscount?(0,m.jsxs)("div",{className:"d-flex align-items-center",children:[(0,m.jsxs)("p",{className:"text-danger fw-bold  m-0",children:["$",t.priceAfterDiscount]}),(0,m.jsxs)("p",{className:"text-secondary text-decoration-line-through fw-small ms-1 m-0",children:["$",t.price]})]}):(0,m.jsxs)("span",{className:"text-danger fw-bold me-1",children:["$",null===t||void 0===t?void 0:t.price]}),(0,m.jsx)("span",{className:"stock fw-medium "+((null===t||void 0===t?void 0:t.quantity)>0?"text-success":"text-danger"),children:(null===t||void 0===t?void 0:t.quantity)>0?"IN STOCK":"Out Of Stock"})]}),(0,m.jsxs)("button",{onClick:()=>y(r.Rv,"Added to cart successfully!"),className:"btn transition btn-success mt-4 fw-bold w-100 rounded-2 add-to-cart",children:["Add To Cart ",p&&(0,m.jsx)(n.A,{color:"#69ca46",size:10})]})]})]})})}const h=l.memo(u)},6136:(e,s,t)=>{t.d(s,{A:()=>c});var l=t(5043);const a=function(){for(var e=arguments.length,s=new Array(e),t=0;t<e;t++)s[t]=arguments[t];return s.filter(((e,s,t)=>Boolean(e)&&""!==e.trim()&&t.indexOf(e)===s)).join(" ").trim()};var i={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};const r=(0,l.forwardRef)(((e,s)=>{let{color:t="currentColor",size:r=24,strokeWidth:c=2,absoluteStrokeWidth:n,className:o="",children:d,iconNode:m,...u}=e;return(0,l.createElement)("svg",{ref:s,...i,width:r,height:r,stroke:t,strokeWidth:n?24*Number(c)/Number(r):c,className:a("lucide",o),...u},[...m.map((e=>{let[s,t]=e;return(0,l.createElement)(s,t)})),...Array.isArray(d)?d:[d]])})),c=((e,s)=>{const t=(0,l.forwardRef)(((t,i)=>{let{className:c,...n}=t;return(0,l.createElement)(r,{ref:i,iconNode:s,className:a(`lucide-${o=e,o.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,c),...n});var o}));return t.displayName=`${e}`,t})("Star",[["path",{d:"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",key:"r04s7s"}]])},6217:()=>{},7439:(e,s,t)=>{t.d(s,{A:()=>i});var l=t(6136),a=(t(5043),t(579));const i=function(e){let{product:s,fullStar:t,halfStar:i,emptystar:r}=e;return(0,a.jsxs)("div",{className:"reviews d-flex align-items-center  mt-3",children:[(0,a.jsxs)("div",{className:"rate d-flex align-items-center",children:[Array.from({length:t}).map(((e,s)=>(0,a.jsx)(l.A,{className:"w-5 h-5 fill-current text-warning",fill:"currentColor"},`full-${s}`))),i&&(0,a.jsxs)("div",{className:"position-relative m-0 overflow-hidden",children:[(0,a.jsx)(l.A,{className:"w-5 h-5 fill-current text-secondary overflow-hidden"}),(0,a.jsx)("div",{className:"half-star text-warning",children:(0,a.jsx)(l.A,{className:"w-5 h-5",fill:"currentColor"})})]}),Array.from({length:r}).map(((e,s)=>(0,a.jsx)(l.A,{className:"w-5 h-5 text-secondary"},`empty-${s}`))),(0,a.jsx)("span",{className:"ms-2 text-secondary",children:s.ratingsAverage})]}),(0,a.jsxs)("span",{className:"reviewer fw-medium  text-secondary text-success",children:["(",s.ratingsQuantity,")"]})]})}}}]);
//# sourceMappingURL=635.576d123e.chunk.js.map