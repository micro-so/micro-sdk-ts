// Run only in a disposable workspace: this example creates a company and person.
import Micro from '../src/lib/simple';

async function main() {
  const { MICRO_API_KEY, MICRO_TEAM_ID, MICRO_BASE_URL } = process.env;
  if (!MICRO_API_KEY || !MICRO_TEAM_ID)
    throw new Error('Set MICRO_API_KEY and MICRO_TEAM_ID for a disposable workspace.');
  const micro = new Micro({
    apiKey: MICRO_API_KEY,
    teamID: MICRO_TEAM_ID,
    ...(MICRO_BASE_URL ? { baseURL: MICRO_BASE_URL } : {}),
  });
  const company = await micro.companies.create({
    name: 'SDK Example Company',
    primary_domain: 'example.com',
  });
  const person = await micro.people.create({
    full_name: 'Sam Example',
    email_addresses: ['sam@example.com'],
    company_ids: [company.id],
  });
  await micro.people.update(person.id, { title: 'Founder' });
  await micro.people.addEmails(person.id, ['sam.other@example.com']);
  const page = await micro.people.list({ where: { company_id: company.id } });
  if (!page.data.some((row) => row.id === person.id))
    throw new Error('Created person is missing from the company filter.');
  const retrieved = await micro.people.get(person.id);
  if (retrieved.title !== 'Founder' || retrieved.email_addresses.length !== 2)
    throw new Error('Profile did not round-trip.');
  console.log({ company_id: company.id, identity_id: person.id, person: retrieved });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
