import axios from 'axios';

export async function getPharmacy(address: string) {
  const res = await axios.get<PharmacyProfile>(
    'https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByAddr/json',
  );
  return res.data;
}

export interface PharmacyProfile {
  address: string;
  count: number;
  stores: [];
}
