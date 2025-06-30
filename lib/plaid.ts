import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';

const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID ||'675d6ff32fcdb1001a283694',
      'PLAID-SECRET': process.env.PLAID_SECRET || '2215bcfe1fc1af6a699fb899d2070e',
    }
  }
})

export const plaidClient = new PlaidApi(configuration);