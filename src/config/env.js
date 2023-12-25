import { config } from 'dotenv';

config();

export const DBNAME = `${process.env.DBNAME}`;

export const PORT = process.env.PORT || 3000;
