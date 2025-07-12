export default async function getUserDetails() {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:3000/users/details', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok) throw new Error('No se pudo obtener los datos del usuario');
    return await response.json();
} 