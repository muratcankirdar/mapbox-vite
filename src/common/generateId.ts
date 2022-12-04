// https://stackoverflow.com/questions/6860853/generate-random-string-for-div-id

const generateId = (): string => {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
};

export default generateId;
