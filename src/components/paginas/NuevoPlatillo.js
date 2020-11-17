import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik'
import * as Yup from 'yup'



const API_PRODUCTO = 'http://3.133.175.35/pruebas/producto.php';

const NuevoPLatillo = () => {
    const [imagen, setImagen] = useState(null)
    const [data, setData] = useState([])
    const Categoria = async () => {
        const rest = await axios.get(API_PRODUCTO)
        setData(rest.data)
    }

    const formik = useFormik({
        initialValues: {
            Categoria: '',
            NuevoProducto: '',
            PrecioCompra: '',
            PrecioVenta: '',
            Imagen: '',
            Stock:''
        },
        validationSchema: Yup.object({
            Categoria: Yup.string()
                .min(1, 'Minimo de Caracteres 2')
                .required('El Categoria del Plato es obligatorio'),
            NuevoProducto: Yup.string()
                .min(2, 'Minimo de Caracteres 5')
                .required('El Nombre del productos es obligatorio'),
            PrecioCompra: Yup.number()
                .min(1, 'Debe ingresar Numero')
                .required('El Precio Compra del productos es obligatorio'),
            PrecioVenta: Yup.number()
                .min(1, 'Debe ingresar Numero')
                .required('El Precio Venta del productos es obligatorio'),
            Stock: Yup.number()
                .min(1, 'Debe ingresar Numero')
                .required('El Stock del productos es obligatorio'),
        }),
        onSubmit: async (formData)  => {
            let form = new FormData()
            form.append("categoria", formData.Categoria)
            form.append("producto", formData.NuevoProducto)
            form.append("p_compra", formData.PrecioCompra)
            form.append("p_venta", formData.PrecioVenta)
            form.append("imagen", imagen)
            form.append("stock",formData.Stock)
            const rest = await axios.post(API_PRODUCTO, form)
            if (rest.data === "Exito") {
                imagen.values = ''
                formik.values.NuevoProducto = ''
                formik.values.PrecioCompra = ''
                formik.values.PrecioVenta = ''
                formik.values.Stock = ''
                
            }
        }

    })

    useEffect(() => {
        Categoria()
    }, [])

    return (
        <>
            <div className="text-center">
                <h1 className="text-3xl font-bold mb-4 ">Nuevo Plato</h1>
            </div>

            <div className="container">
                <div className="w-full max-w-xs">
                </div>

                <form
                    onSubmit={formik.handleSubmit}
                    className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Categoria">Categoria</label>

                        <select
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            name="Categoria"
                            value={formik.values.Categoria}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}>

                            <option value="">Seleccione una Categoria</option>
                            {data.map(iten => (
                                <option key={iten.id} value={iten.id}>{iten.categoria}</option>
                            ))}
                        </select>

                    </div>
                    {formik.touched.Categoria && formik.errors.Categoria ? (
                        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
                            <p >{formik.errors.Categoria}</p>
                        </div>
                    ) : null}

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2 " htmlFor="NuevoProducto">Agregar nuevo Producto</label>
                        <input
                            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            name="NuevoProducto" type="text" placeholder="Ingrese nuevo producto"
                            value={formik.values.NuevoProducto}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}

                        />
                    </div>
                    {formik.touched.NuevoProducto && formik.errors.NuevoProducto ? (
                        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
                            <p >{formik.errors.NuevoProducto}</p>
                        </div>
                    ) : null}

                    <div className="mb-4 grid grid-cols-2 divide-x-reverse divide-gray-400">
                        <div className="control">
                            <label className="block text-gray-700 text-sm font-bold mb-2 " htmlFor="PrecioCompra" >Agregar Precio de Compra</label>
                            <input
                                className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                name="PrecioCompra" type="text" placeholder="Ingrese Precio Compra"
                                value={formik.values.PrecioCompra}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        {formik.touched.PrecioCompra && formik.errors.PrecioCompra ? (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
                                <p >{formik.errors.PrecioCompra}</p>
                            </div>
                        ) : null}

                        <div className="control">
                            <label className="block text-gray-700 text-sm font-bold mb-2 " htmlFor="PrecioVenta">Agregar Precio de Venta</label>
                            <input
                                className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                name="PrecioVenta" type="text" placeholder="Ingrese Precio Venta"
                                value={formik.values.PrecioVenta}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        {formik.touched.PrecioVenta && formik.errors.PrecioVenta ? (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
                                <p >{formik.errors.PrecioVenta}</p>
                            </div>
                        ) : null}

                    </div>
                    <div className="mb-4 grid grid-cols-2 divide-x-reverse divide-gray-400">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Imagen">
                            Agrege una Imagen
                        </label>
                        <input
                            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            name="Imagen" type="file" accept="image/*" multiple 
                            onChange={(e)=>setImagen(e.target.files[0])}
                            onBlur={formik.handleBlur}/>
                    </div>

                    <div className="control">
                            <label className="block text-gray-700 text-sm font-bold mb-2 " htmlFor="Stock">Agregar un Stock</label>
                            <input
                                className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                name="Stock" type="text" placeholder="Ingrese un Stock del producto"
                                value={formik.values.Stock}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                    </div>

                    </div>

                    <div className="flex items-center justify-center">
                        <input
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            value="Guardar Nuevo producto"/>

                    </div>
                </form>
                <p className="text-center text-gray-500 text-xs">
                    &copy;2020 Luv-n-oven. All rights reserved.
                </p>
            </div>
        </>
    );
}

export default NuevoPLatillo;