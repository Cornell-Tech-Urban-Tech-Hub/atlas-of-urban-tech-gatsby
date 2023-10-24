import React, { Fragment, useState, useEffect, useRef } from "react"
import * as d3 from "d3"
import * as topojson from "topojson-client"
import styled from "styled-components"

const GlobeView = props => {
  const containerRef = useRef()
  const svgRef = useRef()

  const globeDataObj = useRef({})
  const elementRefObj = useRef({})
  const pathRefObj = useRef({})

  const updateGlobeData = data =>
    (globeDataObj.current = {
      ...globeDataObj.current,
      ...data,
    })

  const updateElementRef = data =>
    (elementRefObj.current = {
      ...elementRefObj.current,
      ...data,
    })

  const updatePathRef = data =>
    (pathRefObj.current = {
      ...pathRefObj.current,
      ...data,
    })
}
