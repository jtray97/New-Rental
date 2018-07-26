// REGULAR IMPORTS
import React from 'react'
import { Switch, Route } from 'react-router-dom'
// COMPONENT IMPORTS
import AllGroups from '../components/AllGroups'
// import Skip from '../components/Skip'
import Login from '../components/Login'
import AllUnits from '../components/AllUnits'
import Profile from '../components/Profile'
import New from '../components/New'
import Edit from '../components/Edit'
import ParallaxTesting from '../components/ParallaxTesting'
import EmailComp from '../components/EmailComp'
import NotFound from '../components/notFound'
// ROUTES AND SWITCH


export default   <Switch>
    {/* <Route path='/skip' component={Skip} /> */}
    {/* <Route path='/quads' component={AllUnits} /> */}
    {/* <Route path='/boats' component={AllUnits} /> */}
    {/* <Route path='/rvs' component={AllUnits} /> */}
    <Route exact path='/' component={AllGroups} /> 
    <Route path='/other' component={AllUnits} />
    <Route path='/login' component={Login} />
    <Route path='/Off-roaders' component={AllUnits} />
    <Route path='/watercraft' component={AllUnits} />
    <Route path='/camping' component={AllUnits} />
    {/* <Route path='/packages' component={AllUnits} /> */}
    <Route path='/storage-and-transport' component={AllUnits} />
    <Route path='/experiences' component={AllUnits} />
    <Route path='/party' component={AllUnits} />
    <Route path='/all' component={AllUnits} />
    <Route path='/profile' component = {Profile}/>
    <Route path = '/new' component = {New}/>
    <Route path = '/edit' component = {Edit}/>
    <Route path = '/parallax' component = {ParallaxTesting}/>
    <Route path = '/email' component = {EmailComp}/>
    <Route path = '/' component = {NotFound}/>

</Switch>
