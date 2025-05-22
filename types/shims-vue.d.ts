declare module '*.scss' {
  const scss: Record<string, string>
  export default scss
}
declare module '*.css' {
  const content: Record<string, string>
  export default content
}
declare module '*.png' {
  const png: string
  export default png
}
declare module '*.svg' {
  const svg: string
  export default svg
}
declare module '*.svg?component' {
  const svgComponent: string
  export default svgComponent
}
