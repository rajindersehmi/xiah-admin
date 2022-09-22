export const aims = [
  {
    id: 1,
    name: "To Save Money",
    checked: false,
  },
  {
    id: 2,
    name: "Moving Premises",
    checked: false,
  },
  {
    id: 3,
    name: "opening_a_new_office",
    checked: false,
  },
  {
    id: 4,
    name: "Expanding Business",
    checked: false,
  },
  {
    id: 5,
    name: "Quote For MPLS",
    checked: false,
  },
  {
    id: 6,
    name: "Unhappy with existing service provider",
    checked: false,
  },
  {
    id: 7,
    name: "Quote for New System",
    checked: false,
  },
  {
    id: 8,
    name: "System coming to end of lease",
    checked: false,
  },
  {
    id: 9,
    name: "Shrinking Business",
    checked: false,
  },
  {
    id: 10,
    name: "Quote for a Lease Line",
    checked: false,
  },
  {
    id: 11,
    name: "Goto VoIP",
    checked: false,
  },
];

export const challanges = [
  {
    id: 1,
    name: "Reduce cost and more business domain to",
    checked: false,
  },
  {
    id: 2,
    name: "Upgrade or buy a new internet beased line",
    checked: false,
  },
  {
    id: 3,
    name: "Upgrade earting phone system",
    checked: false,
  },
  {
    id: 4,
    name: "Upgrade or buy a new solution:",
    checked: false,
  },
  {
    id: 5,
    name: "Upgrade or buy new business cloud CRM",
    checked: false,
  },
  {
    id: 6,
    name: "Enable Business for remote working",
    checked: false,
  },
  {
    id: 7,
    name: "Upgrade or buy new business broadband",
    checked: false,
  },
  {
    id: 8,
    name: "Upgrade or buy a new Buseness mobile",
    checked: false,
  },
  {
    id: 9,
    name: "Upgrade or buy a new cloud contact center",
    checked: false,
  },
  {
    id: 10,
    name: "Upgrade or buy SIP tracking or call ",
    checked: false,
  },
  {
    id: 11,
    name: "Upgrade or buy unified communication",
    checked: false,
  },
  {
    id: 12,
    name: "Upgrade or buy Microsoft eams",
    checked: false,
  },
  {
    id: 13,
    name: "Upgrade or buy Cybersecurity and comliances",
    checked: false,
  },
];

export const feature = [
  {
    id: 1,
    name: "Auto Attendant",
    checked: false,
  },
  {
    id: 2,
    name: "Caller Display",
    checked: false,
  },
  {
    id: 3,
    name: "Satellite Office",
    checked: false,
  },
  {
    id: 4,
    name: "Music on hold",
    checked: false,
  },
  {
    id: 5,
    name: "Answer phone/Voicemail",
    checked: false,
  },
  {
    id: 6,
    name: "Home Worker",
    checked: false,
  },
  {
    id: 7,
    name: "Call recording",
    checked: false,
  },
  {
    id: 8,
    name: "Call Queuing",
    checked: false,
  },
];

export const contractEndDates = [
  {
    key: "Within next 30 days",
    value: "Within next 30 days",
  },
  {
    key: "Within next 3 months",
    value: "Within next 3 months",
  },
  {
    key: "Within next 6 months",
    value: "Within next 6 months",
  },
  {
    key: "Within next 12 months",
    value: "Within next 12 months",
  },
  {
    key: "More than 12 months",
    value: "More than 12 months",
  },
];

export const YesNo = [
  {
    key: "Yes",
    value: 1,
  },
  {
    key: "No",
    value: 0,
  },
];

// if no type is specified it will be considered as a normal input
export const RequirementFields = [
  {
    key: "business_name",
  },
  {
    key: "bussiness_address",
  },
  {
    key: "contact_email",
  },

  {
    key: "contact_phone",
  },

  {
    key: "implement_solution_date",
    type: "date",
  },
  {
    key: "industry",
  },
  {
    key: "no_of_sites",
  },
  {
    key: "organization_size",
  },
  {
    key: "website_url",
  },
  {
    key: "main_aim",
    type: "checkbox-list",
    list: aims,
  },
  {
    key: "challanges",
    type: "checkbox-list",
    list: challanges,
  },
];

export const AuditReportFields = [
  {
    key: "analogue_lines",
  },
  {
    key: "analogue_lines_provider",
  },
  {
    key: "analogue_lines_contract_date",
    type: "select",
    options: contractEndDates,
  },
  {
    key: "isdn2_lines",
  },
  {
    key: "isdn2_lines_provider",
  },
  {
    key: "isdn2_lines_contract_date",
    type: "select",
    options: contractEndDates,
  },
  {
    key: "isdn30_lines",
  },
  {
    key: "isdn30_lines_provider",
  },
  {
    key: "isdn30_lines_contract_date",
    type: "select",
    options: contractEndDates,
  },
  {
    key: "in_hosted_phone_system",
    type: "select",
    options: YesNo,
  },
  {
    key: "in_premises_phone_system",
    type: "select",
    options: YesNo,
  },
  {
    key: "sip_trunks_provider",
  },
  {
    key: "sip_trunks",
  },
  {
    key: "sip_trunks_contract_date",
    type: "select",
    options: contractEndDates,
  },
  {
    key: "monthly_call_spend",
  },
  {
    key: "budget",
  },
  {
    key: "no_of_broadbands",
  },
  {
    key: "monthly_broadbands_spend",
  },
  {
    key: "no_of_sdsl",
  },
  {
    key: "monthly_sdsl_spend",
  },
  {
    key: "no_of_leased_line",
  },
  {
    key: "monthly_leased_line_spend",
  },
  {
    key: "no_of_telephones",
  },
  {
    key: "no_of_extensions",
  },
  {
    key: "cabling_on_site",
  },
  {
    key: "monthly_telephone_spend",
  },
  {
    key: "monthly_maintainance_spend",
  },
  {
    key: "no_of_mobiles",
  },
  {
    key: "network_using",
  },
  {
    key: "monthly_mobile_spend",
  },
  {
    key: "contact_end_date",
    type: "date",
  },
  {
    key: "requirement",
  },
  {
    key: "features",
    type: "checkbox-list",
    list: feature,
  },
  {
    key: "main_aim",
    type: "checkbox-list",
    list: aims,
  },
];
