import { Factory } from "fishery";
import { Authorization } from "../models";

export default Factory.define<Authorization>(({ sequence, params }) => {
  return {
    permissions: [
      "MD_CanViewContractorDashboard",
      "MD_CanViewSponsorDashboard",
      "MD_CanViewSponsorReports",
      "MD_CanViewSponsorLoanCodesAndFees",
      "MD_CanViewContractorReports",
      "MD_CanViewContractorLoanCodesAndFees",
      "MD_CanWithdrawLoan",
      "MD_CanViewContractorFilter",
      "MA_CanViewUserInfo",
      "MD_CanViewLoanSummaries",
      "MD_CanExportCSV",
      "MD_CanViewSettings",
      "MD_CanViewFundingRequestsById",
      "MD_CanViewLoanHistory",
      "MD_CanViewLoanDetails",
      "MD_CanSubmitCreateFundingRequests",
      "MD_CanSubmitCancelFundingDisbursementRequests",
      "MD_CanViewCloseCreditLines",
      "MD_CanViewCreateFundingRequests",
      "MD_CanViewLoanSummariesById",
      "MD_CanSubmitUpdateCreditLineAmounts",
      "MD_CanSubmitUpdateEstimatedLoanAmounts",
      "MD_CanUpdateLoans",
      "MD_CanViewRequestSendDocuments",
      "MD_CanViewUpdateCreditLineAmounts",
      "MD_CanViewUpdateEstimatedLoanAmounts",
      "MD_CanViewWithdrawApplications",
      "MD_CanSubmitRequestSendDocuments",
      "MD_CanSubmitWithdrawApplications",
      "MD_HasMobileAccess",
      "MA_CanViewResenddocumentReasons",
      "MA_CanViewSSO",
      "MD_CanSubmitCloseCreditLines",
    ],
  };
});
