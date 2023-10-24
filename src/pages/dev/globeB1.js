import React from "react"
import { graphql, Link } from "gatsby"
import Seo from "../../components/seo"
import Layout from "../../components/layout"
import { GlobeVizB1 } from "../../components/globe/globeVizB1"
// import { useGeoData } from "../../components/globe/useGeoData"
import {
  PageHeader,
  Section,
  Content,
  Row,
  Col,
} from "../../styles/StyledElements"

export default function Globe({ location }) {
  //const mdNode = data.allMarkdownRemark.edges[0].node

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
              <GlobeVizB1 />
            </Col>
          </Row>
        </Content>
      </Section>
    </Layout>
  )
}

// export const query = graphql`
//   {
//     allMarkdownRemark(
//       filter: { fileAbsolutePath: { regex: "/page-about.md/" } }
//     ) {
//       edges {
//         node {
//           html
//           fileAbsolutePath
//           frontmatter {
//             title
//           }
//         }
//       }
//     }
//   }
// `
