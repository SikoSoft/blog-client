(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function t(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(i){if(i.ep)return;i.ep=!0;const r=t(i);fetch(i.href,r)}})();const qe=globalThis,cs=qe.ShadowRoot&&(qe.ShadyCSS===void 0||qe.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ds=Symbol(),As=new WeakMap;let ni=class{constructor(e,t,o){if(this._$cssResult$=!0,o!==ds)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(cs&&e===void 0){const o=t!==void 0&&t.length===1;o&&(e=As.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),o&&As.set(t,e))}return e}toString(){return this.cssText}};const Pi=s=>new ni(typeof s=="string"?s:s+"",void 0,ds),us=(s,...e)=>{const t=s.length===1?s[0]:e.reduce((o,i,r)=>o+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+s[r+1],s[0]);return new ni(t,s,ds)},Li=(s,e)=>{if(cs)s.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const o=document.createElement("style"),i=qe.litNonce;i!==void 0&&o.setAttribute("nonce",i),o.textContent=t.cssText,s.appendChild(o)}},Ss=cs?s=>s:s=>s instanceof CSSStyleSheet?(e=>{let t="";for(const o of e.cssRules)t+=o.cssText;return Pi(t)})(s):s;const{is:Ii,defineProperty:Ni,getOwnPropertyDescriptor:Ri,getOwnPropertyNames:Ui,getOwnPropertySymbols:Mi,getPrototypeOf:Di}=Object,G=globalThis,Cs=G.trustedTypes,ji=Cs?Cs.emptyScript:"",ct=G.reactiveElementPolyfillSupport,Pe=(s,e)=>s,Ye={toAttribute(s,e){switch(e){case Boolean:s=s?ji:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,e){let t=s;switch(e){case Boolean:t=s!==null;break;case Number:t=s===null?null:Number(s);break;case Object:case Array:try{t=JSON.parse(s)}catch{t=null}}return t}},hs=(s,e)=>!Ii(s,e),ws={attribute:!0,type:String,converter:Ye,reflect:!1,hasChanged:hs};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),G.litPropertyMetadata??(G.litPropertyMetadata=new WeakMap);let re=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=ws){if(t.state&&(t.attribute=!1),this._$Ei(),this.elementProperties.set(e,t),!t.noAccessor){const o=Symbol(),i=this.getPropertyDescriptor(e,o,t);i!==void 0&&Ni(this.prototype,e,i)}}static getPropertyDescriptor(e,t,o){const{get:i,set:r}=Ri(this.prototype,e)??{get(){return this[t]},set(n){this[t]=n}};return{get(){return i==null?void 0:i.call(this)},set(n){const l=i==null?void 0:i.call(this);r.call(this,n),this.requestUpdate(e,l,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ws}static _$Ei(){if(this.hasOwnProperty(Pe("elementProperties")))return;const e=Di(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(Pe("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Pe("properties"))){const t=this.properties,o=[...Ui(t),...Mi(t)];for(const i of o)this.createProperty(i,t[i])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[o,i]of t)this.elementProperties.set(o,i)}this._$Eh=new Map;for(const[t,o]of this.elementProperties){const i=this._$Eu(t,o);i!==void 0&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const o=new Set(e.flat(1/0).reverse());for(const i of o)t.unshift(Ss(i))}else e!==void 0&&t.push(Ss(e));return t}static _$Eu(e,t){const o=t.attribute;return o===!1?void 0:typeof o=="string"?o:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const o of t.keys())this.hasOwnProperty(o)&&(e.set(o,this[o]),delete this[o]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Li(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var o;return(o=t.hostConnected)==null?void 0:o.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var o;return(o=t.hostDisconnected)==null?void 0:o.call(t)})}attributeChangedCallback(e,t,o){this._$AK(e,o)}_$EC(e,t){var r;const o=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,o);if(i!==void 0&&o.reflect===!0){const n=(((r=o.converter)==null?void 0:r.toAttribute)!==void 0?o.converter:Ye).toAttribute(t,o.type);this._$Em=e,n==null?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(e,t){var r;const o=this.constructor,i=o._$Eh.get(e);if(i!==void 0&&this._$Em!==i){const n=o.getPropertyOptions(i),l=typeof n.converter=="function"?{fromAttribute:n.converter}:((r=n.converter)==null?void 0:r.fromAttribute)!==void 0?n.converter:Ye;this._$Em=i,this[i]=l.fromAttribute(t,n.type),this._$Em=null}}requestUpdate(e,t,o){if(e!==void 0){if(o??(o=this.constructor.getPropertyOptions(e)),!(o.hasChanged??hs)(this[e],t))return;this.P(e,t,o)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(e,t,o){this._$AL.has(e)||this._$AL.set(e,t),o.reflect===!0&&this._$Em!==e&&(this._$Ej??(this._$Ej=new Set)).add(e)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var o;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[r,n]of this._$Ep)this[r]=n;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[r,n]of i)n.wrapped!==!0||this._$AL.has(r)||this[r]===void 0||this.P(r,this[r],n)}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(o=this._$EO)==null||o.forEach(i=>{var r;return(r=i.hostUpdate)==null?void 0:r.call(i)}),this.update(t)):this._$EU()}catch(i){throw e=!1,this._$EU(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(o=>{var i;return(i=o.hostUpdated)==null?void 0:i.call(o)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Ej&&(this._$Ej=this._$Ej.forEach(t=>this._$EC(t,this[t]))),this._$EU()}updated(e){}firstUpdated(e){}};re.elementStyles=[],re.shadowRootOptions={mode:"open"},re[Pe("elementProperties")]=new Map,re[Pe("finalized")]=new Map,ct==null||ct({ReactiveElement:re}),(G.reactiveElementVersions??(G.reactiveElementVersions=[])).push("2.0.4");const Le=globalThis,Je=Le.trustedTypes,Os=Je?Je.createPolicy("lit-html",{createHTML:s=>s}):void 0,li="$lit$",B=`lit$${Math.random().toFixed(9).slice(2)}$`,ai="?"+B,Hi=`<${ai}>`,Q=document,Re=()=>Q.createComment(""),Ue=s=>s===null||typeof s!="object"&&typeof s!="function",ps=Array.isArray,Bi=s=>ps(s)||typeof(s==null?void 0:s[Symbol.iterator])=="function",dt=`[ 	
\f\r]`,we=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ts=/-->/g,xs=/>/g,q=RegExp(`>|${dt}(?:([^\\s"'>=/]+)(${dt}*=${dt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ps=/'/g,Ls=/"/g,ci=/^(?:script|style|textarea|title)$/i,Vi=s=>(e,...t)=>({_$litType$:s,strings:e,values:t}),di=Vi(1),$e=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),Is=new WeakMap,Y=Q.createTreeWalker(Q,129);function ui(s,e){if(!ps(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return Os!==void 0?Os.createHTML(e):e}const Gi=(s,e)=>{const t=s.length-1,o=[];let i,r=e===2?"<svg>":e===3?"<math>":"",n=we;for(let l=0;l<t;l++){const a=s[l];let d,p,c=-1,v=0;for(;v<a.length&&(n.lastIndex=v,p=n.exec(a),p!==null);)v=n.lastIndex,n===we?p[1]==="!--"?n=Ts:p[1]!==void 0?n=xs:p[2]!==void 0?(ci.test(p[2])&&(i=RegExp("</"+p[2],"g")),n=q):p[3]!==void 0&&(n=q):n===q?p[0]===">"?(n=i??we,c=-1):p[1]===void 0?c=-2:(c=n.lastIndex-p[2].length,d=p[1],n=p[3]===void 0?q:p[3]==='"'?Ls:Ps):n===Ls||n===Ps?n=q:n===Ts||n===xs?n=we:(n=q,i=void 0);const f=n===q&&s[l+1].startsWith("/>")?" ":"";r+=n===we?a+Hi:c>=0?(o.push(d),a.slice(0,c)+li+a.slice(c)+B+f):a+B+(c===-2?l:f)}return[ui(s,r+(s[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),o]};let St=class hi{constructor({strings:e,_$litType$:t},o){let i;this.parts=[];let r=0,n=0;const l=e.length-1,a=this.parts,[d,p]=Gi(e,t);if(this.el=hi.createElement(d,o),Y.currentNode=this.el.content,t===2||t===3){const c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(i=Y.nextNode())!==null&&a.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(const c of i.getAttributeNames())if(c.endsWith(li)){const v=p[n++],f=i.getAttribute(c).split(B),$=/([.?@])?(.*)/.exec(v);a.push({type:1,index:r,name:$[2],strings:f,ctor:$[1]==="."?ki:$[1]==="?"?Fi:$[1]==="@"?Wi:it}),i.removeAttribute(c)}else c.startsWith(B)&&(a.push({type:6,index:r}),i.removeAttribute(c));if(ci.test(i.tagName)){const c=i.textContent.split(B),v=c.length-1;if(v>0){i.textContent=Je?Je.emptyScript:"";for(let f=0;f<v;f++)i.append(c[f],Re()),Y.nextNode(),a.push({type:2,index:++r});i.append(c[v],Re())}}}else if(i.nodeType===8)if(i.data===ai)a.push({type:2,index:r});else{let c=-1;for(;(c=i.data.indexOf(B,c+1))!==-1;)a.push({type:7,index:r}),c+=B.length-1}r++}}static createElement(e,t){const o=Q.createElement("template");return o.innerHTML=e,o}};function _e(s,e,t=s,o){var n,l;if(e===$e)return e;let i=o!==void 0?(n=t._$Co)==null?void 0:n[o]:t._$Cl;const r=Ue(e)?void 0:e._$litDirective$;return(i==null?void 0:i.constructor)!==r&&((l=i==null?void 0:i._$AO)==null||l.call(i,!1),r===void 0?i=void 0:(i=new r(s),i._$AT(s,t,o)),o!==void 0?(t._$Co??(t._$Co=[]))[o]=i:t._$Cl=i),i!==void 0&&(e=_e(s,i._$AS(s,e.values),i,o)),e}let zi=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:o}=this._$AD,i=((e==null?void 0:e.creationScope)??Q).importNode(t,!0);Y.currentNode=i;let r=Y.nextNode(),n=0,l=0,a=o[0];for(;a!==void 0;){if(n===a.index){let d;a.type===2?d=new fs(r,r.nextSibling,this,e):a.type===1?d=new a.ctor(r,a.name,a.strings,this,e):a.type===6&&(d=new Zi(r,this,e)),this._$AV.push(d),a=o[++l]}n!==(a==null?void 0:a.index)&&(r=Y.nextNode(),n++)}return Y.currentNode=Q,i}p(e){let t=0;for(const o of this._$AV)o!==void 0&&(o.strings!==void 0?(o._$AI(e,o,t),t+=o.strings.length-2):o._$AI(e[t])),t++}},fs=class pi{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,o,i){this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=o,this.options=i,this._$Cv=(i==null?void 0:i.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=_e(this,e,t),Ue(e)?e===A||e==null||e===""?(this._$AH!==A&&this._$AR(),this._$AH=A):e!==this._$AH&&e!==$e&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Bi(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==A&&Ue(this._$AH)?this._$AA.nextSibling.data=e:this.T(Q.createTextNode(e)),this._$AH=e}$(e){var r;const{values:t,_$litType$:o}=e,i=typeof o=="number"?this._$AC(e):(o.el===void 0&&(o.el=St.createElement(ui(o.h,o.h[0]),this.options)),o);if(((r=this._$AH)==null?void 0:r._$AD)===i)this._$AH.p(t);else{const n=new zi(i,this),l=n.u(this.options);n.p(t),this.T(l),this._$AH=n}}_$AC(e){let t=Is.get(e.strings);return t===void 0&&Is.set(e.strings,t=new St(e)),t}k(e){ps(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let o,i=0;for(const r of e)i===t.length?t.push(o=new pi(this.O(Re()),this.O(Re()),this,this.options)):o=t[i],o._$AI(r),i++;i<t.length&&(this._$AR(o&&o._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){var o;for((o=this._$AP)==null?void 0:o.call(this,!1,!0,t);e&&e!==this._$AB;){const i=e.nextSibling;e.remove(),e=i}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}},it=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,o,i,r){this.type=1,this._$AH=A,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=r,o.length>2||o[0]!==""||o[1]!==""?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=A}_$AI(e,t=this,o,i){const r=this.strings;let n=!1;if(r===void 0)e=_e(this,e,t,0),n=!Ue(e)||e!==this._$AH&&e!==$e,n&&(this._$AH=e);else{const l=e;let a,d;for(e=r[0],a=0;a<r.length-1;a++)d=_e(this,l[o+a],t,a),d===$e&&(d=this._$AH[a]),n||(n=!Ue(d)||d!==this._$AH[a]),d===A?e=A:e!==A&&(e+=(d??"")+r[a+1]),this._$AH[a]=d}n&&!i&&this.j(e)}j(e){e===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},ki=class extends it{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===A?void 0:e}},Fi=class extends it{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==A)}},Wi=class extends it{constructor(e,t,o,i,r){super(e,t,o,i,r),this.type=5}_$AI(e,t=this){if((e=_e(this,e,t,0)??A)===$e)return;const o=this._$AH,i=e===A&&o!==A||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,r=e!==A&&(o===A||i);i&&this.element.removeEventListener(this.name,this,o),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}},Zi=class{constructor(e,t,o){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(e){_e(this,e)}};const ut=Le.litHtmlPolyfillSupport;ut==null||ut(St,fs),(Le.litHtmlVersions??(Le.litHtmlVersions=[])).push("3.2.1");const qi=(s,e,t)=>{const o=(t==null?void 0:t.renderBefore)??e;let i=o._$litPart$;if(i===void 0){const r=(t==null?void 0:t.renderBefore)??null;o._$litPart$=i=new fs(e.insertBefore(Re(),r),r,void 0,t??{})}return i._$AI(s),i};let ae=class extends re{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=qi(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return $e}};var oi;ae._$litElement$=!0,ae.finalized=!0,(oi=globalThis.litElementHydrateSupport)==null||oi.call(globalThis,{LitElement:ae});const ht=globalThis.litElementPolyfillSupport;ht==null||ht({LitElement:ae});(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.1.1");const fi=s=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(s,e)}):customElements.define(s,e)};const Ki={attribute:!0,type:String,converter:Ye,reflect:!1,hasChanged:hs},Xi=(s=Ki,e,t)=>{const{kind:o,metadata:i}=t;let r=globalThis.litPropertyMetadata.get(i);if(r===void 0&&globalThis.litPropertyMetadata.set(i,r=new Map),r.set(t.name,s),o==="accessor"){const{name:n}=t;return{set(l){const a=e.get.call(this);e.set.call(this,l),this.requestUpdate(n,a,s)},init(l){return l!==void 0&&this.P(n,void 0,s),l}}}if(o==="setter"){const{name:n}=t;return function(l){const a=this[n];e.call(this,l),this.requestUpdate(n,a,s)}}throw Error("Unsupported decorator location: "+o)};function vs(s){return(e,t)=>typeof t=="object"?Xi(s,e,t):((o,i,r)=>{const n=i.hasOwnProperty(r);return i.constructor.createProperty(r,n?{...o,wrapped:!0}:o),n?Object.getOwnPropertyDescriptor(i,r):void 0})(s,e,t)}function ot(s){return vs({...s,state:!0,attribute:!1})}const Yi=(s,e,t)=>(t.configurable=!0,t.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(s,e,t),t);function Ji(s,e){return(t,o,i)=>{const r=n=>{var l;return((l=n.renderRoot)==null?void 0:l.querySelector(s))??null};return Yi(t,o,{get(){return r(this)}})}}const Ke=globalThis,gs=Ke.ShadowRoot&&(Ke.ShadyCSS===void 0||Ke.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ms=Symbol(),Ns=new WeakMap;let vi=class{constructor(e,t,o){if(this._$cssResult$=!0,o!==ms)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(gs&&e===void 0){const o=t!==void 0&&t.length===1;o&&(e=Ns.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),o&&Ns.set(t,e))}return e}toString(){return this.cssText}};const Qi=s=>new vi(typeof s=="string"?s:s+"",void 0,ms),j=(s,...e)=>{const t=s.length===1?s[0]:e.reduce((o,i,r)=>o+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+s[r+1],s[0]);return new vi(t,s,ms)},eo=(s,e)=>{if(gs)s.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const o=document.createElement("style"),i=Ke.litNonce;i!==void 0&&o.setAttribute("nonce",i),o.textContent=t.cssText,s.appendChild(o)}},Rs=gs?s=>s:s=>s instanceof CSSStyleSheet?(e=>{let t="";for(const o of e.cssRules)t+=o.cssText;return Qi(t)})(s):s;const{is:to,defineProperty:so,getOwnPropertyDescriptor:io,getOwnPropertyNames:oo,getOwnPropertySymbols:ro,getPrototypeOf:no}=Object,z=globalThis,Us=z.trustedTypes,lo=Us?Us.emptyScript:"",pt=z.reactiveElementPolyfillSupport,Ie=(s,e)=>s,Qe={toAttribute(s,e){switch(e){case Boolean:s=s?lo:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,e){let t=s;switch(e){case Boolean:t=s!==null;break;case Number:t=s===null?null:Number(s);break;case Object:case Array:try{t=JSON.parse(s)}catch{t=null}}return t}},$s=(s,e)=>!to(s,e),Ms={attribute:!0,type:String,converter:Qe,reflect:!1,hasChanged:$s};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),z.litPropertyMetadata??(z.litPropertyMetadata=new WeakMap);class ne extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=Ms){if(t.state&&(t.attribute=!1),this._$Ei(),this.elementProperties.set(e,t),!t.noAccessor){const o=Symbol(),i=this.getPropertyDescriptor(e,o,t);i!==void 0&&so(this.prototype,e,i)}}static getPropertyDescriptor(e,t,o){const{get:i,set:r}=io(this.prototype,e)??{get(){return this[t]},set(n){this[t]=n}};return{get(){return i==null?void 0:i.call(this)},set(n){const l=i==null?void 0:i.call(this);r.call(this,n),this.requestUpdate(e,l,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Ms}static _$Ei(){if(this.hasOwnProperty(Ie("elementProperties")))return;const e=no(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(Ie("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Ie("properties"))){const t=this.properties,o=[...oo(t),...ro(t)];for(const i of o)this.createProperty(i,t[i])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[o,i]of t)this.elementProperties.set(o,i)}this._$Eh=new Map;for(const[t,o]of this.elementProperties){const i=this._$Eu(t,o);i!==void 0&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const o=new Set(e.flat(1/0).reverse());for(const i of o)t.unshift(Rs(i))}else e!==void 0&&t.push(Rs(e));return t}static _$Eu(e,t){const o=t.attribute;return o===!1?void 0:typeof o=="string"?o:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const o of t.keys())this.hasOwnProperty(o)&&(e.set(o,this[o]),delete this[o]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return eo(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var o;return(o=t.hostConnected)==null?void 0:o.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var o;return(o=t.hostDisconnected)==null?void 0:o.call(t)})}attributeChangedCallback(e,t,o){this._$AK(e,o)}_$EC(e,t){var r;const o=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,o);if(i!==void 0&&o.reflect===!0){const n=(((r=o.converter)==null?void 0:r.toAttribute)!==void 0?o.converter:Qe).toAttribute(t,o.type);this._$Em=e,n==null?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(e,t){var r;const o=this.constructor,i=o._$Eh.get(e);if(i!==void 0&&this._$Em!==i){const n=o.getPropertyOptions(i),l=typeof n.converter=="function"?{fromAttribute:n.converter}:((r=n.converter)==null?void 0:r.fromAttribute)!==void 0?n.converter:Qe;this._$Em=i,this[i]=l.fromAttribute(t,n.type),this._$Em=null}}requestUpdate(e,t,o){if(e!==void 0){if(o??(o=this.constructor.getPropertyOptions(e)),!(o.hasChanged??$s)(this[e],t))return;this.P(e,t,o)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(e,t,o){this._$AL.has(e)||this._$AL.set(e,t),o.reflect===!0&&this._$Em!==e&&(this._$Ej??(this._$Ej=new Set)).add(e)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var o;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[r,n]of this._$Ep)this[r]=n;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[r,n]of i)n.wrapped!==!0||this._$AL.has(r)||this[r]===void 0||this.P(r,this[r],n)}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(o=this._$EO)==null||o.forEach(i=>{var r;return(r=i.hostUpdate)==null?void 0:r.call(i)}),this.update(t)):this._$EU()}catch(i){throw e=!1,this._$EU(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(o=>{var i;return(i=o.hostUpdated)==null?void 0:i.call(o)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Ej&&(this._$Ej=this._$Ej.forEach(t=>this._$EC(t,this[t]))),this._$EU()}updated(e){}firstUpdated(e){}}ne.elementStyles=[],ne.shadowRootOptions={mode:"open"},ne[Ie("elementProperties")]=new Map,ne[Ie("finalized")]=new Map,pt==null||pt({ReactiveElement:ne}),(z.reactiveElementVersions??(z.reactiveElementVersions=[])).push("2.0.4");const Ne=globalThis,et=Ne.trustedTypes,Ds=et?et.createPolicy("lit-html",{createHTML:s=>s}):void 0,gi="$lit$",V=`lit$${Math.random().toFixed(9).slice(2)}$`,mi="?"+V,ao=`<${mi}>`,ee=document,Me=()=>ee.createComment(""),De=s=>s===null||typeof s!="object"&&typeof s!="function",_s=Array.isArray,co=s=>_s(s)||typeof(s==null?void 0:s[Symbol.iterator])=="function",ft=`[ 	
\f\r]`,Oe=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,js=/-->/g,Hs=/>/g,K=RegExp(`>|${ft}(?:([^\\s"'>=/]+)(${ft}*=${ft}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Bs=/'/g,Vs=/"/g,$i=/^(?:script|style|textarea|title)$/i,uo=s=>(e,...t)=>({_$litType$:s,strings:e,values:t}),u=uo(1),k=Symbol.for("lit-noChange"),b=Symbol.for("lit-nothing"),Gs=new WeakMap,J=ee.createTreeWalker(ee,129);function _i(s,e){if(!_s(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ds!==void 0?Ds.createHTML(e):e}const ho=(s,e)=>{const t=s.length-1,o=[];let i,r=e===2?"<svg>":e===3?"<math>":"",n=Oe;for(let l=0;l<t;l++){const a=s[l];let d,p,c=-1,v=0;for(;v<a.length&&(n.lastIndex=v,p=n.exec(a),p!==null);)v=n.lastIndex,n===Oe?p[1]==="!--"?n=js:p[1]!==void 0?n=Hs:p[2]!==void 0?($i.test(p[2])&&(i=RegExp("</"+p[2],"g")),n=K):p[3]!==void 0&&(n=K):n===K?p[0]===">"?(n=i??Oe,c=-1):p[1]===void 0?c=-2:(c=n.lastIndex-p[2].length,d=p[1],n=p[3]===void 0?K:p[3]==='"'?Vs:Bs):n===Vs||n===Bs?n=K:n===js||n===Hs?n=Oe:(n=K,i=void 0);const f=n===K&&s[l+1].startsWith("/>")?" ":"";r+=n===Oe?a+ao:c>=0?(o.push(d),a.slice(0,c)+gi+a.slice(c)+V+f):a+V+(c===-2?l:f)}return[_i(s,r+(s[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),o]};class je{constructor({strings:e,_$litType$:t},o){let i;this.parts=[];let r=0,n=0;const l=e.length-1,a=this.parts,[d,p]=ho(e,t);if(this.el=je.createElement(d,o),J.currentNode=this.el.content,t===2||t===3){const c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(i=J.nextNode())!==null&&a.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(const c of i.getAttributeNames())if(c.endsWith(gi)){const v=p[n++],f=i.getAttribute(c).split(V),$=/([.?@])?(.*)/.exec(v);a.push({type:1,index:r,name:$[2],strings:f,ctor:$[1]==="."?fo:$[1]==="?"?vo:$[1]==="@"?go:rt}),i.removeAttribute(c)}else c.startsWith(V)&&(a.push({type:6,index:r}),i.removeAttribute(c));if($i.test(i.tagName)){const c=i.textContent.split(V),v=c.length-1;if(v>0){i.textContent=et?et.emptyScript:"";for(let f=0;f<v;f++)i.append(c[f],Me()),J.nextNode(),a.push({type:2,index:++r});i.append(c[v],Me())}}}else if(i.nodeType===8)if(i.data===mi)a.push({type:2,index:r});else{let c=-1;for(;(c=i.data.indexOf(V,c+1))!==-1;)a.push({type:7,index:r}),c+=V.length-1}r++}}static createElement(e,t){const o=ee.createElement("template");return o.innerHTML=e,o}}function be(s,e,t=s,o){var n,l;if(e===k)return e;let i=o!==void 0?(n=t._$Co)==null?void 0:n[o]:t._$Cl;const r=De(e)?void 0:e._$litDirective$;return(i==null?void 0:i.constructor)!==r&&((l=i==null?void 0:i._$AO)==null||l.call(i,!1),r===void 0?i=void 0:(i=new r(s),i._$AT(s,t,o)),o!==void 0?(t._$Co??(t._$Co=[]))[o]=i:t._$Cl=i),i!==void 0&&(e=be(s,i._$AS(s,e.values),i,o)),e}let po=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:o}=this._$AD,i=((e==null?void 0:e.creationScope)??ee).importNode(t,!0);J.currentNode=i;let r=J.nextNode(),n=0,l=0,a=o[0];for(;a!==void 0;){if(n===a.index){let d;a.type===2?d=new Ae(r,r.nextSibling,this,e):a.type===1?d=new a.ctor(r,a.name,a.strings,this,e):a.type===6&&(d=new mo(r,this,e)),this._$AV.push(d),a=o[++l]}n!==(a==null?void 0:a.index)&&(r=J.nextNode(),n++)}return J.currentNode=ee,i}p(e){let t=0;for(const o of this._$AV)o!==void 0&&(o.strings!==void 0?(o._$AI(e,o,t),t+=o.strings.length-2):o._$AI(e[t])),t++}};class Ae{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,o,i){this.type=2,this._$AH=b,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=o,this.options=i,this._$Cv=(i==null?void 0:i.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=be(this,e,t),De(e)?e===b||e==null||e===""?(this._$AH!==b&&this._$AR(),this._$AH=b):e!==this._$AH&&e!==k&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):co(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==b&&De(this._$AH)?this._$AA.nextSibling.data=e:this.T(ee.createTextNode(e)),this._$AH=e}$(e){var r;const{values:t,_$litType$:o}=e,i=typeof o=="number"?this._$AC(e):(o.el===void 0&&(o.el=je.createElement(_i(o.h,o.h[0]),this.options)),o);if(((r=this._$AH)==null?void 0:r._$AD)===i)this._$AH.p(t);else{const n=new po(i,this),l=n.u(this.options);n.p(t),this.T(l),this._$AH=n}}_$AC(e){let t=Gs.get(e.strings);return t===void 0&&Gs.set(e.strings,t=new je(e)),t}k(e){_s(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let o,i=0;for(const r of e)i===t.length?t.push(o=new Ae(this.O(Me()),this.O(Me()),this,this.options)):o=t[i],o._$AI(r),i++;i<t.length&&(this._$AR(o&&o._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){var o;for((o=this._$AP)==null?void 0:o.call(this,!1,!0,t);e&&e!==this._$AB;){const i=e.nextSibling;e.remove(),e=i}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class rt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,o,i,r){this.type=1,this._$AH=b,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=r,o.length>2||o[0]!==""||o[1]!==""?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=b}_$AI(e,t=this,o,i){const r=this.strings;let n=!1;if(r===void 0)e=be(this,e,t,0),n=!De(e)||e!==this._$AH&&e!==k,n&&(this._$AH=e);else{const l=e;let a,d;for(e=r[0],a=0;a<r.length-1;a++)d=be(this,l[o+a],t,a),d===k&&(d=this._$AH[a]),n||(n=!De(d)||d!==this._$AH[a]),d===b?e=b:e!==b&&(e+=(d??"")+r[a+1]),this._$AH[a]=d}n&&!i&&this.j(e)}j(e){e===b?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class fo extends rt{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===b?void 0:e}}class vo extends rt{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==b)}}class go extends rt{constructor(e,t,o,i,r){super(e,t,o,i,r),this.type=5}_$AI(e,t=this){if((e=be(this,e,t,0)??b)===k)return;const o=this._$AH,i=e===b&&o!==b||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,r=e!==b&&(o===b||i);i&&this.element.removeEventListener(this.name,this,o),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class mo{constructor(e,t,o){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(e){be(this,e)}}const $o={I:Ae},vt=Ne.litHtmlPolyfillSupport;vt==null||vt(je,Ae),(Ne.litHtmlVersions??(Ne.litHtmlVersions=[])).push("3.2.1");const _o=(s,e,t)=>{const o=(t==null?void 0:t.renderBefore)??e;let i=o._$litPart$;if(i===void 0){const r=(t==null?void 0:t.renderBefore)??null;o._$litPart$=i=new Ae(e.insertBefore(Me(),r),r,void 0,t??{})}return i._$AI(s),i};let m=class extends ne{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=_o(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return k}};var ri;m._$litElement$=!0,m.finalized=!0,(ri=globalThis.litElementHydrateSupport)==null||ri.call(globalThis,{LitElement:m});const gt=globalThis.litElementPolyfillSupport;gt==null||gt({LitElement:m});(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.1.1");const y=s=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(s,e)}):customElements.define(s,e)};const bo={attribute:!0,type:String,converter:Qe,reflect:!1,hasChanged:$s},Eo=(s=bo,e,t)=>{const{kind:o,metadata:i}=t;let r=globalThis.litPropertyMetadata.get(i);if(r===void 0&&globalThis.litPropertyMetadata.set(i,r=new Map),r.set(t.name,s),o==="accessor"){const{name:n}=t;return{set(l){const a=e.get.call(this);e.set.call(this,l),this.requestUpdate(n,a,s)},init(l){return l!==void 0&&this.P(n,void 0,s),l}}}if(o==="setter"){const{name:n}=t;return function(l){const a=this[n];e.call(this,l),this.requestUpdate(n,a,s)}}throw Error("Unsupported decorator location: "+o)};function h(s){return(e,t)=>typeof t=="object"?Eo(s,e,t):((o,i,r)=>{const n=i.hasOwnProperty(r);return i.constructor.createProperty(r,n?{...o,wrapped:!0}:o),n?Object.getOwnPropertyDescriptor(i,r):void 0})(s,e,t)}function O(s){return h({...s,state:!0,attribute:!1})}const yo=(s,e,t)=>(t.configurable=!0,t.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(s,e,t),t);function Ge(s,e){return(t,o,i)=>{const r=n=>{var l;return((l=n.renderRoot)==null?void 0:l.querySelector(s))??null};return yo(t,o,{get(){return r(this)}})}}const H=j`
  :host {
    --ssui-negative-color: #600;
    --ssui-negative-background-color: #ffc4c4;
    --ssui-positive-color: #060;
    --ssui-positive-background-color: #c4ffc4;
    --ssui-box-background-color: #fff;
    --ssui-box-border-color: #aaa;
    --ssui-box-text-color: #000;
    --ssui-input-background-color: #fff;
    --ssui-input-border-color: #ccc;
    --ssui-input-unsaved-border-color: #b60;
    --ssui-input-text-color: #000;
    --ssui-input-suggestion-background-color: #fff;
    --ssui-input-suggestion-text-color: #888;
    --ssui-input-suggestion-selected-background-color: #ddd;
    --ssui-input-suggestion-selected-text-color: #000;
    --ssui-loader-color1: #000;
    --ssui-loader-color2: #0002;
    --ssui-toggle-outer-background-color1: #777;
    --ssui-toggle-outer-background-color2: #999;
    --ssui-toggle-inner-background-color1: #ccc;
    --ssui-toggle-inner-background-color2: #aaa;
    --ssui-toggle-ball-background-color1: #555;
    --ssui-toggle-ball-background-color2: #777;
    --ssui-toggle-ball-border-color: #222;
  }

  input[type='text'],
  input[type='date'],
  input[type='datetime-local'],
  input[type='password'],
  input[type='number'],
  select,
  button {
    font-family: Poppins;
    padding: 0.5rem;
    box-sizing: border-box;
    width: 100%;
    color: var(--input-text-color, var(--ssui-input-text-color, #000));
    background-color: var(
      --input-background-color,
      var(--ssui-input-background-color, #fff)
    );
    border: 1px solid
      var(--input-border-color, var(--ssui-input-border-color, #ccc));
    border-radius: 0.5rem;
    outline: none;
  }
  main {
    margin-top: 1rem;
  }

  fieldset {
    border-radius: 0.5rem;
  }

  .box {
    background-color: var(
      --box-background-color,
      var(--ssui-box-background-color)
    );
    border-radius: 8px;
    border: 1px var(--box-border-color, var(--ssui-box-border-color)) solid;
  }
`;var _;(function(s){s.OPEN="open",s.CLOSE_BUTTON="closeButton",s.CLOSE_ON_OUTSIDE_CLICK="closeOnOutsideClick",s.CLOSE_ON_ESC="closeOnEsc"})(_||(_={}));const Fe={[_.OPEN]:{default:!1,control:"boolean",description:"Whether the pop-up is open or not"},[_.CLOSE_BUTTON]:{default:!1,control:"boolean",description:"Whether to show the close button"},[_.CLOSE_ON_OUTSIDE_CLICK]:{default:!1,control:"boolean",description:"Whether to close the pop-up when clicking outside of it"},[_.CLOSE_ON_ESC]:{default:!1,control:"boolean",description:"Whether to close the pop-up when pressing the ESC key"}};const bi={ATTRIBUTE:1,CHILD:2},Ei=s=>(...e)=>({_$litDirective$:s,values:e});class yi{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,o){this._$Ct=e,this._$AM=t,this._$Ci=o}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}const Se=Ei(class extends yi{constructor(s){var e;if(super(s),s.type!==bi.ATTRIBUTE||s.name!=="class"||((e=s.strings)==null?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(s){return" "+Object.keys(s).filter(e=>s[e]).join(" ")+" "}update(s,[e]){var o,i;if(this.st===void 0){this.st=new Set,s.strings!==void 0&&(this.nt=new Set(s.strings.join(" ").split(/\s/).filter(r=>r!=="")));for(const r in e)e[r]&&!((o=this.nt)!=null&&o.has(r))&&this.st.add(r);return this.render(e)}const t=s.element.classList;for(const r of this.st)r in e||(t.remove(r),this.st.delete(r));for(const r in e){const n=!!e[r];n===this.st.has(r)||(i=this.nt)!=null&&i.has(r)||(n?(t.add(r),this.st.add(r)):(t.remove(r),this.st.delete(r)))}return k}}),Ao="pop-up-opened";class So extends CustomEvent{constructor(e){super(Ao,{bubbles:!0,composed:!0,detail:e})}}const Co="pop-up-closed";class We extends CustomEvent{constructor(e){super(Co,{bubbles:!0,composed:!0,detail:e})}}var R=function(s,e,t,o){var i=arguments.length,r=i<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,t):o,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(s,e,t,o);else for(var l=s.length-1;l>=0;l--)(n=s[l])&&(r=(i<3?n(r):i>3?n(e,t,r):n(e,t))||r);return i>3&&r&&Object.defineProperty(e,t,r),r},Ct,wt,Ot,Tt,ce;let N=(ce=class extends m{constructor(){super(...arguments),this[Ct]=Fe[_.OPEN].default,this[wt]=Fe[_.CLOSE_BUTTON].default,this[Ot]=Fe[_.CLOSE_ON_OUTSIDE_CLICK].default,this[Tt]=Fe[_.CLOSE_ON_ESC].default,this.newlyOpened=!1,this.lastOpenedState=!1,this.lastOpenedChangeTime=null,this.handleClickOutside=e=>{!this.newlyOpened&&this[_.CLOSE_ON_OUTSIDE_CLICK]&&this[_.OPEN]&&!e.composedPath().includes(this.container)&&(this.lastOpenedChangeTime=new Date().getTime(),this.dispatchEvent(new We({changeTime:this.lastOpenedChangeTime})))},this.handleKeyDown=e=>{this[_.CLOSE_ON_ESC]&&e.key==="Escape"&&(this.lastOpenedChangeTime=new Date().getTime(),this.dispatchEvent(new We({changeTime:this.lastOpenedChangeTime})))}}get classes(){return{"pop-up":!0,open:this.open}}connectedCallback(){super.connectedCallback(),document.addEventListener("keydown",this.handleKeyDown),document.addEventListener("click",this.handleClickOutside)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("keydown",this.handleKeyDown),document.removeEventListener("click",this.handleClickOutside)}firstUpdated(e){super.firstUpdated(e),this.lastOpenedState=this.open}async updated(e){if(super.updated(e),await this.updateComplete,e.has(_.OPEN)){if(this[_.OPEN]?(this.newlyOpened=!0,setTimeout(()=>{this.newlyOpened=!1},100)):this.newlyOpened=!1,this[_.OPEN]===this.lastOpenedState){console.log("No state change detected, skipping event dispatch.");return}this.lastOpenedState=this[_.OPEN],this.lastOpenedChangeTime=new Date().getTime(),this[_.OPEN]?(console.log("Pop-up opened event dispatched."),this.dispatchEvent(new So({changeTime:this.lastOpenedChangeTime}))):(console.log("Pop-up closed event dispatched."),this.dispatchEvent(new We({changeTime:this.lastOpenedChangeTime})))}}render(){return u`
      <div class=${Se(this.classes)} part="container">
        <div class="inner">
          ${this[_.CLOSE_BUTTON]?u`
                <div
                  class="close-button"
                  @click=${()=>{this.lastOpenedChangeTime=new Date().getTime(),this.dispatchEvent(new We({changeTime:this.lastOpenedChangeTime}))}}
                >
                  &#215;
                </div>
              `:b}
          <slot></slot>
        </div>
      </div>
    `}},Ct=_.OPEN,wt=_.CLOSE_BUTTON,Ot=_.CLOSE_ON_OUTSIDE_CLICK,Tt=_.CLOSE_ON_ESC,ce.styles=[H,j`
      :host {
        display: block;
      }

      .pop-up {
        display: none;
        position: fixed;
        width: 50vw;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: var(--box-text-color, var(--ssui-box-text-color, #000));
        background-color: var(
          --box-background-color,
          var(--ssui-box-background-color)
        );
        border: 1px solid var(--box-border-color, var(--ssui-box-border-color));

        z-index: 1000;
        border-radius: 0.5rem;
        box-shadow: 0 0 5rem rgba(0, 0, 0, 0.75);

        &.open {
          display: block;
        }

        .inner {
          padding: 3rem;
          position: relative;
          width: 100%;
          height: 100%;
          box-sizing: border-box;

          .close-button {
            position: absolute;
            top: 0rem;
            right: 0.5rem;
            font-size: 1.5rem;
            cursor: pointer;
          }
        }
      }
    `],ce);R([h({type:Boolean})],N.prototype,Ct,void 0);R([h({type:Boolean})],N.prototype,wt,void 0);R([h({type:Boolean})],N.prototype,Ot,void 0);R([h({type:Boolean})],N.prototype,Tt,void 0);R([O()],N.prototype,"newlyOpened",void 0);R([O()],N.prototype,"lastOpenedState",void 0);R([O()],N.prototype,"lastOpenedChangeTime",void 0);R([Ge(".pop-up")],N.prototype,"container",void 0);R([O()],N.prototype,"classes",null);N=R([y("pop-up")],N);const mt=s=>s??b;var tt;(function(s){s.TEXT="text",s.DATE="date",s.DATETIME_LOCAL="datetime-local",s.PASSWORD="password",s.NUMBER="number"})(tt||(tt={}));var g;(function(s){s.TYPE="type",s.VALUE="value",s.AUTO_COMPLETE="autoComplete",s.PLACEHOLDER="placeholder",s.SUGGESTIONS="suggestions",s.MIN="min",s.MAX="max",s.STEP="step",s.UNSAVED="unsaved"})(g||(g={}));const M={[g.TYPE]:{default:tt.TEXT,description:"What form element type the input behaves as",control:"text"},[g.VALUE]:{default:"",description:"The value as set from the data model",control:"text"},[g.AUTO_COMPLETE]:{default:!1,description:"Should the field provide auto-completion suggestions",control:"boolean"},[g.PLACEHOLDER]:{default:"",description:"Text to display in the field when no value is present",control:"text"},[g.SUGGESTIONS]:{default:[],description:"An array of suggestions used for auto-completion",control:"text"},[g.MIN]:{default:0,description:"The minimum value for a number input",control:"number"},[g.MAX]:{default:100,description:"The maximum value for a number input",control:"number"},[g.STEP]:{default:1,description:"The step value for a number input",control:"number"},[g.UNSAVED]:{default:!1,description:"Indicates whether the current value is unsaved",control:"boolean"}},wo="input-changed";class $t extends CustomEvent{constructor(e){super(wo,{bubbles:!0,composed:!0,detail:e})}}const Oo="input-submitted";class To extends CustomEvent{constructor(e){super(Oo,{bubbles:!0,composed:!0,detail:e})}}const xo="input-focused";class Po extends CustomEvent{constructor(e){super(xo,{bubbles:!0,composed:!0,detail:e})}}const Lo="input-blurred";class Io extends CustomEvent{constructor(e){super(Lo,{bubbles:!0,composed:!0,detail:e})}}const{I:No}=$o,zs=()=>document.createComment(""),Te=(s,e,t)=>{var r;const o=s._$AA.parentNode,i=e===void 0?s._$AB:e._$AA;if(t===void 0){const n=o.insertBefore(zs(),i),l=o.insertBefore(zs(),i);t=new No(n,l,s,s.options)}else{const n=t._$AB.nextSibling,l=t._$AM,a=l!==s;if(a){let d;(r=t._$AQ)==null||r.call(t,s),t._$AM=s,t._$AP!==void 0&&(d=s._$AU)!==l._$AU&&t._$AP(d)}if(n!==i||a){let d=t._$AA;for(;d!==n;){const p=d.nextSibling;o.insertBefore(d,i),d=p}}}return t},X=(s,e,t=s)=>(s._$AI(e,t),s),Ro={},Uo=(s,e=Ro)=>s._$AH=e,Mo=s=>s._$AH,_t=s=>{var o;(o=s._$AP)==null||o.call(s,!1,!0);let e=s._$AA;const t=s._$AB.nextSibling;for(;e!==t;){const i=e.nextSibling;e.remove(),e=i}};const ks=(s,e,t)=>{const o=new Map;for(let i=e;i<=t;i++)o.set(s[i],i);return o},bs=Ei(class extends yi{constructor(s){if(super(s),s.type!==bi.CHILD)throw Error("repeat() can only be used in text expressions")}dt(s,e,t){let o;t===void 0?t=e:e!==void 0&&(o=e);const i=[],r=[];let n=0;for(const l of s)i[n]=o?o(l,n):n,r[n]=t(l,n),n++;return{values:r,keys:i}}render(s,e,t){return this.dt(s,e,t).values}update(s,[e,t,o]){const i=Mo(s),{values:r,keys:n}=this.dt(e,t,o);if(!Array.isArray(i))return this.ut=n,r;const l=this.ut??(this.ut=[]),a=[];let d,p,c=0,v=i.length-1,f=0,$=r.length-1;for(;c<=v&&f<=$;)if(i[c]===null)c++;else if(i[v]===null)v--;else if(l[c]===n[f])a[f]=X(i[c],r[f]),c++,f++;else if(l[v]===n[$])a[$]=X(i[v],r[$]),v--,$--;else if(l[c]===n[$])a[$]=X(i[c],r[$]),Te(s,a[$+1],i[c]),c++,$--;else if(l[v]===n[f])a[f]=X(i[v],r[f]),Te(s,i[c],i[v]),v--,f++;else if(d===void 0&&(d=ks(n,f,$),p=ks(l,c,v)),d.has(l[c]))if(d.has(l[v])){const U=p.get(n[f]),at=U!==void 0?i[U]:null;if(at===null){const ys=Te(s,i[c]);X(ys,r[f]),a[f]=ys}else a[f]=X(at,r[f]),Te(s,i[c],at),i[U]=null;f++}else _t(i[v]),v--;else _t(i[c]),c++;for(;f<=$;){const U=Te(s,a[$+1]);X(U,r[f]),a[f++]=U}for(;c<=v;){const U=i[c++];U!==null&&_t(U)}return this.ut=n,Uo(s,a),k}}),Do="suggestion-changed";class jo extends CustomEvent{constructor(e){super(Do,{bubbles:!0,composed:!0,detail:e})}}const Ho="suggestion-submitted";class Bo extends CustomEvent{constructor(e){super(Ho,{bubbles:!0,composed:!0,detail:e})}}var P;(function(s){s.INPUT="input",s.MAX_MATCHES="maxMatches",s.MIN_INPUT="minInput",s.SUGGESTIONS="suggestions"})(P||(P={}));const Ze={[P.INPUT]:{default:"",control:"text",description:"The input value"},[P.MAX_MATCHES]:{default:5,control:"number",description:"The maximum number of suggestions to display"},[P.MIN_INPUT]:{default:1,control:"number",description:"The minimum number of characters to start showing suggestions"},[P.SUGGESTIONS]:{default:[],control:"text",description:"The list of suggestions to display"}};var ie=function(s,e,t,o){var i=arguments.length,r=i<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,t):o,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(s,e,t,o);else for(var l=s.length-1;l>=0;l--)(n=s[l])&&(r=(i<3?n(r):i>3?n(e,t,r):n(e,t))||r);return i>3&&r&&Object.defineProperty(e,t,r),r},xt,Pt,Lt,It,de;let F=(de=class extends m{constructor(){super(...arguments),this[xt]=Ze[P.INPUT].default,this[Pt]=Ze[P.MIN_INPUT].default,this[Lt]=Ze[P.MAX_MATCHES].default,this[It]=Ze[P.SUGGESTIONS].default,this.selectedIndex=-1}get show(){return this.suggestions.length>0&&this.input.length>=this.minInput}get maxSelectedIndex(){return this.suggestions.length-1}connectedCallback(){super.connectedCallback(),this.addEventListener("select-up",()=>{this.adjustSelectedIndex(-1)}),this.addEventListener("select-down",()=>{this.adjustSelectedIndex(1)}),this.addEventListener("select",()=>{this.suggestions.length&&this.selectedIndex!==-1?this.sendSelectedEvent(this.suggestions[this.selectedIndex]):this.sendSubmitEvent()})}adjustSelectedIndex(e){let t=this.selectedIndex+e;t<-1&&(t=this.maxSelectedIndex),t>this.maxSelectedIndex&&(t=-1),this.selectedIndex=t}sendSelectedEvent(e){this.dispatchEvent(new jo({value:e}))}sendSubmitEvent(){this.dispatchEvent(new Bo({selectedIndex:this.selectedIndex}))}render(){return u`
      <div>
        ${this.show?u` <ul class="box">
              ${bs(this.suggestions,e=>e,(e,t)=>u`
                  <li
                    class=${t===this.selectedIndex?"selected":""}
                    @mouseover=${()=>this.selectedIndex=t}
                    @click=${()=>this.sendSelectedEvent(e)}
                  >
                    ${e}
                  </li>
                `)}
            </ul>`:b}
      </div>
    `}},xt=P.INPUT,Pt=P.MIN_INPUT,Lt=P.MAX_MATCHES,It=P.SUGGESTIONS,de.styles=[H,j`
      div {
        position: relative;
      }

      ul {
        z-index: 100;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        list-style: none;
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        overflow: hidden;
      }

      li {
        padding: 0.5rem;
        background-color: var(
          --input-suggestion-background-color,
          var(--ssui-input-suggestion-background-color, #fff)
        );
        transition: all 0.2s;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        height: 2rem;
        line-height: 2rem;
        color: var(
          --input-suggestion-text-color,
          var(--ssui-input-suggestion-text-color, #888)
        );
        text-align: left;
      }

      li.selected {
        color: var(
          --input-suggestion-selected-text-color,
          var(--ssui-input-suggestion-selected-text-color, #000)
        );
        background-color: var(
          --input-suggestion-selected-background-color,
          var(--ssui-input-suggestion-selected-background-color, #ddd)
        );
      }
    `],de);ie([h()],F.prototype,xt,void 0);ie([h({type:Number})],F.prototype,Pt,void 0);ie([h({type:Number})],F.prototype,Lt,void 0);ie([h({type:Array})],F.prototype,It,void 0);ie([O()],F.prototype,"selectedIndex",void 0);ie([O()],F.prototype,"show",null);F=ie([y("ss-input-auto")],F);var C=function(s,e,t,o){var i=arguments.length,r=i<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,t):o,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(s,e,t,o);else for(var l=s.length-1;l>=0;l--)(n=s[l])&&(r=(i<3?n(r):i>3?n(e,t,r):n(e,t))||r);return i>3&&r&&Object.defineProperty(e,t,r),r},Nt,Rt,Ut,Mt,Dt,Ai,Si,Ci,jt,ue;let S=(ue=class extends m{constructor(){super(...arguments),this.clickFocusHandler=e=>{},this[Nt]=M[g.TYPE].default,this[Rt]=M[g.VALUE].default,this[Ut]=M[g.AUTO_COMPLETE].default,this[Mt]=M[g.PLACEHOLDER].default,this[Dt]=M[g.SUGGESTIONS].default,this[jt]=M[g.UNSAVED].default,this._value=this.value,this.hasFocus=!1,this.autoDismissed=!1,this.handleChange=e=>{let t="";return e.target instanceof HTMLInputElement&&(t=e.target.value),this._value=t,e.target instanceof HTMLInputElement&&(e.target.value=this._value),e.preventDefault(),!1},this.handleKeyDown=e=>{if(e.target instanceof HTMLInputElement)switch(e.code){case"Tab":this.autoDismissed=!0;return;case"ArrowUp":this.sendSuggestionUpEvent(e);return;case"ArrowDown":this.sendSuggestionDownEvent(e);return;case"Enter":this.showAutoComplete?this.sendSuggestionSelectEvent():this.sendSubmittedEvent(),e.preventDefault();return}},this.handleInput=e=>{let t="";return e.target instanceof HTMLInputElement&&(t=e.target.value),this.dispatchEvent(new $t({value:t})),this._value=t,this.autoDismissed=!1,!0},this.handleFocus=e=>{this.hasFocus=!0,this.autoDismissed=!1,this.dispatchEvent(new Po({value:this._value}))},this.handleBlur=e=>{setTimeout(()=>{this.hasFocus=!1},200),this.dispatchEvent(new Io({value:this._value}))},this.suggestionSelectHandler=e=>{this.autoDismissed=!0,this.inputField.value=e.detail.value,this.inputField.dispatchEvent(new $t({value:e.detail.value}))}}get showAutoComplete(){return this.autoComplete&&!this.autoDismissed&&this.value.length>0}connectedCallback(){super.connectedCallback(),this.clickFocusHandler=e=>{e.composedPath().includes(this.container)||(this.autoDismissed=!0),this.type===tt.NUMBER&&(this.min=M[g.MIN].default,this.max=M[g.MAX].default,this.step=M[g.STEP].default)},window.addEventListener("mousedown",this.clickFocusHandler)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("mousedown",this.clickFocusHandler)}updated(e){super.updated(e),e.has("value")&&(this.inputField.value=this.value)}focus(){this.inputField.focus()}blur(){this.inputField.blur()}clear(){this.inputField.value="",this.dispatchEvent(new $t({value:""}))}sendSuggestionUpEvent(e){this.autoCompleteNode&&(this.autoCompleteNode.dispatchEvent(new CustomEvent("select-up")),e.preventDefault())}sendSuggestionDownEvent(e){this.autoCompleteNode&&(this.autoCompleteNode.dispatchEvent(new CustomEvent("select-down")),e.preventDefault())}sendSuggestionSelectEvent(){this.autoCompleteNode&&this.autoCompleteNode.dispatchEvent(new CustomEvent("select"))}sendSubmittedEvent(){this.inputField.dispatchEvent(new To({value:this._value}))}handleSubmit(){this.sendSubmittedEvent()}render(){return u`
      <span part="container">
        <input
          class=${Se({focused:this.hasFocus,unsaved:this.unsaved})}
          part="input"
          type=${this.type}
          value=${this.value}
          @change=${this.handleChange}
          @keydown=${this.handleKeyDown}
          @input=${this.handleInput}
          @focus=${this.handleFocus}
          @blur=${this.handleBlur}
          placeholder=${this.placeholder}
          min=${mt(this.min)}
          max=${mt(this.max)}
          step=${mt(this.step)}
          autocomplete="off"
          autocapitalize="off"
        />
        ${this.showAutoComplete?u`
              <ss-input-auto
                input=${this._value}
                .suggestions=${this.suggestions}
                @suggestion-submitted=${this.handleSubmit}
                @suggestion-changed=${this.suggestionSelectHandler}
              ></ss-input-auto>
            `:b}
      </span>
    `}},Nt=g.TYPE,Rt=g.VALUE,Ut=g.AUTO_COMPLETE,Mt=g.PLACEHOLDER,Dt=g.SUGGESTIONS,Ai=g.MIN,Si=g.MAX,Ci=g.STEP,jt=g.UNSAVED,ue.styles=[H,j`
      input:focus,
      input.focused {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
      }

      input.unsaved {
        border-color: var(
          --input-unsaved-border-color,
          var(
            --ssui-input-unsaved-border-color,
            var(--ssui-input-border-color, #ccc)
          )
        );
      }
    `],ue);C([h()],S.prototype,Nt,void 0);C([h()],S.prototype,Rt,void 0);C([h({type:Boolean})],S.prototype,Ut,void 0);C([h()],S.prototype,Mt,void 0);C([h({type:Array})],S.prototype,Dt,void 0);C([h({type:Number,reflect:!0})],S.prototype,Ai,void 0);C([h({type:Number,reflect:!0})],S.prototype,Si,void 0);C([h({type:Number,reflect:!0})],S.prototype,Ci,void 0);C([h({type:Boolean})],S.prototype,jt,void 0);C([O()],S.prototype,"_value",void 0);C([Ge("input")],S.prototype,"inputField",void 0);C([Ge("ss-input-auto")],S.prototype,"autoCompleteNode",void 0);C([Ge("span")],S.prototype,"container",void 0);C([O()],S.prototype,"hasFocus",void 0);C([O()],S.prototype,"autoDismissed",void 0);C([O()],S.prototype,"showAutoComplete",null);S=C([y("ss-input")],S);var He;(function(s){s.PADDED="padded"})(He||(He={}));const Vo={[He.PADDED]:{default:!1,description:"Whether to provide padding around the loader",control:"boolean"}};var Es=function(s,e,t,o){var i=arguments.length,r=i<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,t):o,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(s,e,t,o);else for(var l=s.length-1;l>=0;l--)(n=s[l])&&(r=(i<3?n(r):i>3?n(e,t,r):n(e,t))||r);return i>3&&r&&Object.defineProperty(e,t,r),r},Ht,he;let st=(he=class extends m{constructor(){super(...arguments),this[Ht]=Vo[He.PADDED].default}get classes(){return{container:!0,padded:this.padded}}render(){return u`<div class=${Se(this.classes)}>
      <span class="loader"></span>
    </div>`}},Ht=He.PADDED,he.styles=[H,j`
      .container {
        text-align: center;
        height: 16px;
      }

      .container.padded {
        margin: 1rem;
      }

      .loader {
        display: inline-block;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background-color: var(--loader-color1, var(--ssui-loader-color1, #000));
        box-shadow:
          32px 0 var(--loader-color1, var(--ssui-loader-color1, #000)),
          -32px 0 var(--loader-color1, var(--ssui-loader-color1, #000));
        position: relative;
        animation: flash 0.5s ease-out infinite alternate;
        transform: skewX(50%);
      }

      @keyframes flash {
        0% {
          background-color: var(
            --loader-color2,
            var(--ssui-loader-color2, #0002)
          );
          box-shadow:
            32px 0 var(--loader-color2, var(--ssui-loader-color2, #0002)),
            -32px 0 var(--loader-color1, var(--ssui-loader-color1, #000));
        }
        50% {
          background-color: var(
            --loader-color1,
            var(--ssui-loader-color1, #000)
          );
          box-shadow:
            32px 0 var(--loader-color2, var(--ssui-loader-color2, #0002)),
            -32px 0 var(--loader-color2, var(--ssui-loader-color2, #0002));
        }
        100% {
          background-color: var(
            --loader-color2,
            var(--ssui-loader-color2, #0002)
          );
          box-shadow:
            32px 0 var(--loader-color1, var(--ssui-loader-color1, #000)),
            -32px 0 var(--loader-color2, var(--ssui-loader-color2, #0002));
        }
      }
    `],he);Es([h({type:Boolean})],st.prototype,Ht,void 0);Es([O()],st.prototype,"classes",null);st=Es([y("ss-loader")],st);var L;(function(s){s.TEXT="text",s.DISABLED="disabled",s.LOADING="loading",s.POSITIVE="positive",s.NEGATIVE="negative",s.CLASS="class"})(L||(L={}));L.TEXT+"",L.DISABLED+"",L.LOADING+"",L.POSITIVE+"",L.NEGATIVE+"",L.CLASS+"";var Z=function(s,e,t,o){var i=arguments.length,r=i<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,t):o,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(s,e,t,o);else for(var l=s.length-1;l>=0;l--)(n=s[l])&&(r=(i<3?n(r):i>3?n(e,t,r):n(e,t))||r);return i>3&&r&&Object.defineProperty(e,t,r),r},Bt,Vt,Gt,zt,kt,Ft,pe;let D=(pe=class extends m{constructor(){super(...arguments),this[Bt]="",this[Vt]=!1,this[Gt]=!1,this[zt]=!1,this[kt]=!1,this[Ft]="",this.handleClick=e=>{this.dispatchEvent(new CustomEvent("ss-button-clicked",{bubbles:!0,composed:!0}))}}get classes(){const e={loading:this.loading,disabled:this.disabled,positive:this.positive,negative:this.negative};return this.class.split(" ").forEach(t=>{e[t]=!0}),e}render(){return u`
      <button
        class=${Se(this.classes)}
        @click=${this.handleClick}
        ?disabled=${this.disabled}
        part="button"
      >
        ${this.loading?u` <ss-loader></ss-loader> `:this.text?this.text:u`<slot></slot>`}
      </button>
    `}},Bt=L.TEXT,Vt=L.DISABLED,Gt=L.LOADING,zt=L.POSITIVE,kt=L.NEGATIVE,Ft=L.CLASS,pe.styles=[H,j`
      button {
        border-radius: 0.5rem;

        &.loading {
          min-width: 100px;
        }

        &.positive {
          background-color: var(
            --positive-background-color,
            var(--ssui-positive-background-color)
          );
          color: var(--positive-color, var(--ssui-positive-color));
          border-color: var(--positive-color, var(--ssui-positive-color));
        }

        &.negative {
          background-color: var(
            --negative-background-color,
            var(--ssui-negative-background-color)
          );
          color: var(--ssui-negative-color, var(--ssui-negative-color));
          border-color: var(--negative-color, var(--ssui-negative-color));
        }

        &.disabled {
          opacity: 0.5;
        }
      }
    `],pe);Z([h()],D.prototype,Bt,void 0);Z([h({type:Boolean})],D.prototype,Vt,void 0);Z([h({type:Boolean})],D.prototype,Gt,void 0);Z([h({type:Boolean})],D.prototype,zt,void 0);Z([h({type:Boolean})],D.prototype,kt,void 0);Z([h()],D.prototype,Ft,void 0);Z([O()],D.prototype,"classes",null);D=Z([y("ss-button")],D);var Go=function(s,e,t,o){var i=arguments.length,r=i<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,t):o,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(s,e,t,o);else for(var l=s.length-1;l>=0;l--)(n=s[l])&&(r=(i<3?n(r):i>3?n(e,t,r):n(e,t))||r);return i>3&&r&&Object.defineProperty(e,t,r),r};let Fs=class extends m{render(){return u`
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M16.5 7.063C16.5 10.258 14.57 13 12 13c-2.572 0-4.5-2.742-4.5-5.938C7.5 3.868 9.16 2 12 2s4.5 1.867 4.5 5.063zM4.102 20.142C4.487 20.6 6.145 22 12 22c5.855 0 7.512-1.4 7.898-1.857a.416.416 0 0 0 .09-.317C19.9 18.944 19.106 15 12 15s-7.9 3.944-7.989 4.826a.416.416 0 0 0 .091.317z"
          fill="currentColor"
        />
      </svg>
    `}};Fs=Go([y("svg-profile")],Fs);var zo=function(s,e,t,o){var i=arguments.length,r=i<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,t):o,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(s,e,t,o);else for(var l=s.length-1;l>=0;l--)(n=s[l])&&(r=(i<3?n(r):i>3?n(e,t,r):n(e,t))||r);return i>3&&r&&Object.defineProperty(e,t,r),r};let Ws=class extends m{render(){return u`
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm1.71,12.29a1,1,0,0,1,0,1.42,1,1,0,0,1-1.42,0l-3-3a1,1,0,0,1,0-1.42l3-3a1,1,0,0,1,1.42,1.42L11.41,12Z"
          fill="currentColor"
        ></path>
      </svg>
    `}};Ws=zo([y("svg-arrow-circle-left")],Ws);var ko=function(s,e,t,o){var i=arguments.length,r=i<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,t):o,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(s,e,t,o);else for(var l=s.length-1;l>=0;l--)(n=s[l])&&(r=(i<3?n(r):i>3?n(e,t,r):n(e,t))||r);return i>3&&r&&Object.defineProperty(e,t,r),r};let Zs=class extends m{render(){return u`
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm2.71,10.71-3,3a1,1,0,0,1-1.42,0,1,1,0,0,1,0-1.42L12.59,12l-2.3-2.29a1,1,0,0,1,1.42-1.42l3,3A1,1,0,0,1,14.71,12.71Z"
          fill="currentColor"
        ></path>
      </svg>
    `}};Zs=ko([y("svg-arrow-circle-right")],Zs);var Fo=function(s,e,t,o){var i=arguments.length,r=i<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,t):o,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(s,e,t,o);else for(var l=s.length-1;l>=0;l--)(n=s[l])&&(r=(i<3?n(r):i>3?n(e,t,r):n(e,t))||r);return i>3&&r&&Object.defineProperty(e,t,r),r};let qs=class extends m{render(){return u`
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM18.4158 9.70405C18.8055 9.31268 18.8041 8.67952 18.4127 8.28984L17.7041 7.58426C17.3127 7.19458 16.6796 7.19594 16.2899 7.58731L10.5183 13.3838L7.19723 10.1089C6.80398 9.72117 6.17083 9.7256 5.78305 10.1189L5.08092 10.8309C4.69314 11.2241 4.69758 11.8573 5.09083 12.2451L9.82912 16.9174C10.221 17.3039 10.8515 17.301 11.2399 16.911L18.4158 9.70405Z"
          fill="currentColor"
        />
      </svg>
    `}};qs=Fo([y("svg-valid-circle")],qs);var Wo=function(s,e,t,o){var i=arguments.length,r=i<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,t):o,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(s,e,t,o);else for(var l=s.length-1;l>=0;l--)(n=s[l])&&(r=(i<3?n(r):i>3?n(e,t,r):n(e,t))||r);return i>3&&r&&Object.defineProperty(e,t,r),r};let Ks=class extends m{render(){return u`
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM7.75736 7.05025C8.14788 6.65973 8.78105 6.65973 9.17157 7.05025L12 9.87868L14.8284 7.05025C15.219 6.65973 15.8521 6.65973 16.2426 7.05025L16.9497 7.75736C17.3403 8.14788 17.3403 8.78105 16.9497 9.17157L14.1213 12L16.9497 14.8284C17.3403 15.219 17.3403 15.8521 16.9497 16.2426L16.2426 16.9497C15.8521 17.3403 15.219 17.3403 14.8284 16.9497L12 14.1213L9.17157 16.9497C8.78105 17.3403 8.14788 17.3403 7.75736 16.9497L7.05025 16.2426C6.65973 15.8521 6.65973 15.219 7.05025 14.8284L9.87868 12L7.05025 9.17157C6.65973 8.78105 6.65973 8.14788 7.05025 7.75736L7.75736 7.05025Z"
          fill="currentColor"
        />
      </svg>
    `}};Ks=Wo([y("svg-invalid-circle")],Ks);var Zo=function(s,e,t,o){var i=arguments.length,r=i<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,t):o,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(s,e,t,o);else for(var l=s.length-1;l>=0;l--)(n=s[l])&&(r=(i<3?n(r):i>3?n(e,t,r):n(e,t))||r);return i>3&&r&&Object.defineProperty(e,t,r),r};let Xs=class extends m{render(){return u`
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M841.36,187.993L736.009,82.64c-6.51-6.51-16.622-7.735-24.499-2.968l-54.938,33.252
		c-26.704-14.917-55.296-26.858-85.328-35.375l-15.326-62.326C553.719,6.284,545.702,0,536.496,0h-148.99
		c-9.206,0-17.223,6.284-19.421,15.224L352.759,77.55c-30.032,8.517-58.624,20.458-85.328,35.375l-54.938-33.252
		c-7.876-4.767-17.989-3.542-24.499,2.968L82.642,187.993c-6.51,6.51-7.735,16.622-2.968,24.498l33.252,54.938
		c-14.917,26.704-26.857,55.296-35.375,85.328l-62.326,15.326c-8.94,2.199-15.224,10.216-15.224,19.422v148.99
		c0,9.206,6.284,17.223,15.224,19.421l62.326,15.326c8.517,30.032,20.458,58.624,35.375,85.328l-33.252,54.938
		c-4.767,7.876-3.542,17.988,2.968,24.498L187.993,841.36c6.51,6.509,16.622,7.734,24.499,2.968l54.938-33.252
		c26.704,14.917,55.295,26.856,85.328,35.375l15.326,62.326c2.198,8.939,10.215,15.224,19.421,15.224h148.99
		c9.206,0,17.223-6.284,19.421-15.224l15.326-62.326c30.032-8.518,58.624-20.458,85.328-35.375l54.938,33.252
		c7.876,4.767,17.989,3.542,24.499-2.968l105.353-105.353c6.51-6.51,7.734-16.622,2.968-24.498l-33.252-54.938
		c14.917-26.704,26.856-55.296,35.375-85.328l62.326-15.326C917.716,553.72,924,545.703,924,536.497v-148.99
		c0-9.206-6.284-17.223-15.224-19.421L846.45,352.76c-8.518-30.032-20.458-58.624-35.375-85.328l33.252-54.938
		C849.095,204.615,847.87,194.502,841.36,187.993z M462.001,670.481c-115.141,0-208.48-93.341-208.48-208.481
		c0-115.141,93.34-208.481,208.48-208.481S670.482,346.859,670.482,462C670.482,577.14,577.142,670.481,462.001,670.481z"
          fill="currentColor"
        />
      </svg>
    `}};Xs=Zo([y("svg-gear")],Xs);var qo=function(s,e,t,o){var i=arguments.length,r=i<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,t):o,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(s,e,t,o);else for(var l=s.length-1;l>=0;l--)(n=s[l])&&(r=(i<3?n(r):i>3?n(e,t,r):n(e,t))||r);return i>3&&r&&Object.defineProperty(e,t,r),r};let Ys=class extends m{render(){return u`
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M8 11C7.44772 11 7 11.4477 7 12C7 12.5523 7.44772 13 8 13H16C16.5523 13 17 12.5523 17 12C17 11.4477 16.5523 11 16 11H8Z"
          fill="currentColor"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
          fill="currentColor"
        />
      </svg>
    `}};Ys=qo([y("svg-delete")],Ys);var Ko=function(s,e,t,o){var i=arguments.length,r=i<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,t):o,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(s,e,t,o);else for(var l=s.length-1;l>=0;l--)(n=s[l])&&(r=(i<3?n(r):i>3?n(e,t,r):n(e,t))||r);return i>3&&r&&Object.defineProperty(e,t,r),r};let Js=class extends m{render(){return u`
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M16.0686 15H7.9313C7.32548 15 7.02257 15 6.88231 15.1198C6.76061 15.2238 6.69602 15.3797 6.70858 15.5393C6.72305 15.7232 6.93724 15.9374 7.36561 16.3657L11.4342 20.4344C11.6323 20.6324 11.7313 20.7314 11.8454 20.7685C11.9458 20.8011 12.054 20.8011 12.1544 20.7685C12.2686 20.7314 12.3676 20.6324 12.5656 20.4344L16.6342 16.3657C17.0626 15.9374 17.2768 15.7232 17.2913 15.5393C17.3038 15.3797 17.2392 15.2238 17.1175 15.1198C16.9773 15 16.6744 15 16.0686 15Z"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M7.9313 9.00005H16.0686C16.6744 9.00005 16.9773 9.00005 17.1175 8.88025C17.2393 8.7763 17.3038 8.62038 17.2913 8.46082C17.2768 8.27693 17.0626 8.06274 16.6342 7.63436L12.5656 3.56573C12.3676 3.36772 12.2686 3.26872 12.1544 3.23163C12.054 3.199 11.9458 3.199 11.8454 3.23163C11.7313 3.26872 11.6323 3.36772 11.4342 3.56573L7.36561 7.63436C6.93724 8.06273 6.72305 8.27693 6.70858 8.46082C6.69602 8.62038 6.76061 8.7763 6.88231 8.88025C7.02257 9.00005 7.32548 9.00005 7.9313 9.00005Z"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    `}};Js=Ko([y("svg-sort")],Js);var Xo=function(s,e,t,o){var i=arguments.length,r=i<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,t):o,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(s,e,t,o);else for(var l=s.length-1;l>=0;l--)(n=s[l])&&(r=(i<3?n(r):i>3?n(e,t,r):n(e,t))||r);return i>3&&r&&Object.defineProperty(e,t,r),r};let Qs=class extends m{render(){return u`
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M23.14.93l-.07-.07A2.926 2.926 0 0 0 20.98 0a2.886 2.886 0 0 0-2.08.86L8.858 10.9a3.04 3.04 0 0 0-.53.72 7.793 7.793 0 0 0-4.1 1.621c-.191.144-.36.316-.5.51a6.08 6.08 0 0 0-.98 1.961c-.25.69-.59 1.631-1.22 3-.42.91-.75 1.541-.98 1.981a3.092 3.092 0 0 0-.54 1.631c.014.206.08.406.19.58a2.64 2.64 0 0 0 2.23 1.07 10.462 10.462 0 0 0 8.161-3.371c.378-.44.692-.932.93-1.461a7.882 7.882 0 0 0 .69-3.361.142.142 0 0 1 .02-.04c.325-.144.62-.347.87-.6L23.14 5.1A2.888 2.888 0 0 0 24 3.021 2.927 2.927 0 0 0 23.14.93zM9.7 18.317c-.17.368-.388.711-.65 1.02a8.393 8.393 0 0 1-6.891 2.6c.05-.1.11-.21.17-.32.24-.46.58-1.11 1.02-2.061a39.058 39.058 0 0 0 1.28-3.151c.14-.491.355-.957.64-1.381.062-.08.133-.154.21-.22a5.221 5.221 0 0 1 2.59-1.14c.121.537.396 1.027.79 1.411l.07.07c.35.357.788.616 1.27.75a5.614 5.614 0 0 1-.499 2.422zM21.73 3.691L11.678 13.735a.947.947 0 0 1-.67.28.983.983 0 0 1-.67-.28l-.07-.07a.948.948 0 0 1 0-1.34L20.309 2.271c.18-.173.42-.27.671-.271a.937.937 0 0 1 .67.27l.08.08c.36.374.36.967 0 1.341z"
          fill="currentColor"
          fill-rule="evenodd"
        />
      </svg>
    `}};Qs=Xo([y("svg-theme")],Qs);var Yo=function(s,e,t,o){var i=arguments.length,r=i<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,t):o,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(s,e,t,o);else for(var l=s.length-1;l>=0;l--)(n=s[l])&&(r=(i<3?n(r):i>3?n(e,t,r):n(e,t))||r);return i>3&&r&&Object.defineProperty(e,t,r),r};let ei=class extends m{render(){return u`
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fill="currentColor"
          d="M20 2h-4v-.85C16 .52 15.48 0 14.85 0h-5.7C8.52 0 8 .52 8 1.15V2H4c-1.1 0-2 .9-2 2 0 .74.4 1.38 1 1.73v14.02C3 22.09 4.91 24 7.25 24h9.5c2.34 0 4.25-1.91 4.25-4.25V5.73c.6-.35 1-.99 1-1.73 0-1.1-.9-2-2-2zm-1 17.75c0 1.24-1.01 2.25-2.25 2.25h-9.5C6.01 22 5 20.99 5 19.75V6h14v13.75z"
        />
        <path
          fill="currentColor"
          d="M8 20.022c-.553 0-1-.447-1-1v-10c0-.553.447-1 1-1s1 .447 1 1v10c0 .553-.447 1-1 1zm8 0c-.553 0-1-.447-1-1v-10c0-.553.447-1 1-1s1 .447 1 1v10c0 .553-.447 1-1 1zm-4 0c-.553 0-1-.447-1-1v-10c0-.553.447-1 1-1s1 .447 1 1v10c0 .553-.447 1-1 1z"
        />
      </svg>
    `}};ei=Yo([y("svg-trash")],ei);var Jo=function(s,e,t,o){var i=arguments.length,r=i<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,t):o,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(s,e,t,o);else for(var l=s.length-1;l>=0;l--)(n=s[l])&&(r=(i<3?n(r):i>3?n(e,t,r):n(e,t))||r);return i>3&&r&&Object.defineProperty(e,t,r),r};let ti=class extends m{render(){return u`
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fill="currentColor"
          d="M13 2c.55 0 1 .45 1 1v7h7c.55 0 1 .45 1 1v2c0 .55-.45 1-1 1h-7v7c0 .55-.45 1-1 1h-2c-.55 0-1-.45-1-1v-7H3c-.55 0-1-.45-1-1v-2c0-.55.45-1 1-1h7V3c0-.55.45-1 1-1h2m0-2h-2C9.346 0 8 1.346 8 3v5H3c-1.654 0-3 1.346-3 3v2c0 1.654 1.346 3 3 3h5v5c0 1.654 1.346 3 3 3h2c1.654 0 3-1.346 3-3v-5h5c1.654 0 3-1.346 3-3v-2c0-1.654-1.346-3-3-3h-5V3c0-1.654-1.346-3-3-3z"
        />
      </svg>
    `}};ti=Jo([y("svg-add")],ti);var T;(function(s){s.PROFILE="profile",s.ARROW_CIRCLE_LEFT="arrowCircleLeft",s.ARROW_CIRCLE_RIGHT="arrowCircleRight",s.VALID_CIRCLE="validCircle",s.INVALID_CIRCLE="invalidCircle",s.GEAR="gear",s.DELETE="delete",s.SORT="sort",s.THEME="theme",s.TRASH="trash",s.ADD="add"})(T||(T={}));var w;(function(s){s.NAME="name",s.SIZE="size",s.COLOR="color"})(w||(w={}));const bt={[w.NAME]:{default:T.PROFILE,description:"The name of the icon to display",control:"text"},[w.SIZE]:{default:24,description:"The size of the icon in pixels",control:"number"},[w.COLOR]:{default:"currentColor",description:"The color of the icon",control:"text"}};var nt=function(s,e,t,o){var i=arguments.length,r=i<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,t):o,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(s,e,t,o);else for(var l=s.length-1;l>=0;l--)(n=s[l])&&(r=(i<3?n(r):i>3?n(e,t,r):n(e,t))||r);return i>3&&r&&Object.defineProperty(e,t,r),r},Wt,Zt,qt,fe;let Be=(fe=class extends m{constructor(){super(...arguments),this[Wt]=bt[w.NAME].default,this[Zt]=bt[w.COLOR].default,this[qt]=bt[w.SIZE].default}updated(e){super.updated(e),e.has(w.SIZE)&&this.style.setProperty("--size",`${this[w.SIZE]}px`)}renderIcon(){switch(this[w.NAME]){case T.PROFILE:return u`<svg-profile></svg-profile>`;case T.ARROW_CIRCLE_LEFT:return u`<svg-arrow-circle-left></svg-arrow-circle-left>`;case T.ARROW_CIRCLE_RIGHT:return u`<svg-arrow-circle-right></svg-arrow-circle-right>`;case T.VALID_CIRCLE:return u`<svg-valid-circle></svg-valid-circle>`;case T.INVALID_CIRCLE:return u`<svg-invalid-circle></svg-invalid-circle>`;case T.GEAR:return u`<svg-gear></svg-gear>`;case T.DELETE:return u`<svg-delete></svg-delete>`;case T.SORT:return u`<svg-sort></svg-sort>`;case T.THEME:return u`<svg-theme></svg-theme>`;case T.TRASH:return u`<svg-trash></svg-trash>`;case T.ADD:return u`<svg-add></svg-add>`;default:return b}}render(){return u`
      <span
        class="icon"
        style="--color: ${this[w.COLOR]}; --size: ${this[w.SIZE]}px;"
      >
        ${this.renderIcon()}
      </span>
    `}},Wt=w.NAME,Zt=w.COLOR,qt=w.SIZE,fe.styles=[H,j`
      :host {
        display: inline-block;
        vertical-align: middle;
        width: var(--size, 24px);
        height: var(--size, 24px);
      }

      .icon {
        display: inline-block;
        width: var(--size, 24px);
        height: var(--size, 24px);

        & > * {
          display: inline-block;
          width: 100%;
          height: 100%;
          color: var(--color, #000);
        }
      }
    `],fe);nt([h()],Be.prototype,Wt,void 0);nt([h()],Be.prototype,Zt,void 0);nt([h({type:Number})],Be.prototype,qt,void 0);Be=nt([y("ss-icon")],Be);var x;(function(s){s.MESSAGE_LIFE="messageLife",s.TOP="top",s.BOTTOM="bottom"})(x||(x={}));const Et={[x.MESSAGE_LIFE]:{default:5e3,control:"number",description:"The time in milliseconds that a message will be displayed"},[x.TOP]:{default:!1,control:"boolean",description:"Whether the notification provider is at the top of the screen"},[x.BOTTOM]:{default:!1,control:"boolean",description:"Whether the notification provider is at the bottom of the screen"}};var Ve;(function(s){s.INFO="info",s.SUCCESS="success",s.WARNING="warning",s.ERROR="error"})(Ve||(Ve={}));var le;(function(s){s.TOP="top",s.BOTTOM="bottom"})(le||(le={}));var E;(function(s){s.NOTIFICATION_ID="notificationId",s.MESSAGE="message",s.TYPE="type",s.START_TIME="startTime",s.MESSAGE_LIFE="messageLife"})(E||(E={}));const xe={[E.NOTIFICATION_ID]:{default:0,control:"number",description:"The id of the notification"},[E.MESSAGE]:{default:"",control:"text",description:"The message to display"},[E.TYPE]:{default:Ve.INFO,control:"text",description:"The type of message to display"},[E.START_TIME]:{default:new Date().getTime(),control:"number",description:"The time the message was created"},[E.MESSAGE_LIFE]:{default:5e3,control:"number",description:"The time in milliseconds that a message will be displayed"}},Qo="notification-clicked";class er extends CustomEvent{constructor(e){super(Qo,{bubbles:!0,composed:!0,detail:e})}}var Ce=function(s,e,t,o){var i=arguments.length,r=i<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,t):o,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(s,e,t,o);else for(var l=s.length-1;l>=0;l--)(n=s[l])&&(r=(i<3?n(r):i>3?n(e,t,r):n(e,t))||r);return i>3&&r&&Object.defineProperty(e,t,r),r},Kt,Xt,Yt,Jt,Qt,ve;let te=(ve=class extends m{constructor(){super(...arguments),this[Kt]=xe[E.NOTIFICATION_ID].default,this[Xt]=xe[E.MESSAGE].default,this[Yt]=xe[E.TYPE].default,this[Jt]=xe[E.START_TIME].default,this[Qt]=xe[E.MESSAGE_LIFE].default}get classes(){return{"notification-message":!0,[this[E.TYPE]]:!0}}render(){return u`
      <div
        @click=${()=>this.dispatchEvent(new er({id:this.notificationId}))}
        class=${Se(this.classes)}
        style=${`--message-life: ${this[E.MESSAGE_LIFE]}ms`}
      >
        <div class="time-indicator"></div>
        <div class="content">
          ${this[E.MESSAGE]}
          <slot></slot>
        </div>
      </div>
    `}},Kt=E.NOTIFICATION_ID,Xt=E.MESSAGE,Yt=E.TYPE,Jt=E.START_TIME,Qt=E.MESSAGE_LIFE,ve.styles=[H,j`
      .notification-message {
        position: relative;
        background-color: var(--color, #ddd);
        color: #333;
        text-align: center;
        padding: 0.25rem;
        animation: fade-out var(--message-life, 1000ms) linear forwards;
        margin: 0.5rem 0;
        border-radius: 0.25rem;
        box-shadow: 0 0 1rem rgba(0, 0, 0, 0.25);

        &.success {
          background-color: var(--color-success, #4caf50);
          color: #fff;
        }

        &.error {
          background-color: var(--color-error, #f44336);
          color: #fff;
        }

        &.info {
          background-color: var(--color-info, #2196f3);
          color: #fff;
        }

        .time-indicator {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          z-index: 1;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.125),
            rgba(255, 255, 255, 0.25)
          );
          animation: time-elapsed var(--message-life, 1000ms) linear forwards;
        }

        .content {
          position: relative;
          height: 100%;
          width: 100%;
          z-index: 2;
        }
      }

      @keyframes time-elapsed {
        0% {
          width: 0%;
        }
        100% {
          width: 100%;
        }
      }

      @keyframes fade-out {
        0% {
          opacity: 1;
        }
        75% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }
    `],ve);Ce([h({type:Number})],te.prototype,Kt,void 0);Ce([h()],te.prototype,Xt,void 0);Ce([h()],te.prototype,Yt,void 0);Ce([h({type:Number})],te.prototype,Jt,void 0);Ce([h({type:Number,reflect:!0})],te.prototype,Qt,void 0);te=Ce([y("notification-message")],te);var oe=function(s,e,t,o){var i=arguments.length,r=i<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,t):o,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(s,e,t,o);else for(var l=s.length-1;l>=0;l--)(n=s[l])&&(r=(i<3?n(r):i>3?n(e,t,r):n(e,t))||r);return i>3&&r&&Object.defineProperty(e,t,r),r},es,ts,ss,ge;let W=(ge=class extends m{constructor(){super(...arguments),this.notificationId=0,this.notifications=[],this[es]=Et[x.MESSAGE_LIFE].default,this[ts]=Et[x.TOP].default,this[ss]=Et[x.BOTTOM].default}get classes(){return{"notification-provider":!0,top:this.side===le.TOP,bottom:this.side===le.BOTTOM}}get side(){return this[x.TOP]?le.TOP:le.BOTTOM}addNotification(e,t){const o=this.notificationId++,i={id:o,message:e,type:t,startTime:new Date,messageLife:this[x.MESSAGE_LIFE]};return this.notifications=[...this.notifications,i],setTimeout(()=>{this.removeNotification(o)},this[x.MESSAGE_LIFE]),o}removeNotification(e){this.notifications=this.notifications.filter(t=>t.id!==e)}render(){return u`
      <div class=${Se(this.classes)}>
        ${bs(this.notifications,e=>e.id,e=>u` <notification-message
              @notification-clicked=${()=>this.removeNotification(e.id)}
              message=${e.message}
              type=${e.type}
              startTime=${e.startTime.getTime()}
              messageLife=${e.messageLife}
            ></notification-message>`)}
      </div>
    `}},es=x.MESSAGE_LIFE,ts=x.TOP,ss=x.BOTTOM,ge.styles=[H,j`
      .notification-provider {
        position: fixed;
        left: 10vw;
        width: 80vw;
        z-index: 1000;

        &.top {
          top: 0;
        }

        &.bottom {
          bottom: 0;
        }
      }
    `],ge);oe([O()],W.prototype,"notifications",void 0);oe([h({type:Number,reflect:!0})],W.prototype,es,void 0);oe([h({type:Boolean})],W.prototype,ts,void 0);oe([h({type:Boolean})],W.prototype,ss,void 0);oe([O()],W.prototype,"classes",null);oe([O()],W.prototype,"side",null);W=oe([y("notification-provider")],W);const tr=s=>typeof s!="string"&&"strTag"in s,sr=(s,e,t)=>{let o=s[0];for(let i=1;i<s.length;i++)o+=e[i-1],o+=s[i];return o};const ir=s=>tr(s)?sr(s.strings,s.values):s;let yt=ir;class or{constructor(){this.settled=!1,this.promise=new Promise((e,t)=>{this._resolve=e,this._reject=t})}resolve(e){this.settled=!0,this._resolve(e)}reject(e){this.settled=!0,this._reject(e)}}for(let s=0;s<256;s++)(s>>4&15).toString(16)+(s&15).toString(16);let rr=new or;rr.resolve();const nr="select-changed";class lr extends CustomEvent{constructor(e){super(nr,{bubbles:!0,composed:!0,detail:e})}}var I;(function(s){s.OPTIONS="options",s.SELECTED="selected",s.MULTIPLE="multiple"})(I||(I={}));const At={[I.OPTIONS]:{default:[],description:"The options to display in the select",control:"text"},[I.SELECTED]:{default:"",description:"The value of the selected option",control:"text"},[I.MULTIPLE]:{default:!1,description:"Whether multiple options can be selected",control:"boolean"}};var ze=function(s,e,t,o){var i=arguments.length,r=i<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,t):o,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(s,e,t,o);else for(var l=s.length-1;l>=0;l--)(n=s[l])&&(r=(i<3?n(r):i>3?n(e,t,r):n(e,t))||r);return i>3&&r&&Object.defineProperty(e,t,r),r},is,os,rs,me;let Ee=(me=class extends m{constructor(){super(...arguments),this[is]=At[I.OPTIONS].default,this[os]=At[I.SELECTED].default,this[rs]=At[I.MULTIPLE].default}get value(){return this.selectNode.value}handleSelectChanged(){let e=this.selectNode.value;this.multiple&&(e=[...this.selectNode.selectedOptions].reduce((t,o)=>[...t,o.value],[])),this.dispatchEvent(new lr({value:e}))}valueIsSelected(e){return this.multiple&&Array.isArray(this.selected)?this.selected.map(String).includes(String(e)):`${this.selected}`==`${e}`}render(){return u`
      <select @change=${this.handleSelectChanged} ?multiple=${this.multiple}>
        ${bs(this.options,e=>e.value,e=>u`
            <option
              value=${e.value}
              ?selected=${this.valueIsSelected(e.value)}
            >
              ${e.label}
            </option>
          `)}
      </select>
    `}},is=I.OPTIONS,os=I.SELECTED,rs=I.MULTIPLE,me.styles=[H],me);ze([h({type:Array})],Ee.prototype,is,void 0);ze([h()],Ee.prototype,os,void 0);ze([h({type:Boolean})],Ee.prototype,rs,void 0);ze([Ge("select")],Ee.prototype,"selectNode",void 0);Ee=ze([y("ss-select")],Ee);const ar="user-logged-in";var wi=(s=>(s.USER_ID="userId",s.USERNAME="username",s.AUTH_TOKEN="authToken",s))(wi||{});class cr extends CustomEvent{constructor(e){super(ar,{bubbles:!0,composed:!0,detail:e})}}const dr="user-logged-in-failed";class ur extends CustomEvent{constructor(e){super(dr,{bubbles:!0,composed:!0,detail:e})}}const Oi=us`
  :host {
    --negative-color: #600;
    --negative-background-color: #ffc4c4;
    --positive-color: #060;
    --positive-background-color: #c4ffc4;
  }

  input[type='text'],
  input[type='date'],
  input[type='datetime-local'],
  select,
  button {
    font-family: Poppins;
    padding: 0.5rem;
    box-sizing: border-box;
    width: 100%;
  }
  main {
    margin-top: 1rem;
  }

  fieldset {
    border-radius: 0.5rem;
  }

  .box {
    background-color: #fff;
    border-radius: 8px;
    border: 1px #aaa solid;
  }
`,hr=[202,204];class Ti{constructor(e){this.config=e,this.authToken=e.authToken}async httpRequest(e,t){let o;const i=new Headers(t.headers);i.append("authorization",this.authToken);const r=new URL(e,this.config.baseUrl),n=new Request(r,{...t,headers:i});try{const l=await fetch(n);return l.ok&&!hr.includes(l.status)&&(o=await l.json()),l.status===403&&this.config.errorHandler(),{status:l.status,response:o}}catch(l){console.error(`Api encountered an error performing request: ${l}`)}return null}async get(e,t){return await this.httpRequest(e,{method:"get",...t})}async post(e,t,o){return await this.httpRequest(e,{method:"post",headers:{"content-type":"application/json"},body:JSON.stringify(t),...o})}async put(e,t,o){return await this.httpRequest(e,{method:"put",headers:{"content-type":"application/json"},body:JSON.stringify(t),...o})}async delete(e,t){return await this.httpRequest(e,{method:"delete",...t})}setAuthToken(e){this.authToken=e}}const pr=new Ti({authToken:"",baseUrl:"http://localhost:9999/api/",errorHandler:()=>{console.error("Api encountered an error")}}),fr=new Ti({authToken:"",baseUrl:"https://sikosoft2.azurewebsites.net/api/",errorHandler:()=>{console.error("Api encountered an error")}}),xi="dev";var Xe=(s=>(s.ENV="env",s))(Xe||{});const vr={env:{default:xi,control:"text",description:"The environment to use for the API"}};var gr=Object.defineProperty,mr=Object.getOwnPropertyDescriptor,ke=(s,e,t,o)=>{for(var i=o>1?void 0:o?mr(e,t):e,r=s.length-1,n;r>=0;r--)(n=s[r])&&(i=(o?n(e,t,i):n(i))||i);return o&&i&&gr(e,t,i),i},ns,si;let se=class extends(si=ae,ns=Xe.ENV,si){constructor(){super(...arguments),this[ns]=vr[Xe.ENV].default,this.username="",this.password="",this.loading=!1}get api(){return this[Xe.ENV]==="prod"?fr:pr}_handleUsernameChanged(s){this.username=s.detail.value}_handleUsernameSubmitted(s){this._login()}_handlePasswordChanged(s){this.password=s.detail.value}_handlePasswordSubmitted(s){this._login()}async _login(){this.loading=!0;const s=await this.api.post("login",{username:this.username,password:this.password});s&&s.status!==401&&this.dispatchEvent(new cr({...s.response})),s&&s.status===401&&this.dispatchEvent(new ur({})),this.loading=!1}render(){return di`
      <form part="container">
        <ss-input
          id="username"
          placeholder=${yt("Username")}
          @input-submitted=${this._handleUsernameSubmitted}
          @input-changed=${this._handleUsernameChanged}
          value=${this.username}
        ></ss-input>

        <ss-input
          id="password"
          placeholder=${yt("Password")}
          type="password"
          @input-submitted=${this._handlePasswordSubmitted}
          @input-changed=${this._handlePasswordChanged}
          value=${this.password}
        ></ss-input>

        <ss-button
          @click=${this._login}
          text=${yt("Login")}
          ?loading=${this.loading}
        ></ss-button>
      </form>
    `}};se.styles=[Oi,us`
      form {
        ss-input,
        ss-button {
          display: block;
          margin: 0.5rem 0;
        }
      }
    `];ke([vs()],se.prototype,ns,2);ke([ot()],se.prototype,"username",2);ke([ot()],se.prototype,"password",2);ke([ot()],se.prototype,"loading",2);se=ke([fi("login-form")],se);var ls=(s=>(s.ENV="env",s))(ls||{});const $r={env:{default:xi,control:"text",description:"The environment to use for the API"}},_r=[{rel:"preconnect",href:"https://fonts.googleapis.com"},{rel:"preconnect",href:"https://fonts.gstatic.com",crossorigin:"anonymous"},{rel:"stylesheet",href:"https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"}];var br=Object.defineProperty,Er=Object.getOwnPropertyDescriptor,lt=(s,e,t,o)=>{for(var i=o>1?void 0:o?Er(e,t):e,r=s.length-1,n;r>=0;r--)(n=s[r])&&(i=(o?n(e,t,i):n(i))||i);return o&&i&&br(e,t,i),i},as,ii;let ye=class extends(ii=ae,as=ls.ENV,ii){constructor(){super(),this[as]=$r[ls.ENV].default,this.popUpIsOpen=!1,this._injectGoogleFonts()}showLoginForm(){this.popUpIsOpen=!0}hideLoginForm(){this.popUpIsOpen=!1}notify(s,e){this.notificationProvider&&this.notificationProvider.addNotification(s,e)}async _handleUserLoggedIn(s){Object.values(wi).forEach(e=>{sessionStorage.setItem(e,s.detail[e])}),this.hideLoginForm(),this.notify("You are now logged in",Ve.SUCCESS)}async _handleUserLoggedInFailed(s){this.notify("Failed to log in",Ve.ERROR)}_togglePopUp(){this.popUpIsOpen=!this.popUpIsOpen}_injectGoogleFonts(){_r.forEach(s=>{const e=document.createElement("link");e.rel=s.rel,e.href=s.href,s.crossorigin&&(e.crossOrigin=s.crossorigin),document.head.appendChild(e)})}render(){return di`
      <div class="user-portal">
        <pop-up
          ?open=${this.popUpIsOpen}
          @pop-up-closed=${this.hideLoginForm}
          closeButton
          closeOnEsc
          closeOnOutsideClick
        >
          <login-form
            env=${this.env}
            @user-logged-in=${this._handleUserLoggedIn}
            @user-logged-in-failed=${this._handleUserLoggedInFailed}
          ></login-form>
        </pop-up>

        ${A}
      </div>
    `}};ye.styles=[Oi,us`
      ss-icon {
        vertical-align: middle;
      }
    `];lt([vs()],ye.prototype,as,2);lt([ot()],ye.prototype,"popUpIsOpen",2);lt([Ji("notification-provider")],ye.prototype,"notificationProvider",2);ye=lt([fi("user-portal")],ye);
