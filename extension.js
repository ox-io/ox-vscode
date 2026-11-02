const { LanguageClient, TransportKind } = require("vscode-languageclient/node");
const vscode = require("vscode");

let client;

function activate(context) {
  const configuration = vscode.workspace.getConfiguration("ox");
  const command = configuration.get("server.path", "ox");
  const serverOptions = {
    run: { command, args: ["lsp"], transport: TransportKind.stdio },
    debug: { command, args: ["lsp"], transport: TransportKind.stdio },
  };
  client = new LanguageClient(
    "ox",
    "Ox Language Server",
    serverOptions,
    { documentSelector: [{ scheme: "file", language: "ox" }] },
  );
  context.subscriptions.push(client.start());
}

async function deactivate() {
  if (client) await client.stop();
}

module.exports = { activate, deactivate };
