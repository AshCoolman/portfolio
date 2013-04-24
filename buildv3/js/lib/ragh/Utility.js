var ragh = ragh ? ragh : {};
ragh.chooseOne = ragh.one = function (options) {
	return options[Math.round(options.length * Math.random() - 0.5)];
}