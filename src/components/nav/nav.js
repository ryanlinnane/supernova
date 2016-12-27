import React, { Component } from 'react'
import styles from './nav.scss'
import animate from '../../sass/animate.scss'
import { mobileAndTabletcheck } from '../../lib/device'
export default class Nav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loadingIDs: [],
      showRoutes: false,
      innerWidth: window.innerWidth
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
    console.log('handling resize')
    this.setState({
      innerWidth: window.innerWidth
    })
  }

  render() {
    return (<div className={`${styles.leftPanel}`} >
      <div style={{display:'flex', alignItems:'center',  height:'55px', flex:'0 0 auto', justifyContent:'space-between'}}>
        <div style={{display:'flex', height:'100%', alignItems:'center'}}>
          <div style={{color:'white', paddingLeft: '5px', marginRight:'3px', fontSize:'20px', fontWeight:'500', whiteSpace:'nowrap'}}>
             &lt;RYAN LINNANE &#47;&gt;
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
      <div className={styles.about}>

        {/*left*/}
        {
          () => {
            // console.log('window ' + )
            const routes = ['ABOUT', 'PHOTO', 'VIDEO', 'RESUME', 'WRITING']
            return routes.map((route, index) => {
              let style = {}
              if(this.state.showRoutes == true || this.state.innerWidth >= 767) {
                style['display'] = 'block'
              }
              else {
                style['display'] = 'none'
              }
              if(route.toLowerCase() == this.props.routeID) {
                style['backgroundColor'] = 'rgb(32, 31, 31)'
              }
              if(index == 0) {
                style['borderStyle'] = 'solid none solid none'
              }
              else {
                style['borderStyle'] = 'none none solid none'
              }

              return <div key={route} style={style} className={styles.leftSelector} onClick={() => {
                if(route.toLowerCase() == 'writing') {
                  window.open('https://ryanlinnane.github.io', '__blank')
                  return
                }
                this.props.onRouteClick(route)
              }}>
                {route}
              </div>
            })
          }()
        }
    </div>
    <div style={{display:'flex', alignItems:'center', justifyContent:'space-around', maxWidth:'100%', minWidth:'210px', padding:'2px 0px'}}>
      <a href='https://github.com/ryanlinnane' target='__blank' className={`${styles.icon}`} style={{flex:'0 0 auto'}}> <img src={require('./icons/github.png')} style={{width:'25px', opacity:'.8', padding:'2px'}} className={animate.row}/></a>
      <a href='https://www.linkedin.com/in/linnaneryan' target='__blank' className={styles.icon} style={{flex:'0 0 auto'}}> <img src={require('./icons/linkedin.png')} style={{width:'25px', opacity:'.8', padding:'2px'}}/></a>
      <a href='https://medium.com/@Leef' target='__blank' className={styles.icon} style={{flex:'0 0 auto'}}> <img src={require('./icons/medium.png')} style={{width:'25px', opacity:'.8', padding:'2px'}}/></a>
      <a href='https://twitter.com/mysticantler' target='__blank' className={styles.icon} style={{flex:'0 0 auto'}}> <img src={require('./icons/twitter.png')} style={{width:'25px', opacity:'.8', padding:'2px'}}/></a>
    </div></div>)
  }
}
