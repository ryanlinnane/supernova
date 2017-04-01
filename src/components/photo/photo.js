import styles from './photo.scss'
import React, { Component } from 'react'
import colorPulse from '../../lib/color'
import Modal from './modal/modal'
const flickrRoute = 'https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=d41e0adfda7ef838087d4005ec9c4163&user_id=133508911%40N08&format=json&nojsoncallback=1'
import Scroll from '../scroll'

export default class Photo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      photoData: [],
      selectedImageIndex: null,
      selectedImageWidth: null
    }
    this.willUnmount = false
    this.colorStep = this.colorStep.bind(this)
    this.fetchPhotos = this.fetchPhotos.bind(this)
  }
  fetchPhotos() {
    this.props.pushLoading('gallery')
    fetch(flickrRoute).then(response => {
      return response.json()
    })
    .then(data => {
      const photo = data.photos.photo
      let photoData = photo.map(photo => {
         let url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`
         photo.url = url
         return photo
      })
      console.dir(data.photos)
      this.setState({photoData})
      this.props.removeLoading('gallery')
    })
    .catch(err => {
      console.error(err)
      this.props.removeLoading('gallery')
    })
  }
  componentWillMount() {
    this.fetchPhotos()
  }
  componentWillReceiveProps(prevProps, nextProps) { }
  componentWillUnmount() {
    this.willUnmount = true
    this.props.removeLoading('gallery')
  }
  componentDidMount() {
    let colorGenerator = colorPulse([[0,0,0], [255,255,255],  [1, 167, 184], [34, 218, 212]])
    this.colorStep(colorGenerator)
  }
  colorStep(colorGenerator) {
    const { done, value } = colorGenerator.next()
    if(done) {
      throw new Error('generator stopped!')
    }
    if(this.willUnmount) {
      return
    }
    this.setState({
      color: value
    })
    requestAnimationFrame(() => this.colorStep(colorGenerator))
  }
  getCell(data, key) {
    let cellStyle = key == this.state.hoveredID ? { backgroundColor:'rgb(240, 236, 236)' } : {}
    let reference = null;
    return <div style={{color:'white', maxWidth:'480px'}} key={key}>
      { data.title != "" ? <div style={{marginTop:'10px', fontSize:'28px'}}> { data.title.toUpperCase() } </div> : null }
      <img src={data.url} ref={(r) => this.imageWidth = r} style={{ ...this.getColorStyle(this.state.color), ...cellStyle , ...{ margin:'10px 0px', maxWidth:'100%', cursor:'pointer'}}} onClick={() => {
        this.setState({
          selectedImageIndex: key,
          selectedImageWidth: this.imageWidth.clientWidth
        })
      }} />
    </div>
  }
  getColorStyle(rgbVector = [0,0,0]) {
    return { boxShadow: `5px 5px 5px rgb(${rgbVector.join(',')})` }
  }
  render() {
    return <div className={styles.gallery} ref={(ref) => this.container = ref}>
    <Modal selectedImage={this.state.photoData[this.state.selectedImageIndex]} defaultWidth={this.state.selectedImageWidth}
      onExit={() => {
        this.setState({
          selectedImageIndex: null
        })
      }}
      onNext={() => {
        if(this.state.selectedImageIndex != null) {
          this.setState({ selectedImageIndex: (this.state.selectedImageIndex + 1 + this.state.photoData.length) % this.state.photoData.length })
        }
      }}
      onPrev={() => {
        if(this.state.selectedImageIndex != null) {
          this.setState({ selectedImageIndex: (this.state.selectedImageIndex - 1 + this.state.photoData.length) % this.state.photoData.length })
        }
      }}
    />
    {
      this.state.photoData.map((data, index) => this.getCell(data, index))
    }
    {
      this.state.photoData.length > 0 ? (
        <Scroll container={this.container}/>
    ) : null
    }
    </div>
  }
}
