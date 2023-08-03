require("./init/database");
const { port } = require("../config/vars");
const app = require("./init/express");

// server
app.listen(port, console.log(`Server is listening on PORT ${port}...`));
