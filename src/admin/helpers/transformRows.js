export const transformRowsToDetails = (rows) => {
    const map = new Map();

    for (const row of rows) {
        const key = `${row.productId}-${row.warehouse}`;

        if (!map.has(key)) {
            map.set(key, {
                productId: row.productId,
                warehouseId: Number(row.warehouse),
                quantity: 0,
                instances: [],
            });
        }

        const detail = map.get(key);

        detail.quantity += 1;

        detail.instances.push({
            serialNumber: row.serialNumber,
            assetNumber: row.assetNumber,
            status: row.status === 1 ? 'used' : 'new',
        });
    }

    return Array.from(map.values());
};
