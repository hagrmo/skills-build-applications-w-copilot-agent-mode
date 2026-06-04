"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Activity_1 = __importDefault(require("../models/Activity"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const activities = await Activity_1.default.find().populate('user', '-password');
    res.json(activities);
});
router.post('/', async (req, res) => {
    const activity = new Activity_1.default(req.body);
    await activity.save();
    res.status(201).json(activity);
});
router.get('/:id', async (req, res) => {
    const activity = await Activity_1.default.findById(req.params['id']).populate('user', '-password');
    if (!activity) {
        res.status(404).json({ error: 'Activity not found' });
        return;
    }
    res.json(activity);
});
router.put('/:id', async (req, res) => {
    const activity = await Activity_1.default.findByIdAndUpdate(req.params['id'], req.body, { new: true });
    if (!activity) {
        res.status(404).json({ error: 'Activity not found' });
        return;
    }
    res.json(activity);
});
router.delete('/:id', async (req, res) => {
    await Activity_1.default.findByIdAndDelete(req.params['id']);
    res.status(204).end();
});
exports.default = router;
//# sourceMappingURL=activities.js.map