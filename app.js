import 'dotenv/config'
import express from 'express';
import routes from './routes/router.js';
import cors from 'cors'
const app = express()
const port = 9001

app.use(express.json());
app.use(cors())
// app.use(express.urlencoded());

app.use('/', routes);

app.use((req,res,next)=>{
  res.status(500).json({code:490, message:"endpoint tidak ada"})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})