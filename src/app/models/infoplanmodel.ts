import { IGeneric } from "@Models/GenericModel";

export interface InfoPlanModel {
    alliance?: Array<string>;
    code?: string;
    documentTypes?: string;
    enabled?: boolean;
    enabledCollect?: boolean;
    externalCode?: string;
    isCorporate?: string;
    issueUsers?: string;
    isIssueAdditional?: boolean;
    name?: string;
    valuePlan?: string,
    issue?: string;
    issuePoints?: string;
    isCourtesy?: boolean;
    limitedDocumentsToIssue?: string;
    isUnlimitedByDocumentsToIssue?: boolean;
    type?: string;
    isIssuedByDays?: boolean;
    isIssuedByNumberOfDocuments?: boolean;
    isMassive?: boolean;
    isPlanCliente?: boolean;
    isRecharge?: boolean;
    isRenovate?: boolean;
    isUnlimitedByDaysToIssue?: boolean;
    issueNotifications?: string;
    limitedDaysToIssue?: string;
    monthValidity?: number;
    planId?: string;
    planValidity?: string;
    registrationId?: string;
    registrationIdPlan?: string;
    services?: Array<string>;
    unitIssueAdditional?: Array<IGeneric>;
    valueIssueAdditional?: string;
    IsNeedVerifyDocuments?: boolean;
}
