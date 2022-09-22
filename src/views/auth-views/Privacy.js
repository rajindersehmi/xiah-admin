import React, { useEffect, useState } from "react";
import PageService from "services/PageService";
import ReactHtmlParser from "react-html-parser";
function Privacy() {
  useEffect(() => {
    fetchPrivacy();
  }, []);
  const [content, setContent] = useState();

  const fetchPrivacy = async () => {
    try {
      const res = await PageService.getPrivacy();
      setContent(res?.data?.data?.content);
    } catch (error) {}
  };
  const html = content;

  return <div style={{ padding: "25px" }}>{ReactHtmlParser(content)}</div>;
}

export default Privacy;
