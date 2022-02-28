import React from 'react'

interface LayoutProps {
  children: [React.ReactNode, React.ReactNode]
}

function Layout({children} : LayoutProps) {
  return (
    <>
      <header>
        <h1>Spacetagram</h1>
        <p>Brought to you by NASA's Astronomy Photo of the Day (APOD) API</p>
      </header>

      {children[0]}

      <main>
        {children[1]}
      </main>
    </>
  )
}

export default Layout
