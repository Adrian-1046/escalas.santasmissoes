const porta = 1050

const express = require('express')
const session = require('express-session')
const app = express()

const bodyParser = require('body-parser')

const tbUsuarios = require('./index/funcoesDeBanco/tbUsuarios')
const escalar = require('./index/funcoesDeBanco/escalas')
const pregar = require('./index/funcoesDeBanco/pregadores')
const recepcionar = require('./index/funcoesDeBanco/recepcao')
const sugerir = require('./index/funcoesDeBanco/sugestao')
const ministrar = require('./index/funcoesDeBanco/ministrantes')

const { Sequelize, QueryTypes } = require('sequelize')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/index'))
app.use(
  session({
    secret: 'fGHwv$LwR#K!qZ7p&2s@8oU',
    resave: false,
    saveUninitialized: true,
  })
)

function verificaAutenticacao(req, res, next) {
  if (req.session && req.session.usuario) {
    return next() // Continue para a próxima rota/middleware
  } else {
    res.redirect('/') // Redirecione para a página de login se não estiver autenticado
  }
}

function verificaAutorizacao(req, res, next) {
  if (req.session.ACESSO === 'MST') {
    return next()
  } else {
    res.send(`USUÁRIO SEM ACESSO! Entre em contato com a liderança!`)
  }
}

app.get(
  '/cadastro',
  verificaAutenticacao,
  verificaAutorizacao,
  function (req, res) {
    res.sendFile(__dirname + '/index/CADASTRO.HTML')
  }
)

app.get('/inicio', verificaAutenticacao, function (req, res) {
  res.sendFile(__dirname + '/index/MENU.html')
})

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index/LOGIN.html')
})

app.get('/requisitar-senha', function(req, res) {
  res.sendFile(__dirname + '/index/RequisitarSenha.html')
})

app.get('/adm', verificaAutenticacao, verificaAutorizacao, function (req, res) {
  res.sendFile(__dirname + '/index/ADM.html')
})

app.get(
  '/acesso',
  verificaAutenticacao,
  verificaAutorizacao,
  function (req, res) {
    res.sendFile(__dirname + '/index/ALTERARCADACESSO.html')
  }
)

app.get('/sucesso', function (req, res) {
  res.render('sucesso', { mensagem: 'Sugestão gravada com sucesso!' })
})

app.get('/inicio/pregadores/:tela', verificaAutenticacao, async (req, res) => {
  const tela = req.params.tela

  try {
    const result = await pregar.findOne({
      attributes: [
        'S1_DATA',
        'S1_PREGADOR',
        'S2_DATA',
        'S2_PREGADOR',
        'S3_DATA',
        'S3_PREGADOR',
        'S4_DATA',
        'S4_PREGADOR',
        'S5_DATA',
        'S5_PREGADOR',
      ],
      where: { TELA: tela },
    })

    if (!result) {
      throw new Error(`Não foram encontrados dados para a tela: ${tela}`)
    }

    const dados = [
      result.S1_DATA,
      result.S1_PREGADOR,
      result.S2_DATA,
      result.S2_PREGADOR,
      result.S3_DATA,
      result.S3_PREGADOR,
      result.S4_DATA,
      result.S4_PREGADOR,
      result.S5_DATA,
      result.S5_PREGADOR,
    ].join(';')

    // Envie a string de dados como resposta
    res.send(dados)
  } catch (error) {
    console.error('Erro na busca de dados:', error)
    res.status(500).send('Erro ao buscar dados do servidor')
  }
})

