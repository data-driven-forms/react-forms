module.exports = () => {
  process.env.TZ = 'UTC';
  console.log('Jest Global Setup: Set timezone to UTC');
};
