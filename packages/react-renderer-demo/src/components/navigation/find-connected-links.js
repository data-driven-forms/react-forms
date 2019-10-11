const findConnectedLinks = (pathname, navSchema) => navSchema.find(({ link }) => pathname.replace(/^\//, '') === link);

export default findConnectedLinks;
