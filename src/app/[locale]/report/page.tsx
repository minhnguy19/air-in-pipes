/** The report page **/
"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { useSelector, useDispatch } from "react-redux";

import { ProjectState } from "../redux/store";
import { Tab } from "../input-data/page";
import Summary from "./summary";
import Graph from "./graph";
import Detail from "./detail";

export default function Report() {
  const t = useTranslations("report");
  const report = useSelector((state: ProjectState) => state.report);
  const project = useSelector((state: ProjectState) => state.project);
  const dispatch = useDispatch();

  const reportTabs: Tab[] = [
    {
      name: t("summary"),
      current: true,
    },
    {
      name: t("graph"),
      current: false,
    },
    {
      name: t("detail"),
      current: false,
    },
  ];

  const [activeTab, setActiveTab] = useState(
    reportTabs.find((tab) => tab.current)?.name
  );

  function handleTabClick(tabName: string) {
    setActiveTab(tabName);
  }

  function classNames(...classes: any[]): string {
    return classes.filter(Boolean).join(" ");
  }
  console.log(report);
  return (
    <div>
      <div className="hidden sm:block mx-auto max-w-5xl py-12 sm:px-6 lg:px-8">
        <nav className="flex space-x-4" aria-label="Tabs">
          {reportTabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => handleTabClick(tab.name)}
              className={classNames(
                tab.name === activeTab
                  ? "bg-sky-100 text-sky-700"
                  : "text-gray-500 hover:text-gray-700",
                "rounded-md px-3 py-2 text-sm font-medium"
              )}
              aria-current={tab.name === activeTab ? "page" : undefined}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {activeTab === t("summary") && (
        <Summary report={report} project={project}></Summary>
      )}

      {activeTab === t("graph") && (
        <Graph report={report} project={project}></Graph>
      )}

      {activeTab === t("detail") && (
        <Detail report={report} project={project}></Detail>
      )}
    </div>
  );
}
