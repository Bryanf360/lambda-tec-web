export const transformRowsToDetails = (rows) => {
    const equipmentMap = new Map();
    const consumableDetails = [];

    for (const row of rows) {
        // 🟢 CONSUMIBLE
        if (row.isConsumable) {
            consumableDetails.push({
                productId: row.productId,
                warehouseId: Number(row.warehouse),
                quantity: Number(row.amountToEnter),
            });
            continue;
        }

        // 🔵 EQUIPO
        const key = `${row.productId}-${row.warehouse}`;

        if (!equipmentMap.has(key)) {
            equipmentMap.set(key, {
                productId: row.productId,
                warehouseId: Number(row.warehouse),
                quantity: 0,
                instances: [],
            });
        }

        const detail = equipmentMap.get(key);
        detail.quantity += 1;

        detail.instances.push({
            serialNumber: row.serialNumber,
            assetNumber: row.assetNumber,
            status: row.status === 1 ? 'new' : 'used',
        });
    }
    return [...consumableDetails, ...Array.from(equipmentMap.values())];
};

export const transformRowsToExitDetails = (rows) => {
    const equipmentMap = new Map();
    const consumableDetails = [];

    for (const row of rows) {
        // 🟢 CONSUMIBLE
        if (row.isConsumable) {
            consumableDetails.push({
                productId: row.productId,
                warehouseId: Number(row.warehouse),
                quantity: Number(row.quantity),
            });
            continue;
        }

        // 🔵 EQUIPO
        const key = `${row.productId}-${row.warehouse}`;

        if (!equipmentMap.has(key)) {
            equipmentMap.set(key, {
                productId: row.productId,
                warehouseId: Number(row.warehouse),
                quantity: 0,
                instanceIds: [],
            });
        }

        const detail = equipmentMap.get(key);

        // 🔥 en salida la cantidad = instancias
        detail.quantity += 1;

        // 👇 aquí NO seriales, solo IDs
        detail.instanceIds.push(row.instanceId);
    }

    return [...consumableDetails, ...Array.from(equipmentMap.values())];
};
