/*
* EASYDROPDOWN - A Drop-down Builder for Styleable Inputs and Menus
* Version: 2.1.4
* License: Creative Commons Attribution 3.0 Unported - CC BY 3.0
* http://creativecommons.org/licenses/by/3.0/
* This software may be used freely on commercial and non-commercial projects with attribution to the author/copyright holder.
* Author: Patrick Kunka
* Copyright 2013 Patrick Kunka, All Rights Reserved
*/

(function(d){function e(){this.isField=!0;this.keyboardMode=this.hasLabel=this.cutOff=this.disabled=this.inFocus=this.down=!1;this.nativeTouch=!0;this.wrapperClass="dropdown";this.onChange=null}e.prototype={constructor:e,instances:{},init:function(a,c){var b=this;d.extend(b,c);b.$select=d(a);b.id=a.id;b.options=[];b.$options=b.$select.find("option");b.isTouch="ontouchend"in document;b.$select.removeClass(b.wrapperClass+" dropdown");b.$select.is(":disabled")&&(b.disabled=!0);b.$options.length&&(b.$options.each(function(a){var c=
d(this);c.is(":selected")&&(b.selected={index:a,title:c.text()},b.focusIndex=a);c.hasClass("label")&&0==a?(b.hasLabel=!0,b.label=c.text(),c.attr("value","")):b.options.push({domNode:c[0],title:c.text(),value:c.val(),selected:c.is(":selected")})}),b.selected||(b.selected={index:0,title:b.$options.eq(0).text()},b.focusIndex=0),b.render())},render:function(){var a=this;a.$container=a.$select.wrap('<div class="'+a.wrapperClass+(a.isTouch&&a.nativeTouch?" touch":"")+(a.disabled?" disabled":"")+'"><span class="old"/></div>').parent().parent();
a.$active=d('<span class="selected">'+a.selected.title+"</span>").appendTo(a.$container);a.$carat=d('<span class="carat"/>').appendTo(a.$container);a.$scrollWrapper=d("<div><ul/></div>").appendTo(a.$container);a.$dropDown=a.$scrollWrapper.find("ul");a.$form=a.$container.closest("form");d.each(a.options,function(){a.$dropDown.append("<li"+(this.selected?' class="active"':"")+">"+this.title+"</li>")});a.$items=a.$dropDown.find("li");a.cutOff&&a.$items.length>a.cutOff&&a.$container.addClass("scrollable");
a.getMaxHeight();a.isTouch&&a.nativeTouch?a.bindTouchHandlers():a.bindHandlers()},getMaxHeight:function(){for(i=this.maxHeight=0;i<this.$items.length;i++){var a=this.$items.eq(i);this.maxHeight+=a.outerHeight();if(this.cutOff==i+1)break}},bindTouchHandlers:function(){var a=this;a.$container.on("click.easyDropDown",function(){a.$select.focus()});a.$select.on({change:function(){var c=d(this).find("option:selected"),b=c.text(),c=c.val();a.$active.text(b);"function"===typeof a.onChange&&a.onChange.call(a.$select[0],
{title:b,value:c})},focus:function(){a.$container.addClass("focus")},blur:function(){a.$container.removeClass("focus")}})},bindHandlers:function(){var a=this;a.query="";a.$container.on({"click.easyDropDown":function(){a.down||a.disabled?a.close():a.open()},"mousemove.easyDropDown":function(){a.keyboardMode&&(a.keyboardMode=!1)}});d("body").on("click.easyDropDown."+a.id,function(c){c=d(c.target);var b=a.wrapperClass.split(" ").join(".");!c.closest("."+b).length&&a.down&&a.close()});a.$items.on({"click.easyDropDown":function(){var c=
d(this).index();a.select(c);a.$select.focus()},"mouseover.easyDropDown":function(){if(!a.keyboardMode){var c=d(this);c.addClass("focus").siblings().removeClass("focus");a.focusIndex=c.index()}},"mouseout.easyDropDown":function(){a.keyboardMode||d(this).removeClass("focus")}});a.$select.on({"focus.easyDropDown":function(){a.$container.addClass("focus");a.inFocus=!0},"blur.easyDropDown":function(){a.$container.removeClass("focus");a.inFocus=!1},"keydown.easyDropDown":function(c){if(a.inFocus){a.keyboardMode=
!0;var b=c.keyCode;if(38==b||40==b||32==b)c.preventDefault(),38==b?(a.focusIndex--,a.focusIndex=0>a.focusIndex?a.$items.length-1:a.focusIndex):40==b&&(a.focusIndex++,a.focusIndex=a.focusIndex>a.$items.length-1?0:a.focusIndex),a.down||a.open(),a.$items.removeClass("focus").eq(a.focusIndex).addClass("focus"),a.cutOff&&a.scrollToView(),a.query="";if(a.down)if(9==b||27==b)a.close();else{if(13==b)return c.preventDefault(),a.select(a.focusIndex),a.close(),!1;if(8==b)return c.preventDefault(),a.query=a.query.slice(0,
-1),a.search(),clearTimeout(a.resetQuery),!1;38!=b&&40!=b&&(c=String.fromCharCode(b),a.query+=c,a.search(),clearTimeout(a.resetQuery))}}},"keyup.easyDropDown":function(){a.resetQuery=setTimeout(function(){a.query=""},1200)}});a.$dropDown.on("scroll.easyDropDown",function(c){a.$dropDown[0].scrollTop>=a.$dropDown[0].scrollHeight-a.maxHeight?a.$container.addClass("bottom"):a.$container.removeClass("bottom")});if(a.$form.length)a.$form.on("reset.easyDropDown",function(){a.$active.text(a.hasLabel?a.label:
a.options[0].title)})},unbindHandlers:function(){this.$container.add(this.$select).add(this.$items).add(this.$form).add(this.$dropDown).off(".easyDropDown");d("body").off("."+this.id)},open:function(){var a=window.scrollY||document.documentElement.scrollTop,c=window.scrollX||document.documentElement.scrollLeft,b=this.notInViewport(a);this.closeAll();this.getMaxHeight();this.$select.focus();window.scrollTo(c,a+b);this.$container.addClass("open");this.$scrollWrapper.css("height",this.maxHeight+"px");
this.down=!0},close:function(){this.$container.removeClass("open");this.$scrollWrapper.css("height","0px");this.focusIndex=this.selected.index;this.query="";this.down=!1},closeAll:function(){var a=Object.getPrototypeOf(this).instances,c;for(c in a)a[c].close()},select:function(a){"string"===typeof a&&(a=this.$select.find("option[value="+a+"]").index()-1);var c=this.options[a],b=this.hasLabel?a+1:a;this.$items.removeClass("active").eq(a).addClass("active");this.$active.text(c.title);this.$select.find("option").removeAttr("selected").eq(b).prop("selected",
!0).parent().trigger("change");this.selected={index:a,title:c.title};this.focusIndex=i;"function"===typeof this.onChange&&this.onChange.call(this.$select[0],{title:c.title,value:c.value})},search:function(){var a=this,c=function(b){a.focusIndex=b;a.$items.removeClass("focus").eq(a.focusIndex).addClass("focus");a.scrollToView()};for(i=0;i<a.options.length;i++){var b=a.options[i].title.toUpperCase();if(0==b.indexOf(a.query)){c(i);return}}for(i=0;i<a.options.length;i++)if(b=a.options[i].title.toUpperCase(),
-1<b.indexOf(a.query)){c(i);break}},scrollToView:function(){if(this.focusIndex>=this.cutOff){var a=this.$items.eq(this.focusIndex).outerHeight()*(this.focusIndex+1)-this.maxHeight;this.$dropDown.scrollTop(a)}},notInViewport:function(a){var c=a+(window.innerHeight||document.documentElement.clientHeight),b=this.$dropDown.offset().top+this.maxHeight;return b>=a&&b<=c?0:b-c+5},destroy:function(){this.unbindHandlers();this.$select.unwrap().siblings().remove();this.$select.unwrap();delete Object.getPrototypeOf(this).instances[this.$select[0].id]},
disable:function(){this.disabled=!0;this.$container.addClass("disabled");this.$select.attr("disabled",!0);this.down||this.close()},enable:function(){this.disabled=!1;this.$container.removeClass("disabled");this.$select.attr("disabled",!1)}};var f=function(a,c){a.id=a.id?a.id:"EasyDropDown"+("00000"+(16777216*Math.random()<<0).toString(16)).substr(-6).toUpperCase();var b=new e;b.instances[a.id]||(b.instances[a.id]=b,b.init(a,c))};d.fn.easyDropDown=function(){var a=arguments,c=[],b;b=this.each(function(){if(a&&
"string"===typeof a[0]){var b=e.prototype.instances[this.id][a[0]](a[1],a[2]);b&&c.push(b)}else f(this,a[0])});return c.length?1<c.length?c:c[0]:b};d(function(){"function"!==typeof Object.getPrototypeOf&&(Object.getPrototypeOf="object"===typeof"test".__proto__?function(a){return a.__proto__}:function(a){return a.constructor.prototype});d("select.dropdown").each(function(){var a=d(this).attr("data-settings");settings=a?d.parseJSON(a):{};f(this,settings)})})})(jQuery);


