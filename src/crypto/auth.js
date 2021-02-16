const PeerId = require('peer-id')
var fs = require('fs');

module.exports = {
    async createPeerID () {
        const id = await PeerId.create({ bits: 1024, keyType: 'RSA' });
        console.log(JSON.stringify(id.toJSON(), null, 2))
        fs.writeFile('../../id.json', JSON.stringify(id), 'utf8',function (err) {
            if (err) throw err;
        });
        return id
    }
}