const express= require("express");
const app=express();
const cors=require("cors");
const pool=require("./config/db");
const todoRoutes=require("./routes/todoRoutes");
const authRoutes = require("./routes/authRoutes");

//middleware
app.use(cors({ origin: "https://todo-pern-omega.vercel.app/" }));
app.use(express.json());


// Routes
app.use("/todos",todoRoutes);


app.use("/api/auth", authRoutes);
  app.listen(5000, () => {
    console.log("server has started on port 5000");
  });
