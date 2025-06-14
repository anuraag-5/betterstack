import express from "express";
import mainRouter from "./routes/v1/index";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", mainRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
