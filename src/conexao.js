import sql from 'mysql2';

const conexao = sql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '123456',
      database: 'teste'
});
export default conexao;