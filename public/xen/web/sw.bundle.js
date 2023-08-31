"use strict";var V=Object.create;var y=Object.defineProperty;var Y=Object.getOwnPropertyDescriptor;var H=Object.getOwnPropertyNames;var K=Object.getPrototypeOf,Q=Object.prototype.hasOwnProperty;var Z=(t,e)=>()=>(t&&(e=t(t=0)),e);var C=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports),I=(t,e)=>{for(var s in e)y(t,s,{get:e[s],enumerable:!0})},z=(t,e,s,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of H(e))!Q.call(t,r)&&r!==s&&y(t,r,{get:()=>e[r],enumerable:!(i=Y(e,r))||i.enumerable});return t};var R=(t,e,s)=>(s=t!=null?V(K(t)):{},z(e||!t||!t.__esModule?y(s,"default",{value:t,enumerable:!0}):s,t)),ee=t=>z(y({},"__esModule",{value:!0}),t);var D=C((v,N)=>{"use strict";Object.defineProperty(v,"__esModule",{value:!0});v.default=void 0;function S(t){"@babel/helpers - typeof";return S=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},S(t)}var x=47,L=46,se=function(e){var s=S(e);if(s!=="string")throw new TypeError("Expected a string, got a ".concat(s))},ie=function(e,s){for(var i="",r=0,a=-1,n=0,l,o=0;o<=e.length;++o){if(o<e.length)l=e.charCodeAt(o);else{if(l===x)break;l=x}if(l===x){if(!(a===o-1||n===1))if(a!==o-1&&n===2){if(i.length<2||r!==2||i.charCodeAt(i.length-1)!==L||i.charCodeAt(i.length-2)!==L){if(i.length>2){var f=i.lastIndexOf("/");if(f!==i.length-1){f===-1?(i="",r=0):(i=i.slice(0,f),r=i.length-1-i.lastIndexOf("/")),a=o,n=0;continue}}else if(i.length===2||i.length===1){i="",r=0,a=o,n=0;continue}}s&&(i.length>0?i+="/..":i="..",r=2)}else i.length>0?i+="/"+e.slice(a+1,o):i=e.slice(a+1,o),r=o-a-1;a=o,n=0}else l===L&&n!==-1?++n:n=-1}return i},te=function(e){try{return decodeURIComponent(e)}catch{return e}},re=function(e){se(e);var s=e;if(s.length===0)return".";var i=s.charCodeAt(0)===x,r=s.charCodeAt(s.length-1)===x;return s=te(s),s=ie(s,!i),s.length===0&&!i&&(s="."),s.length>0&&r&&(s+="/"),i?"/"+s:s},ne=re;v.default=ne;N.exports=v.default});var A=C((we,$)=>{"use strict";function h(t){if(typeof t!="string")throw new TypeError("Path must be a string. Received "+JSON.stringify(t))}function P(t,e){for(var s="",i=0,r=-1,a=0,n,l=0;l<=t.length;++l){if(l<t.length)n=t.charCodeAt(l);else{if(n===47)break;n=47}if(n===47){if(!(r===l-1||a===1))if(r!==l-1&&a===2){if(s.length<2||i!==2||s.charCodeAt(s.length-1)!==46||s.charCodeAt(s.length-2)!==46){if(s.length>2){var o=s.lastIndexOf("/");if(o!==s.length-1){o===-1?(s="",i=0):(s=s.slice(0,o),i=s.length-1-s.lastIndexOf("/")),r=l,a=0;continue}}else if(s.length===2||s.length===1){s="",i=0,r=l,a=0;continue}}e&&(s.length>0?s+="/..":s="..",i=2)}else s.length>0?s+="/"+t.slice(r+1,l):s=t.slice(r+1,l),i=l-r-1;r=l,a=0}else n===46&&a!==-1?++a:a=-1}return s}function ae(t,e){var s=e.dir||e.root,i=e.base||(e.name||"")+(e.ext||"");return s?s===e.root?s+i:s+t+i:i}var g={resolve:function(){for(var e="",s=!1,i,r=arguments.length-1;r>=-1&&!s;r--){var a;r>=0?a=arguments[r]:(i===void 0&&(i=process.cwd()),a=i),h(a),a.length!==0&&(e=a+"/"+e,s=a.charCodeAt(0)===47)}return e=P(e,!s),s?e.length>0?"/"+e:"/":e.length>0?e:"."},normalize:function(e){if(h(e),e.length===0)return".";var s=e.charCodeAt(0)===47,i=e.charCodeAt(e.length-1)===47;return e=P(e,!s),e.length===0&&!s&&(e="."),e.length>0&&i&&(e+="/"),s?"/"+e:e},isAbsolute:function(e){return h(e),e.length>0&&e.charCodeAt(0)===47},join:function(){if(arguments.length===0)return".";for(var e,s=0;s<arguments.length;++s){var i=arguments[s];h(i),i.length>0&&(e===void 0?e=i:e+="/"+i)}return e===void 0?".":g.normalize(e)},relative:function(e,s){if(h(e),h(s),e===s||(e=g.resolve(e),s=g.resolve(s),e===s))return"";for(var i=1;i<e.length&&e.charCodeAt(i)===47;++i);for(var r=e.length,a=r-i,n=1;n<s.length&&s.charCodeAt(n)===47;++n);for(var l=s.length,o=l-n,f=a<o?a:o,u=-1,c=0;c<=f;++c){if(c===f){if(o>f){if(s.charCodeAt(n+c)===47)return s.slice(n+c+1);if(c===0)return s.slice(n+c)}else a>f&&(e.charCodeAt(i+c)===47?u=c:c===0&&(u=0));break}var O=e.charCodeAt(i+c),G=s.charCodeAt(n+c);if(O!==G)break;O===47&&(u=c)}var w="";for(c=i+u+1;c<=r;++c)(c===r||e.charCodeAt(c)===47)&&(w.length===0?w+="..":w+="/..");return w.length>0?w+s.slice(n+u):(n+=u,s.charCodeAt(n)===47&&++n,s.slice(n))},_makeLong:function(e){return e},dirname:function(e){if(h(e),e.length===0)return".";for(var s=e.charCodeAt(0),i=s===47,r=-1,a=!0,n=e.length-1;n>=1;--n)if(s=e.charCodeAt(n),s===47){if(!a){r=n;break}}else a=!1;return r===-1?i?"/":".":i&&r===1?"//":e.slice(0,r)},basename:function(e,s){if(s!==void 0&&typeof s!="string")throw new TypeError('"ext" argument must be a string');h(e);var i=0,r=-1,a=!0,n;if(s!==void 0&&s.length>0&&s.length<=e.length){if(s.length===e.length&&s===e)return"";var l=s.length-1,o=-1;for(n=e.length-1;n>=0;--n){var f=e.charCodeAt(n);if(f===47){if(!a){i=n+1;break}}else o===-1&&(a=!1,o=n+1),l>=0&&(f===s.charCodeAt(l)?--l===-1&&(r=n):(l=-1,r=o))}return i===r?r=o:r===-1&&(r=e.length),e.slice(i,r)}else{for(n=e.length-1;n>=0;--n)if(e.charCodeAt(n)===47){if(!a){i=n+1;break}}else r===-1&&(a=!1,r=n+1);return r===-1?"":e.slice(i,r)}},extname:function(e){h(e);for(var s=-1,i=0,r=-1,a=!0,n=0,l=e.length-1;l>=0;--l){var o=e.charCodeAt(l);if(o===47){if(!a){i=l+1;break}continue}r===-1&&(a=!1,r=l+1),o===46?s===-1?s=l:n!==1&&(n=1):s!==-1&&(n=-1)}return s===-1||r===-1||n===0||n===1&&s===r-1&&s===i+1?"":e.slice(s,r)},format:function(e){if(e===null||typeof e!="object")throw new TypeError('The "pathObject" argument must be of type Object. Received type '+typeof e);return ae("/",e)},parse:function(e){h(e);var s={root:"",dir:"",base:"",ext:"",name:""};if(e.length===0)return s;var i=e.charCodeAt(0),r=i===47,a;r?(s.root="/",a=1):a=0;for(var n=-1,l=0,o=-1,f=!0,u=e.length-1,c=0;u>=a;--u){if(i=e.charCodeAt(u),i===47){if(!f){l=u+1;break}continue}o===-1&&(f=!1,o=u+1),i===46?n===-1?n=u:c!==1&&(c=1):n!==-1&&(c=-1)}return n===-1||o===-1||c===0||c===1&&n===o-1&&n===l+1?o!==-1&&(l===0&&r?s.base=s.name=e.slice(1,o):s.base=s.name=e.slice(l,o)):(l===0&&r?(s.name=e.slice(1,n),s.base=e.slice(1,o)):(s.name=e.slice(l,n),s.base=e.slice(l,o)),s.ext=e.slice(n,o)),l>0?s.dir=e.slice(0,l-1):r&&(s.dir="/"),s},sep:"/",delimiter:":",win32:null,posix:null};g.posix=g;$.exports=g});var J=C((be,W)=>{"use strict";var p=R(D()),U=R(A()),F=class{constructor(e,s){this.detail=e;this.file=s;this.detail=e,this.isDirectory()||(this.file=s,this.length=s.size)}content=null;length=0;isDirectory(){return this.detail.type=="directory"}isFile(){return this.detail.type=="file"}},T=class t{normalize=p.default;base;constructor(e=""){this.base=new URL((0,p.default)(location.origin+(e||"").replace(/\/?$/,"/")))}error=class extends Error{constructor(s){var i=["Invalid Path: /","Missing Required Argument: path","Missing Required Argument: content","Directory Already Exists","File Already Exists","File Not Found","Directory Does Not Exist","Not A Directory","Not A File","Directory Path Nonexistent"];super(i[s])}};directory=class extends t{constructor(i="",r=new t){super(i);this.parent=r}};get loading(){return caches.open("vfs").then(async e=>(await e.match(new URL(location.origin+"/"))||await e.put(new URL(location.origin+"/"),new Response(null,{headers:{"x-detail":JSON.stringify({type:"directory"})}})),e))}parent;async mkdir(e){if(!e)throw new this.error(1);e=e.replace(/\/$/,"");let s=await this.loading;var i=new URL((0,p.default)(this.base.href+e)).pathname,r="/";for await(var a of i.split("/"))a&&(r+=a,r!="/"&&r!=e&&(await this.exists(r)||await(this.parent||this).mkdir(r),r+="/"));await s.put(new URL((0,p.default)(this.base.href+e)),new Response(null,{headers:{"x-detail":JSON.stringify({type:"directory"})}}))}async openDir(e){if(!e)throw new this.error(1);e=e.replace(/\/$/,"");let i=await(await this.loading).match(new URL((0,p.default)(this.base.href+e)));if(!i)throw new this.error(6);if(JSON.parse(i.headers.get("x-detail")||"{}").type!="directory")throw new this.error(7);return e=new URL((0,p.default)(this.base.href+e)).pathname,new this.directory(e)}async writeFile(e,s,i={}){if(!e)throw new this.error(1);if(typeof s>"u")throw new this.error(2);if(e=="/")throw new this.error(0);e=e.replace(/\/$/,""),await this.exists(U.default.dirname(e))||await this.mkdir(U.default.dirname(e));let r=await this.loading,a="text/plain";Array.isArray(s)?(a="application/json",s=new Blob([JSON.stringify(s)])):s.constructor==Object?(a="application/json",s=new Blob([JSON.stringify(s)])):typeof s=="string"?(a="text/plain",s=new Blob([s])):typeof s=="number"&&(a="text/plain",s=new Blob([`${s}`])),i.type="file",await r.put(new URL((0,p.default)(this.base.href+e)),new Response(s,{headers:{"x-detail":JSON.stringify(i),"content-length":s.size.toString(),"content-type":a}}))}async readFile(e,s=null){if(!e)throw new this.error(1);e=e.replace(/\/$/,"");let i=await this.loading;if(await i.match(new URL((0,p.default)(this.base.href+e))))return await i.match(new URL((0,p.default)(this.base.href+e))).then(r=>s=="utf-8"?r.text():r.blob());throw new this.error(5)}async unlink(e){if(!e)throw new this.error(1);e=e.replace(/\/$/,""),await(await this.loading).delete(new URL((0,p.default)(this.base.href+e)))}async readdir(e){if(!e)throw new this.error(1);e=e.replace(/\/$/,"");let s=await this.loading,i=await s.match(new URL((0,p.default)(this.base.href+e)));if(!i)throw new this.error(6);if(JSON.parse(i.headers.get("x-detail")||"{}").type!="directory")throw new this.error(7);let a=await s.keys(),n=[];for(let l of a)if(l.url.startsWith(new URL((0,p.default)(this.base.href+e)).href)){let o=l.url.replace(new URL((0,p.default)(this.base.href+e)).href,"").replace(/^\//,"");if(!o||(o.split("/").length>1&&(o=o.split("/")[0]),n.includes(o)))continue;n.push(o)}return n}async exists(e){if(!e)throw new this.error(1);e=e.replace(/\/$/,"");try{return await this.stat(e),!0}catch{return!1}}async stat(e){if(!e)throw new this.error(1);e=e.replace(/\/$/,"");let i=await(await this.loading).match(new URL((0,p.default)(this.base.href+e)));if(!i)throw new this.error(5);let r=JSON.parse(i.headers.get("x-detail")||"{}");return new F(r,await i.blob())}};W.exports=T});var M={};I(M,{default:()=>pe});function _(t){if(!t||typeof t!="string")return!1;var e=X.exec(t),s=e&&j[e[1].toLowerCase()];return s&&s.charset?s.charset:!(!e||!oe.test(e[1]))&&"UTF-8"}function le(t){if(!t||typeof t!="string")return!1;var e=t.indexOf("/")===-1?d.lookup(t):t;if(!e)return!1;if(e.indexOf("charset")===-1){var s=d.charset(e);s&&(e+="; charset="+s.toLowerCase())}return e}function ce(t){if(!t||typeof t!="string")return!1;var e=X.exec(t),s=e&&d.extensions[e[1].toLowerCase()];return!(!s||!s.length)&&s[0]}function fe(t){if(!t||typeof t!="string")return!1;var e=(0,q.extname)("x."+t).toLowerCase().substr(1);return e&&d.types[e]||!1}function ue(t,e){var s=["nginx","apache",void 0,"iana"];Object.keys(j).forEach(function(i){var r=j[i],a=r.extensions;if(a&&a.length){t[i]=a;for(var n=0;n<a.length;n++){var l=a[n];if(e[l]){var o=s.indexOf(j[e[l]].source),f=s.indexOf(r.source);if(e[l]!=="application/octet-stream"&&(o>f||o===f&&e[l].substr(0,12)==="application/"))continue}e[l]=i}}})}var q,j,X,oe,d,pe,B=Z(()=>{"use strict";q=R(A()),j={"application/ecmascript":{source:"apache",compressible:!0,extensions:["ecma"]},"application/gzip":{source:"iana",compressible:!1,extensions:["gz"]},"application/http":{source:"iana"},"application/javascript":{source:"apache",charset:"UTF-8",compressible:!0,extensions:["js"]},"application/json":{source:"iana",charset:"UTF-8",compressible:!0,extensions:["json","map"]},"application/manifest+json":{source:"iana",charset:"UTF-8",compressible:!0,extensions:["webmanifest"]},"application/marc":{source:"iana",extensions:["mrc"]},"application/mp4":{source:"iana",extensions:["mp4","mpg4","mp4s","m4p"]},"application/ogg":{source:"iana",compressible:!1,extensions:["ogx"]},"application/sql":{source:"iana",extensions:["sql"]},"application/wasm":{source:"iana",compressible:!0,extensions:["wasm"]},"application/x-bittorrent":{source:"apache",extensions:["torrent"]},"application/x-gzip":{source:"apache"},"application/x-javascript":{compressible:!0},"application/x-web-app-manifest+json":{compressible:!0,extensions:["webapp"]},"application/x-www-form-urlencoded":{source:"iana",compressible:!0},"application/xhtml+xml":{source:"iana",compressible:!0,extensions:["xhtml","xht"]},"application/xhtml-voice+xml":{source:"apache",compressible:!0},"application/xml":{source:"iana",compressible:!0,extensions:["xml","xsl","xsd","rng"]},"application/zip":{source:"iana",compressible:!1,extensions:["zip"]},"application/zlib":{source:"iana"},"audio/midi":{source:"apache",extensions:["mid","midi","kar","rmi"]},"audio/mp3":{compressible:!1,extensions:["mp3"]},"audio/mp4":{source:"iana",compressible:!1,extensions:["m4a","mp4a"]},"audio/mp4a-latm":{source:"iana"},"audio/mpa":{source:"iana"},"audio/mpa-robust":{source:"iana"},"audio/mpeg":{source:"iana",compressible:!1,extensions:["mpga","mp2","mp2a","mp3","m2a","m3a"]},"audio/ogg":{source:"iana",compressible:!1,extensions:["oga","ogg","spx","opus"]},"audio/red":{source:"iana"},"audio/rtx":{source:"iana"},"audio/scip":{source:"iana"},"audio/silk":{source:"apache",extensions:["sil"]},"audio/smv":{source:"iana"},"audio/wav":{compressible:!1,extensions:["wav"]},"audio/wave":{compressible:!1,extensions:["wav"]},"audio/webm":{source:"apache",compressible:!1,extensions:["weba"]},"audio/x-aac":{source:"apache",compressible:!1,extensions:["aac"]},"audio/x-aiff":{source:"apache",extensions:["aif","aiff","aifc"]},"audio/x-caf":{source:"apache",compressible:!1,extensions:["caf"]},"audio/x-flac":{source:"apache",extensions:["flac"]},"audio/x-m4a":{source:"nginx",extensions:["m4a"]},"audio/x-matroska":{source:"apache",extensions:["mka"]},"audio/x-mpegurl":{source:"apache",extensions:["m3u"]},"audio/x-ms-wax":{source:"apache",extensions:["wax"]},"audio/x-ms-wma":{source:"apache",extensions:["wma"]},"audio/x-pn-realaudio":{source:"apache",extensions:["ram","ra"]},"audio/x-pn-realaudio-plugin":{source:"apache",extensions:["rmp"]},"audio/x-realaudio":{source:"nginx",extensions:["ra"]},"audio/x-tta":{source:"apache"},"audio/x-wav":{source:"apache",extensions:["wav"]},"audio/xm":{source:"apache",extensions:["xm"]},"font/collection":{source:"iana",extensions:["ttc"]},"font/otf":{source:"iana",compressible:!0,extensions:["otf"]},"font/sfnt":{source:"iana"},"font/ttf":{source:"iana",compressible:!0,extensions:["ttf"]},"font/woff":{source:"iana",extensions:["woff"]},"font/woff2":{source:"iana",extensions:["woff2"]},"image/gif":{source:"iana",compressible:!1,extensions:["gif"]},"image/heic":{source:"iana",extensions:["heic"]},"image/heic-sequence":{source:"iana",extensions:["heics"]},"image/heif":{source:"iana",extensions:["heif"]},"image/jpeg":{source:"iana",compressible:!1,extensions:["jpeg","jpg","jpe"]},"image/png":{source:"iana",compressible:!1,extensions:["png"]},"image/svg+xml":{source:"iana",compressible:!0,extensions:["svg","svgz"]},"image/webp":{source:"iana",extensions:["webp"]},"text/coffeescript":{extensions:["coffee","litcoffee"]},"text/css":{source:"iana",charset:"UTF-8",compressible:!0,extensions:["css"]},"text/ecmascript":{source:"apache"},"text/html":{source:"iana",compressible:!0,extensions:["html","htm","shtml"]},"text/jade":{extensions:["jade"]},"text/javascript":{source:"iana",charset:"UTF-8",compressible:!0,extensions:["js","mjs"]},"text/markdown":{source:"iana",compressible:!0,extensions:["md","markdown"]}},X=/^\s*([^;\s]*)(?:;|\s|$)/,oe=/^text\//i,d={};d.charset=_,d.charsets={lookup:_},d.contentType=le,d.extension=ce,d.extensions=Object.create(null),d.lookup=fe,d.types=Object.create(null),ue(d.extensions,d.types);pe=d});var m=new(J()),b=A(),{default:E}=(B(),ee(M));importScripts("/uv/uv.bundle.js");importScripts("/uv/uv.config.js");importScripts("/uv/uv.sw.js");var de=new UVServiceWorker;self.addEventListener("activate",()=>self.clients.claim());self.addEventListener("fetch",t=>{let e=t.request;t.respondWith((async s=>{if(e.url.startsWith("chrome-extension://"))return await fetch(e);if(e.url.startsWith(location.origin+"/~/uv/"))return await de.fetch(t);if(e.url.startsWith(location.origin+"/xen/~/")){let i=e.url.replace(location.origin+"/xen/~","");if(i.startsWith("/terminal/commands/")){let r=b.join("/xen/apps/native/terminal/commands/",i.replace("/terminal/commands/",""));return await fetch(r)}if(i.startsWith("/about:"))switch(i.slice(7)){default:case"blank":return new Response("",{headers:{"Content-Type":"text/html"}});case"srcdoc":return new Response(await e.text(),{headers:{"Content-Type":"text/html"}})}if(i.startsWith("/assets")){let r=b.join("/xen/system/assets/",i.replace("/assets/",""));return new Response(await m.readFile(r),{headers:{"Content-Type":E.lookup(r)}})}if(i.startsWith("/apps")){let r=i.replace("/apps/","").split("/").slice(0,2).join("/"),[a,n]=r.split("/"),l=!1;a=="Xen"&&(l=!0);let o=`/${i.split("/").slice(4).join("/")}`;if(o.startsWith("/meta"))return new Response(await m.readFile(b.normalize("/xen/system/apps/"+r+"/app.json")),{headers:{"Content-Type":"application/json"}});{let f,u;try{u=await m.readFile(f=b.join("/xen/system/apps/",r,o=="/"?"/index.html":o))}catch{u=await m.readFile(f=b.join("/xen/system/apps/",r,o=="/"?"/index.html":o+".html")).catch(()=>new Response(`404: ${o} not found`))}return E.lookup(f)=="text/html"&&(u=`<base href="/xen/~/apps/${r}/" /><script src="/xen/~/assets/inject.bundle.js"><\/script>${await u.text()}`),new Response(u,{headers:{"Content-Type":E.lookup(f)}})}}}else{let i=new URL(e.url).pathname,r=await caches.open("xen-cache");return await r.match(e)?await r.match(e)||await fetch(e):i.startsWith("/xen/img/")||i.startsWith("/xen/font/")||e.destination=="font"||e.url.startsWith("https://cdn.jsdelivr.net/")?(s=await fetch(e),r.put(e.url,s.clone()),s):await fetch(e)}})())});var k="/xen/apps/native/";async function me(t){let e=await fetch(k+t.app.replace("Xen/","")+"/app.json").then(i=>i.json());e.id=t.app,e.files.splice(e.files.indexOf("app.json"),1),await m.mkdir("/xen/system/apps/"+t.app),await Promise.all(e.files.map(async i=>{let a=await(await fetch(k+t.app.replace("Xen/","")+"/"+i)).blob();await m.writeFile("/xen/system/apps/"+t.app+"/"+i,a)})),await m.writeFile("/xen/system/apps/"+t.app+"/app.json",JSON.stringify(e));let s=JSON.parse(await m.readFile("/xen/system/apps/installed.json","utf-8"));return s.includes(t.app)||s.push(t.app),await m.writeFile("/xen/system/apps/installed.json",JSON.stringify(s)),!0}async function he(t){let e=await fetch(k+t.app.replace("Xen/","")+"/app.json").then(i=>i.json());if(JSON.parse(await m.readFile(`/xen/system/apps/${t.app}/app.json`,"utf-8")).version==e.version)return!1;e.files.splice(e.files.indexOf("app.json"),1);for(let i of e.files){let a=await(await fetch(k+t.app.replace("Xen/","")+"/"+i)).blob();await m.writeFile("/xen/system/apps/"+t.app+"/"+i,a)}return await m.writeFile("/xen/system/apps/"+t.app+"/app.json",JSON.stringify(e)),!0}self.addEventListener("message",async t=>{if(typeof t.data!="object")return!1;switch(t.data.type){case"install":if(t.data.native===!0)await me(t.data).catch(e=>{t.ports[0].postMessage({type:"install",success:!1,error:e})}),t.ports[0].postMessage({type:"install",success:!0});else return t.data,void 0;break;case"update":t.data.native===!0&&(await he(t.data).catch(e=>{t.ports[0].postMessage({type:"update",success:!1,error:e})}),t.ports[0].postMessage({type:"update",success:!0}));break;case"uninstall":break}});self.addEventListener("install",t=>self.skipWaiting());self.addEventListener("activate",t=>t.waitUntil(clients.claim()));
