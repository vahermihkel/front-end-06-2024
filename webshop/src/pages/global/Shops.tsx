import { useState } from 'react'
import Map from '../../components/Map'
import { LatLngExpression } from 'leaflet';


function Shops() {
	const [coordinates, setCoordinates] = useState<{lngLat: LatLngExpression, zoom: number}>({ lngLat: [59.4378, 24.7574], zoom: 11});
	
	// useEffect siin, võtta kõik poed

	return (
		<div>
			<h1>Shops</h1>
			<button onClick={() => setCoordinates({ lngLat: [58.8090, 25.4878], zoom: 7 })}>Kõik poed</button>
			<button onClick={() => setCoordinates({ lngLat: [59.4316, 24.7574], zoom: 11 })}>Kõik Tallinna poed</button>
			
			<button onClick={() => setCoordinates({ lngLat: [59.4231, 24.7991], zoom: 13 })}>Ülemiste</button>
			<button onClick={() => setCoordinates({ lngLat: [59.4277, 24.7193], zoom: 13 })}>Kristiine</button>
			<button onClick={() => setCoordinates({ lngLat: [58.3779, 26.7305], zoom: 13 })}>Tasku</button>
			
			<Map mapCoordinates={coordinates} shops={[]} />
		</div>
	)
}

export default Shops