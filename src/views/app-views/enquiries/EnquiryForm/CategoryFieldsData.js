// leased select options
const bandwidth = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
];
const availabelity = [
  { label: "Not Important", value: "not_important" },
  { label: "Very Important", value: "very_important" },
];

//iot select options

const iot_connectivity = [
  { label: "Yes", value: "yes" },
  { label: "NO", value: "no" },
];

const sim_cards = [
  { label: "UK", value: "uk" },
  { label: "Europe", value: "europe" },
  { label: "Worldwide", value: "worldwide" },
  { label: "Specific Country", value: "specific_country" },
];
const data_volume_unit = [
  { label: "MB", value: "mb" },
  { label: "GB", value: "gb" },
  { label: "TB", value: "tb" },
];
const contract_length = [
  { label: "24 months", value: "24 months" },
  { label: "36 months", value: "36 months" },
  { label: "Other", value: "other" },
];
const frequency = [
  { label: "Per month", value: "per month" },
  { label: "Per annum", value: "per annum" },
  { label: "One-off", value: "one-off" },
];
const vpn_services = [
  { label: "No VPN required", value: "no vpn required" },
  { label: "SSL VPN", value: "ssl vpn" },
  { label: "IPSec VPN", value: "ipsec vpn" },
  { label: "Open VPN", value: "open vpn" },
  { label: "Other VPN", value: "other vpn" },
];
const ip_address = [
  { label: "None", value: "none" },
  { label: "Fixed Public IP", value: "fixed public ip" },
  { label: "Fixed Private IP", value: "fixed private ip" },
];
const sim_card_format = [
  { label: "2FF Standard", value: "2ff standard" },
  { label: "3FF Micro", value: "3ff micro" },
  { label: "4FF Nano", value: "4ff nano" },
  { label: "Embedded Chip", value: "embedded chip" },
];

const network_standards = [
  { label: "Unsure", value: "unsure" },
  { label: "CSD", value: "csd" },
  { label: "2G(GPRS)", value: "2g" },
  { label: "3G (UMTS/HSPA)", value: "3g" },
  { label: "4G(LTE)", value: "4g" },
  { label: "LPWAN (NB-IoT, Cat-M1)", value: "lpwan" },
  { label: "5G", value: "5g" },
];

//M2M select options
const devices = [
  { label: "<1000", value: "<1000" },
  { label: "1,000-10,000", value: "1,000-10,000" },
  { label: "10,000-200,000", value: "10,000-200,000" },
  { label: "200,000-500,000", value: "200,000-500,000" },
  { label: "500,000-1m", value: "500,000-1m" },
  { label: "1m+", value: "1m+" },
];
const data_usage = [
  { label: "0-49MB", value: "0-49MB" },
  { label: "50-249MB", value: "50-249MB" },
  { label: "250-999MB", value: "250-999MB" },
  { label: "1-10GB", value: "1-10GB" },
  { label: "10GB+", value: "10GB+" },
];

//PBX select options

const field_users = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
  { label: "6", value: "6" },
  { label: "7", value: "7" },
  { label: "8", value: "8" },
  { label: "9", value: "9" },
  { label: "10", value: "10" },
];

const digital_phone_sytem_reason = [
  {
    value: "Replace an old phone system",
    label: "Replace an old phone system",
  },
  {
    name: "Upgrade an existing VoIP system",
    label: "Upgrade an existing VoIP system",
  },
  { value: "Install a new phone system", label: "Install a new phone system" },
  {
    value: "Just seeing what’s possible",
    label: "Just seeing what’s possible",
  },
];

const no_of_locations = [
  { value: "none", label: "none" },
  { value: "1", label: "1" },
  { value: "2-4", label: "2-4" },
  { value: "5+", label: "5+" },
];

const no_of_devices = [
  { value: "Desk phones", label: "Desk phones" },
  { value: "Cordless phones", label: "Cordless phones" },
  { value: "Conference phones", label: "Conference phones" },
];

