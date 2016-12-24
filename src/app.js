/**
 * Created by MagicAntler on 10/14/15.
 */
import React from "react";
let { Component } = React;
import style from './sass/main.scss';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import reducer from './reducers/index.js';
import { render } from 'react-dom'
import * as homeActions from './actions/home.js';
import colorPulse from './lib/color'
import Modal from './components/modal'
import 'whatwg-fetch'
const flickrRoute = 'https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=24084cab33ca5e8de996a7c9d393d81b&user_id=133508911%40N08&format=json&nojsoncallback=1&api_sig=b554f59fb31caf59f377674d840cb9d1'


class Main extends Component{
  constructor(props) {
    super(props);
    this.state = { selectedImage: null, photoUrls:[] }
    this.colorStep = this.colorStep.bind(this)
  }

  colorStep(colorGenerator) {
    const { done, value } = colorGenerator.next()
    if(done) {
      throw new Error('generator stopped!')
    }
    this.setState({
      color: value
    })
    requestAnimationFrame(() => this.colorStep(colorGenerator))
  }

  componentWillMount() {
    let images = []
    for(let i = 0; i<20; i++) {
      images.push(i)
    }
    this.setState({ images })

    fetch(flickrRoute).then(response => {
      console.log('fetched' + JSON.stringify(response, null, 4))
      return response.json()
    })
    .then(data => {
      console.log('data ' + JSON.stringify(data, null, 4))
      // let urls = []
      const photo = data.photos.photo
      let urls = photo.map(photo => `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`)
      console.log('urls ' + urls)
      this.setState({photoUrls: urls})
    })
    .catch(err => {
      console.error(err)
    })
  }

  componentDidMount() {
    let colorGenerator = colorPulse([[0,0,0], [255,255,255],  [1, 167, 184], [34, 218, 212]])
    this.colorStep(colorGenerator)
  }

  componentDidUpdate() { }

  getCell(url, key) {
    let cellStyle = key == this.state.hoveredID ? { backgroundColor:'rgb(240, 236, 236)' } : {}
    return <div className={`${style.cell}`}  style={{ ...this.getColorStyle(this.state.color), ...cellStyle , ...{ margin:'5px'}}} key={key} onClick={() => {
      this.setState({
        selectedImage: url
      })
    }}>
        <img src={url} style={{padding:'0px', margin:'0px'}}/>
    </div>
  }

  getColorStyle(rgbVector = [0,0,0]) {
    return { boxShadow: `5px 5px 5px rgb(${rgbVector.join(',')})` }
  }

  render(){

    return(
      <div className={style.main}>
        <Modal selectedImage={this.state.selectedImage} onExit={() => {
          this.setState({
            selectedImage: null
          })
        }}
        onNext={() => {
          if(this.state.selectedImage != null) {
            this.setState({ selectedImage: (this.state.selectedImage + 1 + this.state.images.length) % this.state.images.length })
          }
        }}
        onPrev={() => {
          if(this.state.selectedImage != null) {
            this.setState({ selectedImage: (this.state.selectedImage - 1 + this.state.images.length) % this.state.images.length })
          }
        }}
        />
        <div className={`${style.leftPanel}`} >
          <div className={style.about}>
              <div style={{display:'flex', alignItems:'center', marginBottom:'10px'}}>
                <div style={{marginRight:'3px', fontSize:'20px', fontWeight:'500'}}>RYAN LINNANE</div>
                <img src={require('./public/images/source_code_filled.png')} style={{width:'30px'}}/>
              </div>
              {/*left*/}
              <div>
                <div style={{paddingLeft:'20px'}}>
                  HOME
                </div>
                <div style={{backgroundColor:'rgb(153, 153, 153)', paddingLeft:'20px'}}>
                  GALLERY
                </div>

                <div  style={{paddingLeft:'20px'}}>
                  ABOUT
                </div>
              </div>
          </div>
          <div style={{display:'flex', alignItems:'center', justifyContent:'space-around', maxWidth:'100%', minWidth:'210px', margin:'0px auto', padding:'5px 0px'}}>
            <a href="https://google.com"><img src={require('./public/images/white-social/github.png')} style={{width:'25px', opacity:'.8'}}/></a>
            <a><img src={require('./public/images/white-social/instagram.png')} style={{width:'25px', opacity:'.8'}}/></a>
            <a><img src={require('./public/images/white-social/linkedin.png')} style={{width:'25px', opacity:'.8'}}/></a>
            <a><img src={require('./public/images/white-social/medium.png')} style={{width:'25px', opacity:'.8'}}/></a>
            <a><img src={require('./public/images/white-social/snapchat.png')} style={{width:'25px', opacity:'.8'}}/></a>
            <a><img src={require('./public/images/white-social/twitter.png')} style={{width:'25px', opacity:'.8'}}/></a>
          </div>
        </div>
        <div className={style.rightPanel} style={{backgroundImage:`url(${require('./public/images/star2.png')})`}}>


          <div className={style.gallery}>{
            /*Render path specific view inside of here*/
            this.state.photoUrls.map((url, index) => this.getCell(url, index))
          }
          </div>
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
