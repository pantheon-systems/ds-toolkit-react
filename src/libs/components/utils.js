// function to generate a short UUID
export const createShortUUID = () => {
	return crypto.randomUUID().substring(0, 8);
};
