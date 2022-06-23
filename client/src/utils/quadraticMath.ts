export function quadraticMath(i: any, choice: any, balance: any) {
	return Math.sqrt((percentageOfTotal(i + 1, choice, Object.values(choice)) / 100) * balance);
}

function percentageOfTotal(i: any, values: any, total: any) {
	const reducedTotal: any = total.reduce((a: any, b: any) => a + b, 0);
	const percent = (values[i] / reducedTotal) * 100;
	return isNaN(percent) ? 0 : percent;
}