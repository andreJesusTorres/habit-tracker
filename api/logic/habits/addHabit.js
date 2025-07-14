import { Habit, User } from 'dat'
import { validate, errors } from "com";

const { SystemError, NotFoundError, ValidationError } = errors;

export default (userId, name, category, subcategory, emoji) => {
  // Validar datos de entrada
  validate.id(userId, "userId");
  validate.name(name);
  validate.text(category);
  validate.text(subcategory);
  validate.emoji(emoji);

  return User.findById(userId)
    .lean()
    .catch((error) => {
      console.log('Error al buscar usuario:', error);
      throw new SystemError(error.message);
    })
    .then((user) => {
      if (!user) throw new NotFoundError("user not found");

      // Calcular fecha de hoy
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      // Contar hábitos del usuario
      return Promise.all([
        Habit.countDocuments({ user: userId }),
        Habit.countDocuments({ 
          user: userId, 
          createdAt: { 
            $gte: today, 
            $lt: tomorrow 
          } 
        })
      ])
        .then(([totalHabits, todayHabits]) => {
          console.log('Total hábitos:', totalHabits, 'Hábitos hoy:', todayHabits);
          
          // Verificar límites
          if (totalHabits >= 10) {
            console.log('Límite de hábitos totales alcanzado');
            throw new ValidationError("Solo puedes tener hasta 10 hábitos activos por día");
          }
          
          if (todayHabits >= 10) {
            console.log('Límite de hábitos de hoy alcanzado');
            throw new ValidationError("Solo puedes tener hasta 10 hábitos activos por día");
          }

          // Crear nuevo hábito
          const habit = new Habit({
            name,
            emoji,
            category,
            subcategory,
            user: userId,
            createdAt: new Date(),
          });

          return habit.save().catch((error) => {
            console.log('Error al guardar hábito:', error);
            throw new SystemError(error.message);
          });
        });
    });
};
