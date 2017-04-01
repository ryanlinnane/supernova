import React, { Component } from 'react'
import styles from './nav.scss'
import { mobileAndTabletcheck } from '../../lib/device'
export default class Nav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loadingIDs: [],
      showRoutes: false,
      innerWidth: window.innerWidth,
      orientationChange: false
    }
    this.handleResize = this.handleResize.bind(this)
  }
  componentWillMount() {
    window.addEventListener('resize', this.handleResize)

  }
  componentWillUmount() {
    window.removeEventListener('resize', this.handleResize)

  }
  handleResize() {
    if(mobileAndTabletcheck(window)) {
      return
    }

    let orientationChange = false
    if(window.innerWidth >= 767 && this.state.innerWidth < 767 || window.innerWidth < 767 && this.state.innerWidth >= 767) {
      orientationChange = true
    }

    this.setState({
      innerWidth: window.innerWidth,
      orientationChange
    })
  }
  render() {


    let aboutStyle = {}
    if(this.state.innerWidth >= 767) {
      aboutStyle['transition'] = 'none'
    }
    else if(this.state.innerWidth < 767 && this.state.showRoutes) {
      if(this.state.orientationChange) {
        aboutStyle['transition'] = 'none'
        aboutStyle['maxHeight'] = '200px'
      }
      else {
        aboutStyle['maxHeight'] = '200px'
      }
    }
    else if(this.state.innerWidth < 767 && !this.state.showRoutes) {
      if(this.state.orientationChange) {
        aboutStyle['transition'] = 'none'
        aboutStyle['display'] = 'none'
      }
      else {
        aboutStyle['maxHeight'] = '0px'
      }
    }
    return (<div className={`${styles.leftPanel}`} >
      <div style={{display:'flex', alignItems:'center',  height:'55px', flex:'0 0 auto', justifyContent:'space-between'}}>
        <div style={{display:'flex', height:'100%', alignItems:'center'}}>
          <div style={{color:'white', paddingLeft: '5px', marginRight:'3px', fontSize:'20px', fontWeight:'500', whiteSpace:'nowrap'}}>
             <h1 className={`${styles.upperCase} ${styles.yShift} ${styles.headerFont}`}> {/*&lt;*/} ryan linnane {/* &#47;&gt; */}</h1>
           </div>
          {this.props.isLoading == false ? null : <img src={require('../../crazyLoading.gif')} style={{width:'30px'}}/>}
        </div>
        <div>
          <img src={require('./angle_down.png')} style={{width:'30px', marginRight:'10px'}} className={`${styles.mobileOnly} ${styles.button}`} onClick={() => {
            this.setState({
              showRoutes: !this.state.showRoutes
            })
            return true
          }}/>
        </div>
      </div>
      <div className={styles.about} style={aboutStyle}>

        {/*left*/}
        {
          (() => {
            // console.log('window ' + )
            const routes = ['ABOUT', 'PHOTO', 'VIDEO', 'RESUME', 'MUSING']
            return routes.map((route, index) => {
              let style = {}
              if(route.toLowerCase() == this.props.routeID) {
                style['backgroundColor'] = 'rgba(139, 254, 206, 0.7)'
              }
              return <div onTouchStart="" key={route} style={style} className={`${styles.leftSelector} ${styles.yShift}`} onClick={() => {
                if(route.toLowerCase() == 'musing') {
                  window.open('https://ryanlinnane.github.io', '__blank')
                  return
                }
                this.props.onRouteClick(route)
              }}>
                {route}
              </div>
            })
          })()
        }
    </div>
    <div style={{display:'flex', alignItems:'center', justifyContent:'space-around', maxWidth:'100%', minWidth:'210px', padding:'2px 0px'}}>
      <a href='https://github.com/ryanlinnane' target='__blank' className={`${styles.icon}`}> <img src={require('./icons/github.png')}/></a>
      <a href='https://www.linkedin.com/in/linnaneryan' target='__blank' className={styles.icon}> <img src={require('./icons/linkedin.png')}/></a>
      <a href='https://medium.com/@Leef' target='__blank' className={styles.icon}> <img src={require('./icons/medium.png')}/></a>
      <a href='https://twitter.com/whoofshowl' target='__blank' className={styles.icon}> <img src={require('./icons/twitter.png')}/></a>
    </div></div>)
  }
}
