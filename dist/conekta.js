/**
 * @license
 * json2.js
 * 2013-05-26
 * Public Domain.
 * NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
 * This is a reference implementation. You are free to copy, modify, or redistribute.
 */
"object"!=typeof JSON&&(JSON={}),function(){"use strict";function f(a){return 10>a?"0"+a:a}function quote(a){return escapable.lastIndex=0,escapable.test(a)?'"'+a.replace(escapable,function(a){var b=meta[a];return"string"==typeof b?b:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function str(a,b){var c,d,e,f,g,h=gap,i=b[a];switch(i&&"object"==typeof i&&"function"==typeof i.toJSON&&(i=i.toJSON(a)),"function"==typeof rep&&(i=rep.call(b,a,i)),typeof i){case"string":return quote(i);case"number":return isFinite(i)?String(i):"null";case"boolean":case"null":return String(i);case"object":if(!i)return"null";if(gap+=indent,g=[],"[object Array]"===Object.prototype.toString.apply(i)){for(f=i.length,c=0;f>c;c+=1)g[c]=str(c,i)||"null";return e=0===g.length?"[]":gap?"[\n"+gap+g.join(",\n"+gap)+"\n"+h+"]":"["+g.join(",")+"]",gap=h,e}if(rep&&"object"==typeof rep)for(f=rep.length,c=0;f>c;c+=1)"string"==typeof rep[c]&&(d=rep[c],e=str(d,i),e&&g.push(quote(d)+(gap?": ":":")+e));else for(d in i)Object.prototype.hasOwnProperty.call(i,d)&&(e=str(d,i),e&&g.push(quote(d)+(gap?": ":":")+e));return e=0===g.length?"{}":gap?"{\n"+gap+g.join(",\n"+gap)+"\n"+h+"}":"{"+g.join(",")+"}",gap=h,e}}"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){return this.valueOf()});var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","	":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;"function"!=typeof JSON.stringify&&(JSON.stringify=function(a,b,c){var d;if(gap="",indent="","number"==typeof c)for(d=0;c>d;d+=1)indent+=" ";else"string"==typeof c&&(indent=c);if(rep=b,b&&"function"!=typeof b&&("object"!=typeof b||"number"!=typeof b.length))throw new Error("JSON.stringify");return str("",{"":a})}),"function"!=typeof JSON.parse&&(JSON.parse=function(text,reviver){function walk(a,b){var c,d,e=a[b];if(e&&"object"==typeof e)for(c in e)Object.prototype.hasOwnProperty.call(e,c)&&(d=walk(e,c),void 0!==d?e[c]=d:delete e[c]);return reviver.call(a,b,e)}var j;if(text=String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})),/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}();
/**
 * easyXDM
 * http://easyxdm.net/
 * Copyright(c) 2009-2011, Øyvind Sean Kinsey, oyvind@kinsey.no.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
(function(N,d,p,K,k,H){var b=this;var n=Math.floor(Math.random()*10000);var q=Function.prototype;var Q=/^((http.?:)\/\/([^:\/\s]+)(:\d+)*)/;var R=/[\-\w]+\/\.\.\//;var F=/([^:])\/\//g;var I="";var o={};var M=N.easyXDM;var U="easyXDM_";var E;var y=false;var i;var h;function C(X,Z){var Y=typeof X[Z];return Y=="function"||(!!(Y=="object"&&X[Z]))||Y=="unknown"}function u(X,Y){return !!(typeof(X[Y])=="object"&&X[Y])}function r(X){return Object.prototype.toString.call(X)==="[object Array]"}function c(){var Z="Shockwave Flash",ad="application/x-shockwave-flash";if(!t(navigator.plugins)&&typeof navigator.plugins[Z]=="object"){var ab=navigator.plugins[Z].description;if(ab&&!t(navigator.mimeTypes)&&navigator.mimeTypes[ad]&&navigator.mimeTypes[ad].enabledPlugin){i=ab.match(/\d+/g)}}if(!i){var Y;try{Y=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");i=Array.prototype.slice.call(Y.GetVariable("$version").match(/(\d+),(\d+),(\d+),(\d+)/),1);Y=null}catch(ac){}}if(!i){return false}var X=parseInt(i[0],10),aa=parseInt(i[1],10);h=X>9&&aa>0;return true}var v,x;if(C(N,"addEventListener")){v=function(Z,X,Y){Z.addEventListener(X,Y,false)};x=function(Z,X,Y){Z.removeEventListener(X,Y,false)}}else{if(C(N,"attachEvent")){v=function(X,Z,Y){X.attachEvent("on"+Z,Y)};x=function(X,Z,Y){X.detachEvent("on"+Z,Y)}}else{throw new Error("Browser not supported")}}var W=false,J=[],L;if("readyState" in d){L=d.readyState;W=L=="complete"||(~navigator.userAgent.indexOf("AppleWebKit/")&&(L=="loaded"||L=="interactive"))}else{W=!!d.body}function s(){if(W){return}W=true;for(var X=0;X<J.length;X++){J[X]()}J.length=0}if(!W){if(C(N,"addEventListener")){v(d,"DOMContentLoaded",s)}else{v(d,"readystatechange",function(){if(d.readyState=="complete"){s()}});if(d.documentElement.doScroll&&N===top){var g=function(){if(W){return}try{d.documentElement.doScroll("left")}catch(X){K(g,1);return}s()};g()}}v(N,"load",s)}function G(Y,X){if(W){Y.call(X);return}J.push(function(){Y.call(X)})}function m(){var Z=parent;if(I!==""){for(var X=0,Y=I.split(".");X<Y.length;X++){Z=Z[Y[X]]}}return Z.easyXDM}function e(X){N.easyXDM=M;I=X;if(I){U="easyXDM_"+I.replace(".","_")+"_"}return o}function z(X){return X.match(Q)[3]}function f(X){return X.match(Q)[4]||""}function j(Z){var X=Z.toLowerCase().match(Q);var aa=X[2],ab=X[3],Y=X[4]||"";if((aa=="http:"&&Y==":80")||(aa=="https:"&&Y==":443")){Y=""}return aa+"//"+ab+Y}function B(X){X=X.replace(F,"$1/");if(!X.match(/^(http||https):\/\//)){var Y=(X.substring(0,1)==="/")?"":p.pathname;if(Y.substring(Y.length-1)!=="/"){Y=Y.substring(0,Y.lastIndexOf("/")+1)}X=p.protocol+"//"+p.host+Y+X}while(R.test(X)){X=X.replace(R,"")}return X}function P(X,aa){var ac="",Z=X.indexOf("#");if(Z!==-1){ac=X.substring(Z);X=X.substring(0,Z)}var ab=[];for(var Y in aa){if(aa.hasOwnProperty(Y)){ab.push(Y+"="+H(aa[Y]))}}return X+(y?"#":(X.indexOf("?")==-1?"?":"&"))+ab.join("&")+ac}var S=(function(X){X=X.substring(1).split("&");var Z={},aa,Y=X.length;while(Y--){aa=X[Y].split("=");Z[aa[0]]=k(aa[1])}return Z}(/xdm_e=/.test(p.search)?p.search:p.hash));function t(X){return typeof X==="undefined"}var O=function(){var Y={};var Z={a:[1,2,3]},X='{"a":[1,2,3]}';if(typeof JSON!="undefined"&&typeof JSON.stringify==="function"&&JSON.stringify(Z).replace((/\s/g),"")===X){return JSON}if(Object.toJSON){if(Object.toJSON(Z).replace((/\s/g),"")===X){Y.stringify=Object.toJSON}}if(typeof String.prototype.evalJSON==="function"){Z=X.evalJSON();if(Z.a&&Z.a.length===3&&Z.a[2]===3){Y.parse=function(aa){return aa.evalJSON()}}}if(Y.stringify&&Y.parse){O=function(){return Y};return Y}return null};function T(X,Y,Z){var ab;for(var aa in Y){if(Y.hasOwnProperty(aa)){if(aa in X){ab=Y[aa];if(typeof ab==="object"){T(X[aa],ab,Z)}else{if(!Z){X[aa]=Y[aa]}}}else{X[aa]=Y[aa]}}}return X}function a(){var Y=d.body.appendChild(d.createElement("form")),X=Y.appendChild(d.createElement("input"));X.name=U+"TEST"+n;E=X!==Y.elements[X.name];d.body.removeChild(Y)}function A(Y){if(t(E)){a()}var ac;if(E){ac=d.createElement('<iframe name="'+Y.props.name+'"/>')}else{ac=d.createElement("IFRAME");ac.name=Y.props.name}ac.id=ac.name=Y.props.name;delete Y.props.name;if(typeof Y.container=="string"){Y.container=d.getElementById(Y.container)}if(!Y.container){T(ac.style,{position:"absolute",top:"-2000px",left:"0px"});Y.container=d.body}var ab=Y.props.src;Y.props.src="javascript:false";T(ac,Y.props);ac.border=ac.frameBorder=0;ac.allowTransparency=true;Y.container.appendChild(ac);if(Y.onLoad){v(ac,"load",Y.onLoad)}if(Y.usePost){var aa=Y.container.appendChild(d.createElement("form")),X;aa.target=ac.name;aa.action=ab;aa.method="POST";if(typeof(Y.usePost)==="object"){for(var Z in Y.usePost){if(Y.usePost.hasOwnProperty(Z)){if(E){X=d.createElement('<input name="'+Z+'"/>')}else{X=d.createElement("INPUT");X.name=Z}X.value=Y.usePost[Z];aa.appendChild(X)}}}aa.submit();aa.parentNode.removeChild(aa)}else{ac.src=ab}Y.props.src=ab;return ac}function V(aa,Z){if(typeof aa=="string"){aa=[aa]}var Y,X=aa.length;while(X--){Y=aa[X];Y=new RegExp(Y.substr(0,1)=="^"?Y:("^"+Y.replace(/(\*)/g,".$1").replace(/\?/g,".")+"$"));if(Y.test(Z)){return true}}return false}function l(Z){var ae=Z.protocol,Y;Z.isHost=Z.isHost||t(S.xdm_p);y=Z.hash||false;if(!Z.props){Z.props={}}if(!Z.isHost){Z.channel=S.xdm_c.replace(/["'<>\\]/g,"");Z.secret=S.xdm_s;Z.remote=S.xdm_e.replace(/["'<>\\]/g,"");ae=S.xdm_p;if(Z.acl&&!V(Z.acl,Z.remote)){throw new Error("Access denied for "+Z.remote)}}else{Z.remote=B(Z.remote);Z.channel=Z.channel||"default"+n++;Z.secret=Math.random().toString(16).substring(2);if(t(ae)){if(j(p.href)==j(Z.remote)){ae="4"}else{if(C(N,"postMessage")||C(d,"postMessage")){ae="1"}else{if(Z.swf&&C(N,"ActiveXObject")&&c()){ae="6"}else{if(navigator.product==="Gecko"&&"frameElement" in N&&navigator.userAgent.indexOf("WebKit")==-1){ae="5"}else{if(Z.remoteHelper){ae="2"}else{ae="0"}}}}}}}Z.protocol=ae;switch(ae){case"0":T(Z,{interval:100,delay:2000,useResize:true,useParent:false,usePolling:false},true);if(Z.isHost){if(!Z.local){var ac=p.protocol+"//"+p.host,X=d.body.getElementsByTagName("img"),ad;var aa=X.length;while(aa--){ad=X[aa];if(ad.src.substring(0,ac.length)===ac){Z.local=ad.src;break}}if(!Z.local){Z.local=N}}var ab={xdm_c:Z.channel,xdm_p:0};if(Z.local===N){Z.usePolling=true;Z.useParent=true;Z.local=p.protocol+"//"+p.host+p.pathname+p.search;ab.xdm_e=Z.local;ab.xdm_pa=1}else{ab.xdm_e=B(Z.local)}if(Z.container){Z.useResize=false;ab.xdm_po=1}Z.remote=P(Z.remote,ab)}else{T(Z,{channel:S.xdm_c,remote:S.xdm_e,useParent:!t(S.xdm_pa),usePolling:!t(S.xdm_po),useResize:Z.useParent?false:Z.useResize})}Y=[new o.stack.HashTransport(Z),new o.stack.ReliableBehavior({}),new o.stack.QueueBehavior({encode:true,maxLength:4000-Z.remote.length}),new o.stack.VerifyBehavior({initiate:Z.isHost})];break;case"1":Y=[new o.stack.PostMessageTransport(Z)];break;case"2":if(Z.isHost){Z.remoteHelper=B(Z.remoteHelper)}Y=[new o.stack.NameTransport(Z),new o.stack.QueueBehavior(),new o.stack.VerifyBehavior({initiate:Z.isHost})];break;case"3":Y=[new o.stack.NixTransport(Z)];break;case"4":Y=[new o.stack.SameOriginTransport(Z)];break;case"5":Y=[new o.stack.FrameElementTransport(Z)];break;case"6":if(!i){c()}Y=[new o.stack.FlashTransport(Z)];break}Y.push(new o.stack.QueueBehavior({lazy:Z.lazy,remove:true}));return Y}function D(aa){var ab,Z={incoming:function(ad,ac){this.up.incoming(ad,ac)},outgoing:function(ac,ad){this.down.outgoing(ac,ad)},callback:function(ac){this.up.callback(ac)},init:function(){this.down.init()},destroy:function(){this.down.destroy()}};for(var Y=0,X=aa.length;Y<X;Y++){ab=aa[Y];T(ab,Z,true);if(Y!==0){ab.down=aa[Y-1]}if(Y!==X-1){ab.up=aa[Y+1]}}return ab}function w(X){X.up.down=X.down;X.down.up=X.up;X.up=X.down=null}T(o,{version:"2.4.18.25",query:S,stack:{},apply:T,getJSONObject:O,whenReady:G,noConflict:e});o.DomHelper={on:v,un:x,requiresJSON:function(X){if(!u(N,"JSON")){d.write('<script type="text/javascript" src="'+X+'"><\/script>')}}};(function(){var X={};o.Fn={set:function(Y,Z){X[Y]=Z},get:function(Z,Y){var aa=X[Z];if(Y){delete X[Z]}return aa}}}());o.Socket=function(Y){var X=D(l(Y).concat([{incoming:function(ab,aa){Y.onMessage(ab,aa)},callback:function(aa){if(Y.onReady){Y.onReady(aa)}}}])),Z=j(Y.remote);this.origin=j(Y.remote);this.destroy=function(){X.destroy()};this.postMessage=function(aa){X.outgoing(aa,Z)};X.init()};o.Rpc=function(Z,Y){if(Y.local){for(var ab in Y.local){if(Y.local.hasOwnProperty(ab)){var aa=Y.local[ab];if(typeof aa==="function"){Y.local[ab]={method:aa}}}}}var X=D(l(Z).concat([new o.stack.RpcBehavior(this,Y),{callback:function(ac){if(Z.onReady){Z.onReady(ac)}}}]));this.origin=j(Z.remote);this.destroy=function(){X.destroy()};X.init()};o.stack.SameOriginTransport=function(Y){var Z,ab,aa,X;return(Z={outgoing:function(ad,ae,ac){aa(ad);if(ac){ac()}},destroy:function(){if(ab){ab.parentNode.removeChild(ab);ab=null}},onDOMReady:function(){X=j(Y.remote);if(Y.isHost){T(Y.props,{src:P(Y.remote,{xdm_e:p.protocol+"//"+p.host+p.pathname,xdm_c:Y.channel,xdm_p:4}),name:U+Y.channel+"_provider"});ab=A(Y);o.Fn.set(Y.channel,function(ac){aa=ac;K(function(){Z.up.callback(true)},0);return function(ad){Z.up.incoming(ad,X)}})}else{aa=m().Fn.get(Y.channel,true)(function(ac){Z.up.incoming(ac,X)});K(function(){Z.up.callback(true)},0)}},init:function(){G(Z.onDOMReady,Z)}})};o.stack.FlashTransport=function(aa){var ac,X,ab,ad,Y,ae;function af(ah,ag){K(function(){ac.up.incoming(ah,ad)},0)}function Z(ah){var ag=aa.swf+"?host="+aa.isHost;var aj="easyXDM_swf_"+Math.floor(Math.random()*10000);o.Fn.set("flash_loaded"+ah.replace(/[\-.]/g,"_"),function(){o.stack.FlashTransport[ah].swf=Y=ae.firstChild;var ak=o.stack.FlashTransport[ah].queue;for(var al=0;al<ak.length;al++){ak[al]()}ak.length=0});if(aa.swfContainer){ae=(typeof aa.swfContainer=="string")?d.getElementById(aa.swfContainer):aa.swfContainer}else{ae=d.createElement("div");T(ae.style,h&&aa.swfNoThrottle?{height:"20px",width:"20px",position:"fixed",right:0,top:0}:{height:"1px",width:"1px",position:"absolute",overflow:"hidden",right:0,top:0});d.body.appendChild(ae)}var ai="callback=flash_loaded"+H(ah.replace(/[\-.]/g,"_"))+"&proto="+b.location.protocol+"&domain="+H(z(b.location.href))+"&port="+H(f(b.location.href))+"&ns="+H(I);ae.innerHTML="<object height='20' width='20' type='application/x-shockwave-flash' id='"+aj+"' data='"+ag+"'><param name='allowScriptAccess' value='always'></param><param name='wmode' value='transparent'><param name='movie' value='"+ag+"'></param><param name='flashvars' value='"+ai+"'></param><embed type='application/x-shockwave-flash' FlashVars='"+ai+"' allowScriptAccess='always' wmode='transparent' src='"+ag+"' height='1' width='1'></embed></object>"}return(ac={outgoing:function(ah,ai,ag){Y.postMessage(aa.channel,ah.toString());if(ag){ag()}},destroy:function(){try{Y.destroyChannel(aa.channel)}catch(ag){}Y=null;if(X){X.parentNode.removeChild(X);X=null}},onDOMReady:function(){ad=aa.remote;o.Fn.set("flash_"+aa.channel+"_init",function(){K(function(){ac.up.callback(true)})});o.Fn.set("flash_"+aa.channel+"_onMessage",af);aa.swf=B(aa.swf);var ah=z(aa.swf);var ag=function(){o.stack.FlashTransport[ah].init=true;Y=o.stack.FlashTransport[ah].swf;Y.createChannel(aa.channel,aa.secret,j(aa.remote),aa.isHost);if(aa.isHost){if(h&&aa.swfNoThrottle){T(aa.props,{position:"fixed",right:0,top:0,height:"20px",width:"20px"})}T(aa.props,{src:P(aa.remote,{xdm_e:j(p.href),xdm_c:aa.channel,xdm_p:6,xdm_s:aa.secret}),name:U+aa.channel+"_provider"});X=A(aa)}};if(o.stack.FlashTransport[ah]&&o.stack.FlashTransport[ah].init){ag()}else{if(!o.stack.FlashTransport[ah]){o.stack.FlashTransport[ah]={queue:[ag]};Z(ah)}else{o.stack.FlashTransport[ah].queue.push(ag)}}},init:function(){G(ac.onDOMReady,ac)}})};o.stack.PostMessageTransport=function(aa){var ac,ad,Y,Z;function X(ae){if(ae.origin){return j(ae.origin)}if(ae.uri){return j(ae.uri)}if(ae.domain){return p.protocol+"//"+ae.domain}throw"Unable to retrieve the origin of the event"}function ab(af){var ae=X(af);if(ae==Z&&af.data.substring(0,aa.channel.length+1)==aa.channel+" "){ac.up.incoming(af.data.substring(aa.channel.length+1),ae)}}return(ac={outgoing:function(af,ag,ae){Y.postMessage(aa.channel+" "+af,ag||Z);if(ae){ae()}},destroy:function(){x(N,"message",ab);if(ad){Y=null;ad.parentNode.removeChild(ad);ad=null}},onDOMReady:function(){Z=j(aa.remote);if(aa.isHost){var ae=function(af){if(af.data==aa.channel+"-ready"){Y=("postMessage" in ad.contentWindow)?ad.contentWindow:ad.contentWindow.document;x(N,"message",ae);v(N,"message",ab);K(function(){ac.up.callback(true)},0)}};v(N,"message",ae);T(aa.props,{src:P(aa.remote,{xdm_e:j(p.href),xdm_c:aa.channel,xdm_p:1}),name:U+aa.channel+"_provider"});ad=A(aa)}else{v(N,"message",ab);Y=("postMessage" in N.parent)?N.parent:N.parent.document;Y.postMessage(aa.channel+"-ready",Z);K(function(){ac.up.callback(true)},0)}},init:function(){G(ac.onDOMReady,ac)}})};o.stack.FrameElementTransport=function(Y){var Z,ab,aa,X;return(Z={outgoing:function(ad,ae,ac){aa.call(this,ad);if(ac){ac()}},destroy:function(){if(ab){ab.parentNode.removeChild(ab);ab=null}},onDOMReady:function(){X=j(Y.remote);if(Y.isHost){T(Y.props,{src:P(Y.remote,{xdm_e:j(p.href),xdm_c:Y.channel,xdm_p:5}),name:U+Y.channel+"_provider"});ab=A(Y);ab.fn=function(ac){delete ab.fn;aa=ac;K(function(){Z.up.callback(true)},0);return function(ad){Z.up.incoming(ad,X)}}}else{if(d.referrer&&j(d.referrer)!=S.xdm_e){N.top.location=S.xdm_e}aa=N.frameElement.fn(function(ac){Z.up.incoming(ac,X)});Z.up.callback(true)}},init:function(){G(Z.onDOMReady,Z)}})};o.stack.NameTransport=function(ab){var ac;var ae,ai,aa,ag,ah,Y,X;function af(al){var ak=ab.remoteHelper+(ae?"#_3":"#_2")+ab.channel;ai.contentWindow.sendMessage(al,ak)}function ad(){if(ae){if(++ag===2||!ae){ac.up.callback(true)}}else{af("ready");ac.up.callback(true)}}function aj(ak){ac.up.incoming(ak,Y)}function Z(){if(ah){K(function(){ah(true)},0)}}return(ac={outgoing:function(al,am,ak){ah=ak;af(al)},destroy:function(){ai.parentNode.removeChild(ai);ai=null;if(ae){aa.parentNode.removeChild(aa);aa=null}},onDOMReady:function(){ae=ab.isHost;ag=0;Y=j(ab.remote);ab.local=B(ab.local);if(ae){o.Fn.set(ab.channel,function(al){if(ae&&al==="ready"){o.Fn.set(ab.channel,aj);ad()}});X=P(ab.remote,{xdm_e:ab.local,xdm_c:ab.channel,xdm_p:2});T(ab.props,{src:X+"#"+ab.channel,name:U+ab.channel+"_provider"});aa=A(ab)}else{ab.remoteHelper=ab.remote;o.Fn.set(ab.channel,aj)}var ak=function(){var al=ai||this;x(al,"load",ak);o.Fn.set(ab.channel+"_load",Z);(function am(){if(typeof al.contentWindow.sendMessage=="function"){ad()}else{K(am,50)}}())};ai=A({props:{src:ab.local+"#_4"+ab.channel},onLoad:ak})},init:function(){G(ac.onDOMReady,ac)}})};o.stack.HashTransport=function(Z){var ac;var ah=this,af,aa,X,ad,am,ab,al;var ag,Y;function ak(ao){if(!al){return}var an=Z.remote+"#"+(am++)+"_"+ao;((af||!ag)?al.contentWindow:al).location=an}function ae(an){ad=an;ac.up.incoming(ad.substring(ad.indexOf("_")+1),Y)}function aj(){if(!ab){return}var an=ab.location.href,ap="",ao=an.indexOf("#");if(ao!=-1){ap=an.substring(ao)}if(ap&&ap!=ad){ae(ap)}}function ai(){aa=setInterval(aj,X)}return(ac={outgoing:function(an,ao){ak(an)},destroy:function(){N.clearInterval(aa);if(af||!ag){al.parentNode.removeChild(al)}al=null},onDOMReady:function(){af=Z.isHost;X=Z.interval;ad="#"+Z.channel;am=0;ag=Z.useParent;Y=j(Z.remote);if(af){T(Z.props,{src:Z.remote,name:U+Z.channel+"_provider"});if(ag){Z.onLoad=function(){ab=N;ai();ac.up.callback(true)}}else{var ap=0,an=Z.delay/50;(function ao(){if(++ap>an){throw new Error("Unable to reference listenerwindow")}try{ab=al.contentWindow.frames[U+Z.channel+"_consumer"]}catch(aq){}if(ab){ai();ac.up.callback(true)}else{K(ao,50)}}())}al=A(Z)}else{ab=N;ai();if(ag){al=parent;ac.up.callback(true)}else{T(Z,{props:{src:Z.remote+"#"+Z.channel+new Date(),name:U+Z.channel+"_consumer"},onLoad:function(){ac.up.callback(true)}});al=A(Z)}}},init:function(){G(ac.onDOMReady,ac)}})};o.stack.ReliableBehavior=function(Y){var aa,ac;var ab=0,X=0,Z="";return(aa={incoming:function(af,ad){var ae=af.indexOf("_"),ag=af.substring(0,ae).split(",");af=af.substring(ae+1);if(ag[0]==ab){Z="";if(ac){ac(true)}}if(af.length>0){aa.down.outgoing(ag[1]+","+ab+"_"+Z,ad);if(X!=ag[1]){X=ag[1];aa.up.incoming(af,ad)}}},outgoing:function(af,ad,ae){Z=af;ac=ae;aa.down.outgoing(X+","+(++ab)+"_"+af,ad)}})};o.stack.QueueBehavior=function(Z){var ac,ad=[],ag=true,aa="",af,X=0,Y=false,ab=false;function ae(){if(Z.remove&&ad.length===0){w(ac);return}if(ag||ad.length===0||af){return}ag=true;var ah=ad.shift();ac.down.outgoing(ah.data,ah.origin,function(ai){ag=false;if(ah.callback){K(function(){ah.callback(ai)},0)}ae()})}return(ac={init:function(){if(t(Z)){Z={}}if(Z.maxLength){X=Z.maxLength;ab=true}if(Z.lazy){Y=true}else{ac.down.init()}},callback:function(ai){ag=false;var ah=ac.up;ae();ah.callback(ai)},incoming:function(ak,ai){if(ab){var aj=ak.indexOf("_"),ah=parseInt(ak.substring(0,aj),10);aa+=ak.substring(aj+1);if(ah===0){if(Z.encode){aa=k(aa)}ac.up.incoming(aa,ai);aa=""}}else{ac.up.incoming(ak,ai)}},outgoing:function(al,ai,ak){if(Z.encode){al=H(al)}var ah=[],aj;if(ab){while(al.length!==0){aj=al.substring(0,X);al=al.substring(aj.length);ah.push(aj)}while((aj=ah.shift())){ad.push({data:ah.length+"_"+aj,origin:ai,callback:ah.length===0?ak:null})}}else{ad.push({data:al,origin:ai,callback:ak})}if(Y){ac.down.init()}else{ae()}},destroy:function(){af=true;ac.down.destroy()}})};o.stack.VerifyBehavior=function(ab){var ac,aa,Y,Z=false;function X(){aa=Math.random().toString(16).substring(2);ac.down.outgoing(aa)}return(ac={incoming:function(af,ad){var ae=af.indexOf("_");if(ae===-1){if(af===aa){ac.up.callback(true)}else{if(!Y){Y=af;if(!ab.initiate){X()}ac.down.outgoing(af)}}}else{if(af.substring(0,ae)===Y){ac.up.incoming(af.substring(ae+1),ad)}}},outgoing:function(af,ad,ae){ac.down.outgoing(aa+"_"+af,ad,ae)},callback:function(ad){if(ab.initiate){X()}}})};o.stack.RpcBehavior=function(ad,Y){var aa,af=Y.serializer||O();var ae=0,ac={};function X(ag){ag.jsonrpc="2.0";aa.down.outgoing(af.stringify(ag))}function ab(ag,ai){var ah=Array.prototype.slice;return function(){var aj=arguments.length,al,ak={method:ai};if(aj>0&&typeof arguments[aj-1]==="function"){if(aj>1&&typeof arguments[aj-2]==="function"){al={success:arguments[aj-2],error:arguments[aj-1]};ak.params=ah.call(arguments,0,aj-2)}else{al={success:arguments[aj-1]};ak.params=ah.call(arguments,0,aj-1)}ac[""+(++ae)]=al;ak.id=ae}else{ak.params=ah.call(arguments,0)}if(ag.namedParams&&ak.params.length===1){ak.params=ak.params[0]}X(ak)}}function Z(an,am,ai,al){if(!ai){if(am){X({id:am,error:{code:-32601,message:"Procedure not found."}})}return}var ak,ah;if(am){ak=function(ao){ak=q;X({id:am,result:ao})};ah=function(ao,ap){ah=q;var aq={id:am,error:{code:-32099,message:ao}};if(ap){aq.error.data=ap}X(aq)}}else{ak=ah=q}if(!r(al)){al=[al]}try{var ag=ai.method.apply(ai.scope,al.concat([ak,ah]));if(!t(ag)){ak(ag)}}catch(aj){ah(aj.message)}}return(aa={incoming:function(ah,ag){var ai=af.parse(ah);if(ai.method){if(Y.handle){Y.handle(ai,X)}else{Z(ai.method,ai.id,Y.local[ai.method],ai.params)}}else{var aj=ac[ai.id];if(ai.error){if(aj.error){aj.error(ai.error)}}else{if(aj.success){aj.success(ai.result)}}delete ac[ai.id]}},init:function(){if(Y.remote){for(var ag in Y.remote){if(Y.remote.hasOwnProperty(ag)){ad[ag]=ab(Y.remote[ag],ag)}}}aa.down.init()},destroy:function(){for(var ag in Y.remote){if(Y.remote.hasOwnProperty(ag)&&ad.hasOwnProperty(ag)){delete ad[ag]}}aa.down.destroy()}})};b.easyXDM=o})(window,document,location,window.setTimeout,decodeURIComponent,encodeURIComponent);
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var type
try {
  type = require('type-of')
} catch (ex) {
  //hide from browserify
  var r = require
  type = r('type')
}

var jsonpID = 0,
    document = window.document,
    key,
    name,
    rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    scriptTypeRE = /^(?:text|application)\/javascript/i,
    xmlTypeRE = /^(?:text|application)\/xml/i,
    jsonType = 'application/json',
    htmlType = 'text/html',
    blankRE = /^\s*$/

window.ajax = module.exports = function(options){
  var settings = extend({}, options || {})
  for (key in ajax.settings) if (settings[key] === undefined) settings[key] = ajax.settings[key]

  ajaxStart(settings)

  if (!settings.crossDomain) settings.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(settings.url) &&
    RegExp.$2 != window.location.host

  var dataType = settings.dataType, hasPlaceholder = /=\?/.test(settings.url)
  if (dataType == 'jsonp' || hasPlaceholder) {
    if (!hasPlaceholder) settings.url = appendQuery(settings.url, 'callback=?')
    return ajax.JSONP(settings)
  }

  if (!settings.url) settings.url = window.location.toString()
  serializeData(settings)

  var mime = settings.accepts[dataType],
      baseHeaders = { },
      protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol,
      xhr = ajax.settings.xhr(), abortTimeout

  if (!settings.crossDomain) baseHeaders['X-Requested-With'] = 'XMLHttpRequest'
  if (mime) {
    baseHeaders['Accept'] = mime
    if (mime.indexOf(',') > -1) mime = mime.split(',', 2)[0]
    xhr.overrideMimeType && xhr.overrideMimeType(mime)
  }
  if (settings.contentType || (settings.data && settings.type.toUpperCase() != 'GET'))
    baseHeaders['Content-Type'] = (settings.contentType || 'application/x-www-form-urlencoded')
  settings.headers = extend(baseHeaders, settings.headers || {})

  xhr.onreadystatechange = function(){
    if (xhr.readyState == 4) {
      clearTimeout(abortTimeout)
      var result, error = false
      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304 || (xhr.status == 0 && protocol == 'file:')) {
        dataType = dataType || mimeToDataType(xhr.getResponseHeader('content-type'))
        result = xhr.responseText

        try {
          if (dataType == 'script')    (1,eval)(result)
          else if (dataType == 'xml')  result = xhr.responseXML
          else if (dataType == 'json') result = blankRE.test(result) ? null : JSON.parse(result)
        } catch (e) { error = e }

        if (error) ajaxError(error, 'parsererror', xhr, settings)
        else ajaxSuccess(result, xhr, settings)
      } else {
        ajaxError(null, 'error', xhr, settings)
      }
    }
  }

  var async = 'async' in settings ? settings.async : true
  xhr.open(settings.type, settings.url, async)

  for (name in settings.headers) xhr.setRequestHeader(name, settings.headers[name])

  if (ajaxBeforeSend(xhr, settings) === false) {
    xhr.abort()
    return false
  }

  if (settings.timeout > 0) abortTimeout = setTimeout(function(){
      xhr.onreadystatechange = empty
      xhr.abort()
      ajaxError(null, 'timeout', xhr, settings)
    }, settings.timeout)

  // avoid sending empty string (#319)
  xhr.send(settings.data ? settings.data : null)
  return xhr
}


// trigger a custom event and return false if it was cancelled
function triggerAndReturn(context, eventName, data) {
  //todo: Fire off some events
  //var event = $.Event(eventName)
  //$(context).trigger(event, data)
  return true;//!event.defaultPrevented
}

// trigger an Ajax "global" event
function triggerGlobal(settings, context, eventName, data) {
  if (settings.global) return triggerAndReturn(context || document, eventName, data)
}

// Number of active Ajax requests
ajax.active = 0

function ajaxStart(settings) {
  if (settings.global && ajax.active++ === 0) triggerGlobal(settings, null, 'ajaxStart')
}
function ajaxStop(settings) {
  if (settings.global && !(--ajax.active)) triggerGlobal(settings, null, 'ajaxStop')
}

// triggers an extra global event "ajaxBeforeSend" that's like "ajaxSend" but cancelable
function ajaxBeforeSend(xhr, settings) {
  var context = settings.context
  if (settings.beforeSend.call(context, xhr, settings) === false ||
      triggerGlobal(settings, context, 'ajaxBeforeSend', [xhr, settings]) === false)
    return false

  triggerGlobal(settings, context, 'ajaxSend', [xhr, settings])
}
function ajaxSuccess(data, xhr, settings) {
  var context = settings.context, status = 'success'
  settings.success.call(context, data, status, xhr)
  triggerGlobal(settings, context, 'ajaxSuccess', [xhr, settings, data])
  ajaxComplete(status, xhr, settings)
}
// type: "timeout", "error", "abort", "parsererror"
function ajaxError(error, type, xhr, settings) {
  var context = settings.context
  settings.error.call(context, xhr, type, error)
  triggerGlobal(settings, context, 'ajaxError', [xhr, settings, error])
  ajaxComplete(type, xhr, settings)
}
// status: "success", "notmodified", "error", "timeout", "abort", "parsererror"
function ajaxComplete(status, xhr, settings) {
  var context = settings.context
  settings.complete.call(context, xhr, status)
  triggerGlobal(settings, context, 'ajaxComplete', [xhr, settings])
  ajaxStop(settings)
}

// Empty function, used as default callback
function empty() {}

ajax.JSONP = function(options){
  if (!('type' in options)) return ajax(options)

  var callbackName = 'jsonp' + (++jsonpID),
    script = document.createElement('script'),
    abort = function(){
      //todo: remove script
      //$(script).remove()
      if (callbackName in window) window[callbackName] = empty
      ajaxComplete('abort', xhr, options)
    },
    xhr = { abort: abort }, abortTimeout,
    head = document.getElementsByTagName("head")[0]
      || document.documentElement

  if (options.error) script.onerror = function() {
    xhr.abort()
    options.error()
  }

  window[callbackName] = function(data){
    clearTimeout(abortTimeout)
      //todo: remove script
      //$(script).remove()
    delete window[callbackName]
    ajaxSuccess(data, xhr, options)
  }

  serializeData(options)
  script.src = options.url.replace(/=\?/, '=' + callbackName)

  // Use insertBefore instead of appendChild to circumvent an IE6 bug.
  // This arises when a base node is used (see jQuery bugs #2709 and #4378).
  head.insertBefore(script, head.firstChild);

  if (options.timeout > 0) abortTimeout = setTimeout(function(){
      xhr.abort()
      ajaxComplete('timeout', xhr, options)
    }, options.timeout)

  return xhr
}

ajax.settings = {
  // Default type of request
  type: 'GET',
  // Callback that is executed before request
  beforeSend: empty,
  // Callback that is executed if the request succeeds
  success: empty,
  // Callback that is executed the the server drops error
  error: empty,
  // Callback that is executed on request complete (both: error and success)
  complete: empty,
  // The context for the callbacks
  context: null,
  // Whether to trigger "global" Ajax events
  global: true,
  // Transport
  xhr: function () {
    return new window.XMLHttpRequest()
  },
  // MIME types mapping
  accepts: {
    script: 'text/javascript, application/javascript',
    json:   jsonType,
    xml:    'application/xml, text/xml',
    html:   htmlType,
    text:   'text/plain'
  },
  // Whether the request is to another domain
  crossDomain: false,
  // Default timeout
  timeout: 0
}

function mimeToDataType(mime) {
  return mime && ( mime == htmlType ? 'html' :
    mime == jsonType ? 'json' :
    scriptTypeRE.test(mime) ? 'script' :
    xmlTypeRE.test(mime) && 'xml' ) || 'text'
}

function appendQuery(url, query) {
  return (url + '&' + query).replace(/[&?]{1,2}/, '?')
}

// serialize payload and append it to the URL for GET requests
function serializeData(options) {
  if (type(options.data) === 'object') options.data = param(options.data)
  if (options.data && (!options.type || options.type.toUpperCase() == 'GET'))
    options.url = appendQuery(options.url, options.data)
}

ajax.get = function(url, success){ return ajax({ url: url, success: success }) }

ajax.post = function(url, data, success, dataType){
  if (type(data) === 'function') dataType = dataType || success, success = data, data = null
  return ajax({ type: 'POST', url: url, data: data, success: success, dataType: dataType })
}

ajax.getJSON = function(url, success){
  return ajax({ url: url, success: success, dataType: 'json' })
}

var escape = encodeURIComponent

function serialize(params, obj, traditional, scope){
  var array = type(obj) === 'array';
  for (var key in obj) {
    var value = obj[key];

    if (scope) key = traditional ? scope : scope + '[' + (array ? '' : key) + ']'
    // handle data in serializeArray() format
    if (!scope && array) params.add(value.name, value.value)
    // recurse into nested objects
    else if (traditional ? (type(value) === 'array') : (type(value) === 'object'))
      serialize(params, value, traditional, key)
    else params.add(key, value)
  }
}

function param(obj, traditional){
  var params = []
  params.add = function(k, v){ this.push(escape(k) + '=' + escape(v)) }
  serialize(params, obj, traditional)
  return params.join('&').replace('%20', '+')
}

function extend(target) {
  var slice = Array.prototype.slice;
  var arr = slice.call(arguments, 1);
  var length = arr.length,
      element = null;
  for (var i = 0; i < length; i++) {
    source = arr[i];
    for (key in source)
    if (source[key] !== undefined)
      target[key] = source[key];
  }
  return target
}
},{"type-of":2}],2:[function(require,module,exports){
var toString = Object.prototype.toString

module.exports = function(val){
  switch (toString.call(val)) {
    case '[object Function]': return 'function'
    case '[object Date]': return 'date'
    case '[object RegExp]': return 'regexp'
    case '[object Arguments]': return 'arguments'
    case '[object Array]': return 'array'
    case '[object String]': return 'string'
  }

  if (val === null) return 'null'
  if (val === undefined) return 'undefined'
  if (val && val.nodeType === 1) return 'element'
  if (val === Object(val)) return 'object'

  return typeof val
}

},{}]},{},[1])
;

/*conekta.js v0.1.0 | 2013- Conekta | https://github.com/conekta/conekta.js/blob/master/LICENSE-MIT.txt
*/

(function() {
  var Base64, base_url, fingerprint, i, publishable_key, session_id, useable_characters, _i;

  base_url = 'https://api.conekta.io/';

  publishable_key = null;

  session_id = "";

  useable_characters = "abcdefghijklmnopqrstuvwxyz0123456789";

  for (i = _i = 0; _i <= 30; i = ++_i) {
    session_id += useable_characters.charAt(Math.floor(Math.random() * 36));
  }

  fingerprint = function() {
    var body, fingerprint_png_img, fingerprint_png_p, fingerprint_script, fingerprint_swf_param;
    if (typeof document !== 'undefined' && typeof document.body !== 'undefined' && document.body && (document.readyState === 'interactive' || document.readyState === 'complete')) {
      body = document.getElementsByTagName('body')[0];
      fingerprint_png_p = document.createElement('p');
      fingerprint_png_p.setAttribute("style", "background:url(https://h.online-metrix.net/fp/clear.png?org_id=k8vif92e&session_id=banorteixe_conekta" + session_id + "&m=1) ! important; display:none ! important;");
      body.appendChild(fingerprint_png_p);
      fingerprint_png_img = document.createElement('img');
      fingerprint_png_img.setAttribute('style', 'display:none ! important;');
      fingerprint_png_img.src = "https://h.online-metrix.net/fp/clear.png?org_id=k8vif92e&session_id=banorteixe_conekta" + session_id + "&m=2";
      body.appendChild(fingerprint_png_img);
      setTimeout(function() {
        var fingerprint_swf_object;
        fingerprint_swf_object = document.createElement('object');
        fingerprint_swf_object.type = 'application/x-shockwave-flash';
        fingerprint_swf_object.data = "https://h.online-metrix.net/fp/fp.swf?org_id=k8vif92e&session_id=banorteixe_conekta" + session_id;
        fingerprint_swf_object.width = '1';
        fingerprint_swf_object.setAttribute('style', 'display:none ! important;');
        body.appendChild(fingerprint_swf_object);
      }, 500);
      fingerprint_swf_param = document.createElement('param');
      fingerprint_swf_param.name = 'movie';
      fingerprint_swf_param.setAttribute('style', 'display:none ! important;');
      fingerprint_swf_param.value = 'https://h.online-metrix.net/fp/fp.swf?org_id=k8vif92e&session_id=merchant' + session_id;
      if (typeof fingerprint_swf_param.appendChild === 'function') {
        fingerprint_swf_param.appendChild(document.createElement('div'));
      }
      body.appendChild(fingerprint_swf_param);
      fingerprint_script = document.createElement('script');
      fingerprint_script.type = 'text/javascript';
      fingerprint_script.src = 'https://h.online-metrix.net/fp/check.js?org_id=k8vif92e&session_id=banorteixe_conekta' + session_id;
      body.appendChild(fingerprint_script);
    } else {
      setTimeout(fingerprint, 150);
    }
  };

  fingerprint();

  Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function(input) {
      var chr1, chr2, chr3, enc1, enc2, enc3, enc4, output;
      output = "";
      chr1 = void 0;
      chr2 = void 0;
      chr3 = void 0;
      enc1 = void 0;
      enc2 = void 0;
      enc3 = void 0;
      enc4 = void 0;
      i = 0;
      input = Base64._utf8_encode(input);
      while (i < input.length) {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);
        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;
        if (isNaN(chr2)) {
          enc3 = enc4 = 64;
        } else {
          if (isNaN(chr3)) {
            enc4 = 64;
          }
        }
        output = output + Base64._keyStr.charAt(enc1) + Base64._keyStr.charAt(enc2) + Base64._keyStr.charAt(enc3) + Base64._keyStr.charAt(enc4);
      }
      return output;
    },
    decode: function(input) {
      var chr1, chr2, chr3, enc1, enc2, enc3, enc4, output;
      output = "";
      chr1 = void 0;
      chr2 = void 0;
      chr3 = void 0;
      enc1 = void 0;
      enc2 = void 0;
      enc3 = void 0;
      enc4 = void 0;
      i = 0;
      input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
      while (i < input.length) {
        enc1 = Base64._keyStr.indexOf(input.charAt(i++));
        enc2 = Base64._keyStr.indexOf(input.charAt(i++));
        enc3 = Base64._keyStr.indexOf(input.charAt(i++));
        enc4 = Base64._keyStr.indexOf(input.charAt(i++));
        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;
        output = output + String.fromCharCode(chr1);
        if (enc3 !== 64) {
          output = output + String.fromCharCode(chr2);
        }
        if (enc4 !== 64) {
          output = output + String.fromCharCode(chr3);
        }
      }
      output = Base64._utf8_decode(output);
      return output;
    },
    _utf8_encode: function(string) {
      var c, n, utftext;
      string = string.replace(/\r\n/g, "\n");
      utftext = "";
      n = 0;
      while (n < string.length) {
        c = string.charCodeAt(n);
        if (c < 128) {
          utftext += String.fromCharCode(c);
        } else if ((c > 127) && (c < 2048)) {
          utftext += String.fromCharCode((c >> 6) | 192);
          utftext += String.fromCharCode((c & 63) | 128);
        } else {
          utftext += String.fromCharCode((c >> 12) | 224);
          utftext += String.fromCharCode(((c >> 6) & 63) | 128);
          utftext += String.fromCharCode((c & 63) | 128);
        }
        n++;
      }
      return utftext;
    },
    _utf8_decode: function(utftext) {
      var c, c1, c2, c3, string;
      string = "";
      i = 0;
      c = c1 = c2 = 0;
      while (i < utftext.length) {
        c = utftext.charCodeAt(i);
        if (c < 128) {
          string += String.fromCharCode(c);
          i++;
        } else if ((c > 191) && (c < 224)) {
          c2 = utftext.charCodeAt(i + 1);
          string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
          i += 2;
        } else {
          c2 = utftext.charCodeAt(i + 1);
          c3 = utftext.charCodeAt(i + 2);
          string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
          i += 3;
        }
      }
      return string;
    }
  };

  window.Conekta = {
    setPublishableKey: function(key) {
      if (typeof key === 'string' && key.match(/^[a-zA-Z0-9_]*$/) && key.length >= 20 && key.length < 30) {
        publishable_key = key;
      } else {
        Conekta._helpers.log('Unusable public key: ' + key);
      }
    },
    getPublishableKey: function() {
      return publishable_key;
    },
    _helpers: {
      getSessionId: function() {
        return session_id;
      },
      xDomainPost: function(params) {
        var error_callback, rpc, success_callback;
        success_callback = function(data, textStatus, jqXHR) {
          if (!data || (data.object === 'error')) {
            return params.error(data || {
              object: 'error',
              type: 'api_error',
              message: "Something went wrong on Conekta's end"
            });
          } else {
            return params.success(data);
          }
        };
        error_callback = function() {
          return params.error({
            object: 'error',
            type: 'api_error',
            message: 'Something went wrong, possibly a connectivity issue'
          });
        };
        if (document.location.protocol === 'file:') {
          params.url = (params.jsonp_url || params.url) + '.js';
          params.data['_Version'] = "0.2.0";
          params.data['_RaiseHtmlError'] = false;
          params.data['auth_token'] = Conekta.getPublishableKey();
          return ajax({
            url: base_url + params.url,
            dataType: 'jsonp',
            data: params.data,
            success: success_callback,
            error: error_callback
          });
        } else {
          if (typeof (new XMLHttpRequest()).withCredentials !== 'undefined') {
            return ajax({
              url: base_url + params.url,
              type: 'POST',
              dataType: 'json',
              data: JSON.stringify(params.data),
              contentType: 'application/json',
              headers: {
                'RaiseHtmlError': false,
                'Accept': 'application/vnd.conekta-v0.2.0+json',
                'Authorization': 'Basic ' + Base64.encode(Conekta.getPublishableKey() + ':')
              },
              success: success_callback,
              error: error_callback
            });
          } else {
            rpc = new easyXDM.Rpc({
              swf: "https://conektaapi.s3.amazonaws.com/v0.2.0/flash/easyxdm.swf",
              remote: base_url + "easyxdm_cors_proxy.html"
            }, {
              remote: {
                request: {}
              }
            });
            return rpc.request({
              url: base_url + params.url,
              method: 'POST',
              headers: {
                'RaiseHtmlError': false,
                'Accept': 'application/vnd.conekta-v0.2.0+json',
                'Authorization': 'Basic ' + Base64.encode(Conekta.getPublishableKey() + ':')
              },
              data: JSON.stringify(params.data)
            }, success_callback, error_callback);
          }
        }
      },
      log: function(data) {
        if (typeof console !== 'undefined' && console.log) {
          return console.log(data);
        }
      }
    }
  };

}).call(this);

(function() {
  var parse_form;

  parse_form = function(charge_form) {
    var attribute, attribute_name, attributes, charge, input, inputs, key, last_attribute, line_items, node, parent_node, textareas, val, _i, _j, _k, _len, _len1, _len2, _ref;
    charge = {};
    if (typeof charge_form === 'object') {
      if (typeof jQuery !== 'undefined' && charge_form instanceof jQuery) {
        charge_form = charge_form.get()[0];
      }
      if (charge_form.nodeType) {
        textareas = Array.prototype.slice.call(charge_form.getElementsByTagName('textarea'));
        inputs = Array.prototype.slice.call(charge_form.getElementsByTagName('input')).concat(textareas);
        for (_i = 0, _len = inputs.length; _i < _len; _i++) {
          input = inputs[_i];
          attribute_name = input.getAttribute('data-conekta');
          if (attribute_name) {
            val = input.getAttribute('value') || input.innerHTML || input.value;
            attributes = attribute_name.replace(/\]/, '').replace(/\-/, '_').split(/\[/);
            parent_node = null;
            node = charge;
            last_attribute = null;
            for (_j = 0, _len1 = attributes.length; _j < _len1; _j++) {
              attribute = attributes[_j];
              if (!node[attribute]) {
                node[attribute] = {};
              }
              parent_node = node;
              last_attribute = attribute;
              node = node[attribute];
            }
            parent_node[last_attribute] = val;
          }
        }
      } else {
        charge = charge_form;
      }
      if (charge.details && charge.details.line_items && Object.prototype.toString.call(charge.details.line_items) !== '[object Array]' && typeof charge.details.line_items === 'object') {
        line_items = [];
        _ref = charge.details.line_items;
        for (_k = 0, _len2 = _ref.length; _k < _len2; _k++) {
          key = _ref[_k];
          line_items.push(charge.details.line_items[key]);
        }
        charge.details.line_items = line_items;
      }
    }
    return charge;
  };

  Conekta.charge = {};

  Conekta.charge.create = function(charge_form, success_callback, failure_callback) {
    var charge;
    if (typeof success_callback !== 'function') {
      success_callback = Conekta._helpers.log;
    }
    if (typeof failure_callback !== 'function') {
      failure_callback = Conekta._helpers.log;
    }
    charge = parse_form(charge_form);
    charge.session_id = Conekta._helpers.getSessionId();
    if (typeof charge === 'object') {
      return Conekta._helpers.xDomainPost({
        jsonp_url: 'charges/create',
        url: 'charges',
        data: charge,
        success: success_callback,
        error: failure_callback
      });
    } else {
      return failure_callback({
        'object': 'error',
        'type': 'invalid_request_error',
        'message': "Supplied parameter 'charge' is not a javascript object"
      });
    }
  };

}).call(this);

(function() {
  var accepted_cards, card_types, get_card_type, is_valid_length, is_valid_luhn,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  card_types = [
    {
      name: 'amex',
      pattern: /^3[47]/,
      valid_length: [15]
    }, {
      name: 'diners_club_carte_blanche',
      pattern: /^30[0-5]/,
      valid_length: [14]
    }, {
      name: 'diners_club_international',
      pattern: /^36/,
      valid_length: [14]
    }, {
      name: 'jcb',
      pattern: /^35(2[89]|[3-8][0-9])/,
      valid_length: [16]
    }, {
      name: 'laser',
      pattern: /^(6304|670[69]|6771)/,
      valid_length: [16, 17, 18, 19]
    }, {
      name: 'visa_electron',
      pattern: /^(4026|417500|4508|4844|491(3|7))/,
      valid_length: [16]
    }, {
      name: 'visa',
      pattern: /^4/,
      valid_length: [16]
    }, {
      name: 'mastercard',
      pattern: /^5[1-5]/,
      valid_length: [16]
    }, {
      name: 'maestro',
      pattern: /^(5018|5020|5038|6304|6759|676[1-3])/,
      valid_length: [12, 13, 14, 15, 16, 17, 18, 19]
    }, {
      name: 'discover',
      pattern: /^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)/,
      valid_length: [16]
    }
  ];

  is_valid_luhn = function(number) {
    var digit, n, sum, _i, _len, _ref;
    sum = 0;
    _ref = number.split('').reverse();
    for (n = _i = 0, _len = _ref.length; _i < _len; n = ++_i) {
      digit = _ref[n];
      digit = +digit;
      if (n % 2) {
        digit *= 2;
        if (digit < 10) {
          sum += digit;
        } else {
          sum += digit - 9;
        }
      } else {
        sum += digit;
      }
    }
    return sum % 10 === 0;
  };

  is_valid_length = function(number, card_type) {
    var _ref;
    return _ref = number.length, __indexOf.call(card_type.valid_length, _ref) >= 0;
  };

  accepted_cards = ['visa', 'mastercard'];

  get_card_type = function(number) {
    var card, card_type, _i, _len, _ref;
    _ref = (function() {
      var _j, _len, _ref, _results;
      _results = [];
      for (_j = 0, _len = card_types.length; _j < _len; _j++) {
        card = card_types[_j];
        if (_ref = card.name, __indexOf.call(accepted_cards, _ref) >= 0) {
          _results.push(card);
        }
      }
      return _results;
    })();
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      card_type = _ref[_i];
      if (number.match(card_type.pattern)) {
        return card_type;
      }
    }
    return null;
  };

  Conekta.card = {};

  Conekta.card.getBrand = function(number) {
    var brand;
    if (typeof number === 'string') {
      number = number.replace(/[ -]/g, '');
    } else if (typeof number === 'number') {
      number = toString(number);
    }
    brand = get_card_type(number);
    if (brand && brand.name) {
      return brand.name;
    }
    return null;
  };

  Conekta.card.validateCVC = function(cvc) {
    if ((typeof cvc === 'number' && cvc >= 0 && cvc < 10000) || (typeof cvc === 'string' && cvc.match(/^[\d]{3,4}$/))) {
      return true;
    } else {
      return false;
    }
  };

  Conekta.card.validateExpiry = function(month, year) {
    if (typeof month === 'string' && month.match(/^[\d]{1,2}$/)) {
      month = parseInt(month);
    }
    if (year.match(/^([\d]{2,2}|20[\d]{2,2})$/)) {
      if (typeof year === 'string' && year.match(/^([\d]{2,2})$/)) {
        year = '20' + year;
      }
      year = parseInt(year);
    }
    if ((typeof month === 'number' && month > 0 && month < 13) && (typeof year === 'number' && year > 2012 && year < 2050)) {
      return Date.parse(month + '/' + new Date(year, month, 0).getDate() + '/' + year) > Date.now();
    } else {
      return false;
    }
  };

  Conekta.card.validateNumber = function(number) {
    var card_type, length_valid, luhn_valid;
    if (typeof number === 'string') {
      number = number.replace(/[ -]/g, '');
    } else if (type(number === 'number')) {
      number = toString(number);
    }
    card_type = get_card_type(number);
    luhn_valid = false;
    length_valid = false;
    if (card_type != null) {
      luhn_valid = is_valid_luhn(number);
      length_valid = is_valid_length(number, card_type);
    }
    return luhn_valid && length_valid;
  };

}).call(this);
