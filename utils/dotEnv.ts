import dotenv from "dotenv";
dotenv.config();


const envData = {
	PORT: process.env.PORT,
	DATABASE: {
		PGUSER: process.env.PGUSER,
		PGHOST: process.env.PGHOST,
		PGDATABASE: process.env.PGDATABASE,
		PGPORT: process.env.PGPORT,
		PGPASSWORD: process.env.PGPASSWORD,
	}
}


export default envData;



