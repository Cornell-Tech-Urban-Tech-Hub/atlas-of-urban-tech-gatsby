import * as React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import styled, { ThemeProvider } from "styled-components"
import theme from "../styles/Theme"
import Header from "./header"
import Footer from "./footer"
import FooterSimple from "./footerSimple"
import GlobalStyles from "../styles/GlobalStyles"
import Typography from "../styles/Typography"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `)

  // if (isRootPath) {
  //   header = (
  //     <h1 className="main-heading">
  //       <Link to="/">{title}</Link>
  //     </h1>
  //   )
  // } else {
  //   header = (
  //     <Link className="header-link-home" to="/">
  //       {title}
  //     </Link>
  //   )
  // }

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Typography />
        <div className="global-wrapper" data-is-root-path={isRootPath}>
          <Header siteMetadata={data.site.siteMetadata} title={title} />
          <main>{children}</main>
          <Footer />
        </div>
      </ThemeProvider>
    </>
  )
}

export default Layout
