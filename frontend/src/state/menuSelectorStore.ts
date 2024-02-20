import { create } from "zustand"

interface MenuSelector {
  isFetchingOn: boolean
  isQueueOpen: boolean
  isSettingsOpen: boolean
}

type MenuSelectorStore = {
  state: MenuSelector
  getIsFetchingOn: () => boolean
  setIsFetchingOn: (newValue: boolean) => void
  toggleIsFetchingOn: () => void

  getIsQueueOpen: () => boolean
  setIsQueueOpen: (newValue: boolean) => void
  toggleIsQueueOpen: () => void

  getIsSettingsOpen: () => boolean
  setIsSettingsOpen: (newValue: boolean) => void
  toggleIsSettingsOpen: () => void
}

const useMenuSelectorStore = create<MenuSelectorStore>((set, get) => ({
  state: {
    isFetchingOn: true,
    isQueueOpen: false,
    isSettingsOpen: false,
  },

  getIsFetchingOn: () => get().state.isFetchingOn,
  setIsFetchingOn: (newValue) =>
    set({
      state: {
        ...get().state,
        isFetchingOn: newValue,
      },
    }),
  toggleIsFetchingOn: () =>
    set({
      state: {
        ...get().state,
        isFetchingOn: !get().state.isFetchingOn,
      },
    }),

  getIsQueueOpen: () => get().state.isQueueOpen,
  setIsQueueOpen: (newValue) =>
    set({
      state: {
        ...get().state,
        isQueueOpen: newValue,
      },
    }),
  toggleIsQueueOpen: () =>
    set({
      state: {
        ...get().state,
        isQueueOpen: !get().state.isQueueOpen,
      },
    }),

  getIsSettingsOpen: () => get().state.isSettingsOpen,
  setIsSettingsOpen: (newValue) =>
    set({
      state: {
        ...get().state,
        isSettingsOpen: newValue,
      },
    }),
  toggleIsSettingsOpen: () =>
    set({
      state: {
        ...get().state,
        isSettingsOpen: !get().state.isSettingsOpen,
      },
    }),
}))

export default useMenuSelectorStore
