import React, { useEffect } from "react"
import L from "leaflet"
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet"
import axios from "axios"

const MyData = ({ url }) => {
  const [data, setData] = React.useState()
  const map = useMap()

  useEffect(() => {
    if (url) {
      const getData = async () => {
        const response = await axios.get(url)
        setData(response.data)
      }
      getData()
    }
  }, [])

  if (data) {
    // These next 3 lines purely for debuggins:
    const geojsonObject = L.geoJSON(data)
    map.fitBounds(geojsonObject.getBounds())
    console.log(geojsonObject)
    // end debugging

    return <GeoJSON data={data} />
  } else {
    return null
  }
}

export function MapCaseGeoJson({ url }) {
  return (
    <MapContainer
      style={{ height: "600px" }}
      doubleClickZoom={false}
      id="mapId"
      zoom={5}
      center={[67.0166015625, 26.31311263768267]}
      scrollWheelZoom={false}
    >
      <MyData url={url} />
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution={`&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`}
      />
    </MapContainer>
  )
}