/*! noUiSlider - 7.0.9 - 2014-10-08 16:49:45 */

!function(){"use strict";function a(a){return a.split("").reverse().join("")}function b(a,b){return a.substring(0,b.length)===b}function c(a,b){return a.slice(-1*b.length)===b}function d(a,b,c){if((a[b]||a[c])&&a[b]===a[c])throw new Error(b)}function e(a){return"number"==typeof a&&isFinite(a)}function f(a,b){var c=Math.pow(10,b);return(Math.round(a*c)/c).toFixed(b)}function g(b,c,d,g,h,i,j,k,l,m,n,o){var p,q,r,s=o,t="",u="";return i&&(o=i(o)),e(o)?(b&&0===parseFloat(o.toFixed(b))&&(o=0),0>o&&(p=!0,o=Math.abs(o)),b!==!1&&(o=f(o,b)),o=o.toString(),-1!==o.indexOf(".")?(q=o.split("."),r=q[0],d&&(t=d+q[1])):r=o,c&&(r=a(r).match(/.{1,3}/g),r=a(r.join(a(c)))),p&&k&&(u+=k),g&&(u+=g),p&&l&&(u+=l),u+=r,u+=t,h&&(u+=h),m&&(u=m(u,s)),u):!1}function h(a,d,f,g,h,i,j,k,l,m,n,o){var p,q="";return n&&(o=n(o)),o&&"string"==typeof o?(k&&b(o,k)&&(o=o.replace(k,""),p=!0),g&&b(o,g)&&(o=o.replace(g,"")),l&&b(o,l)&&(o=o.replace(l,""),p=!0),h&&c(o,h)&&(o=o.slice(0,-1*h.length)),d&&(o=o.split(d).join("")),f&&(o=o.replace(f,".")),p&&(q+="-"),q+=o,q=q.replace(/[^0-9\.\-.]/g,""),""===q?!1:(q=Number(q),j&&(q=j(q)),e(q)?q:!1)):!1}function i(a){var b,c,e,f={};for(b=0;b<l.length;b+=1)if(c=l[b],e=a[c],void 0===e)f[c]="negative"!==c||f.negativeBefore?"mark"===c&&"."!==f.thousand?".":!1:"-";else if("decimals"===c){if(!(e>=0&&8>e))throw new Error(c);f[c]=e}else if("encoder"===c||"decoder"===c||"edit"===c||"undo"===c){if("function"!=typeof e)throw new Error(c);f[c]=e}else{if("string"!=typeof e)throw new Error(c);f[c]=e}return d(f,"mark","thousand"),d(f,"prefix","negative"),d(f,"prefix","negativeBefore"),f}function j(a,b,c){var d,e=[];for(d=0;d<l.length;d+=1)e.push(a[l[d]]);return e.push(c),b.apply("",e)}function k(a){return this instanceof k?void("object"==typeof a&&(a=i(a),this.to=function(b){return j(a,g,b)},this.from=function(b){return j(a,h,b)})):new k(a)}var l=["decimals","thousand","mark","prefix","postfix","encoder","decoder","negativeBefore","negative","edit","undo"];window.wNumb=k}(),function(a){"use strict";function b(b){return b instanceof a||a.zepto&&a.zepto.isZ(b)}function c(b,c){return"string"==typeof b&&0===b.indexOf("-inline-")?(this.method=c||"html",this.target=this.el=a(b.replace("-inline-","")||"<div/>"),!0):void 0}function d(b){if("string"==typeof b&&0!==b.indexOf("-")){this.method="val";var c=document.createElement("input");return c.name=b,c.type="hidden",this.target=this.el=a(c),!0}}function e(a){return"function"==typeof a?(this.target=!1,this.method=a,!0):void 0}function f(a,c){return b(a)&&!c?(a.is("input, select, textarea")?(this.method="val",this.target=a.on("change.liblink",this.changeHandler)):(this.target=a,this.method="html"),!0):void 0}function g(a,c){return b(a)&&("function"==typeof c||"string"==typeof c&&a[c])?(this.method=c,this.target=a,!0):void 0}function h(b,c,d){var e=this,f=!1;if(this.changeHandler=function(b){var c=e.formatInstance.from(a(this).val());return c===!1||isNaN(c)?(a(this).val(e.lastSetValue),!1):void e.changeHandlerMethod.call("",b,c)},this.el=!1,this.formatInstance=d,a.each(k,function(a,d){return f=d.call(e,b,c),!f}),!f)throw new RangeError("(Link) Invalid Link.")}function i(a){this.items=[],this.elements=[],this.origin=a}function j(b,c,d,e){0===b&&(b=this.LinkDefaultFlag),this.linkAPI||(this.linkAPI={}),this.linkAPI[b]||(this.linkAPI[b]=new i(this));var f=new h(c,d,e||this.LinkDefaultFormatter);f.target||(f.target=a(this)),f.changeHandlerMethod=this.LinkConfirm(b,f.el),this.linkAPI[b].push(f,f.el),this.LinkUpdate(b)}var k=[c,d,e,f,g];h.prototype.set=function(a){var b=Array.prototype.slice.call(arguments),c=b.slice(1);this.lastSetValue=this.formatInstance.to(a),c.unshift(this.lastSetValue),("function"==typeof this.method?this.method:this.target[this.method]).apply(this.target,c)},i.prototype.push=function(a,b){this.items.push(a),b&&this.elements.push(b)},i.prototype.reconfirm=function(a){var b;for(b=0;b<this.elements.length;b+=1)this.origin.LinkConfirm(a,this.elements[b])},i.prototype.remove=function(){var a;for(a=0;a<this.items.length;a+=1)this.items[a].target.off(".liblink");for(a=0;a<this.elements.length;a+=1)this.elements[a].remove()},i.prototype.change=function(a){if(this.origin.LinkIsEmitting)return!1;this.origin.LinkIsEmitting=!0;var b,c=Array.prototype.slice.call(arguments,1);for(c.unshift(a),b=0;b<this.items.length;b+=1)this.items[b].set.apply(this.items[b],c);this.origin.LinkIsEmitting=!1},a.fn.Link=function(b){var c=this;if(b===!1)return c.each(function(){this.linkAPI&&(a.map(this.linkAPI,function(a){a.remove()}),delete this.linkAPI)});if(void 0===b)b=0;else if("string"!=typeof b)throw new Error("Flag must be string.");return{to:function(a,d,e){return c.each(function(){j.call(this,b,a,d,e)})}}}}(window.jQuery||window.Zepto),function(a){"use strict";function b(b){return a.grep(b,function(c,d){return d===a.inArray(c,b)})}function c(a,b){return Math.round(a/b)*b}function d(a){return"number"==typeof a&&!isNaN(a)&&isFinite(a)}function e(a){var b=Math.pow(10,7);return Number((Math.round(a*b)/b).toFixed(7))}function f(a,b,c){a.addClass(b),setTimeout(function(){a.removeClass(b)},c)}function g(a){return Math.max(Math.min(a,100),0)}function h(b){return a.isArray(b)?b:[b]}function i(a,b){return 100/(b-a)}function j(a,b){return 100*b/(a[1]-a[0])}function k(a,b){return j(a,a[0]<0?b+Math.abs(a[0]):b-a[0])}function l(a,b){return b*(a[1]-a[0])/100+a[0]}function m(a,b){for(var c=1;a>=b[c];)c+=1;return c}function n(a,b,c){if(c>=a.slice(-1)[0])return 100;var d,e,f,g,h=m(c,a);return d=a[h-1],e=a[h],f=b[h-1],g=b[h],f+k([d,e],c)/i(f,g)}function o(a,b,c){if(c>=100)return a.slice(-1)[0];var d,e,f,g,h=m(c,b);return d=a[h-1],e=a[h],f=b[h-1],g=b[h],l([d,e],(c-f)*i(f,g))}function p(a,b,d,e){if(100===e)return e;var f,g,h=m(e,a);return d?(f=a[h-1],g=a[h],e-f>(g-f)/2?g:f):b[h-1]?a[h-1]+c(e-a[h-1],b[h-1]):e}function q(a,b,c){var e;if("number"==typeof b&&(b=[b]),"[object Array]"!==Object.prototype.toString.call(b))throw new Error("noUiSlider: 'range' contains invalid value.");if(e="min"===a?0:"max"===a?100:parseFloat(a),!d(e)||!d(b[0]))throw new Error("noUiSlider: 'range' value isn't numeric.");c.xPct.push(e),c.xVal.push(b[0]),e?c.xSteps.push(isNaN(b[1])?!1:b[1]):isNaN(b[1])||(c.xSteps[0]=b[1])}function r(a,b,c){return b?void(c.xSteps[a]=j([c.xVal[a],c.xVal[a+1]],b)/i(c.xPct[a],c.xPct[a+1])):!0}function s(a,b,c,d){this.xPct=[],this.xVal=[],this.xSteps=[d||!1],this.xNumSteps=[!1],this.snap=b,this.direction=c;var e,f=this;for(e in a)a.hasOwnProperty(e)&&q(e,a[e],f);f.xNumSteps=f.xSteps.slice(0);for(e in f.xNumSteps)f.xNumSteps.hasOwnProperty(e)&&r(Number(e),f.xNumSteps[e],f)}function t(a,b){if(!d(b))throw new Error("noUiSlider: 'step' is not numeric.");a.singleStep=b}function u(b,c){if("object"!=typeof c||a.isArray(c))throw new Error("noUiSlider: 'range' is not an object.");if(void 0===c.min||void 0===c.max)throw new Error("noUiSlider: Missing 'min' or 'max' in 'range'.");b.spectrum=new s(c,b.snap,b.dir,b.singleStep)}function v(b,c){if(c=h(c),!a.isArray(c)||!c.length||c.length>2)throw new Error("noUiSlider: 'start' option is incorrect.");b.handles=c.length,b.start=c}function w(a,b){if(a.snap=b,"boolean"!=typeof b)throw new Error("noUiSlider: 'snap' option must be a boolean.")}function x(a,b){if(a.animate=b,"boolean"!=typeof b)throw new Error("noUiSlider: 'animate' option must be a boolean.")}function y(a,b){if("lower"===b&&1===a.handles)a.connect=1;else if("upper"===b&&1===a.handles)a.connect=2;else if(b===!0&&2===a.handles)a.connect=3;else{if(b!==!1)throw new Error("noUiSlider: 'connect' option doesn't match handle count.");a.connect=0}}function z(a,b){switch(b){case"horizontal":a.ort=0;break;case"vertical":a.ort=1;break;default:throw new Error("noUiSlider: 'orientation' option is invalid.")}}function A(a,b){if(!d(b))throw new Error("noUiSlider: 'margin' option must be numeric.");if(a.margin=a.spectrum.getMargin(b),!a.margin)throw new Error("noUiSlider: 'margin' option is only supported on linear sliders.")}function B(a,b){if(!d(b))throw new Error("noUiSlider: 'limit' option must be numeric.");if(a.limit=a.spectrum.getMargin(b),!a.limit)throw new Error("noUiSlider: 'limit' option is only supported on linear sliders.")}function C(a,b){switch(b){case"ltr":a.dir=0;break;case"rtl":a.dir=1,a.connect=[0,2,1,3][a.connect];break;default:throw new Error("noUiSlider: 'direction' option was not recognized.")}}function D(a,b){if("string"!=typeof b)throw new Error("noUiSlider: 'behaviour' must be a string containing options.");var c=b.indexOf("tap")>=0,d=b.indexOf("drag")>=0,e=b.indexOf("fixed")>=0,f=b.indexOf("snap")>=0;a.events={tap:c||f,drag:d,fixed:e,snap:f}}function E(a,b){if(a.format=b,"function"==typeof b.to&&"function"==typeof b.from)return!0;throw new Error("noUiSlider: 'format' requires 'to' and 'from' methods.")}function F(b){var c,d={margin:0,limit:0,animate:!0,format:Y};return c={step:{r:!1,t:t},start:{r:!0,t:v},connect:{r:!0,t:y},direction:{r:!0,t:C},snap:{r:!1,t:w},animate:{r:!1,t:x},range:{r:!0,t:u},orientation:{r:!1,t:z},margin:{r:!1,t:A},limit:{r:!1,t:B},behaviour:{r:!0,t:D},format:{r:!1,t:E}},b=a.extend({connect:!1,direction:"ltr",behaviour:"tap",orientation:"horizontal"},b),a.each(c,function(a,c){if(void 0===b[a]){if(c.r)throw new Error("noUiSlider: '"+a+"' is required.");return!0}c.t(d,b[a])}),d.style=d.ort?"top":"left",d}function G(a,b,c){var d=a+b[0],e=a+b[1];return c?(0>d&&(e+=Math.abs(d)),e>100&&(d-=e-100),[g(d),g(e)]):[d,e]}function H(a){a.preventDefault();var b,c,d=0===a.type.indexOf("touch"),e=0===a.type.indexOf("mouse"),f=0===a.type.indexOf("pointer"),g=a;return 0===a.type.indexOf("MSPointer")&&(f=!0),a.originalEvent&&(a=a.originalEvent),d&&(b=a.changedTouches[0].pageX,c=a.changedTouches[0].pageY),(e||f)&&(f||void 0!==window.pageXOffset||(window.pageXOffset=document.documentElement.scrollLeft,window.pageYOffset=document.documentElement.scrollTop),b=a.clientX+window.pageXOffset,c=a.clientY+window.pageYOffset),g.points=[b,c],g.cursor=e,g}function I(b,c){var d=a("<div><div/></div>").addClass(X[2]),e=["-lower","-upper"];return b&&e.reverse(),d.children().addClass(X[3]+" "+X[3]+e[c]),d}function J(a,b,c){switch(a){case 1:b.addClass(X[7]),c[0].addClass(X[6]);break;case 3:c[1].addClass(X[6]);case 2:c[0].addClass(X[7]);case 0:b.addClass(X[6])}}function K(a,b,c){var d,e=[];for(d=0;a>d;d+=1)e.push(I(b,d).appendTo(c));return e}function L(b,c,d){return d.addClass([X[0],X[8+b],X[4+c]].join(" ")),a("<div/>").appendTo(d).addClass(X[1])}function M(b,c,d){function e(){return B[["width","height"][c.ort]]()}function i(a){var b,c=[D.val()];for(b=0;b<a.length;b+=1)D.trigger(a[b],c)}function j(a){return 1===a.length?a[0]:c.dir?a.reverse():a}function k(a){return function(b,c){D.val([a?null:c,a?c:null],!0)}}function l(b){var c=a.inArray(b,M);D[0].linkAPI&&D[0].linkAPI[b]&&D[0].linkAPI[b].change(I[c],C[c].children(),D)}function m(b,d){var e=a.inArray(b,M);return d&&d.appendTo(C[e].children()),c.dir&&c.handles>1&&(e=1===e?0:1),k(e)}function n(){var a,b;for(a=0;a<M.length;a+=1)this.linkAPI&&this.linkAPI[b=M[a]]&&this.linkAPI[b].reconfirm(b)}function o(a,b,d,e){return a=a.replace(/\s/g,V+" ")+V,b.on(a,function(a){return D.attr("disabled")?!1:D.hasClass(X[14])?!1:(a=H(a),a.calcPoint=a.points[c.ort],void d(a,e))})}function p(a,b){var c,d=b.handles||C,f=!1,g=100*(a.calcPoint-b.start)/e(),h=d[0][0]!==C[0][0]?1:0;c=G(g,b.positions,d.length>1),f=u(d[0],c[h],1===d.length),d.length>1&&(f=u(d[1],c[h?0:1],!1)||f),f&&i(["slide"])}function q(b){a("."+X[15]).removeClass(X[15]),b.cursor&&a("body").css("cursor","").off(V),T.off(V),D.removeClass(X[12]),i(["set","change"])}function r(b,c){1===c.handles.length&&c.handles[0].children().addClass(X[15]),b.stopPropagation(),o(W.move,T,p,{start:b.calcPoint,handles:c.handles,positions:[E[0],E[C.length-1]]}),o(W.end,T,q,null),b.cursor&&(a("body").css("cursor",a(b.target).css("cursor")),C.length>1&&D.addClass(X[12]),a("body").on("selectstart"+V,!1))}function s(b){var d,g=b.calcPoint,h=0;b.stopPropagation(),a.each(C,function(){h+=this.offset()[c.style]}),h=h/2>g||1===C.length?0:1,g-=B.offset()[c.style],d=100*g/e(),c.events.snap||f(D,X[14],300),u(C[h],d),i(["slide","set","change"]),c.events.snap&&r(b,{handles:[C[h]]})}function t(a){var b,c;if(!a.fixed)for(b=0;b<C.length;b+=1)o(W.start,C[b].children(),r,{handles:[C[b]]});a.tap&&o(W.start,B,s,{handles:C}),a.drag&&(c=B.find("."+X[7]).addClass(X[10]),a.fixed&&(c=c.add(B.children().not(c).children())),o(W.start,c,r,{handles:C}))}function u(a,b,d){var e=a[0]!==C[0][0]?1:0,f=E[0]+c.margin,h=E[1]-c.margin,i=E[0]+c.limit,j=E[1]-c.limit;return C.length>1&&(b=e?Math.max(b,f):Math.min(b,h)),d!==!1&&c.limit&&C.length>1&&(b=e?Math.min(b,i):Math.max(b,j)),b=F.getStep(b),b=g(parseFloat(b.toFixed(7))),b===E[e]?!1:(a.css(c.style,b+"%"),a.is(":first-child")&&a.toggleClass(X[17],b>50),E[e]=b,I[e]=F.fromStepping(b),l(M[e]),!0)}function v(a,b){var d,e,f;for(c.limit&&(a+=1),d=0;a>d;d+=1)e=d%2,f=b[e],null!==f&&f!==!1&&("number"==typeof f&&(f=String(f)),f=c.format.from(f),(f===!1||isNaN(f)||u(C[e],F.toStepping(f),d===3-c.dir)===!1)&&l(M[e]))}function w(a){if(D[0].LinkIsEmitting)return this;var b,d=h(a);return c.dir&&c.handles>1&&d.reverse(),c.animate&&-1!==E[0]&&f(D,X[14],300),b=C.length>1?3:1,1===d.length&&(b=1),v(b,d),i(["set"]),this}function x(){var a,b=[];for(a=0;a<c.handles;a+=1)b[a]=c.format.to(I[a]);return j(b)}function y(){return a(this).off(V).removeClass(X.join(" ")).empty(),delete this.LinkUpdate,delete this.LinkConfirm,delete this.LinkDefaultFormatter,delete this.LinkDefaultFlag,delete this.reappend,delete this.vGet,delete this.vSet,delete this.getCurrentStep,delete this.getInfo,delete this.destroy,d}function z(){var b=a.map(E,function(a,b){var c=F.getApplicableStep(a),d=I[b],e=c[2],f=d-c[2]>=c[1]?c[2]:c[0];return[[f,e]]});return j(b)}function A(){return d}var B,C,D=a(b),E=[-1,-1],F=c.spectrum,I=[],M=["lower","upper"].slice(0,c.handles);if(c.dir&&M.reverse(),b.LinkUpdate=l,b.LinkConfirm=m,b.LinkDefaultFormatter=c.format,b.LinkDefaultFlag="lower",b.reappend=n,D.hasClass(X[0]))throw new Error("Slider was already initialized.");B=L(c.dir,c.ort,D),C=K(c.handles,c.dir,B),J(c.connect,D,C),t(c.events),b.vSet=w,b.vGet=x,b.destroy=y,b.getCurrentStep=z,b.getOriginalOptions=A,b.getInfo=function(){return[F,c.style,c.ort]},D.val(c.start)}function N(a){if(!this.length)throw new Error("noUiSlider: Can't initialize slider on empty selection.");var b=F(a,this);return this.each(function(){M(this,b,a)})}function O(b){return this.each(function(){if(!this.destroy)return void a(this).noUiSlider(b);var c=a(this).val(),d=this.destroy(),e=a.extend({},d,b);a(this).noUiSlider(e),this.reappend(),d.start===e.start&&a(this).val(c)})}function P(){return this[0][arguments.length?"vSet":"vGet"].apply(this[0],arguments)}function Q(b,c,d,e){if("range"===c||"steps"===c)return b.xVal;if("count"===c){var f,g=100/(d-1),h=0;for(d=[];(f=h++*g)<=100;)d.push(f);c="positions"}return"positions"===c?a.map(d,function(a){return b.fromStepping(e?b.getStep(a):a)}):"values"===c?e?a.map(d,function(a){return b.fromStepping(b.getStep(b.toStepping(a)))}):d:void 0}function R(c,d,e,f){var g=c.direction,h={},i=c.xVal[0],j=c.xVal[c.xVal.length-1],k=!1,l=!1,m=0;return c.direction=0,f=b(f.slice().sort(function(a,b){return a-b})),f[0]!==i&&(f.unshift(i),k=!0),f[f.length-1]!==j&&(f.push(j),l=!0),a.each(f,function(b){var g,i,j,n,o,p,q,r,s,t,u=f[b],v=f[b+1];if("steps"===e&&(g=c.xNumSteps[b]),g||(g=v-u),u!==!1&&void 0!==v)for(i=u;v>=i;i+=g){for(n=c.toStepping(i),o=n-m,r=o/d,s=Math.round(r),t=o/s,j=1;s>=j;j+=1)p=m+j*t,h[p.toFixed(5)]=["x",0];q=a.inArray(i,f)>-1?1:"steps"===e?2:0,!b&&k&&(q=0),i===v&&l||(h[n.toFixed(5)]=[i,q]),m=n}}),c.direction=g,h}function S(b,c,d,e,f,g){function h(a,b){return["-normal","-large","-sub"][a&&f?f(b,a):a]}function i(a,c,d){return'class="'+c+" "+c+"-"+k+" "+c+h(d[1],d[0])+'" style="'+b+": "+a+'%"'}function j(a,b){d&&(a=100-a),l.append("<div "+i(a,"noUi-marker",b)+"></div>"),b[1]&&l.append("<div "+i(a,"noUi-value",b)+">"+g.to(b[0])+"</div>")}var k=["horizontal","vertical"][c],l=a("<div/>");return l.addClass("noUi-pips noUi-pips-"+k),a.each(e,j),l}var T=a(document),U=a.fn.val,V=".nui",W=window.navigator.pointerEnabled?{start:"pointerdown",move:"pointermove",end:"pointerup"}:window.navigator.msPointerEnabled?{start:"MSPointerDown",move:"MSPointerMove",end:"MSPointerUp"}:{start:"mousedown touchstart",move:"mousemove touchmove",end:"mouseup touchend"},X=["noUi-target","noUi-base","noUi-origin","noUi-handle","noUi-horizontal","noUi-vertical","noUi-background","noUi-connect","noUi-ltr","noUi-rtl","noUi-dragable","","noUi-state-drag","","noUi-state-tap","noUi-active","","noUi-stacking"];s.prototype.getMargin=function(a){return 2===this.xPct.length?j(this.xVal,a):!1},s.prototype.toStepping=function(a){return a=n(this.xVal,this.xPct,a),this.direction&&(a=100-a),a},s.prototype.fromStepping=function(a){return this.direction&&(a=100-a),e(o(this.xVal,this.xPct,a))},s.prototype.getStep=function(a){return this.direction&&(a=100-a),a=p(this.xPct,this.xSteps,this.snap,a),this.direction&&(a=100-a),a},s.prototype.getApplicableStep=function(a){var b=m(a,this.xPct),c=100===a?2:1;return[this.xNumSteps[b-2],this.xVal[b-c],this.xNumSteps[b-c]]},s.prototype.convert=function(a){return this.getStep(this.toStepping(a))};var Y={to:function(a){return a.toFixed(2)},from:Number};a.fn.val=function(b){function c(a){return a.hasClass(X[0])?P:U}if(void 0===b){var d=a(this[0]);return c(d).call(d)}var e=a.isFunction(b);return this.each(function(d){var f=b,g=a(this);e&&(f=b.call(this,d,g.val())),c(g).call(g,f)})},a.fn.noUiSlider=function(a,b){switch(a){case"step":return this[0].getCurrentStep();case"options":return this[0].getOriginalOptions()}return(b?O:N).call(this,a)},a.fn.noUiSlider_pips=function(b){var c=b.mode,d=b.density||1,e=b.filter||!1,f=b.values||!1,g=b.format||{to:Math.round},h=b.stepped||!1;return this.each(function(){var b=this.getInfo(),i=Q(b[0],c,f,h),j=R(b[0],d,c,i);return a(this).append(S(b[1],b[2],b[0].direction,j,e,g))})}}(window.jQuery||window.Zepto);


