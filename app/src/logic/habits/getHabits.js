import { errors } from 'com';

const { SystemError } = errors;

export default (date) => {
    const url = date ? `http://localhost:3000/habits?date=${date.toISOString()}` : `http://localhost:3000/habits`;
    
    console.log('🌐 Debug - getHabits called with date:', date);
    console.log('🌐 Debug - Making GET request to:', url);
    
    return fetch(url, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    })
        .catch(error => { 
            console.error('❌ Debug - Fetch error in getHabits:', error);
            throw new SystemError(error.message); 
        })
        .then(res => {
            console.log('📡 Debug - getHabits response status:', res.status);
            console.log('📡 Debug - getHabits response ok:', res.ok);
            
            if (res.ok) {
                console.log('📡 Debug - getHabits response is ok, parsing JSON...');
                return res.json()
                    .then(data => {
                        console.log('📡 Debug - getHabits parsed data:', data);
                        return data;
                    })
                    .catch(error => { 
                        console.error('❌ Debug - Error parsing JSON in getHabits:', error);
                        throw new SystemError(error.message); 
                    });
            }

            console.log('📡 Debug - getHabits response is not ok, handling error...');
            return res.json()
                .catch(error => { 
                    console.error('❌ Debug - Error parsing error response in getHabits:', error);
                    throw new SystemError(error.message); 
                })
                .then(({ error, message }) => { 
                    console.error('❌ Debug - Throwing error in getHabits:', error, message);
                    throw new errors[error](message); 
                });
        });
};
