import {create} from 'zustand'


interface StoreState{
    showLocationContainer:boolean,
    ToggleLocationContainer:()=> void
}

const useLocationHolder= create<StoreState>((set)=>({
    showLocationContainer: false,
    ToggleLocationContainer: () => set(state=>({ showLocationContainer:!state.showLocationContainer })),
}))

export default useLocationHolder