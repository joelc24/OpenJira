import { FC, ReactElement, useReducer } from 'react';
import { UIContext, uiReducer } from './';

export interface UIState {
    sidemenuOpen: boolean,
    isAddingEntry: boolean,
    isDragging: boolean
}

interface Props {
    children: ReactElement
}


const UI_INITIAL_STATE: UIState = {
    sidemenuOpen: false,
    isAddingEntry: false,
    isDragging: false
}


export const UIProvider : FC<Props> = ({ children }) =>{

    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)

    const openSideMenu = () =>{
        dispatch({ type: 'UI - Open Sidebar' })
    }

    const closeSideMenu = () => {
        dispatch({ type: 'UI - Close Sidebar' })
    }

    const setIsAddingEntry = (adding:boolean) =>{
        dispatch({ type: 'UI - set AddingEntry', payload: adding })
    }

    const startDraggin = () =>{
        dispatch({ type: 'UI - Start Draggin', payload: true })
    }

    const endDraggin = () =>{
        dispatch({ type: 'UI - End Draggin', payload: false })
    }

    return (
        <UIContext.Provider value={{
            ...state,

            //Methods
            openSideMenu,
            closeSideMenu,
            setIsAddingEntry,
            startDraggin,
            endDraggin
        }}>
            { children }
        </UIContext.Provider>
    )
}


