import React from "react"
import { graphql, Link } from "gatsby"
import Seo from "../../components/seo"
import Layout from "../../components/layout"
import {
  PageHeader,
  Section,
  Content,
  Row,
  Col,
} from "../../styles/StyledElements"
//import GlobeLayout from "../../components/globe/globeLayout"

export default function Globe({ location }) {
  //const mdNode = data.allMarkdownRemark.edges[0].node

  return (
    <Layout location={location}>
      <Seo title={"GLOBE"} />
      <PageHeader>
        <Content>
          <Row>
            <Col>
              <h1>Visual Development</h1>
            </Col>
          </Row>
        </Content>
      </PageHeader>
      {/* <Section>
        <Content>
          <Row>
            <Col>
              <GlobeLayoutA2 />
            </Col>
          </Row>
          <Row>
            <Col></Col>
          </Row>
        </Content>
      </Section> */}
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
