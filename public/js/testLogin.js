console.log('login.js cargado correctamente');

document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('loginForm');
    const output = document.getElementById('output');
    const meBtn = document.getElementById('meBtn');
    const meOut = document.getElementById('meOut');

    if (!form || !output) {
        console.error('No se encontró el formulario o el output.');
        return;
    }

   
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const correo = document.getElementById('correo').value.trim();
        const contrasena = document.getElementById('contrasena').value;

        if (!correo || !contrasena) {
            output.textContent = 'Completa todos los campos.';
            return;
        }

        output.textContent = 'Enviando...';

        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    correo: correo,
                    contrasena: contrasena
                })
            });

            const data = await res.json();

            if (!res.ok) {
                output.textContent = `Error ${res.status}: ` + JSON.stringify(data, null, 2);
                return;
            }

            output.textContent = JSON.stringify(data, null, 2);

            if (data.token) {
                localStorage.setItem('token', data.token);
            }

        } catch (error) {
            output.textContent = 'Error de conexión: ' + error.message;
        }
    });

    if (meBtn && meOut) {
        meBtn.addEventListener('click', async () => {

            const token = localStorage.getItem('token');

            if (!token) {
                meOut.textContent = 'No hay token guardado.';
                return;
            }

            meOut.textContent = 'Consultando...';

            try {
                const res = await fetch('/api/me', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + token
                    }
                });

                const data = await res.json();

                if (!res.ok) {
                    meOut.textContent = `Error ${res.status}: ` + JSON.stringify(data, null, 2);
                    return;
                }

                meOut.textContent = JSON.stringify(data, null, 2);

            } catch (error) {
                meOut.textContent = 'Error: ' + error.message;
            }
        });
    }

});