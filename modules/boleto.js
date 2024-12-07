// modules/boleto.js

const { Boleto } = require('node-boleto');

async function gerarBoletoHTML() {
  const boleto = new Boleto({
    'banco': 'santander',
    'data_emissao': new Date(),
    'data_vencimento': new Date(new Date().getTime() + 5 * 24 * 3600 * 1000),
    'valor': 1500,
    'nosso_numero': '1234567',
    'numero_documento': '123123',
    'cedente': 'Pagar.me Pagamentos S/A',
    'cedente_cnpj': '18727053000174',
    'agencia': '3978',
    'codigo_cedente': '6404154',
    'carteira': '102'
  });

  Boleto.barcodeRenderEngine = 'bmp';

  return new Promise((resolve, reject) => {
    boleto.renderHTML((html) => {
      if (html) {
        resolve(html);
      } else {
        reject(new Error('Erro ao gerar HTML do boleto'));
      }
    });
  });
}

module.exports = { gerarBoletoHTML };