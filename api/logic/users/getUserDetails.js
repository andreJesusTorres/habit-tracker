import { User } from 'dat';
import { validate, errors } from 'com';

const { SystemError, NotFoundError } = errors;

export default async function getUserDetails({ userId }) {
    validate.id(userId, 'userId');
    const user = await User.findById(userId).lean();
    if (!user) throw new NotFoundError('User not found');
    return { name: user.name, email: user.email };
} 