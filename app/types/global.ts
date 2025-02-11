import { CSSProperties } from "react"

export interface IPageBaseProps {
  id: string
}

export interface IAssetIconProps {
  fill?: string
  width?: number
  height?: number
  style?: CSSProperties
  className?: string
}
