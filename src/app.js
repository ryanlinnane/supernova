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
class Main extends Component{
  constructor(props) {
    super(props);
    this.state = {}
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

  componentDidMount() {
    let colorGenerator = colorPulse([[0,0,0], [255,255,255],  [1, 167, 184], [34, 218, 212]])
    this.colorStep(colorGenerator)
  }

  componentDidUpdate() {
  }

  getCell(content, key) {
    return <div style={{padding:'5px'}} key={key}>
    <div className={`${style.cell}`} style={this.getColorStyle(this.state.color)}>
      <div> Element {content}</div>
    </div>
    </div>
  }

  getColorStyle(rgbVector = [0,0,0]) {
    return { boxShadow: `5px 5px 5px rgb(${rgbVector.join(',')})` }
  }

  render(){

    return(
      <div className={style.main}>
        <div className={`${style.leftPanel} ${style.verticalCenter}`} >
          <img src="http://cdn.bulbagarden.net/upload/0/0d/025Pikachu.png" style={{height:'500px', left:'80px', position:'absolute', overflow:'hidden', bottom:'0px'}}/>
          <div style={{overflowY:'auto', zIndex:'500', backgroundColor:'rgba(255,255,255,0.9)', color:'black', width:'12em', borderRadius:'5px', position:'absolute', top:'20px', left:'20px', margin:'auto'}}>
            <div style={{textAlign:'center'}}>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati</div>
          </div>
        </div>
        <div className={style.rightPanel}>
          {
            () => {
              let list = []
              for(let i = 0; i<100; i++) {
                list.push(this.getCell(i, i))
              }
              return list
            }()
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
