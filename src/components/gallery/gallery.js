import styles from './gallery.scss'
import React, { Component } from 'react'
import colorPulse from '../../lib/color'
import Modal from '../modal/modal'
const flickrRoute = 'https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=d41e0adfda7ef838087d4005ec9c4163&user_id=133508911%40N08&format=json&nojsoncallback=1'


export default class Gallery extends Component {
  constructor(props) {
    super(props)
    this.state = {
      photoUrls: [],
      selectedImageIndex: null,
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
      console.log(JSON.stringify(data, null, 4))

      const photo = data.photos.photo
      let urls = photo.map(photo => `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`)
      this.setState({photoUrls: urls})
      // console.log(JSON.stringify(data, null, 4))
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
  componentWillReceiveProps(prevProps, nextProps) {
    console.log('willreceiveprops' + JSON.stringify(prevProps, null, 4))
    // this.fetchPhotos()
  }

  componentWillUnmount() {
    this.willUnmount = true
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
  getCell(url, key) {
    let cellStyle = key == this.state.hoveredID ? { backgroundColor:'rgb(240, 236, 236)' } : {}
    return <img src={url} style={{ ...this.getColorStyle(this.state.color), ...cellStyle , ...{ margin:'10px 0px', maxWidth:'100%'}}} key={key} onClick={() => {
      this.setState({
        selectedImageIndex: key
      })
    }} />
  }
  getColorStyle(rgbVector = [0,0,0]) {
    return { boxShadow: `5px 5px 5px rgb(${rgbVector.join(',')})` }
  }

  render() {
    return <div className={styles.gallery}>
    <Modal selectedImage={this.state.photoUrls[this.state.selectedImageIndex]} onExit={() => {
      this.setState({
        selectedImageIndex: null
      })
    }}
    onNext={() => {
      if(this.state.selectedImageIndex != null) {
        this.setState({ selectedImageIndex: (this.state.selectedImageIndex + 1 + this.state.photoUrls.length) % this.state.photoUrls.length })
      }
    }}
    onPrev={() => {
      if(this.state.selectedImageIndex != null) {
        this.setState({ selectedImageIndex: (this.state.selectedImageIndex - 1 + this.state.photoUrls.length) % this.state.photoUrls.length })
      }
    }}
    />
    {
      this.state.photoUrls.map((url, index) => this.getCell(url, index))
    }
    </div>
  }
}
