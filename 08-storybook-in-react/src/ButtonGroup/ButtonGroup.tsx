/** @jsx jsx */
import { jsx, css } from '@emotion/core'

export type ButtonGroupProps = {
  /** 버튼을 보여줄 방향 */
  direction: 'row' | 'column'

  /** 버튼을 우측에 보여줍니다 */
  rightAlign?: boolean

  /** 버튼과 버튼사이의 간격을 설정합니다 */
  gap: number | string

  /** 버튼 그룹에서 보여줄 버튼들 */
  children: React.ReactNode

  /** 스타일을 수정하고자 할 때 사용 */
  className?: string
}

const ButtonGroup = ({
  direction,
  rightAlign,
  children,
  gap,
  className,
}: ButtonGroupProps) => {}
