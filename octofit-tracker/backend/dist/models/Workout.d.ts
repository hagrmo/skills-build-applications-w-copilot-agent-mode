import mongoose, { Document } from 'mongoose';
export interface IWorkout extends Document {
    name: string;
    description: string;
    exercises: string[];
    duration: number;
}
declare const _default: mongoose.Model<IWorkout, {}, {}, {}, mongoose.Document<unknown, {}, IWorkout, {}, mongoose.DefaultSchemaOptions> & IWorkout & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IWorkout>;
export default _default;
//# sourceMappingURL=Workout.d.ts.map