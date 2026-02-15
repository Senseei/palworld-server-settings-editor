import { describe, it, expect } from 'vitest'
import { parse } from './IniParser.ts'
import { write } from '../writer/IniWriter.ts'

const SAMPLE_INI = `[/Script/Pal.PalGameWorldSettings]
OptionSettings=(Difficulty=None,DayTimeSpeedRate=1.000000,NightTimeSpeedRate=1.000000,ExpRate=1.000000,PalCaptureRate=1.000000,PalSpawnNumRate=1.000000,PalDamageRateAttack=1.000000,PalDamageRateDefense=1.000000,PlayerDamageRateAttack=1.000000,PlayerDamageRateDefense=1.000000,PlayerStomachDecreaceRate=1.000000,PlayerStaminaDecreaceRate=1.000000,PlayerAutoHPRegeneRate=1.000000,PlayerAutoHpRegeneRateInSleep=1.000000,PalStomachDecreaceRate=1.000000,PalStaminaDecreaceRate=1.000000,PalAutoHPRegeneRate=1.000000,PalAutoHpRegeneRateInSleep=1.000000,BuildObjectDamageRate=1.000000,BuildObjectHpRate=1.000000,CollectionDropRate=1.000000,CollectionObjectRespawnSpeedRate=1.000000,EnemyDropItemRate=1.000000,DeathPenalty=All,bEnablePlayerToPlayerDamage=False,bEnableFriendlyFire=False,bEnableInvaderEnemy=True,bActiveUNKO=False,bEnableAimAssistPad=True,bEnableAimAssistKeyboard=False,DropItemMaxNum=3000,DropItemMaxNum_UNKO=100,BaseCampMaxNum=128,BaseCampWorkerMaxNum=15,BaseCampMaxNumInGuild=4,DropItemAliveMaxHours=1.000000,bAutoResetGuildNoOnlinePlayers=False,AutoResetGuildTimeNoOnlinePlayers=72.000000,GuildPlayerMaxNum=20,PalEggDefaultHatchingTime=72.000000,WorkSpeedRate=1.000000,bIsMultiplay=False,bIsPvP=False,bCanPickupOtherGuildDeathPenaltyDrop=False,bEnableNonLoginPenalty=True,bEnableDefenseOtherGuildPlayer=True,CoopPlayerMaxNum=4,ServerPlayerMaxNum=32,ServerName="Default Palworld Server",ServerDescription="",AdminPassword="",ServerPassword="",PublicPort=8211,PublicIP="",RCONEnabled=False,RCONPort=25575,Region="",bUseAuth=True,BanListURL="https://api.palworldgame.com/api/banlist.txt",RESTAPIEnabled=False,RESTAPIPort=8212,bShowPlayerList=False,AllowConnectPlatform=Steam,bIsUseBackupSaveData=True,LogFormatType=Text,SupplyDropSpan=180,ItemWeightRate=1.000000,AutoSaveSpan=30)`

describe('IniParser', () => {
  it('parses all settings from the INI content', () => {
    const config = parse(SAMPLE_INI)
    expect(config.totalSettingsCount).toBeGreaterThan(0)
    expect(config.sectionHeader).toBe('[/Script/Pal.PalGameWorldSettings]')
  })

  it('correctly parses different value types', () => {
    const config = parse(SAMPLE_INI)

    // Boolean
    const bMulti = config.allValues.get('bIsMultiplay')
    expect(bMulti?.value).toBe(false)

    // Number (float)
    const expRate = config.allValues.get('ExpRate')
    expect(expRate?.value).toBe(1)
    expect(expRate?.formatHint.isDecimal).toBe(true)
    expect(expRate?.formatHint.decimalPlaces).toBe(6)

    // Number (integer)
    const port = config.allValues.get('PublicPort')
    expect(port?.value).toBe(8211)
    expect(port?.formatHint.isDecimal).toBe(false)

    // Quoted string
    const name = config.allValues.get('ServerName')
    expect(name?.value).toBe('Default Palworld Server')
    expect(name?.formatHint.isQuoted).toBe(true)

    // Unquoted string (enum)
    const diff = config.allValues.get('Difficulty')
    expect(diff?.value).toBe('None')
    expect(diff?.formatHint.isQuoted).toBe(false)

    // Select enum
    const death = config.allValues.get('DeathPenalty')
    expect(death?.value).toBe('All')
  })

  it('builds UI sections from metadata', () => {
    const config = parse(SAMPLE_INI)
    expect(config.sections.length).toBe(7)
    expect(config.sections[0].id).toBe('gameplay')
    expect(config.sections[0].fields.length).toBe(10)
  })
})

describe('Round-trip (parse → write)', () => {
  it('produces identical output when no edits are made', () => {
    const config = parse(SAMPLE_INI)
    const output = write(config)
    expect(output).toBe(SAMPLE_INI)
  })

  it('preserves format after modifying a float value', () => {
    let config = parse(SAMPLE_INI)
    const expRate = config.allValues.get('ExpRate')!
    const newValue = expRate.withValue(2)

    config = config.withUpdatedSetting('gameplay', 'ExpRate', newValue)
    const output = write(config)

    expect(output).toContain('ExpRate=2.000000')
    // All other values should be unchanged
    expect(output).toContain('DayTimeSpeedRate=1.000000')
    expect(output).toContain('ServerName="Default Palworld Server"')
  })

  it('preserves format after modifying a boolean value', () => {
    let config = parse(SAMPLE_INI)
    const bMulti = config.allValues.get('bIsMultiplay')!
    const newValue = bMulti.withValue(true)

    config = config.withUpdatedSetting('multiplayer', 'bIsMultiplay', newValue)
    const output = write(config)

    expect(output).toContain('bIsMultiplay=True')
  })

  it('preserves format after modifying a quoted string', () => {
    let config = parse(SAMPLE_INI)
    const name = config.allValues.get('ServerName')!
    const newValue = name.withValue('My Server')

    config = config.withUpdatedSetting('server', 'ServerName', newValue)
    const output = write(config)

    expect(output).toContain('ServerName="My Server"')
  })

  it('preserves format after modifying an integer value', () => {
    let config = parse(SAMPLE_INI)
    const port = config.allValues.get('PublicPort')!
    const newValue = port.withValue(9000)

    config = config.withUpdatedSetting('server', 'PublicPort', newValue)
    const output = write(config)

    expect(output).toContain('PublicPort=9000')
    // Ensure no decimal on integer
    expect(output).not.toContain('PublicPort=9000.')
  })

  it('preserves non-UI settings unchanged', () => {
    const config = parse(SAMPLE_INI)
    const output = write(config)

    // These keys are not in the UI but should be preserved exactly
    expect(output).toContain('bEnableInvaderEnemy=True')
    expect(output).toContain('bActiveUNKO=False')
    expect(output).toContain('DropItemMaxNum=3000')
    expect(output).toContain('RCONEnabled=False')
    expect(output).toContain('BanListURL="https://api.palworldgame.com/api/banlist.txt"')
  })
})
