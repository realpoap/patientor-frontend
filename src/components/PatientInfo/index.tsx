import { useParams } from "react-router-dom";
import { Patient } from "../../types";
import { useEffect, useState } from "react";

import patientService from "../../services/patients";

import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { Typography, List } from "@mui/material";


const PatientInfo = () => {
	const [patient, setPatient] = useState<Patient>();
	const routeID = useParams().id;

	useEffect(()=> {
		void findPatient();
		//console.log(patient);
	}, []);

	const findPatient = async () => {
		if (routeID === undefined) {
			throw new TypeError('No id provided');
		}

		const object = await patientService.getSinglePatient(routeID);
		if (object === undefined) {
			throw new TypeError('No patient found');
		}
		setPatient(object);
	};
	
	if (patient === undefined) {
		return <div> loading...</div>;
	}

	return (
		<div>
			<Typography variant="h4" component="h2" gutterBottom>{patient.name}
			{patient.gender === 'male' && <MaleIcon/>}
			{patient.gender === 'female' && <FemaleIcon/>}
			{patient.gender === 'other' && <QuestionMarkIcon/>}
			</Typography>
			<Typography variant="body2"><b>ssn:</b> {patient.ssn}</Typography>
			<Typography variant="body2"><b>occupation:</b> {patient.occupation}</Typography>
			<Typography variant="h6" component="h4">Entries :
				{patient.entries?.map(e => (
					<div>
						<Typography key={e.id} variant="body2"><b>{e.date}</b> : <i>{e.description}</i></Typography>
						<List>
							{e.diagnosisCodes?.map(d => 
								<Typography 
								key={`${e.id}-${d}`} 
								variant="body1">
									{d}
								</Typography>)}
						</List>
					</div>
					
				))}
				
			</Typography>

		</div>
	);
};

export default PatientInfo;