// function to generate a short UUID
export const createShortUUID = () => {
	return Math.random().toString(36).slice(-8);
};
