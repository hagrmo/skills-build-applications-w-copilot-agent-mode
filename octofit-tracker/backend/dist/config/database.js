"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = connectDatabase;
exports.disconnectDatabase = disconnectDatabase;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoUri = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/octofit_db';
async function connectDatabase() {
    await mongoose_1.default.connect(mongoUri);
    console.log(`Connected to MongoDB: ${mongoUri}`);
}
async function disconnectDatabase() {
    await mongoose_1.default.disconnect();
}
exports.default = connectDatabase;
//# sourceMappingURL=database.js.map