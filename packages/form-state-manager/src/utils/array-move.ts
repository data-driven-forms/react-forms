/**
 * Source
 * https://stackoverflow.com/questions/5306680/move-an-array-element-from-one-array-position-to-another
 */

const arrayMove = (arr: any[], from: number, to: number): any[] => {
  const copy = [...arr];
  if (to >= copy.length) {
    let k = to - copy.length + 1;
    while (k--) {
      copy.push(undefined);
    }
  }

  copy.splice(to, 0, copy.splice(from, 1)[0]);
  return copy;
};

export default arrayMove;
