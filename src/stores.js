import { configureStore } from "@reduxjs/toolkit";
import shareSlice from "./shares/shareSlice";
import adminSlice from "./modules/admin/adminSlice";
import userSlice from "./modules/user/userSlice";
import regionSlice from "./modules/region/regionSlice";
import dashboardSlice from "./modules/dashboard/dashboardSlice";
import authorizationSlice from "./modules/authorization/authorizationSlice";
import settingSlice from "./modules/setting/settingSlice";
import countrySlice from "./modules/country/countrySlice";
import regionAndStateSlice from "./modules/regionAndState/regionAndStateSlice";
import citySlice from "./modules/city/citySlice";
import townshipSlice from "./modules/township/townshipSlice";
import permissionSlice from "./modules/authorization/permissionSlice";
import roleSlice from "./modules/authorization/roleSlice";
import packageSlice from "./modules/package/packageSlice";
import merchantBankAccountSlice from "./modules/merchantBankAccount/merchantBankAccountSlice";
import partnerSlice from "./modules/partner/partnerSlice";
import transactionSlice from "./modules/transaction/transactionSlice";
import depositSlice from "./modules/deposit/depositSlice";
import emailContentSlice from "./modules/emailContent/emailContentSlice";
import agentSlice from "./modules/agent/agentSlice";
import bankAccountTypeSlice from "./modules/bankAccountType/bankAccountTypeSlice";
import bonusPointSlice from "./modules/bonusPoint/bonusPointSlice";
import repaymentSlice from "./modules/repayment/repaymentSlice";
import promotionSlice from "./modules/promotion/promotionSlice";
import usdtSlice from "./modules/USDT/usdtSlice";

export const stores = configureStore({
  reducer: {
    share: shareSlice,
    admin: adminSlice,
    user: userSlice,
    region: regionSlice,
    dashboard: dashboardSlice,
    auth: authorizationSlice,
    setting: settingSlice,
    country: countrySlice,
    regionAndState: regionAndStateSlice,
    city: citySlice,
    township: townshipSlice,
    permission: permissionSlice,
    role: roleSlice,
    depositPackage: packageSlice,
    merchantBankAccount: merchantBankAccountSlice,
    partner: partnerSlice,
    transaction: transactionSlice,
    deposit: depositSlice,
    emailContent: emailContentSlice,
    agent: agentSlice,
    bankAccountType: bankAccountTypeSlice,
    bonusPoint: bonusPointSlice,
    repayment: repaymentSlice,
    promotion: promotionSlice,
    usdt: usdtSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
