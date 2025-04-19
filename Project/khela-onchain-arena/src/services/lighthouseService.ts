
import lighthouse from '@lighthouse-web3/sdk';

// API key is a public identifier - not a secret
const API_KEY = "Khela_Onchain_App_c0d5f1a";

export interface PublisherApplication {
  name: string;
  email: string;
  walletAddress: string;
  sportsFocus: string[];
  experience: string;
  sampleWork: string;
  reason: string;
  timestamp?: string;
}

/**
 * Uploads the publisher application to Filecoin via Lighthouse
 * @param application The publisher application data
 * @returns CID of the uploaded file
 */
export const uploadPublisherApplication = async (
  application: PublisherApplication
): Promise<string> => {
  try {
    // Convert application to JSON string
    const applicationJson = JSON.stringify(application);
    
    // Create a File object from the JSON string
    const applicationFile = new File(
      [applicationJson], 
      `publisher-application-${application.walletAddress}.json`,
      { type: 'application/json' }
    );

    // Upload to Lighthouse
    const response = await lighthouse.upload(
      [applicationFile],
      API_KEY
    );

    console.log('Lighthouse upload successful:', response);
    
    if (response.data && response.data.Hash) {
      return response.data.Hash;
    } else {
      throw new Error('Upload successful but CID not returned');
    }
  } catch (error) {
    console.error('Error uploading to Lighthouse:', error);
    throw error;
  }
};

/**
 * Stores the Filecoin deal status in localStorage for reference
 * @param cid Content ID from Lighthouse upload
 * @param status Status of the deal
 */
export const storeFilecoinDealStatus = (cid: string, status: string): void => {
  const filecoinDeals = JSON.parse(localStorage.getItem('filecoinDeals') || '{}');
  filecoinDeals[cid] = {
    status,
    timestamp: new Date().toISOString(),
  };
  localStorage.setItem('filecoinDeals', JSON.stringify(filecoinDeals));
};

/**
 * Gets all stored Filecoin deals from localStorage
 * @returns Record of CIDs and their status
 */
export const getFilecoinDeals = (): Record<string, { status: string; timestamp: string }> => {
  return JSON.parse(localStorage.getItem('filecoinDeals') || '{}');
};
