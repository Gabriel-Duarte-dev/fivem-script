local Proxy = module("vrp","lib/Proxy")
local Tunnel = module("vrp","lib/Tunnel")
local vRP = Proxy.getInterface("vRP")
local xSound = exports.xsound

src = {}
Tunnel.bindInterface(GetCurrentResourceName(), src)

RegisterCommand(cfg.dommandVehicle, function(source,args,rawCommand)
	local user_id = vRP.getUserId(source)
	if user_id then
		if vRP.hasPermission(user_id, cfg.permissao) then
			TriggerClientEvent("sks_spotify:ShowNui",source)
		end
	end
end)

function src.GetMusic()
	return cfg.zones
end
--[[ ###############################################################
### Copyright FiveM Brasil © - Todos os direitos reservados ###
##             BASE PROGRAMADA POR: SkipS#1234               ##
############################################################### ]]

RegisterNetEvent("sks_spotify:ChangeVolume")
AddEventHandler("sks_spotify:ChangeVolume", function(vol, nome)
    local somafter = false
    local rangeafter = false
    for i = 1, #cfg.zones do
        local v = cfg.zones[i]
        if nome == v.name then
            local vadi = v.volume + vol
            if vadi <= 1.01 and vadi >= -0.001 then
				if vadi < 0.005 then
					vadi = 0.0
				end
                if v.popo then
                    v.range = (v.volume*cfg.distanceToVolume)
                else
					if vadi >= 0.05 then
						v.range = (vadi*v.range)/v.volume
					end
                end
                v.volume = vadi
                somafter = v.volume
                rangeafter = v.range
            end
        end
    end
    if somafter and rangeafter then
        TriggerClientEvent("sks_spotify:ChangeVolume",-1,somafter,rangeafter, nome)
    end
end)

RegisterNetEvent("sks_spotify:ChangeLoop")
AddEventHandler("sks_spotify:ChangeLoop", function(nome,tip)
	local loopstate
	for i = 1, #cfg.zones do
		local v = cfg.zones[i]
		if nome == v.name then
			v.loop = tip
			loopstate = v.loop
		end
	end
	if loopstate ~= nil then
		TriggerClientEvent("sks_spotify:ChangeLoop",-1,loopstate, nome)
	end
end)

--[[ ###############################################################
### Copyright FiveM Brasil © - Todos os direitos reservados ###
##             BASE PROGRAMADA POR: SkipS#1234               ##
############################################################### ]]

RegisterNetEvent("sks_spotify:ChangeState")
AddEventHandler("sks_spotify:ChangeState", function(type, nome)
	for i = 1, #cfg.zones do
		local v = cfg.zones[i]
		if nome == v.name then
			v.isplaying = type
		end
	end
	TriggerClientEvent("sks_spotify:ChangeState",-1,type, nome)
end)

RegisterNetEvent("sks_spotify:ChangePosition")
AddEventHandler("sks_spotify:ChangePosition", function(quanti, nome)
	for i = 1, #cfg.zones do
		local v = cfg.zones[i]
		if nome == v.name then
			v.deftime = v.deftime+quanti
			if v.deftime < 0 then
				v.deftime = 0
			end
		end
	end
	TriggerClientEvent("sks_spotify:ChangePosition",-1,quanti, nome)
end)

RegisterNetEvent("sks_spotify:ModifyURL")
AddEventHandler("sks_spotify:ModifyURL", function(data)
	local _data = data
	local zena = false
	for i = 1, #cfg.zones do
		local v = cfg.zones[i]
		if _data.name == v.name then
			v.deflink = _data.link
			if _data.popo then
				v.popo = _data.popo
			end
			v.deftime = 0
			v.isplaying = true
			v.loop = _data.loop
			zena = v
		end
	end
	if zena then
		TriggerClientEvent("sks_spotify:ModifyURL",-1,zena)
	end
end)

function countTime()
    SetTimeout(1000, countTime)
    for i = 1, #cfg.zones do
		local v = cfg.zones[i]
        if v.isplaying then
            v.deftime = v.deftime + 1
        end
    end
end

--[[ ###############################################################
### Copyright FiveM Brasil © - Todos os direitos reservados ###
##             BASE PROGRAMADA POR: SkipS#1234               ##
############################################################### ]]

SetTimeout(1000, countTime)

RegisterNetEvent('sks_spotify:AddVehicle')
AddEventHandler("sks_spotify:AddVehicle", function(vehdata)
    local Data = {}
    Data.name = vehdata.plate
    Data.coords = vehdata.coords
    Data.range = vehdata.volume * cfg.distanceToVolume
    Data.volume = vehdata.volume
    Data.deflink = vehdata.link
    Data.isplaying = true
    Data.loop = vehdata.loop
    Data.deftime = 0
    Data.popo = vehdata.popo
    table.insert(cfg.zones, Data)
    TriggerClientEvent('sks_spotify:AddVehicle', math.floor(-1), cfg.zones[#cfg.zones])
end)

RegisterNetEvent('sks_spotify:GetDate')
AddEventHandler('sks_spotify:GetDate', function()
    TriggerClientEvent('sks_spotify:SendData', math.floor(-1), cfg.zones)
end)

--[[ ###############################################################
### Copyright FiveM Brasil © - Todos os direitos reservados ###
##             BASE PROGRAMADA POR: SkipS#1234               ##
############################################################### ]]