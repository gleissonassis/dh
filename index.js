const crypto = require('crypto')
const keccak256 = require('keccak256')
const eccrypto = require("eccrypto");

function showInfo(obj) {
  const publicKey = obj.getPublicKey();
  const ethPublicKey = keccak256(publicKey.slice(1)).slice(-20).toString('hex')

  console.log('Private Key: ', obj.getPrivateKey('hex'));
  console.log('Public Key:', publicKey.toString('hex'));
  console.log('ETH Public Key:', '0x' + ethPublicKey.toString('hex'));

  console.log();
  console.log();
}

//generating ETH Address
const eth = crypto.createECDH('secp256k1');
eth.generateKeys();
showInfo(eth);

const bob = crypto.createECDH('secp256k1');
bob.setPrivateKey(Buffer.from('0fff77f9ae7c1bf0352f0819a1167ec1e8bfd127aa25ad27395b22be07a8e8a4', 'hex'));
showInfo(bob);

const alice = crypto.createECDH('secp256k1');
alice.setPrivateKey(Buffer.from('782b1bc97ae586deb66ba97227fc651a4e0d361289f796f24f639a9cb2810d34', 'hex'));
showInfo(bob);

console.log('Secret Bob', bob.computeSecret(alice.getPublicKey()).toString('hex'));
console.log('Secret Alice', alice.computeSecret(bob.getPublicKey()).toString('hex'));
