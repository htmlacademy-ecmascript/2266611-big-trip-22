(()=>{var e={10:(e,t,n)=>{"use strict";n.d(t,{Z:()=>a});var i=n(537),s=n.n(i),r=n(645),o=n.n(r)()(s());o.push([e.id,".shake {\n  animation: shake 0.6s;\n  position: relative;\n  z-index: 10;\n}\n\n@keyframes shake {\n  0%,\n  100% {\n    transform: translateX(0);\n  }\n\n  10%,\n  30%,\n  50%,\n  70%,\n  90% {\n    transform: translateX(-5px);\n  }\n\n  20%,\n  40%,\n  60%,\n  80% {\n    transform: translateX(5px);\n  }\n}\n","",{version:3,sources:["webpack://./src/framework/view/abstract-view.css"],names:[],mappings:"AAAA;EACE,qBAAqB;EACrB,kBAAkB;EAClB,WAAW;AACb;;AAEA;EACE;;IAEE,wBAAwB;EAC1B;;EAEA;;;;;IAKE,2BAA2B;EAC7B;;EAEA;;;;IAIE,0BAA0B;EAC5B;AACF",sourcesContent:[".shake {\n  animation: shake 0.6s;\n  position: relative;\n  z-index: 10;\n}\n\n@keyframes shake {\n  0%,\n  100% {\n    transform: translateX(0);\n  }\n\n  10%,\n  30%,\n  50%,\n  70%,\n  90% {\n    transform: translateX(-5px);\n  }\n\n  20%,\n  40%,\n  60%,\n  80% {\n    transform: translateX(5px);\n  }\n}\n"],sourceRoot:""}]);const a=o},645:e=>{"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n="",i=void 0!==t[5];return t[4]&&(n+="@supports (".concat(t[4],") {")),t[2]&&(n+="@media ".concat(t[2]," {")),i&&(n+="@layer".concat(t[5].length>0?" ".concat(t[5]):""," {")),n+=e(t),i&&(n+="}"),t[2]&&(n+="}"),t[4]&&(n+="}"),n})).join("")},t.i=function(e,n,i,s,r){"string"==typeof e&&(e=[[null,e,void 0]]);var o={};if(i)for(var a=0;a<this.length;a++){var l=this[a][0];null!=l&&(o[l]=!0)}for(var c=0;c<e.length;c++){var d=[].concat(e[c]);i&&o[d[0]]||(void 0!==r&&(void 0===d[5]||(d[1]="@layer".concat(d[5].length>0?" ".concat(d[5]):""," {").concat(d[1],"}")),d[5]=r),n&&(d[2]?(d[1]="@media ".concat(d[2]," {").concat(d[1],"}"),d[2]=n):d[2]=n),s&&(d[4]?(d[1]="@supports (".concat(d[4],") {").concat(d[1],"}"),d[4]=s):d[4]="".concat(s)),t.push(d))}},t}},537:e=>{"use strict";e.exports=function(e){var t=e[1],n=e[3];if(!n)return t;if("function"==typeof btoa){var i=btoa(unescape(encodeURIComponent(JSON.stringify(n)))),s="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(i),r="/*# ".concat(s," */");return[t].concat([r]).join("\n")}return[t].join("\n")}},484:function(e){e.exports=function(){"use strict";var e=6e4,t=36e5,n="millisecond",i="second",s="minute",r="hour",o="day",a="week",l="month",c="quarter",d="year",u="date",h="Invalid Date",p=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,f=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,m={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(e){var t=["th","st","nd","rd"],n=e%100;return"["+e+(t[(n-20)%10]||t[n]||t[0])+"]"}},v=function(e,t,n){var i=String(e);return!i||i.length>=t?e:""+Array(t+1-i.length).join(n)+e},b={s:v,z:function(e){var t=-e.utcOffset(),n=Math.abs(t),i=Math.floor(n/60),s=n%60;return(t<=0?"+":"-")+v(i,2,"0")+":"+v(s,2,"0")},m:function e(t,n){if(t.date()<n.date())return-e(n,t);var i=12*(n.year()-t.year())+(n.month()-t.month()),s=t.clone().add(i,l),r=n-s<0,o=t.clone().add(i+(r?-1:1),l);return+(-(i+(n-s)/(r?s-o:o-s))||0)},a:function(e){return e<0?Math.ceil(e)||0:Math.floor(e)},p:function(e){return{M:l,y:d,w:a,d:o,D:u,h:r,m:s,s:i,ms:n,Q:c}[e]||String(e||"").toLowerCase().replace(/s$/,"")},u:function(e){return void 0===e}},y="en",$={};$[y]=m;var _=function(e){return e instanceof w},g=function e(t,n,i){var s;if(!t)return y;if("string"==typeof t){var r=t.toLowerCase();$[r]&&(s=r),n&&($[r]=n,s=r);var o=t.split("-");if(!s&&o.length>1)return e(o[0])}else{var a=t.name;$[a]=t,s=a}return!i&&s&&(y=s),s||!i&&y},C=function(e,t){if(_(e))return e.clone();var n="object"==typeof t?t:{};return n.date=e,n.args=arguments,new w(n)},k=b;k.l=g,k.i=_,k.w=function(e,t){return C(e,{locale:t.$L,utc:t.$u,x:t.$x,$offset:t.$offset})};var w=function(){function m(e){this.$L=g(e.locale,null,!0),this.parse(e)}var v=m.prototype;return v.parse=function(e){this.$d=function(e){var t=e.date,n=e.utc;if(null===t)return new Date(NaN);if(k.u(t))return new Date;if(t instanceof Date)return new Date(t);if("string"==typeof t&&!/Z$/i.test(t)){var i=t.match(p);if(i){var s=i[2]-1||0,r=(i[7]||"0").substring(0,3);return n?new Date(Date.UTC(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)):new Date(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)}}return new Date(t)}(e),this.$x=e.x||{},this.init()},v.init=function(){var e=this.$d;this.$y=e.getFullYear(),this.$M=e.getMonth(),this.$D=e.getDate(),this.$W=e.getDay(),this.$H=e.getHours(),this.$m=e.getMinutes(),this.$s=e.getSeconds(),this.$ms=e.getMilliseconds()},v.$utils=function(){return k},v.isValid=function(){return!(this.$d.toString()===h)},v.isSame=function(e,t){var n=C(e);return this.startOf(t)<=n&&n<=this.endOf(t)},v.isAfter=function(e,t){return C(e)<this.startOf(t)},v.isBefore=function(e,t){return this.endOf(t)<C(e)},v.$g=function(e,t,n){return k.u(e)?this[t]:this.set(n,e)},v.unix=function(){return Math.floor(this.valueOf()/1e3)},v.valueOf=function(){return this.$d.getTime()},v.startOf=function(e,t){var n=this,c=!!k.u(t)||t,h=k.p(e),p=function(e,t){var i=k.w(n.$u?Date.UTC(n.$y,t,e):new Date(n.$y,t,e),n);return c?i:i.endOf(o)},f=function(e,t){return k.w(n.toDate()[e].apply(n.toDate("s"),(c?[0,0,0,0]:[23,59,59,999]).slice(t)),n)},m=this.$W,v=this.$M,b=this.$D,y="set"+(this.$u?"UTC":"");switch(h){case d:return c?p(1,0):p(31,11);case l:return c?p(1,v):p(0,v+1);case a:var $=this.$locale().weekStart||0,_=(m<$?m+7:m)-$;return p(c?b-_:b+(6-_),v);case o:case u:return f(y+"Hours",0);case r:return f(y+"Minutes",1);case s:return f(y+"Seconds",2);case i:return f(y+"Milliseconds",3);default:return this.clone()}},v.endOf=function(e){return this.startOf(e,!1)},v.$set=function(e,t){var a,c=k.p(e),h="set"+(this.$u?"UTC":""),p=(a={},a[o]=h+"Date",a[u]=h+"Date",a[l]=h+"Month",a[d]=h+"FullYear",a[r]=h+"Hours",a[s]=h+"Minutes",a[i]=h+"Seconds",a[n]=h+"Milliseconds",a)[c],f=c===o?this.$D+(t-this.$W):t;if(c===l||c===d){var m=this.clone().set(u,1);m.$d[p](f),m.init(),this.$d=m.set(u,Math.min(this.$D,m.daysInMonth())).$d}else p&&this.$d[p](f);return this.init(),this},v.set=function(e,t){return this.clone().$set(e,t)},v.get=function(e){return this[k.p(e)]()},v.add=function(n,c){var u,h=this;n=Number(n);var p=k.p(c),f=function(e){var t=C(h);return k.w(t.date(t.date()+Math.round(e*n)),h)};if(p===l)return this.set(l,this.$M+n);if(p===d)return this.set(d,this.$y+n);if(p===o)return f(1);if(p===a)return f(7);var m=(u={},u[s]=e,u[r]=t,u[i]=1e3,u)[p]||1,v=this.$d.getTime()+n*m;return k.w(v,this)},v.subtract=function(e,t){return this.add(-1*e,t)},v.format=function(e){var t=this,n=this.$locale();if(!this.isValid())return n.invalidDate||h;var i=e||"YYYY-MM-DDTHH:mm:ssZ",s=k.z(this),r=this.$H,o=this.$m,a=this.$M,l=n.weekdays,c=n.months,d=function(e,n,s,r){return e&&(e[n]||e(t,i))||s[n].slice(0,r)},u=function(e){return k.s(r%12||12,e,"0")},p=n.meridiem||function(e,t,n){var i=e<12?"AM":"PM";return n?i.toLowerCase():i},m={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:k.s(a+1,2,"0"),MMM:d(n.monthsShort,a,c,3),MMMM:d(c,a),D:this.$D,DD:k.s(this.$D,2,"0"),d:String(this.$W),dd:d(n.weekdaysMin,this.$W,l,2),ddd:d(n.weekdaysShort,this.$W,l,3),dddd:l[this.$W],H:String(r),HH:k.s(r,2,"0"),h:u(1),hh:u(2),a:p(r,o,!0),A:p(r,o,!1),m:String(o),mm:k.s(o,2,"0"),s:String(this.$s),ss:k.s(this.$s,2,"0"),SSS:k.s(this.$ms,3,"0"),Z:s};return i.replace(f,(function(e,t){return t||m[e]||s.replace(":","")}))},v.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},v.diff=function(n,u,h){var p,f=k.p(u),m=C(n),v=(m.utcOffset()-this.utcOffset())*e,b=this-m,y=k.m(this,m);return y=(p={},p[d]=y/12,p[l]=y,p[c]=y/3,p[a]=(b-v)/6048e5,p[o]=(b-v)/864e5,p[r]=b/t,p[s]=b/e,p[i]=b/1e3,p)[f]||b,h?y:k.a(y)},v.daysInMonth=function(){return this.endOf(l).$D},v.$locale=function(){return $[this.$L]},v.locale=function(e,t){if(!e)return this.$L;var n=this.clone(),i=g(e,t,!0);return i&&(n.$L=i),n},v.clone=function(){return k.w(this.$d,this)},v.toDate=function(){return new Date(this.valueOf())},v.toJSON=function(){return this.isValid()?this.toISOString():null},v.toISOString=function(){return this.$d.toISOString()},v.toString=function(){return this.$d.toUTCString()},m}(),M=w.prototype;return C.prototype=M,[["$ms",n],["$s",i],["$m",s],["$H",r],["$W",o],["$M",l],["$y",d],["$D",u]].forEach((function(e){M[e[1]]=function(t){return this.$g(t,e[0],e[1])}})),C.extend=function(e,t){return e.$i||(e(t,w,C),e.$i=!0),C},C.locale=g,C.isDayjs=_,C.unix=function(e){return C(1e3*e)},C.en=$[y],C.Ls=$,C.p={},C}()},646:function(e){e.exports=function(){"use strict";var e,t,n=1e3,i=6e4,s=36e5,r=864e5,o=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,a=31536e6,l=2592e6,c=/^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/,d={years:a,months:l,days:r,hours:s,minutes:i,seconds:n,milliseconds:1,weeks:6048e5},u=function(e){return e instanceof y},h=function(e,t,n){return new y(e,n,t.$l)},p=function(e){return t.p(e)+"s"},f=function(e){return e<0},m=function(e){return f(e)?Math.ceil(e):Math.floor(e)},v=function(e){return Math.abs(e)},b=function(e,t){return e?f(e)?{negative:!0,format:""+v(e)+t}:{negative:!1,format:""+e+t}:{negative:!1,format:""}},y=function(){function f(e,t,n){var i=this;if(this.$d={},this.$l=n,void 0===e&&(this.$ms=0,this.parseFromMilliseconds()),t)return h(e*d[p(t)],this);if("number"==typeof e)return this.$ms=e,this.parseFromMilliseconds(),this;if("object"==typeof e)return Object.keys(e).forEach((function(t){i.$d[p(t)]=e[t]})),this.calMilliseconds(),this;if("string"==typeof e){var s=e.match(c);if(s){var r=s.slice(2).map((function(e){return null!=e?Number(e):0}));return this.$d.years=r[0],this.$d.months=r[1],this.$d.weeks=r[2],this.$d.days=r[3],this.$d.hours=r[4],this.$d.minutes=r[5],this.$d.seconds=r[6],this.calMilliseconds(),this}}return this}var v=f.prototype;return v.calMilliseconds=function(){var e=this;this.$ms=Object.keys(this.$d).reduce((function(t,n){return t+(e.$d[n]||0)*d[n]}),0)},v.parseFromMilliseconds=function(){var e=this.$ms;this.$d.years=m(e/a),e%=a,this.$d.months=m(e/l),e%=l,this.$d.days=m(e/r),e%=r,this.$d.hours=m(e/s),e%=s,this.$d.minutes=m(e/i),e%=i,this.$d.seconds=m(e/n),e%=n,this.$d.milliseconds=e},v.toISOString=function(){var e=b(this.$d.years,"Y"),t=b(this.$d.months,"M"),n=+this.$d.days||0;this.$d.weeks&&(n+=7*this.$d.weeks);var i=b(n,"D"),s=b(this.$d.hours,"H"),r=b(this.$d.minutes,"M"),o=this.$d.seconds||0;this.$d.milliseconds&&(o+=this.$d.milliseconds/1e3);var a=b(o,"S"),l=e.negative||t.negative||i.negative||s.negative||r.negative||a.negative,c=s.format||r.format||a.format?"T":"",d=(l?"-":"")+"P"+e.format+t.format+i.format+c+s.format+r.format+a.format;return"P"===d||"-P"===d?"P0D":d},v.toJSON=function(){return this.toISOString()},v.format=function(e){var n=e||"YYYY-MM-DDTHH:mm:ss",i={Y:this.$d.years,YY:t.s(this.$d.years,2,"0"),YYYY:t.s(this.$d.years,4,"0"),M:this.$d.months,MM:t.s(this.$d.months,2,"0"),D:this.$d.days,DD:t.s(this.$d.days,2,"0"),H:this.$d.hours,HH:t.s(this.$d.hours,2,"0"),m:this.$d.minutes,mm:t.s(this.$d.minutes,2,"0"),s:this.$d.seconds,ss:t.s(this.$d.seconds,2,"0"),SSS:t.s(this.$d.milliseconds,3,"0")};return n.replace(o,(function(e,t){return t||String(i[e])}))},v.as=function(e){return this.$ms/d[p(e)]},v.get=function(e){var t=this.$ms,n=p(e);return"milliseconds"===n?t%=1e3:t="weeks"===n?m(t/d[n]):this.$d[n],0===t?0:t},v.add=function(e,t,n){var i;return i=t?e*d[p(t)]:u(e)?e.$ms:h(e,this).$ms,h(this.$ms+i*(n?-1:1),this)},v.subtract=function(e,t){return this.add(e,t,!0)},v.locale=function(e){var t=this.clone();return t.$l=e,t},v.clone=function(){return h(this.$ms,this)},v.humanize=function(t){return e().add(this.$ms,"ms").locale(this.$l).fromNow(!t)},v.milliseconds=function(){return this.get("milliseconds")},v.asMilliseconds=function(){return this.as("milliseconds")},v.seconds=function(){return this.get("seconds")},v.asSeconds=function(){return this.as("seconds")},v.minutes=function(){return this.get("minutes")},v.asMinutes=function(){return this.as("minutes")},v.hours=function(){return this.get("hours")},v.asHours=function(){return this.as("hours")},v.days=function(){return this.get("days")},v.asDays=function(){return this.as("days")},v.weeks=function(){return this.get("weeks")},v.asWeeks=function(){return this.as("weeks")},v.months=function(){return this.get("months")},v.asMonths=function(){return this.as("months")},v.years=function(){return this.get("years")},v.asYears=function(){return this.as("years")},f}();return function(n,i,s){e=s,t=s().$utils(),s.duration=function(e,t){var n=s.locale();return h(e,{$l:n},t)},s.isDuration=u;var r=i.prototype.add,o=i.prototype.subtract;i.prototype.add=function(e,t){return u(e)&&(e=e.asMilliseconds()),r.bind(this)(e,t)},i.prototype.subtract=function(e,t){return u(e)&&(e=e.asMilliseconds()),o.bind(this)(e,t)}}}()},379:e=>{"use strict";var t=[];function n(e){for(var n=-1,i=0;i<t.length;i++)if(t[i].identifier===e){n=i;break}return n}function i(e,i){for(var r={},o=[],a=0;a<e.length;a++){var l=e[a],c=i.base?l[0]+i.base:l[0],d=r[c]||0,u="".concat(c," ").concat(d);r[c]=d+1;var h=n(u),p={css:l[1],media:l[2],sourceMap:l[3],supports:l[4],layer:l[5]};if(-1!==h)t[h].references++,t[h].updater(p);else{var f=s(p,i);i.byIndex=a,t.splice(a,0,{identifier:u,updater:f,references:1})}o.push(u)}return o}function s(e,t){var n=t.domAPI(t);return n.update(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap&&t.supports===e.supports&&t.layer===e.layer)return;n.update(e=t)}else n.remove()}}e.exports=function(e,s){var r=i(e=e||[],s=s||{});return function(e){e=e||[];for(var o=0;o<r.length;o++){var a=n(r[o]);t[a].references--}for(var l=i(e,s),c=0;c<r.length;c++){var d=n(r[c]);0===t[d].references&&(t[d].updater(),t.splice(d,1))}r=l}}},569:e=>{"use strict";var t={};e.exports=function(e,n){var i=function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}t[e]=n}return t[e]}(e);if(!i)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");i.appendChild(n)}},216:e=>{"use strict";e.exports=function(e){var t=document.createElement("style");return e.setAttributes(t,e.attributes),e.insert(t,e.options),t}},565:(e,t,n)=>{"use strict";e.exports=function(e){var t=n.nc;t&&e.setAttribute("nonce",t)}},795:e=>{"use strict";e.exports=function(e){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var t=e.insertStyleElement(e);return{update:function(n){!function(e,t,n){var i="";n.supports&&(i+="@supports (".concat(n.supports,") {")),n.media&&(i+="@media ".concat(n.media," {"));var s=void 0!==n.layer;s&&(i+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),i+=n.css,s&&(i+="}"),n.media&&(i+="}"),n.supports&&(i+="}");var r=n.sourceMap;r&&"undefined"!=typeof btoa&&(i+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(r))))," */")),t.styleTagTransform(i,e,t.options)}(t,e,n)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)}}}},589:e=>{"use strict";e.exports=function(e,t){if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}}},t={};function n(i){var s=t[i];if(void 0!==s)return s.exports;var r=t[i]={id:i,exports:{}};return e[i].call(r.exports,r,r.exports,n),r.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.nc=void 0,(()=>{"use strict";const e=[{id:1,basePrice:1100,dateFrom:"2023-05-09T22:55:56.845Z",dateTo:"2023-05-15T11:22:13.375Z",destination:"cfe416cq-10xa-ye10-8077-2fs9a01e73ab",isFavorite:!1,offers:["b4c3e4e6-9053-42ce-b747-e2813jh7aa31","b4cio4e6-9y53-42ce-b747-e2813j88883w"],type:"taxi"},{id:2,basePrice:20,dateFrom:"2024-01-07T19:30:56.845Z",dateTo:"2024-01-08T20:22:13.845Z",destination:"f4b62099-293f-4c3d-a702-94eec4a2808c",isFavorite:!0,offers:["r466o4e6-9t6q-420e-b7u7-e189nbn0kb6s"],type:"check-in"},{id:3,basePrice:160,dateFrom:"2023-08-22T04:10:01.845Z",dateTo:"2023-08-22T07:22:13.845Z",destination:"f4b62099-29rf-4cud-ate2-u457c4a2998r",isFavorite:!0,offers:[],type:"sightseeing"},{id:4,basePrice:600,dateFrom:"2023-02-10T03:40:24.845Z",dateTo:"2023-02-11T13:22:13.375Z",destination:"f4b6ob99-19ef-4y7d-ate2-47eec4a19pjr",isFavorite:!1,offers:["b466o4e6-9fgq-42ce-b7u7-e280pj89k0br","b466o4e6-9k0q-42ce-b7u7-e181en89kb6d"],type:"flight"},{id:5,basePrice:235,dateFrom:"2023-04-10T14:35:56.845Z",dateTo:"2023-04-11T17:22:13.375Z",destination:"b4c3e4e6-9053-42ce-b747-e281314baa31",isFavorite:!0,offers:["b466o4e6-9k5q-42ce-b7u7-e281ej89k000"],type:"ship"}],t=(e=1,t=100)=>Math.floor(Math.random()*(t-e+1))+e,i=e=>`${e[0].toUpperCase()}${e.slice(1)}`,s=[{id:"cfe416cq-10xa-ye10-8077-2fs9a01e73ab",description:"Chamonix, is a beautiful city, a true asian pearl, with crowded streets.",name:"Chamonix",pictures:[{src:`https://loremflickr.com/248/152/travel?random=${t()}`,description:"Event photo."},{src:`https://loremflickr.com/248/152/travel?random=${t()}`,description:"Event photo."}]},{id:"f4b62099-293f-4c3d-a702-94eec4a2808c",description:"Milan, in a middle of Europe, with a beautiful old town, for those who value comfort and coziness, a perfect place to stay with a family.",name:"Milan",pictures:[]},{id:"f4b62099-29rf-4cud-ate2-u457c4a2998r",description:"Tokio, a true asian pearl, famous for its crowded street markets with the best street food in Asia.",name:"Tokio",pictures:[{src:`https://loremflickr.com/248/152/travel?random=${t()}`,description:"Event photo."}]},{id:"f4b6ob99-19ef-4y7d-ate2-47eec4a19pjr",description:"Kioto, is a beautiful city, for those who value comfort and coziness, a perfect place to stay with a family.",name:"Kioto",pictures:[{src:`https://loremflickr.com/248/152/travel?random=${t()}`,description:"Event photo."}]},{id:"b4c3e4e6-9053-42ce-b747-e281314baa31",description:"Rotterdam, a true asian pearl, with crowded streets, with an embankment of a mighty river as a centre of attraction, a perfect place to stay with a family.",name:"Rotterdam",pictures:[{src:`https://loremflickr.com/248/152/travel?random=${t()}`,description:"Event photo."},{src:`https://loremflickr.com/248/152/travel?random=${t()}`,description:"Event photo."},{src:`https://loremflickr.com/248/152/travel?random=${t()}`,description:"Event photo."}]}],r=[{type:"taxi",offers:[{id:"b4c3e4e6-9053-42ce-b747-e2813jh7aa31",title:"Upgrade to a business class",price:120},{id:"b4cee4e6-9y53-42ce-b747-e2813j7uf831",title:"Choose the radio station",price:30},{id:"b4cio4e6-9y53-42ce-b747-e2813j88883w",title:"Choose temperature",price:30},{id:"b466o4e6-9k5q-42ce-b7u7-e281ej89k83w",title:"Drive slowly",price:10}]},{type:"bus",offers:[{id:"b466o4e6-9k5q-42ce-b7u7-e281ej89k8jj",title:"Infotainment system",price:60},{id:"b466o4e6-9k5q-42ce-b7u7-e2k8ej89k55w",title:"Choose seats",price:190},{id:"b466o4e6-9k5q-42ce-b7u7-e281tr89kp94",title:"Order meal",price:90}]},{type:"train",offers:[{id:"b466o4e6-9k6q-42ce-b7u7-e281ej89u6e0",title:"Book a taxi at the arrival point",price:110},{id:"b466o4e6-9k5q-48ge-b7u7-e281e111k83e",title:"Order a breakfast",price:80},{id:"b49jo4e6-9k5q-42ce-b7u7-e281ej81w33w",title:"Wake up at a certain time",price:80}]},{type:"ship",offers:[{id:"b466o4e6-9k5q-42ce-b7u7-e281e897k83w",title:"Add luggage",price:100},{id:"b466o4e6-9k5q-42ce-b7u7-e281ej89k000",title:"Upgrade to a business class",price:120},{id:"b466o4e6-9k5q-42ce-b7u7-e281ej76k83w",title:"Upgrade to comfort class",price:110},{id:"b4666de6-9k5q-42ce-b7u7-e281ej89dd3f",title:"Business lounge",price:50}]},{type:"drive",offers:[{id:"b466o4e6-9k5q-4200-b7u7-e281e7y9k0sw",title:"With automatic transmission",price:110},{id:"b468h4e6-9k5q-42ce-b7u7-e2hm7j89k0op",title:"With air conditioning",price:190}]},{type:"flight",offers:[{id:"b466o4e6-9fgq-42ce-b7u7-e280pj89k0br",title:"Upgrade to a business class",price:120},{id:"a466o4e6-9lnq-42ce-b7u7-e20lej89k0vc",title:"Upgrade to comfort class",price:100},{id:"b466o4e6-9k0q-42ce-b7u7-e181en89kb6d",title:"Add luggage",price:100},{id:"r466o4e6-9k5q-42ce-b7u7-e189nb89kb6c",title:"Business lounge",price:50}]},{type:"check-in",offers:[{id:"r466o4e6-9t6q-420e-b7u7-e189nbn0kb6s",title:"Choose the time of check-in",price:70},{id:"r466o4e6-9t6q-420e-0ku7-e189nbn0kb6s",title:"Choose the time of check-out",price:130},{id:"r466o4ne-9t6q-420e-b7u7-e189nbn0kb6m",title:"Order a meal from the restaurant",price:30}]},{type:"sightseeing",offers:[]},{type:"restaurant",offers:[{id:"r46tv4e6-9t6q-420e-b799-e189nbn0kb6s",title:"Choose live music",price:150},{id:"r466bve6-9t6q-420e-b7u7-e189nbn99b60",title:"Choose VIP area",price:70}]}];var o=n(379),a=n.n(o),l=n(795),c=n.n(l),d=n(569),u=n.n(d),h=n(565),p=n.n(h),f=n(216),m=n.n(f),v=n(589),b=n.n(v),y=n(10),$={};$.styleTagTransform=b(),$.setAttributes=p(),$.insert=u().bind(null,"head"),$.domAPI=c(),$.insertStyleElement=m(),a()(y.Z,$),y.Z&&y.Z.locals&&y.Z.locals;const _="shake";class g{#e=null;constructor(){if(new.target===g)throw new Error("Can't instantiate AbstractView, only concrete one.")}get element(){return this.#e||(this.#e=function(e){const t=document.createElement("div");return t.innerHTML=e,t.firstElementChild}(this.template)),this.#e}get template(){throw new Error("Abstract method not implemented: get template")}removeElement(){this.#e=null}shake(e){this.element.classList.add(_),setTimeout((()=>{this.element.classList.remove(_),e?.()}),600)}}function C(e,t,n="beforeend"){if(!(e instanceof g))throw new Error("Can render only components");if(null===t)throw new Error("Container element doesn't exist");t.insertAdjacentElement(n,e.element)}function k(e,t){if(!(e instanceof g&&t instanceof g))throw new Error("Can replace only components");const n=e.element,i=t.element,s=i.parentElement;if(null===s)throw new Error("Parent element doesn't exist");s.replaceChild(n,i)}function w(e){if(null!==e){if(!(e instanceof g))throw new Error("Can remove only components");e.element.remove(),e.removeElement()}}const M=["taxi","bus","train","ship","drive","flight","check-in","sightseeing","restaurant"],S={DAY:{name:"day",disabled:!1},EVENT:{name:"event",disabled:!0},TIME:{name:"time",disabled:!1},PRICE:{name:"price",disabled:!1},OFFERS:{name:"offers",disabled:!0}},x="default",E="editing";var T=n(484),D=n.n(T),A=n(646),F=n.n(A);D().extend(F());const H="HH:mm",P="DD/MM/YY HH:mm",j=(e,t)=>e?D()(e).format(t):"",O=(e,t)=>D().duration(D()(t).diff(D()(e))),q={everything:e=>e,future:e=>e.filter((e=>{return t=e.dateFrom,D()().isBefore(t);var t})),present:e=>e.filter((e=>{return t=e.dateFrom,n=e.dateTo,D()().isAfter(t)&&D()().isBefore(n);var t,n})),past:e=>e.filter((e=>{return t=e.dateTo,D()().isAfter(t);var t}))};class Y extends g{get template(){return'<section class="trip-main__trip-info  trip-info">\n            <div class="trip-info__main">\n              <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>\n              <p class="trip-info__dates">18&nbsp;&mdash;&nbsp;20 Mar</p>\n            </div>\n            <p class="trip-info__cost">\n              Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>\n            </p>\n          </section>'}}class L extends g{#t=null;constructor({filters:e}){super(),this.#t=e}get template(){return(e=>{const t=this.#t.map(((e,t)=>((e,t)=>{const{type:n,count:i}=e;return`<div class="trip-filters__filter">\n            <input id="filter-${n}" class="trip-filters__filter-input visually-hidden" type="radio" name="trip-filter" value="${n}"\n            ${t?"checked":""} ${0===i?"disabled":""}>\n            <label class="trip-filters__filter-label" for="filter-${n}">${n}</label>\n          </div>`})(e,0===t))).join("");return`<form class="trip-filters" action="#" method="get">\n            ${t}\n            <button class="visually-hidden" type="submit">Accept filter</button>\n          </form>`})()}}class I extends g{get template(){return'<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>'}}const B=document.querySelector(".trip-main"),Z=document.querySelector(".trip-controls__filters");class W extends g{#n=null;#i=null;constructor({currentSortType:e,onSortTypeChange:t}){super(),this.#n=e,this.#i=t,this.element.addEventListener("change",this.#s)}get template(){return e=this.#n,`\n  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">\n  ${Object.values(S).map((t=>((e,t,n)=>`\n  <div class="trip-sort__item  trip-sort__item--${e}">\n    <input id="sort-${e}" class="trip-sort__input  visually-hidden"\n    type="radio" name="trip-sort" value="sort-${e}"\n    data-sort-type="${e}"\n    ${t?"disabled":""}\n    ${n.name===e?"checked":""}>\n    <label class="trip-sort__btn" for="sort-${e}">${i(e)}</label>\n  </div>`)(t.name,t.disabled,e))).join("")}\n  </form>`;var e}#s=e=>this.#i(e.target.dataset.sortType)}class N extends g{get template(){return'<ul class="trip-events__list"></ul>'}}class U extends g{get template(){return'<p class="trip-events__msg">Click "New Event" to create your first point</p>'}}class z extends g{#r=[];#o=[];#a=[];#l=null;#c=null;constructor({point:e,offers:t,destinations:n,onEditClick:i,onFavoriteClick:s}){super(),this.#r=e,this.#o=t,this.#a=n,this.#l=i,this.#c=s,this.element.querySelector(".event__rollup-btn").addEventListener("click",this.#d),this.element.querySelector(".event__favorite-btn").addEventListener("click",this.#u)}get template(){return((e,t,n)=>{const{basePrice:i,dateFrom:s,dateTo:r,isFavorite:o,type:a}=e,l=t.find((t=>t.type===e.type)).offers.filter((t=>e.offers.includes(t.id))),c=n.find((t=>t.id===e.destination)),d=j(s,"MMM D"),u=j(s,H),h=j(r,H),p=(f=O(s,r)).get("day")?f.format("DD[D] HH[H] mm[M]"):!f.get("day")&&f.get("hour")?f.format("HH[H] mm[M]"):f.format("mm[M]");var f;const m=o?"event__favorite-btn--active":"";return`<li class="trip-events__item">\n            <div class="event">\n              \x3c!-- Дата начала события --\x3e\n              <time class="event__date" datetime="${s}">${d}</time>\n\n              \x3c!-- Иконка типа события --\x3e\n              <div class="event__type">\n                <img class="event__type-icon" width="42" height="42" src="img/icons/${a}.png" alt="Event type icon">\n              </div>\n\n              \x3c!-- Тип и место события --\x3e\n              <h3 class="event__title">${a} ${c.name}</h3>\n\n              \x3c!-- Время и продолжительность события --\x3e\n              <div class="event__schedule">\n                <p class="event__time">\n                  <time class="event__start-time" datetime="${s}">${u}</time>\n                  &mdash;\n                  <time class="event__end-time" datetime="${r}">${h}</time>\n                </p>\n                <p class="event__duration">${p}</p>\n              </div>\n\n              \x3c!-- Цена события --\x3e\n              <p class="event__price">&euro;&nbsp;<span class="event__price-value">${i}</span></p>\n\n              \x3c!-- Дополнительные опции --\x3e\n              <h4 class="visually-hidden">Offers:</h4>\n              ${(e=>0===e.length?"":`<ul class="event__selected-offers">\n  ${e.map((e=>`<li class="event__offer">\n      <span class="event__offer-title">${e.title}</span>\n      &plus;&euro;&nbsp;\n      <span class="event__offer-price">${e.price}</span>\n    </li>`)).join("")}\n  </ul>`)(l)}\n\n              \x3c!-- Добавление события в избранное --\x3e\n              <button class="event__favorite-btn ${m}" type="button">\n                <span class="visually-hidden">Add to favorite</span>\n                <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n                  <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>\n                </svg>\n              </button>\n\n              \x3c!-- Кнопка открытия/закрытия формы редактирования события --\x3e\n              <button class="event__rollup-btn" type="button">\n                <span class="visually-hidden">Open event</span>\n              </button>\n            </div>\n          </li>`})(this.#r,this.#o,this.#a)}#d=()=>this.#l();#u=()=>this.#c()}class R extends g{_state={};updateElement(e){e&&(this._setState(e),this.#h())}_restoreHandlers(){throw new Error("Abstract method not implemented: restoreHandlers")}_setState(e){this._state=structuredClone({...this._state,...e})}#h(){const e=this.element,t=e.parentElement;this.removeElement();const n=this.element;t.replaceChild(n,e),this._restoreHandlers()}}class V extends R{#o=[];#a=[];#p=null;#l=null;constructor({point:e,offers:t,destinations:n,onEditClick:i,onFormSubmit:s}){super(),this._setState(V.parsePointToState(e)),this.#o=t,this.#a=n,this.#l=i,this.#p=s,this.element.querySelector(".event__rollup-btn").addEventListener("click",this.#d),this.element.querySelector("form").addEventListener("submit",this.#f)}static parsePointToState(e){return{...e}}get template(){return((e,t,n)=>{const s=t.find((t=>t.type===e.type)).offers,r=s.filter((t=>e.offers.includes(t.id))),o=n.find((t=>t.id===e.destination)),{basePrice:a,dateFrom:l,dateTo:c,type:d}=e,{description:u,name:h,pictures:p}=o||{},f=e.id||0,m=j(l,P),v=j(c,P);return`<li class="trip-events__item">\n              <form class="event event--edit" action="#" method="post">\n\n                <header class="event__header">\n                \x3c!-- Выбор типа события --\x3e\n                  <div class="event__type-wrapper">\n                    <label class="event__type  event__type-btn" for="event-type-toggle-${f}">\n                      <span class="visually-hidden">Choose event type</span>\n                      <img class="event__type-icon" width="17" height="17" src="img/icons/${d}.png" alt="Event type icon">\n                    </label>\n                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${f}" type="checkbox">\n\n                    \x3c!-- Список типов событий --\x3e\n                    <div class="event__type-list">\n                      <fieldset class="event__type-group">\n                        <legend class="visually-hidden">Event type</legend>\n                        ${((e,t)=>`\n  ${M.map((n=>`<div class="event__type-item">\n        <input id="event-type-${n}-${e}" class="event__type-input  visually-hidden" type="radio"\n        name="event-type" value="${n}" ${n===t?"checked":""}>\n        <label class="event__type-label event__type-label--${n}" for="event-type-${n}-${e}">${i(n)}</label>\n    </div>`)).join("")}`)(f,d)}\n                      </fieldset>\n                    </div>\n                  </div>\n\n                  \x3c!-- Выбор пункта назначения --\x3e\n                  <div class="event__field-group  event__field-group--destination">\n                    <label class="event__label  event__type-output" for="event-destination-${f}">${d}</label>\n                    <input class="event__input  event__input--destination" id="event-destination-${f}" type="text" name="event-destination" value="${h||""}" list="destination-list-${f}">\n\n                    \x3c!-- Список пунктов назначения --\x3e\n                    <datalist id="destination-list-${f}">\n                      ${(e=>e.map((e=>`<option value="${e.name}"></option>`)).join(""))(n)}\n                    </datalist>\n                  </div>\n\n                  \x3c!-- Выбор даты и времени события --\x3e\n                  <div class="event__field-group  event__field-group--time">\n                    <label class="visually-hidden" for="event-start-time-${f}">From</label>\n                    <input class="event__input  event__input--time" id="event-start-time-${f}" type="text" name="event-start-time" value="${m}">\n                    &mdash;\n                    <label class="visually-hidden" for="event-end-time-${f}">To</label>\n                    <input class="event__input  event__input--time" id="event-end-time-${f}" type="text" name="event-end-time" value="${v}">\n                  </div>\n\n                  \x3c!-- Стоимость --\x3e\n                  <div class="event__field-group  event__field-group--price">\n                    <label class="event__label" for="event-price-${f}">\n                      <span class="visually-hidden">Price</span>\n                      &euro;\n                    </label>\n                    <input class="event__input  event__input--price" id="event-price-${f}" type="text" name="event-price" value="${a}">\n                  </div>\n\n                  \x3c!-- Кнопки --\x3e\n                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n                  <button class="event__reset-btn" type="reset">${e.id?"Delete":"Cancel"}</button>\n                  <button class="event__rollup-btn" type="button">\n                    <span class="visually-hidden">Open event</span>\n                  </button>\n                </header>\n\n                \x3c!-- Дополнительные опции и описание пункта назначения --\x3e\n                ${((e,t,n,i,s)=>0!==t.length||i?`<section class="event__details">\n            ${((e,t,n)=>{const i=e=>e.toLowerCase().split(" ").join("-");return 0===t.length?"":`<section class="event__section  event__section--offers">\n            <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n            <div class="event__available-offers">\n\n              ${t.map((t=>`\n              <div class="event__offer-selector">\n                <input class="event__offer-checkbox  visually-hidden" id="event-offer-${i(t.title)}-${e}" type="checkbox"\n                name="event-offer-${i(t.title)}"\n                ${n.map((e=>e.id)).includes(t.id)?"checked":""}>\n                <label class="event__offer-label" for="event-offer-${i(t.title)}-${e}">\n                  <span class="event__offer-title">${t.title}</span>\n                  &plus;&euro;&nbsp;\n                  <span class="event__offer-price">${t.price}</span>\n                </label>\n              </div>`)).join("")}\n            </div>\n          </section>`})(e,t,n)}\n            ${((e,t)=>e?`<section class="event__section  event__section--destination">\n            <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n            <p class="event__destination-description">${e}</p>\n\n            <div class="event__photos-container">\n              <div class="event__photos-tape">\n                ${t.map((e=>`<img class="event__photo" src="${e.src}" alt="${e.description}">`)).join("")}\n              </div>\n            </div>\n          </section>`:"")(i,s)}\n          </section>`:"")(f,s,r,u,p)}\n\n              </form>\n            </li>`})(this._state,this.#o,this.#a)}#d=()=>this.#l();#f=e=>{e.preventDefault(),this.#p(this._state)}}class J{#m=null;#v=null;#b=null;#r=[];#o=[];#a=[];#y=null;#$=null;#_=x;constructor({listComponent:e,onDataChange:t,onModeChange:n}){this.#m=e,this.#y=t,this.#$=n}init(e,t,n){this.#r=e,this.#o=t,this.#a=n;const i=this.#v,s=this.#b;this.#v=new z({point:this.#r,offers:this.#o,destinations:this.#a,onEditClick:this.#g,onFavoriteClick:this.#c}),this.#b=new V({point:this.#r,offers:this.#o,destinations:this.#a,onEditClick:this.#C,onFormSubmit:this.#p}),null!==i&&null!==s?(this.#_===x&&k(this.#v,i),this.#_===E&&k(this.#b,s),w(i),w(s)):C(this.#v,this.#m)}destroy(){w(this.#v),w(this.#b)}resetView(){this.#_!==x&&this.#k()}#w=()=>{k(this.#b,this.#v),document.addEventListener("keydown",this.#M),this.#$(),this.#_=E};#k=()=>{k(this.#v,this.#b),document.removeEventListener("keydown",this.#M),this.#_=x};#M=e=>{"Escape"===e.key&&(e.preventDefault(),this.#k())};#g=()=>{this.#w()};#C=()=>{this.#k()};#p=e=>{this.#y(e),this.#k()};#c=()=>{this.#y({...this.#r,isFavorite:!this.#r.isFavorite})}}const K=document.querySelector(".trip-events"),X=new class{#S=null;#a=null;#o=null;constructor(){this.#S=[],this.#a=[],this.#o=[]}init(){this.#S=e,this.#a=s,this.#o=r}get points(){return this.#S}get destinations(){return this.#a}get offers(){return this.#o}};X.init();const G=new class{#x=null;#E=new Y;#T=new I;#S=[];#t;constructor({pointModel:e}){this.#x=e}init(){this.#S=this.#x.points,this.#t=function(e){return Object.entries(q).map((([t,n])=>({type:t,count:n(e).length})))}(this.#S),this.#D(this.#t)}#D=e=>{C(this.#E,B,"afterbegin"),C(new L({filters:e}),Z),C(this.#T,B)}}({pointModel:X}),Q=new class{#x=null;#A=new Map;#F=null;#m=new N;#H=new U;#S=[];#o=[];#a=[];#P=S.DAY;#n=this.#P;constructor({pointModel:e}){this.#x=e}init(){this.#S=[...this.#x.points],this.#o=[...this.#x.offers],this.#a=[...this.#x.destinations],this.#j(),this.#O()}#j=()=>{0===this.#S.length&&C(this.#H,K)};#O=()=>{this.#q(),this.#Y(),this.#L(this.#P),this.#I()};#q=()=>{const e=this.#n,t=this.#i;this.#F=new W({currentSortType:e,onSortTypeChange:t}),C(this.#F,K)};#i=e=>{this.#B(),this.#L(e),this.#I()};#L=e=>{switch(e){case"day":default:this.#S.sort((e=>(t,n)=>D()(t[e]).diff(D()(n[e])))("dateFrom"));break;case"time":this.#S.sort((n="dateFrom",i="dateTo",(e,t)=>{const s=O(e[n],e[i]);return O(t[n],t[i]).asMilliseconds()-s.asMilliseconds()}));break;case"price":this.#S.sort((t="basePrice",(e,n)=>n[t]-e[t]))}var t,n,i;this.#n=e};#B=()=>{this.#A.forEach((e=>e.destroy())),this.#A.clear()};#Y=()=>{C(this.#m,K)};#I=()=>{this.#S.forEach((e=>this.#Z(e,this.#o,this.#a)))};#Z=(e,t,n)=>{const i=this.#m.element,s=this.#W,r=this.#$,o=new J({listComponent:i,onDataChange:s,onModeChange:r});o.init(e,t,n),this.#A.set(e.id,o)};#W=e=>{var t,n;this.#S=(t=this.#S,n=e,t.map((e=>e.id===n.id?n:e))),this.#A.get(e.id).init(e,this.#o,this.#a)};#$=()=>{this.#A.forEach((e=>e.resetView()))}}({pointModel:X});G.init(),Q.init()})()})();
//# sourceMappingURL=bundle.ef8a042580be716f0945.js.map