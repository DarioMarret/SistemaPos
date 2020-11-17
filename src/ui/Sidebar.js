import React, { } from 'react';
import { NavLink, withRouter } from 'react-router-dom'

function Sidebar(props) {
    

    const Menu = () => {


        return (
            <>
                <NavLink className="text-gray-400 block hover:bg-yellow-900 hover:text-gray-900 p-2 no-underline" activeClassName="text-yellow-500" to="/">Inicio</NavLink>
                <NavLink className="text-gray-400 block hover:bg-yellow-900 hover:text-gray-900 p-2 no-underline" activeClassName="text-yellow-500" to="/nuevo-platillo">NuevoPlatillo</NavLink>
                <NavLink className="text-gray-400 block hover:bg-yellow-900 hover:text-gray-900 p-2 no-underline" activeClassName="text-yellow-500" to="/mesas">Mesas</NavLink>
                {/* <NavLink className="text-gray-400 block hover:bg-yellow-900 hover:text-gray-900 p-2 no-underline" activeClassName="text-yellow-500" to="/ordenar">Ordenar</NavLink> */}
            </>
        )
    }

    return (
        <>
            <div className="md:w-2/9 xl:w-2/9 bg-gray-800 mr-5">
                <div className="p-6">
                    <p className="uppercase text-yellow-200 text-2xl tracking-wide font-bold text-center">Luv-n-Oven</p>
                    <nav className="mt-1">
                        <Menu />
                    </nav>
                </div>
            </div>
        </>
    );
}

export default withRouter(Sidebar);
