export const providers = [
    { id: 1, name: 'Jhon Smith' },
    { id: 2, name: 'Jorge Vedón' },
    { id: 3, name: 'Andrés Hernández' },
    { id: 4, name: 'Liseth Vargas' },
    { id: 5, name: 'Jhon Doe' }
]

export const reasons = [
    { id: 1, name: 'Compra' },
    { id: 2, name: 'Ingreso de prueba' }
]

export const warehouses = [
    { id: 1, name: 'Bodega 1' },
    { id: 2, name: 'Bodega 2' }
];

export const statuses = [
    { id: 1, name: 'Usado' },
    { id: 2, name: 'Nuevo' }
];

export const roles = [
    { id: 1, name: 'Admin' },
    { id: 2, name: 'Técnico' },
]

export const provinces = [
    { id: 1, name: 'Imbabura' },
    { id: 2, name: 'Pichincha' },
]

export const cities = [
    { id: 1, name: 'Quito' },
    { id: 2, name: 'Ibarra' },
]

export const inputs = [
    {
        number: '1',
        name: 'Monitor LCD',
        quantity: 4,
        unites: 'u - Unidades',
        warehouse: 'Tecratronik',
        serialNumber: '1234ASDFQ',
        assetNumber: 'ASDF1234',
        status: 'Usado',
        amountToEnter: 30,
    },
    {
        number: '2',
        name: 'Cable RJ45',
        quantity: 30,
        unites: 'm - Metros',
        warehouse: 'Tecratronik',
        serialNumber: 'N/A',
        assetNumber: 'ASDF1234',
        status: 'Usado',
        amountToEnter: 30,
    },
];

export const products = [
    {
        id: 1, 
        code: '1234123',
        product: 'Cable RJ46',
        provider: 'Jhon Sneider',
        description: 'Cable Internet',
        type: 'Consumible',
        unity: 'm - Metros',
        quantity: 2
    },
    {
        id: 3, 
        code: '1234123',
        product: '-',
        provider: 'Jhon Sneider',
        description: 'Cable Internet',
        type: 'Consumible',
        unity: 'm - Metros',
        quantity: 2
    },
    {
        id: 4, 
        code: '1234123',
        product: 'Cable RJ46',
        provider: 'Consumible',
        description: 'Cable Internet',
        type: 'Consumible',
        unity: 'm - Metros',
        quantity: 3
    }
]

export const types = [
    { id: 1, name: 'Consumible' },
    { id: 2, name: 'Equipo' },
];

export const brands = [
    { id: 1, name: 'Tecatronik' },
    { id: 2, name: 'Panasonic' },
];

export const models = [
    { id: 1, name: '1ZAAA' },
    { id: 2, name: 'PPOSA' }
]

export const partNumbers = [
    { id: 1, name: 'PA-1ZAAA' },
    { id: 2, name: 'ZQ-PPOSA' }
]

export const unitTypes = [
    { id: 1, name: 'm - Metros' },
    { id: 2, name: 'u - Unidades' }
]