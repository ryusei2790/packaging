"use client";
import styles from './NavMap.module.css';
// import worksData from '../../../works.json';
import { AdvancedMarker, APIProvider, Map } from '@vis.gl/react-google-maps';

type NavMapProps = {
  flat: number; // 出発地の緯度
  flng: number; // 出発地の経度
  llat: number; // 到着地の緯度
  llng: number; // 到着地の経度
};


export default function NavMap({ flat, flng, llat, llng }: NavMapProps) {
  return (
    <div className={styles.container}>
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
        <Map defaultZoom={15} defaultCenter={{ lat: 35.656, lng: 139.737 }}>
          <AdvancedMarker position={{ lat: flat, lng: flng }} /> {/* 出発 */}
          <AdvancedMarker position={{ lat: llat, lng: llng }} /> {/* 到着 */}
        </Map>
      </APIProvider>
    </div>
  );
}
