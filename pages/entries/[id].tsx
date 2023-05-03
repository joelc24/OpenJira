import { ChangeEvent, useState, useMemo, useContext } from 'react';
import { NextPage, GetServerSideProps } from "next"
import { capitalize, Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, IconButton } from "@mui/material"
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import { Layout } from "@/components/layouts"
import { Entry, EntryStatus } from "@/interface";
import { dbEntries } from '@/database';
import { EntriesContext } from '@/context/entries';
import { dateFunctions } from '@/utils';
import { useRouter } from 'next/router';

const validStatus: EntryStatus[] = ['pending','in-progress','finished']

interface Props{
    entry: Entry
}


const EntryPage:NextPage<Props> = ({ entry }) => {

    const { updateEntry, deleteEntry } = useContext(EntriesContext)
    const router = useRouter()
 
    const [inputValue, setInputValue] = useState(entry.description)
    const [status, setStatus] = useState<EntryStatus>(entry.status)
    const [touched, setTouched] = useState(false)

    const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched])

    const onInputValueChange = (event: ChangeEvent<HTMLInputElement>) =>{
        setInputValue(event.target.value)
    }

    const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) =>{
        setStatus(event.target.value as EntryStatus)
    }


    const onSave = () =>{
        if (inputValue.trim().length === 0) {
            return
        }

        const updatedEntry: Entry = {
            ...entry,
            status,
            description: inputValue
        }

        updateEntry(updatedEntry, true)
    }

    const onDelete = () =>{
        deleteEntry(entry._id)
        router.replace('/')
    }
    
    return (
    <Layout title={ inputValue.substring(0,20) + '...'}>
        <Grid container justifyContent="center" sx={{ mt: 2 }}>
            <Grid item xs={12} sm={8} md={6}>
                <Card>
                    <CardHeader
                        title={`Entrada:`}
                        subheader={`Creada ${dateFunctions.getFormatDistanceToNow(entry.createdAt)}`}
                    />
                    <CardContent>
                        <TextField
                            sx={{ mt:2, mb: 1 }}
                            fullWidth
                            placeholder="Actualizar Entrada"
                            autoFocus
                            multiline
                            label="Actualizar Entrada"
                            value={ inputValue }
                            onChange={ onInputValueChange }
                            onBlur={() => setTouched(true)}
                            helperText={ isNotValid && 'Ingrese un valor'}
                            error={ isNotValid }
                        />
                        <FormControl>
                            <FormLabel>Estado:</FormLabel>
                            <RadioGroup
                                row
                                value={status}
                                onChange={onStatusChanged}
                            >
                                {
                                    validStatus.map((option)=>(
                                        <FormControlLabel
                                            key={option}
                                            value={option}
                                            control={<Radio/>}
                                            label={capitalize(option)}
                                        />
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>
                    </CardContent>
                    <CardActions>
                        <Button
                            startIcon={<SaveOutlinedIcon/>}
                            variant="contained"
                            fullWidth
                            onClick={ onSave }
                            disabled={ inputValue.length <= 0 }
                        >
                            Guardar
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
                <IconButton
                    sx={{
                        position: 'fixed', 
                        bottom: 30,
                        right: 30,
                        backgroundColor: 'error.dark' 
                    }}
                    onClick={onDelete}
                >
                    <DeleteOutlinedIcon/>
                </IconButton>
        </Grid>



    </Layout>
  )
}




export const getServerSideProps: GetServerSideProps = async ({params}) => {
    
    const { id } = params as { id: string }
    const entry = await dbEntries.getEntryById(id)

    if (!entry) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
    

    return {
        props: {
            entry
        }
    }
}

export default EntryPage