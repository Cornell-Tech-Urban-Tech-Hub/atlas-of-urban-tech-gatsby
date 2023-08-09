export default function processPostCoord(posts) {
  //const posts = data.allMarkdownRemark.nodes
  const isLatitude = num => isFinite(num) && Math.abs(num) <= 90
  const isLongitude = num => isFinite(num) && Math.abs(num) <= 180
  let checkPosts = posts.map(post => {
    let valid = false
    let centroid = post.frontmatter.centroid
    post.coordinates = null
    //console.log(centroid)
    if (centroid) {
      let lat = centroid[0]
      let lon = centroid[1]
      let isLon = isLongitude(lon)
      let isLat = isLatitude(lat)
      if (isLon && isLat) {
        valid = true
        post.coordinates = [lon, lat]
      }
    }
    post.validCoordinate = valid

    return post
  })

  let points = {}
  points.valid = checkPosts.filter(d => d.validCoordinate)
  points.invalid = checkPosts.filter(d => !d.validCoordinate)

  let pointCollection = points.valid.map(d => {
    let coordinates = d.coordinates
    let feature = {}
    feature.type = "Feature"
    feature.geometry = { type: "Point", coordinates }
    feature.properties = d

    return feature
  })

  points.collection = pointCollection

  return points
}
