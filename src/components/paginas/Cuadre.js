import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import { Button } from '@material-ui/core'

import { withRouter } from 'react-router-dom'

const APICUADRE = 'http://3.133.175.35/pruebas/cuadre.php'
const APIIMPRIMIR = 'http://localhost/impresora/cuadre.php'
const Cuadre = (props) => {

    const { history } = props
    
    
    function getModalStyle() {
        const top = 50
        const left = 50
        return {
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
        };
    }

    let hora = new Date()
    const opciones = { hour: 'numeric', minute: '2-digit' };
    var horaactual = hora.toLocaleDateString('es-ES', opciones)

    console.log(horaactual);
    const useStyles = makeStyles((theme) => ({
        paper: {
            position: 'absolute',
            width: "30%",
            height: "60%",
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
    const [openN, setOpenN] = useState(false);
    const [openC, setOpenC] = useState(false);
    const [contra, setcontra] = useState(Number)
    const [venta, setventa] = useState(Number)
    const [gastos, setgastos] = useState(Number)
    const [caja, setcaja] = useState(Number)
    //const [reporte, setreporte] = useState([])
    const Matutino = 'matutino'
    const total = parseFloat(venta) + parseFloat(caja) - parseFloat(gastos)
    
    console.log(total);

    const Ventas = async () => {
        const rest = await axios.get(APICUADRE, {
            params: {
                matutino: Matutino,
                venta: 'venta'
            }
        })
        setventa(rest.data)
    }

    const Caja = async () => {
        const rest = await axios.get(APICUADRE, {
            params: {
                matutino: Matutino,
                caja: 'caja'
            }
        })
        setcaja(rest.data)
    }
    const Gastos = async () => {
        const rest = await axios.get(APICUADRE, {
            params: {
                matutino: Matutino,
                gastos: 'gastos'
            }
        })
        setgastos(rest.data)
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleOpenN = () => {
        setOpenN(true);
    };

    const handleCloseN = () => {
        setOpenN(false);
    };
    const handleOpenC = () => {
        setOpenC(true);
    };

    const handleCloseC = () => {
        setOpenC(false);
    };

    const CuadreReport = async (array) =>{
        const rest = await axios.get(APIIMPRIMIR,{params:{
            'array':JSON.stringify(array)
        }})
        console.log(rest)
    }

    const Matutin = async () => {
        const imprimir = "Matutin";
        let fc = new FormData()
        fc.append("Matutin", imprimir)
      const rest = await axios.post(APICUADRE, fc)
      if(rest.data){
        CuadreReport(rest.data)
      }
      console.log(rest.data)
    }
    const Clave = async () => {
       
        let fc = new FormData()
        fc.append("contra", contra)
        const rest = await axios.post(APICUADRE, fc)
        if (rest.data === "Exito") {
            window.close()
        }
    }
    
    useEffect(() => {
        Caja()
        Ventas()
        Gastos()
        
    },[])

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h1 className="text-center text-lg text-gray-600"><i>CIERRE DE TURNO  {horaactual}</i></h1>
            <hr />
            <div className="container justify-center">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Detalle</th>
                            <th className="text-right">Valores</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Caja</td>
                            <td className="text-right">${caja}</td>
                        </tr>
                        <tr>
                            <td>Ventas</td>
                            <td className="text-right">${venta}</td>
                        </tr>
                        <tr>
                            <td>Gastos</td>
                            <td className="text-right">${ gastos }</td>
                        </tr>
                    </tbody>
                </table>
                <h1 className="text-center p-2"><i>Total en Caja Chica ${ total.toFixed(2) === 'NaN' ? caja: total.toFixed(2)}</i></h1>
                <di className="grid grid-cols-1">
                    <Button color="primary" variant="contained" type="submit" onClick={()=>Matutin()}>
                        IMPRIMIR
                    </Button>
                </di>
            </div>
        </div>
    );
    const noche = (
        <div style={modalStyle} className={classes.paper}>
            <h1 className="text-center text-lg text-gray-600"><i>CIERRE DE TURNO  {horaactual}</i></h1>
            <hr />
            <div className="container justify-center">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Detalle</th>
                            <th className="text-right">Valores</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Caja</td>
                            <td className="text-right">${caja}</td>
                        </tr>
                        <tr>
                            <td>Ventas</td>
                            <td className="text-right">${venta}</td>
                        </tr>
                        <tr>
                            <td>Gastos</td>
                            <td className="text-right">${ gastos }</td>
                        </tr>
                    </tbody>
                </table>
                <h1 className="text-center p-2"><i>Total en Caja Chica ${ total.toFixed(2) }</i></h1>
                <di className="grid grid-cols-1">
                    <Button color="primary" variant="contained" type="submit" onClick={()=>Matutin()}>
                        IMPRIMIR
                    </Button>
                </di>
            </div>
        </div>
    );
    const clave = (
        <div style={modalStyle} className={classes.paper}>
            <h1 className="text-center text-lg text-gray-600"><i>INGRESE SI CLAVE DE ADMINISTRADOR</i></h1>
            <hr />
            <div className="container justify-center">
                <div className="form-group p-3">
                    <input type="password" className="border-gray-600 text-5xl form-control" onChange={(e)=>setcontra(e.target.value)}/>
                </div>
                <div className="form-group p-3">
                <Button color="primary" variant="contained" type="submit" className="form-control" onClick={()=>Clave()}>
                        RESTABLECER
                </Button>
                </div>
            </div>
        </div>
    );


    return (
        <>
            <h1 className="text-center text-4xl text-red-600"><i>CIERRE DE CAJA </i></h1>
            <hr className="bg-red-300 opacity-75" />

            <div className="container">
                <div className="row pt-4">
                    <div className="col col-md-6">
                        <div align="center">
                            <button className="btn bg-green-300 text-blue-800 font-mono text-2xl" onClick={()=>handleOpen()}>Cierre Matutino</button>
                        </div>
                    </div>
                    <div className="col col-md-6">
                        <div align="center">
                            <button className="btn bg-green-300 text-blue-800 font-mono text-2xl" onClick={()=>handleOpenN()}>Cierre Vespertino</button>
                        </div>
                    </div>
                </div>
                <div align="center" className="pt-20">
                    <button className="btn btn-danger" onClick={() => history.push("/reporte")}>GenerarPdf</button>
                    <div className="container pt-20">
                        <img src="https://img.icons8.com/fluent/48/000000/synchronize.png" alt="reiniciar" className="w-40 cursor-pointer " onClick={()=>handleOpenC()} /> 
                    <p>Restablecer valores</p>    
                    </div>
                </div>
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
                open={openN}
                onClose={handleCloseN}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {noche}
            </Modal>
            </div>

            <div>
            <Modal
                open={openC}
                onClose={handleCloseC}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {clave}
            </Modal>
        </div>
        </>
    );
}

export default withRouter(Cuadre);