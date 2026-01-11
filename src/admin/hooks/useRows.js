// src/hooks/useRows.js
import { useState, useEffect, useRef } from 'react';

function getRequiredRowCount(product) {
    const isUnits = product.unit_type.simbol === 'u'; // "u" es unidades
    return isUnits ? product.quantity : 1;
}

function validateRows(rows) {
    const errors = [];

    rows.forEach((row) => {
        if (!row.warehouse || row.warehouse === '') {
            // console.log(row);
            errors.push({
                rowId: row.rowId,
                field: 'warehouse',
                message: `Falta Bodega (Producto: ${row.name}, Fila: ${row.index})`,
            });
        }

        if (!row.isConsumable) {
            if (!row.status || row.status === '') {
                errors.push({
                    rowId: row.rowId,
                    field: 'status',
                    message: `Falta Estado (Producto: ${row.name}, Fila: ${row.index})`,
                });
            }
        }
    });

    return errors;
}

function syncRows(selectedProducts, currentRows, productOrderRef) {
    let rows = [...currentRows];

    Object.values(selectedProducts).forEach((product) => {
        if (!productOrderRef.current[product.id]) {
            productOrderRef.current[product.id] = Object.keys(productOrderRef.current).length + 1;
        }

        const productIndex = productOrderRef.current[product.id];

        const required = getRequiredRowCount(product);
        const existing = rows.filter((r) => r.productId === product.id);
        const currentCount = existing.length;

        // -----------------------------
        // 1. AÑADIR FILAS NUEVAS
        // -----------------------------
        if (currentCount < required) {
            const missing = required - currentCount;

            for (let i = 0; i < missing; i++) {
                rows.push({
                    rowId: `${product.id}-${currentCount + i + 1}`,
                    productId: product.id,
                    name: product.name,
                    // simbol: product.unit_type.simbol,
                    // unit: product.unit_type.name,
                    unites: `${product.unit_type.simbol} - ${product.unit_type.name}`,
                    productIndex,
                    index: currentCount + i + 1,
                    quantity: product.quantity,

                    warehouse: '',
                    serialNumber: '',
                    assetNumber: '',
                    status: '',

                    isConsumable: product.unit_type.simbol !== 'u',
                    amountToEnter: product.unit_type.simbol !== 'u' ? product.quantity : null,

                    singleWarehouse: product.singleWarehouse,
                });
            }
        }

        // -----------------------------
        // 2. ELIMINAR FILAS SOBRANTES
        // -----------------------------
        if (currentCount > required) {
            const toRemove = existing.slice(required);
            toRemove.forEach((row) => {
                rows = rows.filter((r) => r.rowId !== row.rowId);
            });
        }
    });

    const validProductIds = Object.keys(selectedProducts).map(Number);
    rows = rows.filter((row) => validProductIds.includes(row.productId));

    return rows;
}

function syncProductOrder(selectedProducts, productOrderRef) {
    const newOrder = {};
    let index = 1;

    Object.values(selectedProducts).forEach((product) => {
        newOrder[product.id] = index++;
    });

    productOrderRef.current = newOrder;
}

function reindexRows(rows, productOrderRef) {
    return rows.map((row, idx, arr) => {
        const sameProductRows = arr.filter((r) => r.productId === row.productId);
        const newIndex = sameProductRows.findIndex((r) => r.rowId === row.rowId) + 1;

        return {
            ...row,
            productIndex: productOrderRef.current[row.productId],
            index: newIndex,
            rowId: `${row.productId}-${newIndex}`,
        };
    });
}

// ----------------------------------------------------------
// 🚀 HOOK PRINCIPAL
// ----------------------------------------------------------

function useRows(selectedProducts) {
    const [rows, setRows] = useState([]);
    const [errors, setErrors] = useState([]);
    const productOrderRef = useRef({});

    // sincroniza al cambiar los productos seleccionados
    useEffect(() => {
        syncProductOrder(selectedProducts, productOrderRef);

        setRows((prev) => {
            const synced = syncRows(selectedProducts, prev, productOrderRef);
            return reindexRows(synced, productOrderRef);
        });
    }, [selectedProducts]);

    // actualizar una propiedad de una fila
    const updateRow = (rowId, field, value) => {
        setRows((prev) => {
            const updated = prev.map((row) =>
                row.rowId === rowId ? { ...row, [field]: value } : row
            );

            const changedRow = updated.find((r) => r.rowId === rowId);

            // 🔥 PROPAGAR BODEGA A TODAS LAS FILAS DEL PRODUCTO
            if (field === 'warehouse' && changedRow?.singleWarehouse && changedRow.index === 1) {
                return updated.map((row) =>
                    row.productId === changedRow.productId ? { ...row, warehouse: value } : row
                );
            }

            return updated;
        });

        setErrors((prev) =>
            prev.filter((err) => {
                return !(err.rowId === rowId && err.field === field);
            })
        );
    };

    // eliminar una fila individual
    const deleteRow = (rowId) => {
        setRows((prev) => prev.filter((r) => r.rowId !== rowId));

        setErrors((prev) => prev.filter((err) => err.rowId !== rowId));
    };

    // reset (por si cierras el modal)
    const resetRows = () => {
        setRows([]);
        setErrors({});
        productOrderRef.current = {}; // reiniciar numeración
    };

    const validate = () => {
        const validationErrors = validateRows(rows);
        // console.log(validationErrors);
        setErrors(validationErrors);
        if (validationErrors.length === 0) return null;
        return validationErrors[0];
    };

    return {
        rows,
        updateRow,
        deleteRow,
        resetRows,
        validate,
    };
}

export default useRows;
