import express from "express";
import mainRouter from "./routes/v1/index";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:3000", // allow frontend
  credentials: true,              // if you're using cookies
}));
app.use(express.json());

const PORT = process.env.PORT || 3001;
app.use("/api", mainRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
