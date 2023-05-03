import { DragEvent, FC, useContext } from 'react';
import { useRouter } from 'next/router';
import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material';

import { Entry } from '@/interface';
import { UIContext } from '@/context/ui/UIContext';
import { dateFunctions } from '@/utils';

interface Props {
    entry: Entry
}


export const EntryCard:FC<Props> = ({ entry }) => {

    const router = useRouter()
    const { startDraggin, endDraggin } = useContext(UIContext)

    const onDragStart = (event:DragEvent) =>{
        event.dataTransfer.setData('text', entry._id)

        startDraggin()
    }

    const onDragEnd = (event:DragEvent) => {
        endDraggin()
    }

    const onClick = ()  =>{
        router.push(`/entries/${entry._id}` )
    }
    
  return (
    <Card
        sx={{ marginBottom: 1 }}
        draggable
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onClick={onClick}
    >
        <CardActionArea>
            <CardContent>
                <Typography sx={{ whiteSpace: 'pre-line' }}>Esto es la descripcion { entry.description }</Typography>
            </CardContent>

            <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
                <Typography variant='body2'>{ dateFunctions.getFormatDistanceToNow(entry.createdAt) }</Typography>
            </CardActions>
        </CardActionArea>
    </Card>
  )
}
