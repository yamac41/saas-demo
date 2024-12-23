import { Database } from '~/database.types';
import { SupabaseClient } from '@supabase/supabase-js';

import {
  ORGANIZATIONS_TABLE,
} from '~/lib/db-tables';

import getLogger from '~/core/logger';

/**
 * Creates an organization.
 *
 * Validation must be done before calling this function.
 * 
 * @param {SupabaseClient<Database>} client - The Supabase client instance.
 * @param {Object} params - The parameters for creating the organization.
 *
 *
 * @throws {Error} If there was an error creating the organization.
 **/

export default async function createOrganization(
  client: SupabaseClient<Database>,
  params: {
    organizationName: string;
    organizationAddress: string;
  },
) {
  const logger = getLogger();
  const { organizationName, organizationAddress } = params;

  const { data: organization, error } = await client
    .from(ORGANIZATIONS_TABLE)
    .insert({
      name: organizationName,
      address: organizationAddress,
    })
    .select('id')
    .throwOnError()
    .single();

  if (error) {
    logger.info(
      error.message,
      `Error creating organization`,
    );

    throw new Error(error.message);
  }

  logger.info(params, `Organization created successfully`);

  return organization;
}