const users = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
  { label: "6", value: "6" },
  { label: "7", value: "7" },
  { label: "8", value: "8" },
  { label: "9", value: "9" },
  { label: "10", value: "10" },
  { label: "11", value: "11" },
  { label: "12", value: "12" },
  { label: "13", value: "13" },
  { label: "14", value: "14" },
  { label: "15", value: "15" },
  { label: "16", value: "16" },
  { label: "17", value: "17" },
  { label: "18", value: "18" },
  { label: "19", value: "19" },
  { label: "20", value: "20" },
  { label: "21", value: "21" },
  { label: "22", value: "22" },
  { label: "23", value: "23" },
  { label: "24", value: "24" },
  { label: "25", value: "25" },
  { label: "26", value: "26" },
  { label: "27", value: "27" },
  { label: "28", value: "28" },
  { label: "29", value: "29" },
  { label: "30", value: "30" },
  { label: "31", value: "31" },
  { label: "32", value: "32" },
  { label: "33", value: "33" },
  { label: "34", value: "34" },
  { label: "35", value: "35" },
  { label: "36", value: "36" },
  { label: "37", value: "37" },
  { label: "38", value: "38" },
  { label: "39", value: "39" },
  { label: "40", value: "40" },
  { label: "41", value: "41" },
  { label: "42", value: "42" },
  { label: "43", value: "43" },
  { label: "44", value: "44" },
  { label: "45", value: "45" },
  { label: "46", value: "46" },
  { label: "47", value: "47" },
  { label: "48", value: "48" },
  { label: "49", value: "49" },
  { label: "50", value: "50" },
  { label: "51", value: "51" },
  { label: "52", value: "52" },
  { label: "53", value: "53" },
  { label: "54", value: "54" },
  { label: "55", value: "55" },
  { label: "56", value: "56" },
  { label: "57", value: "57" },
  { label: "58", value: "58" },
  { label: "59", value: "59" },
  { label: "60", value: "60" },
  { label: "61", value: "61" },
  { label: "62", value: "62" },
  { label: "63", value: "63" },
  { label: "64", value: "64" },
  { label: "65", value: "65" },
  { label: "66", value: "66" },
  { label: "67", value: "67" },
  { label: "68", value: "68" },
  { label: "69", value: "69" },
  { label: "70", value: "70" },
  { label: "71", value: "71" },
  { label: "72", value: "72" },
  { label: "73", value: "73" },
  { label: "74", value: "74" },
  { label: "75", value: "75" },
  { label: "76", value: "76" },
  { label: "77", value: "77" },
  { label: "78", value: "78" },
  { label: "79", value: "79" },
  { label: "80", value: "80" },
  { label: "81", value: "81" },
  { label: "82", value: "82" },
  { label: "83", value: "83" },
  { label: "84", value: "84" },
  { label: "85", value: "85" },
  { label: "86", value: "86" },
  { label: "87", value: "87" },
  { label: "88", value: "88" },
  { label: "89", value: "89" },
  { label: "90", value: "90" },
  { label: "91", value: "91" },
  { label: "92", value: "92" },
  { label: "93", value: "93" },
  { label: "94", value: "94" },
  { label: "95", value: "95" },
  { label: "96", value: "96" },
  { label: "97", value: "97" },
  { label: "98", value: "98" },
  { label: "99", value: "99" },
  { label: "100", value: "100" },
];

//MPLS select options

const mpls_providers = [
  {
    label:
      "We require MPLS for privacy and end to end QoS (Quality of Service) across all of our sites",
    value:
      "We require MPLS for privacy and end to end QoS (Quality of Service) across all of our sites",
  },
  {
    label:
      "We require MPLS for selected sites but are open to SD WAN over the Internet where required",
    value:
      "We require MPLS for selected sites but are open to SD WAN over the Internet where required",
  },
  {
    label:
      "We are open to learning about both MPLS and SD WAN technologies across all of our sites",
    value:
      "We are open to learning about both MPLS and SD WAN technologies across all of our sites",
  },
  {
    label:
      "We are already engaged with providers and just need to make sure we have everything covered",
    value:
      "We are already engaged with providers and just need to make sure we have everything covered",
  },
];

const regions = [
  { label: "UK", value: "UK" },
  { label: "Europe", value: "Europe" },
  { label: "North America", value: "North America" },
  { label: "South America", value: "South America" },
  { label: "Asia", value: "Asia" },
  { label: "The Caribbean", value: "The Caribbean" },
];

const diversity = [
  { label: "Yes", value: "Yes" },
  { label: "No", value: "No" },
  {
    label: "We would like to learn more",
    value: "We would like to learn more",
  },
];

const types_of_connectivity = [
  { label: "Ethernet", value: "Ethernet" },
  { label: "Broadband", value: "Broadband" },
  { label: "EFM (Ethernet First Mile)", value: "EFM (Ethernet First Mile)" },
  { label: "4G/5G", value: "4G/5G" },
];

const price_sensitive = [
  { label: "TRUE", value: "true" },
  { label: "FALSE", value: "false" },
];

