import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

const addHabitHandler = createFunctionalHandler((req, res) => {
    const { name, emoji, category, subcategory } = req.body;
    const userId = req.userId;
   
    return logic.addHabit(userId, name, category, subcategory, emoji)
        .then(habit => ({ habitId: habit._id }));
});

export default addHabitHandler;
