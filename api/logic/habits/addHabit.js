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

      return Habit.countDocuments({ user: userId })
        .then((habitCount) => {
          if (habitCount >= 10) {
            throw new ValidationError("Maximum 10 habits allowed per user");
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
