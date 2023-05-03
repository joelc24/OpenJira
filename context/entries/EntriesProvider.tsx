import { FC, ReactElement, useEffect, useReducer } from 'react'

import { EntriesContext, entriesReducer } from './';
import { Entry } from '@/interface';
import { entriesApi } from '@/apis';
import { useSnackbar } from 'notistack';

export interface EntriesState {
  entries: Entry[]
}

interface Props {
  children: ReactElement
}


const Entries_INITIAL_STATE: EntriesState = {
  entries: []
}


export const EntriesProvider : FC<Props> = ({ children }) =>{

const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE)
const { enqueueSnackbar } = useSnackbar()

const addNewEntry = async(description: string) =>{
    
    const { data } = await entriesApi.post('/entries',{ 
        description
    })

    dispatch({ type: '[Entry] Add-Entry', payload: data })
}

const updateEntry = async({ _id, description, status }: Entry, showSnackbar = false) =>{

    try {
        const { data } = await entriesApi.put<Entry>(`/entries/${_id}`,{ description, status })
        dispatch({ type: '[Entry] Entry-Updated', payload: data })
        if (showSnackbar) {
            enqueueSnackbar('Entrada Actualizada',{
                variant: 'success',
                autoHideDuration: 1_500,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }
            })
        }
        
    } catch (error) {
        console.log(error)
    }

}

const refreshEntries = async() =>{
    const { data } = await entriesApi.get<Entry[]>('entries')
    dispatch({ type: '[Entry] Refresh-Data', payload: data })
}

const deleteEntry = async(id:string) =>{


    try {
        const { data } = await entriesApi.delete(`/entries/${id}`)
        dispatch({ type: '[Entry] Delete-Entry', payload: id })
        enqueueSnackbar(data.message,{
            variant: 'success',
            autoHideDuration: 2_000,
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'right'
            }
        })

    } catch (error) {
        console.log(error)
    }

}

useEffect(() => {
    refreshEntries()
}, [])


return (
    <EntriesContext.Provider value={{
        ...state,

        //Methods
        addNewEntry,
        updateEntry,
        deleteEntry
    }}>
        { children }
    </EntriesContext.Provider>
)
}