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
import GlobeLayoutA2 from "../../components/globe/globeLayoutA2"

import iconPlan from "../../assets/icon-plan.svg"
import iconDistrict from "../../assets/icon-district.svg"

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
      <Section>
        <Content>
          <Row>
            <Col>
              <GlobeLayoutA2 />
            </Col>
          </Row>
          <Row>
            <Col>
              <Link to="/dev/globeA2">Globe A2</Link>
              <Link to="/dev/globeA2">Globe A3 Animate</Link>
              <Link to="/dev/globeB1">Globe B1</Link>
              {/* <Link to="/dev/globeC1">Globe C1</Link>
              <Link to="/dev/globeR1">Globe R1</Link> */}
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
