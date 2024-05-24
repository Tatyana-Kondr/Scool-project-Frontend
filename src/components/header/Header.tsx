import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { logout, selectUser } from "../../features/auth/authSlice"
import logoImg from "./../../media/logo.png"
import styles from "./header.module.css"

export default function Header() {

  const userSelected = useAppSelector(selectUser)
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
                <a href="#!">How it works</a>
              </li>

              {userSelected ? (
  <>
    {userSelected.login === 'admin' ? (
      <li>
        <Link to="/adminCabinet">Admin Cabinet</Link>
      </li>
    ) : (
      <li>
        <Link to={`/personalCabinet/${userSelected.login}`}>Personal cabinet</Link>
      </li>
    )}
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