const services = [
  { label: "WAN edge router support", value: "WAN edge router support" },
  { label: "Firewall", value: "Firewall" },
  {
    label: "Next Generation Security services",
    value: "Next Generation Security services",
  },
  { label: "Desktop virtualisation", value: "Desktop virtualisation" },
];

const sd_wan_over_mpls = [
  {
    label: "We require hybrid WAN architecture",
    value: "We require hybrid WAN architecture",
  },
  {
    label: "We would like to use SD WAN edge devices with MPLS",
    value: "We would like to use SD WAN edge devices with MPLS",
  },
  {
    label: "We have no requirement for SD WAN",
    value: "We have no requirement for SD WAN",
  },
];

const sites_require_mpls = [
  { label: "1-9", value: "1-9" },
  { label: "10-19", value: "10-19" },
  { label: "20-29", value: "20-29" },
  { label: "30-39", value: "30-39" },
  { label: "40-49", value: "40-49" },
  { label: "50+", value: "50+" },
];

//sd wan select fields

const business_interest_features = [
  { label: "Easy to manage and deploy", value: "Easy to manage and deploy" },
  {
    label: "Solution to deal with complex requirements",
    value: "Solution to deal with complex requirements",
  },
  {
    label: "SD WAN vendor with strong Cloud integration (AWS, Azure, Google)",
    value: "SD WAN vendor with strong Cloud integration (AWS, Azure, Google)",
  },
  {
    label: "Management of last mile underlay connectivity",
    value: "Management of last mile underlay connectivity",
  },
  { label: "Support for cellular 4G/5G", value: "Support for cellular 4G/5G" },
  { label: "Support for remote users", value: "Support for remote users" },
  { label: "WAN optimisation", value: "WAN optimisation" },
  { label: "LAN segmentation", value: "LAN segmentation" },
  { label: "Internet of Things (IoT)", value: "Internet of Things (IoT)" },
  { label: "Wireless", value: "Wireless" },
  { label: "Managed IT Services", value: "Managed IT Services" },
  { label: "Professional Services", value: "Professional Services" },
];

const managed_service_preference = [
  { label: "DIY", value: "DIY" },
  {
    label: "DIY with professional services",
    value: "DIY with professional services",
  },
  { label: "Co-managed", value: "Co-managed" },
  {
    label: "Co-managed with professional services",
    value: "Co-managed with professional services",
  },
  { label: "Fully managed via MSP", value: "Fully managed via MSP" },
];

const buy_preference = [
  {
    label: "We prefer to buy directly from the vendor",
    value: "We prefer to buy directly from the vendor",
  },
  {
    label: "We prefer to buy from a service provider",
    value: "We prefer to buy from a service provider",
  },
  {
    label: "We prefer to buy from an integration partner",
    value: "We prefer to buy from an integration partner",
  },
  {
    label: "We need hardware only from a value added reseller",
    value: "We need hardware only from a value added reseller",
  },
];

const security_needs = [
  {
    label: "We require full SASE security",
    value: "We require full SASE security",
  },
  {
    label: "We need to integrate with an existing security solution",
    value: "We need to integrate with an existing security solution",
  },
  { label: "ZTNA", value: "ZTNA" },
  { label: "CASB", value: "CASB" },
  { label: "SWG", value: "SWG" },
  { label: "FWaaS", value: "FWaaS" },
  { label: "MDR", value: "MDR" },
  { label: "Cloud security", value: "Cloud security" },
  { label: "On-premise security", value: "On-premise security" },
];

const business_sectors = [
  { label: "Finance", value: "Finance" },
  { label: "Retail", value: "Retail" },
  { label: "Manufacturing", value: "Manufacturing" },
  { label: "Construction", value: "Construction" },
  { label: "Education", value: "Education" },
  { label: "Food and drink", value: "Food and drink" },
  { label: "Medical", value: "Medical" },
  { label: "Mining", value: "Mining" },
  { label: "Oil and gas", value: "Oil and gas" },
  { label: "Green energy", value: "Green energy" },
  { label: "Government", value: "Government" },
  { label: "Transport", value: "Transport" },
  { label: "Utilities", value: "Utilities" },
  { label: "Other", value: "Other" },
];

const sd_wan_regions = [
  { label: "UK", value: "UK" },
  { label: "Europe", value: "Europe" },
  { label: "North America", value: "North America" },
  { label: "South America", value: "South America" },
  { label: "Asia", value: "Asia" },
  { label: "Africa", value: "Africa" },
  { label: "Middle East", value: "Middle East" },
  { label: "Australia", value: "Australia" },
];

