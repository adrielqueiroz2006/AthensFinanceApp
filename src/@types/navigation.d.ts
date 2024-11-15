export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      login: undefined
      home: undefined
      statement: undefined
      statementDownload: { statement: ExchangeProps[] }
      transactions: undefined
      createTransaction: { currentTab: TypeStyleProps }
      editTransaction: { exchange: ExchangeProps }
      payments: undefined
      createPayment: undefined
      editPayment: { payment: PaymentProps }
    }
  }
}
