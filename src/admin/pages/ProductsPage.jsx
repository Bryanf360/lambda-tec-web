import { useState } from "react"
import { Grid, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

import { CardLayout, Table } from "../components";
import { Button } from "../../auth/components";
import { SearchInput } from "../components/molecules";

export const ProductsPage = () => {
    const [product, setProduct] = useState({
        name: '',
        partNumber: '',
        type: '',
        unitType: '',
        brand: '',
        description: '',
        model: ''
    })

    const handleFormSubmit = (event) => {
        event.preventDefault();
    }

    const handleInputValueChange = ({ target }, inputName) => {
        setProduct({
            ...product,
            [inputName]: target.value
        })
    }

    const handleSearchTextChange = (event) => {
        // TODO: implement search
    }

    return (
        <CardLayout
            title="Artículos"
        >
            <Grid
                sx={{
                    display: 'flex',
                    mb: 2,
                }}
                alignItems="center"
            >
                <Typography variant="h1" sx={{  }}>Artículos</Typography>
                <Button
                    kind="tertiary"
                    sx={{
                        // mb: 2,
                        mx: 5,
                    }}
                    startIcon={<AddIcon />}
                >
                    Button2
                </Button>
                <SearchInput 
                    placeholder="Buscar..."
                    onChange={handleSearchTextChange}
                />
            </Grid>
            <Table

            />
        </CardLayout>
    )

    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <label htmlFor="name">Nombre*</label>
                <input
                    type="text"
                    id="name"
                    value={product.name}
                    onChange={(e) => handleInputValueChange(e, 'name')}
                /><br />
                <label htmlFor="part-number">Número de parte*</label>
                <input
                    type="text"
                    id="part-number"
                    value={product.partNumber}
                    onChange={(e) => handleInputValueChange(e, 'partNumber')}
                /><br />
                <label htmlFor="type">Tipo*</label>
                <input
                    type="text"
                    id="type"
                    value={product.type}
                    onChange={(e) => handleInputValueChange(e, 'type')}
                /><br />
                <label htmlFor="unit-type">Tipo de unidad*</label>
                <input
                    type="text"
                    id="unit-type"
                    value={product.unitType}
                    onChange={(e) => handleInputValueChange(e, 'unitType')}
                /><br />
                <label htmlFor="brand">Marca*</label>
                <input
                    type="text"
                    id="brand"
                    value={product.brand}
                    onChange={(e) => handleInputValueChange(e, 'brand')}
                /><br />
                <label htmlFor="description">Descripción</label>
                <input
                    type="text"
                    id="description"
                    value={product.description}
                    onChange={(e) => handleInputValueChange(e, 'description')}
                /><br />
                <label htmlFor="model">Model*</label>
                <input
                    type="text"
                    id="model"
                    value={product.model}
                    onChange={(e) => handleInputValueChange(e, 'model')}
                /><br />
                <button type="submit">Guardar</button>
            </form>
            <pre>{JSON.stringify(product, null, 2)}</pre>
        </div>
    )
}