const architecture_interest = [
  {
    label: "Use of multiple Internet providers to deliver connectivity",
    value: "Use of multiple Internet providers to deliver connectivity",
  },
  {
    label: "Single Internet provider to deliver connectivity",
    value: "Single Internet provider to deliver connectivity",
  },
  {
    label: "Multiple Internet providers with Cloud gateways",
    value: "Multiple Internet providers with Cloud gateways",
  },
  {
    label: "Single Internet provider with Cloud gateways",
    value: "Single Internet provider with Cloud gateways",
  },
  {
    label: "Multiple Internet providers with Private backbone",
    value: "Multiple Internet providers with Private backbone",
  },
  {
    label: "Single Internet provider with Private backbone",
    value: "Single Internet provider with Private backbone",
  },
];
const branch_office_site_connections = [
  { label: "2-10", value: "2-10" },
  { label: "11-20", value: "11-20" },
  { label: "21-30", value: "21-30" },
  { label: "31-40", value: "31-40" },
  { label: "41-50", value: "41-50" },
  { label: "51+", value: "51+" },
];

const remote_user_connections = [
  { label: "2-10", value: "2-10" },
  { label: "11-20", value: "11-20" },
  { label: "21-30", value: "21-30" },
  { label: "31-40", value: "31-40" },
  { label: "41-50", value: "41-50" },
  { label: "51-100", value: "51-100" },
  { label: "101+", value: "51-101+" },
];

// const interests = [
//   {
//     label: "I'm a senior IT decision maker researching SD WAN",
//     value: "I'm a senior IT decision maker researching SD WAN",
//   },
//   {
//     label: "I'm a senior IT decision maker requiring SD WAN demos and pricing",
//     value: "I'm a senior IT decision maker requiring SD WAN demos and pricing",
//   },
//   {
//     label: "I'm a consultant looking for SD WAN demos and pricing",
//     value: "I'm a consultant looking for SD WAN demos and pricing",
//   },
//   {
//     label: "I'm a consultant researching SD WAN",
//     value: "I'm a consultant researching SD WAN",
//   },
//   {
//     label: "I'm a network architect or an engineer",
//     value: "I'm a network architect or an engineer",
//   },
// ];

//cyber security select options

const sase_vendors_consideration = [
  {
    label: "Our interest is in SD WAN vendors with SASE capability",
    value: "Our interest is in SD WAN vendors with SASE capability",
  },
  {
    label: "Our interest is in SASE vendors with SD WAN capability",
    value: "Our interest is in SASE vendors with SD WAN capability",
  },
  {
    label: "We need to integrate SASE into our existing WAN",
    value: "We need to integrate SASE into our existing WAN",
  },
];

const cyber_service_preference = [
  { label: "DIY", value: "DIY" },
  { label: "Co-Managed", value: "Co-Managed" },
  { label: "Fully Managed", value: "Fully Managed" },
  {
    label: "We will require some professional services",
    value: "We will require some professional services",
  },
];

const remote_user_support = [
  { label: "Less than 10 sites", value: "Less than 10 sites" },
  { label: "10-30 sites", value: "10-30 sites" },
  { label: "30-60 sites", value: "30-60 sites" },
  { label: "60 sites+", value: "60 sites+" },
];

const elements_required = [
  { label: "SASE only", value: "SASE only" },
  {
    label: "We require SASE, SD WAN and Connectivity",
    value: "We require SASE, SD WAN and Connectivity",
  },
  { label: "We require SASE and SD WAN", value: "We require SASE and SD WAN" },
];

const vendor_locations = [
  { label: "UK", value: "UK" },
  { label: "North America", value: "North America" },
  { label: "South America", value: "South America" },
  { label: "Europe", value: "Europe" },
  { label: "Asia", value: "Asia" },
  { label: "No preference", value: "No preference" },
];

const deals_preference = [
  {
    label: "We prefer to deal directly with the vendor",
    value: "We prefer to deal directly with the vendor",
  },
  {
    label: "We prefer to deal with large service providers",
    value: "We prefer to deal with large service providers",
  },
  {
    label: "We prefer to deal with specialist integrators",
    value: "We prefer to deal with specialist integrators",
  },
  {
    label: "We do not have a preference",
    value: "We do not have a preference",
  },
];

