
interface SeeData {
    entries: SeedEntry[]
}


interface SeedEntry {
    description: string;
    status: string;
    createdAt: number;
}

export const seedData: SeeData = {
    entries: [
        {
            description:"Pendiente: Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, ipsum! In velit tempore voluptatem.",
            status: 'pending',
            createdAt: Date.now()
        },
        {
            description:"Progreso: Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, ipsum! In velit tempore voluptatem.",
            status: 'in-progress',
            createdAt: Date.now()
        },
        {
            description:"Terminada: Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, ipsum! In velit tempore voluptatem.",
            status: 'finished',
            createdAt: Date.now()
        },
    ]
}