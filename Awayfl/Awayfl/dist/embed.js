!function(){"use strict";const t=document.currentScript.src,e=new URL(".",t).href,n=new URL("./assets/splash.jpg",e).href;class i extends HTMLElement{static get observedAttributes(){return["src","width","height"]}get player(){return this._player}get config(){return this._runConfig}set config(t){this._runConfig=t}get src(){return this._runConfig.src||this.getAttribute("src")}set src(t){this._runConfig.src=t}set width(t){this._runConfig.width=t}get width(){return this._runConfig.width||this.getAttribute("width")}set height(t){this._runConfig.height=t}get height(){return this._runConfig.height||this.getAttribute("height")}set runtimeBaseUrl(t){this._runConfig.runtimeBaseUrl=t}get runtimeBaseUrl(){return this._runConfig.runtimeBaseUrl}constructor(){super(),this._runConfig={},this.onError=this.onError.bind(this),this._root=this.attachShadow({mode:"closed"})}_getRuntimeUrl(){const t=this._runConfig.runtimeBaseUrl;return{loader:new URL("loader.js",t).href,runtime:new URL("runtime.js",t).href,baseUrl:t}}_dropPlayer(){this._gameFrame&&(this._gameFrame.remove(),this._player=null)}onError(t){const e=this._runConfig.onError&&self[this._runConfig.onError];"function"==typeof e&&e(t),this.dispatchEvent(new ErrorEvent("error",{error:new Error("Awayfl runtime error"),message:(null==t?void 0:t.message)||t}))}_attachRuntimeEvents(){const t=this._gameFrame.contentWindow;t.addEventListener("awayfl-player-init",(({detail:t})=>{this._player=t}),{once:!0}),t.addEventListener("awayfl-player-load",(()=>{const t=this._runConfig.onLoad&&self[this._runConfig.onLoad];"function"==typeof t&&t(),this.dispatchEvent(new CustomEvent("load")),this._gameFrame.style.display=""}),{once:!0}),t.addEventListener("awayfl-player-progress",(({detail:t})=>{const e=this._runConfig.onProgress&&self[this._runConfig.onProgress];"function"==typeof e&&e(t),this.dispatchEvent(new CustomEvent("progress",{detail:t}))}))}_buildTemplate(t){const e='<!DOCTYPE html>\n<head>\n\t<meta name="viewport"\n\t\tcontent="height=device-height, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, minimal-ui" />\n\t<title>AwayFL Embedded Player 0.1.0</title>\n\t<style>\n\t\t* {\n\t\t\tmargin: 0;\n\t\t\tpadding: 0;\n\t\t}\n\n\t\tcanvas {\n\t\t\toutline: none\n\t\t}\n\n\t\thtml, body, #container {\n\t\t\tmargin: 0;\n\t\t\toverflow: hidden;\n\t\t\twidth: 100%;\n\t\t\theight: 100%;\n\t\t}\n\n\t\t#splash__image {\n\t\t\twidth: 100%;\n\t\t\theight: 100%;\n\t\t\tposition: absolute;\n\t\t\tbackground-size: contain;\n\t\t\tbackground-position: center;\n\t\t\tbackground-repeat: no-repeat;\n\t\t\tvisibility: visible;\n\t\t\ttransition: all 0.5s;\n\t\t\tz-index: 10;\n\t\t}\n\n\t\t#progress__root {\n\t\t\tposition: absolute;\n\t\t}\n\n\t\t#progress__line {\n\t\t\twidth: 0;\n\t\t\theight: 100%;\n\t\t\ttransition: all 0.5s;\n\t\t}\n\t</style>\n\t<script src="__LOADER_URL__"><\/script>\n</head>\n\n<body>\n\t<div id="splash__image">\n\t\t<div id="progress__root">\n\t\t\t<div id="progress__line"></div>\n\t\t</div>\n\t</div>\n\t<script>\n\t\twindow.addEventListener("load", () => {\n\n\t\t\tconst config = JSON.parse(__GAME_CONFIG__);\n\n\t\t\tAWAYFL.LegacyLoader.init(config);\n\t\t\tAWAYFL.LegacyLoader.runGame((fill) => {\n\t\t\t\twindow.dispatchEvent(new CustomEvent(\'awayfl-player-progress\', {detail: fill}));\n\t\t\t}, (config, hideLoader) => {\n\t\t\t\tconst player = new AWAYFL.Player(document, config);\n\t\t\t\twindow.dispatchEvent(new CustomEvent(\'awayfl-player-init\', {detail: player}));\n\t\t\t\tplayer\n\t\t\t\t\t.loadAndPlay()\n\t\t\t\t\t.then((_, hide) => {\n\t\t\t\t\t\twindow.dispatchEvent(new CustomEvent(\'awayfl-player-load\'));\n\t\t\t\t\t\thide && hide() || window.swfParseComplete && window.swfParseComplete();;\n\t\t\t\t\t});\t\t\t\t\n\t\t\t})\n\t\t});\n\t<\/script>\n</body>',n=this._getRuntimeUrl(),i={width:t.clientWidth,height:t.clientHeight,backgroundColor:this._runConfig.backgroundColor,splash:this._runConfig.splash,progress:this._runConfig.progress,runtime:[n.runtime],binary:[{path:this._runConfig.src,resourceType:"GAME",name:"Game",meta:{}}],baseUrl:n.baseUrl,maxStageScale:+this._runConfig.maxStageScale,runtimeFlags:{defaultSmoothBitmap:!!this._runConfig.smoothBitmaps}};return e.replace(/__LOADER_URL__/,n.loader).replace(/__GAME_CONFIG__/,JSON.stringify(JSON.stringify(i)))}_constructPlayer(){const t=this._root,e=document.createElement("iframe");e.style.border="none",e.style.display=this._runConfig.hideBeforeLoad?"none":"",e.width=""+this._runConfig.width,e.height=""+this._runConfig.height,this._gameFrame=e,t.appendChild(e),e.addEventListener("load",this._attachRuntimeEvents.bind(this),{once:!0}),e.addEventListener("error",this.onError),e.srcdoc=this._buildTemplate(e)}_mapAttrs(){const t=this.querySelectorAll("param"),e=this.getAttributeNames(),n=i.BINDING_CONFIG;t.forEach((t=>{t.name in n&&(this._runConfig[t.name]=t.value)})),e.forEach((t=>{t in n&&(this._runConfig[t]=this.getAttribute(t))}))}_loadGlobalConfig(){const t=window.AWAY_EMBED_CFG,e=i.BINDING_CONFIG;for(const[n,i]of Object.entries(t))n in e&&(this._runConfig[n]=i)}_setDefaults(){const t=i.BINDING_CONFIG;for(const e in t){if(t[e].required&&void 0===this._runConfig[e])throw`Parameter ${e} is required!`;void 0===this._runConfig[e]&&(this._runConfig[e]=t[e].default)}}connectedCallback(){setTimeout((()=>{this._loaderHolder=this.querySelector("div.awayfl__loader"),this._loadGlobalConfig(),this._mapAttrs(),this._setDefaults(),this._constructPlayer();const t=document.createElement("style");t.textContent=`\n            :host {\n                display: block;\n                contain: content;\n                width: ${this._runConfig.width};\n                height: ${this._runConfig.height};\n            }\n            `,this._root.appendChild(t)}))}disconnectedCallback(){this._dropPlayer()}attributeChangedCallback(t,e,n){if(this.isConnected)return"src"===t&&this._player?(this._dropPlayer(),this._runConfig.src=n,void this._constructPlayer()):void("width"!==t&&"height"!==t||this._root.styleSheets[0].insertRule(`:host { ${t}: ${n};}`))}}i.BINDING_CONFIG={version:{required:!1,default:"latest"},runtimeBaseUrl:{required:!1,default:e},src:{required:!0},avm1:{required:!1,default:!1},width:{required:!1,default:550},height:{required:!1,default:400},onLoad:{required:!1},onProgress:{required:!1},onError:{required:!1},scaleMode:{required:!1,default:"all"},autoplay:{required:!1,default:!0},hideBeforeLoad:{required:!1,default:!1},maxStageScale:{required:!1,default:void 0},backgroundColor:{required:!1,default:"black"},splash:{required:!1,default:n},progress:{required:!1,default:{direction:"lr",back:"#130d02",line:"#f29f01",rect:[.25,.77,.5,.01]}},smoothBitmaps:{required:!1,default:!1}},customElements.define("awayfl-player",i);const r=t=>console.warn("AwayFL loader does not support "+t);document.currentScript.src;const s=window;let o;s.swfObject&&console.warn("Replace `swfObject` with AwayFl loader!"),document.addEventListener("load",(()=>{}));const a={registerObject:()=>r("registerObject"),getObjectById:()=>r("getObjectById"),switchOffAutoHideShow:()=>r("switchOffAutoHideShow"),enableUriEncoding:()=>r("enableUriEncoding"),getFlashPlayerVersion:()=>r("getFlashPlayerVersion"),createSWF:()=>r("createSWF"),showExpressInstall:()=>r("showExpressInstall"),createCSS:()=>r("createCSS"),getQueryParamValue:()=>r("getQueryParamValue"),get ua(){return r("ua")},embedSWF:function(t,e,n,r,a,l,d,h,u,c){const g="string"==typeof e?document.getElementById(e):e,f=function(t,e,n,r){s.AWAY_EMBED_CFG||(console.info("AwayFL configuration not found. To set custom options, define a `AWAY_EMBED_CFG` object as explained in the Readme"),s.AWAY_EMBED_CFG={}),o=s.AWAY_EMBED_CFG;const a=new i;a.src=t,a.width=n,a.height=r;let l=o.runtimeBaseUrl;l&&(a.runtimeBaseUrl=l);const d=e.id,h=e.className,u=e.parentElement;return e.id=null,e.className="",a.id=d,a.className=h,u.replaceChild(a,e),a}(t,g,n,r);f.onload=()=>{c&&c({success:!0,ref:f,id:g.id})}}};s.swfObject=a}();
//# sourceMappingURL=embed.js.map