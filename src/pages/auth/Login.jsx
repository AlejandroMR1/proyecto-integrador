import React from 'react'
import "./Login.css"
import { users } from "../../data/dataUsers"
import { useState } from "react"
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom"

const Login = () => {

    const [getUser, setUser] = useState("")
    const [getPassword, setPassword] = useState("")
    let redirrecion = useNavigate()

    function login() {
        if (buscarUsuario()) {
            let timerInterval;
            Swal.fire({
                title: "Bienvenido",
                icon: "success",
                timer: 950,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading();
                    const timer = Swal.getPopup().querySelector("b");
                    timerInterval = setInterval(() => {
                        timer.textContent = `${Swal.getTimerLeft()}`;
                    }, 100);
                },
                willClose: () => {
                    clearInterval(timerInterval);
                    redirrecion("/home")
                }
            }).then((result) => {
                
                if (result.dismiss === Swal.DismissReason.timer) {
                    console.log("I was closed by the timer");
                }
            });
        }
        else {
            Swal.fire({
                icon: "error",
                title: "Error de Credenciales",
                text: "Usuario y/o Constraseña Incorrecta"
            });
        }
    }

    function buscarUsuario() {
        let auth = users.some((user) => getUser == user.email && getPassword == user.password)
        return auth
    }
    
  return (

    <div className='login-background'>
    <section className='sectionLogin'>

        <form>

            <section className='infinity'></section>

        <h1>Nuevas Tecnologías</h1>
        <h2>Bienvenido</h2>
        
            <section>
                <label htmlFor=''>Usuario</label>
                <input value={getUser} onChange={(evento) => setUser(evento.target.value)} type="text" />
            </section>

            <section>
                <label htmlFor="">Contraseña</label>
                <input value={getPassword} onChange={(evento) => setPassword(evento.target.value)} type="password" />
            </section>
            <button onClick={login} type='button'>Iniciar Sesión</button>
        </form>

    </section>
    </div>
  )
}

export default Login