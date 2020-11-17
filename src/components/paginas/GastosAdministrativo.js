import React, { useEffect, useState, forwardRef } from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import { Button, TextField } from '@material-ui/core'
import MaterialTable from 'material-table'
import { useFormik } from 'formik'
//import  jsPDF  from 'jspdf'
import ExportExcel from 'react-export-excel'

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
import  {Delete}  from '@material-ui/icons'


import * as Yup from 'yup'

const ExcelFile = ExportExcel.ExcelFile
const ExcelSheet = ExportExcel.ExcelSheet
const ExcelColumn = ExportExcel.ExcelColumn

const APIGASTO = 'http://3.133.175.35/pruebas/gastosdelDia.php'

const GastosAdministrativo = () => {

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

    const formik = useFormik({
        initialValues: {
            RazonSocial: '',
            Ruc: '',
            Autorizacion: '',
            Detalle: '',
            Factura: '',
            ValorGasto: '',
            Iva12: '',
            Base12: '',
            Base0: '',
            ObjetoIva: '',
            SinIva: '',
            id:''
        },
        validationSchema: Yup.object({
            RazonSocial: Yup.string()
                // .min(1, 'Minimo de Caracteres 2')
                .required('La Razon social es obligatorio'),
            Ruc: Yup.number()
                // .min(0, 'Minimo de 13 Digito')
                .required('El Ruc es obligatorio'),
            Autorizacion: Yup.number()
                // .min(1, 'Debe ingresar Numero')
                .required('Autorizacion es obligatorio'),
            Detalle: Yup.string()
                // .min(1, 'Debe ingresar 1 caracteres')
                .required('Detalle de la Factura es obligatorio'),
            Factura: Yup.number()
                // .min(5, 'Debe ingresar Numero')
                .required('Es obligatorio'),
            ValorGasto: Yup.number()
                .min(1, 'Debe ingresar Numero')
                .required('Valor del Gasto es obligatorio'),
            Iva12: Yup.number()
                // .min(1, 'Minimo de Caracteres 2')
                .required('La Razon social es obligatorio'),
            Base12: Yup.number()
                // .min(1, 'Minimo de 13 Digito')
                .required('El Ruc es obligatorio'),
            Base0: Yup.number()
                // .min(1, 'Debe ingresar Numero')
                .required('Autorizacion es obligatorio'),
            ObjetoIva: Yup.string()
                // .min(1, 'Debe ingresar 1 caracteres')
                .required('Detalle de la Factura es obligatorio'),
            SinIva: Yup.number()
                // .min(1, 'Debe ingresar Numero')
                .required('Valor del Gasto es obligatorio'),
        }),
        onSubmit: async (formData) => {
            let fr = new FormData()
            fr.append("razon", formData.RazonSocial)
            fr.append("autorizacion", formData.Autorizacion)
            fr.append("ruc", formData.Ruc)
            fr.append("detalla", formData.Detalle)
            fr.append("factura", formData.Factura)
            fr.append("gasto", formData.ValorGasto)
            fr.append("iva12", formData.Iva12)
            fr.append("base12", formData.Base12)
            fr.append("base0", formData.Base0)
            fr.append("objeto", formData.ObjetoIva)
            fr.append("siniva", formData.SinIva)
            fr.append("id", formData.id)
            console.log(formData);
            const rest = await axios.post(APIGASTO, fr)
            console.log(rest);
            if (rest.data === "Se Ingreso con Exito") {
                alert(rest.data)
                CajaGeneral()
                handleClose()
            } else {
                handleCloseeditar()
                CajaGeneral()
            }
        }

    })

    const columnas = [
        {
            title: 'Razon Social',
            field: 'razon_sc'
        },
        {
            title: 'Ruc',
            field: 'ruc'
        },
        {
            title: 'Autorizacion',
            field: 'autorizacion'
        },
        {
            title: 'Factura',
            field: 'factura'
        },
        {
            title: 'Detalle',
            field: 'detalle'
        },
        {
            title: 'Valor',
            field: 'gastos'
        },
        {
            title: 'Impuesto',
            field: 'impuesto'
        },
        {
            title: 'Base 12%',
            field: 'base12'
        },
        {
            title: 'Base 0%',
            field: 'base0'
        },
        {
            title: 'No objeto Iva',
            field: 'no_objeto_iva'
        },
        {
            title: 'Sin Iva',
            field: 'sin_iva'
        },
    ]

    const [data, setdata] = useState([])

    

    const CajaGeneral = async () => {
        const rest = await axios.get(APIGASTO, {
            params: {
                id: "id"
            }
        })
        console.log(rest)
        setdata(rest.data)
    }


    function getModalStyle() {
        const top = 50
        const left = 50

        return {
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
        };
    }

    const useStyles = makeStyles((theme) => ({
        paper: {
            position: 'absolute',
            width: "30%",
            height: "90vh",
            backgroundColor: theme.palette.background.paper,
            border: '1px solid #fff',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(4, 4, 4),
        },
    }));

    const classes = useStyles();
    //getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        formik.values.Autorizacion = ''
        formik.values.RazonSocial = ''
        formik.values.Ruc = ''
        formik.values.Factura = ''
        formik.values.Detalle = ''
        formik.values.ValorGasto = ''
        formik.values.Iva12 = ''
        formik.values.Base12 = ''
        formik.values.Base0 = ''
        formik.values.ObjetoIva = ''
        formik.values.SinIva = ''
        formik.values.id = ''
        setOpen(false);
    };

    // formulario para editar

    const [editar, seteditar] = useState(false)

    const handleCloseeditar = () => {
        seteditar(false)
        formik.values.Autorizacion = ''
        formik.values.RazonSocial = ''
        formik.values.Ruc = ''
        formik.values.Factura = ''
        formik.values.Detalle = ''
        formik.values.ValorGasto = ''
        formik.values.Iva12 = ''
        formik.values.Base12 = ''
        formik.values.Base0 = ''
        formik.values.ObjetoIva = ''
        formik.values.SinIva = ''
        formik.values.id = ''
    }

    const handleOpeneditar = () => {
        seteditar(true)
    }

    const Cambiar = (
        <div style={modalStyle} className={classes.paper}>
            <h1 className="text-center text-3xl text-gray-600"><i>Formulario Editar Gastos</i></h1>
            <hr />
            <div className="container text-center">
                <form onSubmit={formik.handleSubmit}>
                    <TextField placeholder="Razon Social" name="RazonSocial"
                        value={formik.values.RazonSocial}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <TextField placeholder="Ingrese el Ruc:" name="Ruc"
                        value={formik.values.Ruc}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <TextField placeholder="Autorizacion" name="Autorizacion"
                        value={formik.values.Autorizacion}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <TextField placeholder="Detalle" name="Detalle"
                        value={formik.values.Detalle}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <TextField placeholder="Numero de Factura" name="Factura"
                        value={formik.values.Factura}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <TextField placeholder="Valor del Gasto" name="ValorGasto"
                        value={formik.values.ValorGasto}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <TextField placeholder="Iva 12%" name="Iva12"
                        value={formik.values.Iva12}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <TextField placeholder="Ingrese la Base 0%" name="Base0"
                        value={formik.values.Base0}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <TextField placeholder="Ingrese la Base 12%" name="Base12"
                        value={formik.values.Base12}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <TextField placeholder="No objeto de Iva" name="ObjetoIva"
                        value={formik.values.ObjetoIva}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <TextField placeholder="Sin Iva" name="SinIva"
                        value={formik.values.SinIva}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <di className="grid grid-cols-1 pt-5">
                        <Button color="primary" variant="contained" type="submit" >
                            Guardar
                    </Button>
                    </di>
                </form>

            </div>

        </div>
    );



    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h1 className="text-center text-3xl text-gray-600"><i>Formulario de Gastos</i></h1>
            <hr />
            <div className="container text-center">
                <form onSubmit={formik.handleSubmit}>
                    <TextField placeholder="Razon Social" name="RazonSocial"
                        value={formik.values.RazonSocial}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <TextField placeholder="Ingrese el Ruc:" name="Ruc"
                        value={formik.values.Ruc}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <TextField placeholder="Autorizacion" name="Autorizacion"
                        value={formik.values.Autorizacion}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <TextField placeholder="Detalle" name="Detalle"
                        value={formik.values.Detalle}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <TextField placeholder="Numero de Factura" name="Factura"
                        value={formik.values.Factura}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <TextField placeholder="Valor del Gasto" name="ValorGasto"
                        value={formik.values.ValorGasto}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <TextField placeholder="Iva 12%" name="Iva12"
                        value={formik.values.Iva12}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <TextField placeholder="Ingrese la Base 0%" name="Base0"
                        value={formik.values.Base0}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <TextField placeholder="Ingrese la Base 12%" name="Base12"
                        value={formik.values.Base12}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <TextField placeholder="No objeto de Iva" name="ObjetoIva"
                        value={formik.values.ObjetoIva}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <TextField placeholder="Sin Iva" name="SinIva"
                        value={formik.values.SinIva}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <di className="grid grid-cols-1 pt-5">
                        <Button color="primary" variant="contained" type="submit" >
                            Guardar
                        </Button>
                    </di>
                </form>

            </div>

        </div>
    );



    const Editar = (id, razon_sc, ruc, factura, autorizacion, detalle, gastos, impuestos, base12, base0, no_objeto_iva, sin_iva) => {
        formik.values.Autorizacion = autorizacion
        formik.values.RazonSocial = razon_sc
        formik.values.Ruc = ruc
        formik.values.Factura = factura
        formik.values.Detalle = detalle
        formik.values.ValorGasto = gastos
        formik.values.Iva12 = impuestos
        formik.values.Base12 = base12
        formik.values.Base0 = base0
        formik.values.ObjetoIva = no_objeto_iva
        formik.values.SinIva = sin_iva
        formik.values.id = id
        handleOpeneditar()
        
    }

    const Eliminar = async (id, razon_sc) => {
        
        const rest = await axios.get(APIGASTO, {
            params: {
                id: id,
                rowData: "data",
                razon_sc: razon_sc
            }
        })
        if (rest.data === "Exito") {
             alert("Registro Eliminado")
        }
        CajaGeneral()
    }

    useEffect(() => {
        CajaGeneral()
    }, [])

    return (

        <>
            
            <h1 className="text-2xl text-center text-bolg p-2" id="content"><i>Gastos del Día Luv-n-Oven</i></h1>
            <hr />
            <div className="grid grid-cols-2">
                <Button color="primary" variant="contained" onClick={() => handleOpen()}>
                    Registrar Gastos
                </Button>

                <div className="grid grid-cols-2">

                    <ExcelFile element={<Button color="secondary" variant="contained">Export a Excel XLSX</Button>} filename="Gastos Admin">
                        <ExcelSheet data={data} name="reporte">
                            <ExcelColumn label="Razon Social" value="razon_sc"/>
                            <ExcelColumn label="Ruc" value="ruc"/>
                            <ExcelColumn label="Autorizacion" value="autorizacion" />
                            <ExcelColumn label="Factura" value="factura" />
                            <ExcelColumn label="Detalle" value="detalle" />
                            <ExcelColumn label="Valor" value="gastos" />
                            <ExcelColumn label="Impuesto" value="impuesto" />
                            <ExcelColumn label="Base 12%" value="base12" />
                            <ExcelColumn label="Base 0%" value="base0" />
                            <ExcelColumn label="No Objeto iva" value="no_objeto_iva" />
                            <ExcelColumn label="Sin iva" value="sin_iva"/>
                        </ExcelSheet>
                    </ExcelFile>

                </div>

            </div>

            <div id="TablaGastosAnexos">
                <MaterialTable
                    icons={tableIcons}
                    columns={columnas}
                    data={data}
                    title="Gastos de Administracion"
                    actions={[
                        {
                            icon: ()=><Edit/>,
                            tooltip: "Editar",
                            onClick: (event, rowData) => Editar(rowData.id,rowData.razon_sc,rowData.ruc,rowData.factura,rowData.autorizacion,rowData.detalle,rowData.gastos,rowData.impuestos,rowData.base12,rowData.base0,rowData.no_objeto_iva,rowData.sin_iva )
                        },
                        {
                            icon: ()=><Delete/>,
                            tooltip: "Eliminar",
                            onClick: (event, rowData) => Eliminar(rowData.id,rowData.razon_sc)
                        }
                    ]}
                />
            </div>

            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    {body}
                </Modal>
            </div>

            <div>
                <Modal
                    open={editar}
                    onClose={handleCloseeditar}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    {Cambiar}
                </Modal>
            </div>

        </>

    );
}

export default GastosAdministrativo;