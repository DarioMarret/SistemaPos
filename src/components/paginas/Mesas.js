import React, { Fragment } from 'react'
import Modal from 'react-modal';
import '../../css/styles.css';
import axios from 'axios'
import Cookies from 'universal-cookie'
import { withRouter } from 'react-router-dom'
import mesadecomedor from '../../assets/img/mesa-de-comedor.png'

const APIREST = 'http://3.133.175.35/pruebas/mesa.php';
const cookie = new Cookies();

class Mesas extends React.Component {

    constructor() {
        super();
        this.state = {
            data: [],
            open: false,
            Nmesa: '',
            Npersona: '',
            consumo: '',
            color: ''
        }
    }
    ListarMesa = async () => {
        const rest = await axios.get(APIREST)
        if(rest.data === "No hay mesa") {
            return 0
        } else {
            this.setState({data:rest.data})
        }   
    }
    
    componentDidMount = () => {
         this.interval = setInterval(() => {
            this.ListarMesa()
        }, 100)
                  
    }
    
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    
     EliminarMesa = async (id) => {
         let fc = new FormData()
         fc.append("id", id)
         const rest = await axios.post(APIREST, fc)
         console.log(rest);
         if (rest.data) {
            this.ListarMesa()
         }
     
    }

    CreaOrden = async (id_orden, mesero, numero) => {
        let fc = new FormData()
        fc.append("id_orden", id_orden)
        fc.append("mesero", mesero)
        const rest = await axios.post(APIREST, fc)
        console.log(rest.data);
        this.props.history.push(`/platillos/`+rest.data+`/`+numero+`/`+mesero) 
    }

     Tablas = () => {

        return (
            <>
                { this.state.data.map(mesa => (
                    <Fragment key={mesa.id}>
                        <div className="mesas">
                            <div className="md:w-2/9 xl:w-2/9 lg:flex ">
                                <div className="border bg-yellow-400 rounded-lg p-2 flex flex-row justify-between leading-normal" style={{backgroundColor: `${this.state.color}`}}>
                                    <div className="">
                                        <p className="text-sm text-gray-600 flex items-center">
                                            <img className="w-10 h-10 cursor-pointer" src="https://img.icons8.com/flat_round/64/000000/delete-sign.png" alt="Eliminar" onClick={() => this.EliminarMesa(mesa.id)} />
                                            <div className="text-gray-900 font-bold text-xl mb-2">Mesa:<span>{mesa.numero}</span></div>
                                        </p>
                                        <p className="text-gray-800 text-base">Mesero/a: <span>{mesa.mesero}</span></p>
                                        <p className="text-gray-800 text-base">Personas: <span>{mesa.c_personas}</span></p>
                                        {/* <p className="text-gray-800 text-base">Consumo: $<span>{this.state.consumo ? this.state.consumo : '0.00'}</span></p> */}
                                    </div>
                                    <div className="flex items-center">
                                        <div className="text-sx">
                                            <img className="w-10 h-10 rounded mt-5 cursor-pointer" src="https://img.icons8.com/metro/26/000000/dining-room.png" alt="orden" onClick={() => this.CreaOrden(mesa.id, mesa.mesero, mesa.numero)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Fragment>
                ))}
            </>
        )
    }
     
    CrearMesa = async () => {
        const { Nmesa, Npersona } = this.state;
        if (Nmesa !== ''   && Npersona !== '' ) {
            let crear = new FormData();
            crear.append("Nmesa", Nmesa)
            crear.append("Npersona", Npersona)
            crear.append("usuario", cookie.get('usuario'))
            const rest = await axios.post(APIREST, crear)
            if(rest.data){
                this.setState({open:false})
            }
           
        } else {
            alert("solo se pueden ingresar numero")
        }
        
    }
   
   
    
    render() {

    return (
        <>
            
            <img className="w-10 h-10 rounded mb-4 cursor-pointer opacity-75" src={mesadecomedor} alt="" onClick={() => this.setState({open:true})} />

            <Modal isOpen={this.state.open}
                            ariaHideApp={false}
                            onRequestClose={() => this.setState({open:false})}
                            style={{
                                overlay: {
                                    position: "absolute",
                                    width: "50%",
                                    height: "44%",
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
                    <h1 className="text-center text-3xl">Crear Mesa</h1>
                    <div className="container pt-2">

                        <div className="control-group">                       
                            <input type="number" min="1" id="Nmesa" className="input-group p-2 mt-3 text-center" placeholder="Numero de Mesa" onChange={(e) => this.setState({Nmesa:e.target.value})}/> 
                            <input type="number" min="1" id="Npersona" className="input-group p-2 text-center" placeholder="Cantidad de Persona" onChange={(e) => this.setState({Npersona:e.target.value})}/>                                    
                        </div>

                        <div className="grid grid-cols-2 divide-x divide-gray-400 pt-2">
                        
                            <button className="btn btn-danger text-center font-black" onClick={() => this.setState({open:false})}>Cerrar</button>
                            <button className="btn btn-primary font-black" onClick={()=> this.CrearMesa()}>Crear Mesa</button>
                            
                        </div>

                    </div>
            </Modal>
            
            <div className="">

                <div className="grid grid-flow-row grid-cols-5 grid-rows-3 gap-4">
                      { this.Tablas() }
                </div>
            </div>
        </>
    );
}
    
}

export default withRouter(Mesas);
