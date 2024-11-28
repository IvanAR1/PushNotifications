const PUBLIC_VAPID_KEY = "BK5H0iBOMJh5e40gWEGXCQSNK73roknSc1RxoZszQFLL5nyYCww8t80BwAIktt51X4h31IVMrS27J3wa8ZZ5y-E"

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}  

function hasNotificationPermission(){
    return new Promise((resolve)=>{
        if(Notification.permission === 'granted'){
            resolve(true)
        }
        else{
            resolve(false)
        }
    })
}

async function subscribe(){
    await hasNotificationPermission().then(async hasPermission=>{
        if(hasPermission){
            //Service Worker
            const reg = await navigator.serviceWorker.register("/worker.js", {
                scope:"/",
            })

            const sub = await reg.pushManager.subscribe({
                userVisibleOnly:true,
                applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY)
            })

            await fetch("/subscription", {
                method:"POST",
                body:JSON.stringify(sub),
                headers:{
                    'Content-Type':"application/json"
                }
            })
        }
    })
}

async function askPermission() { 
    const permissionResult_1 = await new Promise(function (resolve, reject) {
        const permissionResult = Notification.requestPermission(function (result) {
            resolve(result);
        });
        if (permissionResult) {
            permissionResult.then(resolve, reject);
        }
    });
    if (permissionResult_1 !== 'granted') {
        console.error('Permiso para notificaciones no concedido.');
    } else {
        subscribe();
    } 
}

askPermission()