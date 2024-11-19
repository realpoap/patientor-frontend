import { Typography, List } from "@mui/material";
import { Diagnosis } from "../../../types";
import { useEffect, useState } from "react";

import { getDiagnoses } from "../../../services/diagnoses";

type Props = {
	diagnosesCodes: string[],
};

const Diagnoses = ({diagnosesCodes}:Props) => {
		const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();

	useEffect(()=> {

		void getAllDiagnoses();
		//console.log(diagnoses);
	}, []);

	const getAllDiagnoses = async () => {
		const object = await getDiagnoses();
		if (object === undefined) {
			throw new TypeError('No diagnoses found.');
		}
		setDiagnoses(object);
	};

	return (
		<List>
				{diagnosesCodes?.map(e => {
					const diagnosis = diagnoses?.find(d => d.code === e);
					return (
						<Typography key={`code-${e}`} 
							variant="body1"
						>
							{e} ({diagnosis?.name})
						</Typography>
					);
					
				})}
		</List>
	);
};

export default Diagnoses;