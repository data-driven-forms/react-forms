export const urlFormatter = (initPath) => {
  const nextEnv = process.env.NEXT_PUBLIC_VERCEL_ENV;
  const nextUrl = process.env.NEXT_PUBLIC_VERCEL_URL;
  const nextBranchUrl = process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL;

  const env = process.env.VERCEL_ENV;
  const url = process.env.VERCEL_URL;
  const branchUrl = process.env.VERCEL_BRANCH_URL;

  console.log(`NEXT_PUBLIC_VERCEL_ENV= ${nextEnv}, NEXT_PUBLIC_VERCEL_URL= ${nextUrl}, NEXT_PUBLIC_VERCEL_BRANCH_URL= ${nextBranchUrl}`);
  console.log(`VERCEL_ENV= ${env}, VERCEL_URL= ${url}, VERCEL_BRANCH_URL= ${branchUrl}`);

  if (env === 'preview' || nextEnv === 'preview') {
    return `https://${branchUrl + initPath}`;
  }

  return `https://${url + initPath}`;
};
