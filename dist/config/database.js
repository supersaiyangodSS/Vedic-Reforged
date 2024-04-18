var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { config } from 'dotenv';
config();
import { connect } from 'mongoose';
import chalk from 'chalk';
const log = console.log;
const mongoURI = process.env.DB || 'mongodb://127.0.0.1/27017/';
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connect(mongoURI);
        log(chalk.bgCyan('Connected to mongoose!'));
    }
    catch (error) {
        log(chalk.bgRed('Mongoose connection failed!', error));
    }
});
export default connectDB;
//# sourceMappingURL=database.js.map