import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import logo from './logo.svg';
import './App.css';

import {Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';

function App() {
  const dataArt = [
    { id: 1, orden: "1000011", cantidad: 241 },
    { id: 2, orden: "1000012", cantidad: 225 },
    { id: 3, orden: "1000013", cantidad: 216 },
    { id: 4, orden: "1000014", cantidad: 216 },
  ];
  const [data, setData] = useState(dataArt);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [artSeleccionado, setArtSeleccionado] = useState({
    id: '',
    orden: '',
    cantidad: ''
  });
  const seleccionarPais=(elemento, caso)=>{
    setArtSeleccionado(elemento);
(caso==='Editar')?setModalEditar(true):setModalEliminar(true)
  }
  const handleChange=e=>{
    const {name, value}=e.target;
    setArtSeleccionado((prevState)=>({
      ...prevState,
      [name]: value
    }));
  }
  const editar=()=>{
    var dataNueva=data;
    dataNueva.map(pais=>{
      if(pais.id===artSeleccionado.id){
        pais.cantidad=artSeleccionado.cantidad;
        pais.orden=artSeleccionado.orden;
      }
    });
    setData(dataNueva);
    setModalEditar(false);
  }
  const eliminar =()=>{
    setData(data.filter(pais=>pais.id!==artSeleccionado.id));
    setModalEliminar(false);
  }
  const abrirModalInsertar=()=>{
    setArtSeleccionado(null);
    setModalInsertar(true);
  }
  const insertar =()=>{
    var valorInsertar=artSeleccionado;
    valorInsertar.id=data[data.length-1].id+1;
    var dataNueva = data;
    dataNueva.push(valorInsertar);
    setData(dataNueva);
    setModalInsertar(false);
  }
  return (
    <body>
    <div className="App">
    <div class= "tabla">
      <h2>Notificación de Producción de Planta</h2>
      <br />
    <button type="button" class="btn btn-outline-success" onClick={()=>abrirModalInsertar()}>Ingresar nueva notificación</button>
    <br /><br />
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Nro. de Notif.</th>
            <th>Nro de Orden</th>
            <th>Cantidad</th>
            <th>Pasar a</th>
          </tr>
        </thead>
        <tbody>
          {data.map(elemento=>(
            <tr>
              <td>{elemento.id}</td>
              <td>{elemento.orden}</td>
              <td>{elemento.cantidad}</td>
              <td><button type="button" class="btn btn-outline-primary" onClick={()=>seleccionarPais(elemento, 'Editar')}>Editar</button> {"   "} 
              <button type="button" class="btn btn-outline-danger" onClick={()=>seleccionarPais(elemento, 'Eliminar')}>Eliminar</button></td>
            </tr>
          ))
          }
        </tbody>
      </table>
      <button type="button" class="btn btn-outline-dark">Guardar Datos en SAP</button>
      </div>
      <Modal isOpen={modalEditar}>
        <ModalHeader>
          <div>
            <h3>Editar Notificación</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Nro. de Notificación</label>
            <input
              className="form-control"
              readOnly
              type="number"
              name="id"
              value={artSeleccionado && artSeleccionado.id}
            />
            <br />
            <label>Nro. de Orden</label>
            <input
              className="form-control"
              type="text"
              name="number"
              value={artSeleccionado && artSeleccionado.orden}
              onChange={handleChange}
            />
            <br />
            <label>Cantidad a Notificar</label>
            <input
              className="form-control"
              type="number"
              name="cantidad"
              value={artSeleccionado && artSeleccionado.cantidad}
              onChange={handleChange}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button type="button" class="btn btn-outline-success" onClick={()=>editar()}>Actualizar</button>
          <button type="button" class="btn btn-outline-danger" onClick={()=>setModalEditar(false)}>Cancelar</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEliminar}>
        <ModalBody>
          Estás Seguro que deseas eliminar el articulo {artSeleccionado && artSeleccionado.orden}
        </ModalBody>
        <ModalFooter>
          <button type="button" class="btn btn-outline-secondary" onClick={()=>eliminar()}>
            Aceptar
          </button>
          <button
            className="btn btn-secondary"
            onClick={()=>setModalEliminar(false)}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>

        <Modal isOpen={modalInsertar}>
        <ModalHeader>
          <div>
            <h3>Ingresar Nueva Notificacíon</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Nro. de Notificación</label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="id"
              value={data[data.length-1].id+1}
            />
            <br />
            <label>Nro. de Orden</label>
            <input
              className="form-control"
              type="text"
              name="orden"
              value={artSeleccionado ? artSeleccionado.orden: ''}
              onChange={handleChange}
            />
            <br />
            <label>Cantidad a Notificar</label>
            <input
              className="form-control"
              type="text"
              name="cantidad"
              value={artSeleccionado ? artSeleccionado.cantidad: ''}
              onChange={handleChange}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button type="button" class="btn btn-outline-primary" onClick={()=>insertar()}>Insertar</button>
          <button type="button" class="btn btn-outline-danger" onClick={()=>setModalInsertar(false)}>Cancelar</button>
        </ModalFooter>
      </Modal>
    </div>
    </body>
  );
}
export default App;

