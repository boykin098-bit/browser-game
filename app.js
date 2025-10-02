const main = document.querySelector("main")
const button = document.querySelector("button")
const cellArray = []

const generateBoard = (height,width,density) => {
    document.documentElement.style.setProperty('--grid-height', height)
    document.documentElement.style.setProperty('--grid-width', width)
    const cellSize = width * height 
    const population = cellSize * (density/100)
    // for(let bomb = 0; bomb < population; bomb++){
    //     const randomCell= Math.floor(Math.random()*cellSize)
    // }
    while(cellArray.length< population){
        const randomRow = Math.floor(Math.random()*height)
        const randomCol = Math.floor(Math.random()*width)
        if(cellArray.includes(`${randomRow},${randomCol}`)===false){
            cellArray.push(`${randomRow},${randomCol}`)
        }
        

    }

    console.log(cellArray)
    main.removeChild(button)
    for(let row =0; row < height; row ++){
        // console.log(`row: ${row}`)
        const rowElement = document.createElement('div')
        rowElement.classList.add('row')
        for(let col =0; col< width; col ++){
    
            // console.log(`col: ${col}`)
            const colElement = document.createElement('div')
            colElement.classList.add('col')
            colElement.setAttribute('row', row)
            colElement.setAttribute('col', col)
            rowElement.appendChild(colElement)
        }
        main.appendChild(rowElement)
    }
}


const cellClick = (event) => {
    const xPosition = event.target.getAttribute("col")
    const yPosition = event.target.getAttribute("row")
    console.log(event.target.getAttribute("row"))
    for(let row= yPosition-1; row <= yPosition+1; row++){
        for(let col=xPosition-1; col <= xPosition+1; col++){
            if(cellArray.includes(`${row},${col}`)){
                
                if(row ==yPosition && col ==xPosition){
                    console.log("Boom")
                    event.target.classList.add("bomb")
                } else{
                    console.log("neighboor")
                }
            }
        }
    }
    // console.log(event.target)
}


//Adding event listner to the button
button.addEventListener('click', generateBoard(10,10,15))
main.addEventListener('click',cellClick)
// Loop through the create 10 rows
// Create a row element 
// Loop through the 10 cells 
// Create new cell 
