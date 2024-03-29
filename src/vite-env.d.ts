/// <reference types="vite/client" />
declare module '@linround/commonapi' {
  export function getRecords(): Promise<any>
  export function addRecords(): Promise<any>
}
