'use strict';

var fs = require('fs');
var path = require('path');

var route = function route(req, res, next, abe) {
  if(req.query.active != null){
    var json = {}

    if (abe.config.localConfigExist()) {
      json = abe.config.getLocalConfig()
    }

    if(typeof json.deployers == 'undefined'){
      json.deployers = {sftp:{}}
    } else {
      json.deployers.sftp = {}
    }

    json.deployers.sftp = {
      active: req.query.active,
      host: req.query.host,
      username: req.query.username,
      remoteDir: req.query.algoliaremoteDir,
    }

    if(req.query.requiresPassword == 'true'){
      json.deployers.sftp.requiresPassword = true
      json.deployers.sftp.password = req.query.password
    } else {
      json.deployers.sftp.requiresPassword = false
    }

    if(req.query.requireSSHKey == 'true'){
      json.deployers.sftp.requireSSHKey = true
      json.deployers.sftp.sshKeyPath = req.query.sshKeyPath
    }

    abe.config.save(json)
    res.json({'ok': 'ok'})
    return;
  }

  var data = path.join(__dirname + '/../../partials/configuration.html')
  var html = abe.coreUtils.file.getContent(data);
  var template = abe.Handlebars.compile(html, {noEscape: true})
  var tmp = template({
    manager: {config: JSON.stringify(abe.config)},
    config: abe.config,
    user: res.user,
    isPageConfigSFTP: true
  })
  res.send(tmp);

  return 
}

exports.default = route