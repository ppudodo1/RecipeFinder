import React from 'react'
import styles from "./header.module.css"
function Header() {
  return (
    <div className={styles.container}>
     <h1 className={styles.title}>Recipe finder</h1>
      <hr className={styles.line}/>
    </div>
  )
}

export default Header
