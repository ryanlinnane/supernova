import React, { Component } from 'react'

export default class Modal extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    console.log(this.props.selectedImage)
    if(this.props.selectedImage == null) {
        return null
    }
    return (
      <div style={{position:'absolute', top: '0px', left:'0px', bottom:'0px', right:'0px', zIndex: '2', backgroundColor:'rgba(61, 61, 61, 0.78)',display:'flex', justifyContent:'center', alignItems:'center'}} onClick={this.props.onExit}>
        <div style={{left:'-20px', position:'relative',padding:'10px', display:'flex', justifyContent:'center', alignItems:'center'}} onClick={(e) => {e.stopPropagation(); this.props.onprev()}}><img src={require('./previous.png')} style={{width:'60px'}} /></div>
        <div style={{width:'500px', height:'500px', backgroundColor:'white', borderRadius:'5px'}} onClick={(e) => {e.stopPropagation()}}>
            <div> {this.props.selectedImage} </div>
        </div>
        <div style={{left:'20px', position:'relative', padding:'10px', display:'flex', justifyContent:'center', alignItems:'center'}} onClick={(e) => {e.stopPropagation(); this.props.onNext()}}><img src={require('./next.png')} style={{width:'60px'}} /></div>


      </div>
    )
  }
}
