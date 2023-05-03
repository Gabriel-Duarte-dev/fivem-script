fx_version 'cerulean'
games { 'gta5' }

ui_page 'nui/index.html'

client_scripts {
	'@vrp/lib/utils.lua',
  	'config.lua',
  	'client.lua',
}

files {
	'nui/index.html',
	'nui/scripts/script.js',
	'nui/assets/*.png',
	'nui/styles/main.css',
}

server_scripts {
	'@vrp/lib/utils.lua',
  	'config.lua',
  	'server.lua',
}