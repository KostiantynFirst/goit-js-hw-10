import{T as b,f as C}from"./assets/vendor-ffe00588.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))c(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const r of e.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&c(r)}).observe(document,{childList:!0,subtree:!0});function d(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function c(t){if(t.ep)return;t.ep=!0;const e=d(t);fetch(t.href,e)}})();const l=document.querySelector("span[data-seconds]"),f=document.querySelector("span[data-minutes]"),m=document.querySelector("span[data-hours]"),p=document.querySelector("span[data-days]");let u=0,h=null,s=null;const a=document.querySelector("button[data-start]");a.disabled=!0;let y=0;const x=b({text:"Please choose a date in the future",duration:1500,destination:"1-timer.html",close:!0,gravity:"top",position:"right",stopOnFocus:!0,style:{background:"linear-gradient(to right, #FE2E2E, #AF002A)"},onClick:function(){}}),v={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(n){if(n[0]<=new Date){x.showToast();return}else a.disabled=!1,y=n[0]}};C("input#datetime-picker",v);const w=()=>{h=setInterval(()=>{u=y.getTime()-new Date().getTime(),s=L(u),a.disabled=!0,l.textContent=s.seconds,f.textContent=s.minutes,m.textContent=s.hours,p.textContent=s.days,u<=0&&(clearInterval(h),l.textContent="00",f.textContent="00",m.textContent="00",p.textContent="00")},1e3)};a.addEventListener("click",w);function i(n){return n.padStart(2,"0")}function L(n){const e=i(Math.floor(n/864e5).toString()),r=i(Math.floor(n%864e5/36e5).toString()),g=i(Math.floor(n%864e5%36e5/6e4).toString()),S=i(Math.floor(n%864e5%36e5%6e4/1e3).toString());return{days:e,hours:r,minutes:g,seconds:S}}
//# sourceMappingURL=commonHelpers.js.map