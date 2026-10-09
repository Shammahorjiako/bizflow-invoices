/* Shared Firebase helpers for index.html, pay.html and admin.html */
const BF={ADMIN:'455mysteryguy@gmail.com',FREE:3,PER:20,MIN:200,ACCT:'9069063759',
 cfg:{apiKey:"AIzaSyDmMxGL-mUk-2HbcQGZBlMG8uDo2eI0pVI",authDomain:"bizflow-6b7cc.firebaseapp.com",projectId:"bizflow-6b7cc",storageBucket:"bizflow-6b7cc.firebasestorage.app",messagingSenderId:"949155880059",appId:"1:949155880059:web:059824073d0f96b1d856de"}};
BF.init=()=>{ if(!firebase.apps.length) firebase.initializeApp(BF.cfg); BF.auth=firebase.auth(); BF.db=firebase.firestore(); };
BF.today=()=>Math.floor((Date.now()+36e5)/864e5);   /* day number in Lagos time */
BF.left=u=>({free:Math.max(0,BF.FREE-(u.dayKey===BF.today()?(u.dayCount||0):0)),paid:Math.max(0,(u.creditsGranted||0)-(u.paidUsed||0))});
BF.when=t=>t&&t.toDate?t.toDate().toLocaleString('en-NG',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'}):'just now';
BF.ensure=async u=>{const r=BF.db.collection('users').doc(u.uid);const s=await r.get();
 if(!s.exists) await r.set({email:u.email,createdAt:firebase.firestore.FieldValue.serverTimestamp(),creditsGranted:0,paidUsed:0,dayKey:0,dayCount:0,blocked:false});return r;};
