(function(root){'use strict';
function number(v){const s=String(v).trim().replace(',','.');return /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(s)&&Number.isFinite(Number(s))?Number(s):null;}
function assess(q,value,reason){const n=number(value);if(n===null||reason==null)return {valid:false,ok:false,message:'Sartu zenbakia eta aukeratu arrazoia. Koma edo puntua erabil dezakezu.'};const calc=Math.abs(n-q.answer)<=q.tolerance,why=Number(reason)===q.correct;let message=calc?(why?q.success:'Kalkulua bat dator datuekin. Justifikazioa berrikusi: '+q.reasonHint):(q.errors?.find(e=>Math.abs(n-e.value)<=.02)?.text||q.generic);return {valid:true,ok:calc&&why,calc,why,message};}
function path(records){const last=records.slice(-2);return last.length===2&&last.every(r=>r.correct&&r.hints===0&&r.attempts===1)?'sakontzea':'finkatzea';}
function empty(){return {version:2,avatar:0,grade:'DBH3',started:false,missions:{},font:false};}
function validState(s){return !!s&&s.version===2&&Number.isInteger(s.avatar)&&s.avatar>=0&&s.avatar<4&&['DBH3','DBH4A','DBH4B'].includes(s.grade)&&s.missions&&typeof s.missions==='object'&&!Array.isArray(s.missions);}
const api={number,assess,path,empty,validState};root.AZLogic=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window==='undefined'?globalThis:window);
