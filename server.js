import express from "express"

const app = express()

app.use(express.json())

app.get("/", (req, res) => {
    res.send("<h1>Welcome to MERN STack Project</h1>");
  });
  
  //PORT
  const PORT = process.env.PORT || 8080;
  
  app.listen(PORT, () => {
    console.log(`Server runnning on ${PORT}`);
  });
  