const express = require('express');
const app = express()

app.get("/", (req,res)=>{
    res.send("hello chat!")
})

app.listen(process.env.PORT || 3000, function() {
    console.log("Server is listening on port 3000. Ready to accept requests!");
  });
  
const chatMessage = [
    {
        id: 1,
        from: "Neill",
        text: "hi CYF 1!"
    },
    {
        id: 2,
        from: "Ali",
        text: "hi CYF 3!"
    },
    {
        id: 3,
        from: "Mnur",
        text: "hi CYF 2!"
    }
]