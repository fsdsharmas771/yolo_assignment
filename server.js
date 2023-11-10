import app from "./app.js";
import { connectDB } from "./config/database.js";

connectDB(process.env.PORT);
console.log();
const serverApp = app.listen(process.env.PORT, () => {
  console.log(`Server is working on port: ${process.env.PORT}`);
});
