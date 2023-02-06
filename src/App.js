import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import logo from './logo.svg';
import './App.css';

import {Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';

function App() {
  const dataArt = [
    { id: 1, nombre: "Cajas", cantidad: 241 },
    { id: 2, nombre: "Tornillos", cantidad: 225 },
    { id: 3, nombre: "Clavos", cantidad: 216 },
    { id: 4, nombre: "Plastico", cantidad: 216 },
  ];
  const [data, setData] = useState(dataArt);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [artSeleccionado, setArtSeleccionado] = useState({
    id: '',
    nombre: '',
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
        pais.nombre=artSeleccionado.nombre;
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
    <div className="App">
      <h2>Inventario Ferreteria EPA</h2>
      <br />
    <button className="btn btn-success" onClick={()=>abrirModalInsertar()}>Insertar</button>
    <br /><br />
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Articulo</th>
            <th>Cantidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map(elemento=>(
            <tr>
              <td>{elemento.id}</td>
              <td>{elemento.nombre}</td>
              <td>{elemento.cantidad}</td>
              <td><button className="btn btn-primary" onClick={()=>seleccionarPais(elemento, 'Editar')}>Editar</button> {"   "} 
              <button className="btn btn-danger" onClick={()=>seleccionarPais(elemento, 'Eliminar')}>Eliminar</button></td>
            </tr>
          ))
          }
        </tbody>
      </table>
      <Modal isOpen={modalEditar}>
        <ModalHeader>
          <div>
            <h3>Editar Articulo</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>ID</label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="id"
              value={artSeleccionado && artSeleccionado.id}
            />
            <br />
            <label>Articulo</label>
            <input
              className="form-control"
              type="text"
              name="nombre"
              value={artSeleccionado && artSeleccionado.nombre}
              onChange={handleChange}
            />
            <br />
            <label>Cantidad</label>
            <input
              className="form-control"
              type="text"
              name="cantidad"
              value={artSeleccionado && artSeleccionado.cantidad}
              onChange={handleChange}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={()=>editar()}>
            Actualizar
          </button>
          <button
            className="btn btn-danger"
            onClick={()=>setModalEditar(false)}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEliminar}>
        <ModalBody>
          Estás Seguro que deseas eliminar el articulo {artSeleccionado && artSeleccionado.nombre}
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={()=>eliminar()}>
            Sí
          </button>
          <button
            className="btn btn-secondary"
            onClick={()=>setModalEliminar(false)}
          >
            No
          </button>
        </ModalFooter>
      </Modal>

        <Modal isOpen={modalInsertar}>
        <ModalHeader>
          <div>
            <h3>Insertar Articulo Nuevo</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>ID</label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="id"
              value={data[data.length-1].id+1}
            />
            <br />
            <label>Articulo</label>
            <input
              className="form-control"
              type="text"
              name="nombre"
              value={artSeleccionado ? artSeleccionado.nombre: ''}
              onChange={handleChange}
            />
            <br />
            <label>Cantidad</label>
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
          <button className="btn btn-primary"
          onClick={()=>insertar()}>
            Insertar
          </button>
          <button
            className="btn btn-danger"
            onClick={()=>setModalInsertar(false)}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
export default App;

