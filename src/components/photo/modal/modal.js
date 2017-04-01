import React, { Component } from 'react'
import styles from './modal.scss'
export default class Modal extends Component {
  constructor(props) {
    super(props)
    this.state = { isMouseOver: false }
  }

  handleKey(e) {
    switch(e.keyCode) {
      case 37:
        this.props.onPrev()
        break
      case 39:
        this.props.onNext()
        break
      case 27:
        this.props.onExit()
        break
      default:
        break;
    }
  }
  componentDidMount() {

    // console.log('preview', this.preview)
    // console.log(this.refs)
    window.addEventListener('keydown', this.handleKey.bind(this))
    // console.log(this.refs.img.getBoundingClientRect().width)
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKey.bind(this))
  }
  render() {
    if(this.props.selectedImage == null) {
        return null
    }
    let leftArrowStyles = {left:'0px', opacity:'0.5', top:'calc(50% - 30px)', position:'absolute',padding:'5px', display:'flex', justifyContent:'center', alignItems:'center', display:'none', cursor:'pointer'}
    let rightArrowStyles = {right:'0px',opacity:'0.5', top:'calc(50% - 30px)', position:'absolute', padding:'5px', display:'flex', justifyContent:'center', alignItems:'center', display:'none', cursor:'pointer'}
    if(this.state.isMouseOver) {
      leftArrowStyles = {...leftArrowStyles, display:'block'}
      rightArrowStyles = {...rightArrowStyles, display:'block'}
    }
    // console.dir(this.props.selectedImage)
    return (
      <div className={styles.modal} onClick={this.props.onExit} >
        <div style={{width:'auto', maxWidth:'100vw', height:'auto', borderRadius:'5px', position:'relative'}} onClick={(e) => {e.stopPropagation()}} onMouseOver={() => {this.setState({isMouseOver: true})}} onMouseLeave={() => {this.setState({isMouseOver: false})}}>
          <img src={this.props.selectedImage.url} style={{width:`${this.props.defaultWidth > 280 ? this.props.defaultWidth*2 : this.props.defaultWidth*1.75}px`, maxWidth: '100vw'}}/>
          <div style={leftArrowStyles} onClick={(e) => {e.stopPropagation(); this.props.onPrev()}}>
            <img src={require('./back-white.png')} style={{width:'60px'}} ref={(prev) => { this.preview = prev }}/>
          </div>
          <div style={rightArrowStyles} onClick={(e) => {e.stopPropagation(); this.props.onNext()}}>
            <img src={require('./next-white.png')} style={{width:'60px'}} />
          </div>
        </div>
      </div>
    )
  }
}
