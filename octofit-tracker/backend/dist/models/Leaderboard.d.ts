import mongoose, { Document, Types } from 'mongoose';
export interface ILeaderboard extends Document {
    user: Types.ObjectId;
    score: number;
    updatedAt: Date;
}
declare const _default: mongoose.Model<ILeaderboard, {}, {}, {}, mongoose.Document<unknown, {}, ILeaderboard, {}, mongoose.DefaultSchemaOptions> & ILeaderboard & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, ILeaderboard>;
export default _default;
//# sourceMappingURL=Leaderboard.d.ts.map