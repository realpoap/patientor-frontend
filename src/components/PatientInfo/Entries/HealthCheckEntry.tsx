import { Chip, Typography } from "@mui/material";
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';

type Props = {
	date: string;
	specialist: string;
	description: string;
	healthCheckRating: number
};

const HealthCheckEntry = ({date, specialist, description, healthCheckRating}:Props) => {
	return (
		<div>
			<Chip label="Health Check" size="small"/>
		<Typography variant="body2"> <b>{date}</b> : <i>{description}</i> </Typography>
			{Array.from({length: healthCheckRating},(_,index) => 
				<HeartBrokenIcon fontSize="small" key={index} />
			)}
			<Typography variant="body2">diagnose made by <i>{specialist}</i></Typography>
		</div>
	);
};

export default HealthCheckEntry;