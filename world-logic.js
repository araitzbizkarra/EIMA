(function(root){'use strict';
const route=[[150,790],[340,720],[510,770],[720,640],[920,670],[1120,550],[1330,600],[1530,465],[1750,515]];
const lengths=[0];for(let i=1;i<route.length;i++)lengths[i]=lengths[i-1]+Math.hypot(route[i][0]-route[i-1][0],route[i][1]-route[i-1][1]);
function at(s){s=Math.max(0,Math.min(lengths.at(-1),s));let i=1;while(i<lengths.length-1&&lengths[i]<s)i++;const t=(s-lengths[i-1])/(lengths[i]-lengths[i-1]);return {x:route[i-1][0]+t*(route[i][0]-route[i-1][0]),y:route[i-1][1]+t*(route[i][1]-route[i-1][1]),s};}
function nearest(x,y){let best={distance:Infinity};for(let i=1;i<route.length;i++){const [a,b]=[route[i-1],route[i]],dx=b[0]-a[0],dy=b[1]-a[1],t=Math.max(0,Math.min(1,((x-a[0])*dx+(y-a[1])*dy)/(dx*dx+dy*dy))),px=a[0]+t*dx,py=a[1]+t*dy,d=Math.hypot(x-px,y-py);if(d<best.distance)best={x:px,y:py,s:lengths[i-1]+t*(lengths[i]-lengths[i-1]),distance:d};}return best;}
function stage(m){for(let i=0;i<3;i++){if(!m.clues.includes(i))return i*2;if(!m.records.some(r=>r.step===i&&!r.extra))return i*2+1;}return 6;}
function emptyMission(){return {clues:[],records:[],history:[],attempts:0,hints:0,position:at(0),note:'',review:{},nextstep:'',greeted:false};}
function validate(s){if(!s||s.version!==5||!Number.isInteger(s.avatar)||s.avatar<0||s.avatar>3||!['DBH3','DBH4A','DBH4B'].includes(s.grade)||!['zumaia','anana'].includes(s.place)||!s.missions||typeof s.missions!=='object')return false;return Object.entries(s.missions).every(([k,m])=>/^(zumaia|anana)_DBH(3|4A|4B)$/.test(k)&&Array.isArray(m.clues)&&m.clues.every(n=>[0,1,2].includes(n))&&Array.isArray(m.records)&&Array.isArray(m.history)&&m.position&&Number.isFinite(m.position.x)&&Number.isFinite(m.position.y)&&Number.isFinite(m.position.s));}
const api={route,lengths,at,nearest,stage,emptyMission,validate};root.AZWorld=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window==='undefined'?globalThis:window);
