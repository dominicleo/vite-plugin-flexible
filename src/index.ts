import { Plugin } from 'vite';
import { Options, UserOptions } from './types';

const DEFAULT_OPTIONS = {
  rootValue: 37.5,
  unitPrecision: 5,
  selectorBlackList: [],
  propList: ['font', 'font-size', 'line-height', 'letter-spacing'],
  replace: true,
  mediaQuery: false,
  minPixelValue: 0,
  exclude: null,
};

function resolvedOptions(userOptions?: UserOptions): Options {
  const options = Object.assign(DEFAULT_OPTIONS, userOptions);
  return options;
}

function flexible(userOptions?: UserOptions): Plugin {
  const options: Options = resolvedOptions(userOptions);
  return {
    name: 'vite-plugin-flexible',
    enforce: 'pre',
    config() {
      return {
        css: {
          postcss: {
            plugins: [require('postcss-pxtorem')(options)],
          },
        },
      };
    },
    transformIndexHtml() {
      return [
        {
          tag: 'meta',
          injectTo: 'head',
          attrs: {
            name: 'viewport',
            content:
              'width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover',
          },
        },
        {
          tag: 'script',
          injectTo: 'head',
          children: `!function(e,t){function i(){var t=n.getBoundingClientRect().width/10;n.style.fontSize=t+"px",p.rem=e.rem=t}var a,r=e.document,n=r.documentElement,o=r.querySelector('meta[name="viewport"]'),l=r.querySelector('meta[name="flexible"]'),m=r.querySelector('meta[name="flexible-in-x5"]'),s=!0,c=0,d=0,p=t.flexible||(t.flexible={});if(o){var u=o.getAttribute("content").match(/initial-scale=([d.]+)/);u&&(d=parseFloat(u[1]),c=parseInt(1/d))}else if(l){var f=l.getAttribute("content");if(f){var v=f.match(/initial-dpr=([d.]+)/),h=f.match(/maximum-dpr=([d.]+)/);v&&(c=parseFloat(v[1]),d=parseFloat((1/c).toFixed(2))),h&&(c=parseFloat(h[1]),d=parseFloat((1/c).toFixed(2)))}}if(m&&(s="false"!==m.getAttribute("content")),!c&&!d){var x=(e.navigator.appVersion.match(/android/gi),e.chrome),g=e.navigator.appVersion.match(/iphone/gi),b=e.devicePixelRatio,w=/TBS\\/d+/.test(e.navigator.userAgent),y=!1;try{y="true"===localStorage.getItem("IN_FLEXIBLE_WHITE_LIST")}catch(e){y=!1}d=1/(c=g||x||w&&s&&y?b>=3&&(!c||c>=3)?3:b>=2&&(!c||c>=2)?2:1:1)}if(n.setAttribute("data-dpr",c),!o)if((o=r.createElement("meta")).setAttribute("name","viewport"),o.setAttribute("content","initial-scale="+d+", maximum-scale="+d+", minimum-scale="+d+", user-scalable=no, viewport-fit=cover"),n.firstElementChild)n.firstElementChild.appendChild(o);else{var E=r.createElement("div");E.appendChild(o),r.write(E.innerHTML)}e.addEventListener("resize",function(){clearTimeout(a),a=setTimeout(i,300)},!1),e.addEventListener("pageshow",function(e){e.persisted&&(clearTimeout(a),a=setTimeout(i,300))},!1),"complete"===r.readyState?r.body.style.fontSize=12*c+"px":r.addEventListener("DOMContentLoaded",function(e){r.body.style.fontSize=12*c+"px"},!1),i(),p.dpr=e.dpr=c,p.refreshRem=i,p.rem2px=function(e){var t=parseFloat(e)*this.rem;return"string"==typeof e&&e.match(/rem$/)&&(t+="px"),t},p.px2rem=function(e){var t=parseFloat(e)/this.rem;return"string"==typeof e&&e.match(/px$/)&&(t+="rem"),t}}(window,window.lib||(window.lib={}));`,
        },
      ];
    },
  };
}

export default flexible;
