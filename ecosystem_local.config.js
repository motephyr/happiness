module.exports = {
  apps: [
    {
      name: 'happiness',
      script: 'ace',
      args: 'serve --watch',
      log_date_format: 'YYYY/MM/DD HH:mm:ss',
      ignore_watch : ["node_modules", "tmp/uploads"],
      env: {
        NODE_OPTIONS: '--inspect'
      }
    }
  ]
}
