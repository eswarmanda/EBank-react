import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

const Home = props => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/ebank/login" />
  }

  const onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/ebank/login')
  }

  return (
    <div className="home-card">
      <div className="header-card">
        <img
          className="img-card1"
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          alt="website logo"
        />
        <button className="logout-btn" type="button" onClick={onLogout}>
          Logout
        </button>
      </div>
      <div className="atm-card">
        <h1 className="heading">Your Flexibility, Our Excellence</h1>
        <img
          className="img-card2"
          src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
          alt="digital card"
        />
      </div>
    </div>
  )
}

export default Home
