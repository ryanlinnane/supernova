import React, { Component } from 'react'
import styles from './about.scss'
export default class About extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return <div className={styles.container}>

    <ul>
      <li> Programmer </li>
      <li>Moonlighting Masters Computer Science @GaTech</li>
      <li>Likes picking up heavy things and running</li>
      <li>Talent for mathematical proofs</li>
      <li>Fullstack engineer @AustinSigma startup @HoustonTexas</li>
      <li>UGA Math & CS Alumni</li>
      <li>Spirit Pokémon: Butterfree</li>
      <li>My Love: Swalem (10lb heavy)</li>
      <li>Me as a tourist</li>
      <li>Likes to stay hydrated</li>
      <li>Drinks a lot of black coffee</li>
    </ul>
    </div>
  }
}
