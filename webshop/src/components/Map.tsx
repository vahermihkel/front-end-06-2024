import L, { LatLngExpression } from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import ChangeView from './ChangeView';
import { Shop } from '../models/Shop';
let DefaultIcon = L.icon({
	iconUrl: icon,
	shadowUrl: iconShadow,
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [2, -40],
});
L.Marker.prototype.options.icon = DefaultIcon;

interface MapInterface {
	shops: Shop[],
	mapCoordinates: {
		lngLat: LatLngExpression,
		zoom: number,
	}
}

function Map(props: MapInterface) {


	return (
		<div>

			<MapContainer className='map' center={props.mapCoordinates.lngLat} zoom={props.mapCoordinates.zoom} scrollWheelZoom={false}>
				<ChangeView center={props.mapCoordinates.lngLat} zoom={props.mapCoordinates.zoom} />
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{/* shops.map(shop => <Marker>) */}
				<Marker position={[59.4223, 24.7928]}>
					<Popup>
						Ülemiste keskus. <br /> Avatud 9-20
						{/* <a href={shop.googleUrl}></a> */}
					</Popup>
				</Marker>
				<Marker position={[59.4269, 24.7237]}>
					<Popup>
						Kristiine keskus. <br /> Avatud 10-21
					</Popup>
				</Marker>
				<Marker position={[58.3779, 26.7305]}>
					<Popup>
						Tasku keskus. <br /> Avatud 9-21
					</Popup>
				</Marker>
			</MapContainer>
		</div>)
}

export default Map; 