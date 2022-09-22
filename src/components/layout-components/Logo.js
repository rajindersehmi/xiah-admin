import { Grid } from "antd";
import {
  NAV_TYPE_TOP,
  SIDE_NAV_COLLAPSED_WIDTH,
  SIDE_NAV_WIDTH,
} from "constants/ThemeConstant";
import React from "react";
import { connect } from "react-redux";
import utils from "utils";

const { useBreakpoint } = Grid;

const getLogoWidthGutter = (props, isMobile) => {
  const { navCollapsed, navType } = props;
  const isNavTop = navType === NAV_TYPE_TOP ? true : false;
  if (isMobile && !props.mobileLogo) {
    return 0;
  }
  if (isNavTop) {
    return "auto";
  }
  if (navCollapsed) {
    return `${SIDE_NAV_COLLAPSED_WIDTH}px`;
  } else {
    return `${SIDE_NAV_WIDTH}px`;
  }
};

const getLogo = (props) => {
  const { navCollapsed } = props;
  if (navCollapsed) {
    return <span></span>;
  }
  return (
    <span>
      Telecom <span className="text-primary">Supermarket</span>
    </span>
  );
};

const getLogoDisplay = (isMobile, mobileLogo) => {
  if (isMobile && !mobileLogo) {
    return "d-none";
  } else {
    return "logo text-nowrap";
  }
};

export const Logo = (props) => {
  const isMobile = !utils.getBreakPoint(useBreakpoint()).includes("lg");
  return (
    <div
      className={getLogoDisplay(isMobile, props.mobileLogo)}
      style={{
        width: `${getLogoWidthGutter(props, isMobile)}`,
        fontSize: "1.2rem",
        fontWeight: 500,
      }}
    >
      {getLogo(props)}
    </div>
  );
};

const mapStateToProps = ({ theme }) => {
  const { navCollapsed, navType } = theme;
  return { navCollapsed, navType };
};

export default connect(mapStateToProps)(Logo);
