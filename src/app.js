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

class Main extends Component{
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
  }

  componentDidUpdate() {
  }

  getCell() {
    return <div style={{padding:'5px'}}><div style={{backgroundColor:'rgba(255,255,255,0.9)', color:'black', width:'200px', height:'200px', borderRadius:'5px', flex:'0 0 auto', display:'flex', justifyContent:'center', alignItems:'center'}}>
      <div> Element 1 </div>
    </div></div>
  }

  render(){
    return(
      <div className={style.main}>
        <div className={`${style.leftPanel} ${style.verticalCenter}`} >
          <img src="http://cdn.bulbagarden.net/upload/0/0d/025Pikachu.png" style={{height:'500px', left:'80px', position:'absolute', overflow:'hidden'}}/>
          <div style={{overflowY:'auto', zIndex:'500', backgroundColor:'rgba(255,255,255,0.9)', color:'black', width:'12em', borderRadius:'5px', position:'absolute', top:'20', left:'20', margin:'auto'}}>
            <div style={{textAlign:'center'}}>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati</div>
          </div>
        </div>


        <div className={style.rightPanel}>
          {
            () => {
              let list = []
              for(let i = 0; i<100; i++) {
                list.push(this.getCell())
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
