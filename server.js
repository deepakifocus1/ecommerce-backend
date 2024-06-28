import app from "./app/app.js";
import http from "http";

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
