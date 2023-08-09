import React, { useEffect, useState, useRef } from "react"
import { Link } from "gatsby"
import * as d3 from "d3"
import * as topojson from "topojson-client"
//import tooltip } from "./tooltip.module.css"
import styled from "styled-components"
import theme from "../styles/Theme"
// import D3Component from "./D3Component"
import { useStaticQuery, graphql } from "gatsby"

// import datacsv from "./data.csv"

// let topo = await fetch('data/countries-110m.topojson.json').then((d) => d.json());
// countries = topojson.feature(topo, topo.objects.countries).features;
// borders = topojson.mesh(topo, topo.objects.countries, (a, b) => a !== b);

// let defaultCentroid = { lon: 30, lat: -50 };

// $: {
//   if ($activeCase === null) {
//     lonRotation.set(defaultCentroid.lon);
//     latRotation.set(defaultCentroid.lat);
//   } else {
//     lonRotation.set(-$activeCaseData.lon);
//     latRotation.set(-$activeCaseData.lat);
//   }
// }

const vizTitle = ``
const vizDesc = `` // Accessibility
const vizSource = ``

const ChartWrapper = styled.div`
  margin: 0;
  position: relative;
  svg {
    width: 100%;
  }
`

const SetButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
`

const TooltipBox = styled.div`
  position: absolute;
  text-align: center;
  min-width: 30px;
  border-radius: 4px;
  height: auto;
  background: rgba(250, 250, 250, 0.9);
  border: 1px solid #ddd;
  font-size: 0.8rem;
  padding: 4px 8px;
  text-align: left;
  opacity: 0;
  font-family: ${props => props.theme.type.sans};
  span {
    text-transform: capitalize;
  }
`

const SelectionBox = styled.div`
  display: none;
  position: absolute;
  top: 10px;
  left: 10px;
  max-width: 200px;
  padding: 10px;
  /* background-color: rgba(240, 240, 240, 0.8); */
  box-shadow: rgb(0 0 0 / 10%) 0px 5px 15px;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 400;
  border-radius: 6px;
  font-family: ${props => props.theme.type.sans};

  .type {
    text-transform: uppercase;
    font-size: 0.8rem;
  }
  .name {
    font-family: ${props => props.theme.type.sans};
    font-weight: 700;
    line-height: 1.2;
  }
  .summary {
    line-height: 1.2;
    font-size: 0.8rem;
    margin-bottom: 0.5rem;
  }

  .close {
    margin-right: 0.5rem;
    border-radius: 0.5rem;
    border: 1px solid ${({ theme }) => theme.colors.coolgrey};
    cursor: pointer;
    background: none;
    transition: all 0.5s ease;
    :hover {
      background: ${({ theme }) => theme.colors.coolgrey};
      color: #fff;
    }
  }

  .node-link {
    text-decoration: none;
    transition: all 0.5s ease;
    :hover {
      text-decoration: underline;
    }
  }
