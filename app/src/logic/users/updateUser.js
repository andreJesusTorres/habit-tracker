export default async function updateUser({ name, email }) {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:3000/users/update', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name, email })
    });
    if (!response.ok) throw new Error('No se pudo actualizar el usuario');
    return await response.json();
} 