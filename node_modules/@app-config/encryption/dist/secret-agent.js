"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAgentPortOrSocket = exports.shouldUseSecretAgent = exports.disconnectAgents = exports.connectAgentLazy = exports.connectAgent = exports.startAgent = void 0;
const https_1 = __importDefault(require("https"));
const ws_1 = __importDefault(require("ws"));
const ws_rpc_1 = require("@lcdev/ws-rpc");
const bson_1 = __importDefault(require("@lcdev/ws-rpc/bson"));
const core_1 = require("@app-config/core");
const logging_1 = require("@app-config/logging");
const settings_1 = require("@app-config/settings");
const encryption_1 = require("./encryption");
const secret_agent_tls_1 = require("./secret-agent-tls");
const common = (0, ws_rpc_1.build)(bson_1.default)
    .func()
    .func()
    .func();
async function startAgent(socketOrPortOverride, privateKeyOverride) {
    let privateKey;
    if (privateKeyOverride) {
        privateKey = privateKeyOverride;
    }
    else {
        privateKey = await (0, encryption_1.loadPrivateKeyLazy)();
    }
    const socketOrPort = await getAgentPortOrSocket(socketOrPortOverride);
    const server = common.server({
        async Ping() { },
        async Decrypt({ text, symmetricKey }) {
            logging_1.logger.verbose(`Decrypting a secret for a key rev:${symmetricKey.revision}`);
            const decoded = await (0, encryption_1.decryptValue)(text, await (0, encryption_1.decryptSymmetricKey)(symmetricKey, privateKey));
            return decoded;
        },
        async Encrypt({ value, symmetricKey }) {
            logging_1.logger.verbose(`Encrypting a secret value with key rev:${symmetricKey.revision}`);
            const encoded = await (0, encryption_1.encryptValue)(value, await (0, encryption_1.decryptSymmetricKey)(symmetricKey, privateKey));
            return encoded;
        },
    });
    if (typeof socketOrPort === 'number') {
        logging_1.logger.info(`Starting secret-agent, listening on port ${socketOrPort}`);
        const { cert, key } = await (0, secret_agent_tls_1.loadOrCreateCert)();
        const httpsServer = https_1.default.createServer({ cert, key });
        httpsServer.listen(socketOrPort);
        return server.listen(httpsServer);
    }
    logging_1.logger.info(`Starting secret-agent, listening on socket ${socketOrPort}`);
    return server.listen({ socket: socketOrPort });
}
exports.startAgent = startAgent;
async function connectAgent(closeTimeoutMs = Infinity, socketOrPortOverride, loadEncryptedKey = loadSymmetricKey) {
    let client;
    const socketOrPort = await getAgentPortOrSocket(socketOrPortOverride);
    if (typeof socketOrPort === 'number') {
        logging_1.logger.verbose(`Connecting to secret-agent on port ${socketOrPort}`);
        const { cert } = await (0, secret_agent_tls_1.loadOrCreateCert)();
        client = await common
            .client()
            .connect(new ws_1.default(`wss://localhost:${socketOrPort}`, { ca: [cert] }));
    }
    else {
        client = await common.client().connect(new ws_1.default(`ws+unix://${socketOrPort}`));
    }
    let isClosed = false;
    let closeTimeout;
    client.onClose(() => {
        isClosed = true;
    });
    const keepAlive = () => {
        if (closeTimeout)
            global.clearTimeout(closeTimeout);
        if (closeTimeoutMs === Infinity)
            return;
        closeTimeout = global.setTimeout(() => {
            logging_1.logger.verbose('Closing websocket');
            if (!isClosed) {
                client.close().finally(() => {
                    logging_1.logger.verbose('Client was closed');
                });
            }
        }, closeTimeoutMs);
    };
    return {
        close() {
            isClosed = true;
            return client.close();
        },
        isClosed() {
            return isClosed;
        },
        async ping() {
            keepAlive();
            await client.ping();
        },
        async decryptValue(text) {
            keepAlive();
            const revision = text.split(':')[1];
            const revisionNumber = parseFloat(revision);
            if (Number.isNaN(revisionNumber)) {
                throw new core_1.AppConfigError(`Encrypted value was invalid, revision was not a number (${revision})`);
            }
            const symmetricKey = await loadEncryptedKey(revisionNumber);
            const decrypted = await client.Decrypt({ text, symmetricKey });
            keepAlive();
            return decrypted;
        },
        async encryptValue(value, symmetricKey) {
            keepAlive();
            const encoded = await client.Encrypt({ value, symmetricKey });
            keepAlive();
            return encoded;
        },
    };
}
exports.connectAgent = connectAgent;
const clients = new Map();
async function connectAgentLazy(closeTimeoutMs = 500, socketOrPortOverride) {
    const socketOrPort = await getAgentPortOrSocket(socketOrPortOverride);
    if (!clients.has(socketOrPort)) {
        const connection = connectAgent(closeTimeoutMs, socketOrPort);
        clients.set(socketOrPort, connection);
        return connection;
    }
    const connection = await clients.get(socketOrPort);
    // re-connect
    if (connection.isClosed()) {
        clients.delete(socketOrPort);
        return connectAgentLazy(closeTimeoutMs, socketOrPort);
    }
    return connection;
}
exports.connectAgentLazy = connectAgentLazy;
async function disconnectAgents() {
    for (const [port, client] of clients.entries()) {
        clients.delete(port);
        await client.then((c) => c.close(), () => { });
    }
}
exports.disconnectAgents = disconnectAgents;
let useSecretAgent = true;
function shouldUseSecretAgent(value) {
    if (value !== undefined) {
        useSecretAgent = value;
    }
    return useSecretAgent;
}
exports.shouldUseSecretAgent = shouldUseSecretAgent;
const defaultPort = 42938;
async function getAgentPortOrSocket(socketOrPortOverride) {
    var _a, _b;
    if (socketOrPortOverride !== undefined) {
        return socketOrPortOverride;
    }
    const settings = await (0, settings_1.loadSettingsLazy)();
    if ((_a = settings.secretAgent) === null || _a === void 0 ? void 0 : _a.socket) {
        return settings.secretAgent.socket;
    }
    if ((_b = settings.secretAgent) === null || _b === void 0 ? void 0 : _b.port) {
        return settings.secretAgent.port;
    }
    if (settings.secretAgent) {
        await (0, settings_1.saveSettings)(Object.assign(Object.assign({}, settings), { secretAgent: Object.assign(Object.assign({}, settings.secretAgent), { port: defaultPort }) }));
    }
    return defaultPort;
}
exports.getAgentPortOrSocket = getAgentPortOrSocket;
async function loadSymmetricKey(revision) {
    const symmetricKeys = await (0, encryption_1.loadSymmetricKeys)(true);
    const symmetricKey = symmetricKeys.find((k) => k.revision === revision);
    if (!symmetricKey)
        throw new core_1.AppConfigError(`Could not find symmetric key ${revision}`);
    return symmetricKey;
}
//# sourceMappingURL=secret-agent.js.map