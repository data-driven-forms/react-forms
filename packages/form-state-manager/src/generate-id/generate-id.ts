const generateId = (): number => Date.now() + Math.round(Math.random() * 100000);

export default generateId;
