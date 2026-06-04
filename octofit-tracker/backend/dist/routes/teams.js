"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Team_1 = __importDefault(require("../models/Team"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const teams = await Team_1.default.find().populate('members', '-password');
    res.json(teams);
});
router.post('/', async (req, res) => {
    const team = new Team_1.default(req.body);
    await team.save();
    res.status(201).json(team);
});
router.get('/:id', async (req, res) => {
    const team = await Team_1.default.findById(req.params['id']).populate('members', '-password');
    if (!team) {
        res.status(404).json({ error: 'Team not found' });
        return;
    }
    res.json(team);
});
router.put('/:id', async (req, res) => {
    const team = await Team_1.default.findByIdAndUpdate(req.params['id'], req.body, { new: true });
    if (!team) {
        res.status(404).json({ error: 'Team not found' });
        return;
    }
    res.json(team);
});
router.delete('/:id', async (req, res) => {
    await Team_1.default.findByIdAndDelete(req.params['id']);
    res.status(204).end();
});
exports.default = router;
//# sourceMappingURL=teams.js.map