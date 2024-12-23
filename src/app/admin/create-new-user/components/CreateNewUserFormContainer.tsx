'use client'

import { Section, SectionBody, SectionHeader } from "~/core/ui/Section";

import CreateNewUserForm from "./CreateNewUserForm";

function CreateNewUserFormContainer() {
  return (
    <div className={'flex flex-col space-y-8 lg:max-w-xl'}>
      <Section>
        <SectionHeader title={'User Details'} />
        
        <SectionBody>
          <CreateNewUserForm />
        </SectionBody>
      </Section>
    </div>
  );
}

export default CreateNewUserFormContainer;