import React, { useState, useEffect, Fragment } from "react";
import axios from 'axios'


const APIBALANCE = 'http://3.133.175.35/pruebas/balance.php';

const BalanceGeneral = () => {
    const [venta, setventa] = useState([])
    const [gastos, setgastos] = useState([])
    const [totalV, settotalV] = useState(Number)
    const [totalG, settotalG] = useState(Number)
    const [desde, setdesde] = useState('')
    const [hasta, sethasta] = useState('')
    const Total = parseFloat(totalV) - parseFloat(totalG)
    const Subt = Total / 1.12
    const Iva = Total - Subt

    const TotalVenta = async () => {
        let totalventa = 'totalventa'
        let fc = new FormData()
        fc.append("totalventa", totalventa)
        fc.append("desdeV", desde)
        fc.append("hastaV", hasta)
        const rest = await axios.post(APIBALANCE, fc)
        settotalV(rest.data);
        
    }
    const TotalGastos = async () => {
        let totalgastos = 'totalgastos'
        let fc = new FormData()
        fc.append("totalgastos", totalgastos)
        fc.append("desdeT", desde)
        fc.append("hastaT", hasta)
        const rest = await axios.post(APIBALANCE, fc)
        settotalG(rest.data);
       
    }

    const Venta = async () => {
        let fc = new FormData()
        fc.append("desde", desde)
        fc.append("hasta", hasta)
        const rest = await axios.post(APIBALANCE, fc)
        if (rest.data != null) {
            setventa(rest.data)
            Gastos()
            TotalVenta()
        } else {
            return 0
        }
    }

    const Gastos = async () => {
        let fc = new FormData()
        fc.append("desdeG", desde)
        fc.append("hastaG", hasta)
        const rest = await axios.post(APIBALANCE, fc)
        if (rest.data) {
            setgastos(rest.data)
            TotalGastos()
        }
    }

    const TablaV = () => {
        return (
            <>
                { venta.map((iten, i) => (
                    <Fragment key={iten.id}>
                        <tr>
                            <td className="border px-1 ">{i+=1}</td>
                            <td className="border px-1 ">{iten.fecha}</td>
                            <td className="border px-1 ">{iten.total}</td>   
                        </tr>
                    </Fragment>
                ))}
            </>
        )
    }

    const TablaG = () => {
        return (
            <>
                { gastos.map((iten, i) => (
                    <Fragment key={iten.id}>
                        <tr>
                            <td className="border px-1 ">{i+=1}</td>
                            <td className="border px-1 ">{iten.fecha}</td>
                            <td className="border px-1 ">{iten.gastos}</td>   
                        </tr>
                    </Fragment>
                ))}
            </>
        )
    }

    return (
        <>
            <h1 className="text-4xl text-center text-gray-700 font-bold"><i>Balance General</i></h1>
            <hr className="pt-2" />
            <div className="form-control" align="center">
                <form>
                    <div className="form-group row justify-content-between">
                        <i><label htmlFor="" className="font-bold">Desde:</label>
                            <input type="date"  className="form-group" onChange={(e)=>setdesde(e.target.value)} /></i>
                        <i><label htmlFor="" className="font-bold">Hasta: </label>
                            <input type="date" className="form-group" onChange={(e)=>sethasta(e.target.value)} /></i>
                        <div className="">
                            <i className="bg-blue-600 border-gray-400 rounded-sm text-center p-2 no-underline text-white cursor-pointer hover:bg-blue-900" onClick={()=>Venta()}>GENERAR BALANCE</i>
                        </div>
                    </div>
                </form>
            </div>

            <div className="grid grid-cols-2 pt-2" align="center">
                <div className="container">
                    <div className="row justify-center" >
                        <div className="card">
                            <div className="card-header">
                                <h1 className="text-center text-2xl ml-20 mr-20 "><i>VENTAS</i></h1>
                            </div>
                            <div className="card-body overflow-y-scroll h-56">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <td>Dias</td>
                                            <td>Fecha</td>
                                            <td>Venta</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <TablaV/>
                                    </tbody>
                                </table>
                            </div>
                            <div className="card-footer">
                                <h1 className="text-center text-2xl"><i>Total: ${totalV}</i></h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row justify-center">
                        <div className="card">
                            <div className="card-header">
                                <h1 className="text-center text-2xl ml-20 mr-20"><i>GASTOS</i></h1>
                            </div>
                            <div className="card-body overflow-y-scroll h-56">
                            <table className="table">
                                    <thead>
                                        <tr>
                                            <td>Dias</td>
                                            <td>Fecha</td>
                                            <td>Venta</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <TablaG/>
                                    </tbody>
                                </table>
                            </div>
                            <div className="card-footer">
                                <h1 className="text-center text-2xl"><i>Total: ${totalG}</i></h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 p-3">
                <div className="card-header">
                    <h2><i>Resultado Total: ${Total.toFixed(2)}</i></h2>
                    <h2><i>Resultado Total menos Iva: ${Subt.toFixed(2)}</i></h2>
                    <h2><i>Resultado Total Iva: ${Iva.toFixed(2)}</i></h2>
                </div>
            </div>
        </>
    );
}

export default BalanceGeneral;