const sase_interest = [
  {
    label: "CASB (Cloud Access Security Broker)",
    value: "CASB (Cloud Access Security Broker)",
  },
  {
    label: "ZTNA (Zero Trust Network Access)",
    value: "ZTNA (Zero Trust Network Access)",
  },
  { label: "SWG (Secure Web Gateway)", value: "SWG (Secure Web Gateway)" },
  {
    label: "NGFW (Next Generation Firewall)",
    value: "NGFW (Next Generation Firewall)",
  },
  { label: "Cloud delivered", value: "Cloud delivered" },
];

const coverage_requirements = [
  { label: "National", value: "National" },
  { label: "Global", value: "global" },
  { label: "Both", value: "both" },
];
const coverage_regions = [
  { label: "United Kingdom", value: "United Kingdom" },
  { label: "North America", value: "North America" },
  { label: "South America", value: "South America" },
  {
    label: "EMEA (Europe, Middle East & Africa)",
    value: "EMEA (Europe, Middle East & Africa)",
  },
  { label: "APAC (Asia-Pacific)", value: "APAC (Asia-Pacific)" },
];

const sase_integration = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
  { label: "Unsure", value: "unsure" },
];

//phone lines select options

const lines = [
  { label: "Standard business line", value: "Standard business line" },
  { label: "Featureline", value: "Featureline" },
  { label: "ISDN2 Lines", value: "ISDN2 Lines" },
  { label: "ISDN30 Lines", value: "ISDN30 Lines" },
  { label: "SIP Trunks", value: "SIP Trunks" },
];

const lines_for_business = [
  { label: "1-10", value: "1-10" },
  { label: "10-50", value: "10-50" },
  { label: "50+", value: "50+" },
];

//phone numbers select options

const kind_of_numbers = [
  { label: "0333 numbers", value: "0333 numbers" },
  { label: "0845 numbers", value: "0845 numbers" },
  { label: "0800 numbers", value: "0800 numbers" },
  {
    label: "Local virtual numbers like 020, 0161, etc",
    value: "Local virtual numbers like 020, 0161, etc",
  },
  { label: "Virtual UK number", value: "Virtual UK number" },
];

//Business continuity select options

const business_continuity = [
  { label: "Public Cloud Services", value: "Public Cloud Services" },
  {
    label: "Disaster Recovery a Service",
    value: "Disaster Recovery a Service",
  },
  { label: "Backup as a Service", value: "Backup as a Service" },
  {
    label: "Business Continuity as a Service",
    value: "Business Continuity as a Service",
  },
];

//Cloud Telephony select options

const contract_duration = [
  { label: "6 Months (Free Handsets)", value: "6 Months (Free Handsets)" },
  {
    label: "24 Months (Half Price Handsets)",
    value: "24 Months (Half Price Handsets)",
  },
  { label: "12 Months", value: "12 Months" },
];

//Fields
export const LeasedLineFields = [
  { name: "organisation_size", label: "Size of Organisation", type: "text" },
  { name: "pc_users", label: "No of PC Users", type: "text" },
  { name: "no_of_sites", label: "No of Sites", type: "text" },
  {
    name: "download_bandwidth",
    label: "Download Bandwidth",
    type: "select",
    options: bandwidth,
  },
  { name: "web_browsing", label: "WebBrowsing", type: "checkbox" },
  { name: "streaming_media", label: "Streaming Media", type: "checkbox" },
  { name: "file_downloads", label: "File Downloads", type: "checkbox" },
  {
    name: "upload_bandwidth",
    label: "Upload Bandwidth",
    type: "select",
    options: bandwidth,
  },
  { name: "remote_access", label: "Remote Access", type: "checkbox" },
  {
    name: "remote_desktop",
    label: "Remote Desktop (Citrix etc)",
    type: "checkbox",
  },
  { name: "hosted_intranet", label: "Hosted Interanet", type: "checkbox" },
  { name: "hosted_web_server", label: "Hosted Web Server", type: "checkbox" },
  { name: "file_uploads", label: "File Uploads", type: "checkbox" },
  { name: "bandwidth_required", label: "Bandwidth required", type: "text" },
  {
    name: "symmetrical_bandwidth",
    label: "Symmetrical Bandwidth",
    type: "select",
    options: bandwidth,
  },
  { name: "email", label: "Email", type: "checkbox" },
  { name: "voip", label: "Voip", type: "checkbox" },
  { name: "video_conferencing", label: "Video Conferencing", type: "checkbox" },
  {
    name: "saas_cloud_based_services",
    label: "Saas cloud based services",
    type: "checkbox",
  },
  { name: "site_to_site_vpn", label: "Site-to-site VPN", type: "checkbox" },
  {
    name: "availablity_of_internet",
    label: "Availability of Internet",
    type: "text",
  },
  {
    name: "high_availability",
    label: "High Availability",
    type: "select",
    options: availabelity,
  },
  {
    name: "looking_for",
    label: "What are you looking for?",
    type: "text",
  },
  {
    name: "desired_speed",
    label: "Select your desired speed?",
    type: "text",
  },
  {
    name: "backup",
    label: "Backup",
    type: "text",
  },
  {
    name: "headquarter",
    label: "Headquarter",
    type: "text",
  },
  {
    name: "additional_comments",
    label: "Additional Comments",
    type: "text",
  },
];

