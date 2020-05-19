export const query = /\?.*/;

const findConnectedLinks = (pathname, navSchema) => navSchema.find(({ link }) => pathname.replace(/^\//, '').replace(query, '') === link);

export default findConnectedLinks;
