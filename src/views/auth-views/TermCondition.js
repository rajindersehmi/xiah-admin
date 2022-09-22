import React, { useEffect, useState } from "react";
import PageService from "services/PageService";
import ReactHtmlParser from "react-html-parser";
function TermCondition() {
  const [content, setContent] = useState();
  const fetchContent = async () => {
    try {
      const res = await PageService.getTerms();

      setContent(res?.data?.data?.content);
    } catch (error) {}
  };

  useEffect(() => {
    fetchContent();
  }, []);
  return <div style={{ padding: "25px" }}>{ReactHtmlParser(content)}</div>;
}

export default TermCondition;
