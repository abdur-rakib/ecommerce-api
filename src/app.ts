import { vars } from "../config/vars";
import { app, initDB } from "./init";

// init database
initDB();

const { port } = vars;

// server
app.listen(port, () => console.log(`Server is listening on PORT ${port}...`));
