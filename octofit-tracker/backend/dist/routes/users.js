"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = __importDefault(require("../models/User"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const users = await User_1.default.find().select('-password');
    res.json(users);
});
router.post('/', async (req, res) => {
    const user = new User_1.default(req.body);
    await user.save();
    res.status(201).json(user);
});
router.get('/:id', async (req, res) => {
    const user = await User_1.default.findById(req.params['id']).select('-password');
    if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
    }
    res.json(user);
});
router.put('/:id', async (req, res) => {
    const user = await User_1.default.findByIdAndUpdate(req.params['id'], req.body, { new: true }).select('-password');
    if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
    }
    res.json(user);
});
router.delete('/:id', async (req, res) => {
    await User_1.default.findByIdAndDelete(req.params['id']);
    res.status(204).end();
});
exports.default = router;
//# sourceMappingURL=users.js.map