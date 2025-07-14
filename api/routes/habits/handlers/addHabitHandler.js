import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

const addHabitHandler = createFunctionalHandler((req, res) => {
    const { name, emoji, category, subcategory } = req.body;
    const userId = req.user.id;
    
    console.log('Agregando hábito:', { name, emoji, category, subcategory, userId });
   
    return logic.addHabit(userId, name, category, subcategory, emoji)
        .then(habit => {
            console.log('Hábito creado:', habit._id);
            return { habitId: habit._id };
        });
});

export default addHabitHandler;
