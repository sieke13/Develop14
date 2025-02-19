"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const forceDatabaseRefresh = false;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
//import cors from 'cors';
const path_1 = __importDefault(require("path"));
const index_js_1 = __importDefault(require("./routes/index.js"));
const index_js_2 = require("./models/index.js");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
// Enable CORS for all routes
//app.use(cors());
// Serves static files from the client's dist folder
app.use(express_1.default.static('../client/dist'));
app.use(express_1.default.json());
app.use(index_js_1.default);
// Serve the index.html file for any unknown routes
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../client/dist/index.html'));
});
index_js_2.sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
});
