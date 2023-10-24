import React from "react"
import { graphql, Link } from "gatsby"
import Seo from "../../components/seo"
import Layout from "../../components/layout"
import { GlobeVizA2 } from "../../components/globe/globeVizA2"
import { GlobeVizA3Revised } from "../../components/globe/globeVizA3Revised"
import processPostCoord from "../../components/processPostCoord"
import {
  PageHeader,
  Section,
  Content,
  Row,
  Col,
} from "../../styles/StyledElements"
import { useGeoData } from "../../components/globe/useGeoData"

export default function Globe({ location, data }) {
  //const mdNode = data.allMarkdownRemark.edges[0].node

  const geoData = useGeoData()
  console.log(geoData)

  let locations = processPostCoord(data.allMarkdownRemark.nodes)
  console.log(locations.valid)

  return (
    <Layout location={location}>
      <Seo title={"GLOBE"} />
      <PageHeader>
        <Content>
          <Row>
            <Col>
              <Link to="/dev/">Development</Link>
              <h1>Globe</h1>
            </Col>
          </Row>
        </Content>
      </PageHeader>
      <Section>
        <Content>
          <Row>
            <Col>
              {geoData != null && (
                <GlobeVizA3Revised geoData={geoData} locations={locations} />
              )}
            </Col>
          </Row>
        </Content>
      </Section>
      <Section>
        <Content>
          <Row>
            <Col>
              {locations.valid.map(loc => {
                const title = loc.frontmatter.title || loc.fields.slug

                return (
                  <li key={loc.fields.slug}>
                    <Link to={loc.fields.slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </li>
                )
              })}
            </Col>
          </Row>
        </Content>
      </Section>
    </Layout>
  )
}

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/cases/" } }) {
      nodes {
        id
        excerpt
        fields {
          slug
        }
        frontmatter {
          title
          description
          status
          centroid
        }
      }
    }
  }
`
