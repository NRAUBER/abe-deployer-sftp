'use strict'
var path = require('path');
var FTPS = require('ftps');


var hooks = {
	afterPublish: function (result, postPath, abe) {
		if(abe.config.deployers && abe.config.deployers.sftp && abe.config.deployers.sftp.active === true){
			const sitePath = path.join(abe.config.root, abe.config.publish.url)

				var config = {
					host: abe.config.deployers.sftp.host,
					requiresPassword: abe.config.deployers.sftp.requiresPassword,
					username: abe.config.deployers.sftp.username,
					password: abe.config.deployers.sftp.password,
					remoteDir: abe.config.deployers.sftp.remoteDir,
					protocol: abe.config.deployers.sftp.protocol,
					cwd: sitePath
				}
				if (typeof abe.config.deployers.sftp.port !== 'undefined') {
					config.port = abe.config.deployers.sftp.port
				}

				if (typeof abe.config.deployers.sftp.requireSSHKey !== 'undefined') {
					config.requireSSHKey = abe.config.deployers.sftp.requireSSHKey
				}

				if (typeof abe.config.deployers.sftp.sshKeyPath !== 'undefined') {
					config.sshKeyPath = abe.config.deployers.sftp.sshKeyPath
				}

				var ftps = new FTPS(config)

				ftps.mirror({
					remoteDir: abe.config.deployers.sftp.remoteDir,
					localDir: '.',
					parallel: true,
					upload: true,
					options: '--delete'
				})

				ftps.exec(function (err, res) {
					console.log (err)
					//console.log (res)
				});
	    }
	},

	afterUnpublish: function (pathJson ,pathFile, postPath, abe) {
		if(abe.config.deployers && abe.config.deployers.sftp && abe.config.deployers.sftp.active){
			const sitePath = path.join(abe.config.root, abe.config.publish.url)

				var config = {
					host: abe.config.deployers.sftp.host,
					requiresPassword: abe.config.deployers.sftp.requiresPassword,
					username: abe.config.deployers.sftp.username,
					password: abe.config.deployers.sftp.password,
					sshKeyPath: abe.config.deployers.sftp.sshKeyPath,
					remoteDir: abe.config.deployers.sftp.remoteDir,
					protocol: abe.config.deployers.sftp.protocol,
					requireSSHKey: abe.config.deployers.sftp.requireSSHKey,
					cwd: sitePath
				}
				if (typeof abe.config.deployers.sftp.port !== 'undefined') {
					config.port = abe.config.deployers.sftp.port
				}

				var ftps = new FTPS(config)

				ftps.mirror({
					remoteDir: abe.config.deployers.sftp.remoteDir,
					localDir: '.',
					parallel: true,
					upload: true,
					options: '--delete'
				})

				ftps.exec(function (err, res) {
					console.log (err)
					//console.log (res)
				});
	    }
	}
}
exports.default = hooks;
