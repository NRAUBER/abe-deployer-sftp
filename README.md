# abe-deployer-sftp
An Abe deployer to sync your site in sftp or ftp

## Introduction
This plugin is a sftp-ftp deployer for your Abe blog. It relies on [node-ftps](https://github.com/Atinux/node-ftps).
Thanks to [Sébastien Chopin](https://github.com/Atinux/node-ftps)  
Everytime you'll publish/unpublish a content, your blog will be sync'ed with the remote directory.

## Installation

### 
You'll need [lftp](https://lftp.yar.ru/) executable on serverside.  
### Linux
```shell
sudo apt-get install lftp
# or
sudo yum install lftp
```
### OSX (Homebrew)
```shell
sudo brew install lftp
```
### Windows 
```shell
C:\> choco install lftp
```

### Plugin Installation
``` abe install abecms/abe-deployer-sftp```

## Configuration
In abe.json, just add ```sftp``` entry in "deployers" section:

### sftp config with ssh Key
```
"deployers": {
  	"sftp": {
    	"active": true,
    	"host": "yourserver",
    	"requiresPassword": false,
    	"username": "sftp user",
    	"requireSSHKey":  true,
    	"sshKeyPath": "/path/to/id_rsa_pub",
    	"remoteDir": "/path/to/your/abecms/site",
    	"protocol": "sftp"
  	}
}
```

### ftp config with username/password:
```
"deployers": {
    "sftp": {
      "active": true,
      "host": "yourserver",
      "requiresPassword": true,
      "username": "ftp user",
      "password":"Your_PaSSWoRD",
      "remoteDir": "/path/to/your/abecms/site",
      "protocol": "ftp"
    }
}
```

If you want to deactivate the plugin, set active as ```false.```
