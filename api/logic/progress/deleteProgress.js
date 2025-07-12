import { Progress } from 'dat';
import { validate, errors } from 'com';

const { SystemError, NotFoundError, OwnershipError } = errors;

export default (progressId, habitId) => {
    validate.id(progressId, 'progressId');
    validate.id(habitId, 'habitId');

    return Promise.all([
        Progress.findById(progressId).lean()
    ])
        .catch(error => { throw new SystemError(error.message); })
        .then(([progress]) => {
            // Si el progreso no existe, considerarlo como ya eliminado (éxito)
            if (!progress) {
                return { success: true, message: 'Progress was already deleted or not found' };
            }
            
            if (progress.habit.toString() !== habitId) throw new OwnershipError('Progress does not belong to the given habit');

            return Progress.findByIdAndDelete(progressId)
                .catch(error => { throw new SystemError(error.message); });
        })
        .then((result) => {
            // Si result ya es un objeto (caso de progreso no encontrado), devolverlo
            if (result && typeof result === 'object' && result.success) {
                return result;
            }
            // Si no, es el resultado de la eliminación exitosa
            return { success: true, message: 'Progress deleted successfully' };
        });
};
