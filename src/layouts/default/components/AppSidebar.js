import { Sidebar } from "primereact/sidebar";
import { Image } from "primereact/image";
import { Tree } from "primereact/tree";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sidebarToggle } from "../../../shares/shareSlice";
import logo from "../../../assets/images/egm_logo.png";
import { useState } from "react";
import { items } from "../defaultPaths";

export const AppSidebar = () => {
  let itemList = [];

  items.map((value) => {
    if (value.children) {
      value.children.map((child) => {
        itemList.push(child);
        return child;
      });
    } else {
      itemList.push(value);
    }
    return value;
  });

  const [selectedKeys, setSelectedKeys] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const state = useSelector((state) => state.share);
  const { showSidebar } = state;

  const nodeTemplate = (node) => {
    const label = node.label;
    return <label> {label}</label>;
  };

  const SidebarHeader = () => {
    return (
      <div className="w-full flex flex-row justify-content-start align-items-center">
        <Image
          width="50px"
          height="50px"
          src={logo}
          alt="Evan Global Management"
          title="Evan Global Management"
        />
  
        <div className="mx-2 sidebar-header">
          <h3> EGM System </h3>
          <small> Admininistrator </small>
        </div>
      </div>
    );
  };

  return (
    <Sidebar
      visible={showSidebar}
      onHide={() => dispatch(sidebarToggle())}
      header={<SidebarHeader />}
    >
      <Tree
        value={items}
        selectionMode="single"
        nodeTemplate={nodeTemplate}
        selectionKeys={selectedKeys}
        onSelectionChange={(e) => {
          const getItem = itemList.filter((value) => value.key === e.value)[0];
          if (getItem) {
            navigate(getItem.url);
            dispatch(sidebarToggle());
          }

          setSelectedKeys(e.value);
        }}
      />
    </Sidebar>
  );
};