/*jslint browser: true */
/*jslint white: true */

(function( $ ){

	'use strict';

// Helpers

	// Test in an object is an instance of jQuery or Zepto.
	function isInstance ( a ) {
		return a instanceof $ || ( $.zepto && $.zepto.isZ(a) );
	}


// Link types

	function fromPrefix ( target, method ) {

		// If target is a string, a new hidden input will be created.
		if ( typeof target === 'string' && target.indexOf('-inline-') === 0 ) {

			// By default, use the 'html' method.
			this.method = method || 'html';

			// Use jQuery to create the element
			this.target = this.el = $( target.replace('-inline-', '') || '<div/>' );

			return true;
		}
	}

	function fromString ( target ) {

		// If the string doesn't begin with '-', which is reserved, add a new hidden input.
		if ( typeof target === 'string' && target.indexOf('-') !== 0 ) {

			this.method = 'val';

			var element = document.createElement('input');
				element.name = target;
				element.type = 'hidden';
			this.target = this.el = $(element);

			return true;
		}
	}

	function fromFunction ( target ) {

		// The target can also be a function, which will be called.
		if ( typeof target === 'function' ) {
			this.target = false;
			this.method = target;

			return true;
		}
	}

	function fromInstance ( target, method ) {

		if ( isInstance( target ) && !method ) {

		// If a jQuery/Zepto input element is provided, but no method is set,
		// the element can assume it needs to respond to 'change'...
			if ( target.is('input, select, textarea') ) {

				// Default to .val if this is an input element.
				this.method = 'val';

				// Fire the API changehandler when the target changes.
				this.target = target.on('change.liblink', this.changeHandler);

			} else {

				this.target = target;

				// If no method is set, and we are not auto-binding an input, default to 'html'.
				this.method = 'html';
			}

			return true;
		}
	}

	function fromInstanceMethod ( target, method ) {

		// The method must exist on the element.
		if ( isInstance( target ) &&
			(typeof method === 'function' ||
				(typeof method === 'string' && target[method]))
		) {
			this.method = method;
			this.target = target;

			return true;
		}
	}

var
/** @const */
	creationFunctions = [fromPrefix, fromString, fromFunction, fromInstance, fromInstanceMethod];


// Link Instance

/** @constructor */
	function Link ( target, method, format ) {

		var that = this, valid = false;

		// Forward calls within scope.
		this.changeHandler = function ( changeEvent ) {
			var decodedValue = that.formatInstance.from( $(this).val() );

			// If the value is invalid, stop this event, as well as it's propagation.
			if ( decodedValue === false || isNaN(decodedValue) ) {

				// Reset the value.
				$(this).val(that.lastSetValue);
				return false;
			}

			that.changeHandlerMethod.call( '', changeEvent, decodedValue );
		};

		// See if this Link needs individual targets based on its usage.
		// If so, return the element that needs to be copied by the
		// implementing interface.
		// Default the element to false.
		this.el = false;

		// Store the formatter, or use the default.
		this.formatInstance = format;

		// Try all Link types.
		/*jslint unparam: true*/
		$.each(creationFunctions, function(i, fn){
			valid = fn.call(that, target, method);
			return !valid;
		});
		/*jslint unparam: false*/

		// Nothing matched, throw error.
		if ( !valid ) {
			throw new RangeError("(Link) Invalid Link.");
		}
	}

	// Provides external items with the object value.
	Link.prototype.set = function ( value ) {

		// Ignore the value, so only the passed-on arguments remain.
		var args = Array.prototype.slice.call( arguments ),
			additionalArgs = args.slice(1);

		// Store some values. The actual, numerical value,
		// the formatted value and the parameters for use in 'resetValue'.
		// Slice additionalArgs to break the relation.
		this.lastSetValue = this.formatInstance.to( value );

		// Prepend the value to the function arguments.
		additionalArgs.unshift(
			this.lastSetValue
		);

		// When target is undefined, the target was a function.
		// In that case, provided the object as the calling scope.
		// Branch between writing to a function or an object.
		( typeof this.method === 'function' ?
			this.method :
			this.target[ this.method ] ).apply( this.target, additionalArgs );
	};


// Developer API

/** @constructor */
	function LinkAPI ( origin ) {
		this.items = [];
		this.elements = [];
		this.origin = origin;
	}

	LinkAPI.prototype.push = function( item, element ) {
		this.items.push(item);

		// Prevent 'false' elements
		if ( element ) {
			this.elements.push(element);
		}
	};

	LinkAPI.prototype.reconfirm = function ( flag ) {
		var i;
		for ( i = 0; i < this.elements.length; i += 1 ) {
			this.origin.LinkConfirm(flag, this.elements[i]);
		}
	};

	LinkAPI.prototype.remove = function ( flag ) {
		var i;
		for ( i = 0; i < this.items.length; i += 1 ) {
			this.items[i].target.off('.liblink');
		}
		for ( i = 0; i < this.elements.length; i += 1 ) {
			this.elements[i].remove();
		}
	};

	LinkAPI.prototype.change = function ( value ) {

		if ( this.origin.LinkIsEmitting ) {
			return false;
		}

		this.origin.LinkIsEmitting = true;

		var args = Array.prototype.slice.call( arguments, 1 ), i;
		args.unshift( value );

		// Write values to serialization Links.
		// Convert the value to the correct relative representation.
		for ( i = 0; i < this.items.length; i += 1 ) {
			this.items[i].set.apply(this.items[i], args);
		}

		this.origin.LinkIsEmitting = false;
	};


// jQuery plugin

	function binder ( flag, target, method, format ){

		if ( flag === 0 ) {
			flag = this.LinkDefaultFlag;
		}

		// Create a list of API's (if it didn't exist yet);
		if ( !this.linkAPI ) {
			this.linkAPI = {};
		}

		// Add an API point.
		if ( !this.linkAPI[flag] ) {
			this.linkAPI[flag] = new LinkAPI(this);
		}

		var linkInstance = new Link ( target, method, format || this.LinkDefaultFormatter );

		// Default the calling scope to the linked object.
		if ( !linkInstance.target ) {
			linkInstance.target = $(this);
		}

		// If the Link requires creation of a new element,
		// Pass the element and request confirmation to get the changehandler.
		// Set the method to be called when a Link changes.
		linkInstance.changeHandlerMethod = this.LinkConfirm( flag, linkInstance.el );

		// Store the linkInstance in the flagged list.
		this.linkAPI[flag].push( linkInstance, linkInstance.el );

		// Now that Link have been connected, request an update.
		this.LinkUpdate( flag );
	}

	/** @export */
	$.fn.Link = function( flag ){

		var that = this;

		// Delete all linkAPI
		if ( flag === false ) {

			return that.each(function(){

				// .Link(false) can be called on elements without Links.
				// When that happens, the objects can't be looped.
				if ( !this.linkAPI ) {
					return;
				}

				$.map(this.linkAPI, function(api){
					api.remove();
				});

				delete this.linkAPI;
			});
		}

		if ( flag === undefined ) {

			flag = 0;

		} else if ( typeof flag !== 'string') {

			throw new Error("Flag must be string.");
		}

		return {
			to: function( a, b, c ){
				return that.each(function(){
					binder.call(this, flag, a, b, c);
				});
			}
		};
	};

}( window.jQuery || window.Zepto ));


