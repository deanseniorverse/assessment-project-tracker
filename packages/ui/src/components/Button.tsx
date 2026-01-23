import { Pressable, Text, View, ActivityIndicator } from "react-native";
import {
  createVariants,
  Styles,
  Selected,
} from "@packages/ui/src/utils/variants";
import { ViewVariants } from "./ViewVariants";
import { useState } from "react";

/**
 * Button - Reference implementation of the variant system
 *
 * This component demonstrates how to use createVariants and cn() to build
 * flexible, themeable components. Study this implementation to understand
 * the patterns used throughout the codebase.
 *
 * Key patterns:
 * 1. Props interface with styles and variants
 * 2. createVariants() to initialize the variant resolver
 * 3. cn() function for className composition with variant selection
 * 4. ViewVariants for state-based rendering (loading, error, content)
 */

// =============================================================================
// TYPES
// =============================================================================

export interface ButtonStyles {
  button?: string;
  text?: string;
  icon?: string;
}

export interface ButtonVariants {
  theme?: "primary" | "secondary" | "neutral" | "success" | "error";
  size?: "sm" | "base" | "lg";
  format?: "solid" | "outline" | "ghost";
}

export interface ButtonProps {
  text?: string;
  onPress?: () => void | Promise<void>;
  disabled?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  styles?: ButtonStyles;
  variants?: ButtonVariants;
  testID?: string;
}

// =============================================================================
// COMPONENT
// =============================================================================

export const Button = (props: ButtonProps) => {
  const {
    text,
    onPress,
    disabled = false,
    isLoading: isLoadingProp = false,
    loadingText,
    styles = {},
    variants = {},
    testID,
  } = props;

  const [isLoadingAsync, setIsLoadingAsync] = useState(false);
  const isLoading = isLoadingProp || isLoadingAsync;

  // Determine current view state
  const state = isLoading ? "loading" : "content";

  // Merge selected variants with defaults
  const selected: Required<ButtonVariants> = {
    theme: "neutral",
    size: "base",
    format: "solid",
    ...variants,
  };

  // Apply overrides for disabled state
  const overrides: Partial<ButtonVariants> = disabled
    ? { theme: "neutral" }
    : {};

  // Create variant resolver
  const { cn } = createVariants({ styles, selected, overrides });

  // Handle press with async support
  const handlePress = async () => {
    if (disabled || isLoading || !onPress) return;

    const result = onPress();
    if (result instanceof Promise) {
      setIsLoadingAsync(true);
      try {
        await result;
      } finally {
        setIsLoadingAsync(false);
      }
    }
  };

  return (
    <Pressable
      testID={testID}
      onPress={handlePress}
      disabled={disabled || isLoading}
      className={cn(
        // Base styles (always applied)
        "flex flex-row items-center justify-center rounded-md",
        // Style hook for external overrides
        "button",
        // Variant definitions
        {
          // Size variants
          size: {
            sm: "h-8 px-3",
            base: "h-10 px-4",
            lg: "h-12 px-6",
          },
          // Theme + format combination variants
          format: {
            solid: "",
            outline: "border-2 bg-transparent",
            ghost: "bg-transparent",
            // Nested variants: format depends on theme
            variants: {
              theme: {
                primary: {
                  solid: "bg-blue-500 active:bg-blue-600",
                  outline: "border-blue-500",
                  ghost: "active:bg-blue-100",
                },
                secondary: {
                  solid: "bg-purple-500 active:bg-purple-600",
                  outline: "border-purple-500",
                  ghost: "active:bg-purple-100",
                },
                neutral: {
                  solid: "bg-gray-500 active:bg-gray-600",
                  outline: "border-gray-500",
                  ghost: "active:bg-gray-100",
                },
                success: {
                  solid: "bg-green-500 active:bg-green-600",
                  outline: "border-green-500",
                  ghost: "active:bg-green-100",
                },
                error: {
                  solid: "bg-red-500 active:bg-red-600",
                  outline: "border-red-500",
                  ghost: "active:bg-red-100",
                },
              },
            },
          },
        },
        // Additional override based on disabled state
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      )}
    >
      <ViewVariants
        current={state}
        views={{
          loading: (
            <View className="flex flex-row items-center gap-2">
              <ActivityIndicator
                size="small"
                color={selected.format === "solid" ? "white" : undefined}
              />
              {loadingText && (
                <Text
                  className={cn("font-medium", "text", {
                    format: {
                      solid: "text-white",
                      outline: "",
                      ghost: "",
                      variants: {
                        theme: {
                          primary: {
                            outline: "text-blue-500",
                            ghost: "text-blue-500",
                          },
                          secondary: {
                            outline: "text-purple-500",
                            ghost: "text-purple-500",
                          },
                          neutral: {
                            outline: "text-gray-500",
                            ghost: "text-gray-500",
                          },
                          success: {
                            outline: "text-green-500",
                            ghost: "text-green-500",
                          },
                          error: {
                            outline: "text-red-500",
                            ghost: "text-red-500",
                          },
                        },
                      },
                    },
                  })}
                >
                  {loadingText}
                </Text>
              )}
            </View>
          ),
          content: (
            <Text
              className={cn("font-medium", "text", {
                size: {
                  sm: "text-sm",
                  base: "text-base",
                  lg: "text-lg",
                },
                format: {
                  solid: "text-white",
                  outline: "",
                  ghost: "",
                  variants: {
                    theme: {
                      primary: {
                        outline: "text-blue-500",
                        ghost: "text-blue-500",
                      },
                      secondary: {
                        outline: "text-purple-500",
                        ghost: "text-purple-500",
                      },
                      neutral: {
                        outline: "text-gray-700",
                        ghost: "text-gray-700",
                      },
                      success: {
                        outline: "text-green-500",
                        ghost: "text-green-500",
                      },
                      error: {
                        outline: "text-red-500",
                        ghost: "text-red-500",
                      },
                    },
                  },
                },
              })}
            >
              {text}
            </Text>
          ),
        }}
      />
    </Pressable>
  );
};

export default Button;
