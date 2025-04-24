// ------ BASE DE APIS FEITA PELO MANO GIULIAN ------ \\
// ------ REDES SOCIAIS E CANAIS ------ \\

//YOUTUBE 
// https://www.youtube.com/@giulianbandeira

//WHATSAPP 
// https://whatsapp.com/channel/0029VaZGpDmLCoX80H33T50h

//WHATSAPP PRA CONTATO
// https://wa.me/5517997285572

//WHATSAPP COMUNIDADE 
// https://chat.whatsapp.com/HUHSfDIr6VwKpVUUm24fdH

//INSTAGRAM 
// https://instagram.com/giulian.bandeira


bla = process.cwd() // NÃO MEXA AQUI

// ------ MÓDULOS ------ \\

const express = require('express');
const cors = require('cors')
const morgan = require ('morgan')
const axios = require('axios');
const cheerio = require('cheerio');
const path = require('path');
const fs = require('fs')
var fetch = require('node-fetch');
var cron = require('node-cron');
const cfonts = require("cfonts")
const ffmpeg = require("fluent-ffmpeg");
const zrapi = require("zrapi");
var thiccysapi = require('textmaker-thiccy');
var { Maker } = require('imagemaker.js')
const multer = require('multer');
//var canvasx = require('discord-canvas')
const { instagram } = require('betabotz-tools')
//const { UltimateTextToImage, registerFont } = require("ultimate-text-to-image");
//const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
var router = express.Router()
// Criar uma instância do Express
const app = express();
const PORT = process.env.PORT || 20000 // Porta em que a API vai rodar


// ------ SCRAPPERS ------ \\

const { payment } = require('./PixAPI-MercadoPago-Js/index.js');
const { igstalk } = require('./lib/instagram')
var { color } = require('./lib/color.js')
const { mediafireDl } = require('./scrapers/mediafire.js');
var { kwaiDownload } = require('./scrapers/kwai.js')
var { generateImage } = require('./scrapers/imagine.js')
var { pinterest, getBuffer , fetchJson , ping } = require('./lib/funcoes.js') 
var { styletext } = require('./scrapers/scraper.js')
const { RequestsAdd } = require(bla + '/scrapers/totalreq.js');   
const { chatGpt } = require('./scrapers/chatgpt')
const wallpaper = JSON.parse(fs.readFileSync("./scrapers/wallpaper.json"));
var { YTNomeSearch } = require('./scrapers/youtoba.js')
const {
  ytDonlodMp3,
  ytDonlodMp4,
  ytPlayMp3,
  ytPlayMp4,
  ytSearch
} = require("./scrapers/youtube");


// ------ INFO ------ \\

var msgerro = 'Erro Ocorrido Contate O suporte!'
var criador = "@Giulian - WHATSAPP: +55 (17) 99728-55725" 


// ------ SISTEMA DE KEYS ------ \\

var key = JSON.parse(fs.readFileSync("./lib/secret/keys.json"));
const users = JSON.parse(fs.readFileSync("./lib/secret/usuarios.json"));
const pendingPayments = {}; // Armazena chaves temporárias para pagamentos pendentes


async function listkeys(apitoken, req) {
var i4 = key.map(i => i?.apitoken)?.indexOf(apitoken)
if(i4 >= 0) {
key[i4].request -= 2;
fs.writeFileSync("./lib/secret/keys.json", JSON.stringify(key, null, 2));
await RequestsAdd(); 
var IP = req.headers['x-real-ip'] || req.connection.remoteAddress || 0;
var i3 = users.map(i => i.key).indexOf(apitoken);
if(i3 < 0 && !users.map(i => i.IP).includes(IP?.split(":")[3])){
users.push({key: apitoken, IP: [IP?.split(":")[3]]})
fs.writeFileSync("./lib/secret/usuarios.json", JSON.stringify(users, null, 2));
} else if(i3 >= 0 && !users[i3]?.IP.includes(IP?.split(":")[3])) {
users[i3].IP.push(IP?.split(":")[3])
fs.writeFileSync("./lib/secret/usuarios.json", JSON.stringify(users, null, 2));
}}} 

// ------ FUNCTIONS ADICIONAIS ------ \\

/*ffmpeg.setFfmpegPath(ffmpegPath);

registerFont((__dirname + '/base de dados/fontes/NotoEmoji.ttf'), { family: 'Noto Emoji' });
registerFont(__dirname + '/base de dados/fontes/NotoSansMono.ttf', { family: 'Noto Sans Mono' });

let randomName = (ext) => uuid().split('-')[0] + (ext ? ext : '');

async function ttp(text, color = '#ffffff', name = randomName('.png')) {
new UltimateTextToImage(text, {
width: 500,
height: 500,
fontFamily: "Noto Emoji, Noto Sans Mono",
fontColor: color,
fontSize: 300,
minFontSize: 10,
lineHeight: 50,
autoWrapLineHeightMultiplier: 1.2,
margin: 15,
//marginBottom: 40,
align: "center",
valign: "middle",
}).render().toFile(`./assets/Edições/${name}`);
return `./assets/Edições/${name}`;
}

async function attp(text) {
let nome = randomName('');
let lista = [
ttp(text, '#ff0000', `${nome}0.png`),
ttp(text, '#ffa600', `${nome}1.png`),
ttp(text, '#ffee00', `${nome}2.png`),
ttp(text, '#2bff00', `${nome}3.png`),
ttp(text, '#00ffea', `${nome}4.png`),
ttp(text, '#3700ff', `${nome}5.png`),
ttp(text, '#ff00ea', `${nome}6.png`),
];

return new Promise(function (resolve, reject) {
// gerar webp
ffmpeg().addInput((`./assets/Edições/${nome}`+"%d.png"))
.addOutputOptions(['-vcodec', 'libwebp', '-vf','scale=500:500:force_original_aspect_ratio=decrease,setsar=1, pad=500:500:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse', '-loop', '50', '-preset', 'default'])
//.outputFPS(15)
.toFormat('webp')
.on('end', () => {
for (let img = 0; img < lista.length; img++) {
delFile("*png");
}
resolve('./assets/Edições/'+nome+'.webp')}).on('error', (err) => {
for (let img = 0; img < lista.length; img++) {
delFile("*webp");
}
reject(('erro ffmpeg ' + err));
}).save(('./assets/Edições/'+nome+'.webp'));
});
}*/


// Configurações do multer para salvar imagens
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });


// ------ SISTEMA DAS PÁGINAS ------ \\

app.get('/docs',(req,res)=>{
    res.sendFile(path.join(__dirname,'/public','index.html'))})
app.get('/',(req, res) => {
res.sendFile(path.join(__dirname, "./public/", "docs.html"))});
app.get('/panel',(req, res) => {
res.sendFile(path.join(__dirname, "./public/", "admin.html"))});
app.get('/planos',(req, res) => {
res.sendFile(path.join(__dirname, "./public/", "planos.html"))});
app.get('/pack',(req, res) => {
res.sendFile(path.join(__dirname, "./public/", "cases.html"))});
app.get('/uploader',(req, res) => {
res.sendFile(path.join(__dirname, "./public/", "upload.html"))}); 
    app.use(cors())
    app.set("json spaces",2)
    app.use(express.static("public"))
    app.use(express.json())
    app.use(router)

// ------ SISTEMA DAS APIS ------ \\

app.get('/api/keyerrada',(req, res) => {
var apitoken = req.query.apitoken;
var ITC = key.map(i => i?.apitoken)?.indexOf(apitoken);
if(ITC < 0) {
return res.json({key:' ❌ Sua apitoken é invalida!! ❌'})
} else {return res.json({key:`🔑 Sua Apitoken está 100% ✅ • Requisições Restantes: ${key[ITC]?.request}`})}})

app.get('/api/status/key',(req, res) => {
var apitoken = req.query.apitoken;
var ITC = key.map(i => i?.apitoken)?.indexOf(apitoken);
if(ITC < 0) {
return res.json({key:' ❌ Sua apitoken é invalida!! ❌'})
} else {return res.json({key:`${key[ITC]?.request}`})}
})

app.get('/api/status/apitoken',(req, res) => {
var apitoken = req.query.apitoken;
if(key.map(i => i.apitoken).includes(apitoken)) {
return res.json({resultado: "Essa key já está inclusa dentro do sistema.."})
} else {
return res.json({resultado: `Não está inclusa`})
}
})
 
app.get('/api/add-key',(req, res) => {
a = req.query.a
if(!a.includes("&")) return res.json({resultado: "Faltando o &"})
var [apitoken, senha, rq] = a.split("&")
var senhaofc = "K23"
if(senha != senhaofc) return res.json({resultado: "Senha invalida.."})
if(!apitoken) return res.json({resultado: "Kd a key.."})
if(key.map(i => i.apitoken).includes(apitoken)) {
return res.json({resultado: "Essa key já está inclusa dentro do sistema.."})
} else {
key.push({apitoken: apitoken, request: rq})
fs.writeFileSync("./lib/secret/keys.json", JSON.stringify(key))
var ITC = key.map(i => i?.apitoken)?.indexOf(apitoken);
return res.json({resultado: `🔑 Apitoken: ${apitoken} Foi Adicionada ao Sistema com Exito!\n🚀 Numero de Requisições Disponiveis: ${key[ITC]?.request}`})
}
})
 