/*!
 * ScrewDefaultButtons v2.0.6
 * http://screwdefaultbuttons.com/
 *
 * Licensed under the MIT license.
 * Copyright 2013 Matt Solano http://mattsolano.com
 *
 * Date: Mon February 25 2013
 */(function(e,t,n,r){var i={init:function(t){var n=e.extend({image:null,width:50,height:50,disabled:!1},t);return this.each(function(){var t=e(this),r=n.image,i=t.data("sdb-image");i&&(r=i);r||e.error("There is no image assigned for ScrewDefaultButtons");t.wrap("<div >").css({display:"none"});var s=t.attr("class"),o=t.attr("onclick"),u=t.parent("div");u.addClass(s);u.attr("onclick",o);u.css({"background-image":r,width:n.width,height:n.height,cursor:"pointer"});var a=0,f=-n.height;if(t.is(":disabled")){a=-(n.height*2);f=-(n.height*3)}t.on("disableBtn",function(){t.attr("disabled","disabled");a=-(n.height*2);f=-(n.height*3);t.trigger("resetBackground")});t.on("enableBtn",function(){t.removeAttr("disabled");a=0;f=-n.height;t.trigger("resetBackground")});t.on("resetBackground",function(){t.is(":checked")?u.css({backgroundPosition:"0 "+f+"px"}):u.css({backgroundPosition:"0 "+a+"px"})});t.trigger("resetBackground");if(t.is(":checkbox")){u.on("click",function(){t.is(":disabled")||t.change()});u.addClass("styledCheckbox");t.on("change",function(){if(t.prop("checked")){t.prop("checked",!1);u.css({backgroundPosition:"0 "+a+"px"})}else{t.prop("checked",!0);u.css({backgroundPosition:"0 "+f+"px"})}})}else if(t.is(":radio")){u.addClass("styledRadio");var l=t.attr("name");u.on("click",function(){!t.prop("checked")&&!t.is(":disabled")&&t.change()});t.on("change",function(){if(t.prop("checked")){t.prop("checked",!1);u.css({backgroundPosition:"0 "+a+"px"})}else{t.prop("checked",!0);u.css({backgroundPosition:"0 "+f+"px"});var n=e('input[name="'+l+'"]').not(t);n.trigger("radioSwitch")}});t.on("radioSwitch",function(){u.css({backgroundPosition:"0 "+a+"px"})});var c=e(this).attr("id"),h=e('label[for="'+c+'"]');h.on("click",function(){u.trigger("click")})}if(!e.support.leadingWhitespace){var c=e(this).attr("id"),h=e('label[for="'+c+'"]');h.on("click",function(){u.trigger("click")})}})},check:function(){return this.each(function(){var t=e(this);i.isChecked(t)||t.change()})},uncheck:function(){return this.each(function(){var t=e(this);i.isChecked(t)&&t.change()})},toggle:function(){return this.each(function(){var t=e(this);t.change()})},disable:function(){return this.each(function(){var t=e(this);t.trigger("disableBtn")})},enable:function(){return this.each(function(){var t=e(this);t.trigger("enableBtn")})},isChecked:function(e){return e.prop("checked")?!0:!1}};e.fn.screwDefaultButtons=function(t,n){if(i[t])return i[t].apply(this,Array.prototype.slice.call(arguments,1));if(typeof t=="object"||!t)return i.init.apply(this,arguments);e.error("Method "+t+" does not exist on jQuery.screwDefaultButtons")};return this})(jQuery);

 

 // JavaScript Document

 /**
 * jQuery jPages v0.7
 * Client side pagination with jQuery
 * http://luis-almeida.github.com/jPages
 
 
 * Licensed under the MIT license.
 * Copyright 2012 LuÃ­s Almeida
 * https://github.com/luis-almeida
 */

