import { Autocomplete, TextField, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';

import lambdaTecApi from '../../../core/api/lambdaTecApi';

export default function SerialNumberSelect({ productId, warehouseId, value, onSelect, ...props }) {
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!productId || !warehouseId) return;

        setLoading(true);
        lambdaTecApi
            .get('/product-instances', {
                params: { productId, warehouseId },
            })
            .then((res) => setOptions(res.data.data))
            .finally(() => setLoading(false));
    }, [productId, warehouseId]);

    const selected = options.find((o) => o.product_instance_id === value) || null;

    return (
        <Autocomplete
            size="small"
            options={options}
            loading={loading}
            value={selected}
            getOptionLabel={(o) => o.serial_number}
            onChange={(_, val) => val && onSelect(val)}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Nro. Serie"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {loading ? <CircularProgress size={16} /> : null}
                                {params.InputProps.endAdornment}
                            </>
                        ),
                    }}
                />
            )}
            {...props}
        />
    );
}
