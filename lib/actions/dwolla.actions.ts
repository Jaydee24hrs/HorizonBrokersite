"use server";

import { Client } from "dwolla-v2";

const getEnvironment = (): "production" | "sandbox" => {
  const environment = process.env.DWOLLA_ENV || "sandbox" as string;

  switch (environment) {
    case "sandbox":
      return "sandbox";
    case "production":
      return "production";
    default:
      throw new Error(
        "Dwolla environment should either be set to `sandbox` or `production`"
      );
  }
};

const dwollaClient = new Client({
  environment: getEnvironment(),
  key: process.env.DWOLLA_KEY || 'WONzkXguLy3Y99mc731t6ihG18c6hnF6IxdhACbbyUqjBBJRVU' as string,
  secret: process.env.DWOLLA_SECRET || 'nA1yuxEWfVzTJ3VqH7zMnMiVrUDy0qusZCRkAfJLZFMDS7slj2' as string,
});

// Create a Dwolla Funding Source using a Plaid Processor Token
export const createFundingSource = async (
  options: CreateFundingSourceOptions
) => {
  try {
    return await dwollaClient
      .post(`customers/${options.customerId}/funding-sources`, {
        name: options.fundingSourceName,
        plaidToken: options.plaidToken,
      })
      .then((res) => res.headers.get("location"));
  } catch (err) {
    console.error("Creating a Funding Source Failed: ", err);
  }
};

export const createOnDemandAuthorization = async () => {
  try {
    const onDemandAuthorization = await dwollaClient.post(
      "on-demand-authorizations"
    );
    const authLink = onDemandAuthorization.body._links;
    return authLink;
  } catch (err) {
    console.error("Creating an On Demand Authorization Failed: ", err);
  }
};

// export const createDwollaCustomer = async (
//   newCustomer: NewDwollaCustomerParams
// ) => {
//   try {
//     return await dwollaClient
//       .post("customers", newCustomer)
//       .then((res) => res.headers.get("location"));
//   } catch (err) {
//     console.error("Creating a Dwolla Customer Failed: ", err);
//   }
// };

export const createDwollaCustomer = async ({
  email,
  firstName,
  lastName,
  type,
}: {
  email: string;
  firstName: string;
  lastName: string;
  type: "personal" | "business";
}): Promise<string> => {
  try {
    const res = await dwollaClient.post("customers", {
      firstName,
      lastName,
      email,
      type,
    });

    // ✅ New customer created successfully
    return res.headers.get("location")!;
  } catch (error: any) {
    // 🛑 Duplicate email
    const duplicate = error?.body?._embedded?.errors?.find(
      (err: any) => err.code === "Duplicate"
    );

    if (duplicate) {
      const existingUrl = duplicate._links?.about?.href;
      if (existingUrl) {
        console.warn("⚠️ Dwolla customer already exists. Using existing customer:", existingUrl);
        return existingUrl;
      }
    }

    // 🔴 Unexpected error
    console.error("❌ Creating a Dwolla Customer Failed: ", error);
    throw new Error("Error creating Dwolla customer");
  }
};


export const createTransfer = async ({
  sourceFundingSourceUrl,
  destinationFundingSourceUrl,
  amount,
}: TransferParams) => {
  try {
    const requestBody = {
      _links: {
        source: {
          href: sourceFundingSourceUrl,
        },
        destination: {
          href: destinationFundingSourceUrl,
        },
      },
      amount: {
        currency: "USD",
        value: amount,
      },
    };
    return await dwollaClient
      .post("transfers", requestBody)
      .then((res) => res.headers.get("location"));
  } catch (err) {
    console.error("Transfer fund failed: ", err);
  }
};

export const addFundingSource = async ({
  dwollaCustomerId,
  processorToken,
  bankName,
}: AddFundingSourceParams) => {
  try {
    // create dwolla auth link
    const dwollaAuthLinks = await createOnDemandAuthorization();

    // add funding source to the dwolla customer & get the funding source url
    const fundingSourceOptions = {
      customerId: dwollaCustomerId,
      fundingSourceName: bankName,
      plaidToken: processorToken,
      _links: dwollaAuthLinks,
    };
    return await createFundingSource(fundingSourceOptions);
  } catch (err) {
    console.error("Transfer fund failed: ", err);
  }
};