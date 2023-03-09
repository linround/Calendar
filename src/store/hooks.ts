import {
  useDispatch, useSelector, TypedUseSelectorHook
} from 'react-redux'
import { RootState, AppDispatch } from './index'

export const useAppDispatch:()=>AppDispatch = useDispatch
export const useAppSelector:TypedUseSelectorHook<RootState> = useSelector
