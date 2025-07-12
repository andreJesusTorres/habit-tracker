import { Habit, User } from 'dat'
import { validate, errors } from "com";

const { SystemError, NotFoundError, ValidationError } = errors;

export default (userId, name, category, subcategory, emoji) => {
  validate.id(userId, "userId");
  validate.name(name);
  validate.text(category);
  validate.text(subcategory);
  validate.emoji(emoji);

  return User.findById(userId)
    .lean()
    .catch((error) => {
      throw new SystemError(error.message);
    })
    .then((user) => {
      if (!user) throw new NotFoundError("user not found");

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

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
          if (totalHabits >= 10) {
            throw new ValidationError("Solo puedes tener hasta 10 hábitos activos por día");
          }
          
          if (todayHabits >= 10) {
            throw new ValidationError("Solo puedes tener hasta 10 hábitos activos por día");
          }

          const habit = new Habit({
            name,
            emoji,
            category,
            subcategory,
            user: userId,
            createdAt: new Date(),
          });

          return habit.save().catch((error) => {
            throw new SystemError(error.message);
          });
        });
    });
};
