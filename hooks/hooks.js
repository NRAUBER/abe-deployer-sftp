'use strict'
var path = require('path');
var FTPS = require('ftps');


var hooks = {
	afterPublish: function (result, postPath, abe) {
		if(abe.config.deployers && abe.config.deployers.sftp && abe.config.deployers.sftp.active === true){
			const sitePath = path.join(abe.config.root, abe.config.publish.url)

				var ftps = new FTPS({
					host: abe.config.deployers.sftp.host,
					requiresPassword: abe.config.deployers.sftp.requiresPassword,
					username: abe.config.deployers.sftp.username,
					password: abe.config.deployers.sftp.password,
					sshKeyPath: abe.config.deployers.sftp.sshKeyPath,
					remoteDir: abe.config.deployers.sftp.remoteDir,
					protocol: abe.config.deployers.sftp.protocol,
					requireSSHKey: abe.config.deployers.sftp.requireSSHKey,
					cwd: sitePath
				})

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
