const express = require('express');
const { serverConfig } = require('./config');
const apiRoutes = require("./routes");
const { City, Airport } = require('./models')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api", apiRoutes);

app.listen(serverConfig.PORT, () => {
    console.log(`Successfully started the server at port ${serverConfig.PORT}`);
})