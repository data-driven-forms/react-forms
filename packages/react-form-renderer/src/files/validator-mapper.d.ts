interface ValidatorMapper {
  [key: string]: (options: object) => (value: any, allValues: object) => string;
}

export default ValidatorMapper;
