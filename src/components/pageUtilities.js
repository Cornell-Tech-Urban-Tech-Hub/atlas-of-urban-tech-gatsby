export function contentMapMarkdown(contentNodes) {
  let map = new Map()
  contentNodes?.forEach(d => {
    map.set(d.frontmatter.ref, d)
  })
  return map
}

export function makeExcerpt(str, length = 25) {
  // return str.length > n ? str.slice(0, n - 1) + "..." : str
  console.log({ length })
  //let words = str.split(" ", 25).join(" ")
  let words = str.split(" ")
  let excerpt
  if (words.length > length) {
    excerpt = words.slice(0, length).join(" ") + "..."
  } else {
    excerpt = str
  }
  return excerpt
}
