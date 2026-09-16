const cfg=window.FIREBASE_CONFIG;
const main=document.querySelector('#main');
const message=t=>{document.querySelector('#cloud-message').textContent=t;};
main.innerHTML='<section class="day-hero"><h1>九州親子旅行</h1><p>使用同一個 Google 帳號，即可在不同裝置開啟行程。</p><button id="cloud-login">使用 Google 登入</button><p id="cloud-message" role="status"></p></section>';
const statusBar=document.createElement('div');statusBar.className='cloud-bar';document.querySelector('.masthead').after(statusBar);
async function start(){
 if(!cfg?.apiKey||!cfg?.projectId||!cfg?.appId){message('尚未連接 Firebase。請先完成 firebase-config.js 的專案設定。');document.querySelector('#cloud-login').disabled=true;return;}
 const version='12.19.0';
 const [A,U,F]=await Promise.all(['app','auth','firestore'].map(n=>import(`https://www.gstatic.com/firebasejs/${version}/firebase-${n}.js`)));
 const app=A.initializeApp(cfg),auth=U.getAuth(app),db=F.getFirestore(app);
 await U.setPersistence(auth,U.browserLocalPersistence);
 document.querySelector('#cloud-login').onclick=async()=>{try{await U.signInWithPopup(auth,new U.GoogleAuthProvider());}catch(e){message('登入未完成：'+e.code+'。請允許登入視窗後重試。');}};
 let loaded=false,unsubscribe=null;
 U.onAuthStateChanged(auth,async user=>{
  if(!user){if(loaded)location.reload();return;}
  if(loaded)return;loaded=true;
  const label=document.createElement('span');label.textContent=user.email+' · 雲端模式';const logout=document.createElement('button');logout.textContent='登出';logout.onclick=async()=>{unsubscribe?.();await U.signOut(auth);location.reload();};statusBar.replaceChildren(label,logout);
  const tripRef=F.doc(db,'users',user.uid,'trips','kyushu2026');
  try{
   if(window.CLOUD_IMPORT){
    main.innerHTML='<section class="day-hero"><h2>將本機旅行資料存入雲端</h2><p>只供此 Google 帳號存取。再次上傳會取代雲端行程，保留雲端勾選狀態。</p><button id="upload-trip">上傳目前行程與本機勾選</button><p id="cloud-message" role="status"></p></section>';
    document.querySelector('#upload-trip').onclick=async()=>{const button=document.querySelector('#upload-trip');button.disabled=true;try{await F.setDoc(tripRef,{content:JSON.stringify(window.TRIP),updatedAt:F.serverTimestamp()});const local=JSON.parse(localStorage.getItem('kyushu-2026')||'{}');const existing=await F.getDocs(F.collection(tripRef,'state'));const ids=new Set(existing.docs.map(x=>x.id));const batch=F.writeBatch(db);Object.entries(local).filter(([k,v])=>!ids.has(k)&&/^[\w-]{1,100}$/.test(k)&&(typeof v==='boolean'||(typeof v==='string'&&/^\d{2}:\d{2}$/.test(v)))).slice(0,450).forEach(([key,value])=>batch.set(F.doc(tripRef,'state',key),{value}));await batch.commit();message('上傳完成。可在 GitHub Pages 網址登入同一帳號使用。');}catch(e){message('上傳失敗：'+e.code+'。確認 Firestore 已啟用並發布規則後重試。');}finally{button.disabled=false;}};return;
   }
   const snapshot=await F.getDoc(tripRef);
   if(!snapshot.exists()){message('此帳號尚無行程。請先從原本電腦開啟 import-cloud.html 上傳，再重新整理。');return;}
   window.TRIP=JSON.parse(snapshot.data().content);
   if(!Array.isArray(TRIP.days)||TRIP.days.length!==6)throw Error('invalid-trip');
   const initial=await F.getDocs(F.collection(tripRef,'state'));window.CLOUD_INITIAL_STATE=Object.fromEntries(initial.docs.map(d=>[d.id,d.data().value]));
   window.CLOUD_MODE=true;
   window.cloudSave=async(key,value)=>{const el=document.querySelector('#status');el.textContent='正在同步…';try{await F.setDoc(F.doc(tripRef,'state',key),{value});el.textContent='已同步至雲端';}catch(e){el.textContent='同步失敗，請重新連線後再次勾選；錯誤：'+e.code;}};
   for(const src of ['photos.js','features.js','app.js'])await new Promise((resolve,reject)=>{const script=document.createElement('script');script.src=src;script.onload=resolve;script.onerror=reject;document.body.append(script);});
   unsubscribe=F.onSnapshot(F.collection(tripRef,'state'),snap=>{if(!snap.metadata.hasPendingWrites)window.applyCloudState(Object.fromEntries(snap.docs.map(d=>[d.id,d.data().value])));},e=>{document.querySelector('#status').textContent='雲端連線中斷：'+e.code+'。請重新整理重試。';});
  }catch(e){main.textContent='無法載入雲端行程。請檢查網路或 Firebase 權限，然後重新整理。錯誤：'+(e.code||e.message);}
 });
}
start().catch(e=>message('雲端服務載入失敗，請確認網路後重新整理。'+(e.code||'')));

