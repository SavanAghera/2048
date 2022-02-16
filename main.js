const mainDiv = document.getElementById('main');
mainDiv.style.width = '400px';
mainDiv.style.height = '400px';
let data = [
    [0, 0, 0, 0],
    [0, 2, 0, 0],
    [0, 0, 0, 0],
    [0, 2, 2, 4]
];
const temp = [0, 0, 0, 0]
function renderDiv() {
    for (let i = 0; i < 4; i++) {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'row-div'
        mainDiv.appendChild(rowDiv);
        for (let j = 0; j < 4; j++) {
            const subDiv = document.createElement('div');
            subDiv.className = 'cell-div'
            subDiv.id = `cell_${i}_${j}`;
            rowDiv.appendChild(subDiv);
        }
    }
}
function renderData() {
    let isBlockAdded = false;
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if(data[i][j] === 0 && !isBlockAdded) {
                data[i][j] = 2;
                isBlockAdded = true;
            }
            const subDiv = document.getElementById(`cell_${i}_${j}`);
            if (data[i][j] !== 0) {
                subDiv.style.backgroundColor = '#f29857'
                subDiv.innerHTML = `<span>${data[i][j]}</span>`
            }else {
                subDiv.style.backgroundColor = 'rgb(228, 159, 113)'
                subDiv.innerHTML = ''
            }        
        }
    }
}
window.addEventListener('keyup', (event) => {
    const keyCode = event.keyCode;
    if (keyCode === 37) moveLeft();
    else if (keyCode === 38) moveUp();
    else if (keyCode === 39) moveRight();
    else if (keyCode === 40) moveDown()
});

renderDiv();
renderData();
function moveLeft() {
    moveDataLeft()
    renderData();
}
function moveUp() {
    data = rotate90();
    moveDataRight();
    data = rotateNegetive90();
    renderData();
}
function moveRight() {
    moveDataRight();
    renderData();

}
function moveDown() {
    data = rotate90();
    moveDataLeft();
    data = rotateNegetive90();
    renderData();
}
function moveDataRight() {
    for (let i = 0; i < 4; i++) {
        data[i] = data[i].filter(e => e !== 0).reverse().map((v, i, arr) => {
            if (v === arr[i + 1]) {
                arr[i + 1] = 0
                return v *= 2;
            }
            else return v;
        }).reverse();
        data[i] = [...temp.slice(0, 4 - data[i].length), ...data[i]];
    }
}
function moveDataLeft() {
    for (let i = 0; i < 4; i++) {
        data[i] = data[i].map((v, i, arr) => {
            if (v === arr[i + 1]) {
                arr[i + 1] = 0
                return v *= 2;
            }
            else return v;
        }).filter(e => e !== 0);
        data[i] = [...data[i], ...temp.slice(0, 4 - data[i].length)];
    }
}
function rotate90() {
    const newData = [];
    for (let i = 0; i < 4; i++) {
        const tempArr = []
        for (let j = 3; j >= 0; j--) {
            tempArr.push(data[j][i]);
        }
        newData.push(tempArr);
    }
    return newData;

}
function rotateNegetive90() {
    const newData = [];
    for (let i = 3; i >= 0; i--) {
        const tempArr = []
        for (let j = 0; j < 4; j++) {
            tempArr.push(data[j][i]);
        }
        newData.push(tempArr);
    }
    return newData
}