export function byteToKb(byte:number):string {
  const kb = 2 << 9
  return (byte / kb).toFixed(2)
}
