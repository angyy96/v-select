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
    "min-h-[52px]": isLg,
    "min-h-[44px]": isMd,
    "min-h-[32px]": isSm,
    "pt-[10px]": isLg && isLoading,
    "pt-6": isMd && isLoading,
    "pt-2": isSm && isLoading,
    "rounded-[8px]": isLg || isMd,
    "rounded-[6px]": isSm,
    "text-base": isLg || isMd,
    "text-sm": isSm,
    "border-grey-200": !isDisabled && !hasError,
    "hover:border-grey-400": !isDisabled && !hasError && !isLoading,
    "focus-within:border-sky-500": !isDisabled && !hasError && !isLoading,
    "active:border-sky-500": !isDisabled && !hasError && !isLoading,
    "bg-white": !isDisabled && !isLoading,
    "bg-slate-100": isDisabled || isLoading,
    "text-grey-150": isDisabled || isLoading,
    "border-orange-500": !isDisabled && hasError,
    "cursor-text": !isLoading && !disabled,
    "cursor-wait": isLoading,
    "cursor-not-allowed": Boolean(disabled),
    "border-solid": true,
    "box-border": true,
    "px-3": isSm,
    "px-6": isMd || isLg,
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
    "py-3": isSm,
    "px-6": isSm || isMd || isLg,
    "py-4": isMd || isLg,

    "text-sm": isSm,
    "leading-5": isSm,
    "text-base": isMd || isLg,
    "leading-6": isMd || isLg,
  }
}
