_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[11],{Aa4Q:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/notes/_NotesLayout",function(){return n("W/f2")}])},Ff2n:function(e,t,n){"use strict";function r(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}n.d(t,"a",(function(){return r}))},"W/f2":function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return s}));var r=n("wx14"),o=n("Ff2n"),i=n("q1tI"),a=n.n(i),c=n("h7RS"),u=n("hbF/"),l=a.a.createElement;function s(e){var t=e.children,n=e.notesStructure,a=void 0===n?[]:n,s=Object(o.a)(e,["children","notesStructure"]),f=Object(i.useState)(!1),p=f[0],b=f[1];return l(c.a,s,l("div",{className:"flex justify-between w-full relative overflow-hidden h-full"},l("div",{className:"pl-2 flex-none h-full overflow-y-auto w-96 ".concat(p?"ml-0":"-ml-96"," md:ml-0 transition-all")},a.map((function(e){return l(u.a,Object(r.a)({},e,{key:e.filePath}))}))),l("div",{className:"p-2 flex-1 w-32 overflow-y-auto"},t),l("button",{onClick:function(){return b((function(e){return!e}))},className:"flex md:hidden fixed bottom-0 right-0 mb-20 mr-20 items-center justify-center px-8 py-3 border border-transparent font-medium text-2xl rounded-md text-white bg-indigo-600 hover:bg-indigo-700"},p?"Less":"More")))}},"hbF/":function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.d(t,"a",(function(){return d}));var o=n("wx14"),i=n("q1tI"),a=n.n(i),c=n("YFqc"),u=n.n(c),l=n("vkGv"),s=n.n(l),f=n("nOHt"),p=a.a.createElement;function b(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function d(e){var t=e.children,n=e.name,a=e.path,c=e.slug,l=Object(f.useRouter)(),y=Object(i.useState)(function e(t,n){var o=t.path,i=t.children;if(0==i.length)return m(o.split("\\").filter(Boolean),n.split("/").filter(Boolean));return i.some((function(t){return e(function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?b(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):b(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},t),n)}))}({path:a,children:t},l.asPath)),h=y[0],v=y[1],g=m(a.split("\\").filter(Boolean),l.asPath.split("/").filter(Boolean)),O="flex justify-between items-center font-medium rounded-r-lg overflow-hidden p-4 cursor-pointer mb-0";return 0==t.length?p(u.a,{href:"/".concat(a)},p("p",{className:"".concat(O," ").concat(g?"opacity-100 bg-gray-400 bg-opacity-20":"opacity-80"," hover:opacity-100")},n)):p("div",null,p("div",{className:"".concat(O," opacity-90 hover:opacity-100")},p("p",{className:"m-0"},p("strong",null,n)),p("button",{onClick:function(){return v((function(e){return!e}))},className:s.a.button},h?"\ud83d\udc47":"\ud83d\udc49")),h&&p("ul",{className:"m-0"},t.map((function(e){return p("li",{key:e.path,className:"m-0 border-l-4 border-solid border-gray-400 border-opacity-20"},p(d,Object(o.a)({},e,{slug:c})))}))))}function m(e,t){if(e.length!==t.length)return!1;for(var n=0;n<e.length;n++)if(e[n]!==t[n])return!1;return!0}},vkGv:function(e,t,n){e.exports={button:"NestedDirectoryNavigation_button__2h7BY",nameDisplay:"NestedDirectoryNavigation_nameDisplay__1axav",notesList:"NestedDirectoryNavigation_notesList__3fkug"}}},[["Aa4Q",0,2,1,3]]]);