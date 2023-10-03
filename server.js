import app from './src/app.js'
import conexao from './src/conexao.js'
const port = 3000;
conexao.connect((erro)=>{
    if(erro){
        console.log(erro);
    }else{
        console.log("Conexão foi realizada com sucesso");
        app.listen(port,()=>{
            console.log(`Servidor estar rodando no endereço: http://localhost:${port}`);
        })
    }
})