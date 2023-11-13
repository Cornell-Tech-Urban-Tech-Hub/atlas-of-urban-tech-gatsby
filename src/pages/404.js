import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import {
  PageHeader,
  Section,
  Content,
  Row,
  Col,
} from "../styles/StyledElements"
import { PageSimpleHeader } from "../components/pageSimpleHeader"

const NotFoundPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <PageSimpleHeader title={"404: Not Found"}></PageSimpleHeader>
      <Section>
        <Content>
          <Row>
            <Col>
              <p>You just landed on a route that doesn&#39;t exist.</p>
            </Col>
          </Row>
        </Content>
      </Section>
    </Layout>
  )
}

export default NotFoundPage

export const Head = () => <Seo title={"404: Not Found"} />

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
