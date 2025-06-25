"use client";
import styles from './NavMap.module.css';
// import worksData from '../../../works.json';
import { APIProvider, Map } from '@vis.gl/react-google-maps';

export default function NavMap() {
  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''} >
      <Map defaultZoom={15} defaultCenter={{ lat:35.656, lng:139.737 }} />
    </APIProvider>
  );
}