import express from 'express';

const app = express();
app.use(express.json());

app.get('/users', (_, res) => res.json([{ id: 1, name: 'John Doe' }]));
app.get('/users/:id', (req, res) => {
    if (req.params.id === '1') {
        res.json({ id: 1, name: 'John Doe' });
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Mock server running on http://localhost:${PORT}`));
