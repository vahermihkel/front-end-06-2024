import { LatLngExpression } from 'leaflet';
import { useMap } from 'react-leaflet';

interface ChangeViewInterface {
	center: LatLngExpression,
	zoom: number
}

function ChangeView({ center, zoom }: ChangeViewInterface) { 
	const map = useMap(); 
	map.setView(center, zoom); 
	return null;
}

export default ChangeView;