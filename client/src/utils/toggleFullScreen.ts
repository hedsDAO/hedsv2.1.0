const toggleFullScreen = () => {
	var el = document.getElementById("full-screenVideo");
	if (el?.requestFullscreen) {
		el?.requestFullscreen();
		// @ts-ignore
	} else if (el?.msRequestFullscreen) {
		// @ts-ignore
		el?.msRequestFullscreen();
		// @ts-ignore
	} else if (el?.mozRequestFullScreen) {
		// @ts-ignore
		el?.mozRequestFullScreen();
		// @ts-ignore
	} else if (el?.webkitRequestFullscreen) {
		// @ts-ignore
		el?.webkitRequestFullscreen();
	}
};

export { toggleFullScreen };
