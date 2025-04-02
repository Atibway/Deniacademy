import {create} from "zustand"

type LoginCardStore ={
    isOpen: boolean;
    onOpen: ()=> void;
    onClose: ()=> void;
}

export const useLoginModal = create<LoginCardStore>((set)=> ({
    isOpen:false,
    onOpen: ()=> set({isOpen: true}),
    onClose: ()=> set({isOpen: false})
}))