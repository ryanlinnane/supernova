
//returns a generator that yields current color state
export default function color(colorList) {

  //pick random color from color list
  function randomColor() {
    return colorList[Math.floor(Math.random()*colorList.length)]
  }

  function *colorPulse(start = [255, 255, 255], goal = undefined) {
    if(goal === undefined || goal === null || start[0] === goal[0] && start[1] === goal[1] && start[2] === goal[2]) {
      //pick new random
      yield * colorPulse(start, randomColor())
    }
    else {
      //move start towards goal!
      let current = []

      for(let i = 0; i < start.length; i++) {
        let moveTo = null
        if(start[i] - goal[i] > 0) {
          moveTo = start[i] - 1
        }
        else if(start[i] - goal[i] < 0) {
          moveTo = start[i] + 1
        }
        else {
          moveTo = start[i]
        }
        current.push(moveTo)
      }
      //if goal reached. pick new goal.
      // state[stateKey] = current
      yield current
      yield * colorPulse(current, goal)
    }
  }
  return colorPulse(undefined, [0,0,0])

}
