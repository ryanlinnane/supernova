/**
 * Created by MagicAntler on 10/14/15.
 */
import React from "react";
let { Component } = React;
import style from './sass/main.scss';
import vid from './public/Infinity/MP4/Infinity.mp4';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import reducer from './reducers/index.js';
import { render } from 'react-dom'
import * as homeActions from './actions/home.js';
import colorPulse from './lib/color'
import Modal from './components/modal'


class Main extends Component{
  constructor(props) {
    super(props);
    this.state = { selectedImage: null }
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
  }

  componentDidMount() {
    let colorGenerator = colorPulse([[0,0,0], [255,255,255],  [1, 167, 184], [34, 218, 212]])
    this.colorStep(colorGenerator)
  }

  componentDidUpdate() { }

  getCell(content, key) {
    let cellStyle = key == this.state.hoveredID ? { backgroundColor:'rgb(240, 236, 236)' } : {}
    return <div className={`${style.cell}`}  style={{ ...this.getColorStyle(this.state.color), ...cellStyle , ...{ margin:'5px'}}} key={key} onClick={() => {
      this.setState({
        selectedImage: content
      })
    }}>
      <div style={{fontSize:'25px'}}> Level {content}</div>
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
          <img src="http://cdn.bulbagarden.net/upload/0/0d/025Pikachu.png" className={style.bgIcon}/>
          <div className={style.about}>
            <div style={{textAlign:'center'}}>
              Ryan Linnane

             </div>
          </div>
          <div className={style.clock}>
            <p> 0:00 </p>
          </div>
        </div>
        <div className={style.rightPanel}>
          {
            this.state.images.map(i => this.getCell(i, i))
          }
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changePic: (src) => dispatch(homeActions.changePic(src))
  }
};
const mapStateToProps = (state) => {
  return {
    imageSrc: state.home.imageSrc
  }
};

const MainContainer =
  connect(mapStateToProps,
   mapDispatchToProps)(Main);
//<Provider store={createStore(reducer)}><MainContainer/></Provider>

render(<Provider store={createStore(reducer)}><MainContainer /></Provider>, document.getElementById('root'));
