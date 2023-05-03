import { UIState } from "./"

type UIActionType = 
| { type: 'UI - Open Sidebar' }
| { type: 'UI - Close Sidebar' }
| { type: 'UI - set AddingEntry', payload: boolean }
| { type: 'UI - Start Draggin', payload: boolean }
| { type: 'UI - End Draggin', payload: boolean }

export const uiReducer = (state: UIState, action: UIActionType): UIState => {

    switch (action.type) {
        case 'UI - Open Sidebar':
            
            return {
                ...state,
                sidemenuOpen: true
            };
        case 'UI - Close Sidebar':
            return {
                ...state,
                sidemenuOpen: false
            }
        case 'UI - set AddingEntry':
            return {
                ...state,
                isAddingEntry: action.payload
            }
        case 'UI - Start Draggin':
            return {
                ...state,
                isDragging: true
            }
        case 'UI - End Draggin':
            return {
                ...state,
                isDragging: false
            } 
        default:
            return state;
    }
}


