_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[9],{"1zUA":function(t,e,n){"use strict";n.d(e,"a",(function(){return i}));var r=n("q1tI"),o=n.n(r),u=n("YFqc"),c=n.n(u),a=o.a.createElement;function i(t){var e=t.filePath,n=t.data;return a("div",null,a(c.a,{as:"/".concat(e),href:"/notes/[slug]"},a("a",null,a("strong",null,n.title))),a("p",null,a("small",null,e.replace(/\\/g," > "))))}},Ff2n:function(t,e,n){"use strict";function r(t,e){if(null==t)return{};var n,r,o=function(t,e){if(null==t)return{};var n,r,o={},u=Object.keys(t);for(r=0;r<u.length;r++)n=u[r],e.indexOf(n)>=0||(o[n]=t[n]);return o}(t,e);if(Object.getOwnPropertySymbols){var u=Object.getOwnPropertySymbols(t);for(r=0;r<u.length;r++)n=u[r],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(o[n]=t[n])}return o}n.d(e,"a",(function(){return r}))},"W/f2":function(t,e,n){"use strict";n.r(e),n.d(e,"default",(function(){return f}));var r=n("wx14"),o=n("Ff2n"),u=n("q1tI"),c=n.n(u),a=n("h7RS"),i=n("hbF/"),l=c.a.createElement;function f(t){var e=t.children,n=t.notesStructure,c=void 0===n?[]:n,f=Object(o.a)(t,["children","notesStructure"]),s=Object(u.useState)(!1),p=s[0],d=s[1];return l(a.a,f,l("div",{className:"flex justify-between w-full relative overflow-hidden h-full"},l("div",{className:"pl-2 flex-none h-full overflow-y-auto w-96 ".concat(p?"ml-0":"-ml-96"," md:ml-0 transition-all")},c.map((function(t){return l(i.a,Object(r.a)({},t,{key:t.filePath}))}))),l("div",{className:"p-2 flex-1 w-32 overflow-y-auto"},e),l("button",{onClick:function(){return d((function(t){return!t}))},className:"flex md:hidden fixed bottom-0 right-0 mb-20 mr-20 items-center justify-center px-8 py-3 border border-transparent font-medium text-2xl rounded-md text-white bg-indigo-600 hover:bg-indigo-700"},p?"Less":"More")))}},XkoN:function(t,e,n){"use strict";n.r(e),n.d(e,"__N_SSG",(function(){return i})),n.d(e,"default",(function(){return l}));var r=n("q1tI"),o=n.n(r),u=n("W/f2"),c=n("1zUA"),a=o.a.createElement,i=!0;function l(t){var e=t.notes,n=t.notesStructure;return a(u.default,{title:"Notes",notesStructure:n},a("ul",{className:"mx-auto p-4"},e.map((function(t){return a("li",{key:t.filePath},a(c.a,t))}))))}},"hbF/":function(t,e,n){"use strict";function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}n.d(e,"a",(function(){return b}));var o=n("wx14"),u=n("q1tI"),c=n.n(u),a=n("YFqc"),i=n.n(a),l=n("vkGv"),f=n.n(l),s=n("nOHt"),p=c.a.createElement;function d(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function b(t){var e=t.children,n=t.name,c=t.path,a=t.slug,l=Object(s.useRouter)(),h=Object(u.useState)(function t(e,n){var o=e.path,u=e.children;if(0==u.length)return m(o.split("\\").filter(Boolean),n.split("/").filter(Boolean));return u.some((function(e){return t(function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?d(Object(n),!0).forEach((function(e){r(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):d(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}({},e),n)}))}({path:c,children:e},l.asPath)),v=h[0],y=h[1],g=m(c.split("\\").filter(Boolean),l.asPath.split("/").filter(Boolean)),w="flex justify-between items-center font-medium rounded-r-lg overflow-hidden p-4 cursor-pointer mb-0";return 0==e.length?p(i.a,{href:"/".concat(c)},p("p",{className:"".concat(w," ").concat(g?"opacity-100 bg-gray-400 bg-opacity-20":"opacity-80"," hover:opacity-100")},n)):p("div",null,p("div",{className:"".concat(w," opacity-90 hover:opacity-100")},p("p",{className:"m-0"},p("strong",null,n)),p("button",{onClick:function(){return y((function(t){return!t}))},className:f.a.button},v?"\ud83d\udc47":"\ud83d\udc49")),v&&p("ul",{className:"m-0"},e.map((function(t){return p("li",{key:t.path,className:"m-0 border-l-4 border-solid border-gray-400 border-opacity-20"},p(b,Object(o.a)({},t,{slug:a})))}))))}function m(t,e){if(t.length!==e.length)return!1;for(var n=0;n<t.length;n++)if(t[n]!==e[n])return!1;return!0}},vkGv:function(t,e,n){},wv94:function(t,e,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/notes",function(){return n("XkoN")}])}},[["wv94",0,2,1,3]]]);