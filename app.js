const main = document.querySelector("main")
const button = document.querySelector("button")
const cellArray = []
let tilesClicked = 0
let boardSize = 0



const winGame = () => {
    alert(`You win!`)
    main.innerHTML = ""
    main.appendChild(button)
}

const loseGame = () => {
    alert(`You lost!`)

    for (let bomb = 0; bomb < cellArray.length; bomb++) {
        const bombPosition = cellArray[bomb].split(",")
        const xPos = bombPosition[0]
        const yPos = bombPosition[1]

        const cells = document.querySelectorAll(".col")

        cells.forEach((cell) => {
            const cellX = cell.getAttribute("col")
            const cellY = cell.getAttribute("row")
            if (cellY == yPos && cellX == xPos) {
                cell.classList.add("bomb")
            }
        });
    }

    const endButton = document.createElement("button")
    endButton.innerText = "Clear Board"
    main.appendChild(endButton)
    endButton.addEventListener('click', ()=> reset())
    function reset() {
        main.innerHTML = ""
        main.appendChild(button)
    }

}

const cellClick = (event) => {
    const xPosition = parseInt(event.target.getAttribute("col"))
    const yPosition = parseInt(event.target.getAttribute("row"))
    console.log(typeof xPosition, typeof yPosition)
    console.log(`xPosition ${xPosition}, yPosition ${yPosition}`)
    let bombCount = 0
    let alive = true
    for (let row = yPosition - 1; row <= yPosition + 1; row++) {
        for (let col = xPosition - 1; col <= xPosition + 1; col++) {
            console.log(`row: ${row}, col: ${col}, bombCount: ${bombCount}`)
            // console.log(`1.${bombCount}`)
            if (cellArray.includes(`${row},${col}`)) {
                // console.log(`2.${bombCount}`)
                bombCount++;
                // console.log(`3.${bombCount}`)
                if (row == yPosition && col == xPosition) {
                    alive = false;
                    // console.log("Boom")
                    event.target.classList.add("bomb")
                } else {
                    // console.log("neighboor")
                }
            }

        }
    }
    // console.log(`4.${bombCount}`)
    event.target.innerText = bombCount

    if (alive === true) {
        tilesClicked--;
        event.target.classList.add("clicked")
    } else {
        loseGame()
    }

    if (tilesClicked == 0 && alive == true) {
        winGame()
    }
    // console.log(event.target)
}




const generateBoard = (height, width, density) => {
    document.documentElement.style.setProperty('--grid-height', height)
    document.documentElement.style.setProperty('--grid-width', width)
    const cellSize = width * height
    const population = cellSize * (density / 100)
    boardSize = cellSize
    tilesClicked = boardSize - population
    // for(let bomb = 0; bomb < population; bomb++){
    //     const randomCell= Math.floor(Math.random()*cellSize)
    // }
    while (cellArray.length < population) {
        const randomRow = Math.floor(Math.random() * height)
        const randomCol = Math.floor(Math.random() * width)
        if (cellArray.includes(`${randomRow},${randomCol}`) === false) {
            cellArray.push(`${randomRow},${randomCol}`)
        }


    }

    // console.log(cellArray)
    main.removeChild(button)
    for (let row = 0; row < height; row++) {
        // console.log(`row: ${row}`)
        const rowElement = document.createElement('div')
        rowElement.classList.add('row')
        for (let col = 0; col < width; col++) {

            // console.log(`col: ${col}`)
            const colElement = document.createElement('div')
            colElement.classList.add('col')
            colElement.setAttribute('row', row)
            colElement.setAttribute('col', col)
            colElement.addEventListener('click', () => cellClick(event))
            rowElement.appendChild(colElement)
        }
        main.appendChild(rowElement)
    }
}





//Adding event listner to the button
button.addEventListener('click', () => generateBoard(10, 10, 15))
// main.addEventListener('click', cellClick)
// Loop through the create 10 rows
// Create a row element 
// Loop through the 10 cells 
// Create new cell 
