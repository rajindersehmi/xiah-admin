import { CURRENCY_SYMBOL } from "constants/ThemeConstant";
import React from "react";
import moment from "moment";
import { Tag } from "antd";
import Utils from "utils";

// mode can be enquiry or auction

const EnquiryListCard = ({ record, mode = "enquiry" }) => {
  const formatAddress = (address) => {
    if (!address) return "N/A";
    const { address_line_1, address_line_2, city, state, country, postcode } =
      address;
    return ` ${address_line_1 ?? ""}, ${address_line_2 ?? ""},${city ?? ""}, ${
      state ?? ""
    }, ${country ?? ""} (${postcode ?? ""})`;
  };

  return (
    <div>
      <div className="d-flex flex-column flex-md-row mb-2" style={{ gap: 20 }}>
        <div>
          <p className="text-muted mb-0">Ref Id:</p>
          <p className="font-weight-bold mb-1">{record.reference_id}</p>
        </div>
        <div>
          <p className="text-muted mb-0">Name:</p>
          <p className="font-weight-bold mb-1">
            {record.customer?.first_name} {record.customer?.last_name}{" "}
            <Tag>{Utils.humanize(record?.customer_type)}</Tag>
          </p>
        </div>
        <div>
          <p className="text-muted mb-0">Contact:</p>
          <p className="font-weight-bold mb-1 ">
            <a href={`tel:${record?.customer?.phone}`}>
              {record?.customer?.phone ?? "NA"}
            </a>
          </p>
        </div>
        {record?.category?.name && (
          <div>
            <p className="text-muted mb-0">Category:</p>
            <p className="font-weight-bold mb-1 ">{record?.category?.name}</p>
          </div>
        )}
        {mode !== "enquiry" && (
          <div>
            <p className="text-muted mb-0">Bid Price: </p>
            <p className="font-weight-bold mb-1 ">
              {CURRENCY_SYMBOL} {record?.bidding_price ?? "NA"}
            </p>
          </div>
        )}
        {mode === "enquiry" && record.mark_for_bidding === "purchased" && (
          <div>
            <Tag color="success">Purchased</Tag>
          </div>
        )}
      </div>
      <div className="d-flex flex-column flex-md-row" style={{ gap: 20 }}>
        <div>
          <p className="text-muted mb-0">Address: </p>
          {record.customer_type === "not-registered" ? (
            <p className="font-weight-bold mb-1">
              {record?.customer?.address}
              <br />
              {record?.customer?.street_address}
            </p>
          ) : (
            <p className="font-weight-bold mb-1">
              {formatAddress(record?.installation_address)}
            </p>
          )}
        </div>
        <div>
          <p className="text-muted mb-0">Created At: </p>
          <p className="font-weight-bold mb-1">
            {moment(record.created_at).fromNow()}
          </p>
        </div>
        {record.last_remark_by && (
          <div>
            <p className="text-muted mb-0">Last Remark by:</p>
            <p className="font-weight-bold mb-1">
              {record?.last_remark_by?.first_name ??
                record.last_remark_by.emial ??
                record.last_remark_by?.phone}
            </p>
          </div>
        )}
      </div>
      {mode !== "enquiry" && (
        <div className="d-flex flex-column flex-md-row" style={{ gap: 20 }}>
          <div>
            <p className="text-muted mb-0">Sale Urgency</p>
            <p className="font-weight-bold mb-1">
              {record.sale_urgency ?? "N/A"}
            </p>
          </div>
          <div>
            <p className="text-muted mb-0">Sale Type</p>
            <p className="font-weight-bold mb-1">{record.sale_type ?? "N/A"}</p>
          </div>
          <div>
            <p className="text-muted mb-0">Sale Grade</p>
            <p className="font-weight-bold mb-1">
              {record.sale_grade ?? "N/A"}
            </p>
          </div>
        </div>
      )}
      {/* <div>
        <p className="text-muted mb-0">Remark:</p>
        <p className="font-weight-bold mb-2">{record.remarks}</p>
      </div> */}
    </div>
  );
};

export default EnquiryListCard;