;(function($, window, document, undefined) {

  var name = "jPages",
      instance = null,
      defaults = {
        containerID: "",
        first: false,
        previous: "Previous",
        next: "Next",
        last: false,
        links: false, // blank || title
        startPage: 1,
        perPage: 15,
        midRange: 10,
        startRange: 1,
        endRange: 1,
        keyBrowse: false,
        scrollBrowse: false,
        pause: 0,
        clickStop: false,
        delay: 50,
        direction: "forward", // backwards || auto || random ||
        animation: "", // http://daneden.me/animate/ - any entrance animations
        fallback: 400,
        minHeight: true,
        callback: undefined // function( pages, items ) { }
      };


  function Plugin(element, options) {
    this.options = $.extend({}, defaults, options);

    this._container = $("#" + this.options.containerID);
    if (!this._container.length) return;

    this.jQwindow = $(window);
    this.jQdocument = $(document);

    this._holder = $(element);
    this._nav = {};

    this._first = $(this.options.first);
    this._previous = $(this.options.previous);
    this._next = $(this.options.next);
    this._last = $(this.options.last);

    /* only visible items! */
    this._items = this._container.children(":visible");
    this._itemsShowing = $([]);
    this._itemsHiding = $([]);

    this._numPages = Math.ceil(this._items.length / this.options.perPage);
    this._currentPageNum = this.options.startPage;

    this._clicked = false;
    this._cssAnimSupport = this.getCSSAnimationSupport();

    this.init();
  }

  Plugin.prototype = {

    constructor : Plugin,

    getCSSAnimationSupport : function() {
      var animation = false,
          animationstring = 'animation',
          keyframeprefix = '',
          domPrefixes = 'Webkit Moz O ms Khtml'.split(' '),
          pfx = '',
          elm = this._container.get(0);

      if (elm.style.animationName) animation = true;

      if (animation === false) {
        for (var i = 0; i < domPrefixes.length; i++) {
          if (elm.style[domPrefixes[i] + 'AnimationName'] !== undefined) {
            pfx = domPrefixes[i];
            animationstring = pfx + 'Animation';
            keyframeprefix = '-' + pfx.toLowerCase() + '-';
            animation = true;
            break;
          }
        }
      }

      return animation;
    },

    init : function() {
      this.setStyles();
      this.setNav();
      this.paginate(this._currentPageNum);
      this.setMinHeight();
    },

    setStyles : function() {
      var requiredStyles = "<style>" +
      ".jp-invisible { visibility: hidden !important; } " +
      ".jp-hidden { display: none !important; }" +
      "</style>";

      $(requiredStyles).appendTo("head");

      if (this._cssAnimSupport && this.options.animation.length)
        this._items.addClass("animated jp-hidden");
      else this._items.hide();

    },

    setNav : function() {
      var navhtml = this.writeNav();

      this._holder.each(this.bind(function(index, element) {
        var holder = $(element);
        holder.html(navhtml);
        this.cacheNavElements(holder, index);
        this.bindNavHandlers(index);
        this.disableNavSelection(element);
      }, this));

      if (this.options.keyBrowse) this.bindNavKeyBrowse();
      if (this.options.scrollBrowse) this.bindNavScrollBrowse();
    },

    writeNav : function() {
      var i = 1, navhtml;
      navhtml = this.writeBtn("first") + this.writeBtn("previous");

      for (; i <= this._numPages; i++) {
        if (i === 1 && this.options.startRange === 0) navhtml += "<span>...</span>";
        if (i > this.options.startRange && i <= this._numPages - this.options.endRange)
          navhtml += "<a href='#' class='jp-hidden'>";
        else
          navhtml += "<a>";

        switch (this.options.links) {
          case "numeric":
            navhtml += i;
            break;
          case "blank":
            break;
          case "title":
            var title = this._items.eq(i - 1).attr("data-title");
            navhtml += title !== undefined ? title : "";
            break;
        }

        navhtml += "</a>";
        if (i === this.options.startRange || i === this._numPages - this.options.endRange)
          navhtml += "<span>...</span>";
      }
      navhtml += this.writeBtn("next") + this.writeBtn("last") + "</div>";
      return navhtml;
    },

    writeBtn : function(which) {

      return this.options[which] !== false && !$(this["_" + which]).length ?
      "<a class='jp-" + which + "'>" + this.options[which] + "</a>" : "";

    },

    cacheNavElements : function(holder, index) {
      this._nav[index] = {};
      this._nav[index].holder = holder;
      this._nav[index].first = this._first.length ? this._first : this._nav[index].holder.find("a.jp-first");
      this._nav[index].previous = this._previous.length ? this._previous : this._nav[index].holder.find("a.jp-previous");
      this._nav[index].next = this._next.length ? this._next : this._nav[index].holder.find("a.jp-next");
      this._nav[index].last = this._last.length ? this._last : this._nav[index].holder.find("a.jp-last");
      this._nav[index].fstBreak = this._nav[index].holder.find("span:first");
      this._nav[index].lstBreak = this._nav[index].holder.find("span:last");
      this._nav[index].pages = this._nav[index].holder.find("a").not(".jp-first, .jp-previous, .jp-next, .jp-last");
      this._nav[index].permPages =
        this._nav[index].pages.slice(0, this.options.startRange)
          .add(this._nav[index].pages.slice(this._numPages - this.options.endRange, this._numPages));
      this._nav[index].pagesShowing = $([]);
      this._nav[index].currentPage = $([]);
    },

    bindNavHandlers : function(index) {
      var nav = this._nav[index];

      // default nav
      nav.holder.bind("click.jPages", this.bind(function(evt) {
        var newPage = this.getNewPage(nav, $(evt.target));
        if (this.validNewPage(newPage)) {
          this._clicked = true;
          this.paginate(newPage);
        }
        evt.preventDefault();
      }, this));

      // custom first
      if (this._first.length) {
        this._first.bind("click.jPages", this.bind(function() {
          if (this.validNewPage(1)) {
            this._clicked = true;
            this.paginate(1);
          }
        }, this));
      }

      // custom previous
      if (this._previous.length) {
        this._previous.bind("click.jPages", this.bind(function() {
          var newPage = this._currentPageNum - 1;
          if (this.validNewPage(newPage)) {
            this._clicked = true;
            this.paginate(newPage);
          }
        }, this));
      }

      // custom next
      if (this._next.length) {
        this._next.bind("click.jPages", this.bind(function() {
          var newPage = this._currentPageNum + 1;
          if (this.validNewPage(newPage)) {
            this._clicked = true;
            this.paginate(newPage);
          }
        }, this));
      }

      // custom last
      if (this._last.length) {
        this._last.bind("click.jPages", this.bind(function() {
          if (this.validNewPage(this._numPages)) {
            this._clicked = true;
            this.paginate(this._numPages);
          }
        }, this));
      }

    },

    disableNavSelection : function(element) {
      if (typeof element.onselectstart != "undefined")
        element.onselectstart = function() {
          return false;
        };
      else if (typeof element.style.MozUserSelect != "undefined")
        element.style.MozUserSelect = "none";
      else
        element.onmousedown = function() {
          return false;
        };
    },

    bindNavKeyBrowse : function() {
      this.jQdocument.bind("keydown.jPages", this.bind(function(evt) {
        var target = evt.target.nodeName.toLowerCase();
        if (this.elemScrolledIntoView() && target !== "input" && target != "textarea") {
          var newPage = this._currentPageNum;

          if (evt.which == 37) newPage = this._currentPageNum - 1;
          if (evt.which == 39) newPage = this._currentPageNum + 1;

          if (this.validNewPage(newPage)) {
            this._clicked = true;
            this.paginate(newPage);
          }
        }
      }, this));
    },

    elemScrolledIntoView : function() {
      var docViewTop, docViewBottom, elemTop, elemBottom;
      docViewTop = this.jQwindow.scrollTop();
      docViewBottom = docViewTop + this.jQwindow.height();
      elemTop = this._container.offset().top;
      elemBottom = elemTop + this._container.height();
      return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom));

      // comment above and uncomment below if you want keyBrowse to happen
      // only when container is completely visible in the page
      /*return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom) &&
                (elemBottom <= docViewBottom) &&  (elemTop >= docViewTop) );*/
    },

    bindNavScrollBrowse : function() {
      this._container.bind("mousewheel.jPages DOMMouseScroll.jPages", this.bind(function(evt) {
        var newPage = (evt.originalEvent.wheelDelta || -evt.originalEvent.detail) > 0 ?
        (this._currentPageNum - 1) : (this._currentPageNum + 1);
        if (this.validNewPage(newPage)) {
          this._clicked = true;
          this.paginate(newPage);
        }
        evt.preventDefault();
        return false;
      }, this));
    },

    getNewPage : function(nav, target) {
      if (target.is(nav.currentPage)) return this._currentPageNum;
      if (target.is(nav.pages)) return nav.pages.index(target) + 1;
      if (target.is(nav.first)) return 1;
      if (target.is(nav.last)) return this._numPages;
      if (target.is(nav.previous)) return nav.pages.index(nav.currentPage);
      if (target.is(nav.next)) return nav.pages.index(nav.currentPage) + 2;
    },

    validNewPage : function(newPage) {
      return newPage !== this._currentPageNum && newPage > 0 && newPage <= this._numPages;
    },

    paginate : function(page) {
      var itemRange, pageInterval;
      itemRange = this.updateItems(page);
      pageInterval = this.updatePages(page);
      this._currentPageNum = page;
      if ($.isFunction(this.options.callback))
        this.callback(page, itemRange, pageInterval);

      this.updatePause();
    },

    updateItems : function(page) {
      var range = this.getItemRange(page);
      this._itemsHiding = this._itemsShowing;
      this._itemsShowing = this._items.slice(range.start, range.end);
      if (this._cssAnimSupport && this.options.animation.length) this.cssAnimations(page);
      else this.jQAnimations(page);
      return range;
    },

    getItemRange : function(page) {
      var range = {};
      range.start = (page - 1) * this.options.perPage;
      range.end = range.start + this.options.perPage;
      if (range.end > this._items.length) range.end = this._items.length;
      return range;
    },

    cssAnimations : function(page) {
      clearInterval(this._delay);

      this._itemsHiding
        .removeClass(this.options.animation + " jp-invisible")
        .addClass("jp-hidden");

      this._itemsShowing
        .removeClass("jp-hidden")
        .addClass("jp-invisible");

      this._itemsOriented = this.getDirectedItems(page);
      this._index = 0;

      this._delay = setInterval(this.bind(function() {
        if (this._index === this._itemsOriented.length) clearInterval(this._delay);
        else {
          this._itemsOriented
          .eq(this._index)
          .removeClass("jp-invisible")
          .addClass(this.options.animation);
        }
        this._index = this._index + 1;
      }, this), this.options.delay);
    },

    jQAnimations : function(page) {
      clearInterval(this._delay);
      this._itemsHiding.addClass("jp-hidden");
      this._itemsShowing.fadeTo(0, 0).removeClass("jp-hidden");
      this._itemsOriented = this.getDirectedItems(page);
      this._index = 0;
      this._delay = setInterval(this.bind(function() {
        if (this._index === this._itemsOriented.length) clearInterval(this._delay);
        else {
          this._itemsOriented
          .eq(this._index)
          .fadeTo(this.options.fallback, 1);
        }
        this._index = this._index + 1;
      }, this), this.options.delay);
    },

    getDirectedItems : function(page) {
      var itemsToShow;

      switch (this.options.direction) {
        case "backwards":
          itemsToShow = $(this._itemsShowing.get().reverse());
          break;
        case "random":
          itemsToShow = $(this._itemsShowing.get().sort(function() {
            return (Math.round(Math.random()) - 0.5);
          }));
          break;
        case "auto":
          itemsToShow = page >= this._currentPageNum ?
          this._itemsShowing : $(this._itemsShowing.get().reverse());
          break;
        default:
          itemsToShow = this._itemsShowing;
      }

      return itemsToShow;
    },

    updatePages : function(page) {
      var interval, index, nav;
      interval = this.getInterval(page);
      for (index in this._nav) {
        if (this._nav.hasOwnProperty(index)) {
          nav = this._nav[index];
          this.updateBtns(nav, page);
          this.updateCurrentPage(nav, page);
          this.updatePagesShowing(nav, interval);
          this.updateBreaks(nav, interval);
        }
      }
      return interval;
    },

    getInterval : function(page) {
      var neHalf, upperLimit, start, end;
      neHalf = Math.ceil(this.options.midRange / 2);
      upperLimit = this._numPages - this.options.midRange;
      start = page > neHalf ? Math.max(Math.min(page - neHalf, upperLimit), 0) : 0;
      end = page > neHalf ?
        Math.min(page + neHalf - (this.options.midRange % 2 > 0 ? 1 : 0), this._numPages) :
        Math.min(this.options.midRange, this._numPages);
      return {start: start,end: end};
    },

    updateBtns : function(nav, page) {
      if (page === 1) {
        nav.first.addClass("jp-disabled");
        nav.previous.addClass("jp-disabled");
      }
      if (page === this._numPages) {
        nav.next.addClass("jp-disabled");
        nav.last.addClass("jp-disabled");
      }
      if (this._currentPageNum === 1 && page > 1) {
        nav.first.removeClass("jp-disabled");
        nav.previous.removeClass("jp-disabled");
      }
      if (this._currentPageNum === this._numPages && page < this._numPages) {
        nav.next.removeClass("jp-disabled");
        nav.last.removeClass("jp-disabled");
      }
    },

    updateCurrentPage : function(nav, page) {
      nav.currentPage.removeClass("jp-current");
      nav.currentPage = nav.pages.eq(page - 1).addClass("jp-current");
    },

    updatePagesShowing : function(nav, interval) {
      var newRange = nav.pages.slice(interval.start, interval.end).not(nav.permPages);
      nav.pagesShowing.not(newRange).addClass("jp-hidden");
      newRange.not(nav.pagesShowing).removeClass("jp-hidden");
      nav.pagesShowing = newRange;
    },

    updateBreaks : function(nav, interval) {
      if (
        interval.start > this.options.startRange ||
        (this.options.startRange === 0 && interval.start > 0)
      ) nav.fstBreak.removeClass("jp-hidden");
      else nav.fstBreak.addClass("jp-hidden");

      if (interval.end < this._numPages - this.options.endRange) nav.lstBreak.removeClass("jp-hidden");
      else nav.lstBreak.addClass("jp-hidden");
    },

    callback : function(page, itemRange, pageInterval) {
      var pages = {
            current: page,
            interval: pageInterval,
            count: this._numPages
          },
          items = {
            showing: this._itemsShowing,
            oncoming: this._items.slice(itemRange.start + this.options.perPage, itemRange.end + this.options.perPage),
            range: itemRange,
            count: this._items.length
          };

      pages.interval.start = pages.interval.start + 1;
      items.range.start = items.range.start + 1;
      this.options.callback(pages, items);
    },

    updatePause : function() {
      if (this.options.pause && this._numPages > 1) {
        clearTimeout(this._pause);
        if (this.options.clickStop && this._clicked) return;
        else {
          this._pause = setTimeout(this.bind(function() {
            this.paginate(this._currentPageNum !== this._numPages ? this._currentPageNum + 1 : 1);
          }, this), this.options.pause);
        }
      }
    },

    setMinHeight : function() {
      if (this.options.minHeight && !this._container.is("table, tbody")) {
        setTimeout(this.bind(function() {
          this._container.css({ "min-height": this._container.css("height") });
        }, this), 1000);
      }
    },

    bind : function(fn, me) {
      return function() {
        return fn.apply(me, arguments);
      };
    },

    destroy : function() {
      this.jQdocument.unbind("keydown.jPages");
      this._container.unbind("mousewheel.jPages DOMMouseScroll.jPages");

      if (this.options.minHeight) this._container.css("min-height", "");
      if (this._cssAnimSupport && this.options.animation.length)
        this._items.removeClass("animated jp-hidden jp-invisible " + this.options.animation);
      else this._items.removeClass("jp-hidden").fadeTo(0, 1);
      this._holder.unbind("click.jPages").empty();
    }

  };

  $.fn[name] = function(arg) {
    var type = $.type(arg);

    if (type === "object") {
      if (this.length && !$.data(this, name)) {
        instance = new Plugin(this, arg);
        this.each(function() {
          $.data(this, name, instance);
        });
      }
      return this;
    }

    if (type === "string" && arg === "destroy") {
      instance.destroy();
      this.each(function() {
        $.removeData(this, name);
      });
      return this;
    }

    if (type === 'number' && arg % 1 === 0) {
      if (instance.validNewPage(arg)) instance.paginate(arg);
      return this;
    }

    return this;
  };

})(jQuery, window, document);