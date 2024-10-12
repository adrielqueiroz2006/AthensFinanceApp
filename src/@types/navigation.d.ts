export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      login: undefined
      home: undefined
      transactions: undefined
      createTransaction: { currentTab: TypeStyleProps }
      editTransaction: { exchange: ExchangeProps }
    }
  }
}
