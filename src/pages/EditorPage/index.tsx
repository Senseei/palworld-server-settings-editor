import { useSettings } from '@/hooks/useSettings.ts'
import { useFileHandler } from '@/hooks/useFileHandler.ts'
import { EditorLayout } from './layout.tsx'
import { Header } from './components/Header/index.tsx'
import { WelcomeScreen } from './components/WelcomeScreen/index.tsx'
import { SettingsTabs } from './components/SettingsTabs/index.tsx'
import { SettingsPanel } from './components/SettingsPanel/index.tsx'

export function EditorPage() {
  const { config, activeTab, setActiveTab, loadConfig, updateSetting, activeSection } = useSettings()
  const { parseError, handleFileUpload, handleDownload } = useFileHandler()

  const onUpload = () => {
    handleFileUpload(loadConfig)
  }

  return (
    <EditorLayout>
      <Header
        hasConfig={!!config}
        uiCount={config?.uiSettingsCount ?? 48}
        totalCount={config?.totalSettingsCount ?? 0}
        onUpload={onUpload}
        onSave={() => config && handleDownload(config)}
      />

      {parseError && (
        <div className="relative z-1 mb-4 p-4 bg-destructive/10 border border-destructive/30 rounded-xl text-destructive text-sm">
          Failed to parse file: {parseError}
        </div>
      )}

      {!config ? (
        <WelcomeScreen
          uiCount={48}
          onUpload={onUpload}
        />
      ) : (
        <>
          <SettingsTabs
            sections={config.sections}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
          {activeSection && (
            <SettingsPanel
              section={activeSection}
              onUpdateSetting={(key, value) => updateSetting(activeTab, key, value)}
            />
          )}
        </>
      )}
    </EditorLayout>
  )
}
