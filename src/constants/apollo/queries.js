import gql from 'graphql-tag'

export const AccountCTokens = (walletAddress,symbol) => {
  const queryString = `{
    accountCTokens(where: {account: "${walletAddress.toLowerCase()}", symbol: "b${symbol}"}) {
      id
      symbol
      cTokenBalance
      enteredMarket
    }
  }`
  return gql(queryString)
}


export const Market = () => {
  const queryMarket = `{
    markets {
      id
      borrowRate
      supplyRate
      cash
      collateralFactor
      exchangeRate
      interestRateModelAddress
      name
      symbol
      totalBorrows
      totalSupply
      underlyingPriceUSD
    }
  }`
  return gql(queryMarket)
}


export const Account = (walletAddress) => {
  const queryAccount = `{
    account(id: "${walletAddress.toLowerCase()}") {
      id
      borrowRate
      supplyRate
      cash
      collateralFactor
      exchangeRate
      interestRateModelAddress
      name
      symbol
      totalBorrows
      totalSupply
      underlyingPriceUSD
    }
  }`
  return gql(queryAccount)
}
