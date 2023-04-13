import {useEffect, useRef} from "react"
import {AppDispatch, AppState} from "../types"
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux"

export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector
