/**
 * Created by MagicAntler on 10/14/15.
 */
import React from "react";
let { Component } = React;
import styles from './sass/main.scss';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import reducer from './reducers/index.js';
import { render } from 'react-dom'
import colorPulse from './lib/color'
import Modal from './components/modal/modal'
import 'whatwg-fetch'
const flickrRoute = 'https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=24084cab33ca5e8de996a7c9d393d81b&user_id=133508911%40N08&format=json&nojsoncallback=1&api_sig=b554f59fb31caf59f377674d840cb9d1'
import Gallery from './components/gallery/gallery'
import Video from './components/video/video'
import About from './components/about/about'
import Resume from './components/resume/resume'

class Main extends Component{
  constructor(props) {
    super(props);
    this.state = {
      routeID: 'about',
      loadingIDs: []
    }
    this.setRouteID = this.setRouteID.bind(this)
    this.pushLoading = this.pushLoading.bind(this)
    this.removeLoading = this.removeLoading.bind(this)
  }

  pushLoading(id) {
    this.setState({
      loadingIDs: [...this.state.loadingIDs, id]
    })
  }
  removeLoading(id) {
    this.setState({
      loadingIDs: this.state.loadingIDs.filter(lID => lID != id)
    })
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  componentDidUpdate() { }

  setRouteID(id) {
    this.setState({
      routeID: id.toLowerCase()
    })
  }

  render(){

    return(
      <div className={styles.main}>
        <div className={`${styles.leftPanel}`} >
          <div className={styles.about}>
              <div style={{display:'flex', alignItems:'center', marginBottom:'10px'}}>
                <div style={{marginRight:'3px', fontSize:'20px', fontWeight:'500', padding:'1px 2px'}}>RYAN LINNANE</div>
                <img src={this.state.loadingIDs.length == 0 ? require('./public/images/source_code_filled.png'): require('./crazyLoading.gif')} style={{width:'30px'}}/>
              </div>
              {/*left*/}
              {
                () => {
                  const routes = ['ABOUT', 'PHOTO', 'VIDEO', 'RESUME', 'WRITING']
                  return routes.map(route => {
                    let style = {}
                    if(route.toLowerCase() == this.state.routeID) {
                      style['backgroundColor'] = 'rgb(161, 161, 161)'
                    }
                    return <div key={route} className={styles.leftSelector} style={style} onClick={() => {
                      if(route.toLowerCase() == 'writing') {
                        //exit early if blog site
                        window.open('https://ryanlinnane.github.io', '__blank')
                        return
                      }
                      // else if(route.toLowerCase() == 'resume') {
                      //   window.open('http://static.awhoof.com/Linnane_Ryan_Resume.pdf', '__blank')
                      //   return
                      // }
                      this.setRouteID(route)
                    }}>
                      {route}
                    </div>
                  })
                }()
              }
          </div>
          <div style={{display:'flex', alignItems:'center', justifyContent:'space-around', maxWidth:'100%', minWidth:'210px', margin:'0px auto', padding:'5px 0px 0px 0px'}}>
            <a href='https://github.com/ryanlinnane' target='__blank'> <img src={require('./public/images/white-social/github.png')} style={{width:'25px', opacity:'.8'}}/></a>
            <a href='https://www.linkedin.com/in/linnaneryan' target='__blank'> <img src={require('./public/images/white-social/linkedin.png')} style={{width:'25px', opacity:'.8'}}/></a>
            <a href='https://medium.com/@Leef' target='__blank'> <img src={require('./public/images/white-social/medium.png')} style={{width:'25px', opacity:'.8'}}/></a>
            <a href='https://twitter.com/mysticantler' target='__blank'> <img src={require('./public/images/white-social/twitter.png')} style={{width:'25px', opacity:'.8'}}/></a>
          </div>
        </div>
        <div className={styles.rightPanel} style={{backgroundImage:`url(${require('./public/images/star2.png')})`}}>
          {
            () => {
              switch(this.state.routeID) {
                case 'photo':
                  return <Gallery removeLoading={this.removeLoading} pushLoading={this.pushLoading}/>
                case 'video':
                  return <Video />
                return
                case 'about':
                  return <About />
                case 'resume':
                  return <Resume />
                default:
                  return null
              }
            }()
          }
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const mapStateToProps = (state) => {
  return {
    imageSrc: state.home.imageSrc
  }
}

const MainContainer =
  connect(mapStateToProps,
   mapDispatchToProps)(Main);

render(<Provider store={createStore(reducer)}>
  <MainContainer />
</Provider>, document.getElementById('root'));
