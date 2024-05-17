import { Link } from "react-router-dom"
import styles from "./header.module.css"
import logoImg from "./../../media/logo.png"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { logout, selectUser } from "../../features/auth/authSlice"

export default function Header() {
  const user = useAppSelector(selectUser)
  const dispatch = useAppDispatch()
  function handleLogout() {
    dispatch(logout())
  }
  return (
    <header>
      <div>
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
                <a href="#!">I want help</a>
              </li>
              <li>
                <a href="#!">How it work</a>
              </li>

              {user ? (
                <>
                  <li>
                    <Link to="/personalCabinet">Personal cabinet</Link>
                  </li>
                  <li>
                    <Link to="/" onClick={handleLogout}>Log out</Link>
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
