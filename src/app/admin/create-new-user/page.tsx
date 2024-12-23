import AdminHeader from '~/app/admin/components/AdminHeader';
import AdminGuard from '~/app/admin/components/AdminGuard';
import { PageBody } from '~/core/ui/Page';

import CreateNewUserFormContainer from './components/CreateNewUserFormContainer';

import configuration from '~/configuration';

export const metadata = {
  title: `Create New User | ${configuration.site.siteName}`,
};

async function CreateNewUserPage() {
  return (
    <div className={'flex flex-1 flex-col'}>
      <AdminHeader>Create New User</AdminHeader>

      <PageBody>
        <CreateNewUserFormContainer />
      </PageBody>
    </div>
  );
}

export default AdminGuard(CreateNewUserPage);