import app from "./app.js"


app.listen(process.env.PORT,() =>{
    console.log(`Server Running on POrt ${process.env.PORT}`);
});