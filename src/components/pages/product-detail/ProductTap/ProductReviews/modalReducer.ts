export type ModalState = {
  images: string[] | null
  currentIndex: number
}

export type ModalAction =
  | { type: 'OPEN'; images: string[]; index: number }
  | { type: 'CLOSE' }
  | { type: 'PREV' }
  | { type: 'NEXT' }

export const initialModalState: ModalState = {
  images: null,
  currentIndex: 0,
}

export function modalReducer(
  state: ModalState,
  action: ModalAction,
): ModalState {
  switch (action.type) {
    case 'OPEN':
      return { images: action.images, currentIndex: action.index }
    case 'CLOSE':
      return { images: null, currentIndex: 0 }
    case 'PREV':
      if (!state.images) return state
      return {
        ...state,
        currentIndex:
          state.currentIndex === 0
            ? state.images.length - 1
            : state.currentIndex - 1,
      }
    case 'NEXT':
      if (!state.images) return state
      return {
        ...state,
        currentIndex:
          state.currentIndex === state.images.length - 1
            ? 0
            : state.currentIndex + 1,
      }
  }
}
