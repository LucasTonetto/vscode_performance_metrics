// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const os = require('os');
const vscode = require('vscode');
const os_utils = require('node-os-utils');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	// console.log('Congratulations, your extension "process-healthy" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('performance-metrics.performance_metrics', async function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		// vscode.window.showInformationMessage('Hello World from Process Healthy!');
		
		const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
		statusBarItem.show();

		while(1) {
			const free_ram = os.freemem();
			const total_ram = os.totalmem();
			const free_ram_gb = (free_ram/(1024*1024*1024)).toFixed(2);
			const total_ram_gb = (total_ram/(1024*1024*1024)).toFixed(2);
			const cpu_usage = await cpuUsage();
			statusBarItem.text = `RAM: ${free_ram_gb}/${total_ram_gb} GB`;
			statusBarItem.text += `\tCPU: ${cpu_usage}%`;
			await new Promise(r => setTimeout(r, 1000));
		}
	});

	context.subscriptions.push(disposable);
}

async function cpuUsage() {
	return os_utils.cpu.usage();
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