app.get('/api/del-key',(req, res) => {
a = req.query.a
if(!a.includes("&")) return res.json({resultado: "Faltando o &"})
var [apitoken, senha] = a.split("&")
var senhaofc = "K23"
if(senha != senhaofc) return res.json({resultado: "Senha invalida.."})
if(!apitoken) return res.json({resultado: "Kd a key.."})
if(!key.map(i => i.apitoken).includes(apitoken)) {
return res.json({resultado: "Essa key não está inclusa.."})
} else {
var i2 = key.map(i => i.apitoken).indexOf(apitoken)
key.splice(i2, 1)
fs.writeFileSync("./lib/secret/keys.json", JSON.stringify(key))
return res.json({resultado: `🔑 Apitoken ${apitoken} deletada com sucesso..`})
}
})

app.post('/create_payment', async (req, res) => {
  const { value, apiKey } = req.body;
  const accessToken = 'APP_USR-3827115893832662-010119-3408324b6649ba71f3ec2090cd839b88-533004323';

  try {
    const paymentInstance = new payment(accessToken);
    const paymentInfo = await paymentInstance.create_payment(value);

    // Armazena a chave temporariamente, associada ao ID do pagamento
    pendingPayments[paymentInfo.id] = apiKey;

    res.json(paymentInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/check_payment/:payment_id', async (req, res) => {
  const { payment_id } = req.params;
  const apiKey = pendingPayments[payment_id];
  const accessToken = 'APP_USR-3827115893832662-010119-3408324b6649ba71f3ec2090cd839b88-533004323';

  if (!apiKey) {
    return res.json({ resultado: "Chave não encontrada para esse pagamento." });
  }

  try {
    const paymentInstance = new payment(accessToken);
    paymentInstance.payment_id = payment_id;
    const paymentStatus = await paymentInstance.check_payment();

    if (paymentStatus.status === 'approved') {
      if (keys.some(key => key.apitoken === apiKey)) {
        return res.json({ resultado: "Essa chave já está registrada no sistema." });
      } else {
        // Adiciona a chave ao sistema e salva no arquivo JSON
        keys.push({ apitoken: apiKey, request: paymentStatus.request });
        fs.writeFileSync('./lib/secret/keys.json', JSON.stringify(keys, null, 2));

        delete pendingPayments[payment_id]; // Remove o pagamento da lista temporária

        return res.json({ resultado: "Pagamento aprovado e chave adicionada!" });
      }
    } else if (paymentStatus.status === 'rejected') {
      delete pendingPayments[payment_id]; // Remove o pagamento rejeitado
      return res.json({ resultado: "Pagamento rejeitado." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/insta-stalk', async(req, res, next) => {
var apitoken = req.query.apitoken
if(key[key.map(i => i?.apitoken)?.indexOf(apitoken)]?.request <= 0) return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
if(!apitoken)return res.json({resultado:'Cade o parametro apitoken?'})
if(!key.map(i => i.apitoken)?.includes(apitoken))return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
await listkeys(apitoken, req);
var ITC = key.map(i => i?.apitoken)?.indexOf(apitoken);
console.log(color(' │ APITOKEN:'  + ` ${apitoken} • LIMITE: ${key[ITC]?.request}\n`,'red'),color('│','red'), color('REQUEST', 'red'), '• ' + color('PING: ' + ping(), 'red'))
query = req.query.query
if (!query) return res.json({ status : false, criador : `${criador}`, resultado : "Coloque o parametro: query"})
    try {
        const { igstalk } = require('./lib/instagram.js') 
        const api = await igstalk(username)
        const anu = api.data
        res.json({
        status: true,
        código: 200,
        criador: `${criador}`, 
        resultado: {
        id: anu.id,
        nomeCompleto: anu.fullname,
        privado: anu.private,
        verificado: anu.verified,
        bio: anu.bio,
        seguidores: anu.follower,
        seguindo: anu.following,
        connectFacebook: anu.conneted_fb,
        videoTimLine: anu.videotimeline,
        timeLine: anu.timeline,
        savedMedia: anu.savedmedia,
        coleção: anu.collections,
        photoProfile: api.profile
        }
        })
        } catch (err) {
        res.json({resultado: `${err}`})
        };
});

app.post('/upload', upload.single('image'), (req, res) => {
    if (req.file) {
        const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
        res.json({ link: imageUrl });
    } else {
        res.status(400).send('Erro ao fazer upload');
    }
});

app.get('/uploads/:id', (req, res) => {
const imagem = req.params.id;
const filePath = path.join(__dirname, 'uploads', imagem);
if (fs.existsSync(filePath)) {
res.sendFile(filePath);
} else {
res.status(404).send('Arquivo não encontrado');
}
});

app.get('/download/mediafire', async (req, res, next) => {
var apitoken = req.query.apitoken
if(key[key.map(i => i?.apitoken)?.indexOf(apitoken)]?.request <= 0) return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
if(!apitoken)return res.json({resultado:'Cade o parametro apitoken?'})
if(!key.map(i => i.apitoken)?.includes(apitoken))return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
await listkeys(apitoken, req);
var ITC = key.map(i => i?.apitoken)?.indexOf(apitoken);
console.log(color(' │ APITOKEN:'  + ` ${apitoken} • LIMITE: ${key[ITC]?.request}\n`,'red'),color('│','red'), color('REQUEST', 'red'), '• ' + color('PING: ' + ping(), 'red'))
url = req.query.url
if (!url) return res.json({ status : false, creator : `${criador}`, resultado : "Cade o parametro url?"})
mediafireDl(url)
.then(data => {
var resultado = data;
res.json({
status: true,
código: 200,
criador: `${criador}`,
resultado:{
resultado
}
})
}).catch(e => {
res.json({resultado: `${msgerro}`})
})
})

app.get("/ias/bing", async(req, res) => {
try {
var apitoken = req.query.apitoken
if(key[key.map(i => i?.apitoken)?.indexOf(apitoken)]?.request <= 0) return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
if(!apitoken)return res.json({resultado:'Cade o parametro apitoken?'})
if(!key.map(i => i.apitoken)?.includes(apitoken))return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
await listkeys(apitoken, req);
var ITC = key.map(i => i?.apitoken)?.indexOf(apitoken);
console.log(color(' │ APITOKEN:'  + ` ${apitoken} • LIMITE: ${key[ITC]?.request}\n`,'red'),color('│','red'), color('REQUEST', 'red'), '• ' + color('PING: ' + ping(), 'red'))
var pesquisa = req.query.pesquisa
if (!pesquisa) return res.json({resultado: "Cade, quer pesquisar o que?"})
const url = `https://www.bing.com/search?q=${pesquisa}&setmkt=pt-BR&PC=EMMX01&form=LWS002&scope=web`;
axios(url).then(response => {
const $ = cheerio.load(response.data);
const Rst = [];
$("div > p").each(function(){
const TTL = $(this).text();
if(TTL.length > 10)
Rst.push({ 
TTL
});
});
let bla = ''
for (let i of Rst) {
bla += `${i.TTL.replace(new RegExp("Web", "gi"), "")}\n\n`
}
res.json({
criador: `${criador}`,
resultado: bla
})
}).catch(e => {
return res.json({resultado: "Error, digite algo que queira pesquisar.."})
})
} catch (e) {
return res.json({resultado: `${msgerro}`})
}
})

app.get('/ias/gpt', async (req, res) => {
query = req.query.query
if(!query)return res.json({status:false, resultado: 'Cade o parametro query??'})
var apitoken = req.query.apitoken
if(key[key.map(i => i?.apitoken)?.indexOf(apitoken)]?.request <= 0) return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
if(!apitoken)return res.json({resultado:'Cade o parametro apitoken?'})
if(!key.map(i => i.apitoken)?.includes(apitoken))return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
await listkeys(apitoken, req);
var ITC = key.map(i => i?.apitoken)?.indexOf(apitoken);
console.log(color(' │ APITOKEN:'  + ` ${apitoken} • LIMITE: ${key[ITC]?.request}\n`,'red'),color('│','red'), color('REQUEST', 'red'), '• ' + color('PING: ' + ping(), 'red'))
anu = await chatGpt(`${query}`)
res.json({
status: true,
criador: `${criador}`,
resultado: `${anu.result}`,
})
})

app.get('/sticker/aleatorio', async (req, res, next) => {
var apitoken = req.query.apitoken
if(key[key.map(i => i?.apitoken)?.indexOf(apitoken)]?.request <= 0) return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
if(!apitoken)return res.json({resultado:'Cade o parametro apitoken?'})
if(!key.map(i => i.apitoken)?.includes(apitoken))return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
await listkeys(apitoken, req);
var ITC = key.map(i => i?.apitoken)?.indexOf(apitoken);
console.log(color(' │ APITOKEN:'  + ` ${apitoken} • LIMITE: ${key[ITC]?.request}\n`,'red'),color('│','red'), color('REQUEST', 'red'), '• ' + color('PING: ' + ping(), 'red'))
try {
var rnd = Math.floor(Math.random() * 8051)
    hasil = `https://raw.githubusercontent.com/badDevelopper/Testfigu/main/fig (${rnd}).webp`
	  popoc = await getBuffer(hasil)
         res.type('jpg')
res.send(popoc)
         } catch(err) {
  res.json({resultado: `${msgerro}`})
}
})

app.get('/sticker/anime', async (req, res, next) => {
var apitoken = req.query.apitoken
if(key[key.map(i => i?.apitoken)?.indexOf(apitoken)]?.request <= 0) return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
if(!apitoken)return res.json({resultado:'Cade o parametro apitoken?'})
if(!key.map(i => i.apitoken)?.includes(apitoken))return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
await listkeys(apitoken, req);
var ITC = key.map(i => i?.apitoken)?.indexOf(apitoken);
console.log(color(' │ APITOKEN:'  + ` ${apitoken} • LIMITE: ${key[ITC]?.request}\n`,'red'),color('│','red'), color('REQUEST', 'red'), '• ' + color('PING: ' + ping(), 'red'))
try {
var rnd = Math.floor(Math.random() * 109)
    hasil = `https://raw.githubusercontent.com/Scheyot2/sakura-botv6/main/FIGURINHAS/figurinha-anime/${rnd}.webp`
	  popoc = await getBuffer(hasil)
         res.type('jpg')
res.send(popoc)
         } catch(err) {
  res.json({resultado: `${msgerro}`})
}
})

app.get('/api/pinterest', (req, res) => {
(async() => {
var apitoken = req.query.apitoken
if(key[key.map(i => i?.apitoken)?.indexOf(apitoken)]?.request <= 0) return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
if(!apitoken)return res.json({resultado:'Cade o parametro apitoken?'})
if(!key.map(i => i.apitoken)?.includes(apitoken))return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
await listkeys(apitoken, req);
var ITC = key.map(i => i?.apitoken)?.indexOf(apitoken);
console.log(color(' │ APITOKEN:'  + ` ${apitoken} • LIMITE: ${key[ITC]?.request}\n`,'red'),color('│','red'), color('REQUEST', 'red'), '• ' + color('PING: ' + ping(), 'red'))
text = req.query.text
if (!text) return res.json({ status : false, creator : `${criador}`, resultado : "Cade o parametro text?"})
pin = await pinterest(text)
ac = pin[Math.floor(Math.random() * pin.length)]
res.type('jpg')
res.send(await getBuffer(ac))
})()
})

router.get('/download/play-mp4', async(req, res, next) => {
 nome = req.query.nome
if(!nome)return res.json({status:false, resultado:'Cade o parametro nome??'  }) 
var apitoken = req.query.apitoken
if(key[key.map(i => i?.apitoken)?.indexOf(apitoken)]?.request <= 0) return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
if(!apitoken)return res.json({resultado:'Cade o parametro apitoken?'})
if(!key.map(i => i.apitoken)?.includes(apitoken))return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
await listkeys(apitoken, req);
var ITC = key.map(i => i?.apitoken)?.indexOf(apitoken);
console.log(color(' │ APITOKEN:'  + ` ${apitoken} • LIMITE: ${key[ITC]?.request}\n`,'red'),color('│','red'), color('REQUEST', 'red'), '• ' + color('PING: ' + ping(), 'red'))
try {
api = await YTNomeSearch(nome)
/*res.json({
status: true,
código: 200,
criador: `${criador}`,
resultado: {
thumb: api.thumb,
titulo: api.title,
canal: api.channel,
duração: api.duration,
visualizações: api.views,
publicado: api.publishedDate,
audio: api.audiourl,
link: api.url,
linkOriginal: api.urlOriginal,
}
})*/
res.set('Content-Type', 'audio/mp3');
    
    // Redireciona diretamente o áudio para que o navegador abra o player automaticamente
    res.send(await getBuffer(api.audiourl));
}catch(e) {
console.log(e)
res.json({resultado: `${err}`})
}})

router.get('/download/play-mp3', async(req, res, next) => {
 nome = req.query.nome
if(!nome)return res.json({status:false, resultado:'Cade o parametro nome??'  }) 
var apitoken = req.query.apitoken
if(key[key.map(i => i?.apitoken)?.indexOf(apitoken)]?.request <= 0) return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
if(!apitoken)return res.json({resultado:'Cade o parametro apitoken?'})
if(!key.map(i => i.apitoken)?.includes(apitoken))return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
await listkeys(apitoken, req);
var ITC = key.map(i => i?.apitoken)?.indexOf(apitoken);
console.log(color(' │ APITOKEN:'  + ` ${apitoken} • LIMITE: ${key[ITC]?.request}\n`,'red'),color('│','red'), color('REQUEST', 'red'), '• ' + color('PING: ' + ping(), 'red'))
 ytPlayMp3(nome).then((akk) => {
res.json({
status: true,
código: 200,
criador: `${criador}`,
resultado: akk
})}).catch(e => {
res.json({resultado: `${err}`})})})

app.get('/geradores/fazernick', async (req, res) => {
  var apitoken = req.query.apitoken
if(key[key.map(i => i?.apitoken)?.indexOf(apitoken)]?.request <= 0) return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
if(!apitoken)return res.json({resultado:'Cade o parametro apitoken?'})
if(!key.map(i => i.apitoken)?.includes(apitoken))return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
await listkeys(apitoken, req);
var ITC = key.map(i => i?.apitoken)?.indexOf(apitoken);
console.log(color(' │ APITOKEN:'  + ` ${apitoken} • LIMITE: ${key[ITC]?.request}\n`,'red'),color('│','red'), color('REQUEST', 'red'), '• ' + color('PING: ' + ping(), 'red'))
let nome = req.query.nome || res.json({resultado: 'insira o parâmetro: ?nome='})
await styletext(nome)
.then(nicks => {
res.send(nicks) 
}).catch(e => {
res.json({resultado: `${msgerro}`})
})
})

app.get('/ias/imagine', async (req, res) => {
  var apitoken = req.query.apitoken
if(key[key.map(i => i?.apitoken)?.indexOf(apitoken)]?.request <= 0) return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
if(!apitoken)return res.json({resultado:'Cade o parametro apitoken?'})
if(!key.map(i => i.apitoken)?.includes(apitoken))return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
await listkeys(apitoken, req);
var ITC = key.map(i => i?.apitoken)?.indexOf(apitoken);
console.log(color(' │ APITOKEN:'  + ` ${apitoken} • LIMITE: ${key[ITC]?.request}\n`,'red'),color('│','red'), color('REQUEST', 'red'), '• ' + color('PING: ' + ping(), 'red'))
let nome = req.query.nome || res.json({resultado: 'insira o parâmetro: ?nome='})
generateImage(nome).then(hasil => {
res.json({
status: 200,
criador: `${criador}`,
resultado: hasil
})}).catch(e => {
res.json({
resultado: `${msgerro}`
})})})

app.get('/geradores/criar-email', async(req, res, next) => {
var apitoken = req.query.apitoken
if(key[key.map(i => i?.apitoken)?.indexOf(apitoken)]?.request <= 0) return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
if(!apitoken)return res.json({resultado:'Cade o parametro apitoken?'})
if(!key.map(i => i.apitoken)?.includes(apitoken))return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
await listkeys(apitoken, req);
var ITC = key.map(i => i?.apitoken)?.indexOf(apitoken);
console.log(color(' │ APITOKEN:'  + ` ${apitoken} • LIMITE: ${key[ITC]?.request}\n`,'red'),color('│','red'), color('REQUEST', 'red'), '• ' + color('PING: ' + ping(), 'red'))
try {
var resS = await axios.get('https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=10')
var data = await resS.data;
res.json({
status: true,
criador: `${criador}`,
resultado: data
})
} catch (err) {
res.json({resultado: `${msgerro}`})
};
})

app.get('/geradores/ler-email', async(req, res, next) => {
var apitoken = req.query.apitoken
var login = req.query.login;
var domain = req.query.domain;
var id = req.query.id;
if(!login)return res.json({status:false,resultado: 'Cadê o parâmetro login?'})
if(!domain)return res.json({status:false,resultado:'- Cadê o parâmetro domain?'})
if(!id)return res.json({status:false,resultado:'- Cadê o parâmetro id?'})
if(key[key.map(i => i?.apitoken)?.indexOf(apitoken)]?.request <= 0) return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
if(!apitoken)return res.json({resultado:'Cade o parametro apitoken?'})
if(!key.map(i => i.apitoken)?.includes(apitoken))return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
await listkeys(apitoken, req);
var ITC = key.map(i => i?.apitoken)?.indexOf(apitoken);
console.log(color(' │ APITOKEN:'  + ` ${apitoken} • LIMITE: ${key[ITC]?.request}\n`,'red'),color('│','red'), color('REQUEST', 'red'), '• ' + color('PING: ' + ping(), 'red'))
try {
var url = `https://www.1secmail.com/api/v1/?action=readMessage&login=${login}&domain=${domain}&id=${id}`
console.log(login , domain, id)
var ress = await axios.get(url)
var data = await ress.data
res.json({
status: true,
criador: `${criador}`,
resultado: data
})
} catch (err) {
res.json({resultado: `${msgerro}`})
};
})

app.get('/api/wallpaper', async(req,res) => {
var apitoken = req.query.apitoken
if(key[key.map(i => i?.apitoken)?.indexOf(apitoken)]?.request <= 0) return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
if(!apitoken)return res.json({resultado:'Cade o parametro apitoken?'})
if(!key.map(i => i.apitoken)?.includes(apitoken))return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
await listkeys(apitoken, req);
var ITC = key.map(i => i?.apitoken)?.indexOf(apitoken);
console.log(color(' │ APITOKEN:'  + ` ${apitoken} • LIMITE: ${key[ITC]?.request}\n`,'red'),color('│','red'), color('REQUEST', 'red'), '• ' + color('PING: ' + ping(), 'red'))

r = wallpaper[Math.floor(Math.random() * wallpaper.length)]
res.type('jpg')
res.send(await getBuffer(r))
})

app.get('/welcome', async (req, res) => {
var apitoken = req.query.apitoken
if (!req.query.nome) return res.json({ status: 404, error: 'Insira o parametro: nome'})
if (!req.query.perfil) return res.json({ status: 404, error: 'Insira o parametro: perfil'})
if (!req.query.fundo) return res.json({ status: 404, error: 'Insira o parametro: fundo'})
if (!req.query.grupo) return res.json({ status: 404, error: 'Insira o parametro: grupo'})
if(key[key.map(i => i?.apitoken)?.indexOf(apitoken)]?.request <= 0) return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
if(!apitoken)return res.json({resultado:'Cade o parametro apitoken?'})
if(!key.map(i => i.apitoken)?.includes(apitoken))return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
await listkeys(apitoken, req);
var ITC = key.map(i => i?.apitoken)?.indexOf(apitoken);
console.log(color(' │ APITOKEN:'  + ` ${apitoken} • LIMITE: ${key[ITC]?.request}\n`,'red'),color('│','red'), color('REQUEST', 'red'), '• ' + color('PING: ' + ping(), 'red'))
let welcomer = await new canvasx.Welcome()
.setUsername(req.query.nome)
.setDiscriminator("2024")
.setText("title", "BEM VINDO")
.setText("message", req.query.grupo)
.setAvatar(req.query.perfil)
.setColor("border", "#8015EA")
.setColor("username-box", "#8015EA")
.setColor("discriminator-box", "#8015EA")
.setColor("message-box", "#8015EA")
.setColor("title", "#8015EA")
.setColor("avatar", "#8015EA")
.setBackground(req.query.fundo)
.toAttachment()
let base64 = `${welcomer.toBuffer().toString('base64')}`
require('fs').writeFileSync('welkom.png', base64, 'base64')
res.sendFile(bla+'/welkom.png')
});

app.get('/download/instamp4-2', async (req, res) => {
url = req.query.url
if(!url)return res.json({
status:false,
motivo:'Coloque o parâmetro: url'
})
var apitoken = req.query.apitoken
if(key[key.map(i => i?.apitoken)?.indexOf(apitoken)]?.request <= 0) return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
if(!apitoken)return res.json({resultado:'Cade o parametro apitoken?'})
if(!key.map(i => i.apitoken)?.includes(apitoken))return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
await listkeys(apitoken, req);
var ITC = key.map(i => i?.apitoken)?.indexOf(apitoken);
console.log(color(' │ APITOKEN:'  + ` ${apitoken} • LIMITE: ${key[ITC]?.request}\n`,'red'),color('│','red'), color('REQUEST', 'red'), '• ' + color('PING: ' + ping(), 'red'))
try {

const results = await instagram(url)
res.json({
status: true,
criador: `${criador}`,
resultado: results.result[0]._url
})
return results //JSON

} catch (err) {
res.json({resultado: `${msgerro}`})
};
})

app.get('/ias/animeai', async (req, res, next) => {
 var img = req.query.img
if(!img)return res.json({status:false,motivo:'Cadê o parâmetro img?'})
  var apitoken = req.query.apitoken
if(key[key.map(i => i?.apitoken)?.indexOf(apitoken)]?.request <= 0) return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
if(!apitoken)return res.json({resultado:'Cade o parametro apitoken?'})
if(!key.map(i => i.apitoken)?.includes(apitoken))return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
await listkeys(apitoken, req);
var ITC = key.map(i => i?.apitoken)?.indexOf(apitoken);
console.log(color(' │ APITOKEN:'  + ` ${apitoken} • LIMITE: ${key[ITC]?.request}\n`,'red'),color('│','red'), color('REQUEST', 'red'), '• ' + color('PING: ' + ping(), 'red'))
try {

const { toanime } = require('betabotz-tools') 
const results = await toanime(img)
res.json({criador: `${criador}`,
resultado: results}) 
		} catch (error) {
		console.log(error)
return res.status(404).json({ resultado: `${msgerro}`, status: 500 });
}
})

app.get('/sticker/attp', async (req, res) => {
try {
var texto = req.query.texto
if(!texto)return res.json({status:false,motivo:'Cadê o parâmetro texto?'})
   var apitoken = req.query.apitoken
if(key[key.map(i => i?.apitoken)?.indexOf(apitoken)]?.request <= 0) return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
if(!apitoken)return res.json({resultado:'Cade o parametro apitoken?'})
if(!key.map(i => i.apitoken)?.includes(apitoken))return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
await listkeys(apitoken, req);
var ITC = key.map(i => i?.apitoken)?.indexOf(apitoken);
console.log(color(' │ APITOKEN:'  + ` ${apitoken} • LIMITE: ${key[ITC]?.request}\n`,'red'),color('│','red'), color('REQUEST', 'red'), '• ' + color('PING: ' + ping(), 'red'))
await attp(texto).then(img => {
res.sendFile(img, { root: __dirname})
}).catch(e => {
return res.json({message: "Erro.. "+e})
})
} catch (e) {
return res.json({message: "Erro.. "+e})
}
})

app.get('/sticker/attp2', async (req, res, next) => {   
try {
      var texto = req.query.texto
if(!texto)return res.json({status:false,motivo:'Cadê o parâmetro texto?'})
   var apitoken = req.query.apitoken
if(key[key.map(i => i?.apitoken)?.indexOf(apitoken)]?.request <= 0) return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
if(!apitoken)return res.json({resultado:'Cade o parametro apitoken?'})
if(!key.map(i => i.apitoken)?.includes(apitoken))return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
await listkeys(apitoken, req);
var ITC = key.map(i => i?.apitoken)?.indexOf(apitoken);
console.log(color(' │ APITOKEN:'  + ` ${apitoken} • LIMITE: ${key[ITC]?.request}\n`,'red'),color('│','red'), color('REQUEST', 'red'), '• ' + color('PING: ' + ping(), 'red'))
const { attp2 } = require("./figs/attp2.js")
await attp2(texto).then(img => {
res.sendFile(img, { root: __dirname})
}).catch(e => {
return res.json({message: "Erro.. "+e})
console.log(e)
})
} catch (e) {
return res.json({message: "Erro.. "+e})
console.log(e)
}
}) 


app.get('/sticker/attp3', async (req, res, next) => {
try {
      var texto = req.query.texto
if(!texto)return res.json({status:false,motivo:'Cadê o parâmetro texto?'})
 var apitoken = req.query.apitoken
if(key[key.map(i => i?.apitoken)?.indexOf(apitoken)]?.request <= 0) return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
if(!apitoken)return res.json({resultado:'Cade o parametro apitoken?'})
if(!key.map(i => i.apitoken)?.includes(apitoken))return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
await listkeys(apitoken, req);
var ITC = key.map(i => i?.apitoken)?.indexOf(apitoken);
console.log(color(' │ APITOKEN:'  + ` ${apitoken} • LIMITE: ${key[ITC]?.request}\n`,'red'),color('│','red'), color('REQUEST', 'red'), '• ' + color('PING: ' + ping(), 'red'))  
const { attp3 } = require("./figs/attp3.js")
await attp3(texto).then(img => {
res.sendFile(img, { root: __dirname})
}).catch(e => {
return res.json({message: "Erro.. "+e})
console.log(e)
})
} catch (e) {
return res.json({message: "Erro.. "+e})
console.log(e)
}
}) 

app.get('/sticker/attp4', async (req, res, next) => {
try {
var apitoken = req.query.apitoken
if(key[key.map(i => i?.apitoken)?.indexOf(apitoken)]?.request <= 0) return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
if(!apitoken)return res.json({resultado:'Cade o parametro apitoken?'})
if(!key.map(i => i.apitoken)?.includes(apitoken))return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
await listkeys(apitoken, req);
var ITC = key.map(i => i?.apitoken)?.indexOf(apitoken);
console.log(color(' │ APITOKEN:'  + ` ${apitoken} • LIMITE: ${key[ITC]?.request}\n`,'red'),color('│','red'), color('REQUEST', 'red'), '• ' + color('PING: ' + ping(), 'red'))
      var texto = req.query.texto
if(!texto)return res.json({status:false,motivo:'Cadê o parâmetro texto?'})
const { attp4 } = require("./figs/attp4.js")
await attp4(texto).then(img => {
res.sendFile(img, { root: __dirname})
}).catch(e => {
return res.json({message: "Erro.. "+e})
console.log(e)
})
} catch (e) {
return res.json({message: "Erro.. "+e})
console.log(e)
}
}) 


app.get('/sticker/attp5', async (req, res, next) => {
try {
      var texto = req.query.texto
if(!texto)return res.json({status:false,motivo:'Cadê o parâmetro texto?'})
   var apitoken = req.query.apitoken
if(key[key.map(i => i?.apitoken)?.indexOf(apitoken)]?.request <= 0) return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
if(!apitoken)return res.json({resultado:'Cade o parametro apitoken?'})
if(!key.map(i => i.apitoken)?.includes(apitoken))return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
await listkeys(apitoken, req);
var ITC = key.map(i => i?.apitoken)?.indexOf(apitoken);
console.log(color(' │ APITOKEN:'  + ` ${apitoken} • LIMITE: ${key[ITC]?.request}\n`,'red'),color('│','red'), color('REQUEST', 'red'), '• ' + color('PING: ' + ping(), 'red'))
const { attp5 } = require("./figs/attp5.js")
await attp5(texto).then(img => {
res.sendFile(img, { root: __dirname})
}).catch(e => {
return res.json({message: "Erro.. "+e})
console.log(e)
})
} catch (e) {
return res.json({message: "Erro.. "+e})
console.log(e)
}
}) 


app.get('/sticker/attp6', async (req, res, next) => {
try {
var texto = req.query.texto 
if(!texto)return res.json({status:false,motivo:'Cadê o parâmetro texto?'})
var apitoken = req.query.apitoken
if(key[key.map(i => i?.apitoken)?.indexOf(apitoken)]?.request <= 0) return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
if(!apitoken)return res.json({resultado:'Cade o parametro apitoken?'})
if(!key.map(i => i.apitoken)?.includes(apitoken))return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
await listkeys(apitoken, req);
var ITC = key.map(i => i?.apitoken)?.indexOf(apitoken);
console.log(color(' │ APITOKEN:'  + ` ${apitoken} • LIMITE: ${key[ITC]?.request}\n`,'red'),color('│','red'), color('REQUEST', 'red'), '• ' + color('PING: ' + ping(), 'red'))
const { attp6 } = require("./figs/attp6.js")
await attp6(texto).then(img => {
res.sendFile(img, { root: __dirname})
}).catch(e => {
return res.json({message: "Erro.. "+e})
console.log(e)
})
} catch (e) {
return res.json({message: "Erro.. "+e})
console.log(e)
}
})

app.get('/api/yt-search', async (req, res, next) =>  {
query = req.query.query
if(!query)return res.json({status:false, resultado:'Cade o parametro query??'  }) 
var apitoken = req.query.apitoken
if(key[key.map(i => i?.apitoken)?.indexOf(apitoken)]?.request <= 0) return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
if(!apitoken)return res.json({resultado:'Cade o parametro apitoken?'})
if(!key.map(i => i.apitoken)?.includes(apitoken))return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
await listkeys(apitoken, req);
var ITC = key.map(i => i?.apitoken)?.indexOf(apitoken);
console.log(color(' │ APITOKEN:'  + ` ${apitoken} • LIMITE: ${key[ITC]?.request}\n`,'red'),color('│','red'), color('REQUEST', 'red'), '• ' + color('PING: ' + ping(), 'red'))
try {
zan = await yts(query)
res.json({
status: true,
creator: `${criador}`,
Title: zan.all[0].title,
Thumb: zan.all[0].image,
Description : zan.all[0].description,
Duration: zan.all[0].timestamp,
Viewer: zan.all[0].views, 
Author : zan.all[0].author.name,
Channel : zan.all[0].author.name,
Link: zan.all[0].url,
})
} catch (err) {
res.json({resultado: `${msgerro}`})
};
})

app.get('/canvas/hackneon', async(req, res, next) => {
texto = req.query.texto;
var apitoken = req.query.apitoken
if(key[key.map(i => i?.apitoken)?.indexOf(apitoken)]?.request <= 0) return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
if(!apitoken)return res.json({resultado:'Cade o parametro apitoken?'})
if(!key.map(i => i.apitoken)?.includes(apitoken))return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
await listkeys(apitoken, req);
var ITC = key.map(i => i?.apitoken)?.indexOf(apitoken);
console.log(color(' │ APITOKEN:'  + ` ${apitoken} • LIMITE: ${key[ITC]?.request}\n`,'red'),color('│','red'), color('REQUEST', 'red'), '• ' + color('PING: ' + ping(), 'red'))
if(!texto) return res.json({resultado: "Cade o parametro texto"})
new Maker().Ephoto360("https://en.ephoto360.com/create-anonymous-hacker-avatars-cyan-neon-677.html", [`${texto}`])
.then((data) => { res.json({
status: true,
código: 200,
criador: `${criador}`,
resultado: data
})
}).catch(e => {
res.json({resultado: `${msgerro}`})
})
})

app.get('/canvas/fpsmascote', async(req, res, next) => {
texto = req.query.texto;
var apitoken = req.query.apitoken
if(key[key.map(i => i?.apitoken)?.indexOf(apitoken)]?.request <= 0) return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
if(!apitoken)return res.json({resultado:'Cade o parametro apitoken?'})
if(!key.map(i => i.apitoken)?.includes(apitoken))return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
await listkeys(apitoken, req);
var ITC = key.map(i => i?.apitoken)?.indexOf(apitoken);
console.log(color(' │ APITOKEN:'  + ` ${apitoken} • LIMITE: ${key[ITC]?.request}\n`,'red'),color('│','red'), color('REQUEST', 'red'), '• ' + color('PING: ' + ping(), 'red'))
if(!texto) return res.json({resultado: "Cade o parametro texto"})
new Maker().Ephoto360("https://en.ephoto360.com/free-gaming-logo-maker-for-fps-game-team-546.html", [`${texto}`])
.then((data) => { res.json({
status: true,
código: 200,
criador: `${criador}`,
resultado: data
})
}).catch(e => {
res.json({resultado: `${msgerro}`})
})
})

app.get('/canvas/angelwing', async(req, res, next) => {
texto = req.query.texto;
var apitoken = req.query.apitoken
if(key[key.map(i => i?.apitoken)?.indexOf(apitoken)]?.request <= 0) return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
if(!apitoken)return res.json({resultado:'Cade o parametro apitoken?'})
if(!key.map(i => i.apitoken)?.includes(apitoken))return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
await listkeys(apitoken, req);
var ITC = key.map(i => i?.apitoken)?.indexOf(apitoken);
console.log(color(' │ APITOKEN:'  + ` ${apitoken} • LIMITE: ${key[ITC]?.request}\n`,'red'),color('│','red'), color('REQUEST', 'red'), '• ' + color('PING: ' + ping(), 'red'))
if(!texto) return res.json({resultado: "Cade o parametro texto"})
new Maker().Ephoto360("https://en.ephoto360.com/create-colorful-angel-wing-avatars-731.html", [`${texto}`])
.then((data) => { res.json({
status: true,
código: 200,
criador: `${criador}`,
resultado: data
})
}).catch(e => {
res.json({resultado: `${msgerro}`})
})
})

app.get('/canvas/txtquadrinhos', async(req, res, next) => {
texto = req.query.texto;
var apitoken = req.query.apitoken
if(key[key.map(i => i?.apitoken)?.indexOf(apitoken)]?.request <= 0) return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
if(!apitoken)return res.json({resultado:'Cade o parametro apitoken?'})
if(!key.map(i => i.apitoken)?.includes(apitoken))return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
await listkeys(apitoken, req);
var ITC = key.map(i => i?.apitoken)?.indexOf(apitoken);
console.log(color(' │ APITOKEN:'  + ` ${apitoken} • LIMITE: ${key[ITC]?.request}\n`,'red'),color('│','red'), color('REQUEST', 'red'), '• ' + color('PING: ' + ping(), 'red'))
if(!texto) return res.json({resultado: "Cade o parametro texto"})
new Maker().Ephoto360("https://en.ephoto360.com/boom-text-comic-style-text-effect-675.html", [`${texto}`])
.then((data) => { res.json({
status: true,
código: 200,
criador: `${criador}`,
resultado: data
})
}).catch(e => {
res.json({resultado: `${msgerro}`})
})
})

app.get('/canvas/ffavatar', async(req, res, next) => {
texto = req.query.texto;
if(!texto) return res.json({resultado: "Cade o parametro texto"})
var apitoken = req.query.apitoken
if(key[key.map(i => i?.apitoken)?.indexOf(apitoken)]?.request <= 0) return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
if(!apitoken)return res.json({resultado:'Cade o parametro apitoken?'})
if(!key.map(i => i.apitoken)?.includes(apitoken))return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
await listkeys(apitoken, req);
var ITC = key.map(i => i?.apitoken)?.indexOf(apitoken);
console.log(color(' │ APITOKEN:'  + ` ${apitoken} • LIMITE: ${key[ITC]?.request}\n`,'red'),color('│','red'), color('REQUEST', 'red'), '• ' + color('PING: ' + ping(), 'red'))
new Maker().Ephoto360("https://en.ephoto360.com/create-free-fire-avatar-online-572.html", [`${texto}`])
.then((data) => { res.json({
status: true,
código: 200,
criador: `${criador}`,
resultado: data
})
}).catch(e => {
res.json({resultado: `${msgerro}`})
})
})

app.get('/canvas/ffbanner', async(req, res, next) => {
texto = req.query.texto;
texto2 = req.query.texto2;
if(!texto) return res.json({resultado: "Cade o parametro texto"})
if(!texto2) return res.json({resultado: "Cade o parametro texto2"})
var apitoken = req.query.apitoken
if(key[key.map(i => i?.apitoken)?.indexOf(apitoken)]?.request <= 0) return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
if(!apitoken)return res.json({resultado:'Cade o parametro apitoken?'})
if(!key.map(i => i.apitoken)?.includes(apitoken))return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
await listkeys(apitoken, req);
var ITC = key.map(i => i?.apitoken)?.indexOf(apitoken);
console.log(color(' │ APITOKEN:'  + ` ${apitoken} • LIMITE: ${key[ITC]?.request}\n`,'red'),color('│','red'), color('REQUEST', 'red'), '• ' + color('PING: ' + ping(), 'red'))
new Maker().Ephoto360("https://en.ephoto360.com/make-your-own-free-fire-youtube-banner-online-free-562.html", [`${texto}`, `${texto2}`])
.then((data) => { res.json({
status: true,
código: 200,
criador: `${criador}`,
resultado: data
})
}).catch(e => {
res.json({resultado: `${msgerro}`})
})
})

app.get('/canvas/gizquadro', async(req, res, next) => {
texto = req.query.texto;
var apitoken = req.query.apitoken
if(key[key.map(i => i?.apitoken)?.indexOf(apitoken)]?.request <= 0) return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
if(!apitoken)return res.json({resultado:'Cade o parametro apitoken?'})
if(!key.map(i => i.apitoken)?.includes(apitoken))return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
await listkeys(apitoken, req);
var ITC = key.map(i => i?.apitoken)?.indexOf(apitoken);
console.log(color(' │ APITOKEN:'  + ` ${apitoken} • LIMITE: ${key[ITC]?.request}\n`,'red'),color('│','red'), color('REQUEST', 'red'), '• ' + color('PING: ' + ping(), 'red'))
if(!texto) return res.json({resultado: "Cade o parametro texto"})
new Maker().Ephoto360("https://en.ephoto360.com/writing-chalk-on-the-blackboard-30.html", [`${texto}`])
.then((data) => { res.json({
status: true,
código: 200,
criador: `${criador}`,
resultado: data
})})
.catch((err) =>
console.log("ERROR"));
})

app.get('/canvas/blackpink', async(req, res, next) => {
texto = req.query.texto;
var apitoken = req.query.apitoken
if(key[key.map(i => i?.apitoken)?.indexOf(apitoken)]?.request <= 0) return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
if(!apitoken)return res.json({resultado:'Cade o parametro apitoken?'})
if(!key.map(i => i.apitoken)?.includes(apitoken))return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
await listkeys(apitoken, req);
var ITC = key.map(i => i?.apitoken)?.indexOf(apitoken);
console.log(color(' │ APITOKEN:'  + ` ${apitoken} • LIMITE: ${key[ITC]?.request}\n`,'red'),color('│','red'), color('REQUEST', 'red'), '• ' + color('PING: ' + ping(), 'red'))
if(!texto) return res.json({resultado: "Cade o parametro texto"})
new Maker().Ephoto360("https://en.ephoto360.com/create-a-blackpink-neon-logo-text-effect-online-710.html", [`${texto}`])
.then((data) => { res.json({
status: true,
código: 200,
criador: `${criador}`,
resultado: data
})})
.catch((err) =>
console.log("ERROR"));
})

app.get('/canvas/logogame', async(req, res, next) => {
texto = req.query.texto;
if(!texto) return res.json({resultado: "Cade o parametro texto"})
var apitoken = req.query.apitoken
if(key[key.map(i => i?.apitoken)?.indexOf(apitoken)]?.request <= 0) return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
if(!apitoken)return res.json({resultado:'Cade o parametro apitoken?'})
if(!key.map(i => i.apitoken)?.includes(apitoken))return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
await listkeys(apitoken, req);
var ITC = key.map(i => i?.apitoken)?.indexOf(apitoken);
console.log(color(' │ APITOKEN:'  + ` ${apitoken} • LIMITE: ${key[ITC]?.request}\n`,'red'),color('│','red'), color('REQUEST', 'red'), '• ' + color('PING: ' + ping(), 'red'))
new Maker().Ephoto360("https://en.ephoto360.com/create-logo-team-logo-gaming-assassin-style-574.html", [`${texto}`])
.then((data) => { res.json({
status: true,
código: 200,
criador: `${criador}`,
resultado: data
})})
.catch((err) =>
console.log("ERROR"));
})

app.get('/canvas/romantic', async(req, res, next) => {
texto = req.query.texto;
if(!texto) return res.json({resultado: "Cade o parametro texto"})
var apitoken = req.query.apitoken
if(key[key.map(i => i?.apitoken)?.indexOf(apitoken)]?.request <= 0) return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
if(!apitoken)return res.json({resultado:'Cade o parametro apitoken?'})
if(!key.map(i => i.apitoken)?.includes(apitoken))return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
await listkeys(apitoken, req);
var ITC = key.map(i => i?.apitoken)?.indexOf(apitoken);
console.log(color(' │ APITOKEN:'  + ` ${apitoken} • LIMITE: ${key[ITC]?.request}\n`,'red'),color('│','red'), color('REQUEST', 'red'), '• ' + color('PING: ' + ping(), 'red'))
new Maker().PhotoOxy("https://photooxy.com/logo-and-text-effects/romantic-messages-for-your-loved-one-391.html", [`${texto}`])
.then((data) => { res.json({
status: true,
código: 200,
criador: `${criador}`,
resultado: data
})})
.catch((err) =>
console.log("ERROR"));
})

app.get('/canvas/fire', async(req, res, next) => {
texto = req.query.texto;
var apitoken = req.query.apitoken
if(key[key.map(i => i?.apitoken)?.indexOf(apitoken)]?.request <= 0) return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
if(!apitoken)return res.json({resultado:'Cade o parametro apitoken?'})
if(!key.map(i => i.apitoken)?.includes(apitoken))return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
await listkeys(apitoken, req);
var ITC = key.map(i => i?.apitoken)?.indexOf(apitoken);
console.log(color(' │ APITOKEN:'  + ` ${apitoken} • LIMITE: ${key[ITC]?.request}\n`,'red'),color('│','red'), color('REQUEST', 'red'), '• ' + color('PING: ' + ping(), 'red'))
if(!texto) return res.json({resultado: "Cade o parametro texto"})
new Maker().PhotoOxy("https://photooxy.com/logo-and-text-effects/realistic-flaming-text-effect-online-197.html", [`${texto}`])
.then((data) => { res.json({
status: true,
código: 200,
criador: `${criador}`,
resultado: data
})})
.catch((err) =>
console.log("ERROR"));
})

app.get('/canvas/smoke', async(req, res, next) => {
texto = req.query.texto;
var apitoken = req.query.apitoken
if(key[key.map(i => i?.apitoken)?.indexOf(apitoken)]?.request <= 0) return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
if(!apitoken)return res.json({resultado:'Cade o parametro apitoken?'})
if(!key.map(i => i.apitoken)?.includes(apitoken))return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
await listkeys(apitoken, req);
var ITC = key.map(i => i?.apitoken)?.indexOf(apitoken);
console.log(color(' │ APITOKEN:'  + ` ${apitoken} • LIMITE: ${key[ITC]?.request}\n`,'red'),color('│','red'), color('REQUEST', 'red'), '• ' + color('PING: ' + ping(), 'red'))
if(!texto) return res.json({resultado: "Cade o parametro texto"})
new Maker().PhotoOxy("https://photooxy.com/other-design/create-an-easy-smoke-type-effect-390.html", [`${texto}`])
.then((data) => { res.json({
status: true,
código: 200,
criador: `${criador}`,
resultado: data
})})
.catch((err) =>
console.log("ERROR"));
})

app.get('/canvas/papel', async(req, res, next) => {
texto = req.query.texto;
var apitoken = req.query.apitoken
if(key[key.map(i => i?.apitoken)?.indexOf(apitoken)]?.request <= 0) return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
if(!apitoken)return res.json({resultado:'Cade o parametro apitoken?'})
if(!key.map(i => i.apitoken)?.includes(apitoken))return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
await listkeys(apitoken, req);
var ITC = key.map(i => i?.apitoken)?.indexOf(apitoken);
console.log(color(' │ APITOKEN:'  + ` ${apitoken} • LIMITE: ${key[ITC]?.request}\n`,'red'),color('│','red'), color('REQUEST', 'red'), '• ' + color('PING: ' + ping(), 'red'))
if(!texto) return res.json({resultado: "Cade o parametro texto"})
new Maker().PhotoOxy("https://photooxy.com/logo-and-text-effects/write-text-on-burn-paper-388.html", [`${texto}`])
.then((data) => { res.json({
status: true,
código: 200,
criador: `${criador}`,
resultado: data
})})
.catch((err) =>
console.log("ERROR"));
})

app.get('/canvas/narutologo', async(req, res, next) => {
texto = req.query.texto;
var apitoken = req.query.apitoken
if(key[key.map(i => i?.apitoken)?.indexOf(apitoken)]?.request <= 0) return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
if(!apitoken)return res.json({resultado:'Cade o parametro apitoken?'})
if(!key.map(i => i.apitoken)?.includes(apitoken))return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
await listkeys(apitoken, req);
var ITC = key.map(i => i?.apitoken)?.indexOf(apitoken);
console.log(color(' │ APITOKEN:'  + ` ${apitoken} • LIMITE: ${key[ITC]?.request}\n`,'red'),color('│','red'), color('REQUEST', 'red'), '• ' + color('PING: ' + ping(), 'red'))
if(!texto) return res.json({resultado: "Cade o parametro texto"})
new Maker().PhotoOxy("https://photooxy.com/manga-and-anime/make-naruto-banner-online-free-378.html", [`${texto}`])
.then((data) => { res.json({
status: true,
código: 200,
criador: `${criador}`,
resultado: data
})})
.catch((err) =>
console.log("ERROR"));
})

app.get('/canvas/lovemsg', async(req, res, next) => {
texto = req.query.texto;
var apitoken = req.query.apitoken
if(key[key.map(i => i?.apitoken)?.indexOf(apitoken)]?.request <= 0) return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
if(!apitoken)return res.json({resultado:'Cade o parametro apitoken?'})
if(!key.map(i => i.apitoken)?.includes(apitoken))return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
await listkeys(apitoken, req);
var ITC = key.map(i => i?.apitoken)?.indexOf(apitoken);
console.log(color(' │ APITOKEN:'  + ` ${apitoken} • LIMITE: ${key[ITC]?.request}\n`,'red'),color('│','red'), color('REQUEST', 'red'), '• ' + color('PING: ' + ping(), 'red'))
if(!texto) return res.json({resultado: "Cade o parametro texto"})
new Maker().PhotoOxy("https://photooxy.com/logo-and-text-effects/create-a-picture-of-love-resultado-377.html", [`${texto}`])
.then((data) => { res.json({
status: true,
código: 200,
criador: `${criador}`,
resultado: data
})})
.catch((err) =>
console.log("ERROR"));
})

app.get('/canvas/madeira', async(req, res, next) => {
texto = req.query.texto;
if(!texto) return res.json({resultado: "Cade o parametro texto"})
var apitoken = req.query.apitoken
if(key[key.map(i => i?.apitoken)?.indexOf(apitoken)]?.request <= 0) return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
if(!apitoken)return res.json({resultado:'Cade o parametro apitoken?'})
if(!key.map(i => i.apitoken)?.includes(apitoken))return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
await listkeys(apitoken, req);
var ITC = key.map(i => i?.apitoken)?.indexOf(apitoken);
console.log(color(' │ APITOKEN:'  + ` ${apitoken} • LIMITE: ${key[ITC]?.request}\n`,'red'),color('│','red'), color('REQUEST', 'red'), '• ' + color('PING: ' + ping(), 'red'))
new Maker().PhotoOxy("https://photooxy.com/logo-and-text-effects/carved-wood-effect-online-171.html", [`${texto}`])
.then((data) => { res.json({
status: true,
código: 200,
criador: `${criador}`,
resultado: data
})})
.catch((err) =>
console.log("ERROR"));
})

app.get('/canvas/gameplay', async(req, res, next) => {
texto = req.query.texto;
texto2 = req.query.texto2;
if(!texto) return res.json({resultado: "Cade o parametro texto"})
if(!texto2) return res.json({resultado: "Cade o parametro texto2"})
var apitoken = req.query.apitoken
if(key[key.map(i => i?.apitoken)?.indexOf(apitoken)]?.request <= 0) return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
if(!apitoken)return res.json({resultado:'Cade o parametro apitoken?'})
if(!key.map(i => i.apitoken)?.includes(apitoken))return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
await listkeys(apitoken, req);
var ITC = key.map(i => i?.apitoken)?.indexOf(apitoken);
console.log(color(' │ APITOKEN:'  + ` ${apitoken} • LIMITE: ${key[ITC]?.request}\n`,'red'),color('│','red'), color('REQUEST', 'red'), '• ' + color('PING: ' + ping(), 'red'))
new Maker().PhotoOxy("https://photooxy.com/logo-and-text-effects/8-bit-text-on-arcade-rift-175.html", [`${texto}`, `${texto2}`])
.then((data) => { res.json({
status: true,
código: 200,
criador: `${criador}`,
resultado: data
})})
.catch((err) =>
console.log("ERROR"));
})

app.get('/canvas/googlesg', async(req, res, next) => {
texto = req.query.texto;
texto2 = req.query.texto2;
texto3 = req.query.texto3;
if(!texto) return res.json({resultado: "Cade o parametro texto"})
if(!texto2) return res.json({resultado: "Cade o parametro texto2"})
if(!texto3) return res.json({resultado: "Cade o parametro texto3"})
var apitoken = req.query.apitoken
if(key[key.map(i => i?.apitoken)?.indexOf(apitoken)]?.request <= 0) return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
if(!apitoken)return res.json({resultado:'Cade o parametro apitoken?'})
if(!key.map(i => i.apitoken)?.includes(apitoken))return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
await listkeys(apitoken, req);
var ITC = key.map(i => i?.apitoken)?.indexOf(apitoken);
console.log(color(' │ APITOKEN:'  + ` ${apitoken} • LIMITE: ${key[ITC]?.request}\n`,'red'),color('│','red'), color('REQUEST', 'red'), '• ' + color('PING: ' + ping(), 'red'))
new Maker().PhotoOxy("https://photooxy.com/other-design/make-google-suggestion-photos-238.html", [`${texto}`, `${texto2}`, `${texto3}`])
.then((data) => { res.json({
status: true,
código: 200,
criador: `${criador}`,
resultado: data
})})
.catch((err) =>
console.log("ERROR"));
})

app.get('/canvas/neon2', async(req, res, next) => {
texto = req.query.texto;
if(!texto) return res.json({resultado: "Cade o parametro texto"})
var apitoken = req.query.apitoken
if(key[key.map(i => i?.apitoken)?.indexOf(apitoken)]?.request <= 0) return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
if(!apitoken)return res.json({resultado:'Cade o parametro apitoken?'})
if(!key.map(i => i.apitoken)?.includes(apitoken))return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
await listkeys(apitoken, req);
var ITC = key.map(i => i?.apitoken)?.indexOf(apitoken);
console.log(color(' │ APITOKEN:'  + ` ${apitoken} • LIMITE: ${key[ITC]?.request}\n`,'red'),color('│','red'), color('REQUEST', 'red'), '• ' + color('PING: ' + ping(), 'red'))
new Maker().PhotoOxy("https://photooxy.com/logo-and-text-effects/illuminated-metallic-effect-177.html", [`${texto}`])
.then((data) => { res.json({
status: true,
código: 200,
criador: `${criador}`,
resultado: data
})})
.catch((err) =>
console.log("ERROR"));
})

app.get('/canvas/lobometal', async(req, res, next) => {
texto = req.query.texto;
var apitoken = req.query.apitoken
if(key[key.map(i => i?.apitoken)?.indexOf(apitoken)]?.request <= 0) return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
if(!apitoken)return res.json({resultado:'Cade o parametro apitoken?'})
if(!key.map(i => i.apitoken)?.includes(apitoken))return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
await listkeys(apitoken, req);
var ITC = key.map(i => i?.apitoken)?.indexOf(apitoken);
console.log(color(' │ APITOKEN:'  + ` ${apitoken} • LIMITE: ${key[ITC]?.request}\n`,'red'),color('│','red'), color('REQUEST', 'red'), '• ' + color('PING: ' + ping(), 'red'))
if(!texto) return res.json({resultado: "Cade o parametro texto"})
new Maker().PhotoOxy("https://photooxy.com/logo-and-text-effects/create-a-wolf-metal-text-effect-365.html", [`${texto}`])
.then((data) => { res.json({
status: true,
código: 200,
criador: `${criador}`,
resultado: data
})})
.catch((err) =>
console.log("ERROR"));
})

app.get('/canvas/harryp', async(req, res, next) => {
texto = req.query.texto;
var apitoken = req.query.apitoken
if(key[key.map(i => i?.apitoken)?.indexOf(apitoken)]?.request <= 0) return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
if(!apitoken)return res.json({resultado:'Cade o parametro apitoken?'})
if(!key.map(i => i.apitoken)?.includes(apitoken))return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
await listkeys(apitoken, req);
var ITC = key.map(i => i?.apitoken)?.indexOf(apitoken);
console.log(color(' │ APITOKEN:'  + ` ${apitoken} • LIMITE: ${key[ITC]?.request}\n`,'red'),color('│','red'), color('REQUEST', 'red'), '• ' + color('PING: ' + ping(), 'red'))
if(!texto) return res.json({resultado: "Cade o parametro texto"})
new Maker().PhotoOxy("https://photooxy.com/logo-and-text-effects/create-harry-potter-text-on-horror-background-178.html", [`${texto}`])
.then((data) => { res.json({
status: true,
código: 200,
criador: `${criador}`,
resultado: data
})})
.catch((err) =>
console.log("ERROR"));
})

app.get('/canvas/shadow', async(req, res, next) => {
texto = req.query.texto;
var apitoken = req.query.apitoken
if(key[key.map(i => i?.apitoken)?.indexOf(apitoken)]?.request <= 0) return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
if(!apitoken)return res.json({resultado:'Cade o parametro apitoken?'})
if(!key.map(i => i.apitoken)?.includes(apitoken))return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
await listkeys(apitoken, req);
var ITC = key.map(i => i?.apitoken)?.indexOf(apitoken);
console.log(color(' │ APITOKEN:'  + ` ${apitoken} • LIMITE: ${key[ITC]?.request}\n`,'red'),color('│','red'), color('REQUEST', 'red'), '• ' + color('PING: ' + ping(), 'red'))
if(!texto) return res.json({resultado: "Cade o parametro texto"})
new Maker().PhotoOxy("https://photooxy.com/logo-and-text-effects/shadow-text-effect-in-the-sky-394.html", [`${texto}`])
.then((data) => { res.json({
status: true,
código: 200,
criador: `${criador}`,
resultado: data
})})
.catch((err) =>
console.log("ERROR"));
})

app.get('/canvas/cemiterio', async(req, res, next) => {
texto = req.query.texto;
var apitoken = req.query.apitoken
if(key[key.map(i => i?.apitoken)?.indexOf(apitoken)]?.request <= 0) return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
if(!apitoken)return res.json({resultado:'Cade o parametro apitoken?'})
if(!key.map(i => i.apitoken)?.includes(apitoken))return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
await listkeys(apitoken, req);
var ITC = key.map(i => i?.apitoken)?.indexOf(apitoken);
console.log(color(' │ APITOKEN:'  + ` ${apitoken} • LIMITE: ${key[ITC]?.request}\n`,'red'),color('│','red'), color('REQUEST', 'red'), '• ' + color('PING: ' + ping(), 'red'))
if(!texto) return res.json({resultado: "Cade o parametro texto"})
new Maker().PhotoOxy("https://photooxy.com/logo-and-text-effects/text-on-scary-cemetery-gate-172.html", [`${texto}`])
.then((data) => { res.json({
status: true,
código: 200,
criador: `${criador}`,
resultado: data
})})
.catch((err) =>
console.log("ERROR"));
})

app.get('/canvas/metalgold', async(req, res, next) => {
texto = req.query.texto;
var apitoken = req.query.apitoken
if(key[key.map(i => i?.apitoken)?.indexOf(apitoken)]?.request <= 0) return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
if(!apitoken)return res.json({resultado:'Cade o parametro apitoken?'})
if(!key.map(i => i.apitoken)?.includes(apitoken))return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
await listkeys(apitoken, req);
var ITC = key.map(i => i?.apitoken)?.indexOf(apitoken);
console.log(color(' │ APITOKEN:'  + ` ${apitoken} • LIMITE: ${key[ITC]?.request}\n`,'red'),color('│','red'), color('REQUEST', 'red'), '• ' + color('PING: ' + ping(), 'red'))
if(!texto) return res.json({resultado: "Cade o parametro texto"})
new Maker().PhotoOxy("https://photooxy.com/other-design/create-metallic-text-glow-online-188.html", [`${texto}`])
.then((data) => { res.json({
status: true,
código: 200,
criador: `${criador}`,
resultado: data
})})
.catch((err) =>
console.log("ERROR"));
})

app.get('/canvas/efeitoneon', async(req, res, next) => {
texto = req.query.texto;
var apitoken = req.query.apitoken
if(key[key.map(i => i?.apitoken)?.indexOf(apitoken)]?.request <= 0) return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
if(!apitoken)return res.json({resultado:'Cade o parametro apitoken?'})
if(!key.map(i => i.apitoken)?.includes(apitoken))return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
await listkeys(apitoken, req);
var ITC = key.map(i => i?.apitoken)?.indexOf(apitoken);
console.log(color(' │ APITOKEN:'  + ` ${apitoken} • LIMITE: ${key[ITC]?.request}\n`,'red'),color('│','red'), color('REQUEST', 'red'), '• ' + color('PING: ' + ping(), 'red'))
if(!texto) return res.json({resultado: "Cade o parametro texto"})
new Maker().PhotoOxy("https://photooxy.com/logo-and-text-effects/make-smoky-neon-glow-effect-343.html", [`${texto}`])
.then((data) => { res.json({
status: true,
código: 200,
criador: `${criador}`,
resultado: data
})})
.catch((err) =>
console.log("ERROR"));
})

app.get('/download/kwai', async(req, res, next) => {
var apitoken = req.query.apitoken
if(key[key.map(i => i?.apitoken)?.indexOf(apitoken)]?.request <= 0) return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
if(!apitoken)return res.json({resultado:'Cade o parametro apitoken?'})
if(!key.map(i => i.apitoken)?.includes(apitoken))return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
await listkeys(apitoken, req);
var ITC = key.map(i => i?.apitoken)?.indexOf(apitoken);
console.log(color(' │ APITOKEN:'  + ` ${apitoken} • LIMITE: ${key[ITC]?.request}\n`,'red'),color('│','red'), color('REQUEST', 'red'), '• ' + color('PING: ' + ping(), 'red'))
url = req.query.url
if (!url) return res.json({ status : false, criador : `${criador}`, resultado : "Coloque o parametro: url"})
kwaiDownload(url).then(hasil => {
res.json({
status: 200,
criador: `${criador}`,
resultado: hasil
})}).catch(e => {
res.json({
resultado: `${msgerro}`
})})})

app.get('/download/tiktok', async(req,res) => {
url = req.query.url
if(!url)return res.json({
status:false,
resultado:'Cadê o parâmetro: URL'
})
var apitoken = req.query.apitoken
if(key[key.map(i => i?.apitoken)?.indexOf(apitoken)]?.request <= 0) return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
if(!apitoken)return res.json({resultado:'Cade o parametro apitoken?'})
if(!key.map(i => i.apitoken)?.includes(apitoken))return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
await listkeys(apitoken, req);
var ITC = key.map(i => i?.apitoken)?.indexOf(apitoken);
console.log(color(' │ APITOKEN:'  + ` ${apitoken} • LIMITE: ${key[ITC]?.request}\n`,'red'),color('│','red'), color('REQUEST', 'red'), '• ' + color('PING: ' + ping(), 'red'))
try {
const { tiktok } = require('betabotz-tools') 

const apitk = await tiktok(url)
var results = apitk.result.data
res.json({
status:true,
criador: `${criador}`,
resultado: {
titulo: results.title,
cover: results.cover,
ai_dynamic_cover: results.ai_dynamic_cover,
origin_cover: results.origin_cover,
video: results.play,
videowm: results.wmplay,
audio: results.music
}
})
} catch (e) {
console.log(e)
res.json({
resultado: `${msgerro}`
})}
})

app.get('/sticker/emoji', async (req, res, next) => {
var apitoken = req.query.apitoken
if(key[key.map(i => i?.apitoken)?.indexOf(apitoken)]?.request <= 0) return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
if(!apitoken)return res.json({resultado:'Cade o parametro apitoken?'})
if(!key.map(i => i.apitoken)?.includes(apitoken))return res.sendFile(path.join(__dirname, "./public/", "limited.html"))
await listkeys(apitoken, req);
var ITC = key.map(i => i?.apitoken)?.indexOf(apitoken);
console.log(color(' │ APITOKEN:'  + ` ${apitoken} • LIMITE: ${key[ITC]?.request}\n`,'red'),color('│','red'), color('REQUEST', 'red'), '• ' + color('PING: ' + ping(), 'red'))
	if(key.includes(apitoken)){    
var rnd = Math.floor(Math.random() * 102)
    hasil = `https://raw.githubusercontent.com/Scheyot2/sakura-botv6/main/FIGURINHAS/Figurinha-emoji/${rnd}.webp`
	  data = await fetch(hasil).then(v => v.buffer())   
         await fs.writeFileSync('/tmp/stickera.webp', data)
        res.sendFile('/tmp/stickera.webp')
         } else {
  res.json({resultado: `${msgerro}`})
}    
})

//app.get('*', function(req, res) { res.sendFile(path.join(__dirname, "./public/", "notfound.html"))})

cron.schedule('0 0 * * *', () => {
const ceemde = JSON.parse(fs.readFileSync('./lib/secret/requests.json'))
ceemde[0].totalreqday = 0
fs.writeFileSync('./lib/secret/requests.json', JSON.stringify(ceemde))
}, {
  scheduled: true,
  timezone: 'America/Sao_Paulo' 
}); 


app.listen(PORT, () => {})
const banner = cfonts.render(("BASE|APIS"), {
font: "block",
align: "center",
gradient: ["magenta","red"]
}) 

console.log(banner.string)

let kuma = require.resolve(__filename)
fs.watchFile(kuma, () => {
fs.unwatchFile(kuma)
console.log(`ATUALIZANDO INDEX DA API`)
process.exit()
})


module.exports = router;