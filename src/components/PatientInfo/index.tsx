import { useParams } from "react-router-dom";
import { Patient } from "../../types";
import { useEffect, useState } from "react";

import patientService from "../../services/patients";

import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';


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
			<h2>Patient: {patient.name}
			{patient.gender === 'male' && <MaleIcon/>}
			{patient.gender === 'female' && <FemaleIcon/>}
			{patient.gender === 'other' && <QuestionMarkIcon/>}
			</h2>
			<p>ssn: {patient.ssn}</p>
			<p>occupation: {patient.occupation}</p>

		</div>
	);
};

export default PatientInfo;