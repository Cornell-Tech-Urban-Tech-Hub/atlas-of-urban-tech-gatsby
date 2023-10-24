import React, { useState, useEffect } from "react"
//import { json } from "d3"
import { feature, mesh } from "topojson-client"
const jsonUrl = "/data/countries-110m.topojson.json"

export const useGeoData = () => {
  const [geoData, setGeoData] = useState(null)

  useEffect(() => {
    // json(jsonUrl).then(topojsonData => {
    //   console.log(topojsonData)
    //   const { countries, land } = topojsonData.objects
    //   setGeoData({
    //     land: feature(topojsonData, land),
    //     interiors: mesh(topojsonData, countries, (a, b) => a !== b),
    //   })
    // })
    fetch(jsonUrl).then(response => {
      if (response.status !== 200) {
        console.log(`There was a problem: ${response.status}`)
        return
      }
      response.json().then(topo => {
        setGeoData({
          countries: feature(topo, topo.objects.countries).features,
          borders: mesh(topo, topo.objects.countries, (a, b) => a !== b),
        })
      })
    })
  }, [])
  //console.log(geoData)
  return geoData
}
