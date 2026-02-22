import InputField from '../common/InputField';
import SelectField from '../common/SelectField';
import type { ChangeEvent } from 'react';
import type { EmploymentStatus } from '../../types/loanSim.types';
import type { PersonalInfoType } from './loanForm.types';

export default function PersonalInfo({
    personalInfo,
    setPersonalInfo,
  }: {
    personalInfo: PersonalInfoType;
    setPersonalInfo: (personalInfo: PersonalInfoType) => void;
  }) {
  const employmentStatusOptions: {
    value: EmploymentStatus;
    label: string;
  }[] = [
    { value: 'employed', label: 'Employed' },
    { value: 'self_employed', label: 'Self Employed' },
    { value: 'unemployed', label: 'Unemployed' },
    { value: 'student', label: 'Student' },
  ];

  return (
    <section className="max-w-md mx-auto flex flex-col gap-4">
      <h2 className="text-xl font-semibold tracking-wide text-center">
        Personal Information
      </h2>
      <InputField 
      placeholder="Age" 
      value={personalInfo.age}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        const v = e.target.value;
        if (v === '' || !isNaN(Number(v))) 
        setPersonalInfo({ ...personalInfo, age: v === '' ? '' : Number(v) })}}
        />
      <SelectField
        label="Employment Status"
        value={personalInfo.employmentStatus}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => setPersonalInfo({ ...personalInfo, employmentStatus: e.target.value as EmploymentStatus })}
        options={employmentStatusOptions}
      />

      <InputField
        placeholder="Employment Duration (in months)"
        value={personalInfo.employmentDuration}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const v = e.target.value;
            if (v === '' || !isNaN(Number(v))) 
            setPersonalInfo({ ...personalInfo, employmentDuration: v === '' ? '' : Number(v) })}}
      />
    </section>
  );
}
