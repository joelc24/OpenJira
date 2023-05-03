import { db } from '@/database';
import { Entry, IEntry } from '@/models';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = 
    | { message: string }
    | IEntry[]
    | IEntry

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getEntries(res);
        case 'POST':
            return postEntry(req, res)
        default:
            return res.status(400).json({ message: 'Enpoint no existe' });
    }

    
}


const getEntries = async(resp:NextApiResponse<Data>) =>{

    await db.connect()
    const entries = await Entry.find().sort({ createdAt: 'ascending' })

    await db.disconnect()

    resp.status(200).json( entries )
}

const postEntry = async(req:NextApiRequest, resp:NextApiResponse<Data>) =>{

    const { description = '' } = req.body

    const newEntry = new Entry({
        description,
        createdAt: Date.now()
    })

    try {
        await db.connect()
        await newEntry.save()
        
        await db.disconnect()
        
        return resp.status(201).json(newEntry)
    } catch (error) {
        console.log(error)
        await db.disconnect()
        return resp.status(500).json({ message: 'Algo salio mal, revisar consola del servidor' })
    }
    


}