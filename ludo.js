// for globally storing the dice's value
let dice_val = 0;
// ;-;
let TOKEN = {
	"locn": undefined,
	"elm": undefined
};
// making a map(?)
let MAP = {};
["R", "G", "B", "Y"].forEach(clr => {
	// normal map positions
	for (let i=0; i<13; i++) {
		MAP[clr + i] = {
			occupants: [],
			safety: !(i%8)
		};
		if (clr=="R") {
			MAP[clr + i].row = i<5 ? 7 : (i<11 ? 11-i : 1);
			MAP[clr + i].col = i<5 ? 2+i : (i<11 ? 7 : i-3);
		} else if (clr=="G") {
			MAP[clr + i].row = i<5 ? 2+i : (i<11 ? 7 : i-3);
			MAP[clr + i].col = i<5 ? 9 : (i<11 ? i+5 : 15);
		} else if (clr=="B") {
			MAP[clr + i].row = i<5 ? 9 : (i<11 ? i+5 : 15);
			MAP[clr + i].col = i<5 ? 14-i : (i<11 ? 9 : 19-i);
		} else if (clr=="Y") {
			MAP[clr + i].row = i<5 ? 14-i : (i<11 ? 9 : 19-i);
			MAP[clr + i].col = i<5 ? 7 : (i<11 ? 11-i : 1);
		}
	}
	// corridoor to ascension
	for (let i=95; i<100; i++) {
		MAP[clr + i] = {
			occupants: [],
			safety: true
		};
		if (clr=="R") {
			MAP[clr + i].row = 8;
			MAP[clr + i].col = i-93;
		} else if (clr=="G") {
			MAP[clr + i].row = i-93;
			MAP[clr + i].col = 8;
		} else if (clr=="B") {
			MAP[clr + i].row = 8;
			MAP[clr + i].col = 109-i;
		} else if (clr=="Y") {
			MAP[clr + i].row = 109-i;
			MAP[clr + i].col = 8;
		}
	}
})
function token_update() {
	let LOCN = TOKEN.locn;
	// run loop till dice val runs out to zero
	while (dice_val--) {
		// remove from the current tile
		MAP[TOKEN.locn].occupants.pop();
		MAP[TOKEN.locn].elm.removeChild(TOKEN.elm);
		// see what the next tile is
		if (TOKEN.locn === "Y11") {
			TOKEN.locn = "R95";
		} else if (~~(TOKEN.locn.slice(1,)) == 99) {
			if (dice_val) { TOKEN.locn = LOCN; } else {
				dice_val = 0;
				document.getElementById("central-end").appendChild(TOKEN.elm);
				TOKEN.elm.removeEventListener("click", token_update);
				return 60053;
			}
		} else if (~~(TOKEN.locn.slice(1,))+1 == 13) {
			TOKEN.locn = ["R", "G", "B", "Y"][(["R", "G", "B", "Y"].findIndex(elm => elm === TOKEN.locn[0])+1)%4]+"0";
		} else { TOKEN.locn = TOKEN.locn.slice(0,1) + (~~(TOKEN.locn.slice(1,))+1); }
		// send to the next tile
		MAP[TOKEN.locn].occupants.push(TOKEN.elm);
		MAP[TOKEN.locn].elm.appendChild(TOKEN.elm);
		if (TOKEN.locn === LOCN) {
			dice_val = -1;
			break;
		}
	}
	// so that dice_val becomes 0
	dice_val++;
	document.getElementById("dice-val").innerHTML = dice_val;
}
// on init button click; until then, it's a ded page ;-;
document.getElementById("init-button").onclick = () => {
	let container = document.createElement("div");
	container.id = "ludo-container";
	let end = document.createElement("div");
	end.id = "central-end";
	container.appendChild(end);
	for (let locn in MAP) {
		// placing all places on the grid
		MAP[locn].elm = document.createElement("div");
		MAP[locn].elm.id = locn;
		MAP[locn].elm.className = "tile";
		//MAP[locn].elm.innerHTML = locn;
		MAP[locn].elm.style.gridRow = MAP[locn].row;
		MAP[locn].elm.style.gridColumn = MAP[locn].col;
		MAP[locn].elm.style.backgroundColor = (locn[1]%8 && ~~(locn.slice(1,))<=90) ? "silver" : ["red", "green", "blue", "yellow"].find(color => color[0].toUpperCase() === locn[0]);
		// test case: starting at R0; will be edited to generic case or something else in the future
		if (locn == "R0") {
			let token = document.createElement("div");
			token.id = "token";
			TOKEN.locn = "R0"
			TOKEN.elm = token;
			token.addEventListener("click", token_update);
			MAP[locn].elm.appendChild(token);
			MAP[locn].occupants.push(token);
			console.log(MAP[locn]);
		}
		// and then append to the grid, of course
		container.appendChild(MAP[locn].elm);
	}
	// place the map on the page
	document.body.appendChild(container);
	// for the dice roll; it's sloppy, i know; it's also a dummy one for the moment
	container = document.createElement("div");
	container.id = "dice-container";
	let dice_btn = document.createElement("button");
	dice_btn.id = "dice-button";
	dice_btn.onclick = () => {
		dice_val = dice_val ? dice_val : Math.floor(Math.random()*6+1);
		document.getElementById("dice-val").innerHTML = dice_val;
	};
	dice_btn.innerHTML = "Roll dice";
	let value_span = document.createElement("span");
	value_span.id = "dice-val";
	value_span.innerHTML = dice_val;
	container.appendChild(dice_btn);
	container.appendChild(value_span);
	document.body.appendChild(container);
}