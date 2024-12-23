import type { SupabaseClient } from "@supabase/supabase-js";

import getLogger from "~/core/logger";

import { MEMBERSHIPS_TABLE, USERS_TABLE, ORGANIZATIONS_TABLE } from "~/lib/db-tables";
import MembershipRole from "~/lib/organizations/types/membership-role";
import type { Database } from "~/database.types";
import type NewUserData from "~/core/session/types/new-user-data";
import createOrganization from "~/lib/server/organizations/create-organization";

type Params = {
  client: SupabaseClient<Database>;
  userData: NewUserData;
};

/**
 * Create a new user
 * Create a new user and a new organization, set the user as owner of the organization
 * @param {Params} params -  The parameters for creating a new user
 */

export async function createNewUser(params: Params) {
  const { client, userData } = params;
  const logger = getLogger();

  logger.info("SignUp new user");

  const { data: sameOrganization } = await client
    .from(ORGANIZATIONS_TABLE)
    .select(`id`)
    .eq('name', userData.organizationName);

  console.log("organization=> ", sameOrganization);

  if (sameOrganization?.length) {
    logger.info(`Organization with the given name already exists`);

    throw new Error('Organization with the given name already exists');
  }

  const { data: authUser, error: authError } = await client.auth.admin.createUser({
    email: userData.email,
    password: userData.password,
    email_confirm: true
  });

  if (authError) {
    logger.info(authError.message, "Error SignUp new user");
    throw new Error(authError.message);
  }

  const userId = authUser.user!.id;

  const { error: userError } = await client.from(USERS_TABLE).insert({
    id: userId,
    display_name: `${userData.firstName} ${userData.lastName}`,
    onboarded: true,
  });

  if (userError) {
    logger.info(userError.message, "Error SignUp new user");
    throw new Error(userError.message);
  }

  logger.info("User created");

  const organization = await createOrganization(client, {
    organizationName: userData.organizationName,
    organizationAddress: userData.organizationAddress,
  });

  logger.info("Setting user as owner of organization");

  const { error: membershipError } = await client
    .from(MEMBERSHIPS_TABLE)
    .insert({
      user_id: userId,
      organization_id: organization.id,
      role: MembershipRole.Owner,
    });

  if (membershipError) {
    logger.info(membershipError.message, "Setting user as owner of organization");
    throw new Error(membershipError.message);
  }
}