const findConnectedLinks = (pathname, navSchema) => {
  const partials = pathname.split('/').filter(partial => partial !== '');
  let links = {};
  partials.forEach(partial => {
    let field = navSchema.reduce((acc, curr) => {
      let data = [ ...acc, curr ];
      if (curr.fields) {
        data = [ ...data, ...curr.fields ];
      }

      return data;
    }, []).find(({ link, component }) => link === partial || component === partial);
    if (field) {
      links = {
        prev: field.prev,
        next: field.next,
      };
    }
  });
  return links;
};

export default findConnectedLinks;
