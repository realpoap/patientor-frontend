import { Chip, Typography } from "@mui/material";
import Diagnoses from "./Diagnoses";

type Props = {
	date: string;
	employerName: string,
	sickLeave?: {
		startDate: string;
		endDate: string;
	};
	specialist: string;
	description: string;
	diagnoses?: string[];

};

const OccupationnalEntry = ({date, sickLeave, employerName, specialist, diagnoses, description}:Props) => {
	return (
		<div>
			<Chip label="Occupational" size="small"/>
			<Typography> <b>Employer</b> : <i>{employerName}</i></Typography>
			<Typography><b>{date}</b> : <i>{description}</i></Typography>
			{diagnoses && <Diagnoses diagnosesCodes={diagnoses}/>}
			{sickLeave &&  <Typography> 
				<b>Sick Leave: </b> 
				{`${sickLeave.startDate} -  
				${sickLeave.endDate}`}
				</Typography>}
			<Typography>diagnose made by <i>{specialist}</i></Typography>
		</div>
	);
};

export default OccupationnalEntry;