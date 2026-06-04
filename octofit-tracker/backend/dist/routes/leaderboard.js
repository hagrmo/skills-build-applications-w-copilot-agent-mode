"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Leaderboard_1 = __importDefault(require("../models/Leaderboard"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const entries = await Leaderboard_1.default.find().populate('user', '-password').sort({ score: -1 });
    res.json(entries);
});
router.post('/', async (req, res) => {
    const entry = new Leaderboard_1.default(req.body);
    await entry.save();
    res.status(201).json(entry);
});
router.put('/:id', async (req, res) => {
    const entry = await Leaderboard_1.default.findByIdAndUpdate(req.params['id'], req.body, { new: true });
    if (!entry) {
        res.status(404).json({ error: 'Entry not found' });
        return;
    }
    res.json(entry);
});
router.delete('/:id', async (req, res) => {
    await Leaderboard_1.default.findByIdAndDelete(req.params['id']);
    res.status(204).end();
});
exports.default = router;
//# sourceMappingURL=leaderboard.js.map