app.get(
  '/inicio/recepcionistas/:tela',
  verificaAutenticacao,
  async (req, res) => {
    const tela = req.params.tela

    try {
      const result = await recepcionar.findOne({
        attributes: [
          'S1_DATA',
          'S1_RECEPCIONISTA',
          'S2_DATA',
          'S2_RECEPCIONISTA',
          'S3_DATA',
          'S3_RECEPCIONISTA',
          'S4_DATA',
          'S4_RECEPCIONISTA',
          'S5_DATA',
          'S5_RECEPCIONISTA',
        ],
        where: { TELA: tela },
      })

      if (!result) {
        throw new Error(`Não foram encontrados dados para a tela: ${tela}`)
      }

      const dados = [
        result.S1_DATA,
        result.S1_RECEPCIONISTA,
        result.S2_DATA,
        result.S2_RECEPCIONISTA,
        result.S3_DATA,
        result.S3_RECEPCIONISTA,
        result.S4_DATA,
        result.S4_RECEPCIONISTA,
        result.S5_DATA,
        result.S5_RECEPCIONISTA,
      ].join(';')

      res.send(dados)
    } catch (error) {
      console.error('Erro na busca de dados:', error)
      res.status(500).send('Erro ao buscar dados do servidor')
    }
  }
)

app.post('/atualizar-escalas/:tela', verificaAutorizacao, async (req, res) => {
  const tela = req.params.tela

  try {
    const {
      s1Data,
      s1Ministro,
      s1Violao,
      s1Baixo,
      s1Teclado,
      s1Bateria,
      s1Guitarra,
      s1Back_1,
      s1Back_2,
      s1Back_3,
      s1Midia,
      s1Som,
      s2Data,
      s2Ministro,
      s2Violao,
      s2Baixo,
      s2Teclado,
      s2Bateria,
      s2Guitarra,
      s2Back_1,
      s2Back_2,
      s2Back_3,
      s2Midia,
      s2Som,
      s3Data,
      s3Ministro,
      s3Violao,
      s3Baixo,
      s3Teclado,
      s3Bateria,
      s3Guitarra,
      s3Back_1,
      s3Back_2,
      s3Back_3,
      s3Midia,
      s3Som,
      s4Data,
      s4Ministro,
      s4Violao,
      s4Baixo,
      s4Teclado,
      s4Bateria,
      s4Guitarra,
      s4Back_1,
      s4Back_2,
      s4Back_3,
      s4Midia,
      s4Som,
      s5Data,
      s5Ministro,
      s5Violao,
      s5Baixo,
      s5Teclado,
      s5Bateria,
      s5Guitarra,
      s5Back_1,
      s5Back_2,
      s5Back_3,
      s5Midia,
      s5Som,
    } = req.body

    await escalar.update(
      {
        S1_DATA: s1Data,
        S1_MINISTRO: s1Ministro,
        S1_VIOLAO: s1Violao,
        S1_BAIXO: s1Baixo,
        S1_TECLADO: s1Teclado,
        S1_BATERIA: s1Bateria,
        S1_GUITARRA: s1Guitarra,
        S1_BACK_1: s1Back_1,
        S1_BACK_2: s1Back_2,
        S1_BACK_3: s1Back_3,
        S1_MIDIA: s1Midia,
        S1_SOM: s1Som,

        S2_DATA: s2Data,
        S2_MINISTRO: s2Ministro,
        S2_VIOLAO: s2Violao,
        S2_BAIXO: s2Baixo,
        S2_TECLADO: s2Teclado,
        S2_BATERIA: s2Bateria,
        S2_GUITARRA: s2Guitarra,
        S2_BACK_1: s2Back_1,
        S2_BACK_2: s2Back_2,
        S2_BACK_3: s2Back_3,
        S2_MIDIA: s2Midia,
        S2_SOM: s2Som,

        S3_DATA: s3Data,
        S3_MINISTRO: s3Ministro,
        S3_VIOLAO: s3Violao,
        S3_BAIXO: s3Baixo,
        S3_TECLADO: s3Teclado,
        S3_BATERIA: s3Bateria,
        S3_GUITARRA: s3Guitarra,
        S3_BACK_1: s3Back_1,
        S3_BACK_2: s3Back_2,
        S3_BACK_3: s3Back_3,
        S3_MIDIA: s3Midia,
        S3_SOM: s3Som,

        S4_DATA: s4Data,
        S4_MINISTRO: s4Ministro,
        S4_VIOLAO: s4Violao,
        S4_BAIXO: s4Baixo,
        S4_TECLADO: s4Teclado,
        S4_BATERIA: s4Bateria,
        S4_GUITARRA: s4Guitarra,
        S4_BACK_1: s4Back_1,
        S4_BACK_2: s4Back_2,
        S4_BACK_3: s4Back_3,
        S4_MIDIA: s4Midia,
        S4_SOM: s4Som,

        S5_DATA: s5Data,
        S5_MINISTRO: s5Ministro,
        S5_VIOLAO: s5Violao,
        S5_BAIXO: s5Baixo,
        S5_TECLADO: s5Teclado,
        S5_BATERIA: s5Bateria,
        S5_GUITARRA: s5Guitarra,
        S5_BACK_1: s5Back_1,
        S5_BACK_2: s5Back_2,
        S5_BACK_3: s5Back_3,
        S5_MIDIA: s5Midia,
        S5_SOM: s5Som,
      },
      { where: { TELA: tela } }
    )

    res.send('Dados da escala atualizados com sucesso!')
  } catch (error) {
    console.error('Erro na atualização de dados:', error)
    res.status(500).send('Erro na atualização de dados')
  }
})

