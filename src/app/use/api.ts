export const fetchMessage = async (): Promise<string> => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (Math.random() < 0.5) {
				reject(new Error("An error occurred!"));
			} else {
				resolve("Hello, Suspense!");
			}
		}, 2000);
	});
};
