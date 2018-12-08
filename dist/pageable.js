/**
 * Pageable 0.5.5
 * 
 * https://github.com/Mobius1/Pageable
 * Released under the MIT license
 */
var _slicedToArray=function(){return function(t,i){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return function(t,i){var e=[],s=!0,n=!1,a=void 0;try{for(var o,r=t[Symbol.iterator]();!(s=(o=r.next()).done)&&(e.push(o.value),!i||e.length!==i);s=!0);}catch(t){n=!0,a=t}finally{try{!s&&r.return&&r.return()}finally{if(n)throw a}}return e}(t,i);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),_createClass=function(){function t(t,i){for(var e=0;e<i.length;e++){var s=i[e];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}return function(i,e,s){return e&&t(i.prototype,e),s&&t(i,s),i}}();function _possibleConstructorReturn(t,i){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!i||"object"!=typeof i&&"function"!=typeof i?t:i}function _inherits(t,i){if("function"!=typeof i&&null!==i)throw new TypeError("Super expression must either be null or a function, not "+typeof i);t.prototype=Object.create(i&&i.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),i&&(Object.setPrototypeOf?Object.setPrototypeOf(t,i):t.__proto__=i)}function _classCallCheck(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}var Emitter=function(){function t(){_classCallCheck(this,t)}return _createClass(t,[{key:"on",value:function(t,i){this.listeners=this.listeners||{},this.listeners[t]=this.listeners[t]||[],this.listeners[t].push(i)}},{key:"off",value:function(t,i){this.listeners=this.listeners||{},t in this.listeners!=!1&&this.listeners[t].splice(this.listeners[t].indexOf(i),1)}},{key:"emit",value:function(t){if(this.listeners=this.listeners||{},t in this.listeners!=!1)for(var i=0;i<this.listeners[t].length;i++)this.listeners[t][i].apply(this,[].slice.call(arguments,1))}}]),t}(),SlideShow=function(){function t(i){_classCallCheck(this,t),this.instance=i,this.running=!1,this.config=this.instance.config.slideshow}return _createClass(t,[{key:"start",value:function(){var t=this;this.running||(this.running=!0,this.instance.slideIndex=this.instance.index,this.instance.interval=setInterval(function(){t.instance.config.onBeforeStart.call(t.instance,t.instance.slideIndex),setTimeout(function(){t.instance.config.infinite&&t.instance._overScroll(!0),t.instance.index<t.instance.pages.length-1?t.instance.slideIndex++:t.instance.slideIndex=0,t.instance.scrollToIndex(t.instance.slideIndex)},t.config.delay||0)},this.config.interval))}},{key:"stop",value:function(){this.running&&(clearInterval(this.instance.interval),this.instance.slideInterval=!1,this.running=!1)}}]),t}(),Pageable=function(t){function i(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};_classCallCheck(this,i);var s,n=_possibleConstructorReturn(this,(i.__proto__||Object.getPrototypeOf(i)).call(this));if(void 0===t)return s=console.error("Pageable:","No container defined."),_possibleConstructorReturn(n,s);var a,o,r={pips:!0,animation:300,delay:0,throttle:50,orientation:"vertical",easing:function(t,i,e,s,n){return-e*(t/=s)*(t-2)+i},onInit:function(){},onUpdate:function(){},onBeforeStart:function(){},onStart:function(){},onScroll:function(){},onFinish:function(){},swipeThreshold:50,freeScroll:!1,slideshow:!1,infinite:!1,events:{wheel:!0,mouse:!0,touch:!0}};if(n.container="string"==typeof t?document.querySelector(t):t,!n.container)return a=console.error("Pageable:","The container could not be found."),_possibleConstructorReturn(n,a);if(n.config=Object.assign({},r,e),n.events=Object.assign({},r.events,e.events),n.config.anchors&&Array.isArray(n.config.anchors)){var l=document.createDocumentFragment();n.config.anchors.forEach(function(t){var i=document.createElement("div");i.dataset.anchor=t,l.appendChild(i)}),n.container.appendChild(l)}return n.pages=n.container.querySelectorAll("[data-anchor]"),n.pages.length?(n.horizontal="horizontal"===n.config.orientation,n.anchors=[],n.pages.forEach(function(t,i){var e=t.dataset.anchor.replace(/\s+/,"-").toLowerCase();t.id!==e&&(t.id=e),n.anchors.push("#"+e),t.classList.add("pg-page"),t.classList.toggle("pg-active",0==i)}),n.axis=n.horizontal?"x":"y",n.mouseAxis={x:"pageX",y:"pageY"},n.scrollAxis={x:"scrollLeft",y:"scrollTop"},n.size={x:"width",y:"height"},n.bar=n._getScrollBarWidth(),n.index=0,n.slideIndex=0,n.oldIndex=0,n.down=!1,n.initialised=!1,n.touch="ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch,n.init(),n):(o=console.error("Pageable:","No child nodes with the [data-anchor] attribute could be found."),_possibleConstructorReturn(n,o))}return _inherits(i,Emitter),_createClass(i,[{key:"init",value:function(){if(!this.initialised&&!this.container.pageable){var t=this.config;this.wrapper=document.createElement("div"),this.container.parentNode.insertBefore(this.wrapper,this.container),this.wrapper.appendChild(this.container),this.wrapper.classList.add("pg-wrapper","pg-"+t.orientation),this.wrapper.classList.add("pg-wrapper"),this.container.classList.add("pg-container"),document.body.style.margin=0,document.body.style.overflow="hidden",this.container.style.display="inline-block";for(var i=["Prev","Next"],e=0;e<i.length;e++){var s="nav"+i[e]+"El";t[s]&&("string"==typeof t[s]?this[s]=document.querySelector(t[s]):t[s]instanceof Element&&(this[s]=t[s]),this[s]&&this[s].classList.add("pg-nav"))}if(t.pips){var n=document.createElement("nav"),a=document.createElement("ul");n.classList.add("pg-pips");var o=!0,r=!1,l=void 0;try{for(var h,c=this.pages.entries()[Symbol.iterator]();!(o=(h=c.next()).done);o=!0){var d=_slicedToArray(h.value,2),u=d[0],f=d[1],g=document.createElement("li"),p=document.createElement("a"),v=document.createElement("span");p.href="#"+f.id,0==u&&p.classList.add("active"),p.appendChild(v),g.appendChild(p),a.appendChild(g)}}catch(t){r=!0,l=t}finally{try{!o&&c.return&&c.return()}finally{if(r)throw l}}n.appendChild(a),this.wrapper.appendChild(n),this.pips=Array.from(a.children)}this.pageCount=this.pages.length,this.lastIndex=this.pageCount-1,t.infinite&&this._toggleInfinite(),this.bind(),this.update(),this._load();var w=this._getData();this.config.onInit.call(this,w),this.emit("init",w),this.initialised=!0,this.container.pageable=this,t.slideshow&&"function"==typeof SlideShow&&(this.slider=new SlideShow(this),this.slider.start())}}},{key:"bind",value:function(){var t,i,e,s,n=this,a=arguments;this.callbacks={wheel:this._wheel.bind(this),update:(t=this.update.bind(this),i=this.config.throttle,s=void 0,function(){if(e=e||n,!s)return t.apply(e,a),s=!0,setTimeout(function(){s=!1},i)}),load:this._load.bind(this),start:this._start.bind(this),drag:this._drag.bind(this),stop:this._stop.bind(this),click:this._click.bind(this),prev:this.prev.bind(this),next:this.next.bind(this)},this.wrapper.addEventListener("wheel",this.callbacks.wheel,!1),window.addEventListener("resize",this.callbacks.update,!1),this.wrapper.addEventListener(this.touch?"touchstart":"mousedown",this.callbacks.start,!1),window.addEventListener(this.touch?"touchmove":"mousemove",this.callbacks.drag,!1),window.addEventListener(this.touch?"touchend":"mouseup",this.callbacks.stop,!1),this.navPrevEl&&(this.navPrevEl.addEventListener("click",this.callbacks.prev,!1),this.navNextEl&&this.navNextEl.addEventListener("click",this.callbacks.next,!1)),document.addEventListener("click",this.callbacks.click,!1)}},{key:"unbind",value:function(){this.wrapper.removeEventListener("wheel",this.callbacks.wheel),window.removeEventListener("resize",this.callbacks.update),this.wrapper.removeEventListener(this.touch?"touchstart":"mousedown",this.callbacks.start),window.addEventListener(this.touch?"touchmove":"mousemove",this.callbacks.drag),window.removeEventListener(this.touch?"touchend":"mouseup",this.callbacks.stop),this.navPrevEl&&this.navPrevEl.removeEventListener("click",this.callbacks.prev,!1),this.navNextEl&&this.navNextEl.removeEventListener("click",this.callbacks.next,!1),document.removeEventListener("click",this.callbacks.click)}},{key:"scrollToPage",value:function(t){this.scrollToIndex(t-1)}},{key:"scrollToAnchor",value:function(t){this.scrollToIndex(this.anchors.indexOf(t))}},{key:"scrollToIndex",value:function(t){if(!this.scrolling&&t>=0&&t<=this.pages.length-1){var i=this.index;this.index=t,this.oldIndex=i,this._scrollBy(this._getScrollAmount(i))}}},{key:"next",value:function(){if(this.config.infinite){var t=this.index;t===this.lastIndex&&(t++,this._scrollBy(-this.data.window[this.size[this.axis]],t))}this.scrollToIndex(this.index+1)}},{key:"prev",value:function(){if(this.config.infinite){var t=this.index;0===t&&(t--,this._scrollBy(this.data.window[this.size[this.axis]],t))}this.scrollToIndex(this.index-1)}},{key:"update",value:function(){var t=this;clearTimeout(this.timer),this.data={window:{width:window.innerWidth,height:window.innerHeight},container:{height:this.wrapper.scrollHeight,width:this.wrapper.scrollWidth}};var i=this.size[this.axis],e=this.horizontal?this.size.y:this.size.x;this.wrapper.style["overflow-"+this.axis]="scroll",this.wrapper.style[i]=this.data.window[i]+"px",this.wrapper.style[e]=this.data.window[e]+this.bar+"px";var s=this.config.infinite?this.pages.length+2:this.pages.length,n=this.config.infinite?this.data.window[i]:0;if(this.container.style[i]=s*this.data.window[i]+"px",this.wrapper.style["padding-"+(this.horizontal?"bottom":"right")]=this.bar+"px",this.wrapper[this.scrollAxis[this.axis]]=this.index*this.data.window[i]+n,this.scrollSize=s*this.data.window[i]-this.data.window[i],this.scrollPosition=this.data.window[i]*this.index+n,this.pages.forEach(function(s,n){t.horizontal&&(s.style.float="left"),s.style[i]=t.data.window[i]+"px",s.style[e]=t.data.window[e]+"px"}),this.config.infinite){var a=!0,o=!1,r=void 0;try{for(var l,h=this.clones[Symbol.iterator]();!(a=(l=h.next()).done);a=!0){var c=l.value;this.horizontal&&(c.style.float="left"),c.style[i]=this.data.window[i]+"px",c.style[e]=this.data.window[e]+"px"}}catch(t){o=!0,r=t}finally{try{!a&&h.return&&h.return()}finally{if(o)throw r}}}this.config.onUpdate.call(this,this._getData()),this.emit("update",this._getData())}},{key:"orientate",value:function(t){switch(t){case"vertical":this.horizontal=!1,this.axis="y",this.container.style.width="";break;case"horizontal":this.horizontal=!0,this.axis="x",this.container.style.height="";break;default:return!1}this.wrapper.classList.toggle("pg-vertical",!this.horizontal),this.wrapper.classList.toggle("pg-horizontal",this.horizontal),this.config.orientation=t,this.update()}},{key:"slideshow",value:function(){return this.slider}},{key:"destroy",value:function(){if(this.initialised){this.emit("destroy"),this.unbind(),document.body.style.margin="",document.body.style.overflow="",this.container.style.display="",this.container.style.height="",this.container.style.width="",this.container.classList.remove("pg-container"),this.wrapper.parentNode.replaceChild(this.container,this.wrapper);var t=!0,i=!1,e=void 0;try{for(var s,n=this.pages[Symbol.iterator]();!(t=(s=n.next()).done);t=!0){var a=s.value;a.style.height="",a.style.width="",a.style.float="",a.classList.remove("pg-page"),a.classList.remove("pg-active")}}catch(t){i=!0,e=t}finally{try{!t&&n.return&&n.return()}finally{if(i)throw e}}for(var o=["Prev","Next"],r=0;r<o.length;r++){var l="nav"+o[r]+"El";this[l]&&(this[l].classList.remove("active"),this[l].classList.remove("pg-nav"))}this.config.infinite&&this._toggleInfinite(!0),this.config.slideshow&&(this.slider.stop(),this.slider=!1),this.initialised=!1,delete this.container.pageable}}},{key:"_click",value:function(t){if(t.target.closest){var i=t.target.closest("a");i&&this.anchors.includes(i.hash)&&(t.preventDefault(),this.scrollToAnchor(i.hash))}}},{key:"_preventDefault",value:function(t){t.preventDefault(),t.stopPropagation()}},{key:"_start",value:function(t){var i=this._getEvent(t);return!this.scrolling&&!this.dragging&&("touchstart"!==t.type||this.events.touch?!!("mousedown"!==t.type||this.events.mouse&&0===t.button)&&(!!i.target.closest("[data-anchor]")&&(this._preventDefault(t),this.dragging=this.config.freeScroll,this.config.slideshow&&this.slider.stop(),this.down={x:i.clientX,y:i.clientY},this.startIndex=this.index,void this.config.onBeforeStart.call(this,this.index))):(i.target.closest("a")||this._preventDefault(t),!1))}},{key:"_drag",value:function(t){if(this.config.freeScroll&&this.dragging&&!this.scrolling){var i=this._getEvent(t),e=this._limitDrag(i),s=this._getData();this.container.style.transform=this.horizontal?"translate3d("+e+"px, 0, 0)":"translate3d(0, "+e+"px, 0)",s.scrolled-=e,this.config.onScroll.call(this,s,"drag"),this.emit("scroll",s)}}},{key:"_stop",value:function(t){var i=this,e=this._getEvent(t),s=function(){return i.index<i.pages.length-1&&i.index++},n=function(){return 0<i.index&&i.index--};this.oldIndex=this.index;var a=Math.abs(e[this.mouseAxis[this.axis]]-this.down[this.axis])>=this.config.swipeThreshold,o=this.down&&a;if(this.config.slideshow&&this.slider.start(),this.dragging&&!this.scrolling){var r=this._limitDrag(e);return this.dragging=r,o&&(this.config.infinite&&this._overScroll(r<0,r),r>0?n():s()),this._scrollBy(this._getScrollAmount(this.oldIndex)-r),void(this.down=!1)}if(this.down&&!this.scrolling){var l=e[this.mouseAxis[this.axis]]<this.down[this.axis],h=e[this.mouseAxis[this.axis]]>this.down[this.axis];o&&(this.config.infinite&&this._overScroll(l),l?s():h&&n()),this.startIndex===this.index?this.config.onFinish.call(this,this._getData()):this._scrollBy(this._getScrollAmount(this.oldIndex)),this.down=!1}}},{key:"_wheel",value:function(t){if(t.preventDefault(),this.events.wheel&&!this.scrolling){var i=this.index,e=this.index,s=0<t.deltaY;this.config.infinite&&this._overScroll(s),s?this.index<this.pages.length-1&&i++:0<this.index&&i--,i!==e&&(this.oldIndex=e,this.scrollToIndex(i))}}},{key:"_load",value:function(t){var i=this,e=location.hash;if(e){var s=this.anchors.indexOf(e);if(s>-1){var n=this.config.infinite?1:0;this.scrollPosition=this.data.window[this.size[this.axis]]*(s+n);var a=this._getData();this.index=s,this.slideIndex=s,this.pages.forEach(function(t,e){t.classList.toggle("pg-active",e===i.index)}),this._setNavs(),this._setPips(),this.config.onScroll.call(this,a),this.config.onFinish.call(this,a),this.emit("scroll",a)}}this.update()}},{key:"_getEvent",value:function(t){return this.touch?"touchend"===t.type?t.changedTouches[0]:t.touches[0]:t}},{key:"_getData",value:function(){return{index:this.index,scrolled:this.config.infinite?this.scrollPosition-this.data.window[this.size[this.axis]]:this.scrollPosition,max:this.config.infinite?this.scrollSize-2*this.data.window[this.size[this.axis]]:this.scrollSize}}},{key:"_overScroll",value:function(t){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,e=this.index;e===this.lastIndex&&t?(e++,this._scrollBy(-this.data.window[this.size[this.axis]]-i,e)):0!==e||t||(e--,this._scrollBy(this.data.window[this.size[this.axis]]-i,e))}},{key:"_scrollBy",value:function(t,i){var e=this;if(this.scrolling)return!1;this.scrolling=!0,this.config.onBeforeStart.call(this,this.oldIndex),this.emit("scroll.before",this._getData()),this.config.slideshow&&this.slider.stop(),this.timer=setTimeout(function(){var s=Date.now(),n=e._getScrollOffset();e.config.onStart.call(e,e.pages[e.index].id),e.emit("scroll.start",e._getData()),e.frame=requestAnimationFrame(function a(){var o=Date.now()-s;if(o>e.config.animation){cancelAnimationFrame(e.frame),e.container.style.transform="",e.frame=!1,e.scrolling=!1,e.dragging=!1,e.config.slideshow&&e.slider.start(),e.config.infinite&&(i===e.pageCount?e.index=0:-1===i&&(e.index=e.lastIndex));var r=e._getData();return window.location.hash=e.pages[e.index].id,e.pages.forEach(function(t,i){t.classList.toggle("pg-active",i===e.index)}),e.slideIndex=e.index,e._setPips(),e._setNavs(),e.config.onFinish.call(e,r),e.emit("scroll.end",r),!1}var l=e.dragging?e.dragging:0,h=e.config.easing(o,l,t,e.config.animation);e.container.style.transform=e.horizontal?"translate3d("+h+"px, 0, 0)":"translate3d(0, "+h+"px, 0)",e.scrollPosition=n[e.axis]-h;var c=e._getData();e.config.infinite&&(i===e.pageCount?c.scrolled=0:-1===i&&(c.scrolled=c.max)),e.config.onScroll.call(e,c),e.emit("scroll",c),e.frame=requestAnimationFrame(a)})},this.dragging?0:this.config.delay)}},{key:"_getScrollOffset",value:function(){return{x:this.wrapper.scrollLeft,y:this.wrapper.scrollTop}}},{key:"_getScrollAmount",value:function(t,i){void 0===i&&(i=this.index);var e=this.data.window[this.size[this.axis]];return e*t-e*i}},{key:"_getScrollBarWidth",value:function(){var t,i=document.body,e=document.createElement("div");return e.style.cssText="width: 100; height: 100; overflow: scroll; position: absolute; top: -9999;",i.appendChild(e),t=e.offsetWidth-e.clientWidth,i.removeChild(e),t}},{key:"_toggleInfinite",value:function(t){if(t&&this.config.infinite){var i=!0,e=!1,s=void 0;try{for(var n,a=this.clones[Symbol.iterator]();!(i=(n=a.next()).done);i=!0){var o=n.value;this.container.removeChild(o)}}catch(t){e=!0,s=t}finally{try{!i&&a.return&&a.return()}finally{if(e)throw s}}this.config.infinite=!1}else if(!this.config.infinite){this.config.infinite=!0;var r=this.pages[0].cloneNode(!0),l=this.pages[this.lastIndex].cloneNode(!0);r.id=r.id+"-clone",l.id=l.id+"-clone",r.classList.add("pg-clone"),l.classList.add("pg-clone"),r.classList.remove("pg-active"),l.classList.remove("pg-active"),this.clones=[r,l],this.container.insertBefore(l,this.pages[0]),this.container.appendChild(r)}this.update()}},{key:"_limitDrag",value:function(t){var i=t[this.mouseAxis[this.axis]]-this.down[this.axis];return this.config.infinite||(0===this.index&&i>0||this.index===this.pages.length-1&&i<0)&&(i/=10),i}},{key:"_setNavs",value:function(){this.navPrevEl&&this.navPrevEl.classList.toggle("active",this.config.infinite||this.index>0),this.navNextEl&&this.navNextEl.classList.toggle("active",this.config.infinite||this.index<this.pages.length-1)}},{key:"_setPips",value:function(t){this.config.pips&&(void 0===t&&(t=this.index),this.pips.forEach(function(i,e){i.firstElementChild.classList.toggle("active",e==t)}))}}]),i}();