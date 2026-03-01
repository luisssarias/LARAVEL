document.addEventListener('DOMContentLoaded', async() => {
    const token = localStorage.getItem('token');
    const status = document.getElementById('status');
    const logoutBtn = document.getElementById('logoutBtn');

    if (!token) {
        window.location.href = '/login.html';
        return;
    }

    // Opcional: Validar token y mostrar información del usuario
    try {
        const res = await fetch('/api/me', {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });

        if (!res.ok) {
            localStorage.removeItem('token');
            window.location.href = '/login.html';
            return;
        }

        const me = await res.json();
        //Ajuste según lo que devuelva el api me
        const nombre = me?.nombre
        ? `${me.nombre}`
        :(me?.usuario ?? 'Usuario');
        status.textContent = `Bienvenido, ${nombre}`;
    } catch (err) {
        status.textContent = 'No se pudo validar sesión';
    }

    logoutBtn.addEventListener('click', async() => {
        try {
            await fetch('/api/logout', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            });
        } catch (_) {}
        localStorage.removeItem('token');
        window.location.href = '/login.html';
    });
});