app.get(
  '/inicio/escalas/:tela/:dia',
  verificaAutenticacao,
  async (req, res) => {
    const tela = req.params.tela
    const dia = req.params.dia

    try {
      const result = await escalar.findOne({
        attributes: [
          `S1_DATA`,
          `S2_DATA`,
          `S3_DATA`,
          `S4_DATA`,
          `S5_DATA`,
          `${dia}_MINISTRO`,
          `${dia}_VIOLAO`,
          `${dia}_BAIXO`,
          `${dia}_TECLADO`,
          `${dia}_BATERIA`,
          `${dia}_GUITARRA`,
          `${dia}_BACK_1`,
          `${dia}_BACK_2`,
          `${dia}_BACK_3`,
          `${dia}_MIDIA`,
          `${dia}_SOM`,
        ],
        where: { TELA: tela },
      })

      if (!result) {
        throw new Error(`Não foram encontrados dados para a tela: ${tela}`)
      }

      const dados =
        dia == 'S1'
          ? `${result.S1_DATA};${result.S2_DATA};${result.S3_DATA};${result.S4_DATA};${result.S5_DATA};${result.S1_MINISTRO};${result.S1_VIOLAO};${result.S1_BAIXO};${result.S1_TECLADO};${result.S1_BATERIA};${result.S1_GUITARRA};${result.S1_BACK_1};${result.S1_BACK_2};${result.S1_BACK_3};${result.S1_MIDIA};${result.S1_SOM};`
          : dia == 'S2'
          ? `${result.S1_DATA};${result.S2_DATA};${result.S3_DATA};${result.S4_DATA};${result.S5_DATA};${result.S2_MINISTRO};${result.S2_VIOLAO};${result.S2_BAIXO};${result.S2_TECLADO};${result.S2_BATERIA};${result.S2_GUITARRA};${result.S2_BACK_1};${result.S2_BACK_2};${result.S2_BACK_3};${result.S2_MIDIA};${result.S2_SOM};`
          : dia == 'S3'
          ? `${result.S1_DATA};${result.S2_DATA};${result.S3_DATA};${result.S4_DATA};${result.S5_DATA};${result.S3_MINISTRO};${result.S3_VIOLAO};${result.S3_BAIXO};${result.S3_TECLADO};${result.S3_BATERIA};${result.S3_GUITARRA};${result.S3_BACK_1};${result.S3_BACK_2};${result.S3_BACK_3};${result.S3_MIDIA};${result.S3_SOM};`
          : dia == 'S4'
          ? `${result.S1_DATA};${result.S2_DATA};${result.S3_DATA};${result.S4_DATA};${result.S5_DATA};${result.S4_MINISTRO};${result.S4_VIOLAO};${result.S4_BAIXO};${result.S4_TECLADO};${result.S4_BATERIA};${result.S4_GUITARRA};${result.S4_BACK_1};${result.S4_BACK_2};${result.S4_BACK_3};${result.S4_MIDIA};${result.S4_SOM};`
          : `${result.S1_DATA};${result.S2_DATA};${result.S3_DATA};${result.S4_DATA};${result.S5_DATA};${result.S5_MINISTRO};${result.S5_VIOLAO};${result.S5_BAIXO};${result.S5_TECLADO};${result.S5_BATERIA};${result.S5_GUITARRA};${result.S5_BACK_1};${result.S5_BACK_2};${result.S5_BACK_3};${result.S5_MIDIA};${result.S5_SOM}`

      res.send(dados)
    } catch (error) {
      console.error('Erro na busca de dados:', error)
      res.status(500).send('Erro na busca de dados')
    }
  }
)

