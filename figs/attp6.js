const fs = require("fs")
const ffmpeg = require("fluent-ffmpeg");
const uuid = require('uuid').v4;

function delFile(file) {
try { fs.unlinkSync(file) } catch (error) {}
}

const { UltimateTextToImage, registerFont } = require("ultimate-text-to-image");

const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;

ffmpeg.setFfmpegPath(ffmpegPath);

registerFont((__dirname + './jd_eugenia.ttf'), { family: 'jd_eugenia' });
let randomName = (ext) => uuid().split('-')[0] + (ext ? ext : '');

async function ttp(text, color = '#ffffff', name = randomName('.png')) {
new UltimateTextToImage(text, {
width: 500,
height: 500,
fontFamily: "jd_eugenia",
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

async function attp6(text) {
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
}

module.exports = {
attp6
}