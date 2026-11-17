/*! © 2026 suwalzky. Wszelkie prawa zastrzeżone. All rights reserved. */
const V='onjon-beta-25ddc379';const MINE=k=>k.startsWith('onjon-beta-');
const CORE=["./","./assets/builder-K443DVab.css","./assets/builder-R2DgsHOZ.js","./assets/bundler-BOv17hp2.js","./assets/decks-C_-weVoi.js","./assets/index-BcfR4Acr.css","./assets/index-CkQqJEOk.js","./assets/ui-9JRV3cCJ.js","./assets/ui-C8BW4cDI.css","./manifest.webmanifest","./icon-192.png","./icon-512.png","./favicon-32.png"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>MINE(k)&&k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
 // Private account snapshots must always come from the authoritative server, including cross-origin requests.
 if(u.pathname.startsWith('/acct/'))return;
 // Server answers (cebuliony, online count…) are live data: only files from other sites (fonts) are kept, never fetch() calls.
 if(u.origin!==location.origin&&!['font','style','image','script'].includes(r.destination))return;
 // The beta in beta/ has its own service worker; never cache its pages as the main game.
 if(u.pathname.startsWith(new URL('beta/',self.registration.scope).pathname))return;
 if(u.origin===location.origin&&r.mode==='navigate'){e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(V).then(c=>c.put('./index.html',cp));return res}).catch(()=>caches.match('./index.html')));return}
 e.respondWith(caches.match(r).then(hit=>hit||fetch(r).then(res=>{if(res.ok||res.type==='opaque'){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp))}return res})))});
