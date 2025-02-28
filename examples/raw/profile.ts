import { Client } from '../../src';

const username = process.env.USERNAME as string;
const password = process.env.PASSWORD as string;

(async () => {
  const client = new Client();
  await client.login.userPass({ username, password });

  const peopleScroller = client.search.searchPeople({ keywords: 'Bill Gates' });
  const billGates = (await peopleScroller.scrollNext())[0];
  const fullProfile = await client.profile.getFullProfile({ publicIdentifier: billGates.profile.publicIdentifier });


  console.log(fullProfile);
})();
