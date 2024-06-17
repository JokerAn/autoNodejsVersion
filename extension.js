const { readFileSync } = require('fs');
const { join } = require('path');
const vscode = require('vscode');
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

function changeNodeVersion(terminal) {
	// 获取工作区目录
	if (!vscode.workspace.workspaceFolders) {
		return;
	}
	// 获取工作区目录路径
	console.log(vscode.workspace.workspaceFolders)
	const path = vscode.workspace.workspaceFolders[0].uri.fsPath;
	console.log(path);

	// 获取package.json
	const packageJsonFilePath = join(path, '/package.json');

	// 读取package.json
	let packageJsonString = readFileSync(
		packageJsonFilePath,
		'utf8'
	).toString();

	// 读取node版本号
	let packageJson = JSON.parse(packageJsonString)
	let { nodeVersion } = packageJson
	console.log(packageJson)
	console.log(nodeVersion)
	if (!nodeVersion) {
		// 读取package.json
		nodeVersion = readFileSync(
			join(path, '.nvmrc'),
			'utf8'
		).toString();
		console.log('nvm', nodeVersion)
	}
	if (nodeVersion) {
		terminal.sendText(`nvm use ${nodeVersion}`, true);
		// 获取当前node的版本
		terminal.sendText('node -v', true);
	}
}

function activate() {
	console.log('activate');
	// 监听终端打开事件
	// var terminal = vscode.window.createTerminal('zsh');
	// changeNodeVersion(terminal)
	vscode.window.onDidOpenTerminal((terminal) => {
		changeNodeVersion(terminal)
	});
}

// This method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
