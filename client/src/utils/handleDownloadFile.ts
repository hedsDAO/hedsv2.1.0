const handleDownloadFile = (downloadLink: string, fileName: string) => {
	if (downloadLink) {
		fetch(downloadLink)
			.then((resp) => resp.blob())
			.then((blob) => {
				const url = window.URL.createObjectURL(blob);
				const a = document.createElement("a");
				a.style.display = "none";
				a.href = url;
				a.download = fileName;
				document.body.appendChild(a);
				a.click();
				window.URL.revokeObjectURL(url);
			})
			.catch((err) => console.log(err));
	}
};

export { handleDownloadFile };
