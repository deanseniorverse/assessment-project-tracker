import { twMerge } from "tailwind-merge";
import { isEmpty, get } from "lodash-es";

export type Styles = {
  [key: string]: any | { [key: string]: any } | undefined;
};

export type Selected = {
  [key: string]: string | undefined;
};

export type VariantOverride = {
  [variant: string]:
    | {
        [type: string]: {
          [values: string]: {
            [key: string]: any | undefined;
          };
        };
      }
    | any
    | undefined;
};

export interface Variants {
  [key: string]: VariantOverride;
  // variants param reserved for the variant override
}

export type StyleVariant = (
  classNames: string, // style's classes
  name: string, // style's name
  variants?: Variants, // style's variants
  overrides?: string
) => string;

export type ValueVariant = (
  defaults: any,
  name: string, // values's name
  variants?: Variants // style's variants
) => string | any;

export interface CreateVariantsProp {
  // style variants like container, button, etc
  styles?: Styles;
  // selected variants like { theme: "primary", size: "large" }
  selected?: Selected;
  // if you want to override the selected for certain conditions like error state
  overrides?: Selected;
}

export const createVariants = ({
  styles = {},
  selected = {},
  overrides = {},
}: CreateVariantsProp) => {
  const selectedVariants = { ...selected, ...overrides };
  const className: StyleVariant = (
    classNames,
    name,
    variants = {},
    overrides = ""
  ) => {
    let result: string = classNames || "";
    // set variant classes
    result = twMerge(
      processVariants({
        starting: result,
        selectedVariants,
        variants,
      })
    );
    const styleOverride = get(styles, name);
    if (styleOverride) {
      result = twMerge(`${result} ${styleOverride}`);
    }
    if (overrides) {
      result = twMerge(`${result} ${overrides}`);
    }
    return result;
  };
  // value variants
  const value: ValueVariant = (defaults, name, variants = {}) => {
    let result: any = defaults;
    // set variant classes
    result = processVariants({
      starting: result,
      selectedVariants,
      variants,
      disableMerge: true,
    });
    const styleOverride = get(styles, name);
    if (styleOverride) {
      result = styleOverride;
    }
    return result;
  };
  return { className, cn: className, value, selectedVariants };
};

const processVariants = ({
  starting,
  variants,
  selectedVariants,
  disableMerge = false,
}: any) => {
  let result: any = starting;

  function handleMerge(current: any, override: any) {
    if (disableMerge) {
      return override;
    } else {
      return `${current || ""} ${override}`;
    }
  }

  for (const variantName in variants) {
    const selectedVariant = selectedVariants?.[variantName];
    if (typeof selectedVariant !== "undefined") {
      const otherVariants = Object.keys(selectedVariants).filter(
        (v: string) => v !== variantName
      );
      const variantValues = variants?.[variantName];
      // variant overrides { ..., variants: { type: { circle: { xs: "h-6 w-6", lg: "h-10 w-10" }}}}
      const customVariants: any = variantValues?.variants;
      const variantOverrideExist = otherVariants
        .map((v: string) => {
          const otherSelectedValue = selectedVariants?.[v];
          if (typeof otherSelectedValue !== "undefined") {
            return customVariants?.[v]?.[otherSelectedValue]?.[selectedVariant];
          }
        })
        .filter((value: any) => !!value)
        .join(" ");
      if (!isEmpty(variantOverrideExist)) {
        result = handleMerge(result, variantOverrideExist);
      } else {
        const variant = variantValues?.[selectedVariant];
        if (typeof variant !== "undefined") {
          result = handleMerge(result, variant);
        }
      }
    }
  }
  return result;
};
