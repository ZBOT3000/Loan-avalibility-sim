import InputField from '../common/InputField'

export default function PersonalInfo() {
  return (
<section className="max-w-md mx-auto flex flex-col gap-4">
  <h2 className="text-xl font-semibold tracking-wide text-center">
    Personal Info
  </h2>
  <InputField placeholder="Age" />
  <InputField placeholder="Employment Status" />
  <InputField placeholder="Employment Duration (months)" />
</section>

  )
}
