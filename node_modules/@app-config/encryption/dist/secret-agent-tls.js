"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadOrCreateCert = exports.generateCert = void 0;
const settings_1 = require("@app-config/settings");
const logging_1 = require("@app-config/logging");
/* eslint-disable-next-line global-require */
const selfsigned = require('selfsigned');
async function generateCert(expireInDays = 365 * 10) {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + expireInDays - 2);
    expiry.setHours(0);
    expiry.setMinutes(0);
    expiry.setSeconds(0);
    expiry.setMilliseconds(0);
    logging_1.logger.info(`Creating a self-signed certificate that expires in ${expireInDays} days`);
    return new Promise((resolve, reject) => {
        selfsigned.generate([{ name: 'commonName', value: 'localhost' }], {
            days: expireInDays,
            algorithm: 'sha256',
            keySize: 2048,
            extensions: [
                {
                    name: 'keyUsage',
                    keyCertSign: true,
                    digitalSignature: true,
                    nonRepudiation: true,
                    keyEncipherment: true,
                    dataEncipherment: true,
                },
                {
                    name: 'extKeyUsage',
                    serverAuth: true,
                    clientAuth: true,
                    codeSigning: true,
                    timeStamping: true,
                },
                {
                    name: 'subjectAltName',
                    altNames: [
                        {
                            type: 2,
                            value: 'localhost',
                        },
                        {
                            type: 2,
                            value: 'localhost.localdomain',
                        },
                        {
                            type: 2,
                            value: '[::1]',
                        },
                        {
                            type: 7,
                            ip: '127.0.0.1',
                        },
                        {
                            type: 7,
                            ip: 'fe80::1',
                        },
                    ],
                },
            ],
        }, (err, pem) => {
            if (err)
                return reject(err);
            resolve({ key: pem.private, cert: pem.cert, expiry: expiry.toISOString() });
        });
    });
}
exports.generateCert = generateCert;
async function loadOrCreateCert() {
    const settings = await (0, settings_1.loadSettingsLazy)();
    if (settings.secretAgent) {
        // TODO: check expiry
        return settings.secretAgent;
    }
    const generated = await generateCert();
    await (0, settings_1.saveSettings)(Object.assign(Object.assign({}, settings), { secretAgent: Object.assign({}, generated) }));
    return generated;
}
exports.loadOrCreateCert = loadOrCreateCert;
//# sourceMappingURL=secret-agent-tls.js.map