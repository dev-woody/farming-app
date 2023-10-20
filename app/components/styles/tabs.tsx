import { Tab } from "@headlessui/react";

interface ITab {
  children?: React.ReactNode;
  tabList: string[];
}

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function StyleTab({ children, tabList }: ITab) {
  return (
    <div className="w-full py-4 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-teal-900/20 p-1">
          {tabList.map((tabItem, index) => (
            <Tab
              key={index}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-teal-700",
                  // "ring-white ring-opacity-60 ring-offset-2 ring-offset-teal-400 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-white shadow"
                    : "text-teal-100 hover:bg-white/[0.12] hover:text-white",
                )
              }
            >
              {tabItem}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel
            className={classNames(
              "rounded-xl bg-white p-3",
              // "ring-white ring-opacity-60 ring-offset-2 ring-offset-teal-400 focus:outline-none focus:ring-2",
            )}
          >
            Content 1
          </Tab.Panel>
          <Tab.Panel>Content 2</Tab.Panel>
          <Tab.Panel>Content 3</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
