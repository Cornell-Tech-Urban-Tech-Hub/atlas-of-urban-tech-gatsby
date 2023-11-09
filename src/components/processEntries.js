import * as d3 from "d3"

export default function processEntries(nodes) {
  let raw = d3
    .sort(nodes, (a, b) =>
      d3.ascending(a.frontmatter.title, b.frontmatter.title)
    )
    .map(d => {
      let start = d.frontmatter.year_start
      let end = d.frontmatter.year_completed

      let timeframe = {}
      timeframe.start = start != null ? (isNum(+start) ? +start : start) : null
      timeframe.end = end != null ? (isNum(+end) ? +end : end) : null
      timeframe.span = timeframe.start && timeframe.end

      d.timeframe = timeframe

      return d
    })

  let result = {}
  result.posts = raw
  result.tags = summarizeNodeTaxonomy(nodes, "tags")
  result.postsCS = raw.filter(d => d.frontmatter.template === "case-study")
  result.postsStub = raw.filter(d => d.frontmatter.template === "stub")
  result.pointCollection = makePointCollection(checkCoordinates(raw))

  return result
}

function checkCoordinates(nodes) {
  //const posts = data.allMarkdownRemark.nodes
  const isLatitude = num => isFinite(num) && Math.abs(num) <= 90
  const isLongitude = num => isFinite(num) && Math.abs(num) <= 180
  let processed = nodes.map(node => {
    let valid = false
    let centroid = node.frontmatter.centroid
    node.coordinates = null

    if (centroid) {
      let lat = centroid[0]
      let lon = centroid[1]
      let isLon = isLongitude(lon)
      let isLat = isLatitude(lat)
      if (isLon && isLat) {
        valid = true
        node.coordinates = [lon, lat]
      }
    }
    node.validCoordinate = valid

    return node
  })

  return processed
}

function makePointCollection(nodes) {
  let points = {}
  points.valid = nodes.filter(d => d.validCoordinate)
  points.invalid = nodes.filter(d => !d.validCoordinate)

  if (points.valid.lenght > 0) {
    let pointCollection = points.valid.map(d => {
      let coordinates = d.coordinates
      let feature = {}
      feature.type = "Feature"
      feature.geometry = { type: "Point", coordinates }
      feature.properties = d

      return feature
    })
    points.collection = pointCollection
  } else {
    points.collection = null
  }

  return points
}

export function summarizeNodeTaxonomy(nodes, array) {
  let items = nodes
    .map(node => {
      if (
        node.frontmatter[array] !== null ||
        node.frontmatter[array] !== undefined
      ) {
        return node.frontmatter[array]
      }
    })
    .flat()
    .filter(node => node !== undefined && node !== null)
    // .filter(element => element !== undefined)
    .reduce((acc, tag) => {
      // check if existing topping
      const existingTag = acc[tag]
      if (existingTag) {
        existingTag.count += 1 // if yes increment by one
      } else {
        acc[tag] = {
          //id: topping.id,
          value: tag,
          label: tag,
          count: 1,
        }
      }
      // otherwise create a new entry and set to 1
      return acc
    }, {})

  let itemsSorted = Object.values(items)
    .sort((a, b) => d3.ascending(a.label.toLowerCase(), b.label.toLowerCase()))
    .sort((a, b) => d3.descending(a.count, b.count))

  //.sort((a, b) => b.count - a.count)

  return itemsSorted
}

function isNum(n) {
  return !isNaN(parseFloat(n)) && isFinite(n) && n !== ""
}
