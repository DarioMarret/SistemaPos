import React from 'react'
import {Switch, Route } from "react-router-dom"
import NuevoPlatillo from '../components/paginas/NuevoPlatillo'
import Mesas from '../components/paginas/Mesas'
import Inicio from '../components/paginas/Inicio'
import OrdenarPlatillo from '../components/paginas/OrdenarPlatillo'
import Login from '../components/paginas/Login'
import CajaGeneral from '../components/paginas/CajaGeneral'
import Adelantos from '../components/paginas/Adelantos'
import VentasdelDia from '../components/paginas/VentasdelDia'
import GastosdelDia from '../components/paginas/GastosdelDia'
import GastosAdministrativo from '../components/paginas/GastosAdministrativo'
import Inventario from '../components/paginas/Inventario'
import BalanceGeneral from '../components/paginas/BalanceGeneral'
import Cuadre from '../components/paginas/Cuadre'
import Reporte from '../components/paginas/reporte'

export default function Routes() {
    return (
        <Switch>
            <Route path="/" exact>
                <Inicio />
            </Route>
            <Route path="/nuevo-platillo" exact>
                <NuevoPlatillo />
            </Route>
            <Route path="/mesas" exact>
                <Mesas />
            </Route>
            <Route path="/platillos/:id_orden/:mesa/:mesero" exact>
               <OrdenarPlatillo/>
            </Route>
            <Route path="/general" exact>
                <CajaGeneral />
            </Route>
            <Route path="/adelantos" exact>
                <Adelantos />
            </Route>
            <Route path="/ventas" exact>
               <VentasdelDia/>
            </Route>
            <Route path="/gastos" exact>
                <GastosdelDia/>
            </Route>
            <Route path="/gastosadmin" exact>
                <GastosAdministrativo/>
            </Route>
            <Route path="/inventario" exact>
               <Inventario/>
            </Route>
            <Route path="/balance" exact>
                <BalanceGeneral/>
            </Route>
            <Route path="/cuadre" exact>
                <Cuadre />
            </Route>
            <Route path="/reporte" exact>
               <Reporte/>
            </Route>
            <Route path="/login" exact>
               <Login/>
            </Route>
       </Switch>
    )
}