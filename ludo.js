let MAP = {};
["R", "G", "B", "Y"].forEach(clr => {
	for (let i=0; i<13; i++) {MAP[clr + i] = {
		occupants: [],
		safety: !(i%8)
	}
	switch (clr) {
		case "R": {
			MAP[clr + i].row = i<5 ? 7 : (i<11 ? 11-i : 1);
			MAP[clr + i].col = i<5 ? 2+i : (i<11 ? 7 : i-3);
			break;
		}
		case "G": {
			MAP[clr + i].row = i<5 ? 2+i : (i<11 ? 7 : i-3);
			MAP[clr + i].col = i<5 ? 9 : (i<11 ? i+5 : 15);
			break;
		}
		case "Y": {
			MAP[clr + i].row = i<5 ? 9 : (i<11 ? i+5 : 15);
			MAP[clr + i].col = i<5 ? 14-i : (i<11 ? 9 : 19-i);
			break;
		}
		case "B": {
			MAP[clr + i].row = i<5 ? 14-i : (i<11 ? 9 : 19-i);
			MAP[clr + i].col = i<5 ? 7 : (i<11 ? 11-i : 1);
			break;
		}
	}}
})

document.getElementById("init-button").onclick = () => {
	let container = document.createElement("div");
	container.id = "ludo-container";
	for (let locn in MAP) {
		MAP[locn].elm = document.createElement("div");
		MAP[locn].elm.id = locn;
		MAP[locn].elm.className = "tile";
		MAP[locn].elm.innerHTML = locn;
		MAP[locn].elm.style.gridRow = MAP[locn].row;
		MAP[locn].elm.style.gridColumn = MAP[locn].col;
		MAP[locn].elm.style.backgroundColor = ["red", "green", "blue", "yellow"].find(color => color[0].toUpperCase() === locn[0]);
		container.appendChild(MAP[locn].elm);
	}
	document.body.appendChild(container);
}