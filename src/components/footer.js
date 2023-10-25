import { Link } from "gatsby"
import React from "react"
import styled from "styled-components"
// import { StaticImage } from "gatsby-plugin-image"
import { useStaticQuery, graphql } from "gatsby"
// import { node } from "prop-types"

import cornellLogo from "../assets/vertical-jacobs-cornell.svg"

import { below } from "../styles/utilities/breakpoints"

// import logo from "../images/gatsby-icon.png"

const Row = styled.footer`
  display: flex;
  ${below.tablet} {
    flex-direction: column;
  }
  margin-bottom: 2rem;
`

const StyledFooter = styled.footer`
  background: #333;
  padding: 3rem 5%;
  margin: 0 auto;
  color: #eee;

  a:link,
  a:visited {
    padding: 0rem 1rem;
    color: #fff;
    text-decoration: none;
  }

  a.footer-button {
    font-family: "din-2014", sans-serif;
    padding: 0.25rem 1rem;
    text-decoration: none;
    border-radius: 1rem;
    display: inline-block;
    color: #fff;
    border: 1px solid #fff;
    transition: all 0.25s ease-in-out;

    &:hover {
      background-color: #fff;
      color: rgb(51, 51, 51);
      text-decoration: none;
    }
  }

  h3 {
    margin-top: 0;
    font-size: 0.85rem;
  }

  .description p {
  }
`

const Column = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
`

const OuterGrid = styled.div`
  display: flex;
  /* display: grid;
  grid-template-columns: 1fr 7fr;
  gap: 2rem; */
`

const FooterLogo = styled.div`
  flex: 1;
  padding-right: 1rem;
  .logo {
    width: 90%;
    max-width: 85px;
  }
`

const InnerGrid = styled.div`
  flex: 7;
  font-size: 0.85rem;

  /* display: grid;
  grid-template-columns: 2fr 1fr;
  row-gap: 0rem;
  column-gap: 3rem; */

  ${below.md} {
    /* grid-template-columns: 1fr; */
  }

  .row {
    display: flex;
  }

  .description {
    flex: 2;
  }
`

const FooterNav = styled(Column)`
  flex: 1;

  font-family: ${({ theme }) => theme.type.sans};
  font-weight: 700;

  a {
    display: block;
    margin-bottom: 0.5rem;
    &:hover {
      text-decoration: underline;
    }
  }

  b.footer-button {
  }

  ${below.md} {
    margin-top: 1rem;
    a {
      display: inline-block;
      margin-right: 1rem;
    }
  }
`

const Footer = ({ siteMetadata, version, location }) => {
  const footerDesc = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        filter: {
          fileAbsolutePath: {
            regex: "/src/content/markdown/footer-description.md/"
          }
        }
      ) {
        edges {
          node {
            html
            fileAbsolutePath
          }
        }
      }
    }
  `)

  // console.log(footerDesc)
  // console.log(above.sm`font-weight: bold;`)

  //   <footer>
  //   © {new Date().getFullYear()}, Urban Tech Hub
  // </footer>

  return (
    <>
      <StyledFooter>
        <OuterGrid>
          <FooterLogo>
            <img className="logo" src={cornellLogo} alt="Cornell Tech Logo" />
          </FooterLogo>
          <InnerGrid>
            <Row>
              <Column
                className="description"
                dangerouslySetInnerHTML={{
                  __html: footerDesc.allMarkdownRemark.edges[0].node.html,
                }}
              />
              <FooterNav>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/cases">Case Studies</Link>
                <Link className="footer-button" to="/prospects">
                  Contribute
                </Link>
                {/* <Link to="/search">Search</Link>
                <Link to="/privacy">Privacy</Link> */}
              </FooterNav>
            </Row>
            <Row>
              <Column className="copyright">
                {/* <p>Version: {siteMetadata.version}</p> */}
                &copy; {new Date().getFullYear()} Urban Tech Hub. (Draft Content
                for Review Only)
              </Column>
            </Row>
          </InnerGrid>
        </OuterGrid>
      </StyledFooter>
    </>
  )
}
export default Footer

// query MyQuery {
//   allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/src/content/markdown/footer-description.md/"}}) {
//     edges {
//       node {
//         html
//       }
//     }
//   }
// }