export const IOTFields = [
  { name: "company_name", label: "Company Name", type: "text" },
  {
    name: "short_description",
    label: "Short description of your application",
    type: "text",
  },
  { name: "connectivity", label: "Connectivity", type: "text" },
  {
    name: "iot_connectivity",
    label: "Do you already have IOT connectivity",
    type: "select",
    options: iot_connectivity,
  },
  {
    name: "sim_cards_used",
    label: "Where are the SIM cards used?",
    type: "select",
    options: sim_cards,
  },
  {
    name: "data_volume_per_month",
    label: "Data volume per SIM/month?",
    type: "text",
  },
  {
    name: "data_volume_unit",
    label: "Please select Data Volume Unit?",
    type: "select",
    options: data_volume_unit,
  },
  {
    name: "network_standards",
    label: "Which network standards do you need?",
    type: "select",
    options: network_standards,
  },
  {
    name: "require_sms",
    label: "Do you require SMS?",
    type: "select",
    options: iot_connectivity,
  },
  {
    name: "contract_length",
    label: "Length of Contract?",
    type: "select",
    options: contract_length,
  },
  {
    name: "sim_requirement",
    label: "How many SIM's are required",
    type: "text",
  },
  {
    name: "frequency",
    label: "Select frequency",
    type: "select",
    options: frequency,
  },
  {
    name: "security_requirements",
    label: "Security requirements/VPN Services:",
    type: "select",
    options: vpn_services,
  },
  {
    name: "ip_address",
    label: "Do you need a fixed IP address?",
    type: "select",
    options: ip_address,
  },
  {
    name: "sim_card_format",
    label: "SIM card format required",
    type: "select",
    options: sim_card_format,
  },
  {
    name: "deployement_required",
    label: "Please Indicate when deployment is required",
    type: "text",
  },
  {
    name: "hardware_requirement",
    label: "Do you require hardware?",
    type: "select",
    options: iot_connectivity,
  },
  { name: "comments", label: "Further Comments", type: "text" },
];

export const M2MFields = [
  {
    name: "business_email_address",
    label: "Business Email Addres",
    type: "text",
  },
  { name: "company_name", label: "Company Name", type: "text" },
  { name: "country", label: "Country", type: "text" },
  {
    name: "no_of_devices",
    label: "No of Devices",
    type: "select",
    options: devices,
  },
  {
    name: "data_usage",
    label: "Data usage per SIM per month",
    type: "select",
    options: data_usage,
  },
  {
    name: "deployment",
    label: "Tell us more about your deployment?",
    type: "text",
  },
];
export const PBXFields = [
  {
    name: "users",
    label: "How many users?",
    type: "select",
    options: users,
  },
  {
    name: "field_users",
    label: "How many field users?",
    type: "select",
    options: field_users,
  },
  {
    name: "offices_in_uk",
    label: "How many offices do you have in UK?",
    type: "select",
    options: users,
  },
  {
    name: "calls_recorded",
    label: "Do you need all calls to be recorded?",
    type: "text",
  },
  { name: "desk_phones", label: "Do you need any desk phones?", type: "text" },
  {
    name: "digital_phone_system",
    label: "Why are you comparing digital phone systems today? ",
    type: "select",
    options: digital_phone_sytem_reason,
  },
  {
    name: "locations",
    label: "How many locations would you like to have devices in? ",
    type: "select",
    options: no_of_locations,
  },
  {
    name: "devices",
    label: "Perfect. Give us an idea of how many devices you might need? ",
    type: "select",
    options: no_of_devices,
  },
  { name: "business_name", label: "Business name", type: "text" },
  { name: "best_call", label: "When's best to call?", type: "text" },
  { name: "time", label: "Choose a time", type: "text" },
  {
    name: "app_users",
    label: "How many desktop/mobile app users will you need?",
    type: "text",
  },
];

