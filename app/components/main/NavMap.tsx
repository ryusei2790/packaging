"use client";
import styles from './NavMap.module.css';
// import worksData from '../../../works.json';
import { AdvancedMarker, APIProvider, Map } from '@vis.gl/react-google-maps';

type NavMapProps = {
  work: Work | null;
};

export default function NavMap({ work }: NavMapProps) {
  const hasCoords = !!work;
    
  const defaultCenter = hasCoords
    ? {
        lat: (work!.departure.coordinates.latitude + work!.arrival.coordinates.latitude) / 2,
        lng: (work!.departure.coordinates.longitude + work!.arrival.coordinates.longitude) / 2,
      }
    : { lat: 35.656, lng: 139.737 };

    const flat = work?.departure.coordinates.latitude;
    const flng = work?.departure.coordinates.longitude;
    const llat = work?.arrival.coordinates.latitude;
    const llng = work?.arrival.coordinates.longitude;
    
  return (
    <div className={styles.container}>
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
        <Map defaultZoom={6} defaultCenter={defaultCenter} style={{ width: '400px', height: '400px' }} mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID}>
          {hasCoords && flat !== undefined && flng !== undefined && (<AdvancedMarker position={{ lat: flat, lng: flng }} />)}
          {hasCoords && llat !==undefined && flng !== undefined && (<AdvancedMarker position={{ lat: llat, lng: llng }} />)}
        </Map>
      </APIProvider>
    </div>
  );
}
