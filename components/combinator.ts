interface SelectClassInput {
  disabled: boolean
  isOpened: boolean
  readonly: boolean
}

export const useSelectInputClass = ({
  disabled,
  isOpened,
  readonly,
}: SelectClassInput): Record<string, boolean> => {
  return {
    "cursor-pointer": !disabled && !readonly,
    "cursor-not-allowed": disabled,
    "cursor-default": readonly && !disabled,
    "is-opened": isOpened,
  }
}

export enum InputSizes {
  lg = "lg",
  md = "md",
  sm = "sm",
}

interface InputFlags {
  size?: InputSizes | ""
  disabled?: boolean
  readonly?: boolean
  error?: boolean | string
  loading?: boolean
}

export function useInputClass({
  size,
  disabled,
  error,
}: InputFlags): Record<string, boolean> {
  const isLg = size === "lg"
  const isMd = size === "md"
  const isSm = size === "sm"
  const isDisabled = Boolean(disabled)
  const isLoading = false
  const hasError = !!error

  return {
    "min-h-52": isLg,
    "min-h-44": isMd,
    "min-h-32": isSm,
    "pt-10": isLg && isLoading,
    "pt-6px": isMd && isLoading,
    "pt-2px": isSm && isLoading,
    "rounded-8": isLg || isMd,
    "rounded-6": isSm,
    "text-base": isLg || isMd,
    "text-sm": isSm,
    "border-grey-200": !isDisabled && !hasError,
    "hover:border-grey-400": !isDisabled && !hasError && !isLoading,
    "focus-within:border-blue": !isDisabled && !hasError && !isLoading,
    "active:border-blue": !isDisabled && !hasError && !isLoading,
    "bg-white": !isDisabled && !isLoading,
    "bg-grey-100": isDisabled || isLoading,
    "border-grey-150": isDisabled || isLoading,
    "border-orange": !isDisabled && hasError,
    "cursor-text": !isLoading && !disabled,
    "cursor-wait": isLoading,
    "cursor-not-allowed": Boolean(disabled),
    "border-solid": true,
    "box-border": true,
  }
}

interface SelectClassOptions {
  size: InputSizes
}

export const useSelectItemClass = ({
  size,
}: SelectClassOptions): Record<string, boolean> => {
  const isMd = size === "md"
  const isSm = size === "sm"
  const isLg = size === "lg"

  return {
    "py-6": isSm,
    "px-12": isSm || isMd || isLg,
    "py-10": isMd || isLg,

    "text-sm": isSm,
    "leading-5": isSm,
    "text-base": isMd || isLg,
    "leading-6": isMd || isLg,
  }
}