export const MPLSFields = [
  {
    name: "mpls_regions",
    label: "Which regions do you need to connect with MPLS? ",
    type: "select",
    options: regions,
  },
  {
    name: "diversity",
    label:
      "Do you require full diversity with no single point of failure at selected sites?",
    type: "select",
    options: diversity,
  },
  {
    name: "connectivity",
    label: "What types of connectivity do you require?",
    type: "select",
    options: types_of_connectivity,
  },
  {
    name: "price_sensitive",
    label: "We are price sensitive and must lower costs vs what we pay today",
    type: "select",
    options: price_sensitive,
  },
  {
    name: "services",
    label: "We require Fully Managed services?",
    type: "select",
    options: services,
  },
  {
    name: "sdwan_over_mpls",
    label: "Are you interested in using SD WAN over MPLS?",
    type: "select",
    options: sd_wan_over_mpls,
  },
  {
    name: "sites_require_mpls",
    label: "How many sites require MPLS?",
    type: "select",
    options: sites_require_mpls,
  },
  {
    name: "mpls_providers",
    label:
      "This is first of 10 questions. Answer each question as accurately as possible and the Netify logic will shortlist MPLS providers which meet your needs. Let’s get started. Which option best describes your view of MPLS? ",
    type: "select",
    options: mpls_providers,
  },
  {
    name: "email_and_phone",
    label:
      "Please enter your business email address and phone number to receive your top 3 match report.",
    type: "text",
  },
];

export const SDWANFields = [
  {
    name: "business_email",
    label: "Business Email only",
    type: "text",
  },
  {
    name: "company_name",
    label: "Company Name",
    type: "text",
  },
  {
    name: "telephone_number",
    label: "TelePhone Number",
    type: "text",
  },
  {
    name: "biggest_problem",
    label: "What's the biggest problem you're looking to solve?",
    type: "text",
  },

  {
    name: "business_interest_features",
    label:
      "Please select the features which are of most interest to your business",
    type: "select",
    options: business_interest_features,
  },
  {
    name: "managed_service_preference",
    label: "What is your managed services preference?",
    type: "select",
    options: managed_service_preference,
  },
  {
    name: "buy_preference",
    label: "How do you prefer to buy SD WAN?",
    type: "select",
    options: buy_preference,
  },
  {
    name: "security_needs",
    label: "Please describe your security needs",
    type: "select",
    options: security_needs,
  },
  {
    name: "business_sector",
    label: "Which business sector do you operate within?",
    type: "select",
    options: business_sectors,
  },
  {
    name: "region",
    label: "Which regions are required for SD WAN?",
    type: "select",
    options: sd_wan_regions,
  },
  {
    name: "architecture_interest",
    label: "Which SD WAN architecture is of interest?",
    type: "select",
    options: architecture_interest,
  },
  {
    name: "branch_office_site_connections",
    label: "How many branch office sites will connect to SD WAN?",
    type: "select",
    options: branch_office_site_connections,
  },
  {
    name: "remote_user_connections",
    label: "How many remote users will connect to SD WAN?",
    type: "select",
    options: remote_user_connections,
  },

  {
    name: "notes",
    label: "Add some notes about your SD WAN requirements",
    type: "text",
  },
  // {
  //   name: "interests",
  //   label: "Please click all options which apply to your interest in SD WAN",
  //   type: "select",
  //   options: interests,
  // },
  {
    name: "research_senior_decision_maker",
    label: "I'm a senior IT decision maker researching SD WAN",
    type: "checkbox",
  },
  {
    name: "demo_senior_decision_maker",
    label: "I'm a senior IT decision maker requiring SD WAN demos and pricing",
    type: "checkbox",
  },
  {
    name: "demo_consultant",
    label: "I'm a consultant looking for SD WAN demos and pricing",
    type: "checkbox",
  },
  {
    name: "research_consultant",
    label: "I'm a consultant researching SD WAN",
    type: "checkbox",
  },
  {
    name: "network_engineer",
    label: "I'm a network architect or an engineer",
    type: "checkbox",
  },
];

