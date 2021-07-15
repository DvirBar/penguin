import './App.css';
import { useState } from 'react';

const arr  = [1, 4, 5, 6, 5, 6, 5, 4, 1]

function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}

function initArr() {
  let arr = []
  for(let i = 0; i < 37; i++) {
    arr.push(false)
  }

  return arr
}

function selectBlues() {
  const arr = initArr()
  for(let i = 0; i < 19; i++) {
    let found = false
    while(!found) {
      const num = getRandomInt(36)
      if(!arr[num]) {
        arr[num] = true
        found = true
      }
    }
  }
  return arr
}

function buildBricks() {
  let blues = selectBlues()
  let rows = []
  let counter = 0
  for(let numCells of arr) {
    let cells = []
    for(let i = 0; i < numCells; i++) {
      counter ++
      cells.push(
        <div className={`cell ${blues[counter] ? "" : "blue"}`}  />
      )
    }

    rows.push(
      <div className="row">
        {cells}
      </div>
    )
  }

  return rows
}

function roll() {
  let numbers = [
    {
      min: 0,
      max: 6,
      num: 0
    },
    {
      min: 7,
      max: 40,
      num: 1
    },
    {
      min: 41,
      max: 56,
      num: 2
    },
    {
      min: 57,
      max: 63,
      num: 3
    },
    {
      min: 63,
      max: 66,
      num: 4
    }
  ]

  function setNum() {
    const randomNum = getRandomInt(66)
    for(let item of numbers) {
      if(randomNum >= item.min && randomNum <= item.max) {
        return item.num
      }
    }
  }
  const numGray = setNum()
  const numBlue = setNum()

  return {
    numGray,
    numBlue
  }
}

function buildRolls() {
  const {
    numGray,
    numBlue
  } = roll()
  let blocks = []
  // Build gray
  if(numGray === 0 && numBlue === 0) {
    blocks.push(
      <div className="empty_block">
        &#x1F600;	
      </div>
    )
  }

  else {
    for(let i = 0; i < numGray; i++) {
      blocks.push(
        <div className="cell" />
      )
    }

    for(let i = 0; i < numBlue; i ++) {
      blocks.push(
        <div className="cell blue" />
      )
    }
  }

  return blocks
}

function App() {
  const [rows, setRows] = useState(buildBricks())
  const [rolls, setRolls] = useState([])
  const [containerId, setContainerId] = useState("")


  function onButtonClick() {
    setRolls(buildRolls())
    setContainerId("active")
    setTimeout(() => {
      setContainerId("")
    }, 1000)
  }
  return (
    <div className="App">
      <div className="container">
        {rows}
        <button onClick={() => setRows(buildBricks())}>
          שינוי
        </button>
      </div>
      <div className="container"> 
        <button onClick={onButtonClick}>
          הגרלה
        </button>
        {rolls.length === 0
        ? <div className="instructions">לחצו על הגרלה!</div>
        : <div className={`bricks_container ${containerId}`}> 
          {rolls}
        </div>
        }
      </div>
    </div>
  );
}

export default App;
