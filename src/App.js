import React, {Fragment,useState, useEffect} from 'react';
import  Formulario from  './components/Formulario';
import  Cita from  './components/Cita';


function App() {

  // Citas en local storage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales) {
    citasIniciales = [];
  }

  // Arreglo de citas
  const [citas , guardarCitas] = useState(citasIniciales);

  // use Effect para realizar ciertas operacion cuando el state cambia
  useEffect(() => {
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));

    if(citasIniciales){
      localStorage.setItem('citas', JSON.stringify(citas));
    } else{
      localStorage.setItem('citas', JSON.stringify([]));
    }
  }, [citas] );

  // Funcion  que toma las citas actuales y agregue la nueva
  const crearCita = cita => {
    guardarCitas([
      ...citas,
      cita
    ])

  }

  // Funcion que eliminar un cita por su id
  const eliminarCita = id => {
    const nuevasCitas = citas.filter(cita => cita.id !== id);
    guardarCitas(nuevasCitas);
  }

  // Mensaje condicional
    const titulo = citas.length === 0 ? 'No hay citas' : 'Administrador Tus Citas';

  return (
    <Fragment >
        <h1>Administrador De Pacientes</h1>

        <div className='container'>
          <div className='row'>
            <div className='one-half column'>
              <Formulario 
                crearCita={crearCita}
              />
            </div>
            <div className='one-half column'>
              <h1>{titulo}</h1>

              {citas.map(cita => (
                <Cita 
                  key={cita.id}
                  cita={cita}
                  eliminarCita={eliminarCita}
                />
              ))}

            </div>
          </div>
        </div>
   </ Fragment >
  
  );
}


export default App;
