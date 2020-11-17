import React, { useEffect, useState, forwardRef } from 'react'
import axios from 'axios'
import MaterialTable from 'material-table'
import { Button } from '@material-ui/core'

import ExportExcel from 'react-export-excel'

import Edit from '@material-ui/icons/Edit'
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import Search from '@material-ui/icons/Search'
import AddBox from '@material-ui/icons/AddBox'
import ArrowDownward from '@material-ui/icons/ArrowDownward'
import Check from '@material-ui/icons/Check'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import Clear from '@material-ui/icons/Clear'
import FilterList from '@material-ui/icons/FilterList'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import Remove from '@material-ui/icons/Remove'
import SaveAlt from '@material-ui/icons/SaveAlt'
import ViewColumn from '@material-ui/icons/ViewColumn'


const ExcelFile = ExportExcel.ExcelFile
const ExcelSheet = ExportExcel.ExcelSheet
const ExcelColumn = ExportExcel.ExcelColumn

const APINVENTARIO = 'http://3.133.175.35/pruebas/producto.php'

const Inventario = () => {

    const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
        ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
    }


    const columnas = [
        {
            title: 'Codigo',
            field: 'codigo'
        },
        {
            title: 'Producto',
            field: 'producto'
        },
        {
            title: 'Stock',
            field: 'stock'
        },
        {
            title: 'Precio C',
            field: 'precio_compra'
        },
        {
            title: 'Precio V',
            field: 'precio_venta'
        },
        {
            title: 'Ventas',
            field: 'venta'
        },
    ]

    const [data, setdata] = useState([])

    

    const consultaInventario = async () => {
        let consulta = 'consulta'
        let producto = 'producto'
        let fc = new FormData()
        fc.append("consulta", consulta)
        fc.append("producto",producto)
        const rest = await axios.post(APINVENTARIO,fc)
        setdata(rest.data)
    }


    useEffect(() => {
        consultaInventario()
    }, [])

    return (

        <>
            
            <h1 className="text-2xl text-center text-bolg p-2" id="content"><i>Inventario/Stock Luv-n-Oven</i></h1>
            <hr />
            <div className="grid grid-cols-1">  
                <ExcelFile element={<Button color="secondary" variant="contained">Export a Excel XLSX</Button>} filename="Inventario">
                    <ExcelSheet data={data} name="Stock">
                        <ExcelColumn label="Codigo" value="codigo"/>
                        <ExcelColumn label="Producto" value="producto"/>
                        <ExcelColumn label="Stock" value="stock" />
                        <ExcelColumn label="Ventas" value="venta" />
                    </ExcelSheet>
                </ExcelFile>
            </div>

            <div>
                <MaterialTable
                    icons={tableIcons}
                    columns={columnas}
                    data={data}
                    title="Inventario/Stock"
                />
            </div>

        </>

    );
}

export default Inventario;