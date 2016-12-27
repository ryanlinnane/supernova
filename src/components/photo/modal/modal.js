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
    window.addEventListener('keydown', this.handleKey.bind(this))
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKey.bind(this))
  }
  render() {
    if(this.props.selectedImage == null) {
        return null
    }
    let leftArrowStyles = {left:'0px', opacity:'0.5', top:'calc(50% - 30px)', position:'absolute',padding:'5px', display:'flex', justifyContent:'center', alignItems:'center', display:'none'}
    let rightArrowStyles = {right:'0px',opacity:'0.5', top:'calc(50% - 30px)', position:'absolute', padding:'5px', display:'flex', justifyContent:'center', alignItems:'center', display:'none'}
    if(this.state.isMouseOver) {
      leftArrowStyles = {...leftArrowStyles, display:'block'}
      rightArrowStyles = {...rightArrowStyles, display:'block'}
    }
    return (
      <div className={styles.modal} onClick={this.props.onExit} >
        <div style={{width:'auto', height:'auto', borderRadius:'5px', position:'relative'}} onClick={(e) => {e.stopPropagation()}} onMouseOver={() => {this.setState({isMouseOver: true})}} onMouseLeave={() => {this.setState({isMouseOver: false})}}>
          <img src={this.props.selectedImage.url} style={{width:'100%'}}/>
          <div style={leftArrowStyles} onClick={(e) => {e.stopPropagation(); this.props.onPrev()}}><img src={require('./previous.png')} style={{width:'60px'}} /></div>
          <div style={rightArrowStyles} onClick={(e) => {e.stopPropagation(); this.props.onNext()}}><img src={require('./next.png')} style={{width:'60px'}} /></div>
        </div>
      </div>
    )
  }
}
