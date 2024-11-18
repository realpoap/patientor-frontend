import { useParams } from "react-router-dom";
import { Diagnosis, Patient } from "../../types";
import { useEffect, useState } from "react";

import patientService from "../../services/patients";
import { getDiagnoses } from "../../services/diagnoses";

import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { Typography, List } from "@mui/material";


const PatientInfo = () => {
	const [patient, setPatient] = useState<Patient>();
	const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();
	const routeID = useParams().id;

	useEffect(()=> {
		void findPatient();
		void getAllDiagnoses();
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

	const getAllDiagnoses = async () => {
		const object = await getDiagnoses();
		if (object === undefined) {
			throw new TypeError('No diagnoses found.');
		}
		setDiagnoses(object);
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
							{e.diagnosisCodes?.map(d => {
								const diagnosis = diagnoses?.find(i => i.code === d);
								return (
								<Typography 
								key={`${e.id}-${d}`} 
								variant="body1">
									{d} ({diagnosis?.name})
								</Typography>
								);
							})
							}
						</List>
					</div>
					
				))}
				
			</Typography>

		</div>
	);
};

export default PatientInfo;