app.get(
  '/inicio/musicas/:tela/:dia',
  verificaAutenticacao,
  async (req, res) => {
    const tela = req.params.tela
    const dia = req.params.dia

    try {
      const result = await ministrar.findOne({
        attributes: [
          `S1_DATA`,
          `S2_DATA`,
          `S3_DATA`,
          `S4_DATA`,
          `S5_DATA`,
          `${dia}_MINISTRANTE`,
          `${dia}_MUSICA`,
        ],
        where: { TELA: tela },
      })

      if (!result) {
        throw new Error(`Não foram encontrados dados para a tela: ${tela}`)
      }

      const dados =
        dia == 'S1'
          ? `${result.S1_DATA};${result.S2_DATA};${result.S3_DATA};${result.S4_DATA};${result.S5_DATA};${result.S1_MINISTRANTE};${result.S1_MUSICA};`
          : dia == 'S2'
          ? `${result.S1_DATA};${result.S2_DATA};${result.S3_DATA};${result.S4_DATA};${result.S5_DATA};${result.S2_MINISTRANTE};${result.S2_MUSICA};`
          : dia == 'S3'
          ? `${result.S1_DATA};${result.S2_DATA};${result.S3_DATA};${result.S4_DATA};${result.S5_DATA};${result.S3_MINISTRANTE};${result.S3_MUSICA};`
          : dia == 'S4'
          ? `${result.S1_DATA};${result.S2_DATA};${result.S3_DATA};${result.S4_DATA};${result.S5_DATA};${result.S4_MINISTRANTE};${result.S4_MUSICA};`
          : `${result.S1_DATA};${result.S2_DATA};${result.S3_DATA};${result.S4_DATA};${result.S5_DATA};${result.S5_MINISTRANTE};${result.S5_MUSICA};`

      res.send(dados)
    } catch (error) {
      console.error('Erro na busca de dados:', error)
      res.status(500).send('Erro na busca de dados')
    }
  }
)

app.get(
  '/adm-sugestoes',
  verificaAutenticacao,
  verificaAutorizacao,
  async (req, res) => {
    try {
      res.sendFile(__dirname + '/index/ADM-SUGESTOES.html')
    } catch (error) {
      console.error('Erro ao exibir a página ADM-SUGESTOES.html:', error)
      res.status(500).send('Erro ao exibir a página ADM-SUGESTOES.html')
    }
  }
)
app.get('/obter-sugestoes', async (req, res) => {
  try {
    const sugestoes = await sugerir.findAll()

    let html = '<ul class="sugestoes-carregadas">'
    sugestoes.forEach(sugestao => {
      html += `<li>${
        sugestao.SUGESTAO
      } <a href="/remover-sugestao?sugestao=${encodeURIComponent(
        sugestao.SUGESTAO
      )}">REMOVER</a></li>`
    })
    html += '</ul>'

    res.send(html)
  } catch (error) {
    console.error('Erro ao obter sugestões do banco de dados:', error)
    res.status(500).send('Erro ao obter sugestões do banco de dados')
  }
})

//#############################################################

//############################################################3

app.get('/remover-sugestao', async (req, res) => {
  try {
    const sugestao = decodeURIComponent(req.query.sugestao)


    await sugerir.destroy({
      where: {
        SUGESTAO: sugestao,
      },
    })

    res.redirect('/adm-sugestoes') 
  } catch (error) {
    console.error('Erro ao remover sugestão:', error)
    res.status(500).send('Erro ao remover sugestão do servidor')
  }
})

app.post('/cadastrar', verificaAutorizacao, function (req, res) {
  tbUsuarios
    .create({
      USUARIO: req.body.usuario.toUpperCase().replace(/\s/g, ''),
      SENHA: req.body.senha,
      ACESSO: req.body.acesso,
      NOME: req.body.nome,
      TELEFONE: req.body.telefone,
      EMAIL: req.body.email,
      CARGO: req.body.cargo,
    })
    .then(function () {
      res.redirect('/')
    })
    .catch(function (erro) {
      res.send(
        `Houve um erro na gravação: ` +
          erro +
          `</br> Entre em contato com Eduardo Bittencourt!`
      )
    })
})

app.post('/login', async function (req, res) {
  try {
    const user = await tbUsuarios.findOne({
      where: Sequelize.or(
        { USUARIO: req.body.usuario.toUpperCase().replace(/\s/g, '') },
        { EMAIL: req.body.usuario }
      ),
    })

    if (user) {
      if (req.body.senha === user.SENHA) {
        req.session.ID = user.ID
        req.session.USUARIO = user.USUARIO
        req.session.ACESSO = user.ACESSO
        req.session.usuario = user
        res.redirect('/inicio')
      } else {
        const errorMessage = 'Senha inválida'
        res.status(401).send(errorMessage)
      }
    } else {
      const errorMessage = 'Login inválido'
      res.status(401).send(errorMessage)
    }
  } catch (error) {
    console.error('Error:', error)
    const errorMessage = 'Internal Server Error'
    res.status(500).send(errorMessage)
  }
})

app.post('/logout', function (req, res) {
  req.session.destroy(function (err) {
    if (err) {
      console.error('Erro ao destruir a sessão:', err)
      res.status(500).send('Internal Server Error')
    } else {
      res.redirect('/')
    }
  })
})

app.post('/inicio', async function (req, res) {
  try {
    await sugerir.create({
      ID: req.session.ID,
      USUARIO: req.session.USUARIO,
      SUGESTAO: req.body.sugestao,
    })
    res.sendFile(__dirname + '/index/MENU.html')
  } catch (erro) {
    res
      .status(500)
      .send(
        `Houve um erro na gravação: ${erro}. Entre em contato com Eduardo Bittencourt!`
      )
  }
})

app.post('/acesso', async function (req, res) {
  try {
    const consultaUsuario = req.body.usuario

    const usuario = await tbUsuarios.findOne({
      where: Sequelize.or(
        { USUARIO: consultaUsuario.toUpperCase().replace(/\s/g, '') },
        { EMAIL: consultaUsuario }
      ),
    })

    if (usuario) {
      console.log(usuario)
      const campos = `${usuario.SENHA};${usuario.USUARIO};${usuario.EMAIL};${usuario.CARGO};${usuario.ATIVO};${usuario.TELEFONE};${usuario.ACESSO}`
      res.send(campos)
    } else {
      res.send('Usuario nao encontrado')
    }
  } catch (error) {
    console.error('Erro na consulta de usuário:', error)
    res.status(500).send('Internal Server Error')
  }
})

app.post('/atualizar-usuario', verificaAutorizacao, async function (req, res) {
  try {
    const { USUARIO, EMAIL, SENHA, CARGO, ATIVO, TELEFONE, ACESSO } = req.body

    // Atualize o usuário no banco de dados
    await tbUsuarios.update(
      {
        EMAIL,
        SENHA,
        CARGO,
        ATIVO,
        TELEFONE,
        ACESSO,
      },
      {
        where: {
          USUARIO,
        },
      }
    )

    res.redirect('/acesso')
  } catch (error) {
    console.error('Erro na atualização de usuário:', error)
    res.status(500).send('Internal Server Error')
  }
})

app.post(
  '/atualizar-recepcionistas/:dia',
  verificaAutorizacao,
  async (req, res) => {
    try {
      const {
        s1Data,
        s1Recepcionista,
        s2Data,
        s2Recepcionista,
        s3Data,
        s3Recepcionista,
        s4Data,
        s4Recepcionista,
        s5Data,
        s5Recepcionista,
      } = req.body

      const { dia } = req.params

      await recepcionar.update(
        {
          S1_DATA: s1Data,
          S1_RECEPCIONISTA: s1Recepcionista,
          S2_DATA: s2Data,
          S2_RECEPCIONISTA: s2Recepcionista,
          S3_DATA: s3Data,
          S3_RECEPCIONISTA: s3Recepcionista,
          S4_DATA: s4Data,
          S4_RECEPCIONISTA: s4Recepcionista,
          S5_DATA: s5Data,
          S5_RECEPCIONISTA: s5Recepcionista,
        },
        { where: { TELA: dia } }
      )

      res.send('Dados atualizados com sucesso!')
    } catch (error) {
      console.error('Erro na atualização de recepcionistas:', error)
      res.status(500).send('Internal Server Error')
    }
  }
)

// app.js
app.post(
  '/atualizar-pregadores/:dia',
  verificaAutorizacao,
  async (req, res) => {
    try {
      const {
        s1Data,
        s1Pregador,
        s2Data,
        s2Pregador,
        s3Data,
        s3Pregador,
        s4Data,
        s4Pregador,
        s5Data,
        s5Pregador,
      } = req.body

      const { dia } = req.params

      await pregar.update(
        {
          S1_DATA: s1Data,
          S1_PREGADOR: s1Pregador,
          S2_DATA: s2Data,
          S2_PREGADOR: s2Pregador,
          S3_DATA: s3Data,
          S3_PREGADOR: s3Pregador,
          S4_DATA: s4Data,
          S4_PREGADOR: s4Pregador,
          S5_DATA: s5Data,
          S5_PREGADOR: s5Pregador,
        },
        { where: { TELA: dia } }
      )

      res.send('Dados atualizados com sucesso!')
    } catch (error) {
      console.error('Erro na atualização de pregadores:', error)
      res.status(500).send('Internal Server Error')
    }
  }
)

app.post('/atualizar-musicas/:tela', verificaAutorizacao, async (req, res) => {
  const tela = req.params.tela

  try {
    // Obtenha os dados do corpo da requisição
    const {
      s1Data,
      s1Ministrante,
      s1Musicas,
      s2Data,
      s2Ministrante,
      s2Musicas,
      s3Data,
      s3Ministrante,
      s3Musicas,
      s4Data,
      s4Ministrante,
      s4Musicas,
      s5Data,
      s5Ministrante,
      s5Musicas,
    } = req.body

    // Atualize os registros no banco de dados
    await ministrar.update(
      {
        S1_DATA: s1Data,
        S1_MINISTRANTE: s1Ministrante,
        S1_MUSICA: s1Musicas,
        S2_DATA: s2Data,
        S2_MINISTRANTE: s2Ministrante,
        S2_MUSICA: s2Musicas,
        S3_DATA: s3Data,
        S3_MINISTRANTE: s3Ministrante,
        S3_MUSICA: s3Musicas,
        S4_DATA: s4Data,
        S4_MINISTRANTE: s4Ministrante,
        S4_MUSICA: s4Musicas,
        S5_DATA: s5Data,
        S5_MINISTRANTE: s5Ministrante,
        S5_MUSICA: s5Musicas,
      },
      { where: { TELA: tela } }
    )

    res.send('Dados da playlist atualizados com sucesso!')
  } catch (error) {
    console.error('Erro na atualização de dados:', error)
    res.status(500).send('Erro na atualização de dados')
  }
})

app.post('/verificar', verificaAutorizacao, function (req, res) {
  res.send('Informações atualizadas com sucesso!')
})

app.listen(process.env.MSQLPORT ?? porta, function () {
  console.log(`Servidor rodando em http://localhost:` + porta)
})
