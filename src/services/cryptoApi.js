import { createApi, fetchBaseQuery }  from '@reduxjs/toolkit/query/react';

const cryptoheaders =   {
    'X-RapidAPI-Key': '8b433c3fb4mshba8f57cd16c46b4p14317cjsn3ac2cd066941',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
}
const baseUrl = `https://coinranking1.p.rapidapi.com/`;

const createRequest = (url) => ({url, headers: cryptoheaders});

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({

        getCryptos: builder.query({
            query: (count) => createRequest(`/coins?limit=${count}`)
        }),

        getCryptoDetails: builder.query({
            query: (coinId) => createRequest(`/coin/${coinId}`)
        }),

        getCryptoHistory: builder.query({
            query: ({coinId, timePeriod}) => createRequest(`/coin/${coinId}/history?timeperiod=${timePeriod}`)
        })
    })
})

export const { useGetCryptosQuery , useGetCryptoDetailsQuery, useGetCryptoHistoryQuery} = cryptoApi;

// const options = {
//   method: 'GET',
//   url: 'https://coinranking1.p.rapidapi.com/coins',
//   params: {
//     referenceCurrencyUuid: 'yhjMzLPhuIDl',
//     timePeriod: '24h',
//     'tiers[0]': '1',
//     orderBy: 'marketCap',
//     orderDirection: 'desc',
//     limit: '50',
//     offset: '0'
//   },
//   headers: {
//     'X-RapidAPI-Key': '8b433c3fb4mshba8f57cd16c46b4p14317cjsn3ac2cd066941',
//     'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
//   }
// };

// try {
// 	const response = await axios.request(options);
// 	console.log(response.data);
// } catch (error) {
// 	console.error(error);
// }