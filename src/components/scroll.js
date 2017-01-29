//reusable scroll to top component that takes into account the device size.
//as a consequence of flex, we need to take the two layout states of the app into consideration differently.
import React from 'react'
import animate from '../sass/animate.scss'
export default (props) => (
  <a onClick={
      () => {
        if(window.innerWidth >= 767) {
          props.container.scrollTop = 0
        } else {
           window.scrollTo(0,0)
        }
      }
    }
    style={{margin:'15px 0px', width:'50px', height:'40px', display:'flex', flex:'0 0 auto', justifyContent:'center', alignItems:'center'}}
  >
    <img src={require('./photo/double_up.png')} className={animate.grow}/>
  </a>
)
