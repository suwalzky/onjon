/*! © 2026 suwalzky. Wszelkie prawa zastrzeżone. All rights reserved. */
const V='onjon-beta-60057a56';const MINE=k=>k.startsWith('onjon-beta-');
const CORE=["./","./assets/builder-BpuY1INw.css","./assets/builder-CwTT_Yed.js","./assets/bundler-BOv17hp2.js","./assets/decks-Bb1Qwx0Q.js","./assets/index--Zf94ADc.js","./assets/index-BFP7qaOX.css","./manifest.webmanifest","./icon-192.png","./icon-512.png","./favicon-32.png"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>MINE(k)&&k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
 // Private account snapshots must always come from the authoritative server, including cross-origin requests.
 if(u.pathname.startsWith('/acct/'))return;
 // The beta in beta/ has its own service worker; never cache its pages as the main game.
 if(u.pathname.startsWith(new URL('beta/',self.registration.scope).pathname))return;
 if(u.origin===location.origin&&r.mode==='navigate'){e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(V).then(c=>c.put('./index.html',cp));return res}).catch(()=>caches.match('./index.html')));return}
 e.respondWith(caches.match(r).then(hit=>hit||fetch(r).then(res=>{if(res.ok||res.type==='opaque'){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp))}return res})))});
