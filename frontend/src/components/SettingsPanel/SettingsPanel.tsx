import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import useMenuSelectorStore from "state/menuSelectorStore"
import useColorThemeQuery from "hooks/misc/useColorThemeQuery"
import Button from "components/ui/Button"
import Input, { InputType } from "components/ui/Input"
import useSettingsParamsStore, {
  SettingsParams,
  settingsParamsSchema,
} from "state/settingsParamsStore"

function useFormStyle() {
  const backgroundStyle: React.CSSProperties = {
    backgroundColor: useColorThemeQuery().dark,
  }

  const settingsSectionStyle = {
    backgroundColor: useColorThemeQuery().light,
    color: useColorThemeQuery().ultralight,
  }

  return { backgroundStyle, settingsSectionStyle }
}

export default function SettingsPanel() {
  const settingsStore = useSettingsParamsStore()
  const menuSelectorStore = useMenuSelectorStore()

  const form = useForm<SettingsParams>({
    defaultValues: settingsStore.state,
    resolver: zodResolver(settingsParamsSchema),
  })

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = form

  const onSubmit: SubmitHandler<SettingsParams> = (data) => {
    settingsStore.setSettings(data)
    menuSelectorStore.setIsSettingsOpen(false)
  }

  const onCancel = () => {
    menuSelectorStore.setIsSettingsOpen(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="settings-pnl" style={useFormStyle().backgroundStyle}>
        <section style={useFormStyle().settingsSectionStyle}>
          <div>
            <Input
              label="refetchIntervals.playback"
              text="Playback refetch interval (ms)"
              type={InputType.number}
              register={register}
              errors={errors.refetchIntervals?.playback}
            />
            <Input
              label="refetchIntervals.queue"
              text="Queue refetch interval (ms)"
              type={InputType.number}
              register={register}
              errors={errors.refetchIntervals?.queue}
            />
            <Input
              label="refetchIntervals.like"
              text="Like refetch interval (ms)"
              type={InputType.number}
              register={register}
              errors={errors.refetchIntervals?.like}
            />
            <Input
              label="options.allowQueueNavigation"
              text="Allow queue navigation"
              type={InputType.checkbox}
              register={register}
              errors={errors.options?.allowQueueNavigation}
            />
            <Input
              label="options.allowSpotifyWebApi"
              text="Allow fetching from API"
              type={InputType.checkbox}
              register={register}
              errors={errors.options?.allowQueueNavigation}
            />
            <Input
              label="options.allowSpotifyDesktop"
              text="Allow fetching from desktop app"
              type={InputType.checkbox}
              register={register}
              errors={errors.options?.allowQueueNavigation}
            />
          </div>
        </section>
        <div className="settings-btn-group">
          <Button
            svgIcon="/images/cancel.svg"
            id="cancel"
            onClick={onCancel}
            type="reset"
          />
          <Button
            svgIcon="/images/save.svg"
            id="save"
            onClick={handleSubmit}
            type="submit"
            disabled={isSubmitting}
          />
        </div>
      </div>
    </form>
  )
}
