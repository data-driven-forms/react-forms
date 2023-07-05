export const urlFormatter = (initPath) => {
  const url = process.env.NEXT_PUBLIC_VERCEL_URL;

  return `https://${url + initPath}`;
};
