cfg = {}
--[[ ###############################################################
### Copyright FiveM Brasil © - Todos os direitos reservados ###
##             BASE PROGRAMADA POR: SkipS#1234               ##
############################################################### ]]
cfg.distanceToVolume = 100.0 -- A distância que ficará com o volume em 1,0, então se o volume for 0,5 a distância será 15,0, se o volume for 0,2 a distância será 6. 
cfg.dlayToEveryone = true -- A música no carro será tocada para todos? Ou apenas para as pessoas que estão nesse veículo? Se false, o Distance Volume não fará nada
cfg.dommandVehicle = "som" 
cfg.permissao = "manager.permissao"
cfg.zones = {
	{
		name = "Mechanic Zone", 
		coords = vector3(-212.52,-1341.59,34.89), 
		job = "vip", 
		range = 30.0, 
		volume = 0.1, 
		deflink = "https://www.youtube.com/watch?v=Emap7LU6hYk&t",
		isplaying = true, 
		loop = false,
		deftime = 0, 
		changemusicblip = vector3(-212.53,-1341.61,34.89) 
	},
	{
		name = "Vanilla Zone",
		coords = vector3(116.57,-1287.63,28.27), 
		job = "Vanilla",
		range = 30.0,
		volume = 0.1, 
		deflink = "https://www.youtube.com/watch?v=W9iUh23Xrsg",
		isplaying = true, 
		loop = false,
		deftime = 0, 
		changemusicblip = vector3(120.54,-1281.46,29.49) 
	},
}



--[[ ###############################################################
### Copyright FiveM Brasil © - Todos os direitos reservados ###
##             BASE PROGRAMADA POR: SkipS#1234               ##
############################################################### ]]