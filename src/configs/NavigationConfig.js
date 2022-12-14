import {
  ApartmentOutlined,
  AppstoreOutlined,
  BarChartOutlined,
  BoldOutlined,
  BookOutlined,
  DashboardOutlined,
  DatabaseOutlined,
  DesktopOutlined,
  DollarOutlined,
  DotChartOutlined,
  EnvironmentOutlined,
  FormOutlined,
  FundOutlined,
  LockOutlined,
  MailOutlined,
  ProfileOutlined,
  QuestionCircleOutlined,
  SafetyCertificateOutlined,
  ToolOutlined,
  TrophyOutlined,
  UsergroupAddOutlined,
  UserSwitchOutlined,
  BellOutlined,
} from "@ant-design/icons";
import { APP_PREFIX_PATH } from "configs/AppConfig";

const extraNavTree = [];

const dashBoardNavTree = [
  {
    key: "dashboards",
    path: `${APP_PREFIX_PATH}/dashboards`,
    title: "Dashboard",
    icon: DashboardOutlined,
    breadcrumb: false,
    submenu: [
      {
        key: "dashboards-default",
        path: `${APP_PREFIX_PATH}/dashboards/default`,
        title: "Dashboard",
        icon: DashboardOutlined,
        breadcrumb: false,
        submenu: [],
        permission: "dashboard_view",
      },
      {
        key: "dashboards-analytic",
        path: `${APP_PREFIX_PATH}/dashboards/analytic`,
        title: "Website Analytics",
        icon: DotChartOutlined,
        breadcrumb: false,
        submenu: [],
        permission: "website_analytic_view",
      },
      {
        key: "dashboards-sales",
        path: `${APP_PREFIX_PATH}/dashboards/sales`,
        title: "Sales Analytics",
        icon: FundOutlined,
        breadcrumb: false,
        submenu: [],
        permission: "sales_analytic_view",
      },
    ],
  },
];

const appsNavTree = [
  {
    key: "mains",
    path: `${APP_PREFIX_PATH}`,
    title: "Main",
    icon: AppstoreOutlined,
    breadcrumb: false,
    submenu: [
      {
        key: "main-blogs",
        path: `${APP_PREFIX_PATH}/blogs/list`,
        title: "Blogs",
        icon: BookOutlined,
        breadcrumb: true,
        submenu: [],
        permission: "blog_view",
      },
      {
        key: "main-pages",
        path: `${APP_PREFIX_PATH}/pages/list`,
        title: "Pages",
        icon: BookOutlined,
        breadcrumb: true,
        submenu: [],
        permission: "pages_view",
      },
      {
        key: "main-plans",
        path: `${APP_PREFIX_PATH}/plans/list`,
        title: "Plans",
        icon: BarChartOutlined,
        breadcrumb: true,
        submenu: [],
        permission: "plan_view",
      },
      {
        key: "main-transacion",
        path: `${APP_PREFIX_PATH}/transactions/list`,
        title: "Transactions",
        icon: DollarOutlined,
        breadcrumb: true,
        submenu: [],
        permission: "transaction_view",
      },
    ],
  },
];

const manageTree = [
  {
    key: "manage",
    path: `${APP_PREFIX_PATH}`,
    title: "Manage",
    icon: AppstoreOutlined,
    breadcrumb: false,
    submenu: [
      {
        key: "main-permission",
        path: `${APP_PREFIX_PATH}/permissions/list`,
        title: "Permissions",
        icon: LockOutlined,
        breadcrumb: true,
        submenu: [],
        permission: "permission_view",
      },
      {
        key: "main-user",
        path: `${APP_PREFIX_PATH}/users`,
        title: "Users",
        icon: UserSwitchOutlined,
        breadcrumb: true,
        submenu: [],
        permission: "user_view",
      },
      {
        key: "main-push-notifications",
        path: `${APP_PREFIX_PATH}/push-notifications`,
        title: "Push Notifications",
        icon: BellOutlined,
        breadcrumb: true,
        submenu: [],
        permission: "user_view",
      },
      {
        key: "tickets",
        path: `${APP_PREFIX_PATH}/tickets`,
        title: "Tickets",
        icon: UserSwitchOutlined,
        breadcrumb: true,
        submenu: [],
        permission: "ticket_view",
      },
      {
        key: "main-partners",
        path: `${APP_PREFIX_PATH}/partners/list`,
        title: "Partners",
        icon: SafetyCertificateOutlined,
        breadcrumb: true,
        submenu: [],
        permission: "partners_view",
      },
      {
        key: "main-brand",
        path: `${APP_PREFIX_PATH}/brands/list`,
        title: "Brands",
        icon: BoldOutlined,
        breadcrumb: true,
        submenu: [],
        permission: "brand_view",
      },
      {
        key: "main-category",
        path: `${APP_PREFIX_PATH}/category/list`,
        title: "Category",
        icon: ApartmentOutlined,
        breadcrumb: true,
        submenu: [],
        permission: "category_view",
      },
      {
        key: "main-business-segment",
        path: `${APP_PREFIX_PATH}/business-segment/list`,
        title: "Business Segment",
        icon: ApartmentOutlined,
        breadcrumb: true,
        submenu: [],
        permission: "category_view",
      },
      {
        key: "main-landing-pages",
        path: `${APP_PREFIX_PATH}/landing-pages/list`,
        title: "Landing pages",
        icon: DesktopOutlined,
        breadcrumb: true,
        submenu: [],
        permission: "pages_view",
      },
      {
        key: "other-awards",
        path: `${APP_PREFIX_PATH}/awards/list`,
        title: "Awards",
        icon: TrophyOutlined,
        breadcrumb: true,
        submenu: [],
        permission: "award_view",
      },
      {
        key: "other-tags",
        path: `${APP_PREFIX_PATH}/tags/list`,
        title: "Tags",
        icon: TrophyOutlined,
        breadcrumb: true,
        submenu: [],
        permission: "tag_view",
      },
      {
        key: "other-banners",
        path: `${APP_PREFIX_PATH}/banners/list`,
        title: "Banners",
        icon: TrophyOutlined,
        breadcrumb: true,
        submenu: [],
        permission: "banner_view",
      },
      {
        key: "other-cities",
        path: `${APP_PREFIX_PATH}/cities/list`,
        title: "Cities",
        icon: EnvironmentOutlined,
        breadcrumb: true,
        submenu: [],
        permission: "cities_view",
      },
      {
        key: "other-business-listing",
        path: `${APP_PREFIX_PATH}/business-listing/list`,
        title: "Business Listing",
        icon: ProfileOutlined,
        breadcrumb: true,
        submenu: [],
        permission: "business_listing_view",
      },
    ],
  },
];

const othersTree = [
  {
    key: "other",
    path: `${APP_PREFIX_PATH}`,
    title: "Others",
    icon: AppstoreOutlined,
    breadcrumb: false,
    submenu: [
      {
        key: "other-faqs",
        path: `${APP_PREFIX_PATH}/faqs/list`,
        title: "Faqs",
        icon: QuestionCircleOutlined,
        breadcrumb: true,
        submenu: [],
        permission: "faq_view",
      },
      {
        key: "other-infographics",
        path: `${APP_PREFIX_PATH}/infographics/list`,
        title: "Infographics",
        icon: ToolOutlined,
        breadcrumb: true,
        submenu: [],
        permission: "infographic_view",
      },
      {
        key: "other-extra-service",
        path: `${APP_PREFIX_PATH}/extra-service/list`,
        title: "Extra Service",
        icon: ToolOutlined,
        breadcrumb: true,
        submenu: [],
        permission: "extra_service_view",
      },
      {
        key: "other-extra-service-content",
        path: `${APP_PREFIX_PATH}/extra-service-content/list`,
        title: "Extra Service Content",
        icon: ToolOutlined,
        breadcrumb: true,
        submenu: [],
        permission: "extra_service_content_view",
      },
    ],
  },
];

const aquasitionTree = [
  {
    key: "aqusition",
    path: `${APP_PREFIX_PATH}`,
    title: "Acquisition",
    icon: AppstoreOutlined,
    breadcrumb: false,
    submenu: [
      {
        key: "aquastion-enquiry",
        path: `${APP_PREFIX_PATH}/enquiries/list`,
        title: "Enquiries",
        icon: DatabaseOutlined,
        breadcrumb: true,
        submenu: [],
        permission: "enquiry_view",
      },
      {
        key: "aquastion-auction",
        path: `${APP_PREFIX_PATH}/auctions/list`,
        title: "Auction",
        icon: DatabaseOutlined,
        breadcrumb: true,
        submenu: [],
        permission: "enquiry_view",
      },
      {
        key: "aquastion-purchased-enquiry",
        path: `${APP_PREFIX_PATH}/purchased-enquiries/list`,
        title: "Purchased Enquiries",
        icon: DatabaseOutlined,
        breadcrumb: true,
        submenu: [],
        permission: "enquiry_view",
      },
      {
        key: "aquastion-incomplete-auction",
        path: `${APP_PREFIX_PATH}/incomplete-enquiries/list`,
        title: "Incomplete  Enquiries",
        icon: DatabaseOutlined,
        breadcrumb: true,
        submenu: [],
        permission: "enquiry_view",
      },
      {
        key: "aquasition-contact-forms",
        path: `${APP_PREFIX_PATH}/contact-forms/list`,
        title: "Contact Forms Subs",
        icon: MailOutlined,
        breadcrumb: true,
        submenu: [],
        permission: "contact_form_view",
      },
      {
        key: "aquasition-feedback-forms",
        path: `${APP_PREFIX_PATH}/feedback-forms/list`,
        title: "Feedback Forms Subs",
        icon: MailOutlined,
        breadcrumb: true,
        submenu: [],
        permission: "contact_form_view",
      },
    ],
  },
];

const settingTree = [
  {
    key: "setting",
    path: `${APP_PREFIX_PATH}`,
    title: "Setting",
    icon: AppstoreOutlined,
    breadcrumb: false,
    submenu: [
      {
        key: "setting-partner-plans",
        path: `${APP_PREFIX_PATH}/partner-plans/list`,
        title: "Partner Plans",
        icon: UsergroupAddOutlined,
        breadcrumb: true,
        submenu: [],
        permission: "partner_plan_view",
      },
      {
        key: "setting-redirect",
        path: `${APP_PREFIX_PATH}/redirection/list`,
        title: "Redirections",
        icon: UsergroupAddOutlined,
        breadcrumb: true,
        submenu: [],
        permission: "redirection_view",
      },
      {
        key: "setting-config",
        path: `${APP_PREFIX_PATH}/configuration/list`,
        title: "Configurations",
        icon: MailOutlined,
        breadcrumb: true,
        submenu: [],
        permission: "configuration_view",
      },
      {
        key: "setting-forms",
        path: `${APP_PREFIX_PATH}/form/list`,
        title: "Forms",
        icon: FormOutlined,
        breadcrumb: true,
        submenu: [],
      },
    ],
  },
];

const navigationConfig = [
  ...dashBoardNavTree,
  ...appsNavTree,
  ...aquasitionTree,
  ...manageTree,
  ...extraNavTree,
  ...settingTree,
  ...othersTree,
];

export default navigationConfig;
