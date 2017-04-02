# abe-deployer-sftp
An Abe deployer to sync your site in sftp or ftp

## Introduction
This plugin is a sftp-ftp deployer for your Abe blog. It relies on [node-ftps](https://github.com/Atinux/node-ftps).
Thanks to [Sébastien Chopin](https://github.com/Atinux/node-ftps)

Everytime you'll publish/unpublish a content, your blog will be sync'ed with the remote directory.

## Configuration
In abe.json, you must have this entry:

```
"deployers": {
  	"sftp": {
    	"active": true,
    	"host": "yourserver",
    	"requiresPassword": false,
    	"username": "sftp user",
    	"sshKeyPath": "/path/to/id_rsa_pub",
    	"remoteDir": "/path/to/your/abecms/site",
    	"protocol": "sftp",
    	"requireSSHKey":  true
  	}
}
```
If you want to deactivate the sync, set active as ```false.```
