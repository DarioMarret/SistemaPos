import React, { Fragment, useEffect, useState } from 'react';
import '../../css/styles.css';
import axios from 'axios';
import Modal from 'react-modal';
import { Button, TextField } from '@material-ui/core';

import { withRouter } from 'react-router-dom'

Modal.setAppElement('#root')
const APIREST = 'http://3.133.175.35/pruebas/';


const OrdenarPlatillo = (props) => {

    const { location, history } = props

    const [product, setProduct] = useState([]);
    const [categori, setCategori] = useState([]);
    const [ordenlista, setOrdenlista] = useState([]);
    const [TotalOrden, setTotalOrden] = useState([]);

    const Categoria = async () => {
        let cate = "categoria"
        let categoria = new FormData()
        categoria.append("categoria", cate)
        const rest = await axios.post(APIREST, categoria)

        setCategori(rest.data)
    }

    const productosCategoria = async (id) => {
        const res = await axios.get(APIREST, {
            params: {
                'id': id
            }
        })
        setProduct(res.data)
    }

    useEffect(() => {
        let idP = 1;
        productosCategoria(idP)
        ListaOrden()
        Total()
        Categoria()
    }, [])

    let path = location.pathname;
    let id = path.split("/");
    let mesa = id[3];
    let mesero = id[4];

    const Total = async () => {
        let path = location.pathname;
        let id = path.split("/");
        let orden = id[2];
        let fc = new FormData();
        fc.append("totalFactura", orden)
        const rest = await axios.post(APIREST, fc)
        setTotalOrden(rest.data)
        console.log(rest.data)
    }
    const Valor = () => {
        return (
            <>
                {
                    TotalOrden.map(iten => (
                        <>
                            <h1>PAGAR</h1>
                            <h1 className="text-center">{"$" + iten[0]}</h1>
                        </>
                    ))
                }

            </>

        )
    }


    const ListaOrden = async () => {
        let id_orden = id[2];
        const Listar = 'Listar'
        let orden = new FormData()
        orden.append("id_orden", id_orden)
        orden.append("Listar", Listar)
        const res = await axios.post(APIREST, orden)

        if (res.data === "Exito") {
            return 0
        } else {
            setOrdenlista(res.data)
            Total()
        }

    }

    const [mascantidad, setMasCantidad] = useState(1);
    const [modalIsOpen, selModalIsOpen] = useState(false)
    const [precio, setPrecio] = useState()
    const [producto, setProducto] = useState()
    const [id_categoria, setIdCategoria] = useState();
    const [idpro, setidpro] = useState();


    const agregarIten = async (precio, producto, categoria, id) => {
        setPrecio(precio)
        setIdCategoria(categoria)
        setProducto(producto)
        selModalIsOpen(true)
        setidpro(id)
    }

    const Guardar = async () => {
        let id_orden = id[2];
        let extra = document.getElementById('acomp').value
        let Op = new FormData()
        Op.append("id_orden", id_orden)
        Op.append("extra", extra)
        Op.append("cantidad", mascantidad)
        Op.append("categoria", id_categoria)
        Op.append("precio", precio)
        Op.append("producto", producto)
        Op.append("mesero", mesero)
        await axios.post(APIREST, Op)
        ListaOrden()
        setMasCantidad(1)
        UpdateProduct()

    }

    const UpdateProduct = async () => {

        let update = new FormData()
        update.append("id", idpro)
        update.append("cantidad", mascantidad)
        const rest = await axios.post('http://3.133.175.35/pruebas/producto.php', update)

    }


    const Pro = () => {
        return (
            <>
                {
                    product.map(iten => (
                        <div className="product " key={iten.id}>
                            <img className="w-16 cursor-pointer img img-fluid" src={"data:image/png;base64," + iten.foto} alt="Eliminar" onClick={() => agregarIten(iten.precio, iten.producto, iten.categoria, iten.id)} />
                            <p className="text-center precio">${iten.precio}</p>
                            <h1 className="text-center iten font-bold text-sm">{iten.producto.slice(0, 25)}</h1>
                        </div>

                    ))
                }

                <Modal isOpen={modalIsOpen}
                    ariaHideApp={false}

                    onRequestClose={() => selModalIsOpen(false)}
                    style={{
                        overlay: {
                            position: "absolute",
                            width: "50%",
                            height: "50%",
                            margin: "auto",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: "rgba(84, 110, 135, 1)"
                        },
                        content: {
                            position: "absolute",
                            top: "40px",
                            left: "40px",
                            right: "40px",
                            bottom: "40px",
                            border: "1px solid #ccc",
                            background: "#fff",
                            overflow: "auto",
                            WebkitOverflowScrolling: "touch",
                            outline: "none",
                            padding: "5px"
                        }
                    }}
                >
                    <h1 className="text-center text-xl font-black">{producto} ${precio}</h1>
                    <hr className="bg-blue-800" />
                    <div className="container pt-3">
                        <div className="grid grid-cols-3 divide-x divide-gray-400 ">
                            <button className="btn"><h1 className="text-3xl font-black" onClick={() => setMasCantidad(mascantidad - 1)}>-</h1></button>
                            <h1 className="text-center text-3xl font-black">{mascantidad}</h1>
                            <button className="btn" onClick={() => setMasCantidad(mascantidad + 1)}><h1 className="text-3xl font-black">+</h1></button>
                        </div>

                        <div className="container pt-3">
                            <input type="text" id="acomp" className="input-group text-xl font-black p-2" placeholder="Ingrese una descripcion o extras del plato" />
                        </div>

                        <div className="grid grid-cols-2 divide-x divide-gray-400 pt-5">
                            <button className="btn btn-danger text-center font-black" onClick={() => selModalIsOpen(false) + setMasCantidad(1)}>Cerrar</button>
                            <button className="btn btn-primary font-black" onClick={() => Guardar() + selModalIsOpen(false)}>Guardar</button>
                        </div>

                    </div>
                </Modal>
            </>
        )
    }





    const Iten = () => {
        return (
            <>
                <div className="md:w-2/6 xl:w-2/6 bg-gray-800">
                    <div className="p-4 categoriaO">
                        <p className="uppercase text-yellow-200 text-2xl tracking-wide font-bold text-center">Categoria</p>
                        <nav className="mr-1">
                            {
                                categori.map(iten => (
                                    <Fragment key={iten.id}>
                                        <h1 className="text-gray-400 block hover:bg-yellow-900 hover:text-gray-900 p-2 cursor-pointer" activeClassName="text-yellow-500" onClick={() => productosCategoria(iten.id)}>{iten.categoria}</h1>
                                    </Fragment>

                                ))
                            }
                        </nav>
                    </div>
                </div>
            </>
        )
    }


    const [open, setOpen] = useState(false)
    const [comida, setcomida] = useState()
    const [numero, setnumero] = useState(1)
    const [precio2, setprecio2] = useState(0)
    const [iditen, setiditen] = useState();
    const [extras, setextras] = useState();


    const ListaIten = (comida, id, precio, extras) => {
        setOpen(true)
        setiditen(id)
        setcomida(comida)
        setprecio2(precio)
        setextras(extras)
    }

    const ElimindarPorId = async () => {
        let iten = null;
        let Eli = new FormData()
        Eli.append("id", iditen)
        Eli.append("iten", iten)
        await axios.post(APIREST, Eli)
        ListaOrden()
        setOpen(false)
    }


    const EditarIten = async () => {
        let extra = document.querySelector('#extraEditar').value
        if (extra === '') {
            console.log(extra)
            let editar = "editar";
            let Editar = new FormData()
            Editar.append("id", iditen)
            Editar.append("editar", editar)
            Editar.append("precio2", precio2)
            Editar.append("extras", extras)
            Editar.append("cantidad", numero)
            await axios.post(APIREST, Editar)
            ListaOrden()
            setOpen(false)
        } else {
            console.log(extra)
            let editar = "editar";
            let Editar = new FormData()
            Editar.append("id", iditen)
            Editar.append("editar", editar)
            Editar.append("precio2", precio2)
            Editar.append("extras", extra)
            Editar.append("cantidad", numero)
            await axios.post(APIREST, Editar)
            ListaOrden()
            setOpen(false)
        }

    }

    const UpdateIten = async () => {
        let Editar = new FormData()
        Editar.append("precio2", precio2)
        Editar.append("cantidad", numero)
        await axios.post(APIREST, Editar)
    }

    const Orden = () => {

        return (
            <>
                {ordenlista.map(iten => (
                    <Fragment key={iten.id} >
                        <tr>{setNombreCliente(iten.cliente)}
                            <td className="border-r-2 px-1">{iten.cantidad}</td>
                            <td className="border-r-2 px-1 cursor-pointer" onClick={() => ListaIten(iten.comida, iten.id, iten.p_unitario, iten.extras)} >{iten.comida}</td>
                            <td className="border-r-2 px-1">${iten.p_unitario}</td>
                            <td className="border-l-2 px-1">${iten.p_total}</td>
                        </tr>

                    </Fragment>

                ))
                }
                <Modal isOpen={open}
                    ariaHideApp={false}
                    onRequestClose={() => setOpen(false)}
                    style={{
                        overlay: {
                            position: "absolute",
                            width: "50%",
                            height: "50%",
                            margin: "auto",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: "rgba(84, 110, 135, 1)"
                        },
                        content: {
                            position: "absolute",
                            top: "40px",
                            left: "40px",
                            right: "40px",
                            bottom: "40px",
                            border: "1px solid #ccc",
                            background: "#fff",
                            overflow: "auto",
                            WebkitOverflowScrolling: "touch",
                            outline: "none",
                            padding: "5px"
                        }
                    }}
                >
                    <h1 className="text-center text-xl font-black">EDITAR: {comida} ${precio2}</h1>
                    <hr className="bg-blue-800" />
                    <div className="container pt-3">

                        <div className="grid grid-cols-3 divide-x divide-gray-400 ">
                            <button className="btn" onClick={() => setnumero(numero - 1)}><h1 className="text-3xl font-black" >-</h1></button>
                            <h1 className="text-center text-xl font-black">{numero}</h1>
                            <button className="btn" onClick={() => setnumero(numero + 1)} ><h1 className="text-3xl font-black">+</h1></button>
                        </div>

                        <div className="container pt-2">
                            <input type="text"
                                placeholder={extras}
                                id="extraEditar"

                                className="form-control text-xl font-black p-2"
                            />
                        </div>

                        <div className="grid grid-cols-3 divide-x divide-gray-400 pt-1">
                            <button className="btn btn-info text-center font-black" onClick={() => ElimindarPorId()}>Eliminar</button>
                            <button className="btn btn-danger text-center font-black" onClick={() => setOpen(false) + setnumero(1)}>Cerrar</button>
                            <button className="btn btn-primary font-black" onClick={() => EditarIten() + UpdateIten() + setOpen(false)} >Editar</button>
                        </div>

                    </div>
                </Modal>

            </>
        )

    }

    const [dividirCuenta, setdividirCuenta] = useState(false)
    const [openFactura, setopenFactura] = useState(false)

    const [dicomida, setDicomida] = useState()
    const [dicantidad, setDicantidad] = useState()
    const [diid, setDiid] = useState()
    const [diunitario, setDiunitario] = useState()

    const [dividirCantidad, setdividirCantidad] = useState(1)

    const PasarDividir = (dcomida, dcantidad, did, dp_unitario) => {
        setdividirCuenta(true)
        setDicomida(dcomida)
        setDicantidad(dcantidad)
        setDiid(did)
        setDiunitario(dp_unitario)
    }

    const PasarLaDivicion = async () => {

        if (dividirCantidad > dicantidad || dividirCantidad < 1) {
            window.alert('NO SE PUEDE PASAR MAS DE LA CANTIDAD ORIGINAL O MENOS DE 1')
        } else {
            const cuenta = 'dividir'
            let Dividir = new FormData()
            Dividir.append("comida", dicomida)
            Dividir.append("cantidad", dividirCantidad)
            Dividir.append("id", diid)
            Dividir.append("p_unitario", diunitario)
            Dividir.append("dividir", cuenta)
            await axios.post(APIREST, Dividir)
            ListaOrden()
            OptenerDivicion()
        }
    }

    const Original = () => {
        return (
            <>
                {ordenlista.map(iten => (
                    <Fragment key={iten.id}>
                        <tr>
                            <td className="border-r-2 px-1">{iten.cantidad}</td>
                            <td className="border-r-2 px-1 cursor-pointer" onClick={() => PasarDividir(iten.comida, iten.cantidad, iten.id, iten.p_unitario)}>{iten.comida}</td>
                            <td className="border-r-2 px-1">${iten.p_unitario}</td>
                            <td className="border-l-2 px-1">${iten.p_total}</td>
                        </tr>
                        <Modal isOpen={dividirCuenta}
                            ariaHideApp={false}
                            onRequestClose={() => setdividirCuenta(false)}
                            style={{
                                overlay: {
                                    position: "absolute",
                                    width: "60%",
                                    height: "35%",
                                    margin: "auto",
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    backgroundColor: "rgba(84, 110, 135, 1)"
                                },
                                content: {
                                    position: "absolute",
                                    border: "1px solid #ccc",
                                    background: "#fff",
                                    overflow: "auto",
                                    WebkitOverflowScrolling: "touch",
                                    outline: "none",
                                    padding: "5px"
                                }
                            }}
                        >
                            <h1 className="text-center text-xl font-black">{dicomida} Cantidad: {dicantidad}</h1>
                            <hr className="bg-blue-800" />

                            <div className="container pt-3">

                                <div className="grid grid-cols-3 divide-x divide-gray-400 ">
                                    <button className="btn" onClick={() => setdividirCantidad(dividirCantidad - 1)} ><h1 className="text-xl font-black" >-</h1></button>
                                    <h1 className="text-center" type="number">{dividirCantidad}</h1>
                                    <button className="btn" onClick={() => setdividirCantidad(dividirCantidad + 1)} ><h1 className="text-xl font-black">+</h1></button>
                                </div>

                                <div className="grid grid-cols-2 divide-x divide-gray-400">
                                    <button className="btn btn-danger text-center font-black" onClick={() => setdividirCuenta(false) + setdividirCantidad(1)} >Cerrar</button>
                                    <button className="btn btn-primary font-black" onClick={() => PasarLaDivicion() + setdividirCantidad(1) + setdividirCuenta(false)} >Pasar</button>
                                </div>

                            </div>
                        </Modal>
                    </Fragment>
                ))
                }

            </>
        )
    }
    const [cuentaDi, setcuentaDi] = useState([]);

    const OptenerDivicion = async () => {

        const cuenta_dividita = 'cuenta_dividita';
        let cu = new FormData();
        cu.append("cuenta_dividita", cuenta_dividita)
        const rest = await axios.post(APIREST, cu)
        setcuentaDi(rest.data)
    }


    const Imposible = async (array) => {
        const res = await axios.get('http://localhost/impresora/comanda.php', {
            params: {
                'array': JSON.stringify(array)
            }
        })
        console.log(res);
    }


    const Comanda = async () => {
        let path = location.pathname;
        let id = path.split("/");
        let id_orden = id[2];
        let Orden = new FormData()
        Orden.append("id_orden", id_orden)
        const rest = await axios.post('http://3.133.175.35/pruebas/Imprimir.php', Orden)
        let array = rest.data;
        console.log(rest.data)

        if (rest.data === "") {
            return 0
        } else {
            setTimeout(() => {
                Imposible(array)
            }, 1000)

        }


        console.log(rest);
        console.log(id_orden)
    }

    const [clienteOpen, setOpenCliente] = useState(false);
    const [sheart, setSheart] = useState("");
    const [Cliente, setCliente] = useState([]);
    const [NombreCliete, setNombreCliente] = useState([]);



    const BuscarCliente = async () => {
        let cd = new FormData()
        cd.append("cedula", sheart)
        const rest = await axios.post('http://3.133.175.35/pruebas/buscarCliente.php', cd)
        setCliente(rest.data)

    }

    const IdCliente = async (id, nombre) => {
        let path = location.pathname;
        let idO = path.split("/");
        let id_orden = idO[2];
        let cl = new FormData()
        cl.append("id", id)
        cl.append("id_orden", id_orden)
        cl.append("cliente", nombre)
        const rest = await axios.post('http://3.133.175.35/pruebas/buscarCliente.php', cl)
        console.log(rest);
        ListaOrden()
    }

    const ResultadoCliente = () => {
        return (
            <>{
                Cliente.map(div => (
                    <Fragment key={div.id}>
                        <tr className="">
                            <td className="border-l-1 px-1 text-xs">{div.cedula}</td>
                            <td className="border-l-1 border-lr-2 px-1 cursor-pointer text-xs" onClick={() => IdCliente(div.id, div.nombre)} >{div.nombre}</td>
                            <td className="border-l-1 px-1 text-xs">{div.direccion}</td>
                            <td className="border-l-1 px-1 text-xs">{div.email}</td>
                            <td className="border-l-1 px-1 text-xs">{div.telefono}</td>
                        </tr>
                    </Fragment>
                ))
            }
            </>
        )
    }

    const FacturaImposible = async (array) => {
        const res = await axios.get('http://localhost/impresora/factura.php', {
            params: {
                'array': JSON.stringify(array)
            }
        })
        history.push("/mesas")
        // console.log(res);
    }

    const Factura = async () => {
        let path = location.pathname;
        let id = path.split("/");
        let id_orden = id[2];
        console.log(id_orden)
        let Orden = new FormData()
        Orden.append("id_orden", id_orden)
        const rest = await axios.post('http://3.133.175.35/pruebas/factura.php', Orden)
        let array = rest.data;
        console.log(rest)

        if (rest.data !== null) {
            setTimeout(() => {
                FacturaImposible(array)
            }, 1000)
        } else {
            return 0
        }

    }

    useEffect(() => {
        BuscarCliente()
    }, [sheart])

    const [pFactura, setPfactura] = useState(false);
    const [ctcedula, setCtCedula] = useState(Number)
    const [resta, setRest] = useState([]);

    const [ctNombre, setctNombre] = useState('');
    const [ctEmail, setctEmail] = useState(String);
    const [ctDireccion, setctDireccion] = useState(String);
    const [ctTelefono, setctTelefono] = useState('');
    const [ctId, setId] = useState(Number);
    const [ctCliente, setliente] = useState('')

    const AgregarClienteCuentaDivi = async () => {
        let path = location.pathname;
        let id = path.split("/");
        let id_orden = id[2];
        let cu = new FormData();
        cu.append("ctId", ctId)
        cu.append("cliente", ctCliente)
        cu.append("orden", id_orden)
        const rest = await axios.post(APIREST, cu)
        console.log(ctId, ctCliente, id_orden)
        ListaOrden()
    }

    const BuscarClienteFacturaDivi = async () => {
        if (ctcedula.length === 10) {
            let cd = new FormData()
            cd.append("cedula", ctcedula)
            const rest = await axios.post('http://3.133.175.35/pruebas/buscarCliente.php', cd)
            setRest(rest.data);
            Resyultado()
        }
    }

    const Resyultado = () => {
        return (
            <>
                {
                    resta.map(clien => (
                        <>
                            {setId(clien.id), setliente(clien.nombre)}
                            <h1>{clien.nombre}</h1>
                            <h1>{clien.cedula}</h1>
                        </>
                    ))
                }
            </>
        )
    }

    const GuardarClienteFacturaDivi = async () => {

        if (ctcedula === '' || ctNombre === '' || ctEmail === '' || ctDireccion === '' || ctTelefono === '') {
            window.confirm('Todo los campo son Obligatorio')
        } else {
            let cd = new FormData()
            cd.append("cedula", ctcedula)
            cd.append("nombre", ctNombre)
            cd.append("email", ctEmail)
            cd.append("direccion", ctDireccion)
            cd.append("telefono", ctTelefono)
            const rest = await axios.post('http://3.133.175.35/pruebas/buscarCliente.php', cd)
            console.log(rest);
            ListaOrden()
        }


    }


    return (

        <>

            <div className="md:flex min-h-full " >

                <Iten />
                <div className="factutacion1">
                    <div className="container">
                        <div className="md:w-full xl:w-full">
                            <div className="article">
                                <div className="row">
                                    <Pro />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>


                <div className="factutacion">
                    <div className="en">
                        <div className="container"><h1 className="text-center text-base font-black">Mesa: <samp>{mesa}</samp></h1></div>
                        <div className="container"><h1 className="text-left text-base font-black">Cliente: <samp className="text-center text-sm font-black">{NombreCliete}</samp></h1></div>
                        <div className="container"><h1 className="text-left text-base font-black">Mesero: <samp className="text-center text-sm font-black">{mesero}</samp></h1></div>

                        <div className="grid grid-cols-2 divide-x divide-gray-400">
                            <button className="border-solid  pl-5 pr-5 text-center border-gray-600 btn bg-gray-600 hover:bg-gray-800" onClick={() => setOpenCliente(true)} > Buscar/Cliente </button>
                            <button className="border-solid  pl-5 pr-5 text-center border-gray-600 btn bg-gray-600 hover:bg-gray-800" onClick={() => setopenFactura(true)}>Agregar/Cliente</button>
                        </div>
                    </div>


                    <div className="rol">
                        <table className="table-auto">

                            <thead>
                                <tr>
                                    <th className="px-1">CANT</th>
                                    <th className="px-1">DETALLE</th>
                                    <th className="px-1">P.UNT</th>
                                    <th className="px-1">P.TOTAL</th>
                                </tr>
                            </thead>

                            <tbody className="sc">
                                <Orden />
                            </tbody>

                        </table>
                    </div>

                    <div className="grid grid-cols-3">
                        <button className="border-solid border-2 p-3 border-yellow-200 btn bg-yellow-600 hover:bg-yellow-700" onClick={() => history.push("/mesas")}>MESA</button>
                        <button className="border-solid border-2 p-3 border-gray-400 btn bg-blue-100 hover:bg-gray-700" onClick={() => Comanda()}>COMANDA</button>
                        <Button variant="contained" color="primary" onClick={() => Factura()} >
                            <Valor/>
                        </Button>
                    </div>
                </div>

            </div>

            <Modal isOpen={clienteOpen}
                ariaHideApp={false}
                onRequestClose={() => setOpenCliente(false) + setCliente([""])}
                style={{
                    overlay: {
                        width: "90%",
                        height: "70%",
                        margin: "auto",
                    },
                    content: {
                        position: "absolute",
                        overflow: "auto",
                        WebkitOverflowScrolling: "touch",
                        outline: "none",
                        padding: "1px"
                    }
                }}
            >
                <div className="container pt-3">

                    <div className="grid grid-cols-1 divide-x divide-gray-400 ">

                        <div className="container">
                            <TextField id="filled-basic" label="Ingrese Numero de Cedula" variant="filled" onChange={(e) => setSheart(e.target.value)} />

                            <tbody className="container">
                                <ResultadoCliente />
                            </tbody>
                        </div>
                    </div>
                </div>
            </Modal>

            <Modal isOpen={openFactura}
                ariaHideApp={false}
                onRequestClose={() => setopenFactura(false)}
                style={{
                    overlay: {
                        width: "50%",
                        height: "70%",
                        margin: "auto",
                    },
                    content: {
                        position: "absolute",
                        overflow: "auto",
                        WebkitOverflowScrolling: "touch",
                        outline: "none",
                        padding: "1px"
                    }
                }}
            >
                <h1 className="text-center text-xl font-black">Agregar Cliente</h1>
                <hr className="bg-blue-800" />
                <div className="container pt-3">

                    <div className="container">
                        <div className="justify-start">
                            <div className="control-group">
                                <TextField id="standard-basic" label="Ingrese Numero de Cedula" variant="filled" onChange={(e) => setCtCedula(e.target.value)} />
                                <Button color="primary" onClick={() => BuscarClienteFacturaDivi()}>Buscar</Button>
                            </div>

                            <div className="control-group">
                                <TextField id="standard-basic" label="Ingrese Nombre y Apellido" variant="filled" onChange={(e) => setctNombre(e.target.value)} />
                                <Button color="primary" onClick={() => AgregarClienteCuentaDivi()}>Agregar</Button>
                            </div>
                            <div className="control-group">
                                <TextField id="standard-basic" label="Direccion" variant="filled" onChange={(e) => setctDireccion(e.target.value)} />
                                <Button color="primary" onClick={() => GuardarClienteFacturaDivi()}>Nuevo Cliente</Button>
                            </div>
                            <TextField id="standard-basic" label="Telefono" variant="filled" onChange={(e) => setctTelefono(e.target.value)} />
                            <TextField id="standard-basic" label="Email" variant="filled" onChange={(e) => setctEmail(e.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <Resyultado />
                        </div>
                    </div>
                </div>
            </Modal>

        </>
    );
}

export default withRouter(OrdenarPlatillo);