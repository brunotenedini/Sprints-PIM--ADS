// app.js
const express = require('express');
const path = require('path'); // Para manipulação de caminhos
const bcrypt = require('bcrypt'); // Para hash de senhas
const multer = require('multer'); // Para upload de arquivos
const app = express();
const User = require('./models/User');
const Course = require('./models/course'); // Importando o modelo Course
const db = require('./models/db');

// Configuração do multer para armazenar imagens na pasta 'public/images'
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});

const upload = multer({ storage: storage });

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Para tratar dados de formulários

// Servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rota para a página inicial (Cadastro)
app.get("/", async (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota para a página de login
app.get("/login", async (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Rota para a página de catálogo de cursos
app.get("/catalog", async (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'catalog.html'));
});

// Rota para a página de upload de curso
app.get("/upload", async (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'upload.html'));
});

// Endpoint para cadastrar usuário
app.post("/cadastrar", async (req, res) => {
    const { nome, data_nascimento, cpf, email, senha } = req.body;

    try {
        // Verificar se o usuário já existe
        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            return res.status(400).json({
                erro: true,
                mensagem: "Usuário já existe com este email."
            });
        }

        // Hash da senha
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(senha, salt);

        // Criar o usuário com a senha hashada
        await User.create({
            nome,
            data_nascimento,
            cpf,
            email,
            senha: hashedPassword
        });

        return res.json({
            erro: false,
            mensagem: "Usuário cadastrado com sucesso"
        });
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            erro: true,
            mensagem: "Usuário não cadastrado com sucesso"
        });
    }
});

// Endpoint para login
app.post("/login", async (req, res) => {
    const { email, senha } = req.body;

    try {
        // Encontrar o usuário pelo email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({
                erro: true,
                mensagem: "Email ou senha incorretos."
            });
        }

        // Comparar a senha fornecida com a hash armazenada
        const isMatch = await bcrypt.compare(senha, user.senha);
        if (!isMatch) {
            return res.status(400).json({
                erro: true,
                mensagem: "Email ou senha incorretos."
            });
        }

        // Autenticação bem-sucedida
        return res.json({
            erro: false,
            mensagem: "Login efetuado com sucesso"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            erro: true,
            mensagem: "Erro interno do servidor."
        });
    }
});

// Endpoint para upload de curso
app.post("/upload", upload.single('imagem_curso'), async (req, res) => {
    const { nome_curso, nome_profissional, valor, link_youtube } = req.body;
    const imagem_curso = req.file ? `/images/${req.file.filename}` : null;

    if (!imagem_curso) {
        return res.status(400).json({
            erro: true,
            mensagem: "Imagem do curso é obrigatória."
        });
    }

    try {
        await Course.create({
            nome_curso,
            nome_profissional,
            valor,
            imagem_curso,
            link_youtube
        });

        return res.json({
            erro: false,
            mensagem: "Curso cadastrado com sucesso"
        });
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            erro: true,
            mensagem: "Curso não cadastrado com sucesso"
        });
    }
});

app.listen(4000, () => {
    console.log("Servidor iniciado na porta 4000: http://localhost:4000");
});
