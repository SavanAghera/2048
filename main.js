const mainDiv = document.getElementById('main');
const score = document.getElementById('score');
mainDiv.style.width = '400px';
mainDiv.style.height = '400px';
let data = []
const temp = [0, 0, 0, 0]
function renderDiv() {
    data = [
        [0, 0, 0, 0],
        [0, 2, 0, 0],
        [0, 0, 0, 0],
        [0, 2, 2, 4]
    ]
    mainDiv.innerHTML = '';
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
            if (data[i][j] === 0 && !isBlockAdded) {
                data[i][j] = 2;
                isBlockAdded = true;
            }
            const subDiv = document.getElementById(`cell_${i}_${j}`);
            if (data[i][j] !== 0) {
                subDiv.style.backgroundColor = shadeColor('#FF9E00', -data[i][j])
                subDiv.innerHTML = `<span>${data[i][j]}</span>`
            } else {
                subDiv.style.backgroundColor = 'rgb(228, 159, 113)'
                subDiv.innerHTML = ''
            }
        }
    }
    if (!isBlockAdded) {
        alert('game over');
        renderDiv();
        renderData();
    }
}
function shadeColor(color, weight) {
    let num = parseInt(color.slice(1),16),
    amt = Math.round(0.5 * weight),
    R = (num >> 16) + amt,
    B = (num >> 8 & 0x00FF) + amt,
    G = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (B<255?B<1?0:B:255)*0x100 + (G<255?G<1?0:G:255)).toString(16).slice(1);
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
                arr[i + 1] = 0;
                score.innerText = score.innerText *1 + v*2;
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
                score.innerText = score.innerText *1 + v*2;
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
