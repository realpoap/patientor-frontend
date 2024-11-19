import { Chip, Typography } from "@mui/material";
import Diagnoses from "./Diagnoses";

type Props = {
	date: string;
	discharge?: {
		date: string;
		criteria: string;
	};
	specialist: string;
	description: string;
	diagnoses?: string[];

};

const HospitalEntry = ({date, discharge, specialist, diagnoses, description}:Props) => {
	return (
		<div>
			<Chip label="Hospital" size="small"/>
			<Typography variant="body2"> <b>{date}</b> : <i>{description}</i></Typography>
			{diagnoses && <Diagnoses diagnosesCodes={diagnoses}/>}
			{discharge &&  <Typography> 
				<b>Discharge: </b> 
				{`${discharge.date} -  
				${discharge.criteria}`}
				</Typography>}
			<Typography variant="body2">diagnose made by <i>{specialist}</i></Typography>
		</div>
	);
};

export default HospitalEntry;