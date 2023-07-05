export const urlFormatter = (initPath) => {
  const env = process.env.NEXT_PUBLIC_VERCEL_ENV;
  const url = process.env.NEXT_PUBLIC_VERCEL_URL;
  const branchUrl = process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL;

  if (env === 'preview') {
    return `https://${branchUrl + initPath}`;
  }

  return `https://${url + initPath}`;
};
