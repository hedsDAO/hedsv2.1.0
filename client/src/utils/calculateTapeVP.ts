// 	VP* = ((# of Owners /# of Items) * 10) Round to nearest Integer, rounding up at .5

// *Add 1 to total if # of Items is greater than 50

const calculateTapeVP = ([owners, items]: [number, number]) => {
	const greaterThan50 = items > 50 ? 1 : 0;
	return round((owners / items) * 10 + greaterThan50, 1);
};

function round(value: number, step: number) {
	step || (step = 1.0);
	var inv = 1.0 / step;
	return Math.round(value * inv) / inv;
}

export { calculateTapeVP };
