import mongoose, { Document, Types } from 'mongoose';
export interface IActivity extends Document {
    user: Types.ObjectId;
    activityType: string;
    duration: number;
    date: Date;
}
declare const _default: mongoose.Model<IActivity, {}, {}, {}, mongoose.Document<unknown, {}, IActivity, {}, mongoose.DefaultSchemaOptions> & IActivity & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IActivity>;
export default _default;
//# sourceMappingURL=Activity.d.ts.map