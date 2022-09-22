import { Radio, Switch } from "antd";
import { NAV_TYPE_SIDE, NAV_TYPE_TOP } from "constants/ThemeConstant";
import React from "react";
import { useThemeSwitcher } from "react-css-theme-switcher";
import { connect } from "react-redux";
import {
  onDirectionChange,
  onHeaderNavColorChange,
  onNavStyleChange,
  onNavTypeChange,
  onSwitchTheme,
  onTopNavColorChange,
  toggleCollapsedNav,
} from "redux/actions/Theme";

const colorOptions = ["#3e82f7", "#24a772", "#de4436", "#924aca", "#193550"];

const ListOption = ({ name, selector, disabled, vertical }) => (
  <div
    className={`my-4 ${
      vertical ? "" : "d-flex align-items-center justify-content-between"
    }`}
  >
    <div
      className={`${disabled ? "opacity-0-3" : ""} ${vertical ? "mb-3" : ""}`}
    >
      {name}
    </div>
    <div>{selector}</div>
  </div>
);

export const ThemeConfigurator = ({
  navType,

  navCollapsed,

  currentTheme,
  toggleCollapsedNav,
  onNavTypeChange,

  onTopNavColorChange,
  onHeaderNavColorChange,
  onSwitchTheme,
}) => {
  const isNavTop = navType === NAV_TYPE_TOP ? true : false;
  const isCollapse = navCollapsed;

  const { switcher, themes } = useThemeSwitcher();

  const toggleTheme = (isChecked) => {
    onHeaderNavColorChange("");
    const changedTheme = isChecked ? "dark" : "light";
    onSwitchTheme(changedTheme);
    switcher({ theme: themes[changedTheme] });
  };

  const onNavTypeClick = (value) => {
    onHeaderNavColorChange("");
    if (value === NAV_TYPE_TOP) {
      onTopNavColorChange(colorOptions[0]);
      toggleCollapsedNav(false);
    }
    onNavTypeChange(value);
  };

  return (
    <>
      <div className="mb-5">
        <ListOption
          name="Navigation Type:"
          selector={
            <Radio.Group
              size="small"
              onChange={(e) => onNavTypeClick(e.target.value)}
              value={navType}
            >
              <Radio.Button value={NAV_TYPE_SIDE}>Side</Radio.Button>
              <Radio.Button value={NAV_TYPE_TOP}>Top</Radio.Button>
            </Radio.Group>
          }
        />
        <ListOption
          name="Side Nav Collapse:"
          selector={
            <Switch
              disabled={isNavTop}
              checked={isCollapse}
              onChange={() => toggleCollapsedNav(!navCollapsed)}
            />
          }
          disabled={isNavTop}
        />
        <ListOption
          name="Dark Theme:"
          selector={
            <Switch checked={currentTheme === "dark"} onChange={toggleTheme} />
          }
        />
      </div>
    </>
  );
};

const mapStateToProps = ({ theme }) => {
  const {
    navType,
    sideNavTheme,
    navCollapsed,
    topNavColor,
    headerNavColor,
    locale,
    currentTheme,
    direction,
  } = theme;
  return {
    navType,
    sideNavTheme,
    navCollapsed,
    topNavColor,
    headerNavColor,
    locale,
    currentTheme,
    direction,
  };
};

const mapDispatchToProps = {
  toggleCollapsedNav,
  onNavTypeChange,
  onNavStyleChange,
  onTopNavColorChange,
  onHeaderNavColorChange,
  onSwitchTheme,
  onDirectionChange,
};

export default connect(mapStateToProps, mapDispatchToProps)(ThemeConfigurator);
