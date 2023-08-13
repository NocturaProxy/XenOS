import { XenWM } from './wm';

const xen = new XenWM();

/* import System from "./system";

// Load XEN System With Components
window.xen = new System( stuff ); */
const var2: string = 'foo';
const var1: string = 'bar';
console.log(var2 + var1);


const OsPre = document.getElementById('os-pre');
OsPre?.parentNode?.removeChild(OsPre);

xen.CreateWindow('Shit');