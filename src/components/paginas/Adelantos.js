import React, {useEffect, useState, forwardRef} from 'react'
import axios from 'axios'
import { Button, TextField } from '@material-ui/core'
import MaterialTable from 'material-table'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'

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

import { Delete } from '@material-ui/icons'


const APIADELANTO = 'http://3.133.175.35/pruebas/adelantos.php'

const Adelantos = () => {

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
            field:'nombre' 
        },
        {
            title: 'Valor',
            field: 'valor',
            
        },
        {
           title: 'Fecha',
           field:'fecha' 
        }
    ]

    const [data, setdata] = useState([])

    const Adelantos = async () => {
        const rest = await axios.get(APIADELANTO)
        console.log(rest)
        setdata(rest.data)
    }

    useEffect(() => {
        Adelantos() 
    }, [])

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
            height: "40vh",
            backgroundColor: theme.palette.background.paper,
            border: '1px solid #fff',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(4, 4, 4),
        },
    }));

    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            valiu: '',
            id:'',
        },
        validationSchema: Yup.object({
            name: Yup.string()
                // .min(1, 'Minimo de Caracteres 2')
                .required('obligatorio'),
            valiu: Yup.number()
                // .min(0, 'Minimo de 13 Digito')
                .required(''),
        }),
        onSubmit: async (formData) => {
            console.log(formData);
            let fr = new FormData()
            fr.append("name", formData.name)
            fr.append("valiu", formData.valiu)
            fr.append("id", formData.id)
            console.log(fr);
            const rest = await axios.post(APIADELANTO, fr)
            console.log(rest);
            if (rest.data) {
                alert(rest.data)
                Adelantos()
                handleClose()
            }
        }

    })
    
    const Cambiar = (
        <div style={modalStyle} className={classes.paper}>
            <h1 className="text-center text-3xl text-gray-600"><i>Formulario de Adelantos</i></h1>
            <hr />
            <div className="container text-center">
                <form onSubmit={formik.handleSubmit}>
                    <br/>
                    <TextField placeholder="Ingrese Nombre" name="name"
                        
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <TextField placeholder="Valor de Adelanto" name="valiu"
                        value={formik.values.valiu}
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

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h1 className="text-center text-3xl text-gray-600"><i>Formulario Editar Adelantos</i></h1>
            <hr />
            <div className="container text-center">
                <form onSubmit={formik.handleSubmit}>
                    <br/>
                    <TextField placeholder="Ingrese Nombre" name="name"
                        
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <TextField placeholder="Valor de Adelanto" name="valiu"
                        value={formik.values.valiu}
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

    const [openedit, setopenedit] = useState(false)

    const handleopenedit = () => {
        setopenedit(true)
    }
    const handleclosedit = () => {
        formik.values.name = ''
        formik.values.valiu = ''
        formik.values.id = ''
        setopenedit(false)
    }

    const Editar = async (id, nombre, valor) => {
        handleopenedit()
        formik.values.name = nombre
        formik.values.valiu = valor
        formik.values.id = id
    }

    const Eliminar = async (id) => {
      
        const rest = await axios.get(APIADELANTO, {
            params: {
                id: id,
                rowData: "data"
            }
        })
        if (rest.data) {
            Adelantos()
            alert("Registro Eliminado")
        }
       
    }
    
    return ( 
        <>
            <h1 className="text-2xl text-center text-bolg p-2"><i>Adelantos del Personal Luv-n-Oven</i></h1> 
            <hr />
            <div className="grid grid-cols-1">
                <Button color="primary" variant="contained" onClick={() => handleOpen(true)}>
                    Registrar Adelantos
                </Button>
            </div>
            
            <MaterialTable 
            columns={columnas}
            data={data}
                title="Adelantos"
                icons={tableIcons}
            actions={[
                {
                    icon: ()=> <Edit/>,
                    tooltip: "Editar",
                    onClick: (event, rowData)=>Editar(rowData.id,rowData.nombre,rowData.valor)
                },
                {
                    icon: () => <Delete />,
                    tooltip: "Eliminar",
                    onClick: (event, rowData)=>Eliminar(rowData.id)
                }
            ]}
            />

            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    {Cambiar}
                </Modal>
            </div>

            <div>
                <Modal
                    open={openedit}
                    onClose={handleclosedit}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    {body}
                </Modal>
            </div>
        </>
     );
}
 
export default Adelantos;