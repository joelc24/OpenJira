import { FC, useContext, useMemo, DragEvent } from 'react';
import { Paper, List } from '@mui/material';
import { EntryCard, UIContext } from '../../context/ui';
import { EntryStatus } from '@/interface';
import { EntriesContext } from '../../context/entries/EntriesContext';

import styles from './EntryList.module.css'

interface Props {
    status: EntryStatus
}

export const EntryList: FC<Props> = ({ status }) => {

    const { entries, updateEntry } = useContext(EntriesContext)
    const { isDragging, endDraggin } = useContext(UIContext)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const entriesByStatus = useMemo(() => entries.filter(entry => entry.status === status), [entries])
    
    const allowDrop = (event:DragEvent<HTMLDivElement>) =>{
        event.preventDefault()
    }

    const onDropEntry = (event:DragEvent<HTMLDivElement>)=>{
        const id = event.dataTransfer.getData('text')

        const entry = entries.find(e => e._id === id)!
        entry.status = status
        updateEntry(entry)
        endDraggin()
    }


  return (
    <div 
        onDrop={onDropEntry}
        onDragOver={allowDrop} 
        className={ isDragging ? styles.dragging : '' }
    >
        <Paper sx={{ height: 'calc(100vh - 180px)', overflow: 'scroll', backgroundColor: 'transparent', padding: '3px 5px' }}>
            <List sx={{ opacity: isDragging ? .2 : 1, transition: 'all .3s' }}>
                {
                    entriesByStatus.map(entry => (
                        <EntryCard key={ entry._id } entry={entry}/>
                    ))
                }
            </List>
        </Paper>
    </div>
  )
}
