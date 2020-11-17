import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import { Button, TextField } from '@material-ui/core'
//import { Grid, Button, TextField, InputAdornment } from '@material-ui/core';
import { Link, withRouter } from 'react-router-dom'

import '../../css/styles.css';
import fabrica from '../../assets/img/fabrica.png';

const APIGASTO = 'http://3.133.175.35/pruebas/gastosdelDia.php'
const APIVENTASDIA = 'http://3.133.175.35/pruebas/ventasdelDia.php'


function Inicio(props) {
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

    const useStyles = makeStyles((theme) => ({
        paper: {
            position: 'absolute',
            width: "30%",
            height: "200px",
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
    const [openB, setOpenB] = useState(false);
    const [openG, setOpenG] = useState(false);
    const [openV, setOpenV] = useState(false);
    

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpenV = () => {
        setOpenV(true);
    };

    const handleCloseV = () => {
        setOpenV(false);
    };

    const handleOpenB = () => {
        setOpenB(true);
    };

    const handleCloseB = () => {
        setOpenB(false);
    };

    const handleOpenG = () => {
        setOpenG(true);
    };

    const handleCloseG = () => {
        setOpenG(false);
    };

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h1 className="text-center text-lg text-gray-600"><i>UPDATE PETTY CASH VALUE</i></h1>
            <hr />
            <div className="container text-center">

                <TextField placeholder="Update value cash" onChange={(e) => setcaja(e.target.value)} />
                <di className="grid grid-cols-1 pt-5">
                    <Button color="primary" variant="contained" type="submit" onClick={() => UpdateCaja()} >
                        Save
                    </Button>
                </di>
            </div>
        </div>
    );

    const clave = (
        <div style={modalStyle} className={classes.paper}>
            <h1 className="text-center text-lg text-gray-600"><i>CLAVE DE ADMINISTRADOR</i></h1>
            <hr />
            <div className="container text-center">
                <TextField placeholder="INGRESE CLAVE" type="password" className="p-3" onChange={(e) => setcontra(e.target.value)} />
                <di className="grid grid-cols-1 pt-3">
                    <Button color="primary" variant="contained" type="submit" onClick={() => Clave()} >
                        Save
                    </Button>
                </di>
            </div>
        </div>
    );

    const balance = (
        <div style={modalStyle} className={classes.paper}>
            <h1 className="text-center text-lg text-gray-600"><i>CLAVE DE ADMINISTRADOR</i></h1>
            <hr />
            <div className="container text-center">
                <TextField placeholder="INGRESE CLAVE" type="password" className="p-3" onChange={(e) => setcontra(e.target.value)} />
                <di className="grid grid-cols-1 pt-3">
                    <Button color="primary" variant="contained" type="submit" onClick={() => ClaveB()} >
                        Save
                    </Button>
                </di>
            </div>
        </div>
    );

    const general = (
        <div style={modalStyle} className={classes.paper}>
            <h1 className="text-center text-lg text-gray-600"><i>CLAVE DE ADMINISTRADOR</i></h1>
            <hr />
            <div className="container text-center">
                <TextField placeholder="INGRESE CLAVE" type="password" className="p-3" onChange={(e) => setcontra(e.target.value)} />
                <di className="grid grid-cols-1 pt-3">
                    <Button color="primary" variant="contained" type="submit" onClick={() => ClaveG()} >
                        Save
                    </Button>
                </di>
            </div>
        </div>
    );

    const ventasdia = (
        <div style={modalStyle} className={classes.paper}>
            <h1 className="text-center text-lg text-gray-600"><i>CLAVE DE ADMINISTRADOR</i></h1>
            <hr />
            <div className="container text-center">
                <TextField placeholder="INGRESE CLAVE" type="password" className="p-3" onChange={(e) => setcontra(e.target.value)} />
                <di className="grid grid-cols-1 pt-3">
                    <Button color="primary" variant="contained" type="submit" onClick={() => ClaveV()} >
                        Save
                    </Button>
                </di>
            </div>
        </div>
    );

    const [data, setdata] = useState('')
    const [caja, setcaja] = useState(Number)
    const [venta, setventa] = useState(Number)
    const [gastos, setgastos] = useState(Number)
    const [contra, setcontra] = useState(Number)
    const [openC, setOpenC] = useState(false);

    const handleOpenC = () => {
        setOpenC(true);
    };

    const handleCloseC = () => {
        setOpenC(false);
    };
    const Clave = async () => {
        let fc = new FormData()
        fc.append("contra", contra)
        const rest = await axios.post(APIGASTO, fc)
        if (rest.data === "Exito") {
            history.push("/adelantos")
        }
    }
    const ClaveB = async () => {
        let fc = new FormData()
        fc.append("contra", contra)
        const rest = await axios.post(APIGASTO, fc)
        if (rest.data === "Exito") {
            history.push("/balance")
        }
    }

    const ClaveG = async () => {
        let fc = new FormData()
        fc.append("contra", contra)
        const rest = await axios.post(APIGASTO, fc)
        if (rest.data === "Exito") {
            history.push("/general")
        }
    }
    const ClaveV = async () => {
        let fc = new FormData()
        fc.append("contra", contra)
        const rest = await axios.post(APIGASTO, fc)
        if (rest.data === "Exito") {
            history.push("/ventas")
        }
    }

    const Caja = async () => {
        const rest = await axios.get(APIGASTO, {
            params: {
                caja: "caja"
            }
        })
        setdata(rest.data)
        console.log(rest.data);
    }

    const UpdateCaja = async () => {
        if (caja < 100) {
            alert("La Caja no Acepta valores menores a 100")
        } else {
            let vc = new FormData()
            vc.append("valor_caja", caja)
            const rest = await axios.post(APIGASTO, vc)
            if (rest.data === "Exito") {
                handleClose()
                Caja()
            }
        }
    }
    const Ventas = async () => {
        let ventas = "ventas"
        let fc = new FormData()
        fc.append("ventas", ventas)
        const rest = await axios.post(APIVENTASDIA, fc)
        setventa(rest.data)
    }

    const Gastos = async () => {
        const rest = await axios.get(APIGASTO, {
            params: {
                gastos: "gastos"
            }
        })
        setgastos(rest.data)
    }
   
    useEffect(() => {
        Caja()
        Gastos()
        Ventas()
    }, [])

    return (
        <>
            <div className="container">
                <h1 className="text-gray-600 font-bold text-4xl text-center p-3 "><i>DASHBOAR LUV-N-OVEN</i></h1>
                <div className="row">

                   

                    <div className="col-md-4 mb-2 ">
                        <div className="md:w-2/9 xl:w-2/9 lg:flex ">
                            <div className="border border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-2 flex flex-row justify-between leading-normal">
                                <div className="mb-8">
                                    <p className="text-sm text-gray-600 flex items-center">
                                        <img className=""src="https://img.icons8.com/fluent/48/000000/warehouse-1.png" alt="inventario"
                                            style={{
                                                width:'50px',height:'50px',objectFit:"cover"
                                            }}/>
                                        <div className="text-gray-900 font-bold text-xl mb-2">Inventario</div>
                                    </p>
                                    <p className="text-gray-700 text-base">exercitationem praesentium nihil.</p>
                                </div>
                                <div className="flex items-center">
                                    <Link to="/inventario">
                                        <img className="w-10 h-10 rounded mr-4 cursor-pointer" src="https://img.icons8.com/color/48/000000/unlock-2.png" alt="close"/>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
 

                    <div className="col-md-4 mb-2">
                        <div className="md:w-2/9 xl:w-2/9 lg:flex ">
                            <div className="border border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-2 flex flex-row justify-between leading-normal">
                                <div className="mb-8">
                                    <p className="text-sm text-gray-600 flex items-center">
                                        <img className="w-10 h-10" src={fabrica} alt="" />                                      
                                        <div className="text-gray-900 font-bold text-xl mb-2">Cerrar turno</div>
                                    </p>
                                    <p className="text-gray-700 text-base">cierre de turno mañana o noche</p>
                                </div>
                                <div className="flex items-center">
                                    <Link to="/cuadre">
                                        <img className="w-10 h-10 rounded mr-4 cursor-pointer" src="https://img.icons8.com/color/48/000000/unlock-2.png" alt="ver"/>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 mb-2">
                        <div className="md:w-2/9 xl:w-2/9 lg:flex ">
                            <div className="border border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-2 flex flex-row justify-between leading-normal">
                                <div className="mb-8">
                                    <p className="text-sm text-gray-600 flex items-center">
                                        <img className="w-10 h-10" src="https://img.icons8.com/cotton/64/000000/receive-euro.png"  alt="" />
                                        <div className="text-gray-900 font-bold text-xl mb-2">Adelantos</div>
                                    </p>
                                    <p className="text-gray-700 text-base">exercitationem praesentium nihil.</p>
                                </div>
                                <div className="flex items-center">
                                    <img className="w-10 h-10 rounded mr-4 cursor-pointer" src="https://img.icons8.com/fluent/48/000000/lock-2.png" alt="ver" onClick={() => handleOpenC()} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 mb-2">
                        <div className="md:w-2/9 xl:w-2/9 lg:flex ">
                            <div className="border border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-2 flex flex-row justify-between leading-normal">
                                <div className="mb-8">
                                    <p className="text-sm text-gray-600 flex items-center">
                                        <img className="w-10 h-10" src="https://img.icons8.com/color/48/000000/general-ledger.png" alt="" />
                                        <div className="text-gray-900 font-bold text-xl mb-2">Gastos del día </div>
                                    </p>
                                    <p className="text-gray-700 text-base">total de gastos en el dia. ${gastos}</p>
                                </div>
                                <div className="flex items-center">
                                    <Link to= "/gastosadmin">
                                        <img className="w-10 h-10 rounded mr-4 cursor-pointer" src="https://img.icons8.com/color/48/000000/unlock-2.png" alt="ver"/>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 mb-2">
                        <div className="md:w-2/9 xl:w-2/9 lg:flex ">
                            <div className="border border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-2 flex flex-row justify-between leading-normal">
                                <div className="mb-8">
                                    <p className="text-sm text-gray-600 flex items-center">
                                        <img className="w-10 h-10"src="https://img.icons8.com/fluent/48/000000/withdrawal.png"  alt="" />
                                        <div className="text-gray-900 font-bold text-xl mb-2">Balance General</div>
                                    </p>
                                    <p className="text-gray-700 text-base">exercitationem praesentium nihil.</p>
                                </div>
                                <div className="flex items-center">
                                    <img className="w-10 h-10 rounded mr-4 cursor-pointer" src="https://img.icons8.com/fluent/48/000000/lock-2.png" alt="ver" onClick={() => handleOpenB()} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 mb-2">
                        <div className="md:w-2/9 xl:w-2/9 lg:flex ">
                            <div className="border border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-2 flex flex-row justify-between leading-normal">
                                <div className="mb-8">
                                    <p className="text-sm text-gray-600 flex items-center">
                                        <img className="w-10 h-10" src="https://img.icons8.com/fluent/48/000000/cash-register.png" alt="" />
                                        <div className="text-gray-900 font-bold text-xl mb-2">Ventas del día</div>
                                    </p>
                                    <p className="text-gray-700 text-base">total de ventas en el dia. ${venta}</p>
                                </div>
                                <div className="flex items-center">
                                    <img className="w-10 h-10 rounded mr-4 cursor-pointer" src="https://img.icons8.com/fluent/48/000000/lock-2.png" alt="ver" onClick={() => handleOpenV()} />
                                    <div className="text-sm">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 mb-2">
                        <div className="md:w-2/9 xl:w-2/9 lg:flex ">
                            <div className="border border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-2 flex flex-row justify-between leading-normal">
                                <div className="mb-8">
                                    <p className="text-sm text-gray-600 flex items-center">
                                        <img className="w-10 h-10" src="https://img.icons8.com/color/48/000000/general-ledger.png" alt="" />
                                        <div className="text-gray-900 font-bold text-xl mb-2">Otros Gastos</div>
                                    </p>
                                    <p className="text-gray-700 text-base">exercitationem praesentium nihil.</p>
                                </div>
                                <div className="flex items-center">
                                    <Link to="/gastos">
                                        <img className="w-10 h-10 rounded mr-4 cursor-pointer" src="https://img.icons8.com/color/48/000000/unlock-2.png" alt="ver"/>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 mb-2">
                        <div className="md:w-2/9 xl:w-2/9 lg:flex ">
                            <div className="border border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-2 flex flex-row justify-between leading-normal">
                                <div className="mb-8">
                                    <p className="text-sm text-gray-600 flex items-center">
                                        <img className="w-10 h-10 cursor-pointer" src="https://img.icons8.com/officel/16/000000/cash-register.png" alt="" onClick={handleOpen} />
                                        <div className="text-gray-900 font-bold text-xl mb-2">Caja Chica</div>
                                    </p>
                                    <p className="text-gray-700 text-base">Cantidad de Dinero en Caja Chica </p>
                                </div>
                                <div className="flex items-center">
                                    <img className="w-10 h-10 rounded mr-4 cursor-pointer" src="https://img.icons8.com/color/48/000000/unlock-2.png" alt="ver" onClick={() => alert(`Valor de caja Chica es de: $${data}`)} />
                                    <div className="text-sm">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                        >
                            {body}
                        </Modal>
                    </div>

                    <div className="col-md-4 mb-2">
                        <div className="md:w-2/9 xl:w-2/9 lg:flex ">
                            <div className="border border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-2 flex flex-row justify-between leading-normal">
                                <div className="mb-8">
                                    <p className="text-sm text-gray-600 flex items-center">
                                        <img className="w-10 h-10 " src="https://img.icons8.com/dusk/64/000000/safe-ok.png" alt="" />
                                        <div className="text-gray-900 font-bold text-xl mb-2">Caja General</div>
                                    </p>
                                    <p className="text-gray-700 text-base">exercitationem praesentium nihil.</p>
                                </div>
                                <div className="flex items-center">
                                    <img className="w-10 h-10 rounded mr-4 cursor-pointer"  src="https://img.icons8.com/fluent/48/000000/lock-2.png" alt="ver" onClick={() => handleOpenG()} />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
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

                <Modal
                    open={openB}
                    onClose={handleCloseB}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    {balance}
                </Modal>

                <Modal
                    open={openG}
                    onClose={handleCloseG}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    {general}
                </Modal>

                <Modal
                    open={openV}
                    onClose={handleCloseV}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    {ventasdia}
                </Modal>
            </div>
        </>
    );
}

export default withRouter(Inicio);
