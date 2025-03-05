import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import usersRoute from "./routes/users.js"; 
import uploadRoute from "./controllers/routeUpload.js"


dotenv.config();  

const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors({ origin: 'http://localhost:3000' }));

const URI = process.env.MONGODB_URI;
mongoose
  .connect(URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Database connected..."))
  .catch((error) => console.log(error.message));

  app.use("/api/images" , uploadRoute);
app.use("/user", usersRoute);  
app.get("/",(req,res)=>{
  res.send("hello")
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
