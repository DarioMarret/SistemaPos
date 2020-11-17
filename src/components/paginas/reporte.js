import React, { useState, useEffect, Fragment } from "react";
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import ExportExcel from 'react-export-excel'
import { Button } from '@material-ui/core'

const ExcelFile = ExportExcel.ExcelFile
const ExcelSheet = ExportExcel.ExcelSheet
const ExcelColumn = ExportExcel.ExcelColumn

const APICUADRE = 'http://3.133.175.35/pruebas/cuadre.php'
const hora = new Date()
const opciones = { hour: 'numeric', minute: '2-digit' };
const horaactual = hora.toLocaleDateString('es-ES', opciones)

const Report = (props) => {
    const { history } = props;

    const [data, setdata] = useState([])
    const [gasto, setgasto] = useState([])
    const [venta, setventa] = useState(Number)
    const [gastos, setgastos] = useState(Number)
    const [caja, setcaja] = useState(Number)
    const Matutino = 'matutino'
    const total = parseFloat(venta) + parseFloat(caja) - parseFloat(gastos)

    const Ventas = async () => {
        const rest = await axios.get(APICUADRE, {
            params: {
                matutino: Matutino,
                venta: 'venta'
            }
        })
        if (rest.data === 0) {
            return 0
        } else {
            setventa(rest.data)
        }
    }

    const Caja = async () => {
        const rest = await axios.get(APICUADRE, {
            params: {
                matutino: Matutino,
                caja: 'caja'
            }
        })
        if (rest.data === 0) {
            return 0
        } else {
            setcaja(rest.data)
        }
    }
    const Gastos = async () => {
        const rest = await axios.get(APICUADRE, {
            params: {
                matutino: Matutino,
                gastos: 'gastos'
            }
        })

        if (rest.data === 0) {
            return
        } else {
            setgastos(rest.data)
        }
    }
    const Reporte = async () => {
        const imprimir = "imprimir";
        let fc = new FormData()
        fc.append("imprimir", imprimir)
        const result = await axios.post(APICUADRE, fc)
        console.log(result.data)
        if (result.data === 'No') {
            return 0
        } else {
            setdata(result.data)
        }

    }
    const ReporteG = async () => {
        const imprimir = "imprimirG";
        let fc = new FormData()
        fc.append("imprimirG", imprimir)
        const result = await axios.post(APICUADRE, fc)
        if (result.data === 'No') {
            return 0
        } else {
            setgasto(result.data)
        }

    }
    useEffect(() => {
        Reporte()
        ReporteG()
        Ventas()
        Caja()
        Gastos()
    }, [])

    const Tablas = () => {

        return (
            <>
                { data.map((iten, i) => (
                    <Fragment key={iten.id}>
                        <tr>
                            <td className="border px-4 ">{iten.cantidad}</td>
                            <td className="border px-4 ">{iten.comida}</td>
                            <td className="border px-4 ">{iten.precio}</td>
                        </tr>
                    </Fragment>
                ))}
            </>
        )
    }
    const TablasG = () => {

        return (
            <>
                { gasto.map(iten => (
                    <Fragment key={iten.id}>
                        <tr>
                            <td className="border px-4 ">{iten.detalle}</td>
                            <td className="border px-4 ">{iten.gastos}</td>
                            <td className="border px-4 ">{iten.fecha}</td>
                        </tr>
                    </Fragment>
                ))}
            </>
        )
    }
    const _exportPdf = () => {
        ResetM()
    }

    const ResetM = async () => {
        const rese = "rese";
        let fc = new FormData()
        fc.append("rese", rese)
        const rest = await axios.post(APICUADRE, fc)
        if (rest.data === "Exito") {
            alert("Listo calisto")
            history.push("/cuadre")
        }
    }

    

    return (
        <>
            <ExcelFile element={<Button color="secondary" variant="contained" onClick={()=>_exportPdf()}>Export a Excel XLSX</Button>} filename="Gastos Admin">
                <ExcelSheet data={data} name="reporteVenta">
                    <ExcelColumn label="Cantidad" value="cantidad" />
                    <ExcelColumn label="Producto" value="comida" />
                    <ExcelColumn label="Precio Salida" value="precio" />
                </ExcelSheet>
                <ExcelSheet data={gasto} name="reporteGasto">
                    <ExcelColumn label="Detalle" value="detalle" />
                    <ExcelColumn label="Gasto" value="gastos" />
                    <ExcelColumn label="Fecha" value="fecha" />
                </ExcelSheet>
            </ExcelFile>
 
            <div className="ml-20" id="capture">
                <h1 className="text-2xl "><i>Reporte de venta de {horaactual}</i></h1>
                <table className="table-auto">
                    <thead>
                        <tr>
                            <th className="text-xl px-4 py-2">Cantidad</th>
                            <th className="text-xl px-4 py-2">Producto</th>
                            <th className="text-xl px-4 py-2">Precio</th>
                        </tr>
                    </thead>
                    <tbody>
                        <Tablas />
                    </tbody>
                </table>
                <div >
                    <h1 className="text-2xl "><i>Reporte de gastos de {horaactual}</i></h1>
                    <table className="table-auto">
                        <thead>
                            <tr>
                                <th className="text-xl px-4 py-2">Detalle</th>
                                <th className="text-xl px-4 py-2">Gasto</th>
                                <th className="text-xl px-4 py-2">Fecha</th>
                            </tr>
                        </thead>
                        <tbody>
                            <TablasG />
                        </tbody>
                    </table>
                </div>
                <h1 className="text-2xl "><i>Cuadre de Caja {horaactual}</i></h1>
                <table className="table-auto">
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
                            <td className="text-right">${gastos}</td>
                        </tr>
                    </tbody>
                </table>
                <h1 className="text-center p-2"><i>Total en Caja Chica ${total.toFixed(2)}</i></h1>
            </div>

        </>
    );

}

export default withRouter(Report);
