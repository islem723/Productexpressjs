import mongoose from 'mongoose';
import { DBNAME } from './env.js';

export default function initDbConnection(connectedCallBack) {
	const MONGO_URL = `mongodb://localhost:27017/${DBNAME}`;

	mongoose.set('debug', true);
	mongoose.set('strictQuery', false);
	mongoose.Promise = global.Promise;

	mongoose
		.connect(MONGO_URL)
		.then((c) => {
			console.log(`Connected to ${c.connection.db.databaseName}`);
			connectedCallBack();
		})
		.catch((err) => console.error(err));
}
