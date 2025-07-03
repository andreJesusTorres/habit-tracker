import 'dotenv/config';
import db from 'dat';
import addGoal from './addGoal.js';

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            
            const userId = '675ace02a28a390d912bc40e'
            const habitId = '675b101f328e085c8311fe74'
            const name = 'Ahorrar 100€';
            const period = 'monthly';
            const objective = 100;

            return addGoal(userId, habitId, name, period, objective)
                .then(goalId => console.log('Goal created successfully:', goalId))
                .catch(error => console.error('Error while creating goal:', error.message));
        } catch (error) {
            console.error('Unexpected error:', error.message);
        }
    })
    .catch(error => console.error('Error connecting to database:', error.message))
    .finally(() => db.disconnect());
