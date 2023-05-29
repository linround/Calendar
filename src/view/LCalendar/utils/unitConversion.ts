export function byteToKb(byte:number):string {
  const kb = 2 << 10
  return (byte / kb).toFixed(2)
}
