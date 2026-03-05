import { Pool } from "pg";
import envData from "../utils/dotEnv";

const connectionString = `postgresql://${envData.DATABASE.PGUSER}:${envData.DATABASE.PGPASSWORD}@${envData.DATABASE.PGHOST}:${envData.DATABASE.PGPORT}/${envData.DATABASE.PGDATABASE}`;
const pool = new Pool({
	connectionString: connectionString
})

export default pool;
