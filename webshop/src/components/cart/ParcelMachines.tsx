import React, { useEffect, useRef, useState } from 'react'
import { ParcelMachine } from '../../models/ParcelMachine';

function ParcelMachines() {
  const [pms, setPMs] = useState<ParcelMachine[]>([]);
	const [pmsOriginal, setPMsOriginal] = useState<ParcelMachine[]>([]);
	const searchRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		fetch("https://www.omniva.ee/locations.json")
      .then(res => res.json())
      .then(json => {
				setPMs(json);
				setPMsOriginal(json);
			});
	}, []);

  const searchFromPMs = () => {
		const searchInput = searchRef.current;
		if (searchInput === null) {
			return;
		}
		const result = pmsOriginal.filter(pm => 
			pm.NAME.toLowerCase().includes(searchInput.value.toLowerCase())
		);
		setPMs(result);
	}

  return (
    <div>
      <input onChange={searchFromPMs} ref={searchRef} type="text" />
					<select>
						{pms
							.filter(pm => pm.A0_NAME === "EE")
							.map(pm => <option key={pm.NAME}>{pm.NAME}</option>)}
					</select>
    </div>
  )
}

export default ParcelMachines