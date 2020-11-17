import React, { useEffect, useState, forwardRef } from 'react'
import axios from 'axios'
import MaterialTable from 'material-table'


import Edit from '@material-ui/icons/Edit'
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import Search from '@material-ui/icons/Search'
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import ViewColumn from '@material-ui/icons/ViewColumn';

const Anulada = 'Anulada'
const APIVENTASDIA = 'http://3.133.175.35/pruebas/ventasdelDia.php'

const VentasdelDia = () => {

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
            title: 'Ventas',
            field: 'ventas'
        },
        {
            title: 'Estado',
            field: 'anuladas'
        },
        {
            title: 'Fecha',
            field: 'fecha'
        }
    ]

    const [data, setdata] = useState([])
    const [total, settotal] = useState(Number)

    const CajaGeneral = async () => {
        const rest = await axios.get(APIVENTASDIA)
        console.log(rest)
        setdata(rest.data)
    }

    const Anular = async (id_ventas) => {
        //alert(id_ventas)
        let anula = new FormData()
        anula.append("anulada", Anulada)
        anula.append("id_venta",id_ventas)
        const rest = await axios.post(APIVENTASDIA,anula)
        console.log(rest)
        CajaGeneral()
        Total()
        //setdata(rest.data)
    }
    
    const Total = async () => {
        let ventas = "ventas"
        let fc = new FormData()
        fc.append("ventas", ventas)
        const rest = await axios.post(APIVENTASDIA, fc)
        settotal(rest.data)
    }

    useEffect(() => {
        CajaGeneral()
        Total()
    }, [])

    return (
        <>
            <h1 className="text-2xl text-center text-bolg p-2"><i>Ventas del Dia Luv-n-Oven</i></h1>
            <hr />

            <MaterialTable 
            icons={tableIcons}
            columns={columnas}
            data={data}
            title="Ventas"
            actions={[
                {
                    icon:()=><Remove/>,
                    tooltip: "Anular Factura",
                    onClick: (event, rowData)=>Anular(rowData.id_ventas)
                },
            ]}
            />
            <h1 className="text-2xl text-center text-bolg p-2"><i>Total deVentas del Dia Luv-n-Oven ${total}</i></h1>
        </>
    );
}

export default VentasdelDia;