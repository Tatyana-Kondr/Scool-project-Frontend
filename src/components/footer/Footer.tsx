import React from "react"
import { Link } from "react-router-dom"
import styles from "./footer.module.css"
export default function Footer() {
  return (
    <div className={styles.footerContainer}>
      <p>© Все права защищены</p>
      <p>© 2024 Команда "Студенты школы AIT TR"</p>
      <p>© Волонтёрский сайт помощи животным "Take me home"</p>
      <p>© komanda_cтуденты_школы_ait_ tr@com.de</p>
      
    </div>
  )
}
