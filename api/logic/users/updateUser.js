import { User } from 'dat';
import { validate, errors } from 'com';

const { SystemError, NotFoundError } = errors;

export default async (userId, { name, email }) => {
    validate.id(userId, 'userId');
    if (name) validate.name(name);
    if (email) validate.email(email);

    const user = await User.findById(userId);
    if (!user) throw new NotFoundError('User not found');

    if (name) user.name = name;
    if (email) user.email = email;

    try {
        await user.save();
        return {
            id: user._id.toString(),
            name: user.name,
            email: user.email
        };
    } catch (error) {
        throw new SystemError(error.message);
    }
}; 