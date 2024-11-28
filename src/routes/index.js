const { Router } = require("express")
const webPush = require("#webpush")
const route = Router()
let pushSub;

route.post("/subscription", async (req, res)=>{
    if(req.body != null){
        pushSub = req.body;
        res.status(200).json();

        const payload = {
            title:"My Custom Notification...",
            message:"Hello World!"
        }
        try{
            await webPush.sendNotification(pushSub, JSON.stringify(payload))
        }
        catch(error){
            console.log(error)
        }
    }
})



module.exports = route