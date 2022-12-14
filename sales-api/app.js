import express, { response } from "express";

const app = express();
const env = process.env;
const PORT = env.PORT || 8082;


app.get('/api/status', (req, res) => {
    return res.status(200).json({
        service: "Sales - API" ,
        status: "up"       
    });
});

app.listen(PORT, () => { 
    console.info(`Servidor iniciado na porta ${PORT}`);
});

