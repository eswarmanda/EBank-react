import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {userId: '', pIn: '', errorMsg: '', showSubmitError: false}

  onSuccess = jwtToken => {
    console.log(jwtToken)
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onFailure = errMsg => {
    console.log(errMsg)
    this.setState({errorMsg: errMsg, showSubmitError: true})
  }

  onChangeUserId = event => {
    console.log(event.target.value)
    this.setState({userId: event.target.value})
  }

  onChangePin = event => {
    console.log(event.target.value)
    this.setState({pIn: event.target.value})
  }

  onSubmitUserId = async event => {
    const {userId, pIn} = this.state
    event.preventDefault()
    const userDetails = {
      user_id: userId,
      pin: pIn,
    }
    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSuccess(data.jwt_token)
    } else {
      this.onFailure(data.error_msg)
    }
  }

  render() {
    const {userId, pIn, showSubmitError, errorMsg} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="main-card">
        <div className="login-form">
          <img
            className="img-card"
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
          />
          <form className="form-card" onSubmit={this.onSubmitUserId}>
            <h1>Welcome Back!</h1>
            <div className="input-card">
              <label htmlFor="user">User ID</label>
              <input
                className="input"
                type="text"
                id="user"
                placeholder="Enter User ID"
                onChange={this.onChangeUserId}
              />
            </div>
            <div className="input-card">
              <label htmlFor="pin">PIN</label>
              <input
                className="input"
                type="password"
                id="pin"
                placeholder="Enter PIN"
                onChange={this.onChangePin}
              />
            </div>
            <button type="submit">Login</button>
            {showSubmitError && <p className="error-msg">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}
export default Login
