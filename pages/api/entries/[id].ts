import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose'

import { db } from '@/database';
import { Entry, IEntry } from '@/models';

type Data = 
| { message: string }
| IEntry

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    const { id } = req.query

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: "El id no es valido " + id })
    }

    switch (req.method) {
        case 'GET':
            return getEntry(req, res);
        case 'PUT':
            return updateEntry(req, res);
        case 'DELETE':
            return deleteEntry(req, res)
        default:
            return res.status(400).json({ message: 'Metodo no existe' });
    }

    
}


const getEntry = async(req:NextApiRequest, resp:NextApiResponse<Data>) =>{

    const { id } = req.query

    await db.connect()
    const entry = await Entry.findById(id)
    await db.disconnect()
    if (!entry) {
        return resp.status(400).json({ message: "No existe entrada con este id" })
    }

    return resp.status(200).json(entry)
}

const updateEntry = async(req:NextApiRequest, res:NextApiResponse<Data>)=>{

    const { id } = req.query

    await db.connect()
    const entryToUpdate = await Entry.findById(id)

    if (!entryToUpdate) {
        await db.disconnect()
        return res.status(400).json({ message: 'No hay entrada con ese ID: ' + id })
    }

    const { description = entryToUpdate.description, status = entryToUpdate.status } = req.body
    try {
        const updatedEntry = await Entry.findByIdAndUpdate(id, { description, status }, { runValidators: true, new: true })
        await db.disconnect()
        return res.status(200).json(updatedEntry!)
    } catch (error:any) {
        console.log(error)
        await db.disconnect()
        return res.status(400).json({ message: error.errors.message })
    }


}


const deleteEntry = async(req:NextApiRequest, resp:NextApiResponse<Data>) =>{

    const { id } = req.query

    await db.connect()
    const entryToDelete = await Entry.findByIdAndDelete(id)
    if (!entryToDelete) {
        await db.disconnect()
        return resp.status(400).json({ message: 'No existe entrada con el id: ' + id })
    }

    await db.disconnect()
    return resp.status(200).json({ message: `Entrada con id: ${id}, eliminada` })


}