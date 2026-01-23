import { get, merge } from "lodash-es";

export const save = ({
  data,
  values,
  setAttr,
  afterSet,
}: {
  data: any;
  values: any;
  setAttr: (attr: string, value: any) => void;
  afterSet?: (attr: string) => void;
}) => {
  for (const attr in values) {
    const original = get(data, attr);
    const value = get(values, attr);
    if (original !== value) {
      setAttr(attr, value);
      afterSet?.(attr);
    }
  }
};

export const load = ({ data, values }: { data: any; values: any }) => {
  return merge(data, values);
};

export const checkAttrs = (attrs: string[], attr: string) => {
  if (attrs && attrs.length > 0) {
    return attrs.includes(attr);
  }
  return true;
};

export const pickAttrs = (attrs: string[], getAttr: (attr: string) => void) => {
  return attrs.reduce((picked: any, attr: string) => {
    return {
      ...picked,
      [attr]: getAttr(attr),
    };
  }, {});
};
