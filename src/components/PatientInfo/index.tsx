import { useParams } from "react-router-dom";
import { Patient } from "../../types";
import { useEffect, useState } from "react";
import { Typography} from "@mui/material";

import patientService from "../../services/patients";
import Diagnoses from "./Entries/Diagnoses";

import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import HospitalEntry from "./Entries/HospitalEntry";
import HealthCheckEntry from "./Entries/HealthCheckEntry";
import OccupationnalEntry from "./Entries/Occupationnal";


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
				<>
				{patient.entries?.map(entry => 
					{switch (entry.type) {
						case 'OccupationalHealthcare':
							return <OccupationnalEntry
												key={entry.id}
												date={entry.date}
												description={entry.description}
												specialist={entry.specialist}
												employerName={entry.employerName}
												sickLeave={entry.sickLeave}
											/>;
						case 'HealthCheck':
							return <HealthCheckEntry
												key={entry.id}
												date={entry.date}
												description={entry.description}
												specialist={entry.specialist}
												healthCheckRating={entry.healthCheckRating}
											/>;
						case 'Hospital':
							return <HospitalEntry
												key={entry.id}
												date={entry.date}
												discharge={entry.discharge}
												description={entry.description}
												diagnoses={entry.diagnosisCodes}
												specialist={entry.specialist}
											/>;
						default:
							break;
					}
				}
				)}
				</>
				
			</Typography>

		</div>
	);
};

export default PatientInfo;