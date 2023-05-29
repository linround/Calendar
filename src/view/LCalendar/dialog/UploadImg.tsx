import Dialog from '@mui/material/Dialog'
import style from './upload.module.less'
import React, {
  ChangeEvent, useRef, useState
} from 'react'
import { byteToKb } from '../utils/unitConversion'
import SvgIcon from '../../../components/SvgIcon'

export interface IProps {
  open: boolean
  setOpen: (arg:boolean) => void
}

export function UploadImg(prop:IProps) {
  const { open, setOpen, } = prop
  const ref = useRef<HTMLInputElement>(null)
  const [url, setUrl] = useState<string>('')
  const [imgName, setName] = useState<string>('')
  const [imgSize, setSize] = useState<string>('')
  const handleSelectFile = () => {
    ref.current!.click()
  }
  const onChange = (v:ChangeEvent<HTMLInputElement>) => {
    const file = v.target.files![0]
    const url = URL.createObjectURL(file)
    const name = file.name
    const size = file.size
    setUrl(url)
    setName(name)
    setSize(byteToKb(size))
    console.log(url)
  }
  const onDelete = () => {
    URL.revokeObjectURL(url)
    setUrl('')
    ref.current!.value = ''
  }
  return (
    <Dialog open={open} className={style.dialog} onClose={() => setOpen(false)}>
      <div className={style.container}>
        <div onClick={handleSelectFile} className={style.button} title={'选择图片'}>
          <SvgIcon iconName='image' /> 点击上传图片
        </div>
        <div className={style.imgContainer} style={url ? {} : { display: 'none', }}>
          <div className={style.imgInfo}>
            <div className={style.imgInfoLeft}>
              <div className={style.imgName}>{imgName}</div>
              <div className={style.imgSize}>{imgSize} KB</div>
            </div>
            <div className={style.imgInfoRight} onClick={onDelete} title={'删除照片'}>
              <SvgIcon iconName='popover_x' />
            </div>
          </div>
          <img src={url} className={style.img}/>
        </div>
        <input
          onChange={onChange}
          multiple={false}
          style={{ display: 'none', }}
          accept={'image/png,image/jpeg'}
          ref={ref}
          type={'file'} />
      </div>
    </Dialog>
  )
}