export const CyberSecurityFields = [
  {
    name: "sase_vendors_consideration",
    label:
      "When considering SASE vendors, which option best describes your needs?",
    type: "select",
    options: sase_vendors_consideration,
  },
  {
    name: "managed_service_preference",
    label: "Please state your managed services preference",
    type: "select",
    options: cyber_service_preference,
  },
  {
    name: "remote_user",
    label: "How many remote users do you need to support",
    type: "select",
    options: remote_user_support,
  },
  {
    name: "elements",
    label: "Which elements do you require from your SASE vendor?",
    type: "select",
    options: elements_required,
  },
  {
    name: "vendor_location",
    label: "Do you have a preference for where the vendor is located?",
    type: "select",
    options: vendor_locations,
  },
  {
    name: "vendor_preference",
    label:
      "Do you prefer to deal with vendors, service providers or integrators?",
    type: "select",
    options: deals_preference,
  },
  {
    name: "sase_interest",
    label: "Please state the SASE areas of interest to your business?",
    type: "select",
    options: sase_interest,
  },
  {
    name: "coverage_requirements",
    label: "What are your coverage requirements?",
    type: "select",
    options: coverage_requirements,
  },
  {
    name: "coverage_regions",
    label: "Which regions do you require coverage for?",
    type: "select",
    options: coverage_regions,
  },
  {
    name: "sase_integration",
    label: "Do you need to integrate SASE into an existing solution?",
    type: "select",
    options: sase_integration,
  },
  {
    name: "business_email",
    label: "Business Email",
    type: "text",
  },
  {
    name: "phone_number",
    label: "phone_number",
    type: "text",
  },
];

export const PhoneLineFields = [
  {
    name: "kind_of_lines",
    label: "What kind of lines are you after?",
    type: "select",
    options: lines,
  },
  {
    name: "lines_for_business",
    label: "How many lines do you want for your business?",
    type: "select",
    options: lines_for_business,
  },
  {
    name: "phone_system",
    label: "Do you have a Phone system to connect these line?",
    type: "select",
    options: iot_connectivity,
  },
  {
    name: "quote_phone_system",
    label: "If No do you also want a quote for a phone system?",
    type: "select",
    options: iot_connectivity,
  },
];

export const PhoneNumberFields = [
  {
    name: "kind_of_lines",
    label: "What kind of numbers are you after?",
    type: "select",
    options: kind_of_numbers,
  },
  {
    name: "numbers_for_business",
    label: "How many numbers do you want for your business?",
    type: "select",
    options: lines_for_business,
  },
  {
    name: "have_number",
    label: "Do you have a number to connect these numbers?",
    type: "select",
    options: iot_connectivity,
  },
  {
    name: "quote_phone_lines",
    label: "If No do you also want a quote for a phone lines?",
    type: "select",
    options: iot_connectivity,
  },
];

export const BusinessContinuityFields = [
  {
    name: "company_name",
    label: "Company Name",
    type: "text",
  },
  {
    name: "business_continuity",
    label: "Choose option",
    type: "select",
    options: business_continuity,
  },
  {
    name: "company_email",
    label: "Company Email",
    type: "text",
  },
];

export const CloudTelephonyFields = [
  {
    name: "contract_duration",
    label: "Contract Duration",
    type: "select",
    options: contract_duration,
  },
  {
    name: "no_of_handsets",
    label: "Number Of Handset",
    type: "select",
    options: users,
  },
  {
    name: "type_of_handsets",
    label: "Types Of Handset",
    type: "select",
    options: field_users,
  },
  {
    name: "type_of_handsets",
    label: "Choose Your Handsets",
    type: "select",
    options: field_users,
  },
  {
    name: "unlimited_calls",
    label: "Unlimited Landline & Mobile Calls?",
    type: "checkbox",
  },
  {
    name: "transfer_number",
    label: "Transfer Number?",
    type: "checkbox",
  },
  {
    name: "phone_number",
    label: "Phone Number",
    type: "text",
  },
  {
    name: "record_all_calls",
    label: "Record All Calls?",
    type: "text",
  },
  {
    name: "direct_dial_numbers",
    label: "Direct Dial Numbers",
    type: "select",
    options: users,
  },
  {
    name: "auto_attendant",
    label: "Auto Attendant",
    type: "text",
  },
  {
    name: "inbound_call_queue",
    label: "Inbound Call Queue",
    type: "text",
  },
  {
    name: "new_router",
    label: "New Router",
    type: "text",
  },
  {
    name: "quote_email_address",
    label: " Email Address for Quote",
    type: "text",
  },
  {
    name: "attention_of",
    label: " For The Attention Of:",
    type: "text",
  },
];

export const Requirement = [
  {
    name: "requirement",
    label: "Requirement",
    type: "text",
  },
];
