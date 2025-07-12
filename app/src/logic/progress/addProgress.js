import { validate, errors } from 'com';

const { SystemError } = errors;

export default (userId, habitId, date, status) => {
    console.log('🌐 Debug - addProgress called with:', { userId, habitId, date, status });
    
    validate.id(userId, 'userId');
    validate.id(habitId, 'habitId');

    console.log('🌐 Debug - Making POST request to: http://localhost:3000/progress');
    console.log('🌐 Debug - Request body:', { userId, habitId, date, status });

    return fetch('http://localhost:3000/progress', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, habitId, date, status })
    })
        .catch(error => { 
            console.error('❌ Debug - Fetch error:', error);
            throw new SystemError(error.message); 
        })
        .then(res => {
            console.log('📡 Debug - Response status:', res.status);
            console.log('📡 Debug - Response ok:', res.ok);
            
            if (res.ok) {
                console.log('📡 Debug - Response is ok, parsing JSON...');
                return res.json().then(data => {
                    console.log('📡 Debug - Parsed response data:', data);
                    return data;
                }).catch(jsonError => {
                    console.error('❌ Debug - Error parsing JSON:', jsonError);
                    throw new SystemError('Invalid JSON response from server');
                });
            }

            console.log('📡 Debug - Response is not ok, handling error...');
            return res.text().then(text => {
                console.log('📡 Debug - Error response text:', text);
                try {
                    const errorData = JSON.parse(text);
                    console.error('❌ Debug - Throwing error:', errorData);
                    throw new errors[errorData.error](errorData.message);
                } catch (parseError) {
                    console.error('❌ Debug - Error parsing error response:', parseError);
                    throw new SystemError(text || 'Unknown server error');
                }
            });
        });
}; 