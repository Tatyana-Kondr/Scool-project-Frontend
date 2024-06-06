import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { logout, selectUser } from "../../features/auth/authSlice"
import logoImg from "./../../media/logo-removebg.png"
import styles from "./header.module.css"
import { useEffect } from "react"

export default function Header() {
  const userSelected = useAppSelector(selectUser)
  const dispatch = useAppDispatch()
  function handleLogout() {
    dispatch(logout())
  }

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector("header")
      if (window.scrollY > 50) {
        header?.classList.add(styles.transparent)
      } else {
        header?.classList.remove(styles.transparent)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <header className={styles.header}>
      <div className={styles.header_container}>
        <div className={styles.header_row}>
          <div className={styles.header_logo}>
            <img src={logoImg} alt="Logo" />
          </div>
          <nav className={styles.header_nav}>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/wantHelp">I want to help</Link>
              </li>
              <li>
                <Link to="/howItWorks">How it works</Link>
              </li>

              {userSelected ? (
                <>
                  {userSelected.login === "admin" ? (
                    <li>
                      <Link to="/adminCabinet">Admin Cabinet</Link>
                    </li>
                  ) : (
                    <li>
                      <Link to={`/personalCabinet/${userSelected.login}`}>
                        Personal cabinet
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link to="/" onClick={handleLogout}>
                      Log out
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/register">Sign up</Link>
                  </li>
                  <li>
                    <Link to="/loginForm">Sign in</Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}
