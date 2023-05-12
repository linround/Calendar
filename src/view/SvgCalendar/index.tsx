export function SvgCalendar() {
  return (
    <svg viewBox={'0 0 1000 1000'}
      xmlns="http://www.w3.org/2000/svg" >
      <rect x={0} y={0} width={100} height={100} fill={'blue'}></rect>
      <circle cx={0} cy={0} r={20} fill={'red'}></circle>
      <circle cx={1000} cy={0} r={20} fill={'yellow'}></circle>
      <circle cx={0} cy={1000} r={20} fill={'yellow'}></circle>
      <circle cx={1000} cy={1000} r={20} fill={'yellow'}></circle>
      <g>
        <rect x={0} y={0} ></rect>
      </g>
    </svg>
  )
}
