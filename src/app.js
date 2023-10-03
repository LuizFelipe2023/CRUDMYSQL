import express from 'express';
import conexao from './conexao.js';

const app = express();

app.use(express.json());

app.post('/tabelateste', (req, res) => {
    const { nome, idade } = req.body;
    const sql = 'INSERT INTO tabelateste (nome, idade) VALUES (?, ?)';
    conexao.query(sql, [nome, idade], (erro, resultado) => {
        if (erro) {
            console.error('Erro ao inserir dados:', erro);
            res.status(500).json({ erro: 'Erro interno do servidor' });
        } else {
            res.status(201).json({ mensagem: 'Dados inseridos com sucesso', id: resultado.insertId });
        }
    });
});

app.get('/tabelateste', (req, res) => {
    const sql = 'SELECT * FROM tabelateste';
    conexao.query(sql, (erro, resultado) => {
        if (erro) {
            console.error('Erro ao buscar dados:', erro);
            res.status(500).json({ erro: 'Erro interno do servidor' });
        } else {
            res.status(200).json(resultado);
        }
    });
});

app.get('/tabelateste/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const sql = 'SELECT * FROM tabelateste WHERE id = ?';
    conexao.query(sql, [id], (erro, resultado) => {
        if (erro) {
            console.error('Erro ao buscar dados:', erro);
            res.status(500).json({ erro: 'Erro interno do servidor' });
        } else {
            const linha = resultado[0];
            if (!linha) {
                res.status(404).json({ erro: 'Registro não encontrado' });
            } else {
                res.status(200).json(linha);
            }
        }
    });
});

app.put('/tabelateste/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, idade } = req.body;
    const sql = 'UPDATE tabelateste SET nome = ?, idade = ? WHERE id = ?';
    conexao.query(sql, [nome, idade, id], (erro) => {
        if (erro) {
            console.error('Erro ao atualizar o registro:', erro);
            res.status(500).json({ erro: 'Erro interno do servidor' });
        } else {
            res.status(200).json({ mensagem: 'Registro atualizado com sucesso' });
        }
    });
});

app.delete('/tabelateste/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const sql = 'DELETE FROM tabelateste WHERE id = ?';
    conexao.query(sql, [id], (erro, resultado) => {
        if (erro) {
            console.error('Erro ao apagar o registro:', erro);
            res.status(500).json({ erro: 'Erro interno do servidor' });
        } else {
            if (resultado.affectedRows === 0) {
                res.status(404).json({ erro: 'Registro não encontrado' });
            } else {
                res.status(200).json({ mensagem: 'Registro apagado com sucesso' });
            }
        }
    });
});

export default app;
