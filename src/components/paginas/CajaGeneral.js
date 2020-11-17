import React, { useState, useEffect, forwardRef } from 'react';
import { Button, TextField } from '@material-ui/core'
import Modal from '@material-ui/core/Modal'
import { makeStyles } from '@material-ui/core/styles'
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

import * as Yup from 'yup'
import { useFormik } from 'formik'

import axios from 'axios'

const API_CAJAG = 'http://3.133.175.35/pruebas/general.php'

const CajaGeneral = () => {

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
            title: 'Nombre',
            field: 'nombre'
        },
        {
            title: 'Ingreso',
            field: 'ingreso',

        },
        {
            title: 'Egreso',
            field: 'egreso'
        },
        {
            title: 'Fecha',
            field: 'fecha'
        }
    ]

    const formik = useFormik({
        initialValues: {
            nombre: '',
            monto: '',
            montosalida: ''
        },
        validationSchema: Yup.object({
            nombre: Yup.string()
                .required('obligatorio'),
            
        }),
        onSubmit: async (formData) => {
            let cg = new FormData()
            cg.append("nombre", formData.nombre)
            cg.append("monto", formData.monto)
            cg.append("montosalida", formData.montosalida)
            console.log(formData);
            const rest = await axios.post(API_CAJAG, cg)
            if (rest.data) {
                alert(rest.data)
                CajaGeneral()
                Caja()
                handleClose()
                handleCloseEgreso()
            }
           
        }

    })

    const [data, setdata] = useState([])

    const CajaGeneral = async () => {
        const rest = await axios.get(API_CAJAG)
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
            height: "40%",
            backgroundColor: theme.palette.background.paper,
            border: '1px solid #fff',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(4, 4, 4),
        },
    }));

    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const [openEgreso, setopenEgreso] = useState(false)

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        formik.values.monto = ''
        formik.values.montosalida = ''
        formik.values.nombre =''
        setOpen(false);
    };

    const handleCloseEgreso = () => {
        formik.values.monto = ''
        formik.values.montosalida = ''
        formik.values.nombre =''
        setopenEgreso(false)
    }

    const handleOpenEgreso = () => {
        setopenEgreso(true)
    }


    useEffect(() => {
        CajaGeneral()
        Caja()
    }, [])

    const Eliminar = async (id) => {
        let D_genaral = "D_genaral"
        let fc = new FormData()
        fc.append("id", id)
        fc.append("D_general", D_genaral)
        const rest = await axios.post(API_CAJAG, fc)
        console.log(rest)
        CajaGeneral()
        Caja()
    }
    const [total, settotal] = useState(Number)

    const Caja = async () => {
        let consultaG = "consultaG"
        let fc = new FormData()
        fc.append("consultaG", consultaG)
        const rest = await axios.post(API_CAJAG, fc)
        settotal(rest.data)
    }

    const ingreso = (
        <div style={modalStyle} className={classes.paper}>
            <h1 className="text-center text-3xl text-gray-600"><i>Formulario de Ingreso</i></h1>
            <hr />
            <div className="container text-center">
                
                <form onSubmit={formik.handleSubmit}>
                    <TextField placeholder="Nombre o Usuario" name="nombre"
                        value={formik.values.nombre}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <TextField placeholder="Monto a ingresar" name="monto"
                        value={formik.values.monto}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />

                    <di className="grid grid-cols-1 pt-3">
                        <Button color="primary" variant="contained" type="submit" >
                            Guardar
                        </Button>
                    </di>
                </form>

            </div>

        </div>

    );
    const egreso = (
        <div style={modalStyle} className={classes.paper}>
            <h1 className="text-center text-3xl text-gray-600"><i>Formulario de Egreso</i></h1>
            <hr />
            <div className="container text-center">
                <form onSubmit={formik.handleSubmit}>
                    <TextField placeholder="Nombre o Usuario" name="nombre"
                        value={formik.values.nombre}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <TextField placeholder="Monto a Salir" name="montosalida"
                        value={formik.values.montosalida}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />

                    <di className="grid grid-cols-1 pt-3">
                        <Button color="primary" variant="contained" type="submit" >
                            Guardar
                        </Button>
                    </di>
                </form>

            </div>

        </div>

    );



    return (<>
        <h1 className="text-2xl text-center text-bolg p-2"><i>Caja General Luv-n-Oven</i></h1>
        <hr />
        <div className="grid grid-cols-2">
            <Button color="primary" variant="contained" onClick={() => handleOpen()}>
                INGRESO
            </Button>
            <Button color="secondary" variant="contained" onClick={() => handleOpenEgreso()}>
                EGRESO
            </Button>
        </div>
        <MaterialTable
            icons={tableIcons}
            columns={columnas}
            data={data}
            title="Caja General"
            actions={[
                {
                    icon: () => <Clear />,
                    tooltip: "Eliminar",
                    onClick: (event, rowData) => Eliminar(rowData.id)
                }
            ]}
        />
        <h1 className="text-2xl text-center text-bolg p-2"><i>Total en Caja General : ${total}</i></h1>
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {ingreso}
            </Modal>
        </div>
        <div>
            <Modal
                open={openEgreso}
                onClose={handleCloseEgreso}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {egreso}
            </Modal>
        </div>
    </>);
}

export default CajaGeneral;