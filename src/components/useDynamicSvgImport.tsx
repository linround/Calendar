import React, {
  useEffect, useRef, useState
} from 'react'
export function useDynamicSvgImport(iconName:string) {
  const importedIconRef = useRef<React.FC<React.SVGProps<SVGElement>>>()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<unknown>()
  useEffect(() => {
    setLoading(true)
    const importSvgIcon = async ():Promise<void> => {
      try {
        importedIconRef.current = (await import(`@/src/assets/svg/${iconName}.svg`)).ReactComponent
      } catch (err) {
        setError(err)
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    importSvgIcon()
      .then()
  }, [iconName])
  return { error, loading, SvgIcon: importedIconRef.current, }
}