`

const sensitivity = 75
const colors = {
  water: "#bfd7e4",
  land: "#eaeaea",
  borders: "#aaaaaa",
  graticules: "#ffffff",
}

export function GlobeVizA2({
  vizId = "globe",
  height = 500,
  geoData,
  locations,
  nodeHoverTooltip,
}) {
  // console.log(data)
  // let dataset = []

  let width = 700
  //let height = 700

  const divRef = useRef(null)
  // const selectionRef = useRef(null)

  const [selectedPoint, setSelectedPoint] = React.useState({})

  const [countries, setCountries] = useState([])
  const [borders, setBorders] = useState([])

  const [targetPoint, setTargetPoint] = useState([])

  function setPosition() {
    console.log("SET POSITION")
    let longitude = (Math.random() * 360 - 180).toFixed(8)
    let latitude = (Math.random() * 180 - 90).toFixed(8)
    setTargetPoint([longitude, latitude])
  }

  function drawGlobe() {
    // console.log(dataset)
    console.log("DRAW GLOBE")
    console.log(locations)

    // let selectionSVG = d3.select(divRef.current).select("svg") // Unused

    // console.log(divWidth) // NOT WORKING
    width = divRef.current.getBoundingClientRect().width
    let margin = { top: 10, right: 10, bottom: 10, left: 10 }

    // height = width - margin.left - margin.right + margin.top + margin.bottom

    let innerHeight = height - margin.top - margin.bottom
    let innerWidth = width - margin.left - margin.right

    let projection = d3
      .geoOrthographic()
      .scale(250)
      .center([0, 0])
      .rotate([0, -30])
      .translate([width / 2, height / 2])

    const sphere = { type: "Sphere" }

    const initialScale = projection.scale()
    let path = d3.geoPath().projection(projection)
    let graticule = d3.geoGraticule()

    // filtering previous teams that havent scored more than 2 points in a season.
    // let selectSeries = standings.series.filter(d => d.maxpoints > 2)

    // Define SVG
    const svg = d3
      .create("svg")
      .attr("viewBox", [0, 0, width, height])
      .attr("id", vizId)
      .attr("aria-label", vizDesc)

    // Main chart group/area inset by top/left margin
    const group = svg
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    group
      .append("path")
      .datum(sphere)
      .attr("d", path)
      .attr("fill", colors.water)
      .attr("stroke", "#none")
      .attr("stroke-width", "0")

    group
      .append("path")
      .datum(graticule())
      .attr("class", "graticule")
      .attr("d", path)
      .attr("fill", "none")
      .attr("stroke", colors.graticules)
      .attr("stroke-width", "0.5px")

    let country = group
      .selectAll("country")
      .data(geoData.countries)
      .enter()
      .append("path")
      .attr("class", "country")
      .attr("d", path)
      .style("fill", d => {
        return colors.land
      })

    group
      .append("path")
      .datum(geoData.borders)
      .attr("d", path)
      .attr("class", "borders")
      .style("fill", "none")
      .style("stroke", colors.borders)
      .style("stroke-width", "0.3px")

    // let point = svg
    //   .selectAll("point")
    //   .data(locations.valid, d => d["id"])
    //   .join("g")
    //   .attr("class", "point")
    //   .attr("transform", function (d) {
    //     //let point = projection([d.lon, d.lat])
    //     console.log(d.frontmatter.centroid)
    //     let point = projection(d.frontmatter.centroid)
    //     console.log(point)
    //     return `translate(${point[0]},${point[1]})`
    //   })
    //   .append("circle")
    //   .attr("cx", 0)
    //   .attr("cy", 0)
    //   .attr("r", 5)
    //   .attr("fill", "#333")

    const coord = d => {
      console.log("COORD")
      let str = path(d)
      if (str) {
        let [sub, x, y] = str.match(/^M([-0-9.]+),([-0-9.]+)/)
        return [+x, +y]
      }
      return [10, 10]
    }

    const coordVisible = d => {
      let str = path(d)
      if (str) {
        return true
      }
      return false
    }

    let point = group
      .selectAll("point")
      .data(locations.collection, d => d.properties.id)
      .join("g")
      .attr("class", d => `point point-${d.properties.id}`)
      // .attr("transform", function (d) {
      //   //let point = projection([d.lon, d.lat])
      //   console.log(d.frontmatter.centroid)
      //   let point = projection(d.frontmatter.centroid)
      //   console.log(point)
      //   return `translate(${point[0]},${point[1]})`
      // })
      .attr("visibility", d => {
        let visible = coordVisible(d)
        return visible ? "visible" : "hidden"
      })
      .attr("transform", d => `translate(${coord(d)})`)

    point
      .append("circle")
      .style("pointer-events", "all")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", 5)
      .attr("fill", "#333")
      .on("mouseover", pointMouseOver)
      .on("mouseout", pointMouseOut)
      .on("click", pointClick)

    const addTooltip = (event, d) => {
      //div.transition().duration(200).style("opacity", 0.9)
      d3.select("#graph-tooltip").style("opacity", 0.9)
      d3.select("#graph-tooltip")
        //.html(hoverTooltip(d))
        .html(`<div><strong>${d.properties.frontmatter.title}</strong></div>`)
        .style("pointer-events", "none")
        .style("max-width", "250px")
        .style("z-index", 300)
        .style("left", `${event.offsetX + 20}px`)
        .style("top", `${event.offsetY + 20}px`)
    }

    const removeTooltip = () => {
      //div.transition().duration(200).style("opacity", 0)
      d3.select("#graph-tooltip").style("opacity", 0)
    }

    function pointMouseOver(event, d) {
      let fadeOpacity = 0.2
      d3.select(event.target).attr("stroke", "#000")

      console.log(event)
      addTooltip(event, d)
    }
    function pointMouseOut(event, d) {
      let isSelected = d3.select(event.target).classed("selected")
      //console.log(isSelected)
      d3.select(event.target).attr("stroke", e => {
        return isSelected ? "red" : "#fff"
      })
      removeTooltip()
    }

    function pointClick(event, d) {
      console.log("CLICK")
      // console.log({ type: "click", d })
      // d3.select(this).transition().attr("fill", "black").attr("r", 12)

      setSelectedPoint(d)
      console.log(d)

      d3.select(".point .selected")
        .classed("selected", false)
        .attr("stroke", "#fff")

      d3.select(event.target).classed("selected", true)
      d3.select(event.target).attr("stroke", "red")

      d3.select("#nodeSelected").style("display", "block")
    }

    // let point = svg
    //   .selectAll("point")
    //   .data(locations.collection, d => d.properties.id)
    //   .join("g")
    //   .attr("class", "point")
    //   .attr("d", path)
    //   .append("circle")
    //   .attr("cx", 0)
    //   .attr("cy", 0)
    //   .attr("r", 5)
    //   .attr("fill", "#333")

    group
      .call(
        d3
          .drag()
          .on("drag", event => {
            const rotate = projection.rotate()
            const k = sensitivity / projection.scale()
            projection.rotate([
              rotate[0] + event.dx * k,
              rotate[1] - event.dy * k,
            ])
            path = d3.geoPath().projection(projection)
            svg.selectAll("path").attr("d", path)
            // svg.selectAll(".point").attr("transform", function (d) {
            //   //let point = projection([d.lon, d.lat])
            //   let point = projection(d.frontmatter.centroid)
            //   return `translate(${point[0]},${point[1]})`
            // })
            svg
              .selectAll(".point")
              .attr("visibility", d => {
                let visible = coordVisible(d)
                return visible ? "visible" : "hidden"
              })
              .attr("transform", d => `translate(${coord(d)})`)
          })
          .on("end", function (d) {
            console.log("drag end")
            console.log(projection.rotation)
          })
      )
      .call(
        d3.zoom().on("zoom", event => {
          if (event.transform.k > 0.3) {
            projection.scale(initialScale * event.transform.k)
            path = d3.geoPath().projection(projection)
            svg.selectAll("path").attr("d", path)
            //globe.attr("r", projection.scale())
            // svg.selectAll(".point").attr("transform", function (d) {
            //   //let point = projection([d.lon, d.lat])
            //   let point = projection(d.frontmatter.centroid)
            //   return `translate(${point[0]},${point[1]})`
            // })
            svg
              .selectAll(".point")
              .attr("visibility", d => {
                let visible = coordVisible(d)
                return visible ? "visible" : "hidden"
              })
              .attr("transform", d => `translate(${coord(d)})`)
          } else {
            event.transform.k = 0.3
          }
        })
      )

    return svg
  }

  //ComponentDidMount - Initialize
  // useEffect(() => {
  //   fetch("/data/countries-110m.topojson.json").then(response => {
  //     if (response.status !== 200) {
  //       console.log(`There was a problem: ${response.status}`)
  //       return
  //     }
  //     response.json().then(topo => {
  //       setCountries(topojson.feature(topo, topo.objects.countries).features)
  //       setBorders(
  //         topojson.mesh(topo, topo.objects.countries, (a, b) => a !== b)
  //       )
  //     })
  //   })

  //   // console.log("B")
  //   // var div = d3.select(divRef.current)
  //   // let svg = drawGlobe()
  //   // if (div.node().firstChild) {
  //   //   div.node().removeChild(div.node().firstChild)
  //   // }
  //   // div.node().appendChild(svg.node())
  // }, [])

  useEffect(() => {
    console.log("B")
    var div = d3.select(divRef.current)
    let svg = drawGlobe()
    if (div.node().firstChild) {
      div.node().removeChild(div.node().firstChild)
    }
    div.node().appendChild(svg.node())
  }, [geoData])

  //Render
  return (
    <>
      <ChartWrapper>
        <SelectionBox id="nodeSelected">
          <div className="inner">
            {/* <div className="type">{selectedPoint.type}</div> */}
            <div className={"name"}>
              {selectedPoint?.properties?.frontmatter?.title}
            </div>
            {selectedPoint.summary !== null && (
              <div className={"summary"}>
                {selectedPoint?.properties?.frontmatter?.description}
              </div>
            )}
          </div>
          <button
            className="close"
            onClick={e => {
              // console.log("close SelectionBox")
              d3.select(".point.selected")
                .classed("selected", false)
                .attr("stroke", "#fff")
              document.getElementById("nodeSelected").style.display = "none"
            }}
          >
            close
          </button>
          <Link
            className="node-link"
            to={`${selectedPoint?.properties?.fields?.slug}`}
          >
            View Page
          </Link>
        </SelectionBox>
        <div id={vizId} ref={divRef} />
        <small
          dangerouslySetInnerHTML={{
            __html: vizSource,
          }}
        />
        {/* <SetButton onClick={setPosition}>GO!</SetButton> */}
        <TooltipBox id="graph-tooltip"></TooltipBox>
      </ChartWrapper>
    </>
  )
}
