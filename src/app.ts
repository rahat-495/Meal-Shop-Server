
import express from "express" ;
import cors from "cors" ;
import cookieParser from "cookie-parser";
import router from "./app/routes";
import notFound from "./app/modules/middlewares/notFound";
import globalErrorHandler from "./app/modules/middlewares/globalErrorHandler";

const app = express() ;

app.use(express.json()) ;
app.use(cookieParser()) ;
// app.use(cors({origin : ['http://localhost:3000' , 'https://meal-shop-client.vercel.app/'] , credentials : true})) ;
const allowedOrigins = [
    "http://localhost:3000",
    "https://meal-shop-client.vercel.app"
  ];
  
  app.use(cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
}));
// app.options("*", cors());

app.use('/api/v1' , router) ;

app.get('/' , async (req , res) => {
    res.json({message : "The meal box server are running !" , success : true}) ;
})

app.use(notFound) ;
app.use(globalErrorHandler) ;

export default app ;
