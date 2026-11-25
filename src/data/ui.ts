import content from './content.json'

export const blurHeading = content.blurHeading as {
  readonly effect: 'blur'
  readonly 'animate-by': 'words'
  readonly direction: 'top'
  readonly 'stagger-from': 'start'
  readonly trigger: 'view'
  readonly delay: number
  readonly 'step-duration': number
  readonly blur: number
  readonly distance: number
}
