self.addEventListener("push", e=>{
    try{
        const data = e.data.json()
        self.registration.showNotification(data.title, {
            body: data.message,
            icon:"https://img.icons8.com/?size=512&id=101665&format=png"
        })

    }
    catch(error){
        console.error(error)
    }
})