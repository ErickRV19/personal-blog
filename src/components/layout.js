import React from "react"
import { Link } from "gatsby"

import { rhythm, scale } from "../utils/typography"
import "./styles/layout.css"

let theme = 1

function mode() {
  if (theme === 1) {
    document.getElementById("in").className = "dark"
    document.getElementById("gatsby-focus-wrapper").className = "dark"
    document.getElementById("font").className = "darkFont"
    document.getElementById("nav").className = "navDark"
    document.getElementById("topBar").className = "topBarDark"
    document.getElementById("info").className = "infoDark"
    theme = theme - 1
  } else {
    document.getElementById("in").className = "light"
    document.getElementById("gatsby-focus-wrapper").className = "light"
    document.getElementById("nav").className = "nav"
    document.getElementById("font").className = "font"
    document.getElementById("topBar").className = "topBar"
    document.getElementById("info").className = "info"
    theme = +1
  }
}

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  let header

  if (location.pathname === rootPath) {
    header = (
      <h1
        style={{
          ...scale(1.5),
          marginBottom: rhythm(1.5),
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}{" "}
        </Link>{" "}
      </h1>
    )
  } else {
    header = (
      <h3
        style={{
          fontFamily: `Roboto, sans-serif`,
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}{" "}
        </Link>{" "}
      </h3>
    )
  }
  return (
    <div
      id="in"
      className="light"
      style={{
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: rhythm(30),
        padding: ` 0em 2em`,
      }}
    >
      <div id="topBar" className="topBar">
        {" "}
      </div>
      <header id="colorFont" className="font">
        {" "}
        {header}{" "}
      </header>{" "}
      <nav id="nav" className="nav">
        <a href="/"> Inicio </a> <a href="/primer%20post/"> Sobre mi </a>{" "}
        <a href="https://erickrv19.github.io/"> Contacto </a>{" "}
        <img
          id="iconTheme"
          onClick={mode}
          src={require("../../content/assets/luna.png")}
          alt="img Erick"
        />
      </nav>{" "}
      <main id="colorFont" className="font">
        {" "}
        {children}{" "}
      </main>{" "}
      <footer>
        <div id="info" className="info"></div>
        <div className="register">Gatsby</div>
      </footer>{" "}
    </div>
  )
}

export default Layout
