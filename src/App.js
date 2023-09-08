import {Route, Switch, Redirect} from 'react-router-dom'
import './App.css'
import Login from './component/login'
import Home from './component/home'
import NotFound from './component/NotFound'

// Replace your code here
const App = () => (
  <Switch>
    <Route path="/ebank/login" component={Login} />
    <Route exact path="/" component={Home} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
