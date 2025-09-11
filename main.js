
const modal = document.getElementById('modal'); 
const open = document.getElementById('openModal'); 
const close = document.getElementById('closeModal'); 
let last = null;

function show(){ last=document.activeElement; 
modal.hidden=false; modal.querySelector('input,select,textarea,button')?.focus(); } 
function hide(){ modal.hidden=true; last?.focus(); }

open.addEventListener('click', show); 
close.addEventListener('click', hide); 
modal.addEventListener('click', (e)=>{ if (e.target.dataset.close !== undefined